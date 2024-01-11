'use client';
import { Formstyles } from '@/styles';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextInput, Label } from 'flowbite-react';
export default function FormBuilder({ layout }: Layout) {
	const router = useRouter();
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const url = `/api${layout.formTarget}?action=${layout.formAction}`;
		const formData = new FormData(e.target);
		const jsonData: any = {};
		formData.forEach((value, key) => {
			jsonData[key] = value;
		});
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonData)
		});
		if (response.redirected) {
			router.push(response.url);
			return;
		}
		const data = await response.json();
		if (data.error) {
			setError(true);
			setErrorMessage(data.message);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className={Formstyles.container.large}>
				<h2 className={Formstyles.header}>{layout.title}</h2>
				<ErrorField status={{ error, message: errorMessage }} />
				<BuildForm layout={layout} />
			</form>
		</>
	);
}

type Status = {
	error: boolean;
	message: string;
};

function ErrorField({ status }: { status: Status }) {
	return status.error ? (
		<p className={Formstyles.status}>{status.message}</p>
	) : null;
}

function BuildForm({ layout }: Layout) {
	return (
		<>
			{layout.rows.map((row, rowIndex) => (
				<div
					key={rowIndex}
					className={row.length > 1 ? Formstyles.formBlock : Formstyles.formRow}
				>
					{row.map((field, fieldIndex) => (
						<div key={fieldIndex}>
							<Label htmlFor={field.fieldKey} className={Formstyles.label}>
								{field.fieldName}
							</Label>
							<TextInput
								className={Formstyles.input}
								type={field.fieldType}
								name={field.fieldKey}
								id={field.fieldKey}
							/>
						</div>
					))}
				</div>
			))}
			<div
				className={
					layout.forgot
						? `${Formstyles.buttonContainer} justify-between`
						: `${Formstyles.buttonContainer} justify-center`
				}
			>
				<button type='submit' className={Formstyles.button}>
					{layout.formAction}
				</button>
				{layout.forgot ? (
					<a
						className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
						href='#'
					>
						Forgot Password?
					</a>
				) : null}
			</div>
		</>
	);
}
