import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import I from "react-native-vector-icons/MaterialIcons";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { Ionicons } from "@expo/vector-icons";
export default function Login() {
  const navigation = useNavigation();
  const [selectedMenu, setSelectedMenu] = useState();
  const [checkIn, setCheckIn] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const iconSize = Platform.select({
    ios: 57,
    android: 48,
  });

  handleLogin = async () => {};
  console.log("Home Screen");
  const handleMenuPress = (menu) => {
    setSelectedMenu(menu);
    console.log(menu);
  };
  const isMenuSelected = (menu) => {
    return menu === selectedMenu;
  };
  const handleCheckinPress = (selectedMenu) => {
    console.log("checkin --> ", selectedMenu);
    if (
      selectedMenu == "a" ||
      selectedMenu == "b" ||
      selectedMenu == "c" ||
      selectedMenu == "d" ||
      selectedMenu == "e"
    ) {
      setDisabled(true);
      setCheckIn(true);
      console.log("checkin complete");
    } else {
      setDisabled(false);
      setCheckIn(false);
    }
  };
  return (
    <View style={styles.container1}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.boxlevel}>
          <Text style={styles.level}>LV.1 Beginner</Text>
        </View>
        <TouchableOpacity
          style={styles.boxper}
          onPress={() => navigation.navigate("Profilescreen")}
        >
          <Icon
            name="person-outline"
            style={styles.per}
            size={27}
            type="ionicon"
            color="black"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.n}>
        Hi{"  "}
        <Text style={styles.name}>Punya</Text>
      </Text>
      <Text style={styles.n1}>How are you feeling today?</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          ...Platform.select({
            android: {
              marginTop: "4%",
            },
            ios: {
              marginTop: "5%",
            },
          }),
        }}
      >
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.menuItem,
            isMenuSelected("a") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("a")}
        >
          <Image
            source={require("../assets/m1.png")}
            style={[styles.icon]}
            onPress={() => handleMenuPress("a")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.menuItem,
            isMenuSelected("b") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("b")}
        >
          <Image source={require("../assets/m2.png")} style={[styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.menuItem,
            isMenuSelected("c") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("c")}
        >
          <Image source={require("../assets/m3.png")} style={[styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.menuItem,
            isMenuSelected("d") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("d")}
        >
          <Image source={require("../assets/m4.png")} style={[styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.menuItem,
            isMenuSelected("e") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("e")}
        >
          <Image source={require("../assets/m5.png")} style={[styles.icon]} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        disabled={disabled}
        style={[styles.checkinb]}
        onPress={() => handleCheckinPress(selectedMenu)}
      >
        <Text style={styles.checkin}>Check - in</Text>
        {checkIn == true && (
          <TouchableOpacity
            disabled={disabled}
            style={{
              backgroundColor: "#11dd66",
              borderRadius: 100,
              margin: 3,
            }}
          >
            <Ionicons name="checkmark-circle-outline" size={17} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <View style={styles.container2}>
        <Text style={styles.textf}>What do you want to do ?</Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: verticalScale(31.7),
              // marginTop: "10%",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Appointmentscreen")}
            >
              <Text style={styles.Textb}>APPOINTMENT</Text>
              <Icon
                name="alarm"
                style={styles.picb}
                size={iconSize}
                type="ionicon"
                color="#847872"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Calendarscreen")}
            >
              <Text style={styles.Textb}>CALENDAR</Text>
              <I
                name="calendar-today"
                style={styles.picb1}
                size={iconSize}
                color="#847872"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: verticalScale(22.3),
              // marginTop: "7%",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Dashboardscreen")}
            >
              <Text style={styles.Textb}>DASHBOARD</Text>
              <I
                name="dashboard"
                style={styles.picb2}
                size={iconSize}
                color="#847872"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Loginscreen")}
            >
              <Text style={styles.Textb}>GAME</Text>
              <I
                name="videogame-asset"
                style={styles.picb1}
                size={iconSize}
                color="#847872"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: verticalScale(22.3),
              // marginTop: "7%",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Libraryscreen")}
            >
              <Text style={styles.Textb}>LIBRARY</Text>
              <I
                name="menu-book"
                style={styles.picb2}
                size={iconSize}
                color="#847872"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Testscreen")}
            >
              <Text style={styles.Textb}>TEST</Text>
              <I
                name="format-list-bulleted"
                style={styles.picb1}
                size={iconSize}
                color="#847872"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.undertag}>
          <Feather
            name="bell"
            style={styles.picul}
            size={25}
            color="#222222"
            onPress={() => navigation.navigate("Notiscreen", { patientId })}
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
    </View>
  );
}

const styles = StyleSheet.create({
  // blue background
  container1: {
    ...Platform.select({
      android: {},
      ios: {},
    }),
    marginTop: -10,
    flex: 1,
    backgroundColor: "#C6E3FF",
    alignItems: "center",
  },
  //white background
  container2: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: verticalScale(11.5),
    // marginTop: "3%",
    width: "100%",
    paddingHorizontal: horizontalScale(28.95),
    // paddingHorizontal: 30,
    borderRadius: 25,
  },
  // Topic: What do you want to do ?
  textf: {
    marginTop: verticalScale(31.45),
    // marginTop: "10%",
    fontSize: moderateScale(15),
    // fontSize: 15,
    fontWeight: "bold",
    // letterSpacing: 0.25,
    color: "#25271C",
  },
  // profile setting icon
  per: {
    alignItems: "center",
    // marginTop: verticalScale(31.45),
    marginTop: "10%",
    marginRight: "0%",
  },
  // circle background of profile setting icon
  boxper: {
    // ...Platform.select({
    //   android: {
    //     marginTop: "4%",
    //   },
    //   ios: {
    marginTop: "10%",
    //   },
    // }),
    marginTop: 40,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 40,
    borderColor: "rgba(255, 255, 255, 0.6)",
    height: 40,
    width: 40,
  },
  // Box of Level Text
  boxlevel: {
    // ...Platform.select({
    //   android: {
    //     marginTop: "8%",
    //   },
    //   ios: {
    marginTop: "15%",
    //   },
    // }),

    borderWidth: 1,
    backgroundColor: "#3C9BF2",
    borderColor: "#3C9BF2",
    borderRadius: 21,
    // padding: "3%",
    padding: 11.5,
    marginTop: 58,
    // marginRight: horizontalScale(187.5),
    marginRight: "50%",
    // marginRight: 500,
    marginBottom: verticalScale(15),
    // marginBottom: "4%",
  },
  // Level Text
  level: {
    fontSize: moderateScale(15),
    // fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  // Feature Text
  Textb: {
    fontSize: moderateScale(14),
    // fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    marginTop: "5%",
    // letterSpacing: 0.25,
    color: "#847872",
  },
  // UserName -> Hi (Name)
  name: {
    fontSize: moderateScale(22.6),
    // fontSize: 23,
    color: "black",
    marginTop: "1%",
    marginLeft: "55%",
    fontWeight: "bold",
  },
  // checkin button
  checkinb: {
    flexDirection: "row",
    marginTop: verticalScale(13.5),
    // marginTop: "3.6%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(4.9),
    // paddingVertical: 5,
    paddingHorizontal: horizontalScale(5),
    // paddingHorizontal: 5,
    borderRadius: 25,
    backgroundColor: "#FBBB00",
    width: horizontalScale(110),
    // width: "28%",
  },
  selectedMenuItem: {
    backgroundColor: "white",
    borderRadius: 50, // Change to your desired color for the selected menu item
  },
  // checkin Text
  checkin: {
    fontSize: moderateScale(14.7),
    // fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  // Hi
  n: {
    fontSize: moderateScale(23),
    // fontSize: 23,
    color: "#6AA6FF",
    marginTop: "0%",
    fontWeight: "bold",
    // marginRight: "62%",
    marginRight: horizontalScale(233.5),
  },
  // How are you feeling today?
  n1: {
    ...Platform.select({
      android: {
        marginRight: "26%",
      },
      ios: {
        marginRight: "23%",
        marginTop: "2%",
      },
    }),
    // marginRight: horizontalScale(85),
    fontSize: moderateScale(19.5),
    // fontSize: 20,
    color: "#6AA6FF",
    fontWeight: "bold",
  },
  // 5 mood icon
  icon: {
    //Ipad เละ
    // width: horizontalScale(72.1),
    width: 75,
    // height: horizontalScale(72.1),
    height: 75,
    // margin: "0%",
    tintColor: "#000000",
  },
  // 6 Box of Feature
  button: {
    ...Platform.select({
      android: {
        paddingVertical: verticalScale(20.5),
      },
      ios: {
        paddingVertical: verticalScale(10.5),
      },
    }),
    marginTop: verticalScale(-19),
    // marginTop: "-6%",
    margin: "2%",
    alignItems: "center",
    justifyContent: "center",

    // paddingVertical: 11,
    paddingHorizontal: horizontalScale(28),
    // paddingHorizontal: 30,
    borderRadius: 15,
    backgroundColor: "#F9E5DB",
    width: horizontalScale(158.5),
    // width: "50%",
  },
  // Appointment icon
  picb: {
    ...Platform.select({
      android: {
        // margin: "4%",
      },
      ios: {
        margin: "4%",
      },
    }),
    alignItems: "center",
    // margin: "4%",
  },
  // Test Game Calendar icon
  picb1: {
    ...Platform.select({
      android: {
        // margin: "4%",
      },
      ios: {
        margin: "5%",
      },
    }),
    alignItems: "center",
    // margin: "5%",
  },
  // Library Dashboard icon
  picb2: {
    ...Platform.select({
      android: {
        // margin: "4%",
      },
      ios: {
        margin: "5%",
      },
    }),
    alignItems: "center",
    // margin: "5%",
  },
  // bottom bar
  undertag: {
    ...Platform.select({
      android: {
        // height: 50.4,
        elevation: 10,
        shadowColor: "black", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
      },
      ios: {
        // height: 69.8,
        shadowColor: "rgba(0,0,0, 0.3)", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
      },
    }),
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
