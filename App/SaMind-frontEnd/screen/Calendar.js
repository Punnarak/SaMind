import React, { useState, useEffect } from "react";
import MyCalendar from "../Calendar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";

export default function Calendar({ route }) {
  const { patientId } = route.params || {};
  const navigation = useNavigation();
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [highlightedDatesFormat, setHighlightedDatesFormat] = useState([]);
  useEffect(() => {
    console.log("Calendar Screen", patientId);
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
    return onFocus;
  }, []);

  useEffect(() => {
    // const dateStrings = ["2023-10-27", "2023-10-30"];
    let dateStrings;
    const param = {
      patient_id: patientId,
    };
    axios
      .post("/appoint_patient_post", param)
      .then((response) => {
        if (response.data.length != 0) {
          console.log("in");
          dateStrings = response.data;
          setHighlightedDatesFormat(dateStrings);
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

  const handleDateSelected = async (date, month, year) => {
    // ส่งข้อมูลวันที่ที่ถูกเลือกไปยังหน้า A
    month = (month + 1).toString().padStart(2, "0");
    date = date.toString().padStart(2, "0");

    const selectedDate = `${year}-${month}-${date}`;
    console.log("Selected date:", selectedDate);

    if (highlightedDatesFormat.includes(selectedDate)) {
      let data = [];
      const param = {
        patient_id: patientId,
        date: selectedDate,
      };

      try {
        const response = await axios.post("/upcoming_date_post", param);

        if (response.data.length !== 0) {
          console.log("OUT");
          data = response.data;
        }
        navigation.navigate("Upcomingscreen", {
          patientId,
          data,
          date,
          month,
          year,
        });
      } catch (error) {
        // Handle any errors here
        console.error("Axios error:", error);
      }
    }
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
          marginTop: verticalScale(75),
          // marginTop: "20%",
        }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={moderateScale(30)}
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
    marginTop: verticalScale(75),
    // marginTop: "20%",
    width: horizontalScale(353),
    // width: "94%",
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
});
