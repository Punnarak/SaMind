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
  Platform,
} from "react-native";

import Modal from "react-native-modal";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { axios, path } from "./axios.js";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as Speech from "expo-speech";
import waveAvatar from "../assets/wave.gif";
import standbyAvatar from "../assets/standby.gif";
import happy1Avatar from "../assets/happy1.gif";
import happy2Avatar from "../assets/happy2.gif";
import happy3Avatar from "../assets/happy3.gif";
import negative1Avatar from "../assets/negative1.gif";
import negative2Avatar from "../assets/negative2.gif";
import negative3Avatar from "../assets/negative3.gif";
import neutral1Avatar from "../assets/neutral1.gif";
import neutral2Avatar from "../assets/neutral2.gif";
import neutral3Avatar from "../assets/neutral3.gif";
import again1Avatar from "../assets/empty1.gif";
import again2Avatar from "../assets/empty2.gif";
import again3Avatar from "../assets/empty3.gif";
import again4Avatar from "../assets/empty4.gif";

import Svg, { Rect, Path } from "react-native-svg";
const isAndroid = Platform.OS === "android";
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
    console.log("query response", response);
    const result = await response.json();
    return result;
  } catch (error) {
    // console.error("Error querying model:", error);
    return null;
  }
}
let result = "";
async function answer(data) {
  try {
    const prompt = `<s>[INST] <<SYS>> You are a friendly question answering assistant. Answer the question as truthful and helpful as possible สมายคือเพื่อนและผู้ช่วยตอบคำถาม ตอบคำถามแบบกระชับ และเข้าใจง่าย <</SYS>>${data}[/INST]`;
    console.log(prompt);
    const response = await fetch(
      "https://informed-master-dragon.ngrok-free.app/completion",
      {
        headers: {
          // Authorization: "Bearer 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",
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "1", // Adding bypass-tunnel-reminder header
        },
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          n_predict: 40,
          temperature: 0.32,
          top_k: 40,
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
async function setSpeaker() {
  console.log("speaker!!!!!!!!");
  try {
    await Audio.setAudioOutputModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
    });
  } catch (error) {
    console.log("เกิดข้อผิดพลาดในการตั้งค่าลำโพง:", error);
  }
}

export default function Notification({ route }) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(true);
  const [isButtonVisible, setButtonVisible] = useState(false);

  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [first, setFirst] = useState(true);
  const [avatar, setAvatar] = useState("wave");
  const positiveMax = 3;
  const neutralMax = 3;
  const negativeMax = 3;
  const againMax = 4;
  const { patient_id, mood_detection_id } = route.params || {};

  const [isLoading, setIsLoading] = useState(false);

  console.log(patient_id, mood_detection_id);

  let avatarSource;
  const changeAvatar = () => {
    console.log("change", avatar);
    setTimeout(() => {
      setAvatar("standby");
    }, 16000);
  };
  switch (avatar) {
    case "wave":
      console.log("wave avatar");
      avatarSource = waveAvatar;
      changeAvatar();
      break;
    case "happy":
      console.log("happy avatar");
      let positive = [happy1Avatar, happy2Avatar, happy3Avatar];
      let happyAvatar = positive[Math.floor(Math.random() * positiveMax)]; // index+1
      avatarSource = happyAvatar;
      changeAvatar();
      break;
    case "sad":
      console.log("sad avatar");
      let negative = [negative1Avatar, negative2Avatar, negative3Avatar];
      let negativeAvatar = negative[Math.floor(Math.random() * negativeMax)]; // index+1
      avatarSource = negativeAvatar;
      changeAvatar();
      break;
    case "normal":
      console.log("normal avatar");
      let neutral = [neutral1Avatar, neutral2Avatar, neutral3Avatar];
      let neutralAvatar = neutral[Math.floor(Math.random() * neutralMax)]; // index+1
      avatarSource = neutralAvatar;
      changeAvatar();
      break;
    case "again":
      console.log("again avatar");
      let again = [again1Avatar, again2Avatar, again3Avatar, again4Avatar];
      let againAvatar = again[Math.floor(Math.random() * againMax)]; // index+1
      avatarSource = againAvatar;
      changeAvatar();
      break;
    default:
      avatarSource = standbyAvatar;
  }

  useEffect(() => {
    switch (avatar) {
      case "wave":
        console.log("waveeffect avatar");
        avatarSource = waveAvatar;
        changeAvatar();
        break;
      case "happy":
        console.log("happyeffect avatar");
        let positive = [happy1Avatar, happy2Avatar, happy3Avatar];
        let happyAvatar = positive[Math.floor(Math.random() * positiveMax)]; // index+1
        avatarSource = happyAvatar;
        changeAvatar();
        break;
      case "sad":
        console.log("sadeffect avatar");
        let negative = [negative1Avatar, negative2Avatar, negative3Avatar];
        let negativeAvatar = negative[Math.floor(Math.random() * negativeMax)]; // index+1
        avatarSource = negativeAvatar;
        changeAvatar();
        break;
      case "normal":
        console.log("normaleffect avatar");
        let neutral = [neutral1Avatar, neutral2Avatar, neutral3Avatar];
        let neutralAvatar = neutral[Math.floor(Math.random() * neutralMax)]; // index+1
        avatarSource = neutralAvatar;
        changeAvatar();
        break;
      case "again":
        console.log("again avatar");
        let again = [again1Avatar, again2Avatar, again3Avatar, again4Avatar];
        let againAvatar = again[Math.floor(Math.random() * againMax)]; // index+1
        avatarSource = againAvatar;
        changeAvatar();
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
    console.log(isLoading);
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
        response = await FileSystem.uploadAsync(path + "/speech", audioPath, {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "file", // Must match the field expected by your server
        });
        console.log("Upload result:", response);
      } catch (e) {
        console.error("Upload error:", e);
      }
      console.log("response", response.body);
      setTranscript(response.body);
      // console.log("word : ", transcript);

      if (response.body != '""') {
        // console.log("empty",response.body)
        responseText = await performSentimentAnalysis(response.body);
        responseAnswer = await answer(response.body);
        console.log(responseAnswer);
        // Speech.speak(responseAnswer, { language: "th" });
        // setTextToSpeak(responseAnswer)

        // setSpeaker()

        let filteredAnswer = await responseAnswer.replace(
          /ๆๆๆ|ๆๆ|\s\d\s|d|อิอิอิอิอิ|\s|ย&\s|ยย|ย/g,
          ""
        );
        filteredAnswer = await responseAnswer.replace(
          /หน้ายิ้มหน้ายิ้ม|ตายิ้ม|หน้ายิ้มตายิ้ม|ตายิ้มตายิ้ม/g,
          ""
        );
        filteredAnswer = await responseAnswer.replace(/t|TT/g, "");
        filteredAnswer = await responseAnswer.replace(
          /\s3\s|333|33|\s4\s|444|44|\s2\s|222|22|\s1\s|111|11|\s6\s|666|66|\s7\s|777|77|\s8\s|888|88|\s9\s|999|99|\s0\s|000|00/g,
          ""
        );
        filteredAnswer = responseAnswer.replace(/5/g, "ห้า");
        const n = 3;
        let index = -1;
        for (let i = 0; i < n; i++) {
          index = filteredAnswer.indexOf(" ", index + 1);
          if (index === -1) {
            break;
          }
        }
        if (index !== -1) {
          filteredAnswer = filteredAnswer.substring(0, index);
        }
        console.log("filteredAnswer", filteredAnswer);

        if (filteredAnswer.includes("[/INST]")) {
          speak(filteredAnswer.split("[/INST]")[0]);
        } else {
          speak(filteredAnswer);
        }

        setAvatar(responseText);
      } else {
        speak("ขออีกรอบได้ไหม สมายไม่ได้ยิน");
        setAvatar("again");
      }

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
      return "normal";
    }
  }
  //text to speech
  const speak = async (text) => {
    console.log("ss", text);
    if (text) {
      Speech.speak(text, { language: "th-TH" });
    }
  };

  useEffect(() => {
    setSpeaker();
  }, []);
  useEffect(() => {
    console.log("Avatar Screen");
    const onFocus = navigation.addListener("focus", async () => {
      //  setSpeaker();
      speak("สวัสดีจ้า ยินดีต้อนรับ");
      setTimeout(() => {
        setAvatar("standby");
      }, 6000);
      setFirst(false);

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
          color={recording ? "rgba(86, 154, 255, 0.52)" : "#3987FD"}
          style={{
            marginRight: "80%",
          }}
          onPress={() => (recording ? null : navigation.goBack())}
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
          {isAndroid ? (
            <Text
              style={{
                fontSize: moderateScale(16.69),
                // fontSize: 17,
                textAlign: "center",
              }}
            >
              วิธีใช้งาน{"\n"}กดปุ่ม Record เพื่อพูดคุยกับน้องสมาย {"\n"}
              รอน้องตอบ และเพลิดเพลินไปกับ{"\n"}การคุยกับน้องได้เลย !!!
            </Text>
          ) : (
            <View>
              <Text
                style={{
                  fontSize: moderateScale(16.69),
                  // fontSize: 17,
                  textAlign: "center",
                }}
              >
                วิธีใช้งาน{"\n"}กดปุ่ม Record เพื่อ พูดคุยกับน้องสมาย {"\n"}เปิด
                control center กดที่ไอคอน
                <Svg
                  width={35}
                  height={25}
                  fill="#d6d6d6"
                  viewBox="0 0 24.00 24.00"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#d6d6d6"
                  stroke-width="0.00024000000000000003"
                >
                  <Path d="M11.9082.1836c-2.8774.0227-5.7566 1.0743-8.045 3.1719-4.8816 4.4748-5.1662 12.0812-.6913 16.9629.2034.244.4473.4473.6914.6914.122.0813.2861.083.4082-.0391l.5293-.6113c.122-.122.122-.3252 0-.4473C.5293 15.9661.2438 9.254 4.2305 4.9824 8.2172.711 14.8887.4274 19.1602 4.4141c4.2714 3.9867 4.555 10.6562.5683 14.9277-.2034.2034-.365.4076-.5683.5703-.122.122-.122.3252 0 .4473l.5293.6113c.122.122.3252.1204.4472.039 4.8817-4.5155 5.1663-12.0811.6914-16.9628-2.3989-2.5934-5.6588-3.889-8.9199-3.8633zm.3867 3.5176C10.0982 3.63 7.8715 4.3932 6.1426 6c-3.4579 3.2138-3.661 8.6242-.4473 12.082.122.122.2435.2842.4063.4063.122.122.3252.122.4472 0l.5293-.6094c.122-.122.122-.3252 0-.4473-1.4238-1.3424-2.2773-3.2547-2.2773-5.248 0-3.946 3.2122-7.1602 7.1582-7.1602 3.946 0 7.1601 3.2532 7.1601 7.1993 0 1.9526-.8144 3.8665-2.2382 5.209-.122.122-.122.3252 0 .4472l.5293.6094c.122.122.3252.163.4472.041 3.4579-3.2545 3.622-8.6652.4082-12.123-1.6069-1.729-3.774-2.634-5.9707-2.7051zm-.2656 3.3164c-1.3221-.0204-2.654.4662-3.6914 1.4629-2.0747 1.9933-2.1145 5.2475-.1211 7.3222l.121.123c.1221.1221.3253.1221.4474 0l.5293-.6112c.122-.122.122-.3253 0-.4473-.6916-.6916-1.0977-1.6666-1.0977-2.6836a3.732 3.732 0 013.7422-3.7422 3.732 3.732 0 013.7422 3.7422c0 1.017-.4064 1.9513-1.1387 2.6836-.122.122-.122.3252 0 .4473l.5293.6113c.122.122.3252.122.4473 0 2.034-1.9934 2.1164-5.2476.123-7.3223-.9967-1.0373-2.3107-1.5656-3.6328-1.586zm.0059 7.7441c-.1373-.005-.2803.0448-.4024.1465l-.039.041-7.1602 8.0547c-.1627.2034-.1624.488.041.6914.0814.0814.2019.123.2832.123h14.3613c.2441 0 .4883-.2035.4883-.4882 0-.122-.0397-.2448-.121-.3262l-7.0801-8.0547c-.1018-.122-.2338-.1824-.3711-.1875Z" />
                </Svg>
                และเปลี่ยนเป็น speaker รอน้องตอบ
                และเพลิดเพลินไปกับการคุยกับน้องได้เลย !!!
              </Text>
            </View>
          )}
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
