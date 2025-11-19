import axios from 'axios';

interface JiraIssue {
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
    };
    browseUrl?: string;
}

interface JiraUser {
    accountId: string;
    displayName: string;
    emailAddress: string;
}

const JIRA_URL = process.env.JIRA_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

const hasJiraCredentials = JIRA_URL && JIRA_EMAIL && JIRA_API_TOKEN && JIRA_PROJECT_KEY;

// Mock data for development
const mockIssues: JiraIssue[] = [
    {
        key: 'DEMO-101',
        fields: {
            summary: 'Implement user authentication',
            status: { name: 'In Progress' },
            priority: { name: 'High' },
            assignee: {
                accountId: '1',
                displayName: 'John Doe',
                emailAddress: 'john@example.com'
            },
            updated: new Date().toISOString()
        },
        browseUrl: 'https://demo.atlassian.net/browse/DEMO-101'
    },
    {
        key: 'DEMO-102',
        fields: {
            summary: 'Fix navigation bug',
            status: { name: 'To Do' },
            assignee: {
                accountId: '2',
                displayName: 'Jane Smith',
                emailAddress: 'jane@example.com'
            },
            updated: new Date().toISOString()
        },
        browseUrl: 'https://demo.atlassian.net/browse/DEMO-102'
    }
];

const mockUsers: JiraUser[] = [
    { accountId: '1', displayName: 'John Doe', emailAddress: 'john@example.com' },
    { accountId: '2', displayName: 'Jane Smith', emailAddress: 'jane@example.com' }
];

export async function getProjectIssues(): Promise<JiraIssue[]> {
    if (!hasJiraCredentials) {
        console.log('Using mock data - Jira credentials not configured');
        return mockIssues;
    }

    try {
        const jql = `project = ${JIRA_PROJECT_KEY} AND sprint in openSprints() ORDER BY updated DESC`;

        console.log('Fetching Jira issues with JQL:', jql);

        const response = await axios.post(
            `${JIRA_URL}/rest/api/3/search/jql`,
            {
                jql,
                fields: ['summary', 'status', 'assignee', 'updated', 'priority', 'parent'],
                maxResults: 100
            },
            {
                auth: {
                    username: JIRA_EMAIL!,
                    password: JIRA_API_TOKEN!
                },
                headers: { 'Content-Type': 'application/json' }
            }
        );

        console.log(`Found ${response.data.issues?.length || 0} issues`);

        if (!response.data.issues || response.data.issues.length === 0) {
            console.log('No issues found in active sprint');
            return [];
        }

        const issues = response.data.issues.map((issue: any) => ({
            ...issue,
            browseUrl: `${JIRA_URL}/browse/${issue.key}`
        }));

        return issues;
    } catch (error: any) {
        console.error('Error fetching Jira issues:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', JSON.stringify(error.response.data, null, 2));
        }
        return [];
    }
}

export async function getProjectUsers(): Promise<JiraUser[]> {
    // Get users from the issues instead of searching all users
    // This ensures we only get users who have tickets assigned
    const issues = await getProjectIssues();

    const usersMap = new Map<string, JiraUser>();

    issues.forEach(issue => {
        const assignee = issue.fields.assignee;
        if (assignee && !usersMap.has(assignee.accountId)) {
            usersMap.set(assignee.accountId, {
                accountId: assignee.accountId,
                displayName: assignee.displayName,
                emailAddress: assignee.emailAddress || ''
            });
        }
    });

    return Array.from(usersMap.values());
}

export function getSprintBoardUrl(): string | null {
    if (!JIRA_URL || !JIRA_PROJECT_KEY) {
        return null;
    }
    // For Jira Cloud, boards have specific IDs. Try to get from env, otherwise fallback to generic URL
    const boardId = process.env.JIRA_BOARD_ID;
    if (boardId) {
        return `${JIRA_URL}/jira/software/c/projects/${JIRA_PROJECT_KEY}/boards/${boardId}`;
    }
    return `${JIRA_URL}/jira/software/projects/${JIRA_PROJECT_KEY}/boards`;
}
