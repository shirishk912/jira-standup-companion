import { NextResponse } from 'next/server';
import { getSprintBoardUrl } from '@/lib/jiraClient';

export async function GET() {
    try {
        const sprintUrl = getSprintBoardUrl();
        return NextResponse.json({ url: sprintUrl });
    } catch (error) {
        console.error('Error getting sprint URL:', error);
        return NextResponse.json({ url: null }, { status: 500 });
    }
}
