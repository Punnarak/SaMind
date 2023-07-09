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

export default function Calendar({ route }) {
  console.log("Calendar Screen");

  const navigation = useNavigation();
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [isButtonVisible2, setButtonVisible2] = useState(false);
  const [showdate, setshowdate] = useState([]);
  //   const [isCalendarVisible, setCalendarVisible] = useState(true);
  const { date, month, year } = route.params || {};

  useEffect(() => {
    const dateStrings = ["2023-07-01", "2023-07-05"];
    const dateFormat = "YYYY-MM-DD";
    const dates = dateStrings.map((dateString) =>
      moment(dateString, dateFormat).toDate()
    );
    setHighlightedDates(dates);
  }, []);

  const handleDateSelected = (date, month, year) => {
    // ส่งข้อมูลวันที่ที่ถูกเลือกไปยังหน้า A
    toggleModal();
    const dateString = year + "-" + (month + 1) + "-" + date;
    const dateFormat = "YYYY-MM-DD";
    const fulldate = moment(dateString, dateFormat).toDate();
    console.log("fulldate--> " + fulldate);
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
    // setCalendarVisible(!isCalendarVisible)
    setModalVisible(!isModalVisible);
    setButtonVisible(!isButtonVisible);
  };

  const toggleModal2 = () => {
    setModalVisible(false);
    setButtonVisible(false);
    setModalVisible2(true);
    setButtonVisible2(true);
    console.log("innnn");
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
          marginTop: "20%",
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
      <Text style={styles.header}>Calendar</Text>
      <View style={styles.container2}>
        <MyCalendar
          highlightedDates={highlightedDates}
          onDateSelected={handleDateSelected}
        />

        <Modal isVisible={isModalVisible2}>
          <View style={styles.Modal}>
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
            <TouchableOpacity
              style={styles.confirmb}
              onPress={toggleModal2}
              isVisible={isButtonVisible2}
            >
              <Text style={styles.text}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelb}
              onPress={toggleModal}
              isVisible={isButtonVisible2}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={isModalVisible}>
          <View style={styles.Modal}>
            <Text
              style={{
                fontSize: 16,
                marginTop: 35,
                color: "black",
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              ระบบกำลังดำเนินการ{"\n"}หากการเลื่อนการนัดหมายสำเร็จ{"\n"}
              ทางแอปพลิเคชันจะส่งการ{"\n"}แจ้งเตือนตอบกลับวันนัดหมาย
            </Text>
            <Ionicons name="calendar-outline" size={100} color="black" />
            <TouchableOpacity
              style={styles.confirmb}
              onPress={toggleModal2}
              isVisible={isButtonVisible}
            >
              <Text style={styles.text}>I understand</Text>
            </TouchableOpacity>
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
    marginTop: "20%",
    width: "94%",
    height: "50%",
    justifyContent: "center",
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
  Modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 8,
    marginHorizontal: "5%",
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
