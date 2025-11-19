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
}

const UserCarousel: React.FC<UserCarouselProps> = ({
    users,
    activeIndex,
    onNext,
    onPrev,
    onShuffle
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

    return (
        <div className="carousel-container">
            <button className="nav-btn" onClick={onPrev} disabled={users.length <= 1}>
                ←
            </button>
            <div className="user-info">
                <div className={`user-avatar ${activeIndex !== null ? 'active' : ''}`}>
                    {getInitials(activeUser.displayName)}
                </div>
                <div className="user-name">{activeUser.displayName}</div>
            </div>
            <button className="nav-btn" onClick={onNext} disabled={users.length <= 1}>
                →
            </button>
            <button
                className="shuffle-btn"
                onClick={onShuffle}
                title="Shuffle order"
            >
                🔀
            </button>
        </div>
    );
};

export default UserCarousel;
