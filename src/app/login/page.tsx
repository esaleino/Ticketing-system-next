import FormBuilder from '@/components/formBuilder';
const loginForm = {
	rows: [
		[
			{ fieldName: 'Username', fieldType: 'text', fieldKey: 'username' },
			{ fieldName: 'Password', fieldType: 'password', fieldKey: 'password' }
		],
		[{ fieldName: 'Email', fieldType: 'email', fieldKey: 'email' }],
		[
			{ fieldName: 'Address', fieldType: 'text', fieldKey: 'address' },
			{ fieldName: 'Phone', fieldType: 'tel', fieldKey: 'phone' }
		]
	]
};
export default function Login() {
	return <FormBuilder layout={loginForm} />;
}
