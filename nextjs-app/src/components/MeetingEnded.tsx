'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface MeetingEndedProps {
    onRestart: () => void;
    totalUsers: number;
    totalIssues: number;
}

const MeetingEnded: React.FC<MeetingEndedProps> = ({ onRestart, totalUsers, totalIssues }) => {
    const [sprintUrl, setSprintUrl] = useState<string | null>(null);

    useEffect(() => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#38bdf8', '#f472b6', '#a78bfa']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#38bdf8', '#f472b6', '#a78bfa']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();

        // Fetch sprint URL
        fetch('/api/sprint-url')
            .then(res => res.json())
            .then(data => setSprintUrl(data.url))
            .catch(err => console.error('Error fetching sprint URL:', err));
    }, []);

    return (
        <div className="meeting-ended-container glass-panel">
            <div className="celebration-icon">🎉</div>
            <h1>All Done!</h1>
            <p className="subtitle">Great standup, team!</p>

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-value">{totalUsers}</span>
                    <span className="stat-label">Team Members</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{totalIssues}</span>
                    <span className="stat-label">Tickets Covered</span>
                </div>
            </div>

            {sprintUrl && (
                <a 
                    href={sprintUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="jira-sprint-link"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M21 13V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H11M15 3H21M21 3V9M21 3L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    View Sprint Board
                </a>
            )}

            <button className="restart-btn" onClick={onRestart}>
                Start New Standup
            </button>
        </div>
    );
};

export default MeetingEnded;
