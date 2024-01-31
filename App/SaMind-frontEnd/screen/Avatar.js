import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
// import * as Speech from "expo-speech";
// import Voice from "react-native-voice";
// import {
//   requestPermissionsAsync,
//   startSpeechToTextAsync,
//   stopSpeechToTextAsync,
// } from "expo-speech";

export default function Notification() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);
  //text to speech
  const [textToSpeak, setTextToSpeak] = useState("");

  //speech to text expo speech reg
  // const [recognizedText, setRecognizedText] = useState("");
  // const [isListening, setIsListening] = useState(false);

  //speech to text expo speech api
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState("");
  //text to speech
  const speak = () => {
    if (textToSpeak) {
      Speech.speak(textToSpeak, { language: "th" });
    }
  };

  //speech to text ----> expo speech api
  const handleStartListening = async () => {
    try {
      await requestPermissionsAsync(); // Request microphone permissions
      await startSpeechToTextAsync({
        language: "en-US", // Specify the language for speech recognition
      });
      setIsListening(true);
    } catch (error) {
      console.error("Error starting speech recognition:", error);
    }
  };

  const handleStopListening = async () => {
    try {
      const result = await stopSpeechToTextAsync();
      setTranscription(result);
      setIsListening(false);
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  };

  useEffect(() => {
    return () => {
      stopSpeechToTextAsync(); // Stop speech recognition when the component unmounts
    };
  }, []);
  // speech to text ----> react native cli
  // const startSpeechToText = async () => {
  //   try {
  //     setIsListening(true);
  //     await Voice.start("en-US");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const stopSpeechToText = async () => {
  //   try {
  //     setIsListening(false);
  //     await Voice.stop();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Voice.onSpeechResults = (e) => {
  //   setRecognizedText(e.value[0]);
  // };

  handleLogin = async () => {};
  useEffect(() => {
    console.log("Avatar Screen");
  }, []);

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
          // marginTop: "15%",
          marginTop: 54,
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
              fontSize: moderateScale(16),
              // fontSize: 16,
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
              fontSize: moderateScale(16.69),
              // fontSize: 17,
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
          width: horizontalScale(337),
          // width: 350,
          height: verticalScale(337),
          // height: 350,
          marginLeft: 10,
          resizeMode: "contain",
          flex: 1,
        }}
      />

      {/* speech to text ---> expo speech api */}
      {/* <View>
        <Button
          title={isListening ? "Stop Listening" : "Start Listening"}
          onPress={isListening ? handleStopListening : handleStartListening}
        />
        <Text>{transcription}</Text>
      </View> */}
      {/* speech to text ---> react native cli*/}
      {/* <View>
        <Button
          title={isListening ? "Stop Listening" : "Start Listening"}
          onPress={isListening ? stopSpeechToText : startSpeechToText}
        />
        <Text>{recognizedText}</Text>
      </View> */}

      {/* text to speech */}
      {/* <View>
        <TextInput
          placeholder="Enter text to speak"
          value={textToSpeak}
          onChangeText={(text) => setTextToSpeak(text)}
        />
        <Button title="Speak" onPress={speak} />
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
    marginHorizontal: horizontalScale(16.5),
    // marginHorizontal: "5%",
  },
  buttonInfo: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#569AFF",
    width: horizontalScale(177),
    // width: "60%",
    marginBottom: 15,
  },
  text: {
    fontSize: moderateScale(14.5),
    // fontSize: 15,
    lineHeight: verticalScale(20.2),
    // lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
