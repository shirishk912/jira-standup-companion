import { NextResponse } from 'next/server';
import { getProjectIssues } from '@/lib/jiraClient';

export async function GET() {
    try {
        const issues = await getProjectIssues();
        return NextResponse.json(issues);
    } catch (error) {
        console.error('Error in /api/issues:', error);
        return NextResponse.json(
            { error: 'Failed to fetch issues' },
            { status: 500 }
        );
    }
}
