import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  // ProgressBarAndroid,
  ImageBackground,
  Modal,
} from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { useNavigation } from "@react-navigation/native";
import { axios, axiospython } from "./axios.js";
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import Svg, { Rect, Path } from "react-native-svg";
import { Icon } from 'react-native-elements';

const windowWidth = Dimensions.get("window").width;

async function query(data) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/woranit/samind-sentiment",
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return result
  }
}

const PopcatGame = ({ route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  // const patientId = 333
  const [popCount, setPopCount] = useState(0);
  const { patientId, clickCount } = route.params || {};
  // const { patientId } = route.params || {};
  const navigation = useNavigation();
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [isLoadingSound, setIsLoadingSound] = useState(false);

  const loadingData = () => {
    setIsLoadingSound(!isLoadingSound);
    // console.log("kao ", isLoadingSound)
  };

  useEffect(() => {
    setPopCount(clickCount);
  }, [clickCount]);

  const updateLabel = async (patientId, maxLabel) => {
    try {
      // Make a request to your API to update the patient's label
      const response = await axios.put("/update_patient_label", {
        patient_id: patientId,
        max_label: maxLabel,
      });

      if (response.status === 200) {
        console.log("Label updated successfully emotion is ", maxLabel);
        // Now that label is updated, perform further actions if needed
      } else {
        console.error("Failed to update label:", response.status);
        // Handle error accordingly
      }
    } catch (error) {
      console.error("Error updating label:", error);
      // Handle error accordingly
    }
  };

  const [imageSource, setImageSource] = useState(
    require("../assets/egg1.png") // Initial image
  );

  const [progress1, setProgress1] = useState(1);
  const [progress2, setProgress2] = useState(1);
  const [progress3, setProgress3] = useState(1);
  const [sleepMode, setSleepMode] = useState(false);

  const [appleCount, setAppleCount] = useState(3);
  const [fishCount, setFishCount] = useState(3);
  const [riceCount, setRiceCount] = useState(3);
  const [meatCount, setMeatCount] = useState(3);

  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [sentiment, setSentiment] = useState(null);

  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState(null);
  const [transcript, setTranscript] = useState("");

  const calculateLevelAndProgress = (popCount) => {
    // Define your thresholds
    const thresholds = [0, 200, 500, 1000];
    let currentLevel = 0;
    let prevThreshold = 0;
    let nextThreshold = thresholds[0];
    
    // Find the current level and its thresholds
    for (let i = 0; i < thresholds.length; i++) {
      if (popCount >= thresholds[i]) {
        currentLevel = i + 1;
        prevThreshold = thresholds[i];
        nextThreshold = thresholds[i + 1] || thresholds[thresholds.length - 1];
      } else {
        break;
      }
    }
    
    // Calculate the progress within the current level
    let levelProgress = 0; // Initialize to 0
if (nextThreshold !== prevThreshold) {
  levelProgress = (popCount - prevThreshold) / (nextThreshold - prevThreshold);
}

    levelProgress = Math.max(0, Math.min(levelProgress, 1));
    
    return { currentLevel, levelProgress };
  };
  

  const { currentLevel, levelProgress  } = calculateLevelAndProgress(popCount);


  useEffect(() => {
    // Get recording permission upon first render
    async function getPermission() {
      try {
        const permission = await Audio.requestPermissionsAsync();
        console.log("Permission Granted: " + permission.granted);
        setAudioPermission(permission.granted);
      } catch (error) {
        console.log(error);
      }
    }

    // Call function to get recording permission
    getPermission();
    // Cleanup upon unmounting
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      // Needed for iOS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();
      console.log("Starting Recording");
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("recording");
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

  async function stopRecording() {
    try {
      if (recordingStatus === "recording") {
        console.log("Stopping Recording");
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();
        console.log("Recording URI:", recordingUri);
        await loadingData();
        console.log("kao ", isLoadingSound)
        // Call speech to text API after recording stops
        await convertSpeechToText(recordingUri);
        // Reset states
        setRecording(null);
        setRecordingStatus("stopped");
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  async function convertSpeechToText(audioPath) {
    try {
      const fileType = "audio/3gpp";
      console.log("Audio file path:", audioPath);
      const formData = {
        file: audioPath,
      };
      console.log("param", formData);

      let response = "";
      let responseText = "";
      try {
        response = await FileSystem.uploadAsync(
          "http://192.168.1.101:4343/speech",
          audioPath,
          {
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: "file", // Must match the field expected by your server
          }
        );
        console.log("Upload result:", response);
      } catch (e) {
        console.error("Upload error:", e);
      }
      console.log("response", response.body);
      setTranscript(response.body);
      // console.log("word : ", transcript);
      responseText = await performSentimentAnalysis(response.body);
    } catch (error) {
      console.error("Failed to convert speech to text:", error);
      Alert.alert("Error", "Failed to convert speech to text");
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      await stopRecording(recording.getURI());
      // console.log(appleCount,meatCount,riceCount,fishCount);
    } else {
      await startRecording();
    }
  }

  async function performSentimentAnalysis(text) {
    try {
      console.log("inputtext", text);
      const sentimentResult = await query({ inputs: text });
      console.log("try", sentimentResult);
      let maxScore = -1;
      let maxLabel = null;
      sentimentResult[0].forEach((result) => {
        if (result.score > maxScore) {
          maxScore = result.score;
          maxLabel = result.label;
        }
      });

      const labelMeanings = {
        LABEL_0: "sad",
        LABEL_1: "happy",
        LABEL_2: "normal",
      };

      console.log(labelMeanings[maxLabel]);
      await updateLabel(patientId, maxLabel);

      if (maxLabel === "LABEL_1") {
        const randomFood = Math.floor(Math.random() * 4); // Generate a random number between 0 and 3
        switch (randomFood) {
          case 0:
            setAppleCount((prevCount) => prevCount + 1);
            alert("You got an Apple!");
            break;
          case 1:
            setMeatCount((prevCount) => prevCount + 1);
            alert("You got an Meat!");
            break;
          case 2:
            setRiceCount((prevCount) => prevCount + 1);
            alert("You got an Rice!");
            break;
          case 3:
            setFishCount((prevCount) => prevCount + 1);
            alert("You got an Fish!");
            break;
          default:
            break;
        }
      }
      else{
        alert("Speak Someting better <3!");
      }
      setIsLoadingSound(false)
      return labelMeanings[maxLabel];
    } catch (error) {
      setIsLoadingSound(false)
      await updateLabel(patientId, "LABEL_2")
      alert("Speak Someting better <3!");
      return "normal";
    }
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
    setButtonVisible(!isButtonVisible);
    console.log(isInfoVisible);
  };

  const handleEatingButtonPress = () => {
    toggleModal();
  };

  const increaseHungryBar = (value) => {
    const newProgress = progress2 + value;
    setProgress2(Math.min(newProgress, 1));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/game_get_id", {
        params: { patient_id: patientId },
      });
      setGameData(response.data);
      setIsLoading(false);
      if (response.data && response.data.length > 0) {
        const sleepModeStatus = response.data[0].sleep;
        setSleepMode(sleepModeStatus);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [patientId]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    if (gameData && gameData.length > 0) {
      const parsedHealthBar = parseFloat(gameData[0].health_bar) / 100;
      const parsedHungryBar = parseFloat(gameData[0].hungry_bar) / 100;
      const parsedStaminaBar = parseFloat(gameData[0].stamina_bar) / 100;
      const parsedClickCount = parseInt(gameData[0].click_count);
      const parsedfish = parseInt(gameData[0].fish);
      const parsedrice = parseInt(gameData[0].rice);
      const parsedmeat = parseInt(gameData[0].meat);
      const parsedapple = parseInt(gameData[0].apple);

      setProgress1(parsedHealthBar);
      setProgress2(parsedHungryBar);
      setProgress3(parsedStaminaBar);
      setPopCount(parsedClickCount);
      setFishCount(parsedfish);
      setAppleCount(parsedapple);
      setMeatCount(parsedmeat);
      setRiceCount(parsedrice);
    }
  }, [gameData]);

  useEffect(() => {
    if (sleepMode) {
      setImageSource(require("../assets/hide.gif"));
    } else {
      if (popCount < 50) {
        setImageSource(
          popCount % 2 === 1
            ? require("../assets/egg11.png")
            : require("../assets/egg12.png")
        );
      } else if (popCount >= 50 && popCount < 125) {
        setImageSource(
          popCount % 2 === 1
            ? require("../assets/egg21.png")
            : require("../assets/egg22.png")
        );
      } else if (popCount >= 125 && popCount < 200) {
        setImageSource(
          popCount % 2 === 1
            ? require("../assets/egg31.png")
            : require("../assets/egg32.png")
        );
      } else if (popCount >= 200 && popCount < 500) {
        setImageSource(require("../assets/monster/pigidle.gif"));
      } else if (popCount >= 500 && popCount < 1000) {
        setImageSource(require("../assets/monster/penguinidle.gif"));
      } else setImageSource(require("../assets/monster/dogidle.gif"));
    }
  }, [popCount, sleepMode]);

  useEffect(() => {
    if (progress1 === 0) {
      setImageSource(require("../assets/grave.gif"));
    }
  }, [progress1]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress2 <= 0.3 || progress3 <= 0.3) {
        setProgress1((prevProgress) => Math.max(0, prevProgress - 0.0001));
      } else if (progress2 >= 0.5 && progress3 >= 0.5) {
        setProgress1((prevProgress) => Math.min(1, prevProgress + 0.001));
      }

      setProgress2((prevProgress) => {
        if (popCount >= 200) {
          return Math.max(0, prevProgress - 0.0001);
        } else {
          return 1;
        }
      });
      if (!sleepMode) {
        {
          setProgress3((prevProgress) => {
            if (popCount >= 200) {
              return Math.max(0, prevProgress - 0.0001);
            } else {
              return 1;
            }
          })
        }
        // elses
        // Increase the stamina bar continuously when in sleep mode
        // setProgress3((prevProgress) => Math.min(1, prevProgress + 0.001));
      }
      else 
      {
        setProgress3((prevProgress) => {
          if (popCount >= 200) {
            return Math.min(1, prevProgress + 0.001);
          } else {
            return 1;
          }
        })
      }
    }, 100);

    return () => clearInterval(interval);
  }, [popCount, sleepMode]);
  

  useEffect(() => {
    // Function to update data when navigating away from the page
    const updateGameData = async () => {
      try {
        const currentTime = new Date();
        await axios.put("/update_patient_data", {
          patient_id: patientId,
          click_count: popCount,
          health_bar: progress1 * 100,
          hungry_bar: progress2 * 100,
          last_visit: currentTime,
          stamina_bar: progress3 * 100,
          apple: appleCount,
          fish: fishCount,
          rice: riceCount,
          meat: meatCount,
          sleep: sleepMode,
        });
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };

    updateGameData();

    // Call the update function when navigating away from the page
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      updateGameData();
    });

    // Clean up the listener
    return unsubscribe;
  }, [
    navigation,
    patientId,
    popCount,
    progress1,
    progress2,
    progress3,
    appleCount,
    fishCount,
    riceCount,
    meatCount,
    sleepMode,
  ]);
