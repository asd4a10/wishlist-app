import {
	KeyboardAvoidingView,
	Modal,
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Text,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import dayjs from "dayjs";
import { Wish } from "@/types/wish"; // You'll need to create this type file
import { useState } from "react";

type WishModalProps = {
	isVisible: boolean;
	onClose: () => void;
	onSave: (newWish: Wish) => void;
};

const initialWish: Wish = {
	id: "",
	title: "",
	description: "This is a test description",
	isPurchased: true,
	targetDate: new Date(),
	price: 10,
	productUrl: ["https://www.google.com"],
	imageUrl:
		"https://therunningoutlet.co.uk/wp-content/uploads/2024/04/garmin-forerunner-165-20-front.jpg",
	createdAt: new Date(),
};

export function WishModal({ isVisible, onClose, onSave }: WishModalProps) {
	const [wish, setWish] = useState<Wish>(initialWish);
	const [isFormDisabled, setIsFormDisabled] = useState(false);
	const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
	const [isDeadlineVisible, setIsDeadlineVisible] = useState(false);

	const handleWishTitleUpdate = (newTitle: string) => {
		setWish({ ...wish, title: newTitle });
		setIsFormDisabled(newTitle.trim().length === 0);
	};

	const handleWishDescriptionUpdate = (newDescription: string) => {
		setWish({ ...wish, description: newDescription });
	};

	const handleWishTargetDateUpdate = (newTargetDate: Date | null) => {
		setWish({ ...wish, targetDate: newTargetDate });
	};

	const handleWishPriceUpdate = (newPrice: string) => {
		setWish({ ...wish, price: parseFloat(newPrice) });
	};

	const handleWishProductUrlUpdate = (newProductUrl: string) => {
		setWish({ ...wish, productUrl: newProductUrl.split(",") });
	};

	const handleWishImageUrlUpdate = (newImageUrl: string) => {
		setWish({ ...wish, imageUrl: newImageUrl });
	};

	const handleSave = () => {
		if (wish.title) {
			onSave({ ...wish, id: Date.now().toString() });
			setWish(initialWish);
			setIsDeadlineVisible(false);
		}
	};

	return (
		<Modal
			animationType="slide"
			visible={isVisible}
			onRequestClose={onClose}
			presentationStyle="pageSheet"
		>
			<KeyboardAvoidingView behavior="padding" style={styles.modalContent}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Add a Wish</Text>
					<TextInput
						style={styles.input}
						value={wish.title}
						onChangeText={handleWishTitleUpdate}
						placeholder="Wish title"
					/>
					<TextInput
						style={styles.input}
						value={wish.description || ""}
						onChangeText={handleWishDescriptionUpdate}
						placeholder="Wish description"
					/>
					<TextInput
						style={styles.input}
						value={wish.price?.toString() || ""}
						onChangeText={handleWishPriceUpdate}
						placeholder="Wish price"
					/>
					<TextInput
						style={styles.input}
						value={wish.productUrl.join(", ") || ""}
						onChangeText={handleWishProductUrlUpdate}
						placeholder="Wish product url"
					/>
					<TextInput
						style={styles.input}
						value={wish.imageUrl || ""}
						onChangeText={handleWishImageUrlUpdate}
						placeholder="Wish image url"
					/>
					<View style={styles.datePickerContainer}>
						<BouncyCheckbox
							textStyle={styles.checkbox}
							isChecked={isDeadlineVisible}
							onPress={() => setIsDeadlineVisible(!isDeadlineVisible)}
							text="Has deadline"
							size={25}
							fillColor="black"
							iconStyle={{ borderColor: "black" }}
							innerIconStyle={{ borderWidth: 2 }}
							checkIconImageSource={undefined}
						/>
						{isDeadlineVisible && (
							<DateTimePicker
								date={wish.targetDate}
								onChange={(params) => handleWishTargetDateUpdate(params.date)}
								mode="single"
							/>
						)}
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.addWishButton} onPress={handleSave}>
							<Text style={styles.buttonText}>Add Wish</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.closeButton} onPress={onClose}>
							<Text style={styles.buttonText}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContent: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
		gap: 10,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	input: {
		height: 40,
		width: "80%",
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 15,
		paddingHorizontal: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		gap: "2%",
		width: "100%",
		paddingHorizontal: "10%",
	},
	addWishButton: {
		backgroundColor: "purple",
		borderRadius: 15,
		padding: 10,
		width: "50%",
		alignItems: "center",
	},
	closeButton: {
		backgroundColor: "lightgray",
		borderRadius: 15,
		padding: 10,
		width: "50%",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	datePickerContainer: {
		width: "100%",
		paddingHorizontal: "10%",
		flexDirection: "column",
		alignItems: "center",
	},
	checkbox: {
		textDecorationLine: "none",
	},
});
