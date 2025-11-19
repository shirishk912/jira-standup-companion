'use client';

import React from 'react';

interface Ticket {
    key: string;
    fields: {
        summary: string;
        status: { name: string };
        priority?: { name: string };
        assignee: {
            accountId: string;
            displayName: string;
            emailAddress: string;
        } | null;
        updated: string;
        parent?: {
            key: string;
            fields: {
                summary: string;
            };
        };
    };
    browseUrl?: string;
}

interface TicketModalProps {
    ticket: Ticket | null;
    onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ ticket, onClose }) => {
    if (!ticket) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>

                <div className="modal-header">
                    <span className="ticket-key-large">{ticket.key}</span>
                </div>

                <h2 className="modal-title">{ticket.fields.summary}</h2>

                <div className="modal-details">
                    <div className="detail-row">
                        <span className="detail-label">Status:</span>
                        <span className="detail-value">{ticket.fields.status.name}</span>
                    </div>
                    {ticket.fields.parent && (
                        <div className="detail-row">
                            <span className="detail-label">Epic:</span>
                            <span className="detail-value epic-badge">
                                {ticket.fields.parent.key}: {ticket.fields.parent.fields.summary}
                            </span>
                        </div>
                    )}
                    {ticket.fields.priority && (
                        <div className="detail-row">
                            <span className="detail-label">Priority:</span>
                            <span className="detail-value">{ticket.fields.priority.name}</span>
                        </div>
                    )}
                    {ticket.fields.assignee && (
                        <div className="detail-row">
                            <span className="detail-label">Assignee:</span>
                            <span className="detail-value">{ticket.fields.assignee.displayName}</span>
                        </div>
                    )}
                    <div className="detail-row">
                        <span className="detail-label">Last Updated:</span>
                        <span className="detail-value">
                            {new Date(ticket.fields.updated).toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="modal-actions">
                    {ticket.browseUrl && (
                        <a
                            href={ticket.browseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn"
                        >
                            Open in Jira
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TicketModal;
