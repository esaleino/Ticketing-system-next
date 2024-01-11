'use server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, getSession, SessionData } from '@/lib/session';
import { NextResponse, type NextRequest } from 'next/server';

export default async function Authenticate(req: NextRequest) {
	const res = await NextResponse.next();
	const session = await getIronSession<SessionData>(req, res, sessionOptions);
	const auth = await getSession(session);
	console.log(auth);
	if (auth.sessionOk === true && req.nextUrl.pathname === '/login') {
		const url = new URL(new URL('/', req.url));
		return NextResponse.redirect(url);
	}
	if (auth.sessionOk === false && req.nextUrl.pathname !== '/login') {
		const url = new URL(new URL('/error', req.url));

		url.searchParams.set(
			'error',
			JSON.stringify({
				status: 401,
				message: auth.sessionMessage
			})
		);
		return NextResponse.redirect(url, { headers: res.headers });
	}
}
export const config = {
	matcher: '/user/:path*'
};
