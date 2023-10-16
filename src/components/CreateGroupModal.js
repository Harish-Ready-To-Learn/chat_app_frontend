import React, { useContext, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { GlobalContext } from "../context";
import { TextInput } from "react-native";
import { Keyboard } from "react-native";
import { socket } from "../../utils";

export const CreateGroupModal = () => {
  const {
    createGroupModalVisible,
    setCreateGroupModalVisible,
    currentGroupName,
    setCurrentGroupName,
  } = useContext(GlobalContext);

  const handleCreateNewGroup = () => {
    console.log("FE", currentGroupName);
    socket.emit("createNewGroup", currentGroupName);
    setCreateGroupModalVisible(false);
    setCurrentGroupName("");
    Keyboard.dismiss();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={createGroupModalVisible}
      onRequestClose={() => {
        setCreateGroupModalVisible(!createGroupModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            autoCorrect={false}
            style={styles.loginInput}
            value={currentGroupName}
            placeholder="Enter group name"
            onChangeText={(text) => setCurrentGroupName(text)}
          />
          <View style={styles.buttonWrapper}>
            <Pressable
              onPress={() => {
                handleCreateNewGroup();
              }}
              style={styles.button}
            >
              <View>
                <Text style={styles.buttonText}>Add</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setCreateGroupModalVisible(false);
              }}
              style={styles.button}
            >
              <View>
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateGroupModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  loginInput: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 8,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "#703efe",
    padding: 15,
    marginVertical: 10,
    elevation: 1,
    borderRadius: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
