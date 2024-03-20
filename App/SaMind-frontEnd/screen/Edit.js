import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import usePasswordVisibility from "../usePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import usePasswordVisibility1 from "../usePasswordVisibility1";
import { Ionicons } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";
const isIOS = Platform.OS === "ios";

export default function EditProfile({ route }) {
  const { patientId, data } = route.params || {};
  console.log("patientId", patientId);
  const navigation = useNavigation();
  const { passwordVisibility, togglePasswordVisibility } =
    usePasswordVisibility();
  const { passwordVisibility1, togglePasswordVisibility1 } =
    usePasswordVisibility1();
  //info
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [surname, setSurname] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [conPasswordError, setConPasswordError] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [update, setUpdate] = useState(false);

  const handleSavePress = () => {
    console.log(name, surname, email, password, conPassword);
    setNameError(" ");
    setSurnameError(" ");
    setEmailError(" ");
    setPasswordError(" ");
    setConPasswordError(" ");

    validateEmail();
    checkPassword();

    if (!name) {
      setNameError("*");
    }
    if (!surname) {
      setSurnameError("*");
    }
    if (!email) {
      setEmailError("*");
    }
    if (password && !conPassword) {
      setConPasswordError("*");
    }

    if (
      name &&
      surname &&
      email &&
      password === conPassword &&
      checkEmail === true
    ) {
      const param = {
        patient_id: patientId,
        fname: name,
        lname: surname,
        email: email,
        password: password,
      };
      axios
        .post("/update_info", param)
        .then((response) => {
          console.log("update complete", response.data);
          setUpdate(true);
        })
        .catch((error) => {
          console.error("Axios error:", error);
        });
      console.log("Save Complete");
      navigation.navigate("Profilescreen", { patientId, update });
    }
  };

  const checkPassword = () => {
    if (password !== conPassword) {
      setConPasswordError("Not matching");
    } else {
      setConPasswordError(" ");
    }
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setCheckEmail(false);
      setEmailError("Invalid email");
    } else {
      setCheckEmail(true);
      setEmailError(" ");
    }
  };
  useEffect(() => {
    console.log("Edit Profile Screen", patientId);
    const onFocus = navigation.addListener("focus", () => {
      axios
      .post("/refreshToken")
      .then((response) => {
        console.log("refresh Token success", response.data);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
      console.log("Screen is focused");
    });
    setName(data.fname ? data.fname : "Punya");
    setSurname(data.lname ? data.lname : "Hasinanan");
    setEmail(data.email ? data.email : "pun@gmail.com");
    return onFocus
  }, []);
  useEffect(() => {
    if (email != "") {
      validateEmail();
    }
  }, [email]);
  return (
    <View style={styles.container1}>
      <Ionicons
        name="chevron-back-outline"
        size={30}
        color="#3987FD"
        style={{
          // position: "absolute",
          marginRight: "80%",
          marginTop: verticalScale(75),
        }}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container2}>
        <Text style={styles.wel}>
          {data.fname && data.lname
            ? data.fname + " " + data.lname
            : "Punya Hasinanan"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.title1}>Name</Text>
          <Text style={styles.errorNameText}>{nameError}</Text>
        </View>
        <TextInput
          placeholder={data.fname ? data.fname : "Punya"}
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          value={name}
          onChangeText={(text) => {
            setName(text);

            setNameError(text.trim() === "" ? "*" : " ");
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.title2}>Surname</Text>
          <Text style={styles.errorSurnameText}>{surnameError}</Text>
        </View>
        <TextInput
          placeholder={data.lname ? data.lname : "Hasinanan"}
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          value={surname}
          onChangeText={(text) => {
            setSurname(text);

            setSurnameError(text.trim() === "" ? "*" : " ");
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.title1}>Email</Text>
          <Text style={styles.errorEmailText}>{emailError}</Text>
        </View>
        <TextInput
          placeholder={data.email ? data.email : "Punya@gmail.com"}
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          value={email}
          onChangeText={(text) => {
            setEmail(text);

            setEmailError(text.trim() === "" ? "*" : " ");
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.title3}>Password</Text>
          <Text style={styles.errorPasswordText}>{passwordError}</Text>
        </View>
        <TextInput
          placeholder="123"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          secureTextEntry={passwordVisibility}
          style={styles.TextInput}
          value={password}
          onChangeText={(text) => {
            setPassword(text);

            setPasswordError(text.trim() === "" ? "*" : " ");
          }}
        />
        {isIOS ? null : (
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
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.title4}>Confirm Password </Text>
          <Text style={styles.errorConPasswordText}>{conPasswordError}</Text>
        </View>
        <TextInput
          placeholder="123"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          secureTextEntry={passwordVisibility1}
          style={styles.TextInput}
          value={conPassword}
          onChangeText={(text) => {
            setConPassword(text);

            setConPasswordError(
              text.trim() === ""
                ? "*"
                : text.trim() !== password
                ? "Not matching"
                : ""
            );
          }}
        />
        {isIOS ? null : (
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
        )}
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: isIOS ? verticalScale(0) : verticalScale(24),
            // marginTop: "8%",
          }}
        >
          <TouchableOpacity
            style={styles.loginb}
            onPress={() => handleSavePress()}
          >
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.outb}
            onPress={() => navigation.navigate("Profilescreen")}
          >
            <Text style={styles.text}>Cancel</Text>
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
    marginTop: verticalScale(37.5),
    // marginTop: "10%",
    width: horizontalScale(356.5),
    // width: "95%",
    // paddingVertical: 0,
    paddingHorizontal: horizontalScale(28.85),
    // paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  wel: {
    marginTop: verticalScale(30),
    // marginTop: "10%",
    marginBottom: verticalScale(21),
    // marginBottom: "7%",
    fontSize: moderateScale(23.6),
    // fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  title1: {
    marginRight: "82.1%",
    // marginTop: "0%",
    marginBottom: verticalScale(3),
    // marginBottom: "1%",
    fontSize: moderateScale(19.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title2: {
    marginRight: "72.5%",
    // marginTop: "0%",
    marginBottom: verticalScale(3),
    // marginBottom: "1%",
    fontSize: moderateScale(19.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title3: {
    marginRight: "69.5%",
    // marginTop: "0%",
    marginBottom: verticalScale(3),
    // marginBottom: "1%",
    fontSize: moderateScale(19.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title4: {
    ...Platform.select({
      android: {
        marginRight: horizontalScale(140),
        width: horizontalScale(169),
      },
      ios: {
        marginRight: horizontalScale(128.5),
      },
    }),
    // marginRight: horizontalScale(128.5),
    // marginRight: "43%",
    marginTop: isIOS ? verticalScale(0) : verticalScale(15),
    // marginTop: "5%",
    marginBottom: verticalScale(3),
    // marginBottom: "1%",
    fontSize: moderateScale(19.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  TextInput: {
    marginTop: moderateScale(3.05),
    // marginTop: "1%",
    height: verticalScale(38.315),
    // height: 40,
    width: "100%",
    marginBottom: verticalScale(6),
    // marginBottom: "2%",
    borderWidth: 2,
    borderColor: "#569AFF",
    borderRadius: 10,
    paddingHorizontal: horizontalScale(8),
    // paddingHorizontal: 8,
    paddingVertical: verticalScale(6),
    // paddingVertical: 6,
  },

  eyeI: {
    // dposition: "absolute",
    marginLeft: "85%",
    marginTop: verticalScale(-36),
    // marginTop: "-12%",
  },
  loginb: {
    marginTop: verticalScale(18),
    // marginTop: "6%",
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 70,
    borderRadius: 25,
    backgroundColor: "#569AFF",
  },
  outb: {
    marginTop: verticalScale(11.7),
    // marginTop: "4%",
    marginBottom: verticalScale(11.7),
    // marginBottom: "4%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 63,
    borderRadius: 25,
    backgroundColor: "#C6E3FF",
  },
  text: {
    fontSize: moderateScale(14.7),
    // fontSize: 15,
    lineHeight: verticalScale(20.2),
    // lineHeight: 21,
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
  errorNameText: {
    position: "absolute",
    ...Platform.select({
      android: { marginTop: "1%", left: 60 },
      ios: { marginTop: "1%", left: 60 },
    }),
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "red",
    zIndex: 1,
  },
  errorSurnameText: {
    position: "absolute",
    ...Platform.select({
      android: { marginTop: "1%", left: 90 },
      ios: { marginTop: "1%", left: 90 },
    }),
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "red",
    zIndex: 1,
  },
  errorEmailText: {
    position: "absolute",
    ...Platform.select({
      android: { marginTop: "1%", left: 57 },
      ios: { marginTop: "1%", left: 57 },
    }),
    fontSize: this.emailError === "*" ? 20 : 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "red",
    zIndex: 1,
  },
  errorPasswordText: {
    position: "absolute",
    ...Platform.select({
      android: { marginTop: "1%", left: 100 },
      ios: { marginTop: "1%", left: 100 },
    }),
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "red",
    zIndex: 1,
  },
  errorConPasswordText: {
    position: "absolute",
    ...Platform.select({
      android: { marginTop: "-3%", left: 180 },
      ios: { top: 0, left: 180 },
    }),
    fontSize: this.conPasswordError === "*" ? 20 : 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "red",
    zIndex: 99,
  },
});
