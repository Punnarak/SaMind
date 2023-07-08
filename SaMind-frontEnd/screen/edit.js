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
import { Icon } from "react-native-elements";
import useCheck from "../usecheck";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const navigation = useNavigation();
  const { passwordVisibility, togglePasswordVisibility } =
    usePasswordVisibility();
  const { passwordVisibility1, togglePasswordVisibility1 } =
    usePasswordVisibility1();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Conpassword, setConPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };
  const handleLogin = async () => {};
  console.log("Edit Profile Screen");

  return (
    <View style={styles.container1}>
      <Ionicons
        name="chevron-back-outline"
        size={30}
        color="#3987FD"
        style={{
          // position: "absolute",
          marginRight: "80%",
          marginTop: "20%",
        }}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container2}>
        <Text style={styles.wel}>Punya Hasinanan</Text>
        <Text style={styles.title1}>Name</Text>
        <TextInput
          // editable={false}
          placeholder="Punya"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          //   value={email}
          //   onChangeText={setEmail}
        />
        <Text style={styles.title2}>Surname</Text>
        <TextInput
          // editable={false}
          placeholder="Hasinanan"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.title1}>Email</Text>
        <TextInput
          // editable={false}
          placeholder="Punya@gmail.com"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
        />
        <Text style={styles.title3}>Password</Text>
        <TextInput
          placeholder="123"
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
        <Text style={styles.title4}>Confirm Password</Text>
        <TextInput
          placeholder="123"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          secureTextEntry={passwordVisibility1}
          style={styles.TextInput}
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
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: "8%",
          }}
        >
          <TouchableOpacity
            style={styles.loginb}
            onPress={() => navigation.navigate("Profilescreen")}
          >
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.outb}
            onPress={() => navigation.navigate("Loginscreen")}
          >
            <Text style={styles.text}>Sign Out</Text>
          </TouchableOpacity>
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
    marginTop: "10%",
    width: "95%",
    height: "70%",
    // justifyContent: "center",
    paddingVertical: 0,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  wel: {
    marginTop: "10%",
    marginBottom: "7%",
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  title1: {
    marginRight: "82.1%",
    marginTop: "0%",
    marginBottom: "1%",
    fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title2: {
    marginRight: "72.5%",
    marginTop: "0%",
    marginBottom: "1%",
    fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title3: {
    marginRight: "69.5%",
    marginTop: "0%",
    marginBottom: "1%",
    fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title4: {
    marginRight: "43%",
    marginTop: "5%",
    marginBottom: "1%",
    fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  TextInput: {
    marginTop: "1%",
    height: 40,
    width: "100%",
    marginBottom: "2%",
    borderWidth: 2,
    borderColor: "#569AFF",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  eyeI: {
    dposition: "absolute",
    marginLeft: "85%",
    marginTop: "-12%",
  },
  hyper: {
    fontSize: 13,
    color: "#569AFF",
    marginTop: "0%",
    marginLeft: "55%",
    fontWeight: "bold",
  },

  loginb: {
    marginTop: "6%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 70,
    borderRadius: 25,
    backgroundColor: "#569AFF",
  },
  outb: {
    marginTop: "4%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 54,
    borderRadius: 25,
    backgroundColor: "#C6E3FF",
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
