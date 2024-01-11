import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeModeScript } from 'flowbite-react';
import TopNav from '@/components/navbar';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import {
	ClientSession,
	sessionOptions,
	SessionData,
	defaultSession
} from '@/session';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
	title: 'Random chat app',
	description: 'Random chat app'
};

export default async function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const session = await loadSession();
	const body =
		'bg-primaryBgLight dark:bg-primaryBgDark my-0 py-0 text-black dark:text-white';
	/* const router = useRouter();
	const navigateTo = (path: string) => {
		router.push(path);
	}; */
	return (
		<html lang='en'>
			<head>
				<ThemeModeScript />
			</head>

			<body className={(inter.className, body)}>
				<TopNav session={session} />
				{JSON.stringify(session)}
				{children}
			</body>
		</html>
	);
}

async function loadSession() {
	const session = await getIronSession<SessionData>(cookies(), sessionOptions);
	if (session.username === undefined) {
		return defaultSession;
	} else {
		return { username: session.username, isLoggedIn: session.isLoggedIn };
	}
}
