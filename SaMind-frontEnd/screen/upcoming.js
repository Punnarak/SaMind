import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import data from "../notiData";
import UpcomingBox from "../upcomingbox";

export default function Upcoming({ route }) {
  const navigation = useNavigation();
  console.log("Upcoming Screen");
  const { date, month, year } = route.params || {};

  // const handleDateSelected = (date, month, year) => {
  //   // จัดการข้อมูลวันที่ที่ได้รับและทำอะไรต่อกับมัน
  //   setSelectedDate({ date, month, year });
  // };

  console.log("date--> " + date);

  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <View
          style={{
            flexDirection: "row",
            marginTop: "15%",
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
        <Text style={styles.header}>Upcoming Appointments</Text>
        <ScrollView style={{}}>
          {data.map((item, index) => (
            <UpcomingBox item={item} index={index} key={index} />
          ))}
        </ScrollView>
      </View>
      <Text style={styles.assignment}>Assignment</Text>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        }}
      ></View>
      <View style={styles.undertag}>
        <Feather
          name="bell"
          style={styles.picul}
          size={25}
          color="#222222"
          onPress={() => navigation.goBack()}
        />
        <Feather
          name="smile"
          style={styles.picur}
          size={25}
          color="#222222"
          onPress={() => navigation.navigate("Avatarscreen")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  container2: {
    backgroundColor: "#C6E3FF",
    alignItems: "center",
    height: "50%",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingHorizontal: 25,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#25271C",
    marginTop: "-7%",
  },
  assignment: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#25271C",
    marginTop: 20,
    marginRight: "60%",
  },
  undertag: {
    width: "120%",
    height: 69.8,
    marginBottom: 0,
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  picur: {
    marginLeft: "70%",
  },
  picul: {
    marginLeft: "9%",
  },
});
