import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
	title: 'Random chat app',
	description: 'Random chat app'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	/* const router = useRouter();
	const navigateTo = (path: string) => {
		router.push(path);
	}; */
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
