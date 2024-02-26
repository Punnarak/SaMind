import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Platform,
  TouchableOpacity,
  Image,
  LayoutAnimation,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import I from "react-native-vector-icons/MaterialIcons";
import { horizontalScale, moderateScale, verticalScale } from "./Metrics";
import moment from "moment";

const NotificationBox = ({ item, index, data }) => {
  const navigation = useNavigation();
  const [isRotating, setIsRotating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastAnimatedValue = useRef(new Animated.Value(0)).current;
  console.log("Boxxx--> ", data);
  const startRotation = () => {
    if (isRotating) return;

    setIsRotating(true);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // setIsRotating(false);
      lastAnimatedValue.setValue(animatedValue._value);
    });
  };

  const reverseRotation = () => {
    // setIsRotating(true);

    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsRotating(false);
      lastAnimatedValue.setValue(animatedValue._value);
    });
  };

  const rotateInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  const toggleContainer = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  };
  const containerStyle = {
    ...styles.container,
    height: isExpanded ? "90%" : "90%",
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedTime = item.time;
  console.log(item.time, formattedTime);
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={
          (containerStyle,
          [styles.container, { height: isExpanded ? "90%" : "90%" }])
        }
        key={index}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <I name="date-range" size={20} color="#D88A63" />
          <Text style={[styles.header]}>
            {months[data.month - 1] + " " + data.date + " - " + formattedTime}
          </Text>
        </View>
        <Text style={[styles.detail]}>
          {item.therapist_fname + " " + item.therapist_lname}
        </Text>

        {/* Location section - Conditionally rendered based on the isExpanded state */}
        {isExpanded && (
          <View>
            <View
              style={{
                marginTop: "5%",
                flexDirection: "row",
                alignItems: "center",
                // flex: 1,
                // justifyContent: "flex-start",

                ...Platform.select({
                  android: {
                    left: -265,
                  },
                  ios: {
                    // marginLeft: "-79.5%",

                    left: -245,
                  },
                }),
              }}
            >
              <Image
                source={require("./assets/location.png")}
                style={{
                  ...Platform.select({
                    android: {
                      // marginRight: "-54%",
                      left: 18,
                    },
                    ios: {
                      // marginRight: "-57%",
                    },
                  }),
                  height: 25,
                  resizeMode: "contain",
                }}
              />
              <Text style={[styles.lodetail]}>{item.location}</Text>
            </View>
            <View
              style={{
                position: "absolute",
                marginTop: "20%",
                marginLeft: "-8%",
              }}
            >
              <View
                style={{
                  width: 350,
                  height: 0.5,
                  backgroundColor: "white",
                }}
              />
            </View>
            <Text style={[styles.description]}>Description :</Text>
            <Text style={[styles.ansdescription]}>{item.description}</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            if (!isRotating) {
              startRotation();
              toggleContainer();
            } else {
              reverseRotation();
              toggleContainer();
            }
          }}
          // disabled={}
          style={{
            position: "absolute",
            zIndex: 3,
            marginLeft: "93%",
            marginTop: "8.5%",
            transform: [{ rotate: "270deg" }],
          }}
        >
          <View>
            <Animated.View style={animatedStyle}>
              <Ionicons name="chevron-back-outline" size={30} color="#D88A63" />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderColor: "#F9E5DB",
    backgroundColor: "#F9E5DB",
    borderRadius: 15,
    marginTop: "5%",
    width: "100%",
    paddingHorizontal: "3%",
    paddingVertical: "8%",
  },

  header: {
    ...Platform.select({
      android: {
        left: "0%",
      },
      ios: {
        left: "0%",
      },
    }),
    fontSize: 17,
    color: "#D88A63",
    fontWeight: "bold",
    marginLeft: 5,
  },
  detail: {
    marginTop: "3.1%",
    fontSize: 15,
    color: "#D88A63",
  },
  lodetail: {
    ...Platform.select({
      android: {
        left: -210,
      },
      ios: {
        left: -230,
      },
    }),
    fontSize: 15,
    color: "#D88A63",
  },
  description: {
    marginTop: "12.2%",
    fontSize: 15,
    color: "#D88A63",
  },
  ansdescription: {
    fontSize: 15,
    marginTop: "5%",
    color: "#D88A63",
  },
});

export default NotificationBox;
