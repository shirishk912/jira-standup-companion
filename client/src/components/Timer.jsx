import React, { useState, useEffect } from 'react';

const Timer = ({ duration = 60, onComplete, onReset }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setTimeLeft(duration);
        setIsActive(false);
    }, [duration, onReset]);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((seconds) => seconds - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (onComplete) onComplete();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, onComplete]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(duration);
    };

    const getTimerStatus = () => {
        if (timeLeft <= 10) return 'danger';
        if (timeLeft <= 30) return 'warning';
        return '';
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // SVG Circle calculations
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

    return (
        <div className="timer-container glass-panel">
            <div className="timer-wrapper">
                <svg className="timer-svg" viewBox="0 0 200 200">
                    <circle
                        className="timer-circle-bg"
                        cx="100"
                        cy="100"
                        r={radius}
                    />
                    <circle
                        className={`timer-circle-fg ${getTimerStatus()}`}
                        cx="100"
                        cy="100"
                        r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>
                <div className="timer-display">
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="timer-controls">
                <button onClick={toggleTimer}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button className="secondary" onClick={resetTimer}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Timer;
