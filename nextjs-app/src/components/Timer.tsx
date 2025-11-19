'use client';

import React, { useState, useEffect } from 'react';

interface TimerProps {
    duration: number;
    onComplete: () => void;
    onReset: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onComplete, onReset }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setTimeLeft(duration);
        setIsRunning(false);
    }, [duration]);

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsRunning(false);
                    onComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, onComplete]);

    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleReset = () => {
        setTimeLeft(duration);
        setIsRunning(false);
        onReset();
    };

    const progress = (timeLeft / duration) * 100;
    const circumference = 2 * Math.PI * 90;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const getStatusClass = () => {
        if (timeLeft <= 10) return 'danger';
        if (timeLeft <= 30) return 'warning';
        return '';
    };

    return (
        <div className="timer-container glass-panel">
            <div className="timer-wrapper">
                <svg className="timer-svg" viewBox="0 0 200 200">
                    <circle
                        className="timer-circle-bg"
                        cx="100"
                        cy="100"
                        r="90"
                    />
                    <circle
                        className={`timer-circle-fg ${getStatusClass()}`}
                        cx="100"
                        cy="100"
                        r="90"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset
                        }}
                    />
                </svg>
                <div className="timer-display">{timeLeft}</div>
            </div>

            <div className="timer-controls">
                {!isRunning ? (
                    <button
                        onClick={handleStart}
                        disabled={timeLeft === 0}
                    >
                        Start
                    </button>
                ) : (
                    <button
                        onClick={handlePause}
                        className="pause"
                    >
                        Pause
                    </button>
                )}
                <button className="secondary" onClick={handleReset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Timer;
