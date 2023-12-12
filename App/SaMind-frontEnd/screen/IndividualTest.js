import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RadioItem from "../RadioItem.js"; // เปลี่ยนเส้นทางไปที่ไฟล์ RadioItem.js
import { horizontalScale, moderateScale, verticalScale } from "../Metrics.js";
import Modal from "react-native-modal";
import axios from "./axios.js";

export default function Notification({ route }) {
  const { patientId, item } = route.params || {};
  const navigation = useNavigation();

  const [selectedOptions, setSelectedOptions] = useState({});
  const [modal, setModal] = useState(false);
  const [check, setCheck] = useState(true); //กรณีคนตอบไม่หมดแล้วส่ง เอาไว้เช็ค
  const [data, setData] = useState([
    {
      id: 1,
      question: "1. เบื่อ ทำอะไร ๆ ก็ไม่เพลิดเพลิน",
      options: [
        "ไม่เลย",
        "มีบางวันหรือไม่บ่อย",
        "มีค่อนข้างบ่อย",
        "มีเกือบทุกวัน",
      ],
    },
    {
      id: 2,
      question: "2. ไม่สบายใจ ซึมเศร้า หรือท้อแท้",
      options: [
        "ไม่เลย",
        "มีบางวันหรือไม่บ่อย",
        "มีค่อนข้างบ่อย",
        "มีเกือบทุกวัน",
      ],
    },
    {
      id: 3,
      question: "3. หลับยาก หรือหลับ ๆ ตื่น ๆ หรือหลับมากไป",
      options: [
        "ไม่เลย",
        "มีบางวันหรือไม่บ่อย",
        "มีค่อนข้างบ่อย",
        "มีเกือบทุกวัน",
      ],
    },
    {
      id: 4,
      question: "4. เหนื่อยง่าย หรือไม่ค่อยมีแรง",
      options: [
        "ไม่เลย",
        "มีบางวันหรือไม่บ่อย",
        "มีค่อนข้างบ่อย",
        "มีเกือบทุกวัน",
      ],
    },
    {
      id: 5,
      question: "5. เบื่ออาหาร หรือกินมากเกินไป",
      options: [
        "ไม่เลย",
        "มีบางวันหรือไม่บ่อย",
        "มีค่อนข้างบ่อย",
        "มีเกือบทุกวัน",
      ],
    },
    {
      id: 6,
      question:
        "6. รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้ตัวเอง หรือครอบครัวผิดหวัง",
      options: [
        "ไม่เลย",
        "มีบางวันหรือไม่บ่อย",
        "มีค่อนข้างบ่อย",
        "มีเกือบทุกวัน",
      ],
    },
    {
      id: 7,
      question:
        "7. สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานท่ีต้องใช้ความตั้งใจ",
      options: [
        "ไม่เลย",
        "มีบางวันหรือไม่บ่อย",
        "มีค่อนข้างบ่อย",
        "มีเกือบทุกวัน",
      ],
    },
    {
      id: 8,
      question:
        "8. พูดหรือทำอะไรช้าจนคนอื่นมองเห็น หรือกระสับกระส่ายจนท่านอยู่ไม่นิ่งเหมือนเคย",
      options: [
        "ไม่เลย",
        "มีบางวันหรือไม่บ่อย",
        "มีค่อนข้างบ่อย",
        "มีเกือบทุกวัน",
      ],
    },
    {
      id: 9,
      question: "9. คิดทำร้ายตนเอง หรือคิดว่าถ้าตาย ๆ ไปเสียคงจะดี",
      options: [
        "ไม่เลย",
        "มีบางวันหรือไม่บ่อย",
        "มีค่อนข้างบ่อย",
        "มีเกือบทุกวัน",
      ],
    },
  ]);

  let questions = [];
  useEffect(() => {
    console.log("Individaul Test Screen", patientId, item.title);
    // Make a GET request to fetch data from "/question?type=test2"
    // axios
    //   .get("/question?type=PHQ9")
    //   .then((response) => {
    //     // Set the fetched data in your state
    //     // response.data = [];
    //     if (response.data.length != 0) {
    //       console.log("in");
    //       setData(response.data);
    //     }

    //     console.log(response.data, response.data.length);
    //   })
    //   .catch((error) => {
    //     // Handle any errors here
    //     console.error("Axios error:", error);
    //   });
  }, []);
  questions = data;
  // const questions =

  const toggleUnderstand = () => {
    setModal(!modal);
  };
  const toggleConfirm = () => {
    setModal(!modal);
    navigation.navigate("IndividualTestList", { patientId });
  };

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: option,
    }));
  };

  const handleFormSubmit = () => {
    let lData = data.length;
    let result = 0;
    console.log("Selected options:", selectedOptions);
    if (Object.keys(selectedOptions).length != lData) {
      setCheck(false);
    } else if (Object.keys(selectedOptions).length == lData) {
      setCheck(true);
    }
    // const param = {
    //   score: result,
    //   type: "PHQ9",
    //   patient_id: patientId,
    // };
    // axios
    //   .post("/score_question_post", param)
    //   .then((response) => {
    //     console.log("submit success", response.data);
    //   })
    //   .catch((error) => {
    //     // Handle any errors here
    //     console.error("Axios error:", error);
    //   });
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
          // marginTop: -550,
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
        <Text style={styles.header}>{item.title}</Text>
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
                    color: "black",
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  บันทึกและส่งคำตอบเรียบร้อยแล้ว
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
