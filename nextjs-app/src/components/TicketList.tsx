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

interface TicketListProps {
    tickets: Ticket[];
    loading: boolean;
    error: string | null;
    onTicketClick: (ticket: Ticket) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, loading, error, onTicketClick }) => {
    const getStatusClass = (status: string): string => {
        const statusLower = status.toLowerCase();
        if (statusLower.includes('progress')) return 'status-inprogress';
        if (statusLower.includes('done')) return 'status-done';
        if (statusLower.includes('review')) return 'status-review';
        if (statusLower.includes('block')) return 'status-blocked';
        return 'status-todo';
    };

    const sortedTickets = [...tickets].sort((a, b) => {
        const statusA = a.fields.status.name.toLowerCase();
        const statusB = b.fields.status.name.toLowerCase();

        if (statusA.includes('progress')) return -1;
        if (statusB.includes('progress')) return 1;
        if (statusA.includes('done')) return 1;
        if (statusB.includes('done')) return -1;
        return 0;
    });

    return (
        <div className="ticket-list-container glass-panel">
            <div className="ticket-list-header">
                <h2>Active Tickets ({tickets.length})</h2>
            </div>

            {loading && <p>Loading tickets...</p>}
            {error && <p className="error">{error}</p>}

            <div className="tickets-scroll">
                {sortedTickets.map((ticket) => (
                    <div
                        key={ticket.key}
                        className={`ticket-card ${ticket.fields.status?.name?.toLowerCase().includes('done') ? 'ticket-done' : ''}`}
                        onClick={() => onTicketClick(ticket)}
                    >
                        <div className="ticket-header">
                            <div className="ticket-key">{ticket.key}</div>
                            {ticket.fields.parent && (
                                <div className="ticket-epic-mini">
                                    {ticket.fields.parent.fields.summary}
                                </div>
                            )}
                        </div>
                        <div className="ticket-summary">{ticket.fields.summary}</div>
                        <div className="ticket-meta">
                            <span className={`status-badge ${getStatusClass(ticket.fields.status?.name || '')}`}>
                                {ticket.fields.status?.name || 'Unknown'}
                            </span>
                            <span>Updated: {new Date(ticket.fields.updated).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketList;
