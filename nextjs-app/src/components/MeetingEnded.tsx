'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface MeetingEndedProps {
    onRestart: () => void;
    totalUsers: number;
    totalIssues: number;
}

const MeetingEnded: React.FC<MeetingEndedProps> = ({ onRestart, totalUsers, totalIssues }) => {
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

            <button className="restart-btn" onClick={onRestart}>
                Start New Standup
            </button>
        </div>
    );
};

export default MeetingEnded;
