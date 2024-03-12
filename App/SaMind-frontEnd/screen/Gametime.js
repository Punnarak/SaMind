import React, { useState, useEffect, useCallback } from "react";
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

const windowWidth = Dimensions.get("window").width;

const PopcatGame = ({ route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { patientId } = route.params || {};
  const navigation = useNavigation();
  const [popCount, setPopCount] = useState(0);
  const [imageSource, setImageSource] = useState(
    require("../assets/egg1.png")
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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePressIn = useCallback(() => {
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
  }, [popCount]);

  const handlePressOut = useCallback(() => {
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
  }, [popCount]);

  const throttle = useCallback((callback, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      callback(...args);
    };
  }, []);

//   const updateProgressBars = useCallback(() => {
//     const interval = setInterval(() => {
//         if (progress2 <= 0 && progress3 <= 0) {
//           setProgress1((prevProgress) => Math.max(0, prevProgress - 0.001));
//         } else if (progress2 >= 0.5 && progress3 >= 0.5) {
//           setProgress1((prevProgress) => Math.min(1, prevProgress + 0.01));
//         }
  
//         setProgress2((prevProgress) => {
//           if (popCount >= 200) {
//             return Math.max(0, prevProgress - 0.001);
//           } else {
//             return 1;
//           }
//         });
//         if (!sleepMode) {
//           setProgress3((prevProgress) => {
//             if (popCount >= 200) {
//               return Math.max(0, prevProgress - 0.0001);
//             } else {
//               return 1;
//             }
//           });
//         } else {
//           // Increase the stamina bar continuously when in sleep mode
//           setProgress3((prevProgress) => Math.min(1, prevProgress + 0.001));
//         }
//       }, 100);
  
//       return () => clearInterval(interval);
//   }, [popCount, sleepMode]);

//   useEffect(() => {
//     const throttledUpdate = throttle(updateProgressBars, 100);
//     const intervalId = setInterval(throttledUpdate, 100);
//     return () => clearInterval(intervalId);
//   }, [updateProgressBars]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/game_get_id", {
          params: { patient_id: patientId }
        });
        setGameData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [patientId]);

  useEffect(() => {
    if (gameData && gameData.length > 0) {
      const parsedHealthBar = parseFloat(gameData[0].health_bar) / 100;
      const parsedHungryBar = parseFloat(gameData[0].hungry_bar) / 100;
      const parsedStaminaBar = parseFloat(gameData[0].stamina_bar) / 100;
      const parsedClickCount = parseInt(gameData[0].click_count);

      setProgress1(parsedHealthBar);
      setProgress2(parsedHungryBar);
      setProgress3(parsedStaminaBar);
      setPopCount(parsedClickCount);
    }
  }, [gameData]);

  useEffect(() => {
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
    } else {
      setImageSource(require("../assets/monster1.png"));
    }
  }, [popCount]);

  const increaseHungryBar = (value) => {
    const newProgress = progress2 + value;
    setProgress2(Math.min(newProgress, 1));
  };

  const handleEatingButtonPress = () => {
    toggleModal();
  };

  const restartGame = () => {
    setAppleCount(3);
    setFishCount(3);
    setMeatCount(3);
    setRiceCount(3);
    setPopCount(0);
    setImageSource(require("../assets/egg1.png"));
  };

  const enterSleepMode = () => {
    setSleepMode(true);
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
          toggleModal();
        }
        break;
      case "Fish":
        if (fishCount > 0) {
          setPopCount((prevCount) => prevCount + 20);
          setFishCount((prevCount) => prevCount - 1);
          increaseHungryBar(0.2);
          toggleModal();
        }
        break;
      case "Rice":
        if (riceCount > 0) {
          setPopCount((prevCount) => prevCount + 30);
          setRiceCount((prevCount) => prevCount - 1);
          increaseHungryBar(0.3);
          toggleModal();
        }
        break;
      case "Meat":
        if (meatCount > 0) {
          setPopCount((prevCount) => prevCount + 40);
          setMeatCount((prevCount) => prevCount - 1);
          increaseHungryBar(0.4);
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
      <View style={styles.container}>
        {sleepMode && (
          <View style={styles.sleepModeOverlay}>
            <Text style={styles.sleepModeText}>Sleep Mode</Text>
          </View>
        )}
        <View style={styles.header}>
          <View style={styles.progressBars}>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progress1}
              color="#00FF00"
              style={{ width: 100, marginRight: 10 }}
            />
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progress2}
              color="#FFA500"
              style={{ width: 100, marginRight: 10 }}
            />
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progress3}
              color="#0000FF"
              style={{ width: 100 }}
            />
          </View>
          <Text style={styles.popCountText}>{popCount}</Text>
        </View>
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Image source={imageSource} style={styles.image} />
        </TouchableWithoutFeedback>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.eatButton]}
            onPress={handleEatingButtonPress}
          >
            <Text style={styles.buttonText}>Eat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.sleepButton]}
            onPress={handleGame4Press}
          >
            <Text style={styles.buttonText}>{sleepMode ? "Wake Up" : "Sleep"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.restartButton]}
            onPress={restartGame}
          >
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={isModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => handleFoodSelection("Apple")}
                style={styles.foodOption}
              >
                <Text>Apple ({appleCount})</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFoodSelection("Fish")}
                style={styles.foodOption}
              >
                <Text>Fish ({fishCount})</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFoodSelection("Rice")}
                style={styles.foodOption}
              >
                <Text>Rice ({riceCount})</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFoodSelection("Meat")}
                style={styles.foodOption}
              >
                <Text>Meat ({meatCount})</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBars: {
    flexDirection: "row",
    marginRight: 10,
  },
  popCountText: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  image: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  eatButton: {
    backgroundColor: "#FFA500",
  },
  sleepButton: {
    backgroundColor: "#0000FF",
  },
  restartButton: {
    backgroundColor: "#FF0000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  foodOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sleepModeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  sleepModeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default PopcatGame;
