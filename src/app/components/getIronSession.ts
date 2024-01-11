'use client';
import { getSession, sessionOptions, SessionData } from '@/lib/session';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

/* export async function fetchSession() {
	return fetch('api/getUser')
		.then((res) => res.json())
		.then((data) => {
			console.log('data: ', data);
			return data;
		});
}
 */
