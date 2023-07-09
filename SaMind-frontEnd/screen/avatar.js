import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

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
            marginRight: "80%",
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
              textAlign: "center",
            }}
          >
            วิธีใช้งาน{"\n"}สามารถเริ่มพูดคุยได้โดยการพูด{"\n"}WakeWord
            รอน้องตอบ{"\n"} แล้วคุยกับน้องได้เลย !!!
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
    marginTop: 50,
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
});
