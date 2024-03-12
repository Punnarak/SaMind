import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
  Button,
} from "react-native";

import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import usePasswordVisibility from "../usePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import usePasswordVisibility1 from "../usePasswordVisibility1";
import { Ionicons } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";

export default function Forgotpassword() {
  const navigation = useNavigation();
  const { passwordVisibility, togglePasswordVisibility } =
    usePasswordVisibility();
  const { passwordVisibility1, togglePasswordVisibility1 } =
    usePasswordVisibility1();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [send, setSend] = useState(false);
  const [check, setCheck] = useState(false);
  const [OTP, setOTP] = useState("");
  const [OTPError, setOTPError] = useState(" ");
  const [checkEmail, setCheckEmail] = useState(false);
  const [emailError, setEmailError] = useState(" ");
  const [passwordError, setPasswordError] = useState(" ");
  const [conPasswordError, setConPasswordError] = useState(" ");

  useEffect(() => {
    console.log("Forgot Password Screen");
  }, []);

  const togglePopup = () => {
    console.log(
      checkEmail,
      passwordError,
      conPasswordError,
      password,
      conPassword
    );
    if (!email) {
      setEmailError("*");
    }
    if (!password) {
      setPasswordError("*");
    }
    if (!conPassword) {
      setConPasswordError("*");
    }
    if (
      checkEmail &&
      passwordError === " " &&
      conPasswordError === " " &&
      password &&
      conPassword
    ) {
      let param = {
        email: email,
      };
      axios
        .post("/forgotPassword", param)
        .then((response) => {
          console.log("response", response.data);
          setSend(!send);
        })
        .catch((error) => {
          setEmailError("user not found");
        });
    } else {
    }
  };
  const close = () => {
    togglePopup();
    navigation.navigate("Loginscreen");
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
    if (email != "") {
      validateEmail();
    }
  }, [email]);
  const handleSubmitOTP = async () => {
    console.log("submit", email, password, OTP);
    if (!OTP) {
      setOTPError("Please enter OTP");
    }

    if (OTP && email && password && OTPError !== " ") {
      console.log("in");
      let param = {
        otp: OTP,
        email: email,
        newPassword: password,
      };
      console.log("param", param);
      axios
        .post("/verifyOtpForgotPassword", param)
        .then((response) => {
          console.log(response);
          setCheck(!check);
        })
        .catch((error) => {
          setOTPError("OTP is invalid");
        });
    }
  };

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
      <Text style={styles.wel}>Forgot Password?</Text>
      <Text style={styles.welblue}>Don't worry, reset your password</Text>
      <View style={styles.container2}>
        <Text style={styles.title1}>Email</Text>
        <TextInput
          placeholder="Email address"
          placeholderTextColor={"#A9A9A9"}
          style={styles.TextInput}
          value={email}
          onChangeText={(text) => {
            setEmail(text);

            setEmailError(text.trim() === "" ? "*" : " ");
          }}
        />
        <Text style={styles.errorEmailText}>{emailError}</Text>
        <Text style={styles.title3}>New Password</Text>
        <Text style={styles.errorPasswordText}>{passwordError}</Text>
        <TextInput
          placeholder="Create Password"
          placeholderTextColor={"#A9A9A9"}
          secureTextEntry={passwordVisibility}
          style={styles.TextInput}
          value={password}
          onChangeText={(text) => {
            setPassword(text);

            setPasswordError(text.trim() === "" ? "*" : " ");
          }}
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
          placeholder="Re-enter Password"
          // placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          placeholderTextColor={"#A9A9A9"}
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
                : " "
            );
          }}
        />
        <Text style={styles.errorConPasswordText}>{conPasswordError}</Text>
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
      </View>
      <TouchableOpacity style={styles.Sendb} onPress={togglePopup}>
        <Text style={styles.text}>Send</Text>
      </TouchableOpacity>
      <Modal isVisible={send} onBackdropPress={togglePopup}>
        <View style={styles.container3}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {check ? (
              <Text style={styles.resetmail}>Reset Successfully</Text>
            ) : (
              <Text style={styles.confirm}>CONFIRM AT YOUR EMAIL</Text>
            )}

            {check ? (
              <Button
                title="X"
                color="black"
                style={styles.close}
                onPress={close}
                isVisible={send}
              />
            ) : (
              <Button
                title="X"
                color="black"
                onPress={close}
                isVisible={send}
              />
            )}
          </View>
          {check ? (
            <Image
              source={require("../assets/check.png")}
              style={[styles.icon]}
            />
          ) : (
            <Image
              source={require("../assets/email.png")}
              style={[styles.icon]}
            />
          )}
          {check ? (
            <Text style={styles.confirmlink}>
              Your password has been reset.
            </Text>
          ) : (
            <View>
              <Text style={styles.confirmlink}>
                We have sent confirmation email,{"\n"}please confirm via the
                OTP.
              </Text>
              <TextInput
                placeholder="Please enter OTP"
                placeholderTextColor={"#A9A9A9"}
                style={styles.OTPInput}
                value={OTP}
                onChangeText={(text) => {
                  setOTP(text);
                }}
              />
              <Text style={styles.OTPError}>{OTPError}</Text>
              <TouchableOpacity
                style={styles.loginb}
                onPress={() => handleSubmitOTP()}
              >
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
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
    marginTop: verticalScale(25.5),
    // marginTop: "10%",
    width: horizontalScale(336.5),
    // width: "95%",
    // paddingVertical: 0,
    paddingHorizontal: horizontalScale(15.85),
    paddingVertical: verticalScale(20.5),
    // paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  container3: {
    backgroundColor: "white",
    alignItems: "center",
    marginLeft: horizontalScale(-18.5),
    // marginTop: verticalScale(510.5),
    width: horizontalScale(373.5),
    paddingHorizontal: horizontalScale(15.85),
    paddingVertical: verticalScale(20.5),
    // paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  close: {
    zIndex: 5,
  },
  wel: {
    marginTop: verticalScale(20),
    // marginTop: "10%",
    marginBottom: 2,
    fontSize: moderateScale(23.6),
    marginRight: horizontalScale(110),
    color: "black",
    fontWeight: "bold",
  },
  welblue: {
    fontSize: moderateScale(17),
    marginRight: horizontalScale(40),
    color: "#3987FD",
    fontWeight: "bold",
  },
  title1: {
    marginRight: "85.1%",
    // marginTop: "0%",
    marginBottom: verticalScale(3),
    // marginBottom: "1%",
    fontSize: moderateScale(16.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
  },

  title3: {
    marginRight: "62.1%",
    // marginTop: "0%",

    marginBottom: verticalScale(3),
    // marginBottom: "1%",
    fontSize: moderateScale(16.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
  },
  title4: {
    ...Platform.select({
      android: {
        marginRight: horizontalScale(160),
      },
      ios: {
        marginRight: horizontalScale(160.5),
      },
    }),
    // marginRight: horizontalScale(128.5),
    // marginRight: "43%",
    marginTop: verticalScale(27),
    // marginTop: "5%",
    marginBottom: verticalScale(3),
    // marginBottom: "1%",
    fontSize: moderateScale(16.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
  },
  TextInput: {
    marginTop: moderateScale(3.05),
    // marginTop: "1%",
    height: verticalScale(38.315),
    // height: 40,
    width: "100%",
    marginBottom: verticalScale(15),
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
    marginTop: verticalScale(-43),
    // marginTop: "-12%",
  },
  Sendb: {
    marginTop: verticalScale(18),
    marginBottom: verticalScale(11.7),
    paddingVertical: 8,
    paddingHorizontal: 70,
    borderRadius: 25,
    backgroundColor: "#569AFF",
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
    width: 100,
    height: 100,
    alignItems: "center",
    margin: "7%",
    resizeMode: "contain",
  },
  confirm: {
    marginBottom: 2,
    fontSize: moderateScale(16),
    color: "black",
    fontWeight: "bold",
    marginLeft: 75,
    marginRight: 55,
    textAlign: "center",
    // paddingRight: 40,
  },
  resetmail: {
    marginBottom: 2,
    fontSize: moderateScale(16),
    color: "black",
    fontWeight: "bold",
    marginLeft: 100,
    textAlign: "center",
    paddingRight: 70,
  },
  confirmlink: {
    fontSize: moderateScale(15),
    color: "black",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 5,
  },
  OTPInput: {
    marginTop: moderateScale(5.05),
    // marginTop: "1%",
    height: verticalScale(38.315),
    // height: 40,
    width: horizontalScale(250),
    marginBottom: verticalScale(3),
    // marginBottom: "2%",
    borderWidth: 2,
    borderColor: "#569AFF",
    borderRadius: 10,
    paddingHorizontal: horizontalScale(8),
    // paddingHorizontal: 8,
    paddingVertical: verticalScale(6),
    // paddingVertical: 6,
  },
  loginb: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: verticalScale(10.5),
    paddingVertical: 11,
    // paddingHorizontal: horizontalScale(29.5),
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#569AFF",
    width: verticalScale(190.5),
    right: -30,
    // width: "60%",
  },
  errorText: {
    ...Platform.select({
      android: {},
      ios: {},
    }),
    fontSize: 10,
    marginTop: "-4%",
    marginBottom: "-0.8%",
    textAlign: "left",
    alignSelf: "flex-start",
    color: "red",
    left: 5,
    zIndex: 1,
  },
  errorEmailText: {
    position: "absolute",
    ...Platform.select({
      android: { top: 18, left: 67 },
      ios: { top: 18, left: 67 },
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
      android: { top: 100, left: 145 },
      ios: { top: 100, left: 145 },
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
      android: { top: 183, left: 175 },
      ios: { top: 183, left: 175 },
    }),
    fontSize: this.conPasswordError === "*" ? 20 : 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "red",
    zIndex: 99,
  },
  OTPError: {
    ...Platform.select({
      android: {},
      ios: {},
    }),
    fontSize: 10,
    marginTop: "0%",
    marginBottom: "2.8%",
    textAlign: "left",
    alignSelf: "flex-start",
    left: 5,
    color: "red",
    zIndex: 1,
  },
});
