import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const NotificationBox = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        // alignItems: "center",
      }}
    >
      <View style={styles.container} key={index}>
        <Text style={[styles.header]}>{item.title}</Text>
        <Text style={[styles.detail]}>Detail: {item.detail}</Text>
        {item.target !== "Calendarscreen" && (
          <Text style={[styles.detail]}>Turn in Before: {item.turnin}</Text>
        )}

        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="#3987FD"
          style={{
            position: "absolute",
            zIndex: 1,
            marginLeft: item.target !== "Calendarscreen" ? "90%" : "90%",
            left: item.target !== "Calendarscreen" ? 15 : 15,
            marginTop: item.target !== "Calendarscreen" ? "8.5%" : "10.5%",
            transform: [{ rotateY: "180deg" }],
          }}
          onPress={() => navigation.navigate(item.target)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderColor: "#569AFF",
    borderRadius: 8,
    marginTop: "5%",
    width: "100%",
    paddingHorizontal: "3%",
    paddingVertical: "5%",
  },

  header: {
    fontSize: 16,
    color: "#569AFF",
    fontWeight: "bold",
  },
  detail: { fontSize: 10, color: "#569AFF" },
});

export default NotificationBox;
