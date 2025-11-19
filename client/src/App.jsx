import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import TicketList from './components/TicketList';
import UserCarousel from './components/UserCarousel';
import TicketModal from './components/TicketModal';
import ProgressBar from './components/ProgressBar';
import MeetingEnded from './components/MeetingEnded';
import confetti from 'canvas-confetti';
import { playTimerSound } from './utils/sound';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function App() {
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [activeUserIndex, setActiveUserIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timerKey, setTimerKey] = useState(0); // To force reset timer
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isMeetingEnded, setIsMeetingEnded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, issuesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/users`),
          fetch(`${API_BASE_URL}/issues`)
        ]);

        if (!usersRes.ok || !issuesRes.ok) {
          throw new Error('Failed to fetch data from server');
        }

        const usersData = await usersRes.json();
        const issuesData = await issuesRes.json();

        // Filter users: only keep those who have at least one issue assigned
        const usersWithIssues = usersData.filter(user =>
          issuesData.some(issue =>
            issue.fields.assignee && issue.fields.assignee.accountId === user.accountId
          )
        );

        setUsers(usersWithIssues);
        setIssues(issuesData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNextUser = () => {
    if (activeUserIndex === users.length - 1) {
      setIsMeetingEnded(true);
    } else {
      setActiveUserIndex((prev) => prev + 1);
      setTimerKey((prev) => prev + 1); // Reset timer on user switch
    }

    // Play sound and confetti
    playTimerSound();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#f472b6', '#a78bfa']
    });
  };

  const handleRestart = () => {
    setIsMeetingEnded(false);
    setActiveUserIndex(0);
    setTimerKey(prev => prev + 1);
  };

  const handlePrevUser = () => {
    setActiveUserIndex((prev) => (prev - 1 + users.length) % users.length);
    setTimerKey((prev) => prev + 1); // Reset timer on user switch
  };

  const handleTimerReset = React.useCallback(() => {
    setTimerKey((prev) => prev + 1);
  }, []);

  const handleTimerComplete = () => {
    // Auto-advance to next user
    handleNextUser();
  };

  const activeUser = users[activeUserIndex];

  // Filter issues for active user
  // Jira user object usually has 'accountId' or 'name'
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
        <h1 style={{ color: 'var(--error-color)' }}>Error</h1>
        <p>{error}</p>
        <p>Make sure the backend server is running and Jira credentials are set.</p>
      </div>
    );
  }



  // ... existing useEffect ...

  // ... existing handlers ...

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

export default App;
