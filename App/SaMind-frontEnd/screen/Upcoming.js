import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
// import data from "../upcomingData";
import UpcomingBox from "../upcomingbox";
import AssignmentBox from "../AssigmentBox";
// import assignData from "../assignData";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";

export default function Upcoming({ route }) {
  const navigation = useNavigation();
  const { patientId, data, date, month, year } = route.params || {};
  const [datas, setData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("daily");
  const [assignData, setAssignData] = useState([]);

  useEffect(() => {
    console.log("Upcoming Screen", patientId);
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
    const dateStrings = [year + "-" + month + "-" + date];
    console.log(dateStrings);
    const dateFormat = "YYYY-MM-DD";
    const dates = dateStrings.map((dateString) =>
      moment(dateString, dateFormat).toDate()
    );
    setData(dates);
    const param = {
      patient_id: patientId,
      type: selectedMenu,
    };
    axios
      .post("/assignmentInfo_post", param)
      .then((response) => {
        if (response.data.length != 0) {
          console.log("in");
          setAssignData(response.data);
        }

        console.log(response.data, response.data.length);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Axios error:", error);
      });
      return onFocus
  }, []);

  console.log("date--> " + date);
  const handleMenuPress = (menu) => {
    setSelectedMenu(menu);
    const param = {
      patient_id: patientId,
      type: menu,
    };
    axios
      .post("/assignmentInfo_post", param)
      .then((response) => {
        if (response.data.length != null) {
          console.log("in");
          setAssignData(response.data);
        }

        console.log(response.data, response.data.length);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Axios error:", error);
      });
  };

  const isMenuSelected = (menu) => {
    return menu === selectedMenu;
  };
  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <View
          style={{
            flexDirection: "row",
            marginTop: "15%",
            // flex: 1,
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
        {/*ซ่อน scrollview*/}
        {/* <ScrollView showsVerticalScrollIndicator={false} style={{}}>  */}
        <ScrollView style={{}}>
          {data.map((item, index) => (
            <UpcomingBox
              item={item}
              index={index}
              key={index}
              data={{ datas, date, month, year }}
            />
          ))}
          <View style={styles.no}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              No other appointment
            </Text>
          </View>
        </ScrollView>
      </View>
      <Text style={styles.assignment}>Assignment</Text>
      <View style={styles.menuBar}>
        <TouchableOpacity
          style={[
            styles.menuItem,
            isMenuSelected("daily") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("daily")}
        >
          <Text
            style={[
              styles.menuText,
              isMenuSelected("daily") && styles.selectedMenuText,
            ]}
          >
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            isMenuSelected("weekly") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("weekly")}
        >
          <Text
            style={[
              styles.menuText,
              isMenuSelected("weekly") && styles.selectedMenuText,
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            isMenuSelected("monthly") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("monthly")}
        >
          <Text
            style={[
              styles.menuText,
              isMenuSelected("monthly") && styles.selectedMenuText,
            ]}
          >
            Monthly
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginLeft: 15,
          paddingHorizontal: 15,
          flexDirection: "column",
          flex: 1,
        }}
      >
        {selectedMenu == "daily" && (
          <ScrollView style={{}}>
            {assignData.map((item, index) => (
              <AssignmentBox item={item} index={index} key={index} />
            ))}
          </ScrollView>
        )}
        {selectedMenu == "weekly" && (
          <ScrollView style={{}}>
            {assignData.map((item, index) => (
              <AssignmentBox item={item} index={index} key={index} />
            ))}
          </ScrollView>
        )}
        {selectedMenu == "monthly" && (
          <ScrollView style={{}}>
            {assignData.map((item, index) => (
              <AssignmentBox item={item} index={index} key={index} />
            ))}
          </ScrollView>
        )}
      </View>

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
  no: {
    borderWidth: 1,
    borderColor: "#FFF9F9",
    backgroundColor: "rgba(255,255,255 ,0.12)",
    borderStyle: "dashed",
    borderRadius: 15,
    marginTop: "5%",
    width: "100%",
    paddingHorizontal: "3%",
    paddingVertical: "13%",
    alignItems: "center",
    // zIndex: -1,
  },
  container1: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  container2: {
    backgroundColor: "#C6E3FF",
    alignItems: "center",
    height: "46%",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingHorizontal: 25,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#25271C",
    marginTop: "-7%",
    marginBottom: "10%",
  },
  assignment: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#25271C",
    marginTop: 20,
    marginRight: "60%",
    marginBottom: 20,
  },
  menuBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#d2e8ff",
    // paddingVertical: 0,
    borderRadius: 30,
  },
  menuItem: {
    padding: 30,
    paddingVertical: 10,
  },
  selectedMenuItem: {
    backgroundColor: "#6AA6FF",
    borderRadius: 30, // Change to your desired color for the selected menu item
  },
  menuText: {
    fontSize: 13,
    color: "#3C5A9A",
    fontWeight: "bold",
  },
  selectedMenuText: {
    fontWeight: "bold",
    color: "white",
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
