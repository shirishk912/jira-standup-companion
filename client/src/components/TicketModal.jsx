import React from 'react';

const TicketModal = ({ ticket, onClose }) => {
    if (!ticket) return null;

    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content glass-panel">
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <span className="ticket-key-large">{ticket.key}</span>
                    <span className={`status-badge ${ticket.fields.status.name === 'Done' ? 'status-done' : ''}`}>
                        {ticket.fields.status.name}
                    </span>
                </div>

                <h2 className="modal-title">{ticket.fields.summary}</h2>

                <div className="modal-details">
                    <div className="detail-row">
                        <span className="detail-label">Priority:</span>
                        <span className="detail-value">{ticket.fields.priority?.name || 'None'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Assignee:</span>
                        <span className="detail-value">{ticket.fields.assignee?.displayName || 'Unassigned'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Updated:</span>
                        <span className="detail-value">{new Date(ticket.fields.updated).toLocaleString()}</span>
                    </div>
                </div>

                <div className="modal-actions">
                    <a
                        href={ticket.browseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn"
                    >
                        Open in Jira &#8599;
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TicketModal;
