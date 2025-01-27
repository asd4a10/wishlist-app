import {
	KeyboardAvoidingView,
	Modal,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DateTimePicker from "react-native-ui-datepicker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import dayjs from "dayjs";
import { Wish } from "@/types/wish"; // You'll need to create this type file
import { useState } from "react";

type WishModalProps = {
	isVisible: boolean;
	onClose: () => void;
	onSave: (wish: Wish) => void;
};

export function WishModal({ isVisible, onClose, onSave }: WishModalProps) {
	const [wish, setWish] = useState<Wish>({
		id: "",
		title: "",
		description: null,
		completed: false,
		deadline: null,
	});
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

	const handleWishDeadlineUpdate = (newDeadline: Date | null) => {
		setWish({ ...wish, deadline: newDeadline });
	};

	const handleSave = () => {
		if (wish.title) {
			onSave({ ...wish, id: Date.now().toString() });
			setWish({
				id: "",
				title: "",
				description: null,
				completed: false,
				deadline: null,
			});
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

					<View style={styles.datePickerContainer}>
						<BouncyCheckbox
							textStyle={styles.checkbox}
							isChecked={wish.completed}
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
								date={wish.deadline}
								onChange={(params) => handleWishDeadlineUpdate(params.date)}
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
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	floatingButton: {
		position: "absolute",
		bottom: 100,
		right: 20,
		width: 70,
		height: 70,
		borderRadius: "100%",
		backgroundColor: "purple",
		alignItems: "center",
		justifyContent: "center",
	},
	floatingButtonText: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
	},
	scrollContent: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		// flex: 1,
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
		// color: "black",
	},
	input: {
		height: 40,
		width: "80%",
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 15,
		// marginBottom: 10,
		paddingHorizontal: 10,
		// marginVertical: 10,
	},
	textArea: {
		height: 60,
		textAlignVertical: "top",
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
	disabledButton: {
		backgroundColor: "red",
	},
	disabledText: {
		color: "#ECEFF1",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	wishItem: {
		backgroundColor: "lightgray",
		borderRadius: 15,
		padding: 10,
		width: "80%",
		marginVertical: 10,
		alignItems: "center",
	},
	datePickerContainer: {
		width: "100%",
		paddingHorizontal: "10%",
	},
	datePicker: {
		paddingHorizontal: 50,
	},
	checkbox: {
		textDecorationLine: "none",
	},
});
