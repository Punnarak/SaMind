import React, { useState, useEffect } from "react";

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
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import usePasswordVisibility from "../usePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import I from "react-native-vector-icons/MaterialIcons";
import * as Font from "expo-font";

export default function Login() {
  const navigation = useNavigation();

  // useEffect(() => {
  //   // โหลดและตั้งค่า fontFamily
  //   Font.loadAsync({
  //     "poppins-regular": require("../assets/fonts/Poppins-Regular.ttf"),
  //     "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
  //     "poppins-italic": require("../assets/fonts/Poppins-Italic.ttf"),
  //     // เพิ่ม font อื่นๆ ตามต้องการ
  //   });
  // }
  handleLogin = async () => {};
  console.log("App executed!");

  return (
    <View style={styles.container1}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.box}>
          <Text style={styles.wel}>LV.1 Beginner</Text>
        </View>
        <TouchableOpacity
          style={styles.boxper}
          onPress={() => navigation.navigate("Profilescreen")}
        >
          <Icon
            name="person-outline"
            style={styles.per}
            size={27}
            type="ionicon"
            color="black"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.n}>
        Hi{"  "}
        <Text style={styles.hyper}>Punya</Text>
      </Text>
      <Text style={styles.n1}>How are you feeling today?</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <Image source={require("../assets/m1.png")} style={styles.icon} />
        <Image source={require("../assets/m2.png")} style={styles.icon} />
        <Image source={require("../assets/m3.png")} style={styles.icon} />
        <Image source={require("../assets/m4.png")} style={styles.icon} />
        <Image source={require("../assets/m5.png")} style={styles.icon} />
      </View>
      <TouchableOpacity
        style={styles.loginb}
        onPress={() => navigation.navigate("Loginscreen")}
      >
        <Text style={styles.text}>Check - in</Text>
      </TouchableOpacity>
      <View style={styles.container2}>
        <Text style={styles.textf}>What do you want to do ?</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Loginscreen")}
          >
            <Text
              style={styles.Textb}
              onPress={() => navigation.navigate("Loginscreen")}
            >
              APPOINTMENT
            </Text>
            <Icon
              name="alarm"
              style={styles.picb}
              size={57}
              type="ionicon"
              color="#847872"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Calendarscreen")}
          >
            <Text
              style={styles.Textb}
              onPress={() => navigation.navigate("Calendarscreen")}
            >
              CALENDAR
            </Text>
            <I
              name="calendar-today"
              style={styles.picb1}
              size={57}
              color="#847872"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "7%",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Dashboardscreen")}
          >
            <Text
              style={styles.Textb}
              onPress={() => navigation.navigate("Dashboardscreen")}
            >
              DASHBOARD
            </Text>
            <I
              name="dashboard"
              style={styles.picb2}
              size={57}
              color="#847872"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Loginscreen")}
          >
            <Text
              style={styles.Textb}
              onPress={() => navigation.navigate("Loginscreen")}
            >
              GAME
            </Text>
            <I
              name="videogame-asset"
              style={styles.picb1}
              size={57}
              color="#847872"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "7%",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Libraryscreen")}
          >
            <Text
              style={styles.Textb}
              onPress={() => navigation.navigate("Libraryscreen")}
            >
              LIBRARY
            </Text>
            <I
              name="menu-book"
              style={styles.picb2}
              size={57}
              color="#847872"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Testscreen")}
          >
            <Text style={styles.Textb}>TEST</Text>
            <I
              name="format-list-bulleted"
              style={styles.picb1}
              size={57}
              color="#847872"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.undertag}>
          <Feather
            name="bell"
            style={styles.picul}
            size={25}
            color="#222222"
            onPress={() => navigation.navigate("Notiscreen")}
          />
          <Feather
            name="smile"
            style={styles.picur}
            size={25}
            color="#222222"
            onPress={() => navigation.navigate("Avatarscreen")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#C6E3FF",
    alignItems: "center",
    // fontFamily: "poppins-bold",
  },
  container2: {
    backgroundColor: "white",
    alignItems: "center",
    marginTop: "3%",
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    paddingVertical: 0,
    paddingHorizontal: 30,
    borderRadius: 25,
    // fontFamily: "poppins-bold",
  },
  textf: {
    fontSize: 15,
    fontWeight: "bold",
    // letterSpacing: 0.25,
    color: "#25271C",
    marginTop: "10%",
  },
  per: {
    alignItems: "center",
    marginTop: "10%",
    marginRight: "0%",
    // borderWidth: 1,
    // resizeMode: "contain",
  },
  boxper: {
    marginTop: "10%",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 40,
    borderColor: "rgba(255, 255, 255, 0.6)",
    height: 40,
    width: 40,
  },
  box: {
    borderWidth: 1,
    backgroundColor: "#3C9BF2",
    borderColor: "#3C9BF2",
    borderRadius: 21,
    padding: "3%",
    marginTop: "15%",
    marginRight: "50%",
    marginBottom: "4%",
  },
  wel: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  Textb: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    marginTop: "5%",
    // letterSpacing: 0.25,
    color: "#847872",
    // width: "25%",
  },

  hyper: {
    fontSize: 23,
    color: "black",
    marginTop: "1%",
    marginLeft: "55%",
    fontWeight: "bold",
  },

  loginb: {
    marginTop: "3.6%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 25,
    backgroundColor: "#FBBB00",
    width: "28%",
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  n: {
    fontSize: 23,
    color: "#6AA6FF",
    marginTop: "0%",
    fontWeight: "bold",
    marginRight: "62%",
  },
  n1: {
    fontSize: 20,
    color: "#6AA6FF",
    marginTop: "2%",
    fontWeight: "bold",
    marginRight: "23%",
  },

  icon: {
    width: 75,
    height: 75,
    // alignItems: "center",1
    margin: "0%",
    resizeMode: "contain",
    tintColor: "#000000",
  },
  button: {
    marginTop: "-6%",
    margin: "2%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 15,
    backgroundColor: "#F9E5DB",
    width: "50%",
  },
  picb: {
    alignItems: "center",
    margin: "4%",
    resizeMode: "contain",
  },
  picb1: {
    alignItems: "center",
    margin: "5%",
    resizeMode: "contain",
  },
  picb2: {
    alignItems: "center",
    margin: "5%",
    resizeMode: "contain",
  },
  undertag: {
    width: "120%",
    height: "8.65%",
    marginTop: "2%",
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    flexDirection: "row",
    alignItems: "center",
    // marginTop: "7%",
  },
  picur: {
    marginLeft: "70%",
  },
  picul: {
    marginLeft: "9%",
  },
});
