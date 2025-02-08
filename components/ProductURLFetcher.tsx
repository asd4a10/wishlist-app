import { useState } from "react";
import {
	Modal,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
	ActivityIndicator,
	Text,
} from "react-native";
import { ProductData, scrapeProductUrl } from "@/lib/api/scraper";
import { IconSymbol } from "./ui/IconSymbol";

interface AddProductUrlModalProps {
	onProductAdd: (productData: ProductData) => void;
}

export function ProductURLFetcher({ onProductAdd }: AddProductUrlModalProps) {
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async () => {
		if (!url.trim()) {
			setError("Please enter a valid URL");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const productData = await scrapeProductUrl(url);
			onProductAdd(productData);
			setUrl("");
			onClose();
		} catch (err) {
			setError("Failed to fetch product information. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.modalContainer}>
			<View style={styles.modalContent}>
				<View style={styles.header}>
					<Text style={styles.title}>Add Product by URL</Text>
					<TouchableOpacity onPress={onClose}>
						<IconSymbol name="xmark" size={24} color="#666" />
					</TouchableOpacity>
				</View>

				<TextInput
					style={styles.input}
					placeholder="Paste product URL here"
					placeholderTextColor="#666"
					value={url}
					onChangeText={setUrl}
					autoCapitalize="none"
					autoCorrect={false}
				/>

				{error ? <Text style={styles.errorText}>{error}</Text> : null}

				<TouchableOpacity
					style={[styles.button, loading && styles.buttonDisabled]}
					onPress={handleSubmit}
					disabled={loading}
				>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={styles.buttonText}>Fetch Product Details</Text>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContent: {
		backgroundColor: "#111",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
		gap: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		color: "white",
	},
	input: {
		backgroundColor: "#222",
		borderRadius: 12,
		padding: 16,
		color: "white",
		fontSize: 16,
	},
	button: {
		backgroundColor: "#007AFF",
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	buttonDisabled: {
		opacity: 0.7,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	errorText: {
		color: "#ff4444",
		fontSize: 14,
	},
});
