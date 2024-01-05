import { SessionOptions, getIronSession } from 'iron-session';
const ttl = process.env.SESSION_TTL ? parseInt(process.env.SESSION_TTL) : 0;

export interface SessionData {
	username: string;
	isLoggedIn: boolean;
	userId?: number;
	expiry?: number;
	sessionId?: string;
}

export interface ClientSession {
	session: SessionData;
}

export const defaultSession: SessionData = {
	username: '',
	isLoggedIn: false
};

const sessionStorage: Record<string, SessionData> = {};

export const sessionOptions: SessionOptions = {
	password:
		process.env.SESSION_PASSWORD ?? 'default-password-should-be-changed',
	cookieName: process.env.SESSION_COOKIE_NAME ?? 'nextjs-iron-session-example',
	ttl: ttl,
	cookieOptions: {
		// secure only works in `https` environments
		// if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
		secure: true,
		maxAge: ttl === 0 ? 2147483647 : ttl
	}
};

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createSession(data: SessionData) {
	const userId = Math.round(Math.random() * 1000);
	const session: SessionData = {
		username: data.username,
		isLoggedIn: data.isLoggedIn,
		userId: userId,
		expiry: Date.now() + ttl * 1000
	};
	let sessionId = Math.random().toString(36).substring(2, 15);
	while (sessionStorage[sessionId]) {
		sessionId = Math.random().toString(36).substring(2, 15);
	}
	sessionStorage[sessionId] = session;
	return { sessionId, userId };
}

export function getSession(data: SessionData) {
	const response = <SessionStatus>{};
	if (data.sessionId && sessionStorage[data.sessionId]) {
		const session = sessionStorage[data.sessionId];
		if (session.expiry && session.expiry > Date.now()) {
			response.sessionOk = true;
			response.sessionMessage = 'Session is valid';
		} else {
			response.sessionOk = false;
			response.sessionMessage = 'Session has expired';
			delete sessionStorage[data.sessionId];
		}
	} else {
		response.sessionOk = false;
		response.sessionMessage = 'Session not found';
	}
	return response;
}

/* setInterval(
	() => {
		let count = 0;
		const now = new Date();
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const seconds = now.getSeconds().toString().padStart(2, '0');
		console.log(
			`Session storage cleanup @ Current time: ${hours}:${minutes}:${seconds}`
		);
		for (const sessionId in sessionStorage) {
			const session = sessionStorage[sessionId];
			if (session && session.expiry && session.expiry < Date.now()) {
				// Session has expired, remove it
				count++;
				delete sessionStorage[sessionId];
			}
		}
		console.log(`Removed ${count} expired sessions`);
	},
	process.env.SESSION_CLEANUP_INTERVAL
		? parseInt(process.env.SESSION_CLEANUP_INTERVAL) * 1000 * 60
		: 60000
); */
