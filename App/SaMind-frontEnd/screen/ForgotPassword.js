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

export default function Forgotpassword() {
  const navigation = useNavigation();
  const { passwordVisibility, togglePasswordVisibility } =
    usePasswordVisibility();
  const { passwordVisibility1, togglePasswordVisibility1 } =
    usePasswordVisibility1();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Conpassword, setConPassword] = useState("");
  const [send, setSend] = useState(false);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    console.log("Forgot Password Screen");
  }, []);

  const togglePopup = () => {
    setSend(!send);
  };
  const close = () => {
    togglePopup();
    navigation.navigate("Loginscreen");
  };
  const toggleState = () => {
    setCheck(!check);
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
          // editable={false}
          placeholder="Email address"
          placeholderTextColor={"#A9A9A9"}
          style={styles.TextInput}
          //   value={email}
          //   onChangeText={setEmail}
        />
        <Text style={styles.title3}>New Password</Text>
        <TextInput
          placeholder="Create Password"
          placeholderTextColor={"#A9A9A9"}
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
          placeholder="Re-enter Password"
          // placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          placeholderTextColor={"#A9A9A9"}
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
            ) : null}
          </View>
          {check ? (
            <TouchableOpacity onPress={toggleState}>
              <Image
                source={require("../assets/check.png")}
                style={[styles.icon]}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleState}>
              <Image
                source={require("../assets/email.png")}
                style={[styles.icon]}
              />
            </TouchableOpacity>
          )}
          {check ? (
            <Text style={styles.confirmlink}>
              Your password has been reset.
            </Text>
          ) : (
            <Text style={styles.confirmlink}>
              We have sent confirmation email,{"\n"}please confirm via the link.
            </Text>
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
    marginTop: verticalScale(510.5),
    width: horizontalScale(375.5),
    height: horizontalScale(320.5),
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
    width: 150,
    height: 150,
    alignItems: "center",
    margin: "7%",
    resizeMode: "contain",
  },
  confirm: {
    marginBottom: 2,
    fontSize: moderateScale(16),
    color: "black",
    fontWeight: "bold",
    // marginLeft: 55,
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
  },
});
