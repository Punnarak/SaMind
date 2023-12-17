import React, { useEffect, useState } from "react";
import { Svg, Circle, Path } from "react-native-svg";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      mood: 3.0,
    },
  ]);
  const [moodCard, setMoodCard] = useState("cheerful");
  useEffect(() => {
    console.log("Dashboard Screen");
  }, []);

  const setMood = (mood) => {
    if (mood >= 0 && mood <= 1) {
      setMoodCard("terrible");
    } else if (mood >= 2 && mood < 3) {
      setMoodCard("bad");
    } else if (mood >= 3 && mood < 4) {
      setMoodCard("soso");
    } else if (mood >= 4 && mood < 5) {
      setMoodCard("happy");
    } else if (mood > 4 && mood <= 5) {
      setMoodCard("cheerful");
    }
  };
  return (
    <ImageBackground
      source={require("../assets/Game.png")}
      style={{ alignItems: "center", flex: 1, postition: "absolute" }}
    >
      <View
        style={{
          flexDirection: "row",
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

      <Text style={styles.header}>Dashboard</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.con1}>Average Mood</Text>
        <Text style={styles.con2}>from mood tracker</Text>
      </View>
      {moodCard == "cheerful" && (
        <View style={styles.cheerfulbox}>
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 60,
              height: 50,
              zIndex: 5,
              resizeMode: "contain",
              marginTop: "-2%",
              marginLeft: "13%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 15,
              height: 1,
              zIndex: 6,
              resizeMode: "contain",
              marginTop: "21%",
              marginLeft: "23%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 70,
              height: 70,
              zIndex: 4,
              resizeMode: "contain",
              marginTop: "9%",
              marginLeft: "0%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              zIndex: 4,
              resizeMode: "contain",
              marginTop: "27.4%",
              marginLeft: "17%",
            }}
          />
          <Image
            source={require("../assets/m2.png")}
            style={{
              width: 50,
              height: 50,
              zIndex: 5,
              backgroundColor: "#FFD700",
              tintColor: "#000000",
              borderRadius: 30,
              marginTop: "15%",
              marginLeft: "13%",
            }}
          />
          <View
            style={{
              flexDirection: "column",
              marginTop: "-20%",
              marginLeft: "40%",
              zIndex: 7,
            }}
          >
            <Text
              style={{ fontSize: 14, color: "#FBC02D", fontWeight: "bold" }}
            >
              Cheerful
            </Text>
            <Text style={{ fontSize: 10, color: "#FBC02D", marginTop: "5%" }}>
              Be happy for this moment.{"\n"}This moment is your life, and{" "}
              {"\n"}
              SaMind is also happy for you.
            </Text>
            <Text style={{ fontSize: 8, color: "#FBC02D", marginTop: "12%" }}>
              AVG between 20 Sep 2023 - 26 Sep 2023
            </Text>
          </View>
        </View>
      )}

      {moodCard == "happy" && (
        <View style={styles.happybox}>
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 60,
              height: 50,
              zIndex: 5,
              resizeMode: "contain",
              marginTop: "-2%",
              marginLeft: "13%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 15,
              height: 1,
              zIndex: 6,
              resizeMode: "contain",
              marginTop: "21%",
              marginLeft: "23%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 70,
              height: 70,
              zIndex: 4,
              resizeMode: "contain",
              marginTop: "9%",
              marginLeft: "0%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              zIndex: 4,
              resizeMode: "contain",
              marginTop: "27.4%",
              marginLeft: "17%",
            }}
          />
          <Image
            source={require("../assets/m2.png")}
            style={{
              width: 50,
              height: 50,
              zIndex: 5,
              backgroundColor: "#FFB06A",
              tintColor: "#000000",
              borderRadius: 30,
              marginTop: "15%",
              marginLeft: "13%",
            }}
          />
          <View
            style={{
              flexDirection: "column",
              marginTop: "-20%",
              marginLeft: "40%",
              zIndex: 7,
            }}
          >
            <Text
              style={{ fontSize: 14, color: "#E9967A", fontWeight: "bold" }}
            >
              Happy
            </Text>
            <Text style={{ fontSize: 10, color: "#E9967A", marginTop: "5%" }}>
              Be happy for this moment.{"\n"}This moment is your life, and{" "}
              {"\n"}
              SaMind is also happy for you.
            </Text>
            <Text style={{ fontSize: 8, color: "#E9967A", marginTop: "12%" }}>
              AVG between 20 Sep 2023 - 26 Sep 2023
            </Text>
          </View>
        </View>
      )}

      {moodCard == "soso" && (
        <View style={styles.sosobox}>
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 60,
              height: 50,
              zIndex: 5,
              resizeMode: "contain",
              marginTop: "-2%",
              marginLeft: "13%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 15,
              height: 1,
              zIndex: 6,
              resizeMode: "contain",
              marginTop: "21%",
              marginLeft: "23%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 70,
              height: 70,
              zIndex: 4,
              resizeMode: "contain",
              marginTop: "9%",
              marginLeft: "0%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              zIndex: 4,
              resizeMode: "contain",
              marginTop: "27.4%",
              marginLeft: "17%",
            }}
          />
          <Image
            source={require("../assets/m2.png")}
            style={{
              width: 50,
              height: 50,
              zIndex: 5,
              backgroundColor: "#C1EAC1",
              tintColor: "#000000",
              borderRadius: 30,
              marginTop: "15%",
              marginLeft: "13%",
            }}
          />
          <View
            style={{
              flexDirection: "column",
              marginTop: "-20%",
              marginLeft: "40%",
              zIndex: 7,
            }}
          >
            <Text
              style={{ fontSize: 14, color: "#808000", fontWeight: "bold" }}
            >
              So so
            </Text>
            <Text style={{ fontSize: 10, color: "#808000", marginTop: "5%" }}>
              Be happy for this moment.{"\n"}This moment is your life, and{" "}
              {"\n"}
              SaMind is also happy for you.
            </Text>
            <Text style={{ fontSize: 8, color: "#808000", marginTop: "12%" }}>
              AVG between 20 Sep 2023 - 26 Sep 2023
            </Text>
          </View>
        </View>
      )}

      {moodCard == "bad" && (
        <View style={styles.badbox}>
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 60,
              height: 50,
              zIndex: 5,
              resizeMode: "contain",
              marginTop: "-2%",
              marginLeft: "13%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 15,
              height: 1,
              zIndex: 6,
              resizeMode: "contain",
              marginTop: "21%",
              marginLeft: "23%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 70,
              height: 70,
              zIndex: 4,
              resizeMode: "contain",
              marginTop: "9%",
              marginLeft: "0%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              zIndex: 4,
              resizeMode: "contain",
              marginTop: "27.4%",
              marginLeft: "17%",
            }}
          />
          <Image
            source={require("../assets/m2.png")}
            style={{
              width: 50,
              height: 50,
              zIndex: 5,
              backgroundColor: "#e8e8e8",
              tintColor: "#000000",
              borderRadius: 30,
              marginTop: "15%",
              marginLeft: "13%",
            }}
          />
          <View
            style={{
              flexDirection: "column",
              marginTop: "-20%",
              marginLeft: "40%",
              zIndex: 7,
            }}
          >
            <Text
              style={{ fontSize: 14, color: "#696969", fontWeight: "bold" }}
            >
              Bad
            </Text>
            <Text style={{ fontSize: 10, color: "#696969", marginTop: "5%" }}>
              Be happy for this moment.{"\n"}This moment is your life, and{" "}
              {"\n"}
              SaMind is also happy for you.
            </Text>
            <Text style={{ fontSize: 8, color: "#696969", marginTop: "12%" }}>
              AVG between 20 Sep 2023 - 26 Sep 2023
            </Text>
          </View>
        </View>
      )}

      {moodCard == "terrible" && (
        <View style={styles.terriblebox}>
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 60,
              height: 50,
              zIndex: 5,
              resizeMode: "contain",
              marginTop: "-2%",
              marginLeft: "13%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 15,
              height: 1,
              zIndex: 6,
              resizeMode: "contain",
              marginTop: "21%",
              marginLeft: "23%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 70,
              height: 70,
              zIndex: 4,
              resizeMode: "contain",
              marginTop: "9%",
              marginLeft: "0%",
            }}
          />
          <Image
            source={require("../assets/cl.png")}
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              zIndex: 4,
              resizeMode: "contain",
              marginTop: "27.4%",
              marginLeft: "17%",
            }}
          />
          <Image
            source={require("../assets/m2.png")}
            style={{
              width: 50,
              height: 50,
              zIndex: 5,
              backgroundColor: "#FFC0CB",
              tintColor: "#000000",
              borderRadius: 30,
              marginTop: "15%",
              marginLeft: "13%",
            }}
          />
          <View
            style={{
              flexDirection: "column",
              marginTop: "-20%",
              marginLeft: "40%",
              zIndex: 7,
            }}
          >
            <Text
              style={{ fontSize: 14, color: "#800020", fontWeight: "bold" }}
            >
              Terrible
            </Text>
            <Text style={{ fontSize: 10, color: "#800020", marginTop: "5%" }}>
              Be happy for this moment.{"\n"}This moment is your life, and{" "}
              {"\n"}
              SaMind is also happy for you.
            </Text>
            <Text style={{ fontSize: 8, color: "#800020", marginTop: "12%" }}>
              AVG between 20 Sep 2023 - 26 Sep 2023
            </Text>
          </View>
        </View>
      )}

      <View style={styles.container2}>
        <View style={styles.qbox}>
          <View style={styles.box}>
            <Text style={styles.wel}>Test History</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4%",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                // alignItems: "center",
                marginTop: "1%",
              }}
            >
              <Text style={styles.q}>แบบทดสอบ 2Q</Text>
              <Text style={styles.d}>ทดสอบเมื่อวันที่ 22 Sep 2023</Text>
            </View>
            <Text style={styles.r}>คุณมีความเสี่ยงที่จะเป็นโรคซึมเศร้า</Text>
          </View>
          <View
            style={{
              marginTop: "3%",
              paddingHorizontal: "3%",
              height: 1,
              backgroundColor: "#F9E5DB",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4%",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                // alignItems: "center",
                marginTop: "1%",
              }}
            >
              <Text style={styles.q}>แบบทดสอบ PHQ9 </Text>
              <Text style={styles.d}>ทดสอบเมื่อวันที่ 26 Sep 2023</Text>
            </View>
            <Text style={styles.r2}>ท่านมีอาการซึมเศร้าระดับปานกลาง</Text>
          </View>
        </View>
        <Text style={styles.title}>อารมณ์ของ Punya จากบทสนทนากับ SaMind</Text>

        <View style={styles.moodavgbox}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Svg
              height="200"
              width="400"
              style={{
                position: "absolute",
                marginLeft: "-10%",
                marginTop: "5%",
              }}
            >
              <Path
                d="M173 173 A50 50 0 0 0 346 167"
                fill="none"
                stroke="#D1C9C9"
                transform="rotate(-90 173 173)"
              />
            </Svg>
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/011/007/145/original/girl-hugs-valentine-s-gift-and-shows-ok-sign-finger-3d-character-illustration-valentine-s-day-celebration-free-png.png",
              }}
              style={{ width: 128, height: 216, marginTop: "-3%" }}
            />
            <View style={styles.happy}>
              <Image
                source={require("../assets/happy.png")}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#99D9A4",
                  borderRadius: 30,
                  resizeMode: "cover",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  position: "absolute",
                  zIndex: -1,
                }}
              >
                <View style={styles.perbox}>
                  <Text style={styles.moodN}>Positive</Text>
                  <Text style={styles.moodper}>40%</Text>
                </View>
              </View>
            </View>

            <View style={styles.sad}>
              <Image
                source={require("../assets/sad.png")}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#D3D3D3",
                  borderRadius: 30,
                  resizeMode: "cover",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  position: "absolute",
                  marginTop: "6%",
                  zIndex: -1,
                }}
              >
                <View style={styles.perbox}>
                  <Text style={styles.moodN}>Neutral</Text>
                  <Text style={styles.moodper}>40%</Text>
                </View>
              </View>
            </View>

            <View style={styles.angryb}>
              <View style={{ zIndex: 3, marginLeft: "6%", marginTop: "5%" }}>
                <Image
                  source={require("../assets/angry.png")}
                  style={{
                    position: "absolute",
                    width: 50,
                    height: 50,
                    resizeMode: "cover",
                    zIndex: 2,
                    borderRadius: 30,
                  }}
                />
              </View>

              <Svg
                style={{
                  position: "absolute",
                  width: 50,
                  height: 50,
                  resizeMode: "cover",
                  zIndex: 1,
                  left: 0,
                  top: 0,
                }}
                width="50"
                height="50"
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Circle
                  id="Ellipse 101"
                  cx="23"
                  cy="23"
                  r="23"
                  fill="#C0C0C0"
                />
              </Svg>
              <View style={styles.angry}></View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  position: "absolute",
                  marginTop: "0%",
                  zIndex: -1,
                }}
              >
                <View style={styles.perboxa}>
                  <Text style={styles.moodNa}>Negative</Text>
                  <Text style={styles.moodpera}>40%</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.undertag}>
          <Feather
            name="bell"
            style={styles.picul}
            size={25}
            color="#222222"
            onPress={() => navigation.navigate("Notiscreen")}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingVertical: 0,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#25271C",
    // marginTop: "-7%",
    marginTop: -27.5,
  },
  con1: {
    fontSize: 13,
    fontWeight: "bold",
    // letterSpacing: 0.25,
    color: "#3C5A9A",
    // marginTop: "10%",
    marginTop: 39,
    marginRight: "12%",
  },
  con2: {
    fontSize: 13,
    color: "#3C5A9A",
    // marginTop: "10%",
    marginTop: 39,
    marginLeft: "15%",
  },
  cheerfulbox: {
    width: "80%",
    // width: 312,
    height: "17%",
    // height: 144,
    borderWidth: 1,
    backgroundColor: "#FFFF99",
    borderColor: "#FFFF99",
    borderRadius: 16,
    marginTop: "3%",
    marginBottom: "7%",
  },
  happybox: {
    width: "80%",
    // width: 312,
    height: "17%",
    // height: 144,
    borderWidth: 1,
    backgroundColor: "#FFDAB9",
    borderColor: "#ADD8E6",
    borderRadius: 16,
    marginTop: "3%",
    marginBottom: "7%",
  },
  sosobox: {
    width: "80%",
    // width: 312,
    height: "17%",
    // height: 144,
    borderWidth: 1,
    backgroundColor: "#C1D7C5",
    borderColor: "#C1D7C5",
    borderRadius: 16,
    marginTop: "3%",
    marginBottom: "7%",
  },
  badbox: {
    width: "80%",
    // width: 312,
    height: "17%",
    // height: 144,
    borderWidth: 1,
    backgroundColor: "#D3D3D3",
    borderColor: "#D3D3D3",
    borderRadius: 16,
    marginTop: "3%",
    marginBottom: "7%",
  },
  terriblebox: {
    width: "80%",
    // width: 312,
    height: "17%",
    // height: 144,
    borderWidth: 1,
    backgroundColor: "#FFB6C1",
    borderColor: "#FFB6C1",
    borderRadius: 16,
    marginTop: "3%",
    marginBottom: "7%",
  },
  box: {
    borderWidth: 1,
    backgroundColor: "#F9E5DB",
    borderColor: "#F9E5DB",
    borderRadius: 15,
    paddingHorizontal: "35%",
    paddingVertical: "3%",

    marginTop: "-3.2%",
  },
  qbox: {
    marginTop: "5%",
    marginBottom: "4%",
    borderWidth: 1,
    backgroundColor: "#FFF7F3",
    borderColor: "#FFF7F3",
    borderRadius: 15,
    paddingVertical: "3%",
    width: "99.8%",
  },
  wel: {
    fontSize: 15,
    color: "#AF8E7E",
    fontWeight: "bold",
  },
  q: {
    marginLeft: "10%",
    fontSize: 14,
    color: "#AF8E7E",
    fontWeight: "bold",
  },
  d: {
    fontSize: 10,
    color: "#AF8E7E",
    marginLeft: "10%",
  },
  r: {
    marginLeft: "5%",
    fontSize: 10,
    color: "#FE493B",
    fontWeight: "bold",
  },
  r2: {
    marginLeft: "5%",
    fontSize: 10,
    color: "#FACA42",
    fontWeight: "bold",
  },

  title: {
    marginBottom: "4%",
    fontSize: 11,
    color: "black",
    fontWeight: "bold",
  },
  moodavgbox: {
    marginBottom: "1%",
    borderWidth: 1,
    backgroundColor: "#FFF7F3",
    borderColor: "#FFF7F3",
    borderRadius: 15,
    width: "99.8%",
  },
  moodN: {
    marginLeft: "5%",
    marginBottom: "4%",
    fontSize: 8,
    color: "black",
    fontWeight: "bold",
  },
  moodNa: {
    marginLeft: "10%",
    marginBottom: "4%",
    fontSize: 8,
    color: "black",
    fontWeight: "bold",
  },
  perbox: {
    alignItems: "center",
    marginLeft: "47%",
    marginTop: "10%",
    borderWidth: 1,
    paddingVertical: "2%",
    backgroundColor: "#F9E5DB",
    borderColor: "#F9E5DB",
    borderRadius: 10,
    width: "100%",
    zIndex: -1,
  },
  perboxa: {
    alignItems: "center",
    marginLeft: "60%",
    marginTop: "25%",
    borderWidth: 1,
    paddingVertical: "2%",
    backgroundColor: "#F9E5DB",
    borderColor: "#F9E5DB",
    borderRadius: 10,
    width: "150%",
    zIndex: -4,
  },
  moodpera: {
    marginLeft: "10%",
    marginBottom: "4%",
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
  },
  moodper: {
    marginLeft: "5%",
    marginBottom: "4%",
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
  },
  happy: {
    marginTop: "3%",
    marginLeft: "10%",
  },
  sad: {
    marginTop: "24%",
    marginLeft: "-2%",
  },
  angry: {
    marginTop: "2%",
    marginLeft: "5%",
  },
  angryb: {
    marginTop: "45%",
    marginLeft: "-28%",
  },
  undertag: {
    width: "120%",
    height: 69.8,
    marginTop: "2%",
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    flexDirection: "row",
    alignItems: "center",
  },
  picur: {
    marginLeft: "70%",
  },
  picul: {
    marginLeft: "9%",
  },
});
