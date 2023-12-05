import React, { useState, useEffect } from "react";
import MyCalendar from "../Calendar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Modal from "react-native-modal";
import "moment-timezone";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import axios from "./axios.js";

export default function Calendar({ route }) {
  console.log("Calendar Screen");

  const navigation = useNavigation();
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showdate, setshowdate] = useState([]);
  //   const [isCalendarVisible, setCalendarVisible] = useState(true);
  const { date, month, year } = route.params || {};

  useEffect(() => {
    console.log("Appointment Screen");
    let dateStrings;
    axios
      .get("/appoint_patient_get")
      .then((response) => {
        if (response.data.length != 0) {
          console.log("in");
          dateStrings = response.data;
          const dateFormat = "YYYY-MM-DD";
          const dates = dateStrings.map((dateString) =>
            moment(dateString, dateFormat).toDate()
          );
          setHighlightedDates(dates);
        }

        console.log(response.data, response.data.length);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Axios error:", error);
      });
  }, []);

  const handleDateSelected = (date, month, year, textColor) => {
    // ส่งข้อมูลวันที่ที่ถูกเลือกไปยังหน้า A
    const dateString = year + "-" + (month + 1) + "-" + date;
    const dateFormat = "YYYY-MM-DD";
    const fulldate = moment(dateString, dateFormat).toDate();
    console.log("fulldate--> " + fulldate);
    console.log("highlightedDates--> ", highlightedDates);

    const isDateInHighlightedDates = highlightedDates.some(
      (highlightedDate) => {
        // Compare fulldate with each date in the highlightedDates array
        return fulldate.getTime() === highlightedDate.getTime();
      }
    );

    if (isDateInHighlightedDates) {
      toggleModal();
      if (date > 3) {
        date = date + "th";
      } else {
        if (date === 1) {
          date = date + "st";
        } else if (date === 2) {
          date = date + "nd";
        } else if (date === 3) {
          date = date + "rd";
        }
      }
    } else if (!isDateInHighlightedDates && textColor !== "#f00") {
      navigation.navigate("Selectappointmentscreen", { date, month, year });
    }

    const day = fulldate.getDay();
    const Days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setshowdate(date + " " + Days[day] + " " + months[month] + " " + year);
    // navigation.navigate("Upcomingscreen", { date, month, year });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setConfirm(!confirm);
  };

  const toggleUnderstand = () => {
    setModalVisible(!isModalVisible);
    setConfirm(!confirm);
    navigation.navigate("Appointmentscreen");
  };

  return (
    <ImageBackground
      source={require("../assets/Game.png")}
      style={{ alignItems: "center", flex: 1, resizeMode: "contain" }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // marginTop: "20%",
          marginTop: 78,
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
      <Text style={styles.header}>Choose date Appointment</Text>
      <View style={styles.container2}>
        <MyCalendar
          highlightedDates={highlightedDates}
          onDateSelected={handleDateSelected}
        />
        {/* first Modal */}
        <Modal isVisible={isModalVisible}>
          <View style={styles.Modal}>
            {confirm ? (
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 35,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 45,
                  textAlign: "center",
                }}
              >
                ระบบกำลังดำเนินการ{"\n"}หากการเลื่อนการนัดหมายสำเร็จ{"\n"}
                ทางแอปพลิเคชันจะส่งการ{"\n"}แจ้งเตือนตอบกลับวันนัดหมาย
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 35,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 45,
                  textAlign: "center",
                }}
              >
                Do you want to Postpone {"\n"}this appointment with
              </Text>
            )}
            {confirm ? (
              <Ionicons name="calendar-outline" size={100} color="black" />
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  color: "#FF5656",
                  fontWeight: "bold",
                  marginBottom: 45,
                  textAlign: "center",
                }}
              >
                DR.Somsak Saetang
              </Text>
            )}
            {confirm ? null : (
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                On {showdate}
              </Text>
            )}
            {confirm ? (
              <TouchableOpacity
                style={styles.confirmb}
                onPress={toggleUnderstand}
                isVisible={isModalVisible}
              >
                <Text style={styles.text}>I understand</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.confirmb}
                onPress={toggleModal2}
                isVisible={isModalVisible}
              >
                <Text style={styles.text}>Confirm</Text>
              </TouchableOpacity>
            )}
            {confirm ? null : (
              <TouchableOpacity
                style={styles.cancelb}
                onPress={toggleModal}
                isVisible={isModalVisible}
              >
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      </View>
    </ImageBackground>
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
    // marginTop: verticalScale(75),
    marginTop: "20%",
    // marginTop: 100,
    width: horizontalScale(353),
    // width: "94%",
    // width: 370,
    paddingVertical: verticalScale(31.5),
    justifyContent: "center",
    borderRadius: 25,
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  header: {
    fontSize: moderateScale(16),
    // fontSize: 16,
    fontWeight: "bold",
    color: "#25271C",
    marginTop: verticalScale(-26),
    // marginTop: "-7%",
  },
  Modal: {
    // justifyContent: "center",
    position: "relative",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 8,
    marginHorizontal: "5%",
    zIndex: 1,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  confirmb: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#000000",
    width: "60%",
    marginBottom: 7,
  },
  cancelb: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#BABABA",
    width: "60%",
    marginBottom: 15,
  },
});
