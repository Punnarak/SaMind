import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import NotiBox from "../notibox";

export default function Notification() {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    console.log("Notification Screen");
  }, []);

  // Extract data from the route params
  const { data } = route.params;

  return (
    <ImageBackground
      source={require("../assets/Game.png")}
      style={{ alignItems: "center", flex: 1, position: "absolute" }}
    >
      <View style={{ flexDirection: "row", marginTop: "15%" }}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="#3987FD"
          style={{ marginRight: "80%" }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text style={styles.header}>Notification</Text>
      <View style={styles.container2}>
        <ScrollView style={{}}>
          {data.map((item, index) => (
            <NotiBox item={item} index={index} key={index} />
          ))}
        </ScrollView>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
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
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#25271C",
    marginTop: "-7%",
  },

  noti: {
    marginTop: "100%",
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
