import React, { useState, useEffect } from "react";
// import { Device } from "expo-device";
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
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import data from "../notiData";
// const getDeviceModel = () => {
//   const modelName = Device.modelName;
//   // Check if the model name indicates an Android device
//   return modelName.toLowerCase().includes("android");
// };

// const isAndroid = getDeviceModel();

const isAndroid = Platform.OS === "android";

export default function Home({ route }) {
  const { patientId, hospitalName } = route.params || {};
  const navigation = useNavigation();
  const [selectedMenu, setSelectedMenu] = useState();
  const [checkIn, setCheckIn] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fName, setFName] = useState("Punya");
  // const [notiData, setNotiData] = useState(data);
  const iconSize = isAndroid ? 48 : 57;

  const fetchData = async () => {
    // const patient = await AsyncStorage.getItem("patientId");
    // console.log("storage", patient);
    try {
      const response = await axios.post("/check_mood_per_day_get", {
        patient_id: patientId,
      });

      if (response.data.checkin === true) {
        setCheckIn(true);
        setDisabled(true);
      } else {
        setCheckIn(false);
        setDisabled(false);
      }

      if (response.data.fname) {
        setFName(response.data.fname);
      }

      setSelectedMenu(response.data.moodscore);
    } catch (error) {
      console.error("Axios error:", error);
    }
  };
  useEffect(() => {
    console.log("Home Screen", patientId);
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
      fetchData();
      console.log("mood", selectedMenu);
    });

    return onFocus;
  }, []);

  const navigateToGamescreen = async () => {
    try {
      // Make a request to your API to update timeplay
      console.log("storage", patientId);
      const response = await axios.put('/update_timeplay', { patient_id: patientId });
  
      if (response.status === 200) {
        console.log('Timeplay updated successfully');
        // Now that timeplay is updated, get click count
        const clickCountResponse = await axios.get('/get_click_count', { params: { patient_id: patientId } });
        
        // Extract click count from the response
        const clickCount = clickCountResponse.data.click_count;
  
        console.log('Click count:', clickCount);
  
        // Now navigate to the Gamescreen with patientId and clickCount
        navigation.navigate("Gamescreen", { patientId, clickCount });
        // navigation.navigate("Game2", { patientId });
      } else {
        console.error('Failed to update timeplay:', response.status);
        // Handle error accordingly
      }
    } catch (error) {
      console.error('Error updating timeplay:', error);
      // Handle error accordingly
    }
  };

  const navigateToAvatarscreen = async () => {
    try {
      const response = await axios.post('/talk_with_avatar', { patient_id: patientId });
      if (response.status === 201) {
        const { patient_id, mood_detection_id } = response.data.data;
        console.log( patient_id, mood_detection_id)
        // navigation.navigate("Avatarscreen")
        navigation.navigate("Avatarscreen", { patient_id, mood_detection_id });
      } else {
        console.error('Failed to insert data into avatar table:', response.status);
      }
    } catch (error) {
      console.error('Error inserting data into avatar table:', error);
    }
  };

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
      selectedMenu == "5" ||
      selectedMenu == "4" ||
      selectedMenu == "3" ||
      selectedMenu == "2" ||
      selectedMenu == "1"
    ) {
      setDisabled(true);
      setCheckIn(true);
      const param = {
        patient_id: patientId,
        score: selectedMenu,
      };
      axios
        .post("/mood_tracker_post", param)
        .then((response) => {
          console.log("checkin complete", response.data);
        })
        .catch((error) => {
          console.error("Axios error:", error);
        });
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
          onPress={() => navigation.navigate("Profilescreen", { patientId })}
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
      <View
        style={{
          flexDirection: "row",
          left: horizontalScale(0),
          width: 345,
        }}
      >
        <Text style={styles.n}>Hi </Text>
        <Text style={styles.name}>{fName}</Text>
      </View>

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
            isMenuSelected("5") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("5")}
        >
          <Image
            source={require("../assets/m1.png")}
            style={[styles.icon]}
            onPress={() => handleMenuPress("5")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.menuItem,
            isMenuSelected("4") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("4")}
        >
          <Image source={require("../assets/m2.png")} style={[styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.menuItem,
            isMenuSelected("3") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("3")}
        >
          <Image source={require("../assets/m3.png")} style={[styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.menuItem,
            isMenuSelected("2") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("2")}
        >
          <Image source={require("../assets/m4.png")} style={[styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.menuItem,
            isMenuSelected("1") && styles.selectedMenuItem,
          ]}
          onPress={() => handleMenuPress("1")}
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
              onPress={() =>
                navigation.navigate("Appointmentscreen", { patientId })
              }
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
              onPress={() =>
                navigation.navigate("Calendarscreen", { patientId })
              }
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
              onPress={() =>
                navigation.navigate("Dashboardscreen", { patientId })
              }
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
              onPress={() => navigateToGamescreen()}
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
              onPress={() =>
                navigation.navigate("Libraryscreen", {
                  patientId,
                  hospitalName,
                })
              }
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
              onPress={() => navigation.navigate("Testscreen", { patientId })}
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
            onPress={() => navigateToAvatarscreen()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // blue background
  container1: {
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
    // marginTop: "10%",
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
    // marginTop: "1%",
    // marginLeft: "55%",
    // marginLeft: "0%",
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
    ...Platform.select({
      android: {
        left: horizontalScale(0),
      },
      ios: { left: horizontalScale(0) },
    }),
    fontSize: moderateScale(23),
    // fontSize: 23,
    color: "#6AA6FF",
    marginTop: "0%",
    fontWeight: "bold",
    // marginRight: "62%",
    // marginRight: horizontalScale(233.5),
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
    // ...Platform.select({
    //   android: {
    //     ,
    //   },
    //   ios: {
    //     paddingVertical: ,
    //   },
    // }),
    paddingVertical: isAndroid ? verticalScale(20.5) : verticalScale(10.5),
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
    // ...Platform.select({
    //   android: {
    //     // margin: "4%",
    //   },
    //   ios: {
    //     margin: "4%",
    //   },
    // }),
    margin: isAndroid ? "0%" : "4%",
    alignItems: "center",
    // margin: "4%",
  },
  // Test Game Calendar icon
  picb1: {
    // ...Platform.select({
    //   android: {
    //     // margin: "4%",
    //   },
    //   ios: {
    //     margin: "5%",
    //   },
    // }),
    margin: isAndroid ? "0%" : "5%",
    alignItems: "center",
    // margin: "5%",
  },
  // Library Dashboard icon
  picb2: {
    // ...Platform.select({
    //   android: {
    //     // margin: "4%",
    //   },
    //   ios: {
    //     margin: "5%",
    //   },
    // }),
    margin: isAndroid ? "0%" : "5%",
    alignItems: "center",
    // margin: "5%",
  },
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
