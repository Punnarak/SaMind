import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";

export default function Profile({ route }) {
  const { patientId, update } = route.params || {};
  const navigation = useNavigation();
  //info
  const [data, setData] = useState({});

  useEffect(() => {
    console.log("Profile Screen", patientId);

    const onFocus = navigation.addListener("focus", () => {
      console.log("Screen is focused");
        axios
        .post("/refreshToken")
        .then((response) => {
          console.log("refresh Token success", response.data);
        })
        .catch((error) => {
          console.error("Axios error:", error);
        });
      const param = {
        patient_id: patientId,
      };
      axios
        .post("/info_patient_get", param)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error("Axios error:", error);
        });
    });

    return onFocus;
  }, []);
  const Logout = () => {
    axios
      .post("/logout")
      .then((response) => {
        console.log(response.data);
        navigation.navigate("Loginscreen");
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  };
  return (
    <View style={styles.container1}>
      <Ionicons
        name="chevron-back-outline"
        size={30}
        color="#3987FD"
        style={{
          // position: "absolute",
          marginRight: "80%",
          marginTop: verticalScale(75),
          // marginTop: "20%",
        }}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container2}>
        <Text style={styles.wel}>
          {data.fname && data.lname
            ? data.fname + " " + data.lname
            : "Punya Hasinanan"}
        </Text>
        <Text style={styles.title1}>Name</Text>
        <TextInput
          editable={false}
          placeholder={data.fname ? data.fname : "Punya"}
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
        />
        <Text style={styles.title2}>Surname</Text>
        <TextInput
          editable={false}
          placeholder={data.lname ? data.lname : "Hasinanan"}
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
        />
        <Text style={styles.title1}>Email</Text>
        <TextInput
          editable={false}
          placeholder={data.email ? data.email : "Pun@gmail.com"}
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
        />

        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: "8%",
          }}
        >
          <TouchableOpacity
            style={styles.loginb}
            onPress={() =>
              navigation.navigate("Editscreen", { patientId, data })
            }
          >
            <Text style={styles.text}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outb} onPress={() => Logout()}>
            <Text style={styles.text}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#BED8FF",
    alignItems: "center",
    // justifyContent: "flex-start",
  },
  container2: {
    backgroundColor: "white",
    alignItems: "center",
    marginTop: verticalScale(75),
    // marginTop: "20%",
    width: horizontalScale(356),
    // width: "95%",
    paddingVertical: 0,
    paddingHorizontal: horizontalScale(28.5),
    // paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  wel: {
    marginTop: verticalScale(44.7),
    // marginTop: "15%",
    marginBottom: verticalScale(21),
    // marginBottom: "7%",
    fontSize: moderateScale(23.5),
    // fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  title1: {
    marginRight: "80%",
    // marginTop: "0%",
    marginBottom: verticalScale(3),
    // marginBottom: "1%",
    fontSize: moderateScale(19),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title2: {
    marginRight: "70%",
    // marginTop: "0%",
    marginBottom: verticalScale(3),
    // marginBottom: "1%",
    fontSize: moderateScale(19),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  TextInput: {
    marginTop: verticalScale(3),
    // marginTop: "1%",
    height: verticalScale(38.36),
    // height: 40,
    width: "100%",
    marginBottom: verticalScale(6),
    // marginBottom: "2%",
    borderWidth: 2,
    borderColor: "#569AFF",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  loginb: {
    marginTop: verticalScale(18.2),
    // marginTop: "6%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 70,
    borderRadius: 25,
    backgroundColor: "#569AFF",
  },
  outb: {
    marginTop: verticalScale(12.2),
    // marginTop: "4%",
    marginBottom: verticalScale(12.2),
    // marginBottom: "4%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 54,
    borderRadius: 25,
    backgroundColor: "#C6E3FF",
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
