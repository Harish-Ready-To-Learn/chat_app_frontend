import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MessageComponent = ({ currentUser, item }) => {
  const currentUserStatus = item.currentUser !== currentUser;
  return (
    <View style={currentUserStatus ? {} : { alignItems: "flex-end" }}>
      <View style={styles.messageItemWrapper}>
        <View style={styles.messageItemInnerWrapper}>
          <View
            style={[
              styles.messageItem,
              { backgroundColor: currentUserStatus ? "#e5c1fe" : "#000" },
            ]}
          >
            <Text
              style={
                currentUserStatus ? { color: "#000" } : { color: "#e5c1fe" }
              }
            >
              {item.text}
            </Text>
          </View>
        </View>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  messageItemWrapper: {
    maxWidth: "50%",
    marginBottom: 15,
  },
  messageItemInnerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageItem: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 2,
  },
  messageTime: {
    marginLeft: 10,
  },
});
