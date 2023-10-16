import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ChatScreen } from "./src/screens/ChatScreen";
import { MessageScreen } from "./src/screens/MessageScreen";
import GlobalState from "./src/context";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator>
          {/* SCREENS */}
          <Stack.Screen
            component={HomeScreen}
            name={"HomeScreen"}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={ChatScreen}
            name={"ChatScreen"}
            options={{ headerShown: false }}
          />
          <Stack.Screen component={MessageScreen} name={"MessageScreen"} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true} />
    </GlobalState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
