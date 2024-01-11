import FormBuilder from '@/components/formBuilder';
const loginForm = {
	title: 'Login',
	formAction: 'login',
	formTarget: '/user',
	forgot: true,
	rows: [
		[{ fieldName: 'Username', fieldType: 'text', fieldKey: 'username' }],
		[{ fieldName: 'Password', fieldType: 'password', fieldKey: 'password' }]
	]
};
export default function Login() {
	return <FormBuilder layout={loginForm} />;
}
