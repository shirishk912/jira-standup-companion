import React from 'react';

const UserCarousel = ({ users, activeIndex, onNext, onPrev }) => {
    if (!users || users.length === 0) return null;

    const activeUser = users[activeIndex];

    return (
        <div className="carousel-container">
            <button
                className="nav-btn"
                onClick={onPrev}
                disabled={users.length <= 1}
            >
                &#8249;
            </button>

            <div className="user-info">
                <div className="user-avatar active">
                    {activeUser.displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div className="user-name">{activeUser.displayName}</div>
            </div>

            <button
                className="nav-btn"
                onClick={onNext}
                disabled={users.length <= 1}
            >
                &#8250;
            </button>
        </div>
    );
};

export default UserCarousel;
