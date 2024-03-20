import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  FlatList,
  Image,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import usePasswordVisibility from "../usePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import usePasswordVisibility1 from "../usePasswordVisibility1";
import { Ionicons } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import Modal from "react-native-modal";
import moment from "moment";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";

export default function Login({ route }) {
  const navigation = useNavigation();
  const { passwordVisibility, togglePasswordVisibility } =
    usePasswordVisibility();
  const { passwordVisibility1, togglePasswordVisibility1 } =
    usePasswordVisibility1();
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [Conpassword, setConPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  //validate
  const [timeError, setTimeError] = useState(false);

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isPickerVisibleN, setIsPickerVisibleN] = useState(false);
  const [doctorName, setDoctorName] = useState(null);
  const [showdate, setshowdate] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { date, month, year, patientId } = route.params || {};
  const [time, setTime] = useState([
    { id: 1, name: "0:00-1:00 ", value: "0:00" },
    { id: 2, name: "0:30-1:30 ", value: "0:30" },
    { id: 3, name: "1:00-2:00 ", value: "1:00" },
    { id: 4, name: "1:30-2:30 ", value: "1:30" },
    { id: 5, name: "2:00-3:00 ", value: "2:00" },
    { id: 6, name: "2:30-3:30 ", value: "2:30" },
    { id: 7, name: "3:00-4:00 ", value: "3:00" },
    { id: 8, name: "3:30-4:30 ", value: "3:30" },
    { id: 9, name: "4:00-5:00 ", value: "4:00" },
    { id: 10, name: "4:30-5:30 ", value: "4:30" },
    { id: 11, name: "5:00-6:00 ", value: "5:00" },
    { id: 12, name: "5:30-6:30 ", value: "5:30" },
    { id: 13, name: "6:00-7:00 ", value: "6:00" },
    { id: 14, name: "6:30-7:30 ", value: "6:30" },
    { id: 15, name: "7:00-8:00 ", value: "7:00" },
    { id: 16, name: "7:30-8:30 ", value: "7:30" },
    { id: 17, name: "8:00-9:00 ", value: "8:00" },
    { id: 18, name: "8:30-9:30 ", value: "8:30" },
    { id: 19, name: "9:00-10:00 ", value: "9:00" },
    { id: 20, name: "9:30-10:30 ", value: "9:30" },
    { id: 21, name: "10:00-11:00 ", value: "10:00" },
    { id: 22, name: "10:30-11:30 ", value: "10:30" },
    { id: 23, name: "11:00-12:00 ", value: "11:00" },
    { id: 24, name: "11:30-12:30 ", value: "11:30" },
    { id: 25, name: "12:00-13:00 ", value: "12:00" },
    { id: 26, name: "12:30-13:30 ", value: "12:30" },
    { id: 27, name: "13:00-14:00 ", value: "13:00" },
    { id: 28, name: "13:30-14:30 ", value: "13:30" },
    { id: 29, name: "14:00-15:00 ", value: "14:00" },
    { id: 30, name: "14:30-15:30 ", value: "14:30" },
    { id: 31, name: "15:00-16:00 ", value: "15:00" },
    { id: 32, name: "15:30-16:30 ", value: "15:30" },
    { id: 33, name: "16:00-17:00 ", value: "16:00" },
    { id: 34, name: "16:30-17:30 ", value: "16:30" },
    { id: 35, name: "17:00-18:00 ", value: "17:00" },
    { id: 36, name: "17:30-18:30 ", value: "17:30" },
    { id: 37, name: "18:00-19:00 ", value: "18:00" },
    { id: 38, name: "18:30-19:30 ", value: "18:30" },
    { id: 39, name: "19:00-20:00 ", value: "19:00" },
    { id: 40, name: "19:30-20:30 ", value: "19:30" },
    { id: 41, name: "20:00-21:00 ", value: "20:00" },
    { id: 42, name: "20:30-21:30 ", value: "20:30" },
    { id: 43, name: "21:00-22:00 ", value: "21:00" },
    { id: 44, name: "21:30-22:30 ", value: "21:30" },
    { id: 45, name: "22:00-23:00 ", value: "22:00" },
    { id: 46, name: "22:30-23:30 ", value: "22:30" },
    { id: 47, name: "23:00-24:00 ", value: "23:00" },
  ])

  const DrName = [
    { id: 1, name: "A", value: "A" },
    {
      id: 2,
      name: "B",
      value: "B",
    },
    { id: 3, name: "C", value: "C" },
  ];

  const toggleUnderstand = () => {
    setConfirmModal(!confirmModal);
    setSubmit(!submit);

    navigation.navigate("Appointmentscreen", { patientId });
  };
  const toggleSubmit = () => {
    console.log('toggle submit',selectedValue)
    if(selectedValue && selectedValue != 'time not available'){
    setTimeError("")
    setConfirmModal(!confirmModal);
    const dateApi = date + "-" + (month + 1) + "-" + year;
    const param = {
      therapistName: doctorName,
      patientId: patientId,
      patientName: name,
      date: dateApi,
      time: selectedValue,
      patientPhone: tel,
    };
    console.log(param);
    axios
      .post("/appointSelect", param)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Axios error:", error);
      });
    }else{
      setTimeError("*")
    }
  };
  const toggleModal = () => {
    setSubmit(!submit);
  };
  const handleSubmit = () => {
    if (selectedValue && selectedValue != 'time not available') {
      setTimeError("");
      const dateString = year + "-" + (month + 1) + "-" + date;

      const dateFormat = "YYYY-MM-DD";
      const fulldate = moment(dateString, dateFormat).toDate();
      const day = fulldate.getDay();
      let datestring = "";
      if (date > 3) {
        datestring = date + "th";
      } else {
        if (date === 1) {
          datestring = date + "st";
        } else if (date === 2) {
          datestring = date + "nd";
        } else if (date === 3) {
          datestring = date + "rd";
        }
      }
      const Days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

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
      setshowdate(
        datestring + " " + Days[day] + " " + months[month] + " " + year
      );
      setSubmit(!submit);
    } else {
      setTimeError("*");
    }
  };

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };
  const togglePickerN = () => {
    setIsPickerVisibleN(!isPickerVisibleN);
  };
  const handleItemPress = (itemValue) => {
    console.log("Time --> ", itemValue.value);
    setSelectedValue(itemValue.value);
    setIsPickerVisible(false);
  };
  const handleItemPressN = (itemValue) => {
    console.log("Time --> ", itemValue);
    setDoctorName(itemValue.name);
    setIsPickerVisibleN(false);
  };

  const renderLink = ({ item }) => {
    return (
      <Text style={styles.link} onPress={() => handleItemPress(item)}>
        {item.name}
      </Text>
    );
  };

  const renderLinkN = ({ item }) => {
    return (
      <Text style={styles.link} onPress={() => handleItemPressN(item)}>
        {item.name}
      </Text>
    );
  };
  useEffect(() => {
    console.log("Select Appointment Screen", patientId);
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


    let param2 = {
      patientID: patientId,
      date: year + "-" + (month + 1) + "-" + date
    }
    console.log(param2)
    axios
      .post("/appointShowTime", param2)
      .then((response) => {
        console.log("data:", response.data);
        if(response.data === '-'){
          setSelectedValue("time not available")
          setDisabled(true)
        }else{
           setTime(response.data)
           setDisabled(false)
        }
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
    const param = {
      patientId: patientId,
    };
    axios
      .post("/appointConfig", param)
      .then((response) => {
        console.log("in");
        setName(response.data.patientName);
        setDoctorName(response.data.therapistName);
        setTel(response.data.patientPhone);
        console.log("data:", response.data);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
      return onFocus;
  }, []);

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
        }}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container2}>
        <Text style={styles.title1}>Time</Text>
        <Text style={styles.errorText}>{timeError}</Text>
        <TextInput
          style={[
            styles.hospitalInput,
            {
              ...Platform.select({
                android: {
                  height: isPickerVisible ? "43.5%" : "10%",
                  paddingBottom: isPickerVisible ? 200 : 0,
                },
                ios: {
                  // margin: "5%",
                  height: isPickerVisible ? "43.5%" : "10%",
                  paddingBottom: isPickerVisible ? 150 : 0,
                },
              }),
            },
          ]}
          placeholder="Choose time..."
          placeholderTextColor={"rgba(96, 91, 91, 0.47)"}
          editable={false}
          value={selectedValue ? selectedValue : ""}
        />
        <TouchableOpacity style={[styles.eyeI]} onPress={togglePicker} disabled={disabled}>
          <Ionicons
            name="chevron-back-outline"
            style={{
              transform: [{ rotate: "270deg" }],
              ...Platform.select({
                android: {
                  marginTop: isPickerVisible ? -4 : -4,
                },
                ios: {
                  marginTop: isPickerVisible ? 2 : 2,
                },
              }),
            }}
            size={20}
            color="#3987FD"
          />
        </TouchableOpacity>
        {isPickerVisible ? (
          <FlatList
            data={time}
            renderItem={renderLink}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
          />
        ) : null}

        <Text style={styles.title2}>Name</Text>
        <TextInput
          placeholder="Punya"
          editable={false}
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.title4}>Dr. Name</Text>
        <TextInput
          editable={false}
          style={[
            styles.Drinput,
            {
              height: isPickerVisibleN ? "45%" : "10%",
              paddingBottom: isPickerVisibleN ? 150 : 0,
            },
          ]}
          placeholder="Dr.Name"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          value={doctorName}
        />
        {/* <TouchableOpacity style={[styles.eyeI2]} onPress={togglePickerN}>
          <Ionicons
            name="chevron-back-outline"
            style={{
              transform: [{ rotate: "270deg" }],
              ...Platform.select({
                android: {
                  marginTop: isPickerVisible ? -2 : -2,
                },
                ios: {
                  marginTop: isPickerVisible ? 1 : 1,
                },
              }),
            }}
            size={20}
            color="#3987FD"
          />
        </TouchableOpacity>
        {isPickerVisibleN ? (
          <FlatList
            data={DrName}
            renderItem={renderLinkN}
            keyExtractor={(item) => item.id.toString()}
            style={styles.listN}
          />
        ) : null} */}
        <Text style={styles.title3}>Tel</Text>
        <TextInput
          editable={false}
          placeholder="0890222255"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          secureTextEntry={passwordVisibility}
          style={styles.TextInput}
          value={tel}
          onChangeText={setTel}
        />
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: verticalScale(24),
            // marginTop: "8%",
          }}
        >
          <TouchableOpacity style={styles.loginb} onPress={handleSubmit}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.outb}
            onPress={() => navigation.navigate("Appointmentscreen")}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal isVisible={submit}>
        <View style={styles.Modal}>
          {confirmModal ? (
            <Text
              style={{
                fontSize: 16,
                marginTop: 35,
                color: "black",
                fontWeight: "bold",
                marginBottom: 35,
                textAlign: "center",
              }}
            >
              ระบบกำลังดำเนินการ{"\n"}หากการนัดหมายสำเร็จทาง{"\n"}
              แอปพลิเคชันจะส่งการ{"\n"}แจ้งเตือนตอบกลับวันนัดหมาย
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 16,
                marginTop: 35,
                color: "black",
                fontWeight: "bold",
                marginBottom: 45,
                textAlign: "center",
              }}
            >
              Do you want to make an{"\n"}appointment with
            </Text>
          )}
          {confirmModal ? (
            <Image
              source={require(`../assets/checker.png`)}
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
            />
          ) : (
            <Text
              style={{
                fontSize: 16,
                color: "#569AFF",
                fontWeight: "bold",
                marginBottom: 45,
                textAlign: "center",
              }}
            >
              DR.Somsak Saetang
            </Text>
          )}
          {confirmModal ? null : (
            <Text
              style={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              On {showdate}
            </Text>
          )}

          {confirmModal ? (
            <TouchableOpacity
              style={styles.confirmb}
              onPress={toggleUnderstand}
              isVisible={submit}
            >
              <Text style={styles.text}>I understand</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.confirmb}
              onPress={toggleSubmit}
              isVisible={submit}
            >
              <Text style={styles.text}>Confirm</Text>
            </TouchableOpacity>
          )}
          {confirmModal ? null : (
            <TouchableOpacity
              style={styles.cancelb}
              onPress={toggleModal}
              isVisible={submit}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#BED8FF",
    alignItems: "center",
  },
  container2: {
    backgroundColor: "white",
    alignItems: "center",
    marginTop: verticalScale(37.5),
    // marginTop: "10%",
    width: horizontalScale(356.5),
    // width: "95%",
    paddingVertical: 30,
    paddingHorizontal: horizontalScale(20.85),
    // paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  errorText: {
    position: "absolute",
    ...Platform.select({
      android: {},
      ios: {},
    }),
    fontSize: moderateScale(25),
    fontWeight: "bold",
    marginTop: verticalScale(25),
    alignSelf: "flex-start",
    left: horizontalScale(75),
    color: "red",
    zIndex: 1,
  },
  title1: {
    ...Platform.select({
      android: {
        // margin: "4%",
        marginBottom: verticalScale(60),
      },
      ios: {
        // margin: "5%",
        marginBottom: verticalScale(50),
      },
    }),
    marginRight: "82.1%",
    // marginTop: "0%",

    // marginBottom: "1%",
    fontSize: moderateScale(19.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title2: {
    ...Platform.select({
      android: {
        marginBottom: verticalScale(3),
      },
      ios: {
        marginBottom: verticalScale(3),
      },
    }),
    marginRight: "80.5%",
    // marginTop: "0%",

    // marginBottom: "1%",
    fontSize: moderateScale(19.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title3: {
    ...Platform.select({
      android: {
        marginBottom: verticalScale(3),
      },
      ios: {
        marginBottom: verticalScale(3),
      },
    }),
    marginRight: "90.5%",
    // marginTop: "0%",

    // marginBottom: "1%",
    fontSize: moderateScale(19.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title4: {
    ...Platform.select({
      android: {
        marginBottom: verticalScale(65),
      },
      ios: {
        marginBottom: verticalScale(55),
      },
    }),
    marginRight: "73.1%",
    // marginTop: "0%",

    // marginBottom: "1%",
    fontSize: moderateScale(19.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  TextInput: {
    ...Platform.select({
      android: {
        marginBottom: verticalScale(10),
      },
      ios: {
        marginBottom: verticalScale(6),
      },
    }),
    marginTop: moderateScale(3.05),
    // marginTop: "1%",
    height: verticalScale(38.315),
    // height: 40,
    width: "100%",

    // marginBottom: "2%",
    borderWidth: 2,
    borderColor: "#569AFF",
    borderRadius: 10,
    paddingHorizontal: horizontalScale(8),
    // paddingHorizontal: 8,
    paddingVertical: verticalScale(6),
    // paddingVertical: 6,
  },

  eyeI: {
    // dposition: "absolute",
    marginLeft: "85%",
    marginTop: verticalScale(-36),
    // marginTop: "-12%",
    marginBottom: verticalScale(15),
    zIndex: 5,
  },
  eyeI2: {
    // dposition: "absolute",
    marginLeft: "85%",
    marginTop: verticalScale(-36),
    // marginTop: "-12%",
    marginBottom: verticalScale(15),
    zIndex: 2,
  },
  loginb: {
    marginTop: verticalScale(18),
    // marginTop: "6%",
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 70,
    borderRadius: 25,
    backgroundColor: "#569AFF",
  },
  outb: {
    marginTop: verticalScale(11.7),
    // marginTop: "4%",
    marginBottom: verticalScale(11.7),
    // marginBottom: "4%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 70,
    borderRadius: 25,
    backgroundColor: "#C6E3FF",
  },
  text: {
    fontSize: moderateScale(14.7),
    // fontSize: 15,
    lineHeight: verticalScale(20.2),
    // lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  n: {
    fontSize: 13,
    color: "black",
    marginLeft: "3%",
    fontWeight: "bold",
  },
  hospitalInput: {
    position: "absolute",
    ...Platform.select({
      android: {
        // margin: "4%",
        marginTop: verticalScale(63),
      },
      ios: {
        // margin: "5%",
        marginTop: verticalScale(58),
        marginBottom: verticalScale(6.5),
      },
    }),

    // height: verticalScale(38.35),
    width: "100%",

    borderColor: "#3987FD",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: "2.5%",
    backgroundColor: "white",
    zIndex: 1,
  },
  textInputBackground: {
    position: "absolute", // กำหนดให้ pseudo-element เป็น absolute
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "blue", // กำหนดสีพื้นหลังทึบ
    opacity: 0.5, // กำหนดความทึบ
    // zIndex: -1, // ให้ pseudo-element อยู่/ต่ำกว่า TextInput
  },
  link: {
    backgroundColor: "white",
    // alignItems: "center",
    // width: "100%",
    paddingHorizontal: "1.5%",
    paddingVertical: 8,
    // borderRightWidth: 1,
    // borderLeftWidth: 1,
    // borderLeftColor: "#3987FD",
    // borderRightColor: "#3987FD",
    // borderBottomWidth: 1,
    // borderBottomColor: "#3987FD",
    borderWidth: 1,
    // borderColor: "#3987FD",
    borderColor: "#EEF7FF",
    // zIndex: 5,
  },
  list: {
    ...Platform.select({
      android: {
        maxHeight: 210,
        marginTop: "21%",
        width: "98.49%",
        borderRadius: 10,
      },
      ios: {
        maxHeight: 190,
        marginTop: "20%",
        width: "99%",
        borderRadius: 10,
      },
    }),
    backgroundColor: "white",
    position: "absolute",

    zIndex: 3,
  },
  Drinput: {
    ...Platform.select({
      android: {
        // margin: "4%",
        marginTop: verticalScale(238),
        marginBottom: verticalScale(6.5),
      },
      ios: {
        // margin: "5%",
        marginTop: verticalScale(205),
        marginBottom: verticalScale(6.5),
      },
    }),
    backgroundColor: "white",
    position: "absolute",

    // height: verticalScale(38.35),
    width: "100%",

    borderColor: "#3987FD",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: "2.5%",

    zIndex: 1,
  },
  listN: {
    ...Platform.select({
      android: {
        width: "98.0%",
        maxHeight: 190,
        marginTop: "74%",
      },
      ios: {
        width: "98.0%",
        maxHeight: 190,
        marginTop: "67%",
      },
    }),
    backgroundColor: "white",
    position: "absolute",

    zIndex: 1,
  },
  Modal: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 8,
    marginHorizontal: "5%",
    zIndex: 1,
  },
  confirmb: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#000000",
    width: "60%",
    marginBottom: 7,
  },
  cancelb: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#BABABA",
    width: "60%",
    marginBottom: 15,
  },
});
