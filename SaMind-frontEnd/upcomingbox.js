import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import I from "react-native-vector-icons/MaterialIcons";

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <I name="date-range" size={20} color="#D88A63" />
          <Text style={[styles.header]}>{item.title}</Text>
        </View>
        <Text style={[styles.detail]}>{item.title}</Text>

        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="#D88A63"
          style={{
            position: "absolute",
            zIndex: 1,
            marginLeft: "90%",
            marginTop: "8.5%",
            transform: [{ rotate: "270deg" }],
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
    borderColor: "#F9E5DB",
    backgroundColor: "#F9E5DB",
    borderRadius: 8,
    marginTop: "5%",
    width: "100%",
    alignItems: "left",
    paddingHorizontal: "3%",
    paddingVertical: "5%",
  },

  header: {
    fontSize: 17,
    color: "#D88A63",
    fontWeight: "bold",
    marginLeft: 5,
  },
  detail: { fontSize: 15, color: "#D88A63" },
});

export default NotificationBox;
