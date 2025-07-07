import React from "react";
import { Platform, Keyboard, TouchableWithoutFeedback, View } from "react-native";

export const DismissKeyboardView: React.FC<React.PropsWithChildren> = ({ children }) =>
	Platform.OS === "web" ? ( // ← Web ではキーボードを閉じる必要がない
		<View>{children}</View> //    ので Keyboard.dismiss は呼ばない
	) : (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View>{children}</View>
		</TouchableWithoutFeedback>
	);
