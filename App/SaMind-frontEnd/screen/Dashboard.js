import React, { useEffect, useState } from "react";
import { Svg, Circle, Path } from "react-native-svg";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Platform,
} from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
// export default function Dashboard() {
export default function Dashboard({ route }) {
  const { patientId } = route.params || {};
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [moodCard, setMoodCard] = useState("no");
  const [color1, setColor1] = useState("green");
  const [color2, setColor2] = useState("green");
  useEffect(() => {
    console.log("Dashboard Screen", patientId);
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
    const param = {
      patient_id: patientId,
    };
    axios
      .post("/dashboard_api", param)
      .then((response) => {
        setData(response.data);
        console.log("data:", response.data);
        setMood(response.data.avgMood);
        if (response.data.hasOwnProperty("historyTest")) {
          if (response.data.hasOwnProperty.hasOwnProperty("type1")) {
            handleColor1(
              response.data.historyTest.type1,
              response.data.historyTest.result1
            );
          }

          if (response.data.historyTest.hasOwnProperty("type2")) {
            handleColor2(
              response.data.historyTest.type2,
              response.data.historyTest.result2
            );
          }
        }
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
      return onFocus
  }, []);

  const setMood = (mood) => {
    mood = parseFloat(mood);
    mood = mood.toFixed(0);
    console.log(mood);
    if (mood == 1) {
      setMoodCard("terrible");
    } else if (mood >= 2 && mood < 3) {
      setMoodCard("bad");
    } else if (mood >= 3 && mood < 4) {
      setMoodCard("soso");
    } else if (mood >= 4 && mood < 5) {
      setMoodCard("happy");
    } else if (mood == 5) {
      setMoodCard("cheerful");
    } else if (mood == 0 || mood === null || mood === undefined) {
      setMoodCard("no");
    }
  };
  const handleColor1 = (type, result) => {
    if (type === "2Q") {
      if (result.includes("ไม่มีแนวโน้ม")) {
        setColor1("green");
      } else if (result == 0) {
        setColor1("red");
      }
    }
    if (type === "PHQ9") {
      if (
        result.includes(
          "ท่านไม่มีอาการซึมเศร้าหรือมีอาการซึมเศร้าในระดับน้อยมาก"
        )
      ) {
        setColor1("#11dd66");
      } else if (result.includes("ท่านมีอาการซึมเศร้าในระดับน้อย")) {
        setColor1("#FFDE59");
      } else if (result.includes("ท่านมีอาการซึมเศร้าในระดับปานกลาง")) {
        setColor1("#FF914D");
      } else if (result.includes("ท่านมีอาการซึมเศร้าในระดับรุนแรง")) {
        setColor1("#FF5757");
      }
    }
  };
  const handleColor2 = (type, result) => {
    if (type === "2Q") {
      if (result.includes("ไม่มีแนวโน้ม")) {
        setColor2("green");
      } else if (result == 0) {
        setColor2("red");
      }
    }
    console.log(result);
  };
  return (
    <ImageBackground
      source={require("../assets/Game.png")}
      style={{ alignItems: "center", flex: 1, postition: "absolute" }}
    >
      <View
        style={{
          ...Platform.select({
            android: { marginTop: 55 },
            ios: { marginTop: 78 },
          }),
          flexDirection: "row",
          // marginTop: "20%",
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
          ...Platform.select({
            android: { marginTop: "-1%" },
            ios: {},
          }),
        }}
      >
        <Text style={styles.con1}>Average Mood</Text>
        <Text style={styles.con2}>from mood tracker</Text>
      </View>
      {moodCard == "cheerful" && (
        <View style={styles.cheerfulbox}>
          <Image
            //บน
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
            // กลาง ขวา
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
            //กลาง ซ้าย
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
            //ล่าง
            source={require("../assets/cl.png")}
            style={{
              // ...Platform.select({
              //   android: { marginTop: "25%" },
              //   ios: { marginTop: "27.4%" },
              // }),
              position: "absolute",
              width: 30,
              height: 30,
              zIndex: 4,
              resizeMode: "contain",
              marginLeft: "17%",
            }}
          />
          <Image
            source={require("../assets/m1.png")}
            style={{
              width: 50,
              height: 50,
              zIndex: 5,
              backgroundColor: "rgba(255, 204, 77, 1)",
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
              style={{ fontSize: 14, color: "#D0A449", fontWeight: "bold" }}
            >
              Cheerful
            </Text>
            <Text style={{ fontSize: 11, color: "#D0A449", marginTop: "5%" }}>
              This joyous feeling is{"\n"}contagious! Who else can we{"\n"}
              share it with to brighten their day?
            </Text>
            <Text
              style={{
                fontSize: 8,
                color: "#D0A449",
                ...Platform.select({
                  android: { marginTop: "8%" },
                  ios: { marginTop: "12%" },
                }),
              }}
            >
              AVG between {data.dateBetween}
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
              ...Platform.select({
                android: { marginTop: "25%" },
                ios: { marginTop: "27.4%" },
              }),
              position: "absolute",
              width: 30,
              height: 30,
              zIndex: 4,
              resizeMode: "contain",
              marginLeft: "17%",
            }}
          />
          <Image
            source={require("../assets/m2.png")}
            style={{
              width: 50,
              height: 50,
              zIndex: 5,
              backgroundColor: "rgba(88, 207, 237, 1)",
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
              style={{
                fontSize: 14,
                color: "rgba(57, 135, 253, 1)",
                fontWeight: "bold",
              }}
            >
              Happy
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: "rgba(57, 135, 253, 1)",
                marginTop: "5%",
              }}
            >
              Be happy for this moment.{"\n"}This moment is your life, and{" "}
              {"\n"}
              SaMind is also happy for you.
            </Text>
            <Text
              style={{
                fontSize: 8,
                color: "rgba(57, 135, 253, 1)",
                // ...Platform.select({
                //   android: { marginTop: "8%" },
                //   ios: { marginTop: "12%" },
                // }),
              }}
            >
              AVG between {data.dateBetween}
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
              ...Platform.select({
                android: { marginTop: "25%" },
                ios: { marginTop: "27.4%" },
              }),
              position: "absolute",
              width: 30,
              height: 30,
              zIndex: 4,
              resizeMode: "contain",
              marginLeft: "17%",
            }}
          />
          <Image
            source={require("../assets/m3.png")}
            style={{
              width: 50,
              height: 50,
              zIndex: 5,
              backgroundColor: "rgba(206, 109, 255, 1)",
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
              style={{
                fontSize: 14,
                color: "rgba(135, 0, 204, 1)",
                fontWeight: "bold",
              }}
            >
              So so
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: "rgba(135, 0, 204, 1)",
                marginTop: "5%",
              }}
            >
              You have a good day and it{"\n"}have noting to bother you, and{" "}
              {"\n"}
              SaMind will make you happier.
            </Text>
            <Text
              style={{
                // ...Platform.select({
                //   android: { marginTop: "8%" },
                //   ios: { marginTop: "12%" },
                // }),
                fontSize: 8,
                color: "rgba(135, 0, 204, 1)",
              }}
            >
              AVG between {data.dateBetween}
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
              // ...Platform.select({
              //   android: { marginTop: "25%" },
              //   ios: { marginTop: "27.4%" },
              // }),
              position: "absolute",
              width: 30,
              height: 30,
              zIndex: 4,
              resizeMode: "contain",
              marginLeft: "17%",
            }}
          />
          <Image
            source={require("../assets/m4.png")}
            style={{
              width: 50,
              height: 50,
              zIndex: 5,
              backgroundColor: "rgba(131, 131, 255, 1)",
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
              style={{
                fontSize: 14,
                color: "rgba(60, 90, 154, 1)",
                fontWeight: "bold",
              }}
            >
              Bad
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: "rgba(60, 90, 154, 1)",
                marginTop: "5%",
              }}
            >
              Don’t be sad for this moment.You{"\n"}can pass through it and meet
              a better thing, and Samind always beside you
            </Text>
            <Text
              style={{
                // ...Platform.select({
                //   android: { marginTop: "8%" },
                //   ios: { marginTop: "5%" },
                // }),
                fontSize: 9,
                color: "rgba(60, 90, 154, 1)",
              }}
            >
              AVG between {data.dateBetween}
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
            //ล่าง
            source={require("../assets/cl.png")}
            style={{
              // ...Platform.select({
              //   android: { marginTop: "25%" },
              //   ios: { marginTop: "27.4%" },
              // }),
              position: "absolute",
              width: 30,
              height: 30,
              zIndex: 4,
              resizeMode: "contain",
              marginLeft: "17%",
            }}
          />
          <Image
            source={require("../assets/m5.png")}
            style={{
              width: 50,
              height: 50,
              zIndex: 5,
              backgroundColor: "rgba(156, 156, 160, 1)",
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
              style={{
                fontSize: 14,
                color: "rgba(37, 39, 28, 1)",
                fontWeight: "bold",
              }}
            >
              Terrible
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: "rgba(37, 39, 28, 1)",
                marginTop: "5%",
              }}
            >
              It's okay to feel sad in this moment.{"\n"}Grief is a natural part
              of life, and {"\n"}
              SaMind is here to listen.
            </Text>
            <Text
              style={{
                // ...Platform.select({
                //   android: { marginTop: "8%" },
                //   ios: {
                //     marginTop: "12%",
                //   },
                // }),
                fontSize: 9,
                color: "rgba(37, 39, 28, 1)",
              }}
            >
              AVG between {data.dateBetween}
            </Text>
          </View>
        </View>
      )}
      {moodCard == "no" && (
        <View style={styles.no}>
          <View
            style={{
              flexDirection: "column",
              marginTop: "18%",
              marginLeft: "35%",
              zIndex: 7,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 11,
                color: "rgba(37, 39, 28, 1)",

                fontWeight: "700",
                ...Platform.select({
                  android: { marginTop: "2%", left: 9 },
                  ios: { marginTop: "4%" },
                }),
              }}
            >
              No Average Mood
            </Text>
          </View>
        </View>
      )}
      <View style={styles.container2}>
        <View
          style={
            data.historyTest && data.historyTest.hasOwnProperty("result2")
              ? [styles.qbox, { paddingBottom: "3%" }]
              : styles.qbox
          }
        >
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
            {data.historyTest && data.historyTest.result1 !== null ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // marginTop: "4%",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    // alignItems: "center",
                    marginTop: "1%",
                  }}
                >
                  <Text style={styles.q}>
                    {data.historyTest && data.historyTest.type1 !== null
                      ? data.historyTest.type1
                      : null}
                  </Text>
                  <Text style={styles.d}>
                    ทดสอบเมื่อวันที่{" "}
                    {data.historyTest && data.historyTest.date1 !== null
                      ? data.historyTest.date1
                      : null}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 10,
                    color: color1,
                    fontWeight: "bold",
                  }}
                >
                  {data.historyTest && data.historyTest.result1 !== null
                    ? data.historyTest.result1
                    : null}
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  ...Platform.select({
                    android: { marginTop: "4%", marginLeft: "41%" },
                    ios: { marginTop: "4%", marginLeft: "41%" },
                  }),
                }}
              >
                No Data
              </Text>
            )}
          </View>
          {data.historyTest && data.historyTest.hasOwnProperty("result2") ? (
            <View
              style={{
                marginTop: "3%",
                paddingHorizontal: "3%",
                height: 1,
                backgroundColor: "#F9E5DB",
              }}
            />
          ) : (
            <View
              style={{
                marginTop: "3%",
                paddingHorizontal: "3%",
                height: 1,
                backgroundColor: "#FFF7F3",
              }}
            />
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4%",
            }}
          >
            {data.historyTest && data.historyTest.hasOwnProperty("result2") ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // marginTop: "4%",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    // alignItems: "center",
                    marginTop: "1%",
                  }}
                >
                  <Text style={styles.q}>
                    {data.historyTest && data.historyTest.type2 !== null
                      ? data.historyTest.type2
                      : null}
                  </Text>
                  <Text style={styles.d}>
                    ทดสอบเมื่อวันที่{" "}
                    {data.historyTest && data.historyTest.date2 !== null
                      ? data.historyTest.date2
                      : null}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 10,
                    color: color2,
                    fontWeight: "bold",
                  }}
                >
                  {data.historyTest && data.historyTest.result2 !== null
                    ? data.historyTest.result2
                    : null}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <Text style={styles.title}>
          อารมณ์ของ {data.name} จากบทสนทนากับ SaMind
        </Text>

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
                  <Text style={styles.moodper}>
                    {data.avatarMoodDetec &&
                    data.avatarMoodDetec.positive !== null
                      ? data.avatarMoodDetec.positive
                      : "0%"}
                  </Text>
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
                  <Text style={styles.moodper}>
                    {data.avatarMoodDetec &&
                    data.avatarMoodDetec.neutral !== null
                      ? data.avatarMoodDetec.neutral
                      : "0%"}
                  </Text>
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
                  <Text style={styles.moodpera}>
                    {data.avatarMoodDetec &&
                    data.avatarMoodDetec.negative !== null
                      ? data.avatarMoodDetec.negative
                      : "0%"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.moodDate}>
            Last talk:
            {data.avatarMoodDetec && data.dateAvatar !== null
              ? data.dateAvatar
              : "No last talk"}
          </Text>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container2: {
    ...Platform.select({
      android: { marginTop: "-1%" },
      ios: {},
    }),
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
    backgroundColor: "#FFF283",
    borderColor: "#FFF283",
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
    backgroundColor: "rgba(147, 233, 255, 1)",
    borderColor: "rgba(147, 233, 255, 1)",
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
    backgroundColor: "rgba(225, 195, 255, 1)",
    borderColor: "rgba(225, 195, 255, 1)",
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
    backgroundColor: "rgba(178, 178, 255, 1)",
    borderColor: "rgba(178, 178, 255, 1)",
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
    backgroundColor: "rgba(175, 175, 214, 1)",
    borderColor: "rgba(175, 175, 214, 1)",
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
    paddingTop: "3%",
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
    // marginLeft: "5%", --> for demo
    fontSize: 10,
    color: "#FE493B",
    fontWeight: "bold",
  },
  r2: {
    // marginLeft: "5%", --> for demo
    fontSize: 10,
    color: "#FACA42",
    fontWeight: "bold",
  },
  title: {
    fontSize: 11,
    color: "black",
    fontWeight: "bold",
    ...Platform.select({
      android: {
        marginBottom: "2%",
      },
      ios: { marginBottom: "4%" },
    }),
  },
  moodavgbox: {
    marginBottom: "1%",
    borderWidth: 1,
    backgroundColor: "#FFF7F3",
    borderColor: "#FFF7F3",
    borderRadius: 15,
    ...Platform.select({
      android: {
        // width: "99.8%",
        width: horizontalScale(320),
      },
      ios: { width: horizontalScale(320) },
    }),
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
  moodDate: {
    ...Platform.select({
      android: {
        left: horizontalScale(150),
      },
      ios: { left: horizontalScale(140) },
    }),
    fontSize: 10,
    color: "gray",
    fontWeight: "bold",
    bottom: 0,
  },
  undertag: {
    ...Platform.select({
      android: {
        bottom: 0,
        position: "absolute",
        marginTop: "-1%",
        elevation: 10,
        shadowColor: "black", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        height: verticalScale(67.8),
        width: horizontalScale(380),
        shadowColor: "rgba(0,0,0, 1)", // IOS
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        // marginTop: "7%",
      },
      ios: {
        marginTop: "3%",
        shadowColor: "rgba(0,0,0, 0.3)",
        bottom: 0,
        position: "absolute",
      },
    }),
    width: "120%",
    height: 69.8,
    backgroundColor: "white",
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
  no: {
    width: "80%",
    // width: 312,
    height: "17%",
    // height: 144,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 16,
    marginTop: "3%",
    marginBottom: "7%",
  },
});
