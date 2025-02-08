import { z } from "zod";

const ProductDataSchema = z.object({
	title: z.string(),
	description: z.string(),
	imageUrl: z.string().url(),
	price: z.string(),
	url: z.string().url(),
});

export type ProductData = z.infer<typeof ProductDataSchema>;

export async function scrapeProductUrl(url: string): Promise<ProductData> {
	try {
		const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/scrape`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url }),
		});

		console.log("response", response);

		if (!response.ok) {
			throw new Error("Failed to scrape product");
		}

		const data = await response.json();
		return ProductDataSchema.parse(data);
	} catch (error) {
		console.error("Error scraping product:", error);
		throw error;
	}
}
