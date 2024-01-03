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
	rows: FieldProps[][];
}

interface Layout {
	layout: LayoutProps;
}
