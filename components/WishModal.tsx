import {
	KeyboardAvoidingView,
	Modal,
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Text,
	ScrollView,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import dayjs from "dayjs";
import { Wish } from "@/types/wish"; // You'll need to create this type file
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ProductURLFetcher } from "./ProductURLFetcher";
type WishModalProps = {
	isVisible: boolean;
	onClose: () => void;
	onSave: (newWish: Wish) => void;
};

const initialWish: Wish = {
	id: "",
	title: "",
	description: "",
	isPurchased: false,
	targetDate: null,
	price: null,
	productUrl: "",
	imageUrl: "",
	createdAt: new Date(),
};

export function WishModal({ isVisible, onClose, onSave }: WishModalProps) {
	const [showUrlFetcher, setShowUrlFetcher] = useState(true);
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
		setWish({ ...wish, productUrl: newProductUrl });
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
			<View style={styles.closeButtonContainer}>
				<TouchableOpacity style={styles.closeButton} onPress={onClose}>
					<MaterialIcons name="close" size={20} color="white" />
				</TouchableOpacity>
			</View>
			<ScrollView style={styles.scrollView}>
				{/* {showUrlFetcher ? (
					<ProductURLFetcher />
				) : ( */}
				<KeyboardAvoidingView behavior="padding" style={styles.modalContent}>
					<View style={styles.modalContent}>
						{/* <Text style={styles.modalTitle}>Add a Wish</Text> */}
						<Text style={styles.wishTitleText}>What do you want?</Text>
						<TextInput
							style={styles.wishTitleInput}
							value={wish.title}
							onChangeText={handleWishTitleUpdate}
							placeholder="Macbook Pro"
							placeholderTextColor="gray"
						/>
						<Text style={styles.wishTitleText}>Describe it</Text>
						<TextInput
							style={styles.wishTitleInput}
							value={wish.description || ""}
							onChangeText={handleWishDescriptionUpdate}
							placeholder="16GB RAM, 1TB SSD, M3 chip (optional)"
							placeholderTextColor="gray"
						/>
						<Text style={styles.wishTitleText}>Price</Text>
						<TextInput
							style={styles.wishTitleInput}
							value={wish.price?.toString() || ""}
							onChangeText={handleWishPriceUpdate}
							placeholder="$1000 (optional)"
							placeholderTextColor="gray"
						/>
						<Text style={styles.wishTitleText}>Product URL</Text>
						<TextInput
							style={styles.wishTitleInput}
							value={wish.productUrl}
							onChangeText={handleWishProductUrlUpdate}
							placeholder="https://www.amazon.com/products/1234567890 (optional)"
							placeholderTextColor="gray"
						/>
						<Text style={styles.wishTitleText}>Image URL</Text>
						<TextInput
							style={styles.wishTitleInput}
							value={wish.imageUrl || ""}
							onChangeText={handleWishImageUrlUpdate}
							placeholder="https://www.amazon.com/products/1234567890 (optional)"
							placeholderTextColor="gray"
						/>
						<BouncyCheckbox
							textStyle={styles.checkbox}
							isChecked={isDeadlineVisible}
							onPress={() => setIsDeadlineVisible(!isDeadlineVisible)}
							text="Target date"
							size={25}
							fillColor="white"
							iconStyle={{ borderColor: "white" }}
							innerIconStyle={{ borderWidth: 2, backgroundColor: "black" }}
							checkIconImageSource={undefined}
						/>
						<View style={styles.datePickerContainer}>
							{isDeadlineVisible && (
								<DateTimePicker
									date={wish.targetDate || new Date()}
									onChange={(params) => handleWishTargetDateUpdate(params.date)}
									mode="single"
									headerButtonColor="white"
									headerTextStyle={styles.defaultTextStyle}
									calendarTextStyle={styles.defaultTextStyle}
									selectedTextStyle={styles.defaultTextStyle}
									todayTextStyle={styles.defaultTextStyle}
									weekDaysTextStyle={styles.defaultTextStyle}
									monthContainerStyle={styles.monthYearContainerStyle}
									yearContainerStyle={styles.monthYearContainerStyle}
								/>
							)}
						</View>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
			<View style={styles.addWishButtonContainer}>
				<TouchableOpacity style={styles.addWishButton} onPress={handleSave}>
					<Text style={styles.addWishButtonText}>add wish</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		height: "100%",
		width: "100%",
		backgroundColor: "black",
	},
	modalContent: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		height: "100%",
		width: "100%",
		paddingHorizontal: "2.5%",
		paddingTop: "7%",
		marginHorizontal: "auto",
		backgroundColor: "black",
		gap: 10,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	wishTitleText: {
		fontSize: 24,
		fontWeight: "bold",
		alignSelf: "flex-start",
		color: "white",
	},
	wishTitleInput: {
		height: 40,
		width: "100%",
		borderColor: "#333",
		borderWidth: 1,
		borderRadius: 15,
		paddingHorizontal: 10,
		color: "white",
		backgroundColor: "#111",
	},
	input: {
		height: 40,
		width: "80%",
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 15,
		paddingHorizontal: 10,
	},
	addWishButtonContainer: {
		position: "absolute",
		bottom: 100,
		width: "100%",
		alignItems: "center",
	},
	addWishButton: {
		backgroundColor: "#111",
		borderWidth: 4,
		borderColor: "#00ff00",
		borderRadius: 20,
		padding: 5,
		width: "50%",
		alignItems: "center",
	},
	addWishButtonText: {
		color: "#00ff00",
		fontSize: 30,
		fontWeight: "bold",
	},
	closeButtonContainer: {
		position: "absolute",
		top: 10,
		alignSelf: "center",
		zIndex: 2,
		elevation: 2,
	},
	closeButton: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: "#111",
		borderWidth: 2,
		borderColor: "#333",
		justifyContent: "center",
		alignItems: "center",
	},
	closeButtonText: {
		color: "white",
		fontSize: 20,
		lineHeight: 20,
		textAlign: "center",
		marginTop: -2, // Small adjustment for visual centering of the × symbol
	},
	datePickerContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "flex-start",
		marginBottom: 150,
	},
	checkbox: {
		textDecorationLine: "none",
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
	},
	defaultTextStyle: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
	},
	monthYearContainerStyle: {
		backgroundColor: "black",
	},
});
