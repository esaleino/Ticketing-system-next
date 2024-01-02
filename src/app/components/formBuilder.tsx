'use client';
import { useEffect, useState } from 'react';
import Spinner from './loadingSpinner';
interface FieldProps {
	fieldName: string;
	fieldType: string;
	fieldKey: string;
}

interface LayoutProps {
	rows: FieldProps[][];
}

interface Layout {
	layout: LayoutProps;
}

export default function FormBuilder({ layout }: Layout) {
	/* const [loading, setLoading] = useState(true);
	const [elements, setElements] = useState();
	const buildForm = () => {
		setElements(items);
		setLoading(false);
	};
	useEffect(() => {
		buildForm();
	}); */

	return (
		<>
			<form>
				{layout.rows.map((row, rowIndex) => (
					<div key={rowIndex} className='input-row'>
						{row.map((field, fieldIndex) => (
							<div key={fieldIndex} className='input-field'>
								<label>{field.fieldName}</label>
								<input type={field.fieldType} name={field.fieldKey} />
							</div>
						))}
					</div>
				))}
				<button type='submit'>Submit</button>
			</form>
		</>
	);
}