// progress1 = health, progress2 = hungry, progress3 = stamina
  // useEffect(() => {
  //   const interval1 = setInterval(() => {
  //     setProgress1((prevProgress) => {
  //       if (popCount >= 20 && progress2<0.3 && progress3<0.3 ) {
  //         return Math.max(0, prevProgress - 0.01);
  //       }
  //       else if(popCount >= 20 && progress2>=0.3 && progress3>=0.3){
  //         return Math.max(0, prevProgress + 0.01);
  //       }
  //        else {
  //         return 1;
  //       }
  //     });
  //   }, 100);

  //   const interval2 = setInterval(() => {
  //     setProgress2((prevProgress) => {
  //       if (popCount >= 20) {
  //         return Math.max(0, prevProgress - 0.01);
  //       } else {
  //         return 1;
  //       }
  //     });
  //   }, 100);

  //   const interval3 = setInterval(() => {
  //     if (!sleepMode)
  //     {
  //       setProgress3((prevProgress) => {
  //         if (popCount >= 20) {
  //           return Math.max(0, prevProgress - 0.01);
  //         } else {
  //           return 1;
  //         }
  //       });
  //     }
  //   }, 100);

  //   // const interval2 = setInterval(() => {
  //   //   setProgress2((prevProgress) => {
  //   //     if (popCount >= 20) {
  //   //       return Math.max(0, prevProgress - (1 / (5 * 60 * 100)));
  //   //     } else {
  //   //       return 1;
  //   //     }
  //   //   });
  //   // }, 1000 * 60 * 5);

  //   // const interval3 = setInterval(() => {
  //   //   setProgress3((prevProgress) => {
  //   //     if (popCount >= 20) {
  //   //       return Math.max(0, prevProgress - (1 / (5 * 60 * 100)));
  //   //     } else {
  //   //       return 1;
  //   //     }
  //   //   });
  //   // }, 1000 * 60 * 5);

  //   return () => {
  //     clearInterval(interval1);
  //     clearInterval(interval2);
  //     clearInterval(interval3);
  //   };
  // }, [popCount]);
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
    if (popCount < 50) {
      setImageSource(
        popCount % 2 === 1
          ? require("../assets/egg11.png")
          : require("../assets/egg12.png")
      );
    } else if (popCount >= 50 && popCount < 125) {
      setImageSource(
        popCount % 2 === 1
          ? require("../assets/egg21.png")
          : require("../assets/egg22.png")
      );
    } else if (popCount >= 125 && popCount < 200) {
      setImageSource(
        popCount % 2 === 1
          ? require("../assets/egg31.png")
          : require("../assets/egg32.png")
      );
    } else if (popCount >= 200 && popCount < 500) {
      setImageSource(require("../assets/monster/pigidle.gif"));
    } else if (popCount >= 500 && popCount < 1000) {
      setImageSource(require("../assets/monster/penguinidle.gif"));
    } else setImageSource(require("../assets/monster/dogidle.gif"));
  };

  const handlePressOut = () => {
    setIsPressed(false);
    if (popCount < 50) {
      setImageSource(require("../assets/egg1.png"));
    } else if (popCount >= 50 && popCount < 125) {
      setImageSource(require("../assets/egg2.png"));
    } else if (popCount >= 125 && popCount < 200) {
      setImageSource(require("../assets/egg3.png"));
    } else if (popCount >= 200 && popCount < 500) {
      setImageSource(require("../assets/monster/pigidle.gif"));
    } else if (popCount >= 500 && popCount < 1000) {
      setImageSource(require("../assets/monster/penguinfight.gif"));
    } else {
      setImageSource(require("../assets/monster/dogfight.gif"));
    }
    setPopCount((prevCount) => prevCount + 1);
  };

  const restartGame = () => {
    setAppleCount(3);
    setFishCount(3);
    setMeatCount(3);
    setRiceCount(3);
    setPopCount(0);
    setProgress1(1);
    setProgress2(1);
    setProgress3(1);
    setSleepMode(false);
    setImageSource(require("../assets/egg1.png"));
  };

  const enterSleepMode = () => {
    setSleepMode(true);
    // Increase the stamina bar
    // setProgress3((prevProgress) => Math.min(1, prevProgress + 0.1));
  };

  const exitSleepMode = () => {
    setSleepMode(false);
  };

  const handleGame4Press = () => {
    if (!sleepMode) {
      enterSleepMode();
    } else {
      exitSleepMode();
    }
  };

  const handleFoodSelection = (foodType) => {
    switch (foodType) {
      case "Apple":
        if (appleCount > 0) {
          setPopCount((prevCount) => prevCount + 10);
          setAppleCount((prevCount) => prevCount - 1);
          increaseHungryBar(0.1);
          // if (appleCount === 1) {
          //   setIsModalVisible(false);
          // }
          toggleModal();
        }
        break;
      case "Fish":
        if (fishCount > 0) {
          setPopCount((prevCount) => prevCount + 20);
          setFishCount((prevCount) => prevCount - 1);
          increaseHungryBar(0.2);
          // if (fishCount === 1) {
          //   setIsModalVisible(false);
          // }
          toggleModal();
        }
        break;
      case "Rice":
        if (riceCount > 0) {
          setPopCount((prevCount) => prevCount + 30);
          setRiceCount((prevCount) => prevCount - 1);
          increaseHungryBar(0.3);
          // if (riceCount === 1) {
          //   setIsModalVisible(false);
          // }
          toggleModal();
        }
        break;
      case "Meat":
        if (meatCount > 0) {
          setPopCount((prevCount) => prevCount + 40);
          setMeatCount((prevCount) => prevCount - 1);
          increaseHungryBar(0.4);
          // if (meatCount === 1) {
          //   setIsModalVisible(false);
          // }
          toggleModal();
        }
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/land.png")}
      style={{ width: "100%", resizeMode: "cover", flex: 1 }}
    >
      {/* <View style={styles.backgroundContainer}> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginTop: 54,
        }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="#3987FD"
          onPress={() => navigation.goBack()}
        />
        <TouchableOpacity
              style={[styles.button, { width: windowWidth / 2 - 25 }]}
              onPress={restartGame}
              disabled={sleepMode}
            >
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
        <Feather name={"info"} size={25} color="#569AFF" onPress={toggleInfo} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isInfoVisible}
        onRequestClose={() => {
          toggleInfo();
        }}
      >
        <View style={styles.modalBackground}>
          {/* <ImageBackground
                  source={require("../assets/bedroom.jpg")}
                  style={{ resizeMode: "fit", flex: 1 }}
                > */}
          <TouchableWithoutFeedback onPress={toggleInfo}>
            <View style={styles.centeredView}>
              <View style={styles.modalViewRow}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    // fontSize: 16,
                    marginTop: 35,
                    color: "#569AFF",
                    fontWeight: "bold",
                    marginBottom: 45,
                  }}
                >
                  How To Play
                </Text>

                <Text
                  style={{
                    fontSize: moderateScale(12),
                    // fontSize: 17,
                    textAlign: "center",
                  }}
                >
                  คลิ๊กเพื่อฟักไข่ {"\n"} ไม่ว่าจะกดที่ตัวน้อง ให้อาหารน้อง เล่นเกม หรือเรียนกับน้อง {"\n"}ก็จะมีแต้มให้น้อง level up เพื่อ evolution{" "}
                  {"\n"} ถ้าอาหารหมดเราสามารถหาอาหารได้โดยการพูดสิ่งดี ๆ กับน้องก็จะได้อาหารมา{"\n"}{"\n"}
                </Text>

                <Text
                  style={{
                    fontSize: moderateScale(12),
                    color : "red",
                    // fontSize: 17,
                    textAlign: "center",
                  }}
                >
                 ระวังอย่าให้น้องเลือดหมดหลอดนะ น้องจะเลือดลดถ้าหลอดอาหารกับพลังงานต่ำเกินไป{"\n"}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    color : "green",
                    // fontSize: 17,
                    textAlign: "center",
                  }}
                >
                 แต่ถ้าน้องกินอิ่ม นอนพอ สุขภาพร่างกายเลือดน้องก็จะเพิ่มขึ้นนะ{"\n"}{"\n"}
                </Text>

                <TouchableOpacity
                style={styles.confirmb}
                onPress={toggleInfo}
                isVisible={isInfoVisible}
              >
                <Text style={styles.text}>ไปเลี้ยงน้องกันเลย!!!</Text>
              </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {/* </ImageBackground> */}
        </View>
      </Modal>
      <View style={styles.container}>
        {sleepMode && (
          <View style={styles.sleepModeOverlay}>
            {/* <Text style={styles.sleepModeText}>Sleep Mode</Text> */}
          </View>
        )}
        <View style={styles.progressBars}>
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              marginLeft: "5%",
              marginRight: "5%",
              paddingHorizontal: 10,
            }}
          >
            <Text style={[styles.progressBarLabel, { marginRight: 10 }]}>
              Level {currentLevel}
            </Text>
            <ProgressBar
              styleAttr="Horizontal"
              progress={levelProgress}
              indeterminate={false}
              // style={{ flex: 1 }}
              color="blue"
              progressBarStyle={{ height: 20 }}
            />
          </View>
        </View>
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={progress1 === 0||sleepMode}
        >
          <Image source={imageSource} style={[
      styles.popcatImage,
      isPressed && styles.popcatImagePressed,
    ]} />
        </TouchableWithoutFeedback>
        
        {/* <Text style={styles.countText}>{popCount}</Text> */}
        <TouchableOpacity
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 6,
          paddingHorizontal: 12,
          gap: 8,
          height: 100,
          width: 200,
          backgroundColor: isLoadingSound ? "#888888" : "#1b1b1cde",
          borderRadius: 20,
          cursor: "pointer",
          flexDirection: "row",
          marginBottom: 20,
        }}
        onPress={handleRecordButtonPress}
        disabled={isLoadingSound}
      >
        <Feather
          name="mic"
          size={50}
          color={isLoadingSound ? "#000000" : recording ? "#FF342B" : "#000000"}
        />
        <Svg
          width="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF342B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Rect y="3" x="9" width="6" height="11" rx="3" />
          <Path d="M12 18V21" />
          <Path d="M8 21H16" />
          <Path d="M19 11C19 14.866 15.865 18 12 18C8.134 18 5 14.866 5 11" />
        </Svg>
        <Text
          style={{
            lineHeight: 20,
            fontSize: 17,
            color: isLoadingSound ? "#000000" : recording ? "#FF342B" : "#FFFFFF",
            // fontFamily: "sans-serif",
            letterSpacing: 1,
          }}
        >
          {isLoadingSound ? "Waiting" : recording ? "Recording" : "Record"}
        </Text>
      </TouchableOpacity>
        <View style={styles.progressBars}>
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              marginLeft: "5%",
              marginRight: "5%",
              paddingHorizontal: 10,
            }}
          >
            <Text style={[styles.progressBarLabel, { marginRight: 10 }]}>
              Health
            </Text>
            <ProgressBar
              styleAttr="Horizontal"
              progress={progress1}
              indeterminate={false}
              // style={{ flex: 1 }}
              color="red"
              progressBarStyle={{ height: 20 }}
            />
          </View>
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              marginLeft: "5%",
              marginRight: "5%",
              paddingHorizontal: 10,
            }}
          >
            <Text style={[styles.progressBarLabel, { marginRight: 10 }]}>
              Hungry
            </Text>
            <ProgressBar
              styleAttr="Horizontal"
              progress={progress2}
              indeterminate={false}
              // style={{ flex: 1 }}
              color="orange"
              progressBarStyle={{ height: 20 }}
            />
          </View>
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              marginLeft: "5%",
              marginRight: "5%",
              paddingHorizontal: 10,
            }}
          >
            <Text style={styles.progressBarLabel}>Stamina</Text>
            <ProgressBar
              styleAttr="Horizontal"
              progress={progress3}
              indeterminate={false}
              // style={{ flex: 1 }}
              color="grey"
              progressBarStyle={{ height: 20 }}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.row}>
            {/* <TouchableOpacity
              style={[styles.button, { width: windowWidth / 2 - 25 }]}
              onPress={restartGame}
              disabled={sleepMode}
            >
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: windowWidth / 2 - 25,
                  backgroundColor:
                    popCount < 200 || sleepMode ||progress1 == 0? "#9e9e9e" : "#ff8000",
                },
              ]}
              onPress={popCount <= 0 ? null : () => handleEatingButtonPress()}
              disabled={popCount <= 0 || sleepMode ||progress1 == 0}
            >
              <Icon name="cutlery" type="font-awesome" color="#fff" size={20} marginRight={10} />
              <Text style={styles.buttonText}>Eating</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                toggleModal();
              }}
            >
              <View style={styles.modalBackground}>
                {/* <ImageBackground
                  source={require("../assets/bedroom.jpg")}
                  style={{ resizeMode: "fit", flex: 1 }}
                > */}
                <TouchableWithoutFeedback onPress={toggleModal}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalViewRow}>
                      <View style={styles.foodOptionsRow}>
                        {/* First Row */}
                        <View
                          style={[
                            styles.row,
                            { marginRight: 30, marginBottom: 20 },
                          ]}
                        >
                          <TouchableOpacity
                            style={[
                              styles.modalButton,
                              {
                                backgroundColor:
                                  appleCount <= 0 ? "#9e9e9e" : "#2196f3",
                              },
                            ]}
                            onPress={() => handleFoodSelection("Apple")}
                            disabled={appleCount <= 0}
                          >
                            <Text style={styles.modalButtonText}>Apple</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.modalButton,
                              {
                                backgroundColor:
                                  fishCount <= 0 ? "#9e9e9e" : "#2196f3",
                              },
                            ]}
                            onPress={() => handleFoodSelection("Fish")}
                            disabled={fishCount <= 0}
                          >
                            <Text style={styles.modalButtonText}>Fish</Text>
                          </TouchableOpacity>
                        </View>
                        {/* Second Row */}
                        <View style={[styles.row, { marginLeft: 30 }]}>
                          <TouchableOpacity
                            style={[
                              styles.modalButton,
                              {
                                backgroundColor:
                                  riceCount <= 0 ? "#9e9e9e" : "#2196f3",
                              },
                            ]}
                            onPress={() => handleFoodSelection("Rice")}
                            disabled={riceCount <= 0}
                          >
                            <Text style={styles.modalButtonText}>Rice</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.modalButton,
                              {
                                backgroundColor:
                                  meatCount <= 0 ? "#9e9e9e" : "#2196f3",
                              },
                            ]}
                            onPress={() => handleFoodSelection("Meat")}
                            disabled={meatCount <= 0}
                          >
                            <Text style={styles.modalButtonText}>Meat</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.bottomRightTextContainer}>
                        <Text style={styles.bottomRightText}>
                          *if you don't have any food, please try some good
                          things to talk with the monster.
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                {/* </ImageBackground> */}
              </View>
            </Modal>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: windowWidth / 2 - 25,
                  backgroundColor:
                    popCount < 200 || sleepMode || progress3 < 0.15 ||
                    progress2 < 0.15 ||progress1 == 0
                      ? "#9e9e9e"
                      : "#009999",
                },
              ]}
              onPress={
                popCount <= 0
                  ? null
                  : () => navigation.navigate("Game4", { patientId })
              }
              disabled={
                popCount <= 0 ||
                sleepMode ||
                progress3 < 0.15 ||
                progress2 < 0.15
                ||progress1 == 0
              }
            >
              <Icon name="gamepad" type="font-awesome" color="#fff" size={20} marginRight={10} />
              <Text style={styles.buttonText}>Play Game</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            {/* <TouchableOpacity
              style={[styles.button, { width: windowWidth / 2 - 25 }]}
              onPress={() => navigation.navigate("Homescreen", { patientId })}
              // disabled={sleepMode}
            >
              <Text style={styles.buttonText}>Quit</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: windowWidth / 2 - 25,
                  backgroundColor:
                    popCount < 200 ||
                    sleepMode ||
                    progress3 < 0.1 ||
                    progress2 < 0.1 ||progress1 == 0
                      ? "#9e9e9e"
                      : "#cc00cc",
                },
              ]}
              onPress={
                popCount <= 0
                  ? null
                  : () =>
                      navigation.navigate("Game2", { patientId })
              }
              disabled={
                popCount <= 0 || sleepMode || progress3 < 0.1 || progress2 < 0.1 ||progress1 == 0
              }
            >
              <Icon name="book" type="font-awesome" color="#fff" size={20} marginRight={10}  />
              <Text style={styles.buttonText}>Study</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: windowWidth / 2 - 25,
                  backgroundColor: popCount < 200||progress1 == 0 ? "#9e9e9e" : "#4c0099",
                },
              ]}
              onPress={handleGame4Press}
              disabled={popCount < 200 ||progress1 == 0}
            >
              <Icon name="bed" type="font-awesome" color="#fff" size={20}  marginRight={10} />
              <Text style={styles.buttonText}>Sleep</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </View> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // backgroundContainer: {
  //   marginTop: 150,
  //   flex: 1,
  // },
  container: {
    // marginTop : 150,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popcatImage: {
    marginTop: 20,
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  popcatImagePressed: {
    marginTop: 0,
    width: 250,
    height: 250,
    marginBottom:0,
  },
  countText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
  },
  centeredContent: {
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2196f3",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  progressBars: {
    alignItems: "center",
  },
  progressBarLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  sleepModeOverlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sleepModeText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: "#2196f3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  foodOptionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
  // modalButton: {
  //   backgroundColor: "#2196f3",
  //   borderRadius: 20,
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   elevation: 2,
  //   marginBottom: 10,
  // },
  modalBackground: {
    flex: 1,
  },
  modalViewRow: {
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "90%",
  },
  bottomRightTextContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 300, // Adjust the width as needed
  },
  bottomRightText: {
    color: "red",
    fontStyle: "italic",
    fontSize: 12, // Adjust the font size here
    textAlign: "right", // Align the text to the right
  },
  Modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#3987FD",
    borderWidth: 5,
    borderRadius: 8,
    marginHorizontal: horizontalScale(16.5),
    // marginHorizontal: "5%",
  },
  buttonInfo: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#569AFF",
    width: horizontalScale(177),
    // width: "60%",
    marginBottom: 15,
  },

  buttonGame: {
    position: 'relative',
    width: 150,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#e74c3c',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transitionDuration: '0.2s',
    opacity: 0.8,
    letterSpacing: 1,
    shadowColor: '#c0392b',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 8,
  },
  buttonTextGame: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmb: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#569AFF",
    width: "65%",
    marginBottom: 2,
  },
  text: {
    fontSize: moderateScale(12),
    // fontSize: 15,
    lineHeight: verticalScale(20.2),
    // lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default PopcatGame;
