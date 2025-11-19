import React from 'react';

const TicketList = ({ tickets, loading, error, onTicketClick }) => {
    if (loading) {
        return (
            <div className="ticket-list-container">
                <div className="ticket-list-header">
                    <h2>Active Tickets</h2>
                </div>
                <p>Loading tickets...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="ticket-list-container">
                <div className="ticket-list-header">
                    <h2>Active Tickets</h2>
                </div>
                <p style={{ color: 'var(--error-color)' }}>{error}</p>
            </div>
        );
    }

    const getStatusClass = (status) => {
        const s = status.toLowerCase();
        if (s.includes('done') || s.includes('complete')) return 'status-done';
        if (s.includes('progress')) return 'status-inprogress';
        if (s.includes('review')) return 'status-review';
        if (s.includes('block')) return 'status-blocked';
        return 'status-todo';
    };

    return (
        <div className="ticket-list-container glass-panel">
            <div className="ticket-list-header">
                <h2>Active Tickets ({tickets.length})</h2>
            </div>
            <div className="tickets-scroll">
                {tickets.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No tickets assigned.</p>
                ) : (
                    tickets
                        .sort((a, b) => {
                            const statusA = a.fields.status.name.toLowerCase();
                            const statusB = b.fields.status.name.toLowerCase();

                            // 1. In Progress first
                            const aInProgress = statusA.includes('progress');
                            const bInProgress = statusB.includes('progress');
                            if (aInProgress && !bInProgress) return -1;
                            if (!aInProgress && bInProgress) return 1;

                            // 2. Done last
                            const aDone = statusA.includes('done');
                            const bDone = statusB.includes('done');
                            if (aDone && !bDone) return 1;
                            if (!aDone && bDone) return -1;

                            return 0;
                        })
                        .map((ticket) => (
                            <div
                                key={ticket.id}
                                className={`ticket-card`}
                                onClick={() => onTicketClick(ticket)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="ticket-key">{ticket.key}</div>
                                <div className="ticket-summary">{ticket.fields.summary}</div>
                                <div className="ticket-meta">
                                    <span className={`status-badge ${getStatusClass(ticket.fields.status.name)}`}>
                                        {ticket.fields.status.name}
                                    </span>
                                    <span>
                                        Updated: {new Date(ticket.fields.updated).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
};

export default TicketList;
