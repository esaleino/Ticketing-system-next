type User = {
	username: string;
	password: string;
};
export function loginHandler(user: User) {
	if (user.username === 'admin' && user.password === 'admin') {
		return true;
	} else {
		return false;
	}
}
