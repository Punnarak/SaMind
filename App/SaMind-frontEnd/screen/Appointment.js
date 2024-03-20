import React, { useState, useEffect } from "react";
import MyCalendar from "../Calendar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Platform,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Modal from "react-native-modal";
import "moment-timezone";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";
import DateTimePicker from "@react-native-community/datetimepicker";
const isAndroid = Platform.OS === "android";
export default function Calendar({ route }) {
  const navigation = useNavigation();
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [waitDocToCon, setWaitDocToCon] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newAppointment, setNewAppointment] = useState(new Date());
  const [timeError, setTimeError] = useState(false);
  const [dateError, setDateError] = useState('');

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedTimeLabel, setSelectedTimeLabel] = useState(null);
  const [showdate, setshowdate] = useState([]);
  const [oldDate, setOldDate] = useState([]);
  const [newAppString, setNewAppString] = useState("");
  //   const [isCalendarVisible, setCalendarVisible] = useState(true);
  const { patientId } = route.params || {};
  const [time, setTime] = useState([
    { id: 1, name: "00:00-01:00 ", value: "00:00" },
    { id: 2, name: "00:30-01:30 ", value: "00:30" },
    { id: 3, name: "01:00-02:00 ", value: "01:00" },
    { id: 4, name: "01:30-02:30 ", value: "01:30" },
    { id: 5, name: "02:00-03:00 ", value: "02:00" },
    { id: 6, name: "02:30-03:30 ", value: "02:30" },
    { id: 7, name: "03:00-04:00 ", value: "03:00" },
    { id: 8, name: "03:30-04:30 ", value: "03:30" },
    { id: 9, name: "04:00-05:00 ", value: "04:00" },
    { id: 10, name: "04:30-05:30 ", value: "04:30" },
    { id: 11, name: "05:00-06:00 ", value: "05:00" },
    { id: 12, name: "05:30-06:30 ", value: "05:30" },
    { id: 13, name: "06:00-07:00 ", value: "06:00" },
    { id: 14, name: "06:30-07:30 ", value: "06:30" },
    { id: 15, name: "07:00-08:00 ", value: "07:00" },
    { id: 16, name: "07:30-08:30 ", value: "07:30" },
    { id: 17, name: "08:00-09:00 ", value: "08:00" },
    { id: 18, name: "08:30-09:30 ", value: "08:30" },
    { id: 19, name: "09:00-10:00 ", value: "09:00" },
    { id: 20, name: "09:30-10:30 ", value: "09:30" },
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
  const [disabled, setDisabled] = useState(false)
  console.log("Calendar Screen", patientId);
  
  const queryTime = () => {
    if(newAppString !== ''){
    d = newAppString.split("-")
    let param = {
      patientID: patientId,
      date:d[2]+"-"+d[1]+"-"+d[0]
    }
    setSelectedTimeLabel(null)
    console.log(newAppString,param)
    axios
      .post("/appointShowTimeChange", param)
      .then((response) => {
        console.log("data:", response.data);
        if(response.data == '-'){
          setSelectedTimeLabel('time not available')
          setDisabled(true)
        }else{
          setTime(response.data)
          setDisabled(false)
        }
       
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
    }
  };

  const renderLink = ({ item }) => {
    return (
      <Text style={styles.link} onPress={() => handleItemPress(item)}>
        {item.name}
      </Text>
    );
  };

  const handleItemPress = (itemValue) => {
    console.log("Time --> ", itemValue.value);
    setSelectedValue(itemValue.value);
    setSelectedTimeLabel(itemValue.name);
    setIsPickerVisible(false);
  };

  useEffect(() => {
    if (selectedValue == null) {
      setTimeError("*");
    } else {
      setTimeError("");
    }
  }, [selectedValue]);
  useEffect(() => {
   queryTime()  
   setDateError("")
   if( newAppString && (newAppString != null || newAppString != '')){
    setDisabled(false)
   }else{
    setDisabled(true)
   }
  }, [newAppString]);
  useEffect(() => {
    console.log("Appointment Screen", patientId);
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
      let dateStrings;
      axios
        .post("/appoint_patient_post", param)
        .then((response) => {
          if (response.data.length != 0) {
            console.log("in");
            dateStrings = response.data;
            const dateFormat = "YYYY-MM-DD";
            const dates = dateStrings.map((dateString) =>
              moment(dateString, dateFormat).toDate()
            );
            setHighlightedDates(dates);
          }

          console.log(response.data, response.data.length);
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Axios error:", error);
        });
    });

    return onFocus;
  }, []);
  // }, [highlightedDates]);
  const handleDateSelected = (date, month, year, textColor) => {
    // ส่งข้อมูลวันที่ที่ถูกเลือกไปยังหน้า A
    const dateString = year + "-" + (month + 1) + "-" + date;
    setOldDate(dateString);
    const dateFormat = "YYYY-MM-DD";
    const fulldate = moment(dateString, dateFormat).toDate();
    console.log("fulldate--> " + fulldate);
    console.log("highlightedDates--> ", highlightedDates);

    const isDateInHighlightedDates = highlightedDates.some(
      (highlightedDate) => {
        // Compare fulldate with each date in the highlightedDates array
        return fulldate.getTime() === highlightedDate.getTime();
      }
    );

    console.log("textColor", textColor);
    if (isDateInHighlightedDates && textColor == "#f00") {
      toggleModal();
      if (date > 3) {
        date = date + "th";
      } else {
        if (date === 1) {
          date = date + "st";
        } else if (date === 2) {
          date = date + "nd";
        } else if (date === 3) {
          date = date + "rd";
        }
      }
    } else if (
      !isDateInHighlightedDates &&
      textColor === "black" &&
      textColor !== "lightgray"
    ) {
      console.log(date + "-" + month + "-" + year);
      navigation.navigate("Selectappointmentscreen", {
        date,
        month,
        year,
        patientId,
      });
    }

    const day = fulldate.getDay();
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
    setshowdate(date + " " + Days[day] + " " + months[month] + " " + year);
    // navigation.navigate("Upcomingscreen", { date, month, year });
  };

  const showPicker = () => {
    console.log("open picker");
    setShowDatePicker(true);
  };

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setConfirm(false);
    setWaitDocToCon(false);
    setNewAppointment(new Date());
    setSelectedValue(null);
    setIsPickerVisible(false);
    setNewAppString("")
    setSelectedTimeLabel("")
  };

  const toggleModal2 = () => {
    setConfirm(!confirm);
  };

  const submit = () => {
    console.log("selectvalue",selectedValue)
    if(newAppString && (newAppString != null || newAppString != '')){
      setDateError("")
    }else{
      setDateError("*")
    }
    if (selectedValue && (selectedValue != null || selectedValue != '' || selectedValue != ' ')) {
      console.log("confirm state", !confirm);
      setConfirm(!confirm);
      setWaitDocToCon(!waitDocToCon);
      const selectedDateFormatted = moment(newAppointment).format("YYYY-MM-DD");
      let parts = oldDate.split("-");

      let date = new Date(parts[0], parts[1] - 1, parts[2]);

      let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

      const param = {
        patientID: patientId,
        oldDate: formattedDate,
        newDate: selectedDateFormatted,
        newTime: selectedValue,
      };
      console.log(param);
      axios
        .post("/appointChangeDateTime", param)
        .then((response) => {
          console.log(
            "postpone is success",
            oldDate,
            newAppointment,
            selectedValue
          );
          setNewAppointment(new Date())
          setNewAppString("")
          setSelectedValue("")
          setSelectedTimeLabel("")
          
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Axios error:", error);
        });
    } else {
      setTimeError("*");
    }
  };
  const toggleUnderstand = () => {
    setModalVisible(!isModalVisible);
    setWaitDocToCon(!waitDocToCon);
    setNewAppointment(new Date());
    setSelectedValue(null);
    setIsPickerVisible(false);
    navigation.navigate("Appointmentscreen", { patientId });
  };
  return (
    <ImageBackground
      source={require("../assets/Game.png")}
      style={{ alignItems: "center", flex: 1, resizeMode: "contain" }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // marginTop: "20%",
          marginTop: 78,
        }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="#3987FD"
          style={{
            marginRight: "80%",
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text style={styles.header}>Choose date Appointment</Text>
      <View style={styles.container2}>
        <MyCalendar
          highlightedDates={highlightedDates}
          onDateSelected={handleDateSelected}
        />
        {/* first Modal */}
        <Modal isVisible={isModalVisible}>
          <View style={styles.Modal}>
            {confirm ? (
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 35,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 25,
                  textAlign: "center",
                }}
              >
                กรุณาเลือกวันที่ และเวลาที่ต้องการนัดหมาย
              </Text>
            ) : waitDocToCon ? (
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 35,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 25,
                  textAlign: "center",
                }}
              >
                ระบบกำลังดำเนินการ{"\n"}หากการเลื่อนการนัดหมายสำเร็จ{"\n"}
                ทางแอปพลิเคชันจะส่งการ{"\n"}แจ้งเตือนตอบกลับวันนัดหมาย
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
                Do you want to Postpone {"\n"}this appointment with
              </Text>
            )}
            {confirm ? (
              <View>
                <View
                  style={{
                    alignSelf: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {isAndroid ? (
                    <View
                      style={{
                        alignSelf: "center",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    > 
                    <Text style={styles.errorDate}>{dateError}</Text>
                      <TextInput
                        placeholder="Select Date"
                        editable={false}
                        placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
                        style={{
                          height: verticalScale(38.315),
                          width: 150,
                          marginRight: 5,
                          borderWidth: 2,
                          borderColor: "#569AFF",
                          borderRadius: 10,
                          paddingHorizontal: horizontalScale(8),
                          paddingVertical: verticalScale(6),
                        }}
                        value={newAppString}
                        // onChange={queryTime()}
                      />
                      <Ionicons
                        name="calendar-outline"
                        size={25}
                        color="black"
                        onPress={showPicker}
                      />
                      {showDatePicker ? (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={newAppointment}
                          mode="date"
                          is24Hour={true}
                          display="calendar"
                          onChange={(event, selectedDate) => {
                            if (event.type === "set") {
                              const selectedDateFormatted =
                                moment(selectedDate).format("DD-MM-YYYY");
                              setNewAppString(selectedDateFormatted);
                              setNewAppointment(selectedDate);
                            }
                            setShowDatePicker(false);
                          }}
                          style={{
                            marginLeft: 5,
                            borderColor: "#569AFF",
                            borderWidth: 2,
                            width: 150,
                            borderRadius: 10,
                          }}
                        />
                      ) : null}
                    </View>
                  ) : (
                    <View
                      style={{
                        alignSelf: "center",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    > 
                    
                      <Ionicons
                        name="calendar-outline"
                        size={25}
                        color="black"
                      />
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={newAppointment}
                        mode="date"
                        is24Hour={true}
                        display="calendar"
                        onChange={(event, selectedDate) => {
                          const currentDate = selectedDate || newAppointment;
                          console.log(currentDate);
                          setNewAppointment(currentDate);
                        }}
                        style={{
                          marginLeft: 5,
                          borderColor: "#569AFF",
                          borderWidth: 2,
                          width: 150,
                          borderRadius: 10,
                        }}
                      />
                      <Text style={styles.errorDate}>{dateError}</Text>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    alignSelf: "center",
                    flexDirection: "row",

                    marginTop: 5,
                  }}
                >
                  <Ionicons
                    name="alarm-outline"
                    size={25}
                    color="black"
                    style={{
                      ...Platform.select({
                        android: { top: 5 },
                        ios: { top: 6 },
                      }),
                    }}
                  />
                  <Text style={styles.errorText}>{timeError}</Text>
                  <TextInput
                    style={[
                      styles.hospitalInput,
                      {
                        marginLeft: 5,
                        ...Platform.select({
                          android: {
                            height: isPickerVisible ? 150 : 40,
                            // paddingTop: isPickerVisible ? 0 : 0,
                            paddingBottom: isPickerVisible ? 110 : 0,
                          },
                          ios: {
                            height: isPickerVisible ? 40 : 40,
                            paddingTop: isPickerVisible ? 15 : 0,
                            paddingBottom: isPickerVisible ? 150 : 0,
                          },
                        }),
                      },
                    ]}
                    placeholder="Choose time..."
                    placeholderTextColor={"rgba(96, 91, 91, 0.47)"}
                    editable={false}
                    value={selectedTimeLabel ? selectedTimeLabel : ""}
                  />
                </View>
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
              </View>
            ) : waitDocToCon ? null : (
              <Text
                style={{
                  fontSize: 16,
                  color: "#FF5656",
                  fontWeight: "bold",
                  marginBottom: 45,
                  textAlign: "center",
                }}
              >
                DR.Samind Weerasuk
              </Text>
            )}
            {confirm ? null : waitDocToCon ? (
              <Ionicons name="mail-unread-outline" size={100} color="black" />
            ) : (
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
            {confirm ? (
              <View>
                <TouchableOpacity
                  style={styles.confirmb}
                  onPress={submit}
                  isVisible={isModalVisible}
                >
                  <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 11,
                    paddingHorizontal: 53,
                    borderRadius: 25,
                    backgroundColor: "#BABABA",
                    width: "60%",
                    marginBottom: 15,
                  }}
                  onPress={toggleModal}
                  isVisible={isModalVisible}
                >
                  <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : waitDocToCon ? (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 11,
                  paddingHorizontal: 30,
                  borderRadius: 25,
                  backgroundColor: "#000000",
                  width: "60%",
                  marginBottom: 7,
                  marginTop: 35,
                }}
                onPress={toggleUnderstand}
                isVisible={isModalVisible}
              >
                <Text style={styles.text}>I understand</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.confirmb}
                onPress={toggleModal2}
                isVisible={isModalVisible}
              >
                <Text style={styles.text}>Confirm</Text>
              </TouchableOpacity>
            )}
            {confirm ? null : waitDocToCon ? null : (
              <TouchableOpacity
                style={styles.cancelb}
                onPress={toggleModal}
                isVisible={isModalVisible}
              >
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      </View>
    </ImageBackground>
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
    // marginTop: verticalScale(75),
    marginTop: "20%",
    // marginTop: 100,
    width: horizontalScale(353),
    // width: "94%",
    // width: 370,
    paddingVertical: verticalScale(31.5),
    justifyContent: "center",
    borderRadius: 25,
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  header: {
    fontSize: moderateScale(16),
    // fontSize: 16,
    fontWeight: "bold",
    color: "#25271C",
    marginTop: verticalScale(-26),
    // marginTop: "-7%",
  },
  Modal: {
    ...Platform.select({
      android: {
        paddingHorizontal: horizontalScale(5),
      },
      ios: {},
    }),
    // justifyContent: "center",
    position: "relative",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 8,
    marginHorizontal: "5%",
    zIndex: 1,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  confirmb: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 52,
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
  hospitalInput: {
    //   position: "absolute",
    ...Platform.select({
      android: {
        // margin: "4%",
        // marginTop: verticalScale(63),
      },
      ios: {
        // margin: "5%",
        // marginTop: verticalScale(58),
        // marginBottom: verticalScale(6.5),
      },
    }),

    // height: verticalScale(38.35),
    width: 150,

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
  eyeI: {
    ...Platform.select({
      android: {
        marginTop: verticalScale(58),
        // marginTop: "-12%",
        // marginBottom: verticalScale(15),
      },
      ios: {
        marginTop: verticalScale(54),
        // marginTop: "-12%",
        // marginBottom: verticalScale(15),
      },
    }),
    position: "absolute",
    // marginLeft: "85%",

    right: 5,
    zIndex: 5,
  },
  list: {
    ...Platform.select({
      android: {
        maxHeight: 106,
        marginTop: 149,
        width: 146,
        borderRadius: 20,
      },
      ios: {
        maxHeight: 136,
        marginTop: 147,
        width: 146,
        borderRadius: 10,
      },
    }),
    top: -70,
    left: 32,
    backgroundColor: "white",
    position: "absolute",

    zIndex: 10,
  },
  link: {
    backgroundColor: "white",
    // alignItems: "center",
    // width: "100%",
    paddingHorizontal: "4.5%",
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
    zIndex: 15,
  },
  errorText: {
    position: "absolute",
    ...Platform.select({
      android: {},
      ios: {},
    }),
    fontSize: moderateScale(25),
    fontWeight: "bold",
    marginTop: verticalScale(0),
    alignSelf: "flex-start",
    right: horizontalScale(-15),
    color: "red",
    zIndex: 1,
  },errorDate: {
    position: "absolute",
    ...Platform.select({
      android: {},
      ios: {},
    }),
    fontSize: moderateScale(25),
    fontWeight: "bold",
    marginTop: verticalScale(0),
    alignSelf: "flex-start",
    right: horizontalScale(-15),
    color: "red",
    zIndex: 1,
  },
});
