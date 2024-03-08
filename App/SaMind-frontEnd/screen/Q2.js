import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RadioItem from "../RadioItem"; // เปลี่ยนเส้นทางไปที่ไฟล์ RadioItem.js
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import Modal from "react-native-modal";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";

export default function Q2({ route }) {
  const { patientId } = route.params || {};
  const navigation = useNavigation();

  const [selectedOptions, setSelectedOptions] = useState({});
  const [modal, setModal] = useState(false);
  const [check, setCheck] = useState(false); //กรณีคนตอบไม่หมดแล้วส่ง เอาไว้เช็ค
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("ท่านมีแนวโน้มเป็นโรคซึมเศร้า");
  const [color, setColor] = useState("black");
  const [suggestion, setSuggestion] = useState("ไม่จำเป็นต้องรักษา");
  const questions = [
    {
      id: 1,
      question:
        "1. ใน 2 สัปดาห์ที่ผ่านมารวมวันนี้ ท่านรู้สึก หดหู่ เศร้า หรือท้อแท้สิ้นหวัง หรือไม่",
      options: ["ไม่เลย", "มี"],
    },
    {
      id: 2,
      question:
        "2. ใน 2 สัปดาห์ที่ผ่านมา รวมวันนี้ท่านรู้สึก เบื่อ ทําอะไรก็ไม่เพลิดเพลิน หรือไม่",
      options: ["ไม่เลย", "มี"],
    },

    // Add more questions as needed
  ];
  useEffect(() => {
    console.log("Q2 Test Screen",patientId);
    const onFocus = navigation.addListener("focus", () => {
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
    return onFocus
  }, []);

  const toggleUnderstand = () => {
    setModal(!modal);
  };
  const toggleConfirm = () => {
    setModal(!modal);
    setScore(0);
    navigation.navigate("Generaltestscreen");
  };

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: option,
    }));
  };

  const handleFormSubmit = () => {
    let result = 0;
    console.log("Selected options:", selectedOptions);
    if (Object.keys(selectedOptions).length != 2) {
      setCheck(false);
    } else if (Object.keys(selectedOptions).length == 2) {
      setCheck(true);
      for (const value of Object.values(selectedOptions)) {
        if (value == "ไม่เลย") {
          console.log("value", value);
          result += 0;
        } else if (value == "มี") {
          console.log("value", value);
          result += 1;
        }
      }

      if (result != 0) {
        setLevel("ท่านมีแนวโน้มเป็นโรคซึมเศร้า");
        setSuggestion("ท่านมีแนวโน้มเป็นโรคซึมเศร้า");
        setColor("#11dd66");
      } else if (result == 0) {
        setLevel("ท่านไม่มีแนวโน้มเป็นโรคซึมเศร้า");
        setSuggestion("ท่านไม่มีแนวโน้มเป็นโรคซึมเศร้า");
        setColor("#FFDE59");
      }
      console.log(result);
      setScore(result);
    }
    const param = {
      score: result,
      type: "2Q",
      patient_id: patientId,
    };
    console.log(param);
    axios
      .post("/score_question_post", param)
      .then((response) => {
        console.log("submit success", response.data);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
    setModal(!modal);
  };

  return (
    <View style={styles.container2}>
      <ImageBackground
        source={require("../assets/Game.png")}
        style={{
          alignItems: "center",
          borderRadius: 25,
          overflow: "hidden",

          marginTop: -550,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // marginTop: "155%",
            marginTop: 604,
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
        </View>
        <Text style={styles.header}>แบบประเมินโรคซึมเศร้า Q2</Text>
      </ImageBackground>

      <View style={styles.container3}>
        <ScrollView style={{ width: "100%" }}>
          <View>
            {questions.map((question) => (
              <View key={question.id}>
                <Text style={styles.question}>{question.question}</Text>
                {question.options.map((option) => (
                  <RadioItem
                    key={option}
                    value={option}
                    label={option}
                    selected={selectedOptions[question.id] === option}
                    onSelect={() => handleOptionSelect(question.id, option)}
                  />
                ))}
              </View>
            ))}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleFormSubmit}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal isVisible={modal}>
          <View style={styles.Modal}>
            {check ? (
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 35,
                    color: "#569AFF",
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  แบบประเมินโรคซึมเศร้า 2Q
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#569AFF",
                    marginBottom: 15,
                    textAlign: "center",
                  }}
                >
                  คะแนนแบบทดสอบของคุณมีค่า {score} คะแนน
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 35,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                กรุณาทำแบบประเมินให้ครบทุกข้อ
              </Text>
            )}
            {check ? (
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "black",
                    fontWeight: "bold",
                    marginBottom: 3,
                    textAlign: "center",
                  }}
                >
                  ผลการทดสอบ
                </Text>
                <Ionicons
                  name="ellipse"
                  size={50}
                  style={{
                    color: color,
                    alignSelf: "center",
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: color,
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {level}
                </Text>
              </View>
            ) : null}
            {check ? (
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "black",
                    fontWeight: "bold",
                    marginBottom: 3,
                    textAlign: "center",
                  }}
                >
                  ข้อแนะนำ
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    marginBottom: 3,
                  }}
                >
                  {suggestion}
                </Text>
              </View>
            ) : null}

            {check ? (
              <TouchableOpacity
                style={styles.confirmb}
                onPress={toggleConfirm}
                isVisible={modal}
              >
                <Text style={styles.text}>Confirm</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.confirmb}
                onPress={toggleUnderstand}
                isVisible={modal}
              >
                <Text style={styles.text}>I understand</Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    backgroundColor: "white",
    flex: 1,
    zIndex: 0,
  },
  container3: {
    paddingHorizontal: 25,
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    height: "77%",
    paddingTop: 10,
    flex: 1,
    zIndex: 0,
    justifyContent: "center", // ทำให้อยู่ตรงกลางแนวตั้ง
  },

  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#569AFF",
    // marginTop: "-7%",
    marginTop: -27.5,
  },
  question: { marginTop: 20, marginBottom: 20 },
  submitButton: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#32C9F9",
    width: "60%",
    marginBottom: 7,
    alignSelf: "center", // ทำให้ปุ่มอยู่ตรงกลางแนวนอน
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
  Modal: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#569AFF",
    borderWidth: 5,
    borderRadius: 8,
    marginHorizontal: "5%",
    zIndex: 1,
    paddingHorizontal: 25,
  },
  confirmb: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#569AFF",
    width: "65%",
    marginBottom: 7,
  },
});
