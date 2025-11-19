'use client';

import React from 'react';

interface User {
    accountId: string;
    displayName: string;
    emailAddress: string;
}

interface UserCarouselProps {
    users: User[];
    activeIndex: number;
    onNext: () => void;
    onPrev: () => void;
    onShuffle: () => void;
    timeLeft: number;
    totalTime: number;
    isRunning: boolean;
    onTimerToggle: () => void;
    onTimerReset: () => void;
}

const UserCarousel: React.FC<UserCarouselProps> = ({
    users,
    activeIndex,
    onNext,
    onPrev,
    onShuffle,
    timeLeft,
    totalTime,
    isRunning,
    onTimerToggle,
    onTimerReset
}) => {
    const activeUser = users[activeIndex];

    if (!activeUser) return null;

    const getInitials = (name: string): string => {
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    const circumference = 2 * Math.PI * 54;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="user-carousel-modern">
            {/* Progress Bar */}
            <div className="modern-progress-bar">
                <div className="progress-info">
                    <span className="progress-label">Progress</span>
                    <span className="progress-count">{activeIndex + 1} / {users.length}</span>
                </div>
                <div className="progress-track-modern">
                    <div 
                        className="progress-fill-modern" 
                        style={{ width: `${((activeIndex + 1) / users.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="modern-user-card">
                <div className="user-card-background"></div>
                <div className="user-card-content">
                    {/* Avatar with Timer Ring */}
                    <div className="modern-avatar-wrapper">
                        <svg className="timer-ring-svg" viewBox="0 0 120 120">
                            <circle
                                cx="60"
                                cy="60"
                                r="54"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.1)"
                                strokeWidth="4"
                            />
                            <circle
                                cx="60"
                                cy="60"
                                r="54"
                                fill="none"
                                stroke="url(#timer-gradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                transform="rotate(-90 60 60)"
                                className={`timer-progress-ring ${timeLeft <= 30 ? 'warning' : ''}`}
                            />
                            <defs>
                                <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="var(--accent-secondary)" />
                                    <stop offset="100%" stopColor="var(--accent-primary)" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="modern-avatar">
                            {getInitials(activeUser.displayName)}
                        </div>
                        <div className="timer-overlay">
                            {formatTime(timeLeft)}
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="modern-user-info">
                        <h2 className="modern-user-name">{activeUser.displayName}</h2>
                        <p className="modern-user-email">{activeUser.emailAddress}</p>
                    </div>

                    {/* Timer Controls */}
                    <div className="integrated-timer-controls">
                        <button 
                            className={`timer-control-btn ${isRunning ? 'pause' : 'play'}`}
                            onClick={onTimerToggle}
                        >
                            {isRunning ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <rect x="6" y="4" width="4" height="16" fill="currentColor" rx="1"/>
                                    <rect x="14" y="4" width="4" height="16" fill="currentColor" rx="1"/>
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                                </svg>
                            )}
                            <span>{isRunning ? 'Pause' : 'Start'}</span>
                        </button>
                        <button className="timer-control-btn reset" onClick={onTimerReset}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C9.61305 21 7.44665 20.014 5.89445 18.4015M3 12L5 10M3 12L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Reset</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="carousel-controls">
                <button className="carousel-nav-btn prev" onClick={onPrev} disabled={users.length <= 1}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button className="carousel-nav-btn shuffle" onClick={onShuffle} title="Shuffle order">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M16 3H21V8M4 20L21 3M21 16V21H16M15 15L21 21M4 4L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button className="carousel-nav-btn next" onClick={onNext} disabled={users.length <= 1}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default UserCarousel;
