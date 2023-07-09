import React, { useState, useEffect } from "react";
import MyCalendar from "../Calendar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

export default function Calendar() {
  console.log("Calendar Screen");

  const navigation = useNavigation();
  const [highlightedDates, setHighlightedDates] = useState([]);

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
    navigation.navigate("Upcomingscreen", { date, month, year });
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
});
