const axios = require('axios');

const JIRA_URL = process.env.JIRA_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

const api = axios.create({
    baseURL: JIRA_URL,
    headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const getProjectIssues = async () => {
    if (!JIRA_URL || !JIRA_EMAIL || !JIRA_API_TOKEN || !JIRA_PROJECT_KEY) {
        console.log('Missing Jira credentials, returning MOCK data for issues.');
        return [
            { id: '1', key: 'PROJ-101', fields: { summary: 'Fix login bug', status: { name: 'In Progress' }, updated: new Date().toISOString(), assignee: { accountId: 'user1', displayName: 'Alice' } }, browseUrl: 'https://jira.atlassian.com/browse/PROJ-101' },
            { id: '2', key: 'PROJ-102', fields: { summary: 'Update documentation', status: { name: 'To Do' }, updated: new Date().toISOString(), assignee: { accountId: 'user2', displayName: 'Bob' } }, browseUrl: 'https://jira.atlassian.com/browse/PROJ-102' },
            { id: '3', key: 'PROJ-103', fields: { summary: 'Refactor API', status: { name: 'Done' }, updated: new Date().toISOString(), assignee: { accountId: 'user1', displayName: 'Alice' } }, browseUrl: 'https://jira.atlassian.com/browse/PROJ-103' },
        ];
    }

    // JQL to get issues for the project, ordered by updated date
    // JQL to get issues for the project, ordered by updated date
    const jql = `project = ${JIRA_PROJECT_KEY} AND sprint in openSprints() ORDER BY updated DESC`;

    try {
        const response = await api.post('/rest/api/3/search/jql', {
            jql,
            fields: ['summary', 'status', 'assignee', 'updated', 'priority'],
            maxResults: 100
        });
        return response.data.issues.map(issue => ({
            ...issue,
            browseUrl: `${JIRA_URL}/browse/${issue.key}`
        }));
    } catch (error) {
        console.error('Jira API Error (getProjectIssues):', error.response?.data || error.message);
        throw error;
    }
};

const getProjectUsers = async () => {
    if (!JIRA_URL || !JIRA_EMAIL || !JIRA_API_TOKEN || !JIRA_PROJECT_KEY) {
        console.log('Missing Jira credentials, returning MOCK data for users.');
        return [
            { accountId: 'user1', displayName: 'Alice', active: true },
            { accountId: 'user2', displayName: 'Bob', active: true },
            { accountId: 'user3', displayName: 'Charlie', active: true },
        ];
    }

    try {
        // Get assignable users for the project
        const response = await api.get('/rest/api/3/user/assignable/search', {
            params: {
                project: JIRA_PROJECT_KEY,
                maxResults: 50
            }
        });
        // Filter out active users only and maybe exclude bots if needed
        return response.data.filter(user => user.accountType === 'atlassian' && user.active);
    } catch (error) {
        console.error('Jira API Error (getProjectUsers):', error.response?.data || error.message);
        throw error;
    }
}

module.exports = {
    getProjectIssues,
    getProjectUsers
};
