import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  Linking,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import usePasswordVisibility from "./usePasswordVisibility";

//View -> UIView
export default function App() {
  const { passwordVisibility, togglePasswordVisibility } =
    usePasswordVisibility();
  console.log("App executed!");
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.freeiconspng.com/thumbs/circle-png/cool-circle-designs-png-1.png",
        }}
        style={styles.icon}
      />

      <Text style={styles.title1}>Email</Text>
      <TextInput style={styles.TextInput} />

      <Text style={styles.title2}>Password</Text>

      <TextInput
        secureTextEntry={passwordVisibility}
        style={styles.TextInput}
      />

      <TouchableOpacity style={styles.eyeI} onPress={togglePasswordVisibility}>
        <Feather
          name={passwordVisibility ? "eye-off" : "eye"}
          size={20}
          color="black"
        />
      </TouchableOpacity>

      <Text
        style={styles.hyper}
        onPress={() => Linking.openURL("http://google.com")}
      >
        Forgot Password ?
      </Text>

      <TouchableOpacity
        style={styles.loginb}
        onPress={() => console.log("Button tapped")}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.n}>
        Don't have an account?{"  "}
        <Text
          style={styles.hyper}
          onPress={() => Linking.openURL("http://google.com")}
        >
          Sign up
        </Text>
      </Text>

      <View style={styles.undertag}>
        <Text style={styles.tu}>Sa-Mind</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(238,186,0)",
    alignItems: "center",
  },
  TextInput: {
    marginTop: "2%",
    height: 40,
    width: "80%",
    borderColor: "aliceblue",
    borderWidth: 1,
    backgroundColor: "aliceblue",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 15,
  },
  title1: {
    marginTop: "10%",
    marginRight: "70%",
    fontWeight: "bold",
  },
  title2: {
    marginTop: "4%",
    marginRight: "62%",
    fontWeight: "bold",
  },

  eyeI: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: "132%",
    position: "absolute",
  },
  hyper: {
    fontSize: 10,
    textDecorationLine: "underline",
    color: "white",
    marginTop: "1%",
    marginLeft: "55%",
    fontWeight: "bold",
  },
  icon: {
    width: 300,
    height: 300,
    alignItems: "center",
    marginTop: "15%",
    resizeMode: "contain",
  },
  loginb: {
    marginTop: "15%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 15,
    backgroundColor: "black",
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  n: {
    fontSize: 10,
    color: "black",
    marginTop: "3%",
    fontWeight: "bold",
  },
  undertag: {
    width: "100%",
    height: "10%",
    marginTop: "20%",
    justifyContent: "flex-end",
    backgroundColor: "black",
  },
  tu: {
    alignItems: "center",
    marginLeft: "35%",
    marginBottom: "10%",
    fontSize: 30,
    fontWeight: "bold",
    color: "rgb(238,186,0)",
  },
});
