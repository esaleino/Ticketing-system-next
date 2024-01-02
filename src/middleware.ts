'use server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, getSession, SessionData } from '@/lib/session';
import { NextResponse, type NextRequest } from 'next/server';

export default async function Authenticate(req: NextRequest) {
	const session = await getIronSession<SessionData>(cookies(), sessionOptions);
	console.log('session in middleware: ' + JSON.stringify(session));
	const auth = await getSession(session);
	console.log('res in middleware: ' + JSON.stringify(auth));
	if (auth.sessionOk === false) {
		const url = new URL(new URL('/error', req.url));
		url.searchParams.set(
			'error',
			JSON.stringify({
				status: 401,
				message: auth.sessionMessage
			})
		);
		return NextResponse.redirect(url);
	}
}
export const config = {
	matcher: '/user/:path*'
};
