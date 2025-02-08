export type Wish = {
	id: string;
	title: string;
	description: string | null;
	isPurchased: boolean;
	targetDate: Date | null;
	price: number | null;
	productUrl: string;
	imageUrl: string | null;
	createdAt: Date;
};
