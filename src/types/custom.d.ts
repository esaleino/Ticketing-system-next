interface IronSessionData {
	username?: string;
}
interface SessionStatus {
	sessionOk: boolean;
	sessionMessage: string;
}
interface FieldProps {
	fieldName: string;
	fieldType: string;
	fieldKey: string;
}

interface LayoutProps {
	title: string;
	formAction: string;
	formTarget: string;
	forgot?: boolean;
	rows: FieldProps[][];
}

interface Layout {
	layout: LayoutProps;
}
