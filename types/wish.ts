export type Wish = {
	id: string;
	title: string;
	description: string | null;
	completed: boolean;
	deadline: Date | null;
};
