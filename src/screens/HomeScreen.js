import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { ImageBackground } from "react-native";
import homeImage from "../assets/home-image.jpg";
import { GlobalContext } from "../context";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { Alert } from "react-native";
import { Keyboard } from "react-native";
export const HomeScreen = ({ navigation }) => {
  const {
    showLoginView,
    setShowLoginView,
    currentUserName,
    setCurrentUserName,
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
  } = useContext(GlobalContext);

  const handleRegisterAndSignIn = (isLogin) => {
    if (currentUserName !== "") {
      const index = allUsers.findIndex(
        (userItem) => userItem === currentUserName
      );
      if (isLogin) {
        if (index === -1) {
          Alert.alert("Please register ");
        } else {
          setCurrentUser(currentUserName);
          navigation.navigate("ChatScreen");
        }
      } else {
        if (index === -1) {
          allUsers.push(currentUserName);
          setAllUsers(allUsers);
          setCurrentUser(currentUserName);
          navigation.navigate("ChatScreen");
        } else {
          Alert.alert("Already registered Please Login..!");
        }
      }
      setCurrentUserName("");
    } else {
      Alert.alert("User Name is empty");
    }
    Keyboard.dismiss();
    console.log(allUsers);
  };

  // useEffect(() => {
  //   if (currentUser.trim() !== "") navigation.navigate("ChatScreen");
  // }, [currentUser]);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={homeImage} style={styles.bgImage} />
      <View style={styles.content}>
        {showLoginView ? (
          <View style={styles.infoBlock}>
            <View style={styles.loginInputContainer}>
              <Text style={styles.heading}>Enter you User Name</Text>
              <TextInput
                autoCorrect={false}
                style={styles.loginInput}
                value={currentUserName}
                placeholder="Username"
                onChangeText={(text) => setCurrentUserName(text)}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Pressable
                onPress={() => {
                  handleRegisterAndSignIn(false);
                }}
                style={styles.button}
              >
                <View>
                  <Text style={styles.buttonText}>Register</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  handleRegisterAndSignIn(true);
                }}
                style={styles.button}
              >
                <View>
                  <Text style={styles.buttonText}>Login</Text>
                </View>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.infoBlock}>
            <Text style={styles.heading}>Connect , Grow and Inspire</Text>
            <Text style={styles.subHeading}>
              Connect people around the world..!
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => setShowLoginView(true)}
            >
              <View>
                <Text style={styles.buttonText}>Get Started</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bgImage: {
    width: "100%",
    flex: 3,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  infoBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 15,
    color: "#acacac",
    marginBottom: 15,
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
    width: "34%",
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
