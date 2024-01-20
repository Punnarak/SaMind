import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native"

const Gamescreen = () => {
  const [targetWord, setTargetWord] = useState("");
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [enteredWords, setEnteredWords] = useState([]);
  const navigation = useNavigation();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const generateRandomWord = () => {
    const words = ["apple", "hippo", "lucky", "phone", "mango"];
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

      return (
        <Text key={index} style={{ color }}>
          {char}
        </Text>
      );
    });

    if (lowerCaseGuess === lowerCaseTargetWord) {
        Alert.alert(
            "Congratulations!",
            `You guessed the word in ${attempts + 1} attempts.`,
            [
              {
                text: "OK",
                onPress: () => {
                  setTargetWord(generateRandomWord());
                  setAttempts(0);
                  setEnteredWords([]);
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
    <View style={styles.container}>
      <Text style={styles.heading}>Wordle Game</Text>
      <Text>Attempts: {attempts}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setGuess(text)}
        value={guess}
        placeholder="Enter your guess"
      />
      <Button title="Guess" onPress={handleGuess} />
      <Text style={styles.answer}>Answer: {targetWord}</Text>

      <View style={styles.enteredWordsContainer}>
        <Text style={styles.enteredWordsLabel}>Entered Words:</Text>
        <View style={styles.enteredWordsList}>{enteredWords}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
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
    fontSize: 16,
    fontWeight: "bold",
  },
  enteredWordsList: {
    flexDirection: "column-reverse", // To display the latest word at the top
    marginTop: 5,
  },
});

export default Gamescreen;