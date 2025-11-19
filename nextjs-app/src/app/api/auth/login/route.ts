import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { passphrase } = await request.json();
        const correctPassphrase = process.env.AUTH_PASSPHRASE;

        if (!correctPassphrase) {
            return NextResponse.json(
                { error: 'Authentication not configured' },
                { status: 500 }
            );
        }

        if (passphrase === correctPassphrase) {
            const response = NextResponse.json({ success: true });
            
            // Set cookie for 30 days
            response.cookies.set('standup-auth', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 days
            });

            return response;
        }

        return NextResponse.json(
            { error: 'Invalid passphrase' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
