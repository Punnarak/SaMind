import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import I from "react-native-vector-icons/MaterialIcons";
import { horizontalScale, moderateScale, verticalScale } from "./Metrics.js";

import { axios, axiospython } from "./screen/axios.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isAndroid = Platform.OS === "android";
const Bar = ({ patientId, hospitalName, navigateToAvatarscreen, noti }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.undertag}>
      {noti != 0 ? (
        <Image
          source={require("./assets/notification.png")}
          style={{
            width: 25,
            height: 25,
            resizeMode: "cover",
            marginLeft: horizontalScale(34),
          }}
        />
      ) : (
        <Feather
          name={"bell"}
          style={styles.picul}
          size={25}
          color="#222222"
          onPress={() => navigation.navigate("Notiscreen", { patientId })}
        />
      )}
      <Feather
        name="smile"
        style={styles.picur}
        size={25}
        color="#222222"
        onPress={navigateToAvatarscreen}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  // bottom bar
  undertag: isAndroid
    ? {
        elevation: 10,
        shadowColor: "black", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS

        height: verticalScale(67.8),
        width: horizontalScale(380),
        // width: "120%",
        // height: 69.8,
        // marginTop: "2%",
        backgroundColor: "white",

        flexDirection: "row",
        alignItems: "center",
        // marginTop: "7%",
      }
    : {
        // height: 69.8,
        shadowColor: "rgba(0,0,0, 0.3)", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS

        height: verticalScale(67.8),
        width: horizontalScale(380),
        // width: "120%",
        // height: 69.8,
        // marginTop: "2%",
        backgroundColor: "white",

        flexDirection: "row",
        alignItems: "center",
        // marginTop: "7%",
      },
  // Avatar icon
  picur: {
    marginLeft: horizontalScale(266.5),
    // marginLeft: "70%",
  },
  // Noti icon
  picul: {
    marginLeft: horizontalScale(34),
    // marginLeft: "9%",
  },
});
export default Bar;
