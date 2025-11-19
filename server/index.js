const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const jiraClient = require('./jiraClient');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get project issues
app.get('/api/issues', async (req, res) => {
  try {
    const issues = await jiraClient.getProjectIssues();
    res.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error.message);
    res.status(500).json({ error: 'Failed to fetch issues from Jira' });
  }
});

// Get project users (assignable)
app.get('/api/users', async (req, res) => {
  try {
    const users = await jiraClient.getProjectUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users from Jira' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
