'use client';

import React, { useState, useEffect, useCallback } from 'react';
import TicketList from '@/components/TicketList';
import UserCarousel from '@/components/UserCarousel';
import TicketModal from '@/components/TicketModal';
import MeetingEnded from '@/components/MeetingEnded';
import confetti from 'canvas-confetti';
import { playTimerSound } from '@/utils/sound';
import { useRouter } from 'next/navigation';

interface User {
  accountId: string;
  displayName: string;
  emailAddress: string;
}

interface Ticket {
  key: string;
  fields: {
    summary: string;
    status: { name: string };
    priority?: { name: string };
    assignee: {
      accountId: string;
      displayName: string;
      emailAddress: string;
    } | null;
    updated: string;
  };
  browseUrl?: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [issues, setIssues] = useState<Ticket[]>([]);
  const [activeUserIndex, setActiveUserIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isMeetingEnded, setIsMeetingEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const totalTime = 60;
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, issuesRes] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/issues')
        ]);

        if (!usersRes.ok || !issuesRes.ok) {
          throw new Error('Failed to fetch data from server');
        }

        const usersData: User[] = await usersRes.json();
        const issuesData: Ticket[] = await issuesRes.json();

        const usersWithIssues = usersData.filter(user =>
          issuesData.some(issue =>
            issue.fields.assignee && issue.fields.assignee.accountId === user.accountId
          )
        );

        const shuffledUsers = shuffleArray(usersWithIssues);

        setUsers(shuffledUsers);
        setIssues(issuesData);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          handleTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleShuffle = () => {
    const shuffled = shuffleArray(users);
    setUsers(shuffled);
    setActiveUserIndex(0);
    setTimeLeft(totalTime);
    setIsTimerRunning(false);
  };

  const handleNextUser = () => {
    if (activeUserIndex === users.length - 1) {
      setIsMeetingEnded(true);
    } else {
      setActiveUserIndex((prev) => prev + 1);
      setTimeLeft(totalTime);
      setIsTimerRunning(false);
    }

    playTimerSound();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#f472b6', '#a78bfa']
    });
  };

  const handlePrevUser = () => {
    setActiveUserIndex((prev) => (prev - 1 + users.length) % users.length);
    setTimeLeft(totalTime);
    setIsTimerRunning(false);
  };

  const handleTimerToggle = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleTimerReset = useCallback(() => {
    setTimeLeft(totalTime);
    setIsTimerRunning(false);
  }, []);

  const handleTimerComplete = () => {
    handleNextUser();
  };

  const handleRestart = () => {
    setIsMeetingEnded(false);
    setActiveUserIndex(0);
    setTimeLeft(totalTime);
    setIsTimerRunning(false);
  };

  const activeUser = users[activeUserIndex];

  const userIssues = activeUser ? issues.filter(issue =>
    issue.fields.assignee && issue.fields.assignee.accountId === activeUser.accountId
  ) : [];

  if (loading) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h1>Loading Standup Companion...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ color: 'var(--danger)' }}>Error</h1>
        <p>{error}</p>
        <p>Make sure Jira credentials are set in .env.local</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
        <h1>No Team Members Found</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
          No users with assigned tickets were found in the current active sprint.
        </p>
        <div style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '600px', margin: '2rem auto' }}>
          <h3>Possible reasons:</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>No active sprint in your Jira project</li>
            <li>No tickets assigned to users in the active sprint</li>
            <li>Jira credentials not configured (check .env.local)</li>
          </ul>
          <h3 style={{ marginTop: '2rem' }}>To fix:</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li>Ensure you have an active sprint in Jira</li>
            <li>Assign tickets to team members in that sprint</li>
            <li>Refresh this page</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>MMH Standup Companion</h1>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>

      {isMeetingEnded ? (
        <MeetingEnded
          onRestart={handleRestart}
          totalUsers={users.length}
          totalIssues={issues.length}
        />
      ) : (
        <div className="content-wrapper">
          <div className="left-sidebar glass-panel">
            <UserCarousel
              users={users}
              activeIndex={activeUserIndex}
              onNext={handleNextUser}
              onPrev={handlePrevUser}
              onShuffle={handleShuffle}
              timeLeft={timeLeft}
              totalTime={totalTime}
              isRunning={isTimerRunning}
              onTimerToggle={handleTimerToggle}
              onTimerReset={handleTimerReset}
            />
          </div>

          <div className="center-stage">
            <TicketList
              tickets={userIssues}
              loading={false}
              error={null}
              onTicketClick={setSelectedTicket}
            />
          </div>
        </div>
      )}

      <TicketModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
}
