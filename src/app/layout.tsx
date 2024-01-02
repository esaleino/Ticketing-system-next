'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SessionData, defaultSession } from '@/lib/session';
import { fetchSession } from '@/components/getIronSession';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const [session, setSession] = useState<SessionData>(defaultSession);
	const [isLoading, setIsLoading] = useState(true);
	const [res, setRes] = useState<SessionStatus>();
	const router = useRouter();
	const getTheSesh = async () => {
		fetchSession().then((data) => {
			setSession(data);
			setIsLoading(false);
		});
	};
	const navigateTo = (path: string) => {
		router.push(path);
	};
	return (
		<html lang='en'>
			<body className={inter.className}>
				{JSON.stringify(session)}
				<button onClick={() => getTheSesh()}>Get Session</button>
				<div>
					<nav>
						<button onClick={() => navigateTo('/')}>Home</button>
						<button onClick={() => navigateTo('/about')}>About</button>
						{/* Add more navigation links as needed */}
					</nav>
					{children}
				</div>
			</body>
		</html>
	);
}
