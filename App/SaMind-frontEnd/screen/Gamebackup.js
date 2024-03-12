import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ProgressBarAndroid,
  ImageBackground,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";
import { useFocusEffect } from '@react-navigation/native';
import Voice from '@react-native-voice/voice';

const windowWidth = Dimensions.get("window").width;

const PopcatGame = ({ route }) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const patientId = 333
  const { patientId } = route.params || {};
  const navigation = useNavigation();
  const [popCount, setPopCount] = useState(0);
  const [imageSource, setImageSource] = useState(
    require("../assets/egg1.png") // Initial image
  );
  const [swipeDirection, setSwipeDirection] = useState(null);
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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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
        params: { patient_id: patientId }
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
    // Initialize speech recognition
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      // Cleanup speech recognition
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    if(Voice) { // Check if Voice object is available
      try {
        await Voice.start('th-TH');
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    } else {
      console.error('Voice object is not available.');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  };

  const onSpeechResults = (event) => {
    // Get the recognized text
    const text = event.value[0];
    console.log('Recognized text:', text);
    setSpokenText(text);

    // Send the recognized text to the sentiment analysis API
    sendToMoodTracker(text);
  };

  const sendToMoodTracker = async (text) => {
    try {
      const response = await axios.post("https://api-inference.huggingface.co/models/woranit/samind-sentiment", { "inputs": text }, {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      console.log('Mood:', result);
    } catch (error) {
      console.error('Error tracking mood:', error);
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
    if (popCount < 50) {
      setImageSource(popCount % 2 === 1 ? require("../assets/egg11.png") : require("../assets/egg12.png"));
    } else if (popCount >= 50 && popCount < 125) {
      setImageSource(popCount % 2 === 1 ? require("../assets/egg21.png") : require("../assets/egg22.png"));
    } else if (popCount >= 125 && popCount < 200) {
      setImageSource(popCount % 2 === 1 ? require("../assets/egg31.png") : require("../assets/egg32.png"));
    } else {
      setImageSource(require("../assets/monster1.png"));
    }
  }, [popCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      // if (progress2 <= 0 && progress3 <= 0) {
      //   setProgress1((prevProgress) => Math.max(0, prevProgress - 0.001));
      // } else if (progress2 >= 0.5 && progress3 >= 0.5) {
      //   setProgress1((prevProgress) => Math.min(1, prevProgress + 0.01));
      // }

      // setProgress2((prevProgress) => {
      //   if (popCount >= 200) {
      //     return Math.max(0, prevProgress - 0.001);
      //   } else {
      //     return 1;
      //   }
      // });
      if (sleepMode)
      // {
      //   setProgress3((prevProgress) => {
      //     if (popCount >= 200) {
      //       return Math.max(0, prevProgress - 0.0001);
      //     } else {
      //       return 1;
      //     }
      //   });
      // } 
      // else
      {
        // Increase the stamina bar continuously when in sleep mode
        setProgress3((prevProgress) => Math.min(1, prevProgress + 0.001));
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

    // Call the update function when navigating away from the page
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      updateGameData();
    });

    // Clean up the listener
    return unsubscribe;
  }, [navigation, patientId, popCount, progress1, progress2, progress3, appleCount, fishCount, riceCount, meatCount, sleepMode]);

  // useEffect(() => {
  //   const interval1 = setInterval(() => {
  //     setProgress1((prevProgress) => {
  //       if (popCount >= 20) {
  //         return Math.max(0, prevProgress - 0.01);
  //       } else {
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

  const handlePressIn = () => {
    if (popCount < 50) {
      setImageSource(
        popCount % 2 === 1
          ? require("../assets/egg11.png")
          : require("../assets/egg12.png")
      );
    }
    else if (popCount >= 50 && popCount < 125) {
      setImageSource(
        popCount % 2 === 1
          ? require("../assets/egg21.png")
          : require("../assets/egg22.png")
      );
    }
    else if (popCount >= 125 && popCount < 200) {
      setImageSource(
        popCount % 2 === 1
          ? require("../assets/egg31.png")
          : require("../assets/egg32.png")
      );
    }
    else {
      setImageSource(require("../assets/monster1.png"));
    }
  };

  const handlePressOut = () => {
    if (popCount < 50) {
      setImageSource(require("../assets/egg1.png"));
    }
    else if (popCount >= 50 && popCount < 125) {
      setImageSource(require("../assets/egg2.png"));
    }
    else if (popCount >= 125 && popCount < 200) {
      setImageSource(require("../assets/egg3.png"));
    }
    else {
      setImageSource(require("../assets/monster.png"));
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
    setImageSource(require("../assets/egg1.png"));
  };

  const enterSleepMode = () => {
    setSleepMode(true);
    // Increase the stamina bar
    setProgress3((prevProgress) => Math.min(1, prevProgress + 0.1));
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
      <View style={styles.container}>
        {sleepMode && (
          <View style={styles.sleepModeOverlay}>
            <Text style={styles.sleepModeText}>Sleep Mode</Text>
          </View>
        )}
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Image source={imageSource} style={styles.popcatImage} />
        </TouchableWithoutFeedback>
        <Text style={styles.countText}>{popCount}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { width: (windowWidth / 2) - 25 }]}
            onPress={startListening}
            disabled={isListening}
          >
            <Text style={styles.buttonText}>Start Listening</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { width: (windowWidth / 2) - 25 }]}
            onPress={stopListening}
            disabled={!isListening}
          >
            <Text style={styles.buttonText}>Stop Listening</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressBars}>
          <View style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: '5%', marginRight: '5%', paddingHorizontal: 10 }}>
            <Text style={[styles.progressBarLabel, { marginRight: 10 }]}>Health</Text>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              progress={progress1}
              indeterminate={false}
              style={{ flex: 1, }}
              color="red"
              progressBarStyle={{ height: 20 }}
            />
          </View>
          <View style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: '5%', marginRight: '5%', paddingHorizontal: 10 }}>
            <Text style={[styles.progressBarLabel, { marginRight: 10 }]}>Hungry</Text>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              progress={progress2}
              indeterminate={false}
              style={{ flex: 1 }}
              color="orange"
              progressBarStyle={{ height: 20 }}
            />
          </View>
          <View style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: '5%', marginRight: '5%', paddingHorizontal: 10 }}>
            <Text style={styles.progressBarLabel}>Stamina</Text>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              progress={progress3}
              indeterminate={false}
              style={{ flex: 1 }}
              color="grey"
              progressBarStyle={{ height: 20 }}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, { width: (windowWidth / 2) - 25 }]}
              onPress={restartGame}
              disabled={sleepMode}
            >
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: (windowWidth / 2) - 25,
                  backgroundColor: popCount < 200 || sleepMode ? "#9e9e9e" : "#2196f3",
                },
              ]}
              onPress={popCount <= 0 ? null : () => handleEatingButtonPress()}
              disabled={popCount <= 0 || sleepMode}
            >
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
                </TouchableWithoutFeedback>
                {/* </ImageBackground> */}
              </View>
            </Modal>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: (windowWidth / 2) - 25,
                  backgroundColor: popCount < 200 || sleepMode || progress3 < 0.15 ? "#9e9e9e" : "#2196f3",
                },
              ]}
              onPress={popCount <= 0 ? null : () => navigation.navigate("Game4", { patientId })}
              disabled={popCount <= 0 || sleepMode || progress3 < 0.15 || progress2 < 0.15}
            >
              <Text style={styles.buttonText}>Play Game</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, { width: (windowWidth / 2) - 25 }]}
              onPress={() => navigation.navigate("Homescreen", { patientId })}
            // disabled={sleepMode}
            >
              <Text style={styles.buttonText}>Quit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: (windowWidth / 2) - 25,
                  backgroundColor: popCount < 200 || sleepMode || progress3 < 0.10 || progress2 < 0.10 ? "#9e9e9e" : "#2196f3",
                },
              ]}
              onPress={popCount <= 0 ? null : () => navigation.navigate("Phq9gametestscreen", { patientId })}
              disabled={popCount <= 0 || sleepMode || progress3 < 0.10 || progress2 < 0.10}
            >
              <Text style={styles.buttonText}>Study</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: (windowWidth / 2) - 25,
                  backgroundColor: popCount < 200 ? "#9e9e9e" : "#2196f3",
                },
              ]}
              onPress={handleGame4Press}
              disabled={popCount <= 0}
            >
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
    marginTop: 150,
    width: 200,
    height: 200,
    marginBottom: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  modalButton: {
    backgroundColor: "#2196f3",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginBottom: 10,
  },
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
});

export default PopcatGame;
