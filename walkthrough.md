# Standup Companion - Walkthrough

The Standup Companion app is ready! It includes a Node.js backend to fetch Jira data and a React frontend to display the standup interface.

## Features
- **Jira Integration**: Fetches issues and users from your Jira project.
- **Mock Mode**: Works without credentials for testing (returns dummy data).
- **Standup Timer**: 60-second countdown timer for each person.
- **Ticket List**: Displays active tickets for the current user.
- **Team Carousel**: Easy navigation between team members.

## How to Run

### 1. Start the Backend
Open a terminal and run:
```bash
cd server
npm start
```
The server will run on `http://localhost:3001`.

### 2. Start the Frontend
Open a new terminal window and run:
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5173` (usually).

## Configuration
To use real Jira data, update the `server/.env` file with your credentials:
```env
JIRA_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-api-token
JIRA_PROJECT_KEY=PROJ
```
> [!NOTE]
> If you don't provide credentials, the app will use **Mock Data** automatically.

## Verification Steps
1.  **Open the App**: Go to the frontend URL in your browser.
2.  **Check Data**: You should see a user (e.g., "Alice" in mock mode) and their tickets.
3.  **Test Timer**: Click "Start" to run the 60s timer. It should turn orange at 30s and red at 10s.
4.  **Switch Users**: Use the arrows to switch users. The timer should reset, and the ticket list should update.
