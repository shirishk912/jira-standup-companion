# MMH Standup Companion 🎯

A modern, interactive web application for streamlining daily standup meetings with Jira integration. Features a beautiful glassmorphism UI, automatic timer, and real-time ticket tracking.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-61dafb.svg)

## ✨ Features

- 🎨 **Modern Ludic UI** - Glassmorphism design with animated gradients
- ⏱️ **60-Second Timer** - Visual progress ring with auto-advance
- 🎉 **Celebration Effects** - Confetti and sound on completion
- 📊 **Jira Integration** - Real-time ticket fetching from active sprints
- 👥 **Team Carousel** - Navigate through team members with avatars
- 🎫 **Ticket Preview** - Click tickets for detailed modal view
- 📈 **Progress Tracking** - Visual meeting progress indicator
- 🏁 **Meeting Summary** - Celebration screen with stats at the end

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- Jira account with API access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shirishk912/jira-standup-companion.git
   cd jira-standup-companion
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure Jira credentials**
   
   Create a `.env` file in the `server` directory:
   ```bash
   cd ../server
   touch .env
   ```

   Add your Jira credentials to `.env`:
   ```env
   JIRA_URL=https://your-domain.atlassian.net
   JIRA_EMAIL=your-email@example.com
   JIRA_API_TOKEN=your-api-token-here
   JIRA_PROJECT_KEY=YOUR_PROJECT_KEY
   ```

   **How to get a Jira API Token:**
   1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
   2. Click "Create API token"
   3. Give it a name and copy the token

4. **Start the application**

   Open two terminal windows:

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
standup-companion/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Timer.jsx
│   │   │   ├── UserCarousel.jsx
│   │   │   ├── TicketList.jsx
│   │   │   ├── TicketModal.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── MeetingEnded.jsx
│   │   ├── utils/         # Utility functions
│   │   │   └── sound.js
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   └── package.json
├── server/                # Node.js backend
│   ├── index.js          # Express server
│   ├── jiraClient.js     # Jira API integration
│   ├── .env              # Environment variables (not in git)
│   └── package.json
└── README.md
```

## 🎮 Usage

1. **Start the Meeting** - The app loads all team members with assigned tickets
2. **Navigate Users** - Use arrow buttons or let the timer auto-advance
3. **View Tickets** - Click any ticket to see details and open in Jira
4. **Track Progress** - Monitor meeting progress in the left sidebar
5. **Celebrate** - When everyone's done, enjoy the celebration screen!

## 🎨 UI Features

- **Control Panel Sidebar**
  - User avatar with initials
  - Visual countdown timer
  - Meeting progress bar

- **Ticket Display**
  - Color-coded status badges
  - Sorted by priority (In Progress → To Do → Done)
  - Click to preview full details

- **Animations**
  - Confetti celebration on user completion
  - Sound effects for timer events
  - Smooth transitions and hover effects

## 🔧 Configuration

### Timer Duration

Edit `client/src/App.jsx`:
```javascript
<Timer
  duration={60}  // Change to desired seconds
  ...
/>
```

### Jira Query

Edit `server/jiraClient.js` to customize the JQL query:
```javascript
const jql = `project = ${projectKey} AND sprint in openSprints()`;
```

## 🛠️ Technologies

**Frontend:**
- React 18.3.1
- Vite 7.2.2
- canvas-confetti
- Web Audio API

**Backend:**
- Node.js
- Express.js
- Axios
- Jira REST API v3

## 🐛 Troubleshooting

**Issue: "Failed to fetch data from server"**
- Ensure the backend server is running on port 3001
- Check your `.env` file has correct Jira credentials

**Issue: No users showing up**
- Verify users have tickets assigned in the current active sprint
- Check the Jira project key is correct

**Issue: Mock data is showing**
- The app falls back to mock data if Jira credentials are missing
- Verify your `.env` file exists and has all required fields

## 📝 License

MIT License - feel free to use this project for your team!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Created with ❤️ for better standup meetings

## 🙏 Acknowledgments

- Inspired by modern design trends and team collaboration needs
- Built with the goal of making daily standups more engaging and efficient
