import React from 'react';

const ProgressBar = ({ current, total, vertical = false }) => {
    const progress = Math.min(100, (current / total) * 100);

    return (
        <div className={`progress-container glass-panel ${vertical ? 'vertical' : ''}`}>
            <div className="progress-label">
                <span>{current}/{total}</span>
            </div>
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{
                        [vertical ? 'height' : 'width']: `${progress}%`,
                        [vertical ? 'width' : 'height']: '100%'
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
