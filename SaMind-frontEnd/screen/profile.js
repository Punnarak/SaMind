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
  console.log("App executed!");

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
          editable={false}
          placeholder="Punya"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          //   value={email}
          //   onChangeText={setEmail}
        />
        <Text style={styles.title2}>Surname</Text>
        <TextInput
          editable={false}
          placeholder="Hasinanan"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.title1}>Email</Text>
        <TextInput
          editable={false}
          placeholder="Punya@gmail.com"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
        />

        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: "8%",
          }}
        >
          <TouchableOpacity
            style={styles.loginb}
            onPress={() => navigation.navigate("Editscreen")}
          >
            <Text style={styles.text}>Edit</Text>
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
    marginTop: "20%",
    width: "95%",
    height: "57%",
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
    marginTop: "15%",
    marginBottom: "7%",
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  title1: {
    marginRight: "80%",
    marginTop: "0%",
    marginBottom: "1%",
    fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title2: {
    marginRight: "70%",
    marginTop: "0%",
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
    marginLeft: "70%",
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
