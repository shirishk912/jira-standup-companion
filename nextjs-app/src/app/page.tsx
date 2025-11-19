'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Timer from '@/components/Timer';
import TicketList from '@/components/TicketList';
import UserCarousel from '@/components/UserCarousel';
import TicketModal from '@/components/TicketModal';
import ProgressBar from '@/components/ProgressBar';
import MeetingEnded from '@/components/MeetingEnded';
import confetti from 'canvas-confetti';
import { playTimerSound } from '@/utils/sound';

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
  const [timerKey, setTimerKey] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isMeetingEnded, setIsMeetingEnded] = useState(false);

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
    setTimerKey(prev => prev + 1);
  };

  const handleNextUser = () => {
    if (activeUserIndex === users.length - 1) {
      setIsMeetingEnded(true);
    } else {
      setActiveUserIndex((prev) => prev + 1);
      setTimerKey((prev) => prev + 1);
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
    setTimerKey((prev) => prev + 1);
  };

  const handleTimerReset = useCallback(() => {
    setTimerKey((prev) => prev + 1);
  }, []);

  const handleTimerComplete = () => {
    handleNextUser();
  };

  const handleRestart = () => {
    setIsMeetingEnded(false);
    setActiveUserIndex(0);
    setTimerKey(prev => prev + 1);
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
            />
            <Timer
              key={timerKey}
              duration={60}
              onComplete={handleTimerComplete}
              onReset={handleTimerReset}
            />
            <ProgressBar
              current={activeUserIndex + 1}
              total={users.length}
              vertical={false}
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
