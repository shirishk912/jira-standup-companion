# Jira Standup Companion 🎯

A modern, interactive Next.js application for streamlining daily standup meetings with Jira integration. Features a beautiful glassmorphism UI with integrated timer, progress tracking, and real-time ticket updates.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/next.js-16.0.3-black.svg)
![React](https://img.shields.io/badge/react-19.2.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)

🚀 **[Live Demo](https://mmh-standup-companion.vercel.app)**

## ✨ Features

- 🎨 **Modern Glassmorphism UI** - Sleek gradient borders and backdrop blur effects
- ⏱️ **Integrated Timer** - Circular progress ring around user avatar with 60-second countdown
- 📊 **Progress Bar** - Modern progress tracker showing current user position (e.g., 1/8)
- 🎉 **Celebration Effects** - Confetti animations and sound on completion
- 📊 **Jira Integration** - Real-time ticket fetching from active sprints
- 👥 **User Carousel** - Beautiful card design with gradient text and floating animations
- 🎫 **Ticket Management** - Click tickets for detailed modal view with Jira links
- 🔗 **Sprint Board Access** - Direct link to Jira sprint board on completion
- 🏁 **Meeting Summary** - Celebration screen with team stats

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- Jira account with API access

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/shirishk912/jira-standup-companion.git
   cd jira-standup-companion/nextjs-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Jira credentials**
   
   Create a `.env.local` file in the `nextjs-app` directory:
   ```env
   JIRA_URL=https://your-domain.atlassian.net
   JIRA_EMAIL=your-email@example.com
   JIRA_API_TOKEN=your-api-token
   JIRA_PROJECT_KEY=YOUR-PROJECT-KEY
   JIRA_BOARD_ID=your-board-id
   ```

   **Get your Jira API token:**
   - Go to https://id.atlassian.com/manage-profile/security/api-tokens
   - Click "Create API token"
   - Copy and paste into `.env.local`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🌐 Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shirishk912/jira-standup-companion)

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd nextjs-app
   vercel --prod
   ```

4. **Set Environment Variables in Vercel Dashboard**
   - Go to your project settings → Environment Variables
   - Add all variables from `.env.local`:
     - `JIRA_URL`
     - `JIRA_EMAIL`
     - `JIRA_API_TOKEN`
     - `JIRA_PROJECT_KEY`
     - `JIRA_BOARD_ID`
   - Select "Production" environment
   - Redeploy after adding variables

## 🎨 UI Components

### User Carousel
- **Modern card design** with gradient borders
- **Circular avatar** with user initials
- **Timer ring** showing countdown progress
- **User details** including name and email
- **Play/Pause/Reset controls** for timer

### Progress Bar
- Clean modern design at the top
- Shows current user position (e.g., "1 / 8")
- Animated gradient fill with shimmer effect

### Ticket List
- Real-time Jira ticket display
- Color-coded status badges
- Click for detailed modal view
- Direct links to Jira issues

### Meeting End Screen
- Celebration with confetti animation
- Team statistics display
- Direct link to Jira sprint board
- Restart meeting button

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules with Glassmorphism
- **API Integration**: Jira REST API v3
- **Deployment**: Vercel
- **Animations**: Canvas Confetti

## 📁 Project Structure

```
nextjs-app/
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   │   ├── issues/   # Fetch Jira issues
│   │   │   ├── users/    # Fetch team members
│   │   │   └── sprint-url/ # Get sprint board URL
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Main app page
│   ├── components/       # React components
│   │   ├── UserCarousel.tsx
│   │   ├── TicketList.tsx
│   │   ├── TicketModal.tsx
│   │   └── MeetingEnded.tsx
│   ├── lib/
│   │   └── jiraClient.ts # Jira API client
│   └── utils/
│       └── sound.ts      # Sound effects
└── public/               # Static assets
```

## 🔧 Configuration

### Jira Board ID

To get your Jira board ID:
1. Navigate to your Jira board
2. Look at the URL: `https://your-domain.atlassian.net/jira/software/c/projects/XXX/boards/[BOARD_ID]`
3. Copy the board ID and add to `.env.local`

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ by [Shirish Kandra](https://github.com/shirishk912)
