import React, { useState, useEffect } from "react";
import { Svg, Path } from "react-native-svg";
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
  ImageBackground,
} from "react-native";

import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import usePasswordVisibility from "../usePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import I from "react-native-vector-icons/MaterialIcons";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import data from "../notiData";
import NotiBox from "../notibox";
export default function Notification() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);

  handleLogin = async () => {};
  console.log("Avatar Screen");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setButtonVisible(!isButtonVisible);
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        alignItems: "center",
        flex: 1,
        paddingHorizontal: 15,
      }}
    >
      <View
        style={{
          marginTop: "15%",
          flexDirection: "row",
          zIndex: 2,
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

        <Feather
          name={"info"}
          size={25}
          color="#569AFF"
          onPress={toggleModal}
        />
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.Modal}>
          <Text
            style={{
              fontSize: 16,
              marginTop: 35,
              color: "#569AFF",
              fontWeight: "bold",
              marginBottom: 45,
            }}
          >
            How To Talk with Sa-Mind
          </Text>
          <Text
            style={{
              fontSize: 17,
              alignItems: "center",
            }}
          >
            วิธีใช้งาน
          </Text>
          <Text
            style={{
              // fontFamily: "Inter",
              fontSize: 17,
              // marginBottom: 30,
              paddingHorizontal: 20,
            }}
          >
            สามารถเริ่มพูดคุยได้โดยการพูด
          </Text>
          <Text
            style={{
              // fontFamily: "Inter",
              fontSize: 17,
              // marginBottom: 30,
              paddingHorizontal: 20,
            }}
          >
            WakeWord รอน้องตอบ
          </Text>
          <Text
            style={{
              // fontFamily: "Inter",
              fontSize: 17,
              marginBottom: 30,
              paddingHorizontal: 20,
            }}
          >
            แล้วคุยกับน้องได้เลย !!!
          </Text>
          <TouchableOpacity
            style={styles.buttonInfo}
            onPress={toggleModal}
            isVisible={isButtonVisible}
          >
            <Text style={styles.text}>I understand</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Image
        source={require("../assets/a1.gif")}
        style={{
          width: 350,
          height: 350,
          marginLeft: 10,
          resizeMode: "contain",
          flex: 1,
        }}
      />
      {/* 
      <View style={styles.undertag}>
        <Feather
          name="bell"
          style={styles.picul}
          size={25}
          color="#222222"
          onPress={() => navigation.goBack()}
        />
        <Feather
          name="smile"
          style={styles.picur}
          size={25}
          color="#222222"
          onPress={() => navigation.navigate("Loginscreen")}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  Modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#3987FD",
    borderWidth: 5,
    borderRadius: 8,
    marginHorizontal: "5%",
  },
  buttonInfo: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#569AFF",
    width: "60%",
    marginBottom: 15,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  // undertag: {
  //   width: "117%",
  //   height: 69.8,
  //   // marginBottom: 45,
  //   // paddingHorizontal: 25,
  //   backgroundColor: "white",
  //   shadowColor: "rgba(0,0,0, 0.3)", // IOS
  //   shadowOffset: { height: 1, width: 1 }, // IOS
  //   shadowOpacity: 1, // IOS
  //   shadowRadius: 1, //IOS
  //   flexDirection: "row",
  //   alignItems: "center",
  //   // marginBottom: 10,
  //   // position: "absolute",
  // },
  // picur: {
  //   marginLeft: "70%",
  // },
  // picul: {
  //   marginLeft: "9%",
  // },
});
