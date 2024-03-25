// import React, { useState, useEffect } from "react";
// import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

// const ColorGame = () => {
//   const [colors, setColors] = useState([]);
//   const [correctColorIndex, setCorrectColorIndex] = useState(0);
//   const [time, setTime] = useState(10);
//   const [gameOver, setGameOver] = useState(false);

//   useEffect(() => {
//     generateRandomColors();
//     const interval = setInterval(() => {
//       setTime((prevTime) => {
//         if (prevTime > 1) {
//           return prevTime - 1;
//         } else {
//           setGameOver(true);
//           clearInterval(interval);
//           return 0;
//         }
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const generateRandomColors = () => {
//     const colorOptions = ["red", "blue", "green", "yellow", "pink"];

//     // Randomly select a different color index
//     let differentColorIndex = Math.floor(Math.random() * colorOptions.length);

//     // Ensure that the different color is not the same as the previous round
//     while (differentColorIndex === correctColorIndex) {
//       differentColorIndex = Math.floor(Math.random() * colorOptions.length);
//     }

//     // Initialize the colors array with one instance of the different color and the rest with the same color
//     const colorsArray = colorOptions.map((color, index) =>
//       index === differentColorIndex
//         ? colorOptions[differentColorIndex]
//         : colorOptions[0] // You can change this to any other index if you want a different color
//     );

//     // Shuffle the colors array to randomize the positions
//     for (let i = colorsArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [colorsArray[i], colorsArray[j]] = [colorsArray[j], colorsArray[i]];
//     }

//     // Set the correct color index to the index of the different color
//     setCorrectColorIndex(differentColorIndex);

//     // Set the colors array in the state
//     setColors(colorsArray);
//   };



//   const handleColorSelection = (selectedIndex) => {
//     if (selectedIndex === correctColorIndex) {
//       generateRandomColors();
//     } else {
//         setGameOver(true);
//     }
//   };



//   const resetGame = () => {
//     setTime(10);
//     setGameOver(false);
//     generateRandomColors();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.timer}>Time: {time}</Text>
//       {gameOver ? (
//         <View>
//           <Text style={styles.gameOverText}>Game Over!</Text>
//           <Button title="Play Again" onPress={resetGame} />
//         </View>
//       ) : (
//         <View style={styles.colorGrid}>
//           {colors.map((color, index) => (
//             <TouchableOpacity
//               key={index}
//               style={{
//                 flex: 1,
//                 aspectRatio: 1,
//                 backgroundColor: color,
//                 margin: 5,
//               }}
//               onPress={() => handleColorSelection(index)}
//             />
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   timer: {
//     fontSize: 20,
//     marginBottom: 10,
//   },
//   gameOverText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   colorGrid: {
//     flexDirection: "row",
//     marginBottom: 5,
//   },
// });

// export default ColorGame;


import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, Modal,Dimensions, } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";
const windowWidth = Dimensions.get("window").width;
const NumberGame = ({ route }) => {
  const navigation = useNavigation();
  const { patientId } = route.params || {};
  const [numbers, setNumbers] = useState([]);
  const [nextExpectedNumber, setNextExpectedNumber] = useState(1);
  const [clickedNumbers, setClickedNumbers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(null);
  const [startGame, setStartGame] = useState(false); // State to track whether the game has started
  const [showModal, setShowModal] = useState(true); // State to control the visibility of the popup modal
  const [wl, setwl] = useState(false)

  useEffect(() => {
    if (startGame) {
      generateRandomNumbers();

      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0 && !gameOver && nextExpectedNumber != 16) {
            return prevTime - 1;
          } else {
            clearInterval(timerInterval);
            calculateScore();
            setGameOver(true);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [startGame, gameOver]);

  const startNewGame = () => {
    setStartGame(true);
    setShowModal(false); // Hide the modal when the game starts
  };


  const updateHealthBar = async () => {
    try {
      const response = await axios.put('/update_health_bar30', { patient_id: patientId });
      console.log(response.data); // Logging the response for debugging
    } catch (error) {
      console.error('Error updating health bar:', error);
    }
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
      console.log(score);
      const response = await axios.put('/update_click_count', { patient_id: patientId, click_count: 40 });
      console.log(response.data); // Logging the response for debugging
    } catch (error) {
      const response = await axios.put('/update_click_count', { patient_id: patientId, click_count: 10 });
    }
  };

  const updateScore0 = async () => {
    try {
      console.log(score);
      const response = await axios.put('/update_click_count', { patient_id: patientId, click_count: 0 });
      console.log(response.data); // Logging the response for debugging
    } catch (error) {
      const response = await axios.put('/update_click_count', { patient_id: patientId, click_count: 0 });
    }
  };

  const generateRandomNumbers = () => {
    const numberOptions = Array.from({ length: 16 }, (_, index) => index + 1);
    shuffleArray(numberOptions);

    setNumbers(numberOptions);
  };

  const handleNumberSelection = (selectedNumberIndex) => {
    const selectedNumber = numbers[selectedNumberIndex];

    if (!gameOver) {
      if (selectedNumber === nextExpectedNumber) {
        if (nextExpectedNumber === 16) {
          setwl(true);
          // updateScore();
          // If 16 is clicked, the game is won
          setGameOver(true); // Set game over to true for a win
        } else {
          // Otherwise, increment the expected number
          setNextExpectedNumber(nextExpectedNumber + 1);
          // Add the clicked number to the list
          setClickedNumbers([...clickedNumbers, selectedNumber]);
        }
      } else {
        setwl(false);
        // Incorrect number clicked, game over
        // updateScore0();
        // calculateScore();
        updateHealthBar();
        setScore(0);
        setGameOver(true);
      }
    }
  };


  const calculateScore = () => {
    // const usedTime = 15 - timeLeft;
    const currentScore = Math.max(0, timeLeft) * 10;
    setScore(gameOver ? currentScore : 0);
  };

  const conclusion = () => {
    if(nextExpectedNumber===16)
    {
      // calculateScore();
      // updateScore();
    }
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const resetGame = () => {
    setNextExpectedNumber(1);
    setClickedNumbers([]);
    setGameOver(false);
    setTimeLeft(10);
    setScore(null);
    generateRandomNumbers();
  };

  return (
    <ImageBackground
      source={require("../assets/room.jpg")}
      style={{ width: "100%", resizeMode: "cover", flex: 1 }}
    >
      <View style={styles.container}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Press the number 1-16 in order to WIN the game</Text>
              <Button title="Start" onPress={startNewGame} />
            </View>
          </View>
        </Modal>
        {gameOver ? (
          <View style={styles.gameOverContainer}>
          <Text style={[styles.gameOverText, { color: nextExpectedNumber === 16 ? 'green' : 'red' }]}>
            {nextExpectedNumber === 16 ? `You Win!` : 'Game Over! Score: 0'}
          </Text>
          <Button
            title="Confirm"
            onPress={() => {
              if (wl) {
                updateScore();
              } else {
                updateScore0();
                updateHealthBar();
              }
              updateStaminaBar();
              updateHungryBar();
              navigation.navigate("Gamescreen", { patientId });
            }}
          />
        </View>
        ) : (
          <View>
            <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
            <View style={styles.numberGrid}>
              {numbers.map((number, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.numberBlock,
                    { opacity: clickedNumbers.includes(number) ? 0 : 1 },
                  ]}
                  onPress={() => handleNumberSelection(index)}
                >
                  <Text style={styles.numberText}>{number}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
    textAlign: "center", // Center text horizontally
    textAlignVertical: "center"
  },
  timer: {
    fontSize: 18,
    marginBottom: 10,
  },
  numberGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  numberBlock: {
    width: 80,
    height: 80,
    backgroundColor: "lightblue",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  gameOverContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Example background color (adjust as needed)
    padding: 20, // Adjust padding as needed
    borderRadius: 10,
    width:windowWidth/2, // Optional: add borderRadius for rounded corners
    // Add any other styles you need for the container
  },
});

export default NumberGame;



