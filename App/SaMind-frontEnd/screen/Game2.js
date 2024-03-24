import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image,ImageBackground, TouchableOpacity, Dimensions, Modal, TouchableWithoutFeedback} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native"
import { axios} from "./axios.js";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { color } from "react-native-elements/dist/helpers/index.js";

const windowWidth = Dimensions.get("window").width;

const Gamescreen = ({ route }) => {
  const [targetWord, setTargetWord] = useState("");
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [enteredWords, setEnteredWords] = useState([]);
  const navigation = useNavigation();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const { patientId } = route.params || {};
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [isButtonVisible, setButtonVisible] = useState(false);

  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
    setButtonVisible(!isButtonVisible);
    console.log(isInfoVisible);
  };

  const updateStaminaBar = async () => {
    try {
      const response = await axios.put('/update_stamina_bar_de', { decrementAmount:30 ,patient_id: patientId });
      console.log(response.data); // Logging the response for debugging
    } catch (error) {
      console.error('Error updating health bar:', error);
    }
  };

  const updateHungryBar = async () => {
    try {
      const response = await axios.put('/update_hungry_bar_de', { decrementAmount:30 ,patient_id: patientId });
      console.log(response.data); // Logging the response for debugging
    } catch (error) {
      console.error('Error updating health bar:', error);
    }
  };


  const updateScore = async () => {
    try {
      const response = await axios.put('/update_click_count', { patient_id: patientId, click_count: (6-attempts)*10 });
      console.log(response.data); // Logging the response for debugging
    } catch (error) {
      const response = await axios.put('/update_click_count', { patient_id: patientId, click_count: 10 });
    }
  };

  const generateRandomWord = () => {
    const words = [
      "apple", "hippo", "lucky", "phone", "mango",
      "water", "happy", "tiger", "house", "dream",
      "night", "stars", "happy", "sunny", "cloud",
      "toast", "smile", "music", "beach", "fruits",
      "peace", "light", "birds", "heart", "river",
      "laugh", "funny", "color", "smell", "taste",
      "sight", "touch", "books", "bread", "cakes",
      "dusty", "frost", "angel", "fairy", "magic",
      "shine", "spark", "waves", "ocean", "flame",
      "earth", "clean", "fresh", "quiet", "still",
      "peace", "dream", "faith", "grace", "angel",
      "heart", "happy", "sunny", "smile", "grace",
      "music", "dance", "joyful", "party", "sweet",
      "smart", "swift", "brave", "strong", "proud",
      "cheer", "glory", "honor", "trust", "truth",
      "light", "shine", "calm", "warm", "clear",
      "bloom", "flower", "green", "smile", "laugh",
      "lucky", "charm", "magic", "angel", "peace",
      "dream", "heart", "faith", "grace", "happy",
      "sunny", "music", "dance", "joyful", "party",
      "sweet", "smart", "swift", "brave", "strong",
      "proud", "cheer", "glory", "honor", "trust",
      "truth", "light", "shine", "calm", "warm",
      "clear", "bloom", "flower", "green", "smile",
      "laugh", "lucky", "charm", "magic", "angel",
      "peace", "dream", "heart", "faith", "grace",
      "happy", "sunny", "music", "dance", "joyful",
      "party", "sweet", "smart", "swift", "brave",
      "strong", "proud", "cheer", "glory", "honor",
      "trust", "truth", "light", "shine", "calm",
      "warm", "clear", "bloom", "flower", "green",
      "smile", "laugh", "lucky", "charm", "magic",
      "angel", "peace", "dream", "heart", "faith",
      "grace", "happy", "sunny", "music", "dance",
      "joyful", "party", "sweet", "smart", "swift",
      "brave", "strong", "proud", "cheer", "glory",
      "honor", "trust", "truth", "light", "shine",
      "calm", "warm", "clear", "bloom", "flower",
      "green", "smile", "laugh", "lucky", "charm",
      "magic", "angel", "peace", "dream", "heart",
      "faith", "grace", "happy", "sunny", "music",
      "dance", "joyful", "party", "sweet", "smart",
      "swift", "brave", "strong", "proud", "cheer",
      "glory", "honor", "trust", "truth", "light",
      "shine", "calm", "warm", "clear", "bloom",
      "flower", "green", "smile", "laugh", "lucky",
      "charm", "magic", "angel"
    ];

    // const words = ["glade"];
    
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  useEffect(() => {
    setTargetWord(generateRandomWord());
  }, [navigation]);

  const handleGuess = () => {
    const lowerCaseGuess = guess.toLowerCase();
    const lowerCaseTargetWord = targetWord.toLowerCase();

    if (guess.length !== 5) {
      alert("Please enter a word with exactly 5 letters.");
      setGuess("");
      return;
    }

    let correctPositionCount = 0;
    let correctLetterWrongPositionCount = 0;
    let incorrectCount = 0;
    let correctLetterIndices = [];

    const highlightedGuess = guess.split("").map((char, index) => {
      const isInCorrectPosition =
        char.toLowerCase() === lowerCaseTargetWord[index];
      const isCorrectLetter = lowerCaseTargetWord.includes(char.toLowerCase());

      if (isInCorrectPosition) {
        correctPositionCount++;
        correctLetterIndices.push(index);
      } else if (isCorrectLetter && !correctLetterIndices.includes(index)) {
        correctLetterWrongPositionCount++;
      } else {
        incorrectCount++;
      }

      let color = "black";

      if (isInCorrectPosition) {
        color = "green";
      } else if (isCorrectLetter && !isInCorrectPosition) {
        color = "yellow";
      }
      else{
        color="red";
      }

      return (
        <Text key={index} style={{ color }}>
          {char}
        </Text>
      );
    });

    if (lowerCaseGuess === lowerCaseTargetWord) {
        Alert.alert(
            `Congratulations! It's ${lowerCaseTargetWord} !!!.`,
            `You guessed the word in ${attempts + 1} attempts.`,
            [
              {
                text: "OK",
                onPress: () => {
                  setTargetWord(generateRandomWord());
                  setAttempts(0);
                  setEnteredWords([]);
                  updateStaminaBar();
                  updateScore();
                  updateHungryBar();
                  navigation.goBack();
                },
              },
            ]
          );
    //   alert(`Congratulations! You guessed the word in ${attempts + 1} attempts.`);
    //   setShouldNavigate(true);
    // //   navigation.goBack();
    //   setTargetWord(generateRandomWord());
    //   setAttempts(0);
    //   setEnteredWords([]);
    } else {
      const formattedEnteredWord = (
        <View key={enteredWords.length} style={styles.highlightedWord}>
          {highlightedGuess}
        </View>
      );

      // Update the enteredWords state to prepend the new word
      setEnteredWords([formattedEnteredWord, ...enteredWords]);

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts === 5) {
        Alert.alert(
            "Game Over <3",
            `The correct answer was: ${targetWord}`,
            [
              {
                text: "OK",
                onPress: () => {
                  setTargetWord(generateRandomWord());
                  setAttempts(0);
                  setEnteredWords([]);
                  updateStaminaBar();
                  updateHungryBar();
                  navigation.goBack();
                },
              },
            ]
          );
        // alert(`Game Over! The correct answer was: ${targetWord}`);
        // setShouldNavigate(true);
        // // navigation.goBack();
        // setTargetWord(generateRandomWord());
        // setAttempts(0);
        // setEnteredWords([]);
      }

      // Display counts in the UI
      alert(
        `Correct Position: ${correctPositionCount}, Correct Letter (Wrong Position): ${correctLetterWrongPositionCount}, Incorrect: ${incorrectCount}`
      );
    }

    setGuess("");
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigation.goBack();
    }
  }, [shouldNavigate, navigation]);

  return (
    <ImageBackground
      source={require("../assets/room.jpg")}
      style={{ width: "100%", height: "100%", resizeMode: "cover", flex: 1, justifyContent: "center", alignItems: "center" }}
    >
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
  <View style={{ flex: 1 }} />
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
                    fontSize: moderateScale(14),
                    // fontSize: 17,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  สำหรับหน้านี้ {"\n"} มาทายคำศัพท์ภาษาอังกฤษกัน โดยเป็นภาษาอังกฤษ ที่มี 5 ตัวอักษร{" "}
                  {"\n"}
                </Text>

                <Text
                  style={{
                    fontSize: moderateScale(14),
                    // fontSize: 17,
                    color: "green",
                    textAlign: "center",
                  }}
                >
                  สีเขียว {" "} หมายถึงตัวอักษรนั้นมีจริงและวางถูกตำแหน่ง{" "}
                  {"\n"}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    // fontSize: 17,
                    color: "yellow",
                    textAlign: "center",
                  }}
                >
                  สีเหลือง {" "} หมายถึงตัวอักษรนั้นมีจริงแต่วางผิดตำแหน่ง{" "}
                  {"\n"}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    // fontSize: 17,
                    color: "red",
                    textAlign: "center",
                  }}
                >
                  สีแดง {" "} หมายถึงตัวอักษรไม่มีอยู่จริงในคำนี้{" "}
                  {"\n"}
                </Text>
                <TouchableOpacity
                style={styles.confirmb}
                onPress={toggleInfo}
                isVisible={isInfoVisible}
              >
                <Text style={styles.text}>I understand</Text>
              </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {/* </ImageBackground> */}
        </View>
      </Modal>
      <View style={styles.wrapper}>
      <Image
    source={require("../assets/clock.gif")}
    style={{ width: 200, height: 200 }} // Adjust width and height as needed
  />
        <View style={styles.container}>
          <Text style={styles.heading}>Wordle Game</Text>
          <Text style={{ color: 'white' }}>Attempts: {attempts}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setGuess(text)}
            value={guess}
            placeholder="Enter your guess"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
          />
          <Button title="Guess" onPress={handleGuess} />
          {/* <Text style={styles.answer}>Answer: {targetWord}</Text> */}
  
          <View style={styles.enteredWordsContainer}>
            <Text style={styles.enteredWordsLabel}>Entered Words:</Text>
            <View style={styles.enteredWordsList}>{enteredWords}</View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%", // adjust this percentage to your preference
    height: "80%", // adjust this percentage to your preference
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'white', // Add this line to set the background color
    padding: 20,
    borderRadius: 10,
    margin: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color:"white",
    marginBottom: 20,
  },
  input: {
    color:"white",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: 200,
  },
  answer: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  highlightedWord: {
    flexDirection: "row",
  },
  enteredWordsContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  enteredWordsLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  enteredWordsList: {
    fontSize: 16,
    flexDirection: "column-reverse", 
    fontWeight: "bold",
    marginTop: 5,
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
  modalViewRow: {
    margin: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalBackground: {
    flex: 1,
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
    marginBottom: 7,
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
});

export default Gamescreen;