import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Platform,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import usePasswordVisibility from "../usePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";

//View -> UIView
export default function Login() {
  const navigation = useNavigation();
  const { passwordVisibility, togglePasswordVisibility } =
    usePasswordVisibility();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // const response = await login(email, password);
    // if (response.success) {
    //   navigation.navigate("Home");
    // } else {
    //   Alert.alert("Login Failed", "Invalid email or password.");
    // }
  };
  console.log("Login Screen");

  return (
    <View style={styles.container1}>
      <ImageBackground
        source={require("../assets/Game.png")}
        style={{ width: "100%", resizeMode: "cover", flex: 1 }}
      >
        <View style={styles.container2}>
          <Text style={styles.wel}>Welcome Back</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor={"#rgba(86, 154, 255, 0.52)"}
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
          <Text
            style={{
              color: "#605B5B",
              fontSize: 13,
              marginTop: 15,
              marginLeft: "50%",
            }}
            onPress={() => navigation.navigate("Forgotscreen")}
          >
            forget password?
          </Text>

          <TouchableOpacity
            style={styles.loginb}
            onPress={() => navigation.navigate("Homescreen")}
          >
            <Text style={styles.text}>Sign in</Text>
          </TouchableOpacity>

          <Text style={styles.n}>
            Don't have an account?{"  "}
            <Text
              style={styles.hyper}
              onPress={() => navigation.navigate("Signupscreen")}
            >
              Sign up
            </Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: verticalScale(32),
            }}
          >
            <View
              style={{ width: 50, height: 1, backgroundColor: "#569AFF" }}
            />
            <View>
              <Text
                style={{ width: 50, textAlign: "center", color: "#569AFF" }}
              >
                Or
              </Text>
            </View>
            <View
              style={{ width: 50, height: 1, backgroundColor: "#569AFF" }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "10%",
              marginLeft: "10%",
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Homescreen")}>
              <Image
                source={require("../assets/Apple.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Homescreen")}>
              <Image
                source={require("../assets/google.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Homescreen")}>
              <Image
                source={require("../assets/facebook.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
    marginTop: verticalScale(244),
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: horizontalScale(28.8),
    borderRadius: 25,
  },
  wel: {
    marginTop: verticalScale(79),
    marginBottom: verticalScale(22.4),
    fontSize: moderateScale(24),
    color: "#569AFF",
    fontWeight: "bold",
  },
  TextInput: {
    marginTop: verticalScale(6.5),
    // marginTop: "2%",
    // height: verticalScale(38.3),
    height: 40,
    width: 266,
    // width: horizontalScale(255),
    // width: "80%",
    marginBottom: verticalScale(12.7),
    // marginBottom: "4%",
    borderColor: "#569AFF",
    borderBottomWidth: 1,
    // paddingHorizontal: 8,
    // paddingVertical: 6,
  },
  eyeI: {
    // marginLeft: horizontalScale(223),
    marginLeft: 231.5,
    // marginLeft: "70%",
    // marginTop: verticalScale(-38.4),
    marginTop: -39.8,
    // marginTop: "-12%",
  },
  hyper: {
    fontSize: moderateScale(13),
    // fontSize: 13,
    color: "#569AFF",
    marginTop: "1%",
    marginLeft: "55%",
    fontWeight: "bold",
  },

  loginb: {
    marginTop: verticalScale(47.85),
    // marginTop: "15%",
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: verticalScale(10.5),
    paddingVertical: 11,
    // paddingHorizontal: horizontalScale(29.5),
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#569AFF",
    width: verticalScale(190.5),
    // width: "60%",
  },
  text: {
    fontSize: moderateScale(15),
    lineHeight: verticalScale(20),
    // lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  n: {
    fontSize: moderateScale(13),
    color: "black",
    marginTop: "4%",
    // fontWeight: "bold",
  },
  or: {
    fontSize: moderateScale(15),
    color: "#569AFF",
    // marginTop: verticalScale(50),
    // marginTop: "5%",
    borderBottomColor: "#569AFF",
  },
  icon: {
    //Ipad เล็ก ใหญ่ไป
    width: horizontalScale(48),
    // width: 50,
    height: horizontalScale(48),
    // height: 50,
    alignItems: "center",
    margin: "7%",
    resizeMode: "contain",
  },
});
