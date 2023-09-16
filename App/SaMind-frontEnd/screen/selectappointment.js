import React, { useState } from "react";

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

export default function Login({ route }) {
  const navigation = useNavigation();
  const { passwordVisibility, togglePasswordVisibility } =
    usePasswordVisibility();
  const { passwordVisibility1, togglePasswordVisibility1 } =
    usePasswordVisibility1();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Conpassword, setConPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isPickerVisibleN, setIsPickerVisibleN] = useState(false);
  const [selectedValueN, setSelectedValueN] = useState(null);
  const [showdate, setshowdate] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);

  const { date, month, year } = route.params || {};

  const time = [
    { id: 1, name: "9:00-10:00   AM", value: "9" },
    {
      id: 2,
      name: "10:00-11:00  AM",
      value: "10",
    },
    { id: 3, name: "1:00-2:00      PM", value: "1" },
    { id: 4, name: "2:00-3:00      PM", value: "2" },
    { id: 5, name: "3:00-4:00      PM", value: "3" },
    { id: 6, name: "4:00-5:00      PM", value: "4" },
  ];

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
    navigation.navigate("Appointmentscreen");
  };
  const toggleSubmit = () => {
    setConfirmModal(!confirmModal);
  };

  const toggleModal = () => {
    setSubmit(!submit);
  };
  const handleSubmit = () => {
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
  };

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };
  const togglePickerN = () => {
    setIsPickerVisibleN(!isPickerVisibleN);
  };
  const handleItemPress = (itemValue) => {
    console.log("Time --> ", itemValue);
    setSelectedValue(itemValue.name);
    setIsPickerVisible(false);
  };
  const handleItemPressN = (itemValue) => {
    console.log("Time --> ", itemValue);
    setSelectedValueN(itemValue.name);
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
  console.log("Select Appointment Screen ");

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
        <TextInput
          style={[
            styles.hospitalInput,
            {
              height: isPickerVisible ? "43.5%" : "10%",
              paddingBottom: isPickerVisible ? 150 : 0,
            },
          ]}
          placeholder="Choose time..."
          placeholderTextColor={"rgba(96, 91, 91, 0.47)"}
          editable={false}
          value={selectedValue ? selectedValue : ""}
        />
        <TouchableOpacity style={[styles.eyeI]} onPress={togglePicker}>
          <Ionicons
            name="chevron-back-outline"
            style={{
              transform: [{ rotate: "270deg" }],
              marginTop: isPickerVisible ? 2 : 2,
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
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.title4}>Dr. Name</Text>
        <TextInput
          style={[
            styles.Drinput,
            {
              height: isPickerVisibleN ? "45%" : "10%",
              paddingBottom: isPickerVisibleN ? 150 : 0,
            },
          ]}
          placeholder="Dr.Name"
          placeholderTextColor={"rgba(96, 91, 91, 0.47)"}
          editable={false}
          value={selectedValueN ? selectedValueN : ""}
        />
        <TouchableOpacity style={[styles.eyeI2]} onPress={togglePickerN}>
          <Ionicons
            name="chevron-back-outline"
            style={{
              transform: [{ rotate: "270deg" }],
              marginTop: isPickerVisible ? 1 : 1,
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
        ) : null}
        <Text style={styles.title3}>Tel</Text>
        <TextInput
          placeholder="0890222255"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          secureTextEntry={passwordVisibility}
          style={styles.TextInput}
          value={password}
          onChangeText={setPassword}
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
            onPress={() => navigation.navigate("Appoinmentscreen")}
          >
            <Text style={styles.text}>Sign Out</Text>
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
  title1: {
    marginRight: "82.1%",
    // marginTop: "0%",
    marginBottom: verticalScale(50),
    // marginBottom: "1%",
    fontSize: moderateScale(19.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title2: {
    marginRight: "80.5%",
    // marginTop: "0%",
    marginBottom: verticalScale(3),
    // marginBottom: "1%",
    fontSize: moderateScale(19.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title3: {
    marginRight: "90.5%",
    // marginTop: "0%",
    marginBottom: verticalScale(3),
    // marginBottom: "1%",
    fontSize: moderateScale(19.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title4: {
    marginRight: "73.1%",
    // marginTop: "0%",
    marginBottom: verticalScale(55),
    // marginBottom: "1%",
    fontSize: moderateScale(19.6),
    // fontSize: 20,
    color: "#569AFF",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  TextInput: {
    marginTop: moderateScale(3.05),
    // marginTop: "1%",
    height: verticalScale(38.315),
    // height: 40,
    width: "100%",
    marginBottom: verticalScale(6),
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
    paddingHorizontal: 65,
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

  icon: {
    width: 50,
    height: 50,
    alignItems: "center",
    margin: "7%",
    resizeMode: "contain",
  },
  hospitalInput: {
    position: "absolute",

    marginTop: verticalScale(58),
    // height: verticalScale(38.35),
    width: "100%",
    marginBottom: verticalScale(6.5),
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
    backgroundColor: "white",
    position: "absolute",
    width: "99%",
    maxHeight: 190,
    marginTop: "20%",
    borderRadius: 10,
    zIndex: 3,
  },
  Drinput: {
    backgroundColor: "white",
    position: "absolute",

    marginTop: verticalScale(205),
    // height: verticalScale(38.35),
    width: "100%",
    marginBottom: verticalScale(6.5),
    borderColor: "#3987FD",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: "2.5%",

    zIndex: 1,
  },
  listN: {
    backgroundColor: "white",
    position: "absolute",
    width: "98.0%",
    maxHeight: 190,
    marginTop: "67%",
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
