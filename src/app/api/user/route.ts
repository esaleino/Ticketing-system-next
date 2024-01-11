import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { redirect } from 'next/navigation';
import {
	sleep,
	SessionData,
	defaultSession,
	sessionOptions,
	createSession,
	getSession
} from '@/lib/session';
import { loginHandler } from './components/userHandler';

export async function POST(request: NextRequest) {
	const jsonData = await request.json();
	const session = await getIronSession<SessionData>(cookies(), sessionOptions);
	console.log(jsonData);
	const loggedIn = await loginHandler(jsonData);
	if (!loggedIn) {
		return Response.json({
			error: true,
			message: 'Wrong username or password'
		});
	}
	session.isLoggedIn = true;
	session.username = jsonData.username;
	const res = await createSession(session);
	session.userId = res.userId;
	session.sessionId = res.sessionId;
	await session.save();
	return Response.redirect(`${request.nextUrl.origin}/`, 303);
}
export async function GET(request: NextRequest) {
	const session = await getIronSession<SessionData>(cookies(), sessionOptions);
	const action = new URL(request.url).searchParams.get('action');
	if (action === 'logout') {
		session.destroy();
		return redirect('/login');
	}
	console.log('session before res: ' + JSON.stringify(session));
	const res = await getSession(session);
	console.log(res);
	if (res.sessionOk === false) {
		session.destroy();
		return Response.json(defaultSession);
	}
	return Response.json(session);
}
