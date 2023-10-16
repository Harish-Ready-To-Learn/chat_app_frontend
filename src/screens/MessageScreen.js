import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { GlobalContext } from "../context";
import { FlatList } from "react-native";
import MessageComponent from "../components/MessageComponent";
import { TextInput } from "react-native";
import { socket } from "../../utils";
import { Keyboard } from "react-native";

export const MessageScreen = ({ navigation, route }) => {
  const { currentGroupName, currentGroupId } = route.params;
  const {
    allChatMessages,
    setAllChatMessages,
    currentUser,
    currentChatMessage,
    setCurrentChatMessage,
  } = useContext(GlobalContext);

  const handleSendMessage = () => {
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    };
    if (currentUser) {
      socket.emit("newChatMessage", {
        currentChatMessage,
        groupIdentifier: currentGroupId,
        currentUser,
        timeData,
      });
    }
    setCurrentChatMessage("");
    Keyboard.dismiss();
  };

  useLayoutEffect(() => {
    socket.emit("findGroup", currentGroupId);
  }, []);

  useEffect(() => {
    socket.on("foundGroup", (allChats) => {
      setAllChatMessages(allChats);
    });
  }, [socket]);

  return (
    <View style={styles.mainWrapper}>
      <View
        style={[
          styles.mainWrapper,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {allChatMessages && allChatMessages[0] ? (
          <FlatList
            data={allChatMessages}
            renderItem={({ item }) => (
              <MessageComponent
                item={item}
                currentUser={currentUser}
                keyExtractor={(item) => item.id}
              />
            )}
          />
        ) : null}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          value={currentChatMessage}
          onChangeText={(value) => setCurrentChatMessage(value)}
          placeholder="Enter your message"
        />
        <Pressable style={styles.sendButton} onPress={handleSendMessage}>
          <View>
            <Text style={styles.sendButtonText}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#eee",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messageInput: {
    borderWidth: 1,
    padding: 5,
    flex: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  sendButton: {
    width: "30%",
    backgroundColor: "#703efe",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});
