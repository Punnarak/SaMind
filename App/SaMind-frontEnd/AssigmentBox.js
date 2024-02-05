import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const NotificationBox = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.container} key={index}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Text style={styles.header}>{item.testName}</Text>
          <Ionicons
            name="ellipse"
            size={17}
            style={{
              color: item.status == "WAIT" ? "#FE493B" : "#11dd66",
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 5,
    borderColor: "#F5F5F5",
    marginTop: "5%",
    width: "95%",
    paddingHorizontal: "3%",
    paddingVertical: "3%",
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 14,
    color: "rgba(37, 39, 28, 0.8)",
    fontWeight: "bold",
  },
  detail: { fontSize: 10, color: "#569AFF" },
});

export default NotificationBox;
