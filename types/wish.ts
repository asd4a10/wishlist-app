export type Wish = {
	id: string;
	title: string;
	description: string | null;
	purchased: boolean;
	deadline: Date | null;
	price: number | null;
	link: string | null;
	image: string | null;
};
