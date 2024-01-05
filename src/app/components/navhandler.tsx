'use client';
import { ClientSession } from '@/lib/session';
import dynamic from 'next/dynamic';
const TopNav = dynamic(() => import('./navbar'), { ssr: false });

export default function TopNavbar({ session }: ClientSession) {
	return <TopNav session={session} />;
}
