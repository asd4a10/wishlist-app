import { Anthropic } from "@anthropic-ai/sdk";
import * as cheerio from "cheerio";

const anthropic = new Anthropic({
	apiKey: process.env.CLAUDE_API_KEY,
});

export async function POST(req: Request) {
	const { url } = await req.json();

	// Fetch the webpage
	const response = await fetch(url);
	const html = await response.text();

	// Parse HTML
	const $ = cheerio.load(html);

	// Get page content
	const pageContent = $("body").text();

	// Use Claude to extract product information
	const message = await anthropic.messages.create({
		model: "claude-3-opus-20240229",
		max_tokens: 1024,
		messages: [
			{
				role: "user",
				content: `Extract product information from this webpage content. Return a JSON object with title, description, imageUrl, and price.
      
      Webpage content:
      ${pageContent}`,
			},
		],
	});

	// Parse Claude's response and return
	const productData = JSON.parse(message.content);
	return Response.json(productData);
}
