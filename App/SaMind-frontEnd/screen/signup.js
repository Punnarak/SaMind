import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  FlatList,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import usePasswordVisibility from "../usePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import usePasswordVisibility1 from "../usePasswordVisibility1";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const navigation = useNavigation();
  const { passwordVisibility, togglePasswordVisibility } =
    usePasswordVisibility();
  const { passwordVisibility1, togglePasswordVisibility1 } =
    usePasswordVisibility1();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [Conpassword, setConPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const items = [
    { id: 1, name: "โรงพยาบาลศิริราช", value: "โรงพยาบาลศิริราช" },
    {
      id: 2,
      name: "ศูนย์การแพทย์กาญจนาภิเษก",
      value: "ศูนย์การแพทย์กาญจนาภิเษก",
    },
    { id: 3, name: "โรงพยาบาลรามาธิบดี", value: "โรงพยาบาลรามาธิบดี" },
    { id: 4, name: "Hospital 4", value: "hospital4" },
    { id: 5, name: "Hospital 5", value: "hospital5" },
    { id: 6, name: "Hospital 6", value: "hospital6" },
  ];

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };
  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const handleItemPress = (itemValue) => {
    console.log("Hospital --> ", itemValue);
    // if (tapCount === 1) {
    setSelectedValue(itemValue.name);
    setIsPickerVisible(false);
    // } else {
    //   setTapCount(1);
    // }
  };

  const renderLink = ({ item }) => {
    return (
      <Text style={styles.link} onPress={() => handleItemPress(item)}>
        {item.name}
      </Text>
    );
  };

  useEffect(() => {
    console.log("SignUp Screen");
  }, []);
  const animatedNodeTag = Platform.select({
    ios: "parent",
    android: 37631,
  });

  return (
    // <View style={styles.container1}>
    <ImageBackground
      source={require("../assets/Game.png")}
      style={{ width: "100%", resizeMode: "cover", flex: 1 }}
    >
      <View style={styles.container2}>
        <Text style={styles.wel}>Let's get started</Text>
        <TextInput
          placeholder="Fullname"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          value={fullname}
          onChangeText={setFullname}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          style={styles.TextInput}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          secureTextEntry={passwordVisibility}
          style={styles.TextInput}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeI}
          onPress={togglePasswordVisibility}
        >
          <Feather
            name={passwordVisibility ? "eye-off" : "eye"}
            size={20}
            color="#569AFF"
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={"rgba(86, 154, 255, 0.52)"}
          secureTextEntry={passwordVisibility1}
          style={styles.TextInput2}
          value={Conpassword}
          onChangeText={setConPassword}
        />
        <TouchableOpacity
          style={styles.eyeI}
          onPress={togglePasswordVisibility1}
        >
          <Feather
            name={passwordVisibility1 ? "eye-off" : "eye"}
            size={20}
            color="#569AFF"
          />
        </TouchableOpacity>
        <Text style={styles.hospital}>Hospital</Text>
        <TextInput
          style={[
            styles.hospitalInput,
            {
              height: isPickerVisible ? "20%" : "4.5%",
              paddingBottom: isPickerVisible ? 130 : 0,
            },
          ]}
          placeholder="Select Hospital"
          placeholderTextColor={"rgba(96, 91, 91, 0.47)"}
          editable={false}
          value={selectedValue ? selectedValue : ""}
        />
        <TouchableOpacity style={[styles.eyeI]} onPress={togglePicker}>
          <Ionicons
            name="chevron-back-outline"
            style={{
              transform: [{ rotate: "270deg" }],
              marginTop: isPickerVisible ? 52 : 52,
            }}
            size={20}
            color="#3987FD"
          />
        </TouchableOpacity>

        {isPickerVisible ? (
          <FlatList
            data={items}
            renderItem={renderLink}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
          />
        ) : null}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: verticalScale(30),
            // marginTop: "8%",
          }}
        >
          <TouchableOpacity onPress={handleCheckboxToggle}>
            <Feather
              name={isChecked ? "check-circle" : "circle"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.n}>
            I agree to {"  "}
            <Text
              style={styles.hyper}
              onPress={() => navigation.navigate("Signupscreen")}
            >
              Terms & Conditions
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.loginb}
          onPress={() =>
            navigation.navigate("Signupinscreen", { animatedNodeTag })
          }
        >
          <Text style={styles.text}>Sign up</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: verticalScale(32),
            // marginTop: "10%",
          }}
        >
          <View
            style={{ width: "15%", height: 1, backgroundColor: "#569AFF" }}
          />
          <View>
            <Text style={{ width: 50, textAlign: "center", color: "#569AFF" }}>
              Or
            </Text>
          </View>
          <View
            style={{ width: "15%", height: 1, backgroundColor: "#569AFF" }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: verticalScale(6),
            // marginTop: "2%",
          }}
        >
          <Image source={require("../assets/Apple.png")} style={styles.icon} />
          <Image source={require("../assets/google.png")} style={styles.icon} />
          <Image
            source={require("../assets/facebook.png")}
            style={styles.icon}
          />
        </View>
      </View>
      {/* </View> */}
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
    // ...Platform.select({
    //   android: {
    //     marginTop: "25%",
    //   },
    //   ios: {
    //     marginTop: "50%",
    //   },
    // }),
    backgroundColor: "white",
    alignItems: "center",
    marginTop: verticalScale(188),
    // marginTop: "50%",
    // marginTop: 195,
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    // paddingVertical: "0%",
    // paddingHorizontal: 30,
    paddingHorizontal: "7.5%",
    borderRadius: 25,
  },
  wel: {
    // marginBottom: "7%",
    marginBottom: verticalScale(22.4),
    marginTop: verticalScale(47.8),
    // marginTop: "15%",
    fontSize: moderateScale(23.5),
    // fontSize: 24,
    color: "#569AFF",
    fontWeight: "bold",
  },
  TextInput: {
    marginTop: verticalScale(3.15),
    // marginTop: "1%",
    height: verticalScale(38.35),
    // height: 40,
    // height: "4.75%",
    // width: "80%",
    width: 265,
    // marginBottom: "2%",
    marginBottom: verticalScale(6.5),
    // marginBottom: 6.7,
    borderColor: "#569AFF",
    borderBottomWidth: 1,
    // paddingHorizontal: 8,
    // paddingHorizontal: "2.5%",
    // paddingVertical: 6,
    // paddingVertical: "3%",
  },
  hospital: {
    textAlign: "left",
    marginRight: "63%",
    marginTop: 25,
    color: "rgba(86, 154, 255, 0.52)",
  },
  hospitalInput: {
    position: "absolute",
    ...Platform.select({
      android: {
        marginTop: verticalScale(338),
      },
      ios: {
        marginTop: verticalScale(330),
      },
    }),
    // height: verticalScale(38.35),
    width: 265,
    marginBottom: verticalScale(6.5),
    borderColor: "#3987FD",
    borderWidth: 1,
    borderRadius: 8,
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
    zIndex: -1, // ให้ pseudo-element อยู่ต่ำกว่า TextInput
  },
  TextInput2: {
    // marginTop: "8%",
    marginTop: verticalScale(25.5),
    // marginTop: 26.5,
    height: verticalScale(38.35),
    // height: 40,
    // height: "4.75%",
    // width: "80%",
    // width: horizontalScale(255),
    width: 265,
    // marginBottom: "2%",
    marginBottom: verticalScale(6.6),
    // marginBottom: 6.7,
    borderColor: "#569AFF",
    borderBottomWidth: 1,
    // paddingHorizontal: 8,
    // paddingHorizontal: horizontalScale(7.9),
    // paddingHorizontal: "2.5%",
    // paddingVertical: 6,
  },
  eyeI: {
    // position: "absolute",
    // marginLeft: "70%",
    marginLeft: 232,
    // marginTop: "-12%",
    // marginTop: verticalScale(-38.5),
    marginTop: -36,
    zIndex: 2,
  },
  hyper: {
    fontSize: moderateScale(12.6),
    // fontSize: 13,
    color: "#569AFF",
    marginTop: "0%",
    marginLeft: "55%",
    fontWeight: "bold",
  },

  loginb: {
    marginTop: verticalScale(16),
    // marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(10.6),
    // paddingVertical: 11,
    paddingHorizontal: horizontalScale(30),
    // paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#569AFF",
    // width: horizontalScale(191),
    // width: 199,
    width: "60%",
  },
  text: {
    fontSize: moderateScale(14.7),
    // fontSize: 15,
    lineHeight: verticalScale(20),
    // lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  n: {
    fontSize: moderateScale(12.4),
    // fontSize: 13,
    color: "black",
    marginLeft: "3%",
    fontWeight: "bold",
  },
  icon: {
    // width: horizontalScale(48),
    width: 50,
    // height: horizontalScale(48),
    height: 50,
    alignItems: "center",
    margin: verticalScale(22.4),
    // margin: "7%",
    resizeMode: "contain",
  },
  link: {
    backgroundColor: "white",
    paddingHorizontal: "1.5%",
    paddingVertical: 8,
    zIndex: 5,
  },
  list: {
    ...Platform.select({
      android: {
        maxHeight: 120,
      },
      ios: {
        maxHeight: 130,
      },
    }),
    position: "absolute",
    width: "77.5%",

    marginTop: "112.5%",
    zIndex: 1,
  },
});
