import React, { useState, useEffect } from "react";
import MyCalendar from "../Calendar";
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
import { Ionicons } from "@expo/vector-icons";
// import {[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)} from 'react-native-calendars';
export default function Login() {
  const navigation = useNavigation();

  handleLogin = async () => {};
  console.log("App executed!");

  return (
    <View style={styles.container1}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "20%",
        }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="#3987FD"
          style={{
            // position: "absolute",
            marginRight: "80%",
            // marginTop: "20%",
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text style={styles.header}>Calendar</Text>
      <View style={styles.container2}>
        <MyCalendar />
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
    marginTop: "20%",
    width: "95%",
    height: "57%",
    justifyContent: "center",
    paddingVertical: 0,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#25271C",
    marginTop: "-7%",
  },
  con1: {
    fontSize: 13,
    fontWeight: "bold",
    // letterSpacing: 0.25,
    color: "#3C5A9A",
    marginTop: "10%",
    marginRight: "12%",
  },
  con2: {
    fontSize: 13,
    color: "#3C5A9A",
    marginTop: "10%",
    marginLeft: "15%",
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
    backgroundColor: "#F9E5DB",
    borderColor: "#F9E5DB",
    borderRadius: 15,
    paddingHorizontal: "35%",
    paddingVertical: "3%",
    marginTop: "8%",
  },
  wel: {
    fontSize: 15,
    color: "#AF8E7E",
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
    marginTop: "10%",
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
    width: 10,
    height: 10,
    alignItems: "center",
    margin: "2%",
    resizeMode: "contain",
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
