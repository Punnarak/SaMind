import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
// import assignData from "../upcomingData";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";

export default function IndividualTestList({ route }) {
  const { patientId } = route.params || {};
  const [individualTestList, setInividualTestList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Individual Test List Screen", patientId);
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
    const param = {
      patient_id: patientId,
    };
    axios
      .post("/assignment_status_wait", param)
      .then((response) => {
        if (response.data.length != 0) {
          console.log("in");
          setInividualTestList(response.data);
        }
        console.log(response.data, response.data.length);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
      return onFocus
  }, []);

  return (
    <ImageBackground
      source={require("../assets/Game.png")}
      style={{ alignItems: "center", flex: 1 }}
    >
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
      <Text style={styles.header}>Individual Test</Text>

      <View style={styles.container2}>
        <View style={styles.container3}>
          <ScrollView style={{}}>
            {individualTestList.map((item, index) => (
              <View style={styles.box} item={item} index={index} key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#569AFF",
                        fontStyle: "italic",
                      }}
                    >
                      {item.createBy} {item.testName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#569AFF",
                        fontStyle: "italic",
                        marginTop: 8,
                      }}
                    >
                      detail: {item.detail}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#569AFF",
                        fontStyle: "italic",
                      }}
                    >
                      Turn in before: {item.turnInBefore}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    color="#3987FD"
                    style={{
                      position: "absolute",
                      marginLeft: "80%",
                      transform: [{ rotate: "180deg" }],
                    }}
                    onPress={() =>
                      navigation.navigate("IndividualTestScreen", {
                        patientId,
                        item,
                      })
                    }
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.undertag}>
          <Feather
            name="bell"
            style={styles.picul}
            size={25}
            color="#222222"
            onPress={() => navigation.navigate("NotinScreen")}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container2: {
    marginTop: "30%",
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    height: "77%",
    paddingTop: 25,
    flex: 1,
    paddingHorizontal: 30,
    borderRadius: 25,
    zIndex: 0,
  },
  container3: {
    backgroundColor: "white",
    alignItems: "center",
    // width: "790%"
    width: "400%",
    height: "77%",
    paddingTop: 10,
    flex: 1,
    zIndex: 0,
  },
  box: {
    borderWidth: 5,
    borderColor: "#569AFF",
    borderRadius: 8,
    marginTop: "5%",
    width: "100%",
    paddingHorizontal: "3%",
    paddingVertical: "6%",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#569AFF",
    marginTop: "-7%",
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
  },
  picur: {
    marginLeft: "70%",
  },
  picul: {
    marginLeft: "9%",
  },
});
