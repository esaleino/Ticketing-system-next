'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Login from '@/login/page';
import Spinner from '@/components/loadingSpinner';
type ErrorObject = {
	status: number;
	message: string;
};
const DefaultError: ErrorObject = {
	status: 405,
	message: 'Unknown error'
};

export default function ErrorPage() {
	const params = useSearchParams();
	const [error, setError] = useState(DefaultError);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (loading) {
			if (params.get('error') !== null) {
				const errorRaw = params.get('error') ?? 'unknown error';
				setError(JSON.parse(errorRaw));
				setLoading(false);
			}
		}
	}, [error, loading, params]);
	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<h1>401 - Forbidden</h1>
					<p>Status: {error.status}</p>
					<p>Message: {error.message}</p>
					<Login />
				</>
			)}
		</>
	);
}
