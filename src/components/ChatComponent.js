import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { GlobalContext } from "../context";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChatComponent = ({ item }) => {
  const { messages, setMessages } = useContext(GlobalContext);
  const navigation = useNavigation();
  useEffect(() => {
    console.log("messages =", messages.text);
    console.log(Dimensions.get("window").height * 0.019);
    setMessages(item.messages[item.messages.length - 1]);
  }, []);

  const handleNavigateToMessageScreen = () => {
    navigation.navigate("MessageScreen", {
      currentGroupName: item.currentGroupName,
      currentGroupId: item.id,
    });
  };

  return (
    <Pressable
      onPress={() => {
        handleNavigateToMessageScreen();
      }}
      style={styles.mainContainer}
    >
      <View style={styles.circle}>
        <FontAwesome name="group" size={24} color={"black"} />
      </View>
      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.userName}>{item.currentGroupName}</Text>
          <Text style={styles.messages}>
            {messages?.text ? messages.text : "Tap to Start"}
          </Text>
        </View>
        <View>
          <Text style={styles.time}>
            {messages?.time ? messages.time : "Now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    height: Dimensions.get("window").height * 0.103,
  },
  userName: {
    fontSize: Dimensions.get("window").height * 0.024,
    marginBottom: 5,
    fontWeight: "bold",
  },
  messages: {
    fontSize: Dimensions.get("window").height * 0.019,
    opacity: 0.8,
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  time: {
    opacity: 0.6,
  },
  circle: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    marginRight: 10,
  },
});
