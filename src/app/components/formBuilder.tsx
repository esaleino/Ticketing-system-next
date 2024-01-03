'use client';
import { Formstyles } from '@/styles';
import { TextInput, Label } from 'flowbite-react';
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

	return <BuildForm layout={layout} />;
}

function BuildForm({ layout }: Layout) {
	return (
		<form
			onSubmit={() => {
				console.log('submit test');
			}}
			className={Formstyles.container.small}
		>
			{layout.rows.map((row, rowIndex) => (
				<div key={rowIndex} className={Formstyles.formRow}>
					{row.map((field, fieldIndex) => (
						<div key={fieldIndex} className='input-field'>
							<Label htmlFor={field.fieldName} className={Formstyles.label}>
								{field.fieldName}
							</Label>
							<TextInput
								className={Formstyles.input}
								type={field.fieldType}
								name={field.fieldKey}
							/>
						</div>
					))}
				</div>
			))}
			<button type='submit' className={Formstyles.button}>
				Register
			</button>
		</form>
	);
}
