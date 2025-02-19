import { Currency } from "@/store/settingsSlice";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
	USD: "$",
	GBP: "£",
	KZT: "₸",
};

export const formatPrice = (price: number, currency: Currency): string => {
	const symbol = CURRENCY_SYMBOLS[currency];

	// Format with thousand separators
	const formattedNumber = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: symbol === "₸" ? 0 : 0,
		maximumFractionDigits: symbol === "₸" ? 0 : 0,
	}).format(price);

	return `${symbol}${formattedNumber}`;
};
