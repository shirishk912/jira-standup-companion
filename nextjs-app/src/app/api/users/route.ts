import { NextResponse } from 'next/server';
import { getProjectUsers } from '@/lib/jiraClient';

export async function GET() {
    try {
        const users = await getProjectUsers();
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error in /api/users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}
