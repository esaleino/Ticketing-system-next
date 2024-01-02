export async function POST(request: Request) {
	try {
		const data = await request.json();
		return new Response(JSON.stringify(data), {
			headers: { 'content-type': 'application/json' }
		});
	} catch (error: any) {
		console.error('Error:', error.message);
		return new Response(JSON.stringify({ message: 'Error saving data' }), {
			headers: { 'Content-Type': 'application/json' },
			status: 500 // Internal Server Error
		});
	}
}
