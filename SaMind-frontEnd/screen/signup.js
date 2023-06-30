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
import usePasswordVisibility from "../usePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import usePasswordVisibility1 from "../usePasswordVisibility1";
import useCheck from "../usecheck";

export default function Login() {
  const navigation = useNavigation();
  const { passwordVisibility, togglePasswordVisibility } =
    usePasswordVisibility();
  const { passwordVisibility1, togglePasswordVisibility1 } =
    usePasswordVisibility1();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [Conpassword, setConPassword] = useState("");
  const [patientID, setID] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };
  const handleLogin = async () => {
    // const response = await login(email, password);
    // if (response.success) {
    //   navigation.navigate("Home");
    // } else {
    //   Alert.alert("Login Failed", "Invalid email or password.");
    // }
  };
  console.log("App executed!");

  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Text style={styles.wel}>Let's get started</Text>
        <TextInput
          placeholder="Fullname"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          value={fullname}
          onChangeText={setFullname}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          secureTextEntry={passwordVisibility}
          style={styles.TextInput}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeI}
          onPress={togglePasswordVisibility}
        >
          <Feather
            name={passwordVisibility ? "eye-off" : "eye"}
            size={20}
            color="#569AFF"
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          secureTextEntry={passwordVisibility1}
          style={styles.TextInput2}
          value={Conpassword}
          onChangeText={setConPassword}
        />
        <TouchableOpacity
          style={styles.eyeI}
          onPress={togglePasswordVisibility1}
        >
          <Feather
            name={passwordVisibility1 ? "eye-off" : "eye"}
            size={20}
            color="#569AFF"
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Patient ID"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput2}
          value={patientID}
          onChangeText={setID}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "8%",
          }}
        >
          <TouchableOpacity onPress={handleCheckboxToggle}>
            <Feather
              name={isChecked ? "check-circle" : "circle"}
              size={20}
              color="#22222"
            />
          </TouchableOpacity>
          <Text style={styles.n}>
            I agree to {"  "}
            <Text
              style={styles.hyper}
              onPress={() => navigation.navigate("Signupscreen")}
            >
              Terms & Conditions
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.loginb}
          onPress={() => navigation.navigate("Homescreen")}
        >
          <Text style={styles.text}>Sign up</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <View
            style={{ width: "15%", height: 1, backgroundColor: "#569AFF" }}
          />
          <View>
            <Text style={{ width: 50, textAlign: "center", color: "#569AFF" }}>
              Or
            </Text>
          </View>
          <View
            style={{ width: "15%", height: 1, backgroundColor: "#569AFF" }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "2%",
          }}
        >
          <Image source={require("../assets/Apple.png")} style={styles.icon} />
          <Image source={require("../assets/google.png")} style={styles.icon} />
          <Image
            source={require("../assets/facebook.png")}
            style={styles.icon}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#BED8FF",
    alignItems: "center",
  },
  container2: {
    backgroundColor: "white",
    alignItems: "center",
    // marginTop: "50%",
    marginTop: 195,
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    paddingVertical: "0%",
    // paddingHorizontal: 30,
    paddingHorizontal: "7.5%",
    borderRadius: 25,
  },
  wel: {
    marginTop: "15%",
    marginBottom: "7%",
    fontSize: 24,
    color: "#569AFF",
    fontWeight: "bold",
  },
  TextInput: {
    marginTop: "1%",
    height: 40,
    // height: "4.75%",
    // width: "80%",
    width: 265,
    // marginBottom: "2%",
    marginBottom: 6.7,
    borderColor: "#569AFF",
    borderBottomWidth: 1,
    // paddingHorizontal: 8,
    paddingHorizontal: "2.5%",
    // paddingVertical: 6,
    // paddingVertical: "3%",
  },
  TextInput2: {
    // marginTop: "8%",
    marginTop: 26.5,
    height: 40,
    // height: "4.75%",
    // width: "80%",
    width: 265,
    // marginBottom: "2%",
    marginBottom: 6.7,
    borderColor: "#569AFF",
    borderBottomWidth: 1,
    // paddingHorizontal: 8,
    paddingHorizontal: "2.5%",
    // paddingVertical: 6,
  },
  eyeI: {
    dposition: "absolute",
    // marginLeft: "70%",
    marginLeft: 232,
    // marginTop: "-12%",
    marginTop: -40,
  },
  hyper: {
    fontSize: 13,
    color: "#569AFF",
    marginTop: "0%",
    marginLeft: "55%",
    fontWeight: "bold",
  },

  loginb: {
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#569AFF",
    width: "60%",
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  n: {
    fontSize: 13,
    color: "black",
    marginLeft: "3%",
    fontWeight: "bold",
  },

  icon: {
    width: 50,
    height: 50,
    alignItems: "center",
    margin: "7%",
    resizeMode: "contain",
  },
});
