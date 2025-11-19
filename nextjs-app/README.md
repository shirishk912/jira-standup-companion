# MMH Standup Companion (Next.js)

A modern, interactive web application for streamlining daily standup meetings with Jira integration. Built with **Next.js 16 and TypeScript**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/next.js-16.0-black.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.0-blue.svg)

## ✨ Features

- 🎨 **Modern Ludic UI** - Glassmorphism design with animated gradients
- ⏱️ **60-Second Timer** - Visual progress ring with auto-advance
- 🎉 **Celebration Effects** - Confetti and sound on completion
- 📊 **Jira Integration** - Real-time ticket fetching from active sprints
- 👥 **Team Carousel** - Navigate through team members with shuffle
- 🎫 **Ticket Preview** - Click tickets for detailed modal view
- 📈 **Progress Tracking** - Visual meeting progress indicator
- 🏁 **Meeting Summary** - Celebration screen with stats
- 🔀 **Random Order** - Shuffle team members for fairness

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Jira account with API access

### Installation

1. **Clone and navigate**
   ```bash
   git clone https://github.com/shirishk912/jira-standup-companion.git
   cd jira-standup-companion/nextjs-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Create `.env.local`:
   ```env
   JIRA_URL=https://your-domain.atlassian.net
   JIRA_EMAIL=your-email@example.com
   JIRA_API_TOKEN=your-api-token
   JIRA_PROJECT_KEY=YOUR_PROJECT_KEY
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   
   Navigate to `http://localhost:3000`

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

Your app will be live at `https://your-app.vercel.app`

## 📁 Project Structure

```
nextjs-app/
├── src/
│   ├── app/
│   │   ├── api/              # API routes (replaces Express)
│   │   │   ├── issues/
│   │   │   └── users/
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Main page
│   ├── components/           # React components
│   │   ├── Timer.tsx
│   │   ├── UserCarousel.tsx
│   │   ├── TicketList.tsx
│   │   ├── TicketModal.tsx
│   │   ├── ProgressBar.tsx
│   │   └── MeetingEnded.tsx
│   ├── lib/                  # Utilities
│   │   └── jiraClient.ts     # Jira API integration
│   └── utils/
│       └── sound.ts          # Audio utilities
└── package.json
```

## 🛠️ Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: CSS (Glassmorphism)
- **API**: Next.js API Routes
- **Jira**: REST API v3
- **Effects**: canvas-confetti

## 🎮 Usage

1. **Start Meeting** - App loads team members with tickets
2. **Navigate** - Use arrows or shuffle button
3. **Timer** - 60-second countdown with auto-advance
4. **View Tickets** - Click any ticket for details
5. **Complete** - Celebration screen when everyone's done

## 🔧 Configuration

### Timer Duration

Edit `src/app/page.tsx`:
```typescript
<Timer duration={60} ... />  // Change to desired seconds
```

### Jira Query

Edit `src/lib/jiraClient.ts`:
```typescript
const jql = `project = ${JIRA_PROJECT_KEY} AND sprint in openSprints()`;
```

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

**API routes not working?**
- Ensure `.env.local` exists
- Restart dev server after adding env vars

**TypeScript errors?**
- Run `npm run build` to see all errors
- Check type definitions in components

**Styles not loading?**
- Verify `globals.css` import in `layout.tsx`

## 📝 License

MIT License - feel free to use this project!

## 🙏 Acknowledgments

Built with ❤️ for better standup meetings using Next.js and TypeScript.
