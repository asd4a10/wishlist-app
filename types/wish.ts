export type Wish = {
	id: string;
	title: string;
	description: string | null;
	isPurchased: boolean;
	targetDate: string | null;
	price: number | null;
	productUrl: string;
	imageUrl: string | null;
	createdAt: string;
};
