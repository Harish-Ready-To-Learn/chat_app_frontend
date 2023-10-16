import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { GlobalContext } from "../context";
import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { FlatList } from "react-native";
import ChatComponent from "../components/ChatComponent";
import { Dimensions } from "react-native";
import CreateGroupModal from "../components/CreateGroupModal";

export const ChatScreen = () => {
  const {
    currentUser,
    setCurrentUser,
    allChatRooms,
    createGroupModalVisible,
    setCreateGroupModalVisible,
  } = useContext(GlobalContext);
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{currentUser}</Text>
          <Pressable>
            <AntDesign name="logout" size={30} color={"black"} />
          </Pressable>
        </View>
      </View>
      <View style={styles.listContainer}>
        {allChatRooms && allChatRooms.length > 0 ? (
          <FlatList
            data={allChatRooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={({ item }) => item.id}
          />
        ) : null}
      </View>
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.button}
          onPress={() => setCreateGroupModalVisible(true)}
        >
          <View>
            <Text style={styles.buttonText}>Create new group</Text>
          </View>
        </Pressable>
      </View>
      {createGroupModalVisible && <CreateGroupModal />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#eee",
  },
  topContainer: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    height: 70,
    flex: 0.3,
    justifyContent: "center",
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: Dimensions.get("window").height * 0.05,
  },
  listContainer: {
    flex: 3.4,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    flex: 0.3,
    padding: 10,
  },
  button: {
    backgroundColor: "#703efe",
    padding: 12,
    width: "100%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: Dimensions.get("window").height * 0.03,
  },
});
