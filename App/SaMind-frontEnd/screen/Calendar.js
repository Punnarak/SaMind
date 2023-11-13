import React, { useState, useEffect } from "react";
import MyCalendar from "../Calendar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";

export default function Calendar() {
  useEffect(() => {
    console.log("Calendar Screen");
  }, []);

  const navigation = useNavigation();
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [highlightedDatesFormat, setHighlightedDatesFormat] = useState([]);
  useEffect(() => {
    const dateStrings = ["2023-10-27", "2023-10-30"];
    setHighlightedDatesFormat(dateStrings);
    const dateFormat = "YYYY-MM-DD";
    const dates = dateStrings.map((dateString) =>
      moment(dateString, dateFormat).toDate()
    );
    setHighlightedDates(dates);
  }, []);

  const handleDateSelected = (date, month, year) => {
    // ส่งข้อมูลวันที่ที่ถูกเลือกไปยังหน้า A
    month = (month + 1).toString().padStart(2, "0");
    date = date.toString().padStart(2, "0");

    const selectedDate = `${year}-${month}-${date}`;
    console.log("Selected date:", selectedDate);

    if (highlightedDatesFormat.includes(selectedDate)) {
      navigation.navigate("Upcomingscreen", { date, month, year });
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
