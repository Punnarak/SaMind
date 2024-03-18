import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Dimensions,
} from "react-native";

import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { axios, axiospython, path } from "./axios.js";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as Speech from 'expo-speech';
import waveAvatar from '../assets/wave.gif'
import standbyAvatar from '../assets/standby.gif'
import happy1Avatar from '../assets/happy1.gif'
import happy2Avatar from '../assets/happy2.gif'
import negative1Avatar from '../assets/negative1.gif'
import negative2Avatar from '../assets/negative2.gif'
import neutral1Avatar from '../assets/neutral1.gif'
import neutral2Avatar from '../assets/neutral2.gif'
import Svg, { Rect, Path } from "react-native-svg";

const windowWidth = Dimensions.get("window").width;

async function query(data) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/woranit/samind-sentiment",
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error querying model:", error);
    return null;
  }
}
let result = "";
async function answer(data) {
  try {
    const prompt = `<s>[INST] <<SYS>> You are a friendly question answering assistant. Answer the question as truthful and helpful as possible สมายคือเพื่  อนและผู้ช่วยตอบคำถาม จงตอบคำถามอย่างถูกต้องและมีประโยชน์ที่สุด <</SYS>>${data}[/INST]`;
    console.log(prompt);
    const response = await fetch(
      "https://040f-2001-fb1-17-16cd-1987-7975-9bbf-8e80.ngrok-free.app/completion",
      {
        headers: {
          // Authorization: "Bearer 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",
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "1", // Adding bypass-tunnel-reminder header
        },
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          n_predict: 80,
          temperature: 0.32,
          top_k: 40
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    result = await response.json();
    console.log(result.content);

    return result.content;
  } catch (error) {
    console.error("Error answer model:", error);
    return null;
  }
}
export default function Notification({ route }) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);

  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState(null);
  const [transcript, setTranscript] = useState("");

  const [avatar, setAvatar] = useState('wave')
  const positiveMax = 2
  const neutralMax = 2
  const negativeMax = 2
  const { patient_id, mood_detection_id } = route.params || {};

  const [isLoading, setIsLoading] = useState(false);

  console.log(patient_id, mood_detection_id);

  let avatarSource; 
  const changeAvatar = () => {
    console.log("change",avatar)
    setTimeout(() => {
      setAvatar('standby');
     }, 6000); 
  }
  switch (avatar) {
    case 'wave':
      console.log("wave avatar")
      avatarSource = waveAvatar;
      changeAvatar()
      break;
    case 'happy':
      console.log("happy avatar")
      let positive = [happy1Avatar, happy2Avatar]
      let happyAvatar = positive[ Math.floor(Math.random() * positiveMax)] // index+1
      avatarSource = happyAvatar
      changeAvatar()
      break;
    case 'sad':
      console.log("sad avatar")
      let negative = [negative1Avatar, negative2Avatar]
      let negativeAvatar = negative[ Math.floor(Math.random() * negativeMax)] // index+1
      avatarSource = negativeAvatar
      changeAvatar()
      break;
    case 'normal':
      console.log("normal avatar")
      let neutral = [neutral1Avatar, neutral2Avatar]
      let neutralAvatar = neutral[ Math.floor(Math.random() * neutralMax)] // index+1
      avatarSource = neutralAvatar
      changeAvatar()
      break;
    default:
      avatarSource = standbyAvatar;
  }


  useEffect(() => { 
    switch (avatar) {
      case 'wave':
        console.log("waveeffect avatar")
        avatarSource = waveAvatar;
        changeAvatar()
        break;
      case 'happy':
        console.log("happyeffect avatar")
        let positive = [happy1Avatar, happy2Avatar]
        let happyAvatar = positive[ Math.floor(Math.random() * positiveMax)] // index+1
        avatarSource = happyAvatar
        changeAvatar()
        break;
      case 'sad':
        console.log("sadeffect avatar")
        let negative = [negative1Avatar, negative2Avatar]
        let negativeAvatar = negative[ Math.floor(Math.random() * negativeMax)] // index+1
        avatarSource = negativeAvatar
        changeAvatar()
        break;
      case 'normal':
        console.log("normaleffect avatar")
        let neutral = [neutral1Avatar, neutral2Avatar]
        let neutralAvatar = neutral[ Math.floor(Math.random() * neutralMax)] // index+1
        avatarSource = neutralAvatar
        changeAvatar()
        break;
      default:
        avatarSource = standbyAvatar;
    }
  }, [avatar]);
  useEffect(() => {
    // Get recording permission upon first render
    async function getPermission() {
      try {
        const permission = await Audio.requestPermissionsAsync();
        console.log("Permission Granted: " + permission.granted);
        setAudioPermission(permission.granted);
      } catch (error) {
        console.log(error);
      }
    }

    // Call function to get recording permission
    getPermission();
    // Cleanup upon unmounting
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);


  async function startRecording() {
    try {
      // Needed for iOS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();
      console.log("Starting Recording");
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("recording");
    } catch (error) {
      setRecording(null);
      setRecordingStatus("stopped");
      console.error("Failed to start recording", error);
    }
  }

  const loadingData = () => {
    setIsLoading(!isLoading);
    console.log(isLoading)
  };

  async function stopRecording() {
    try {
      if (recordingStatus === "recording") {
        console.log("Stopping Recording");
        await recording.stopAndUnloadAsync();
        await loadingData();
        const recordingUri = recording.getURI();
        console.log("Recording URI:", recordingUri);
        // Call speech to text API after recording stops
        await convertSpeechToText(recordingUri);
        // Reset states
        setRecording(null);
        setRecordingStatus("stopped");
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  async function convertSpeechToText(audioPath) {
    try {
      const fileType = "audio/3gpp";
      console.log("Audio file path:", audioPath);
      const formData = {
        file: audioPath,
      };
      console.log("param", formData);

      let response = "";
      let responseText = "";
      let responseAnswer = "";
      try {
        response = await FileSystem.uploadAsync(
          path + "/speech",
          audioPath,
          {
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: "file", // Must match the field expected by your server
          }
        );
        console.log("Upload result:", response);
      } catch (e) {
        console.error("Upload error:", e);
      }
      console.log("response", response.body);
      setTranscript(response.body);
      // console.log("word : ", transcript);
      responseText = await performSentimentAnalysis(response.body);
      responseAnswer = await answer(response.body);
      console.log(responseAnswer);
      // Speech.speak(responseAnswer, { language: "th" });
      // setTextToSpeak(responseAnswer)
      speak(responseAnswer)
      setAvatar(responseText)
      setIsLoading(false);  
    } catch (error) {
      console.error("Failed to convert speech to text:", error);
      Alert.alert("Error", "Failed to convert speech to text");
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      await stopRecording(recording.getURI());
      // console.log(appleCount,meatCount,riceCount,fishCount);
    } else {
      await startRecording();
    }
  }

  async function performSentimentAnalysis(text) {
    try {
      console.log("inputtext", text);
      const sentimentResult = await query({ inputs: text });
      console.log("try", sentimentResult);
      let maxScore = -1;
      let maxLabel = null;
      sentimentResult[0].forEach((result) => {
        if (result.score > maxScore) {
          maxScore = result.score;
          maxLabel = result.label;
        }
      });

      const labelMeanings = {
        LABEL_0: "sad",
        LABEL_1: "happy",
        LABEL_2: "normal",
      };
      
      console.log(labelMeanings[maxLabel]);
     
      // await updateLabel(patientId, maxLabel);
      console.log(maxLabel, mood_detection_id);
      try {
        const updateMoodResponse = await axios.put("/update_mood", {
          maxLabel: maxLabel,
          mood_detection_id: mood_detection_id,
        });


        console.log("Update mood response:", updateMoodResponse.data);
      } catch (error) {
        console.error("Failed to update mood:", error);
        // Handle error accordingly
      }

      return labelMeanings[maxLabel];
    } catch (error) {
      console.error("Failed to perform sentiment analysis:", error);
      return null;
    }
  }
  //text to speech
  const speak = (text) => {
    console.log("ss", text);
    if (text) {
      Speech.speak(text, { language: "th" });
    }
  };

  handleLogin = async () => {};
  useEffect(() => {
    console.log("Avatar Screen");
    const onFocus = navigation.addListener("focus", async () => {
     speak("สวัสดีจ้า ยินดีต้อนรับ");
     setTimeout(() => {
     setAvatar("standby");
    }, 6000); 
      
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
    return onFocus;
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
        source={avatarSource}
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

      <TouchableOpacity
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 6,
          paddingHorizontal: 12,
          gap: 8,
          height: 40,
          width: 150,
          backgroundColor: isLoading ? "#888888" : "#1b1b1cde",
          borderRadius: 20,
          cursor: "pointer",
          flexDirection: "row",
          marginBottom: 20,
        }}
        onPress={handleRecordButtonPress}
        disabled={isLoading}
      >
        <Feather
          name="mic"
          size={20}
          color={isLoading ? "#000000" : recording ? "#FF342B" : "#000000"}
        />
        <Svg
          width="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF342B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Rect y="3" x="9" width="6" height="11" rx="3" />
          <Path d="M12 18V21" />
          <Path d="M8 21H16" />
          <Path d="M19 11C19 14.866 15.865 18 12 18C8.134 18 5 14.866 5 11" />
        </Svg>
        <Text
          style={{
            lineHeight: 20,
            fontSize: 17,
            color: isLoading ? "#000000" : recording ? "#FF342B" : "#FFFFFF",
            fontFamily: "sans-serif",
            letterSpacing: 1,
          }}
        >
          {isLoading ? "Waiting" : recording ? "Recording" : "Record"}
        </Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: "#2196f3",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});
