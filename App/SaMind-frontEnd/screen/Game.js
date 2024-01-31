//2048game

// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";
// import { useNavigation } from "@react-navigation/native";


// const BoardSize = 4;

// const Game2048 = () => {
//   const navigation = useNavigation();
//   const [board, setBoard] = useState([]);
//   const [score, setScore] = useState(0);
//   const [swipeDirection, setSwipeDirection] = useState(null);

//   useEffect(() => {
//     initializeGame();
//   }, []);

//   const initializeGame = () => {
//     const initialBoard = Array.from({ length: BoardSize }, () =>
//       Array(BoardSize).fill(0)
//     );
//     placeRandomTile(initialBoard);
//     placeRandomTile(initialBoard);
//     setBoard(initialBoard);
//     setScore(0);
//   };

//   const placeRandomTile = (currentBoard) => {
//     const emptyTiles = [];
//     currentBoard.forEach((row, rowIndex) => {
//       row.forEach((cell, columnIndex) => {
//         if (cell === 0) {
//           emptyTiles.push({ row: rowIndex, col: columnIndex });
//         }
//       });
//     });

//     if (emptyTiles.length > 0) {
//       const randomIndex = Math.floor(Math.random() * emptyTiles.length);
//       const { row, col } = emptyTiles[randomIndex];
//       currentBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
//     }
//   };

//   const handleSwipe = (direction) => {
//     const newBoard = [...board];
//     let moved = false;

//     switch (direction) {
//       case "UP":
//         moved = moveTiles(newBoard, -1, 0);
//         break;
//       case "DOWN":
//         moved = moveTiles(newBoard, 1, 0);
//         break;
//       case "LEFT":
//         moved = moveTiles(newBoard, 0, -1);
//         break;
//       case "RIGHT":
//         moved = moveTiles(newBoard, 0, 1);
//         break;
//       default:
//         break;
//     }

//     if (moved) {
//       placeRandomTile(newBoard);
//       setBoard(newBoard);
//     }
//   };

//   const moveTiles = (currentBoard, rowDirection, colDirection) => {
//     let moved = false;

//     for (
//       let row = rowDirection === 1 ? BoardSize - 1 : 0;
//       rowDirection === 1 ? row >= 0 : row < BoardSize;
//       rowDirection === 1 ? row-- : row++
//     ) {
//       for (
//         let col = colDirection === 1 ? BoardSize - 1 : 0;
//         colDirection === 1 ? col >= 0 : col < BoardSize;
//         colDirection === 1 ? col-- : col++
//       ) {
//         const tileValue = currentBoard[row][col];

//         if (tileValue !== 0) {
//           let newRow = row;
//           let newCol = col;

//           while (
//             newRow + rowDirection >= 0 &&
//             newRow + rowDirection < BoardSize &&
//             newCol + colDirection >= 0 &&
//             newCol + colDirection < BoardSize &&
//             currentBoard[newRow + rowDirection][newCol + colDirection] === 0
//           ) {
//             currentBoard[newRow + rowDirection][
//               newCol + colDirection
//             ] = tileValue;
//             currentBoard[newRow][newCol] = 0;
//             newRow += rowDirection;
//             newCol += colDirection;
//             moved = true;
//           }

//           if (
//             newRow + rowDirection >= 0 &&
//             newRow + rowDirection < BoardSize &&
//             newCol + colDirection >= 0 &&
//             newCol + colDirection < BoardSize &&
//             currentBoard[newRow + rowDirection][newCol + colDirection] ===
//               tileValue
//           ) {
//             currentBoard[newRow + rowDirection][newCol + colDirection] *= 2;
//             currentBoard[newRow][newCol] = 0;
//             setScore((prevScore) => prevScore + tileValue * 2);
//             moved = true;
//           }
//         }
//       }
//     }

//     return moved;
//   };

//   const renderBoard = () => {
//     return board.map((row, rowIndex) => (
//       <View key={rowIndex} style={styles.row}>
//         {row.map((cell, colIndex) => (
//           <TouchableOpacity
//             key={colIndex}
//             style={[styles.cell, { backgroundColor: getTileColor(cell) }]}
//           >
//             <Text style={styles.cellText}>{cell !== 0 ? cell : ""}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     ));
//   };

//   const getTileColor = (value) => {
//     const colorMap = {
//       0: "#9e9e9e",
//       2: "#64b5f6",
//       4: "#42a5f5",
//       8: "#2196f3",
//       16: "#1e88e5",
//       32: "#1976d2",
//       64: "#1565c0",
//       128: "#0d47a1",
//       256: "#0a4c6e",
//       512: "#b2ebf2",
//       1024: "#80deea",
//       2048: "#4dd0e1",
//     };

//     return colorMap[value] || "#9e9e9e";
//   };

//   const onSwipe = (gestureName, gestureState) => {
//     const { dx, dy } = gestureState;
//     const direction = getSwipeDirection(dx, dy);
//     if (direction) {
//       setSwipeDirection(direction);
//       handleSwipe(direction);
//     }
//   };

//   const getSwipeDirection = (dx, dy) => {
//     const threshold = 50; // Adjust as needed
  
//     if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
//       return dx > 0 ? "RIGHT" : "LEFT";
//     } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > threshold) {
//       return dy > 0 ? "DOWN" : "UP";
//     }
  
//     return null;
//   };

//   const restartGame = () => {
//     initializeGame();
//   };


//   return (
//     <GestureRecognizer
//       onSwipe={(direction, state) => onSwipe(direction, state)}
//       config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
//       style={styles.container}
//     >
//       <View style={styles.container}>
//         <Text style={styles.score}>Score: {score}</Text>
//         <View style={styles.gameBoard}>{renderBoard()}</View>
//         <Text style={styles.instructions}>
//           Swipe to combine tiles and reach 2048!{"\n"}
//           Last Swipe Direction: {swipeDirection}
//         </Text>
//         <View style={styles.buttonsContainer}>
//           <TouchableOpacity style={styles.button} onPress={restartGame}>
//             <Text style={styles.buttonText}>Restart</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("Homescreen")}>
//             <Text style={styles.buttonText}>Quit to Menu</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </GestureRecognizer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   gameBoard: {
//     flexDirection: "column",
//   },
//   row: {
//     flexDirection: "row",
//   },
//   cell: {
//     width: 80,
//     height: 80,
//     margin: 5,
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cellText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//   },
//   score: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   instructions: {
//     fontSize: 16,
//     marginTop: 20,
//     textAlign: "center",
//   },
//   buttonsContainer: {
//     flexDirection: "row",
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: "#2196f3",
//     padding: 10,
//     margin: 5,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

// export default Game2048;


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const PopcatGame = () => {
  const navigation = useNavigation();
  const [popCount, setPopCount] = useState(0);
  const [imageSource, setImageSource] = useState(
    require("../assets/egg1.png") // Initial image
  );
  const [swipeDirection, setSwipeDirection] = useState(null);

  const handlePressIn = () => {
    if(popCount < 50)
    {
    setImageSource(
      popCount % 2 === 1
        ? require("../assets/egg11.png")
        : require("../assets/egg12.png")
    );
    }
    else if (popCount >= 50 && popCount<125)
    {
      setImageSource(
        popCount % 2 === 1
          ? require("../assets/egg21.png")
          : require("../assets/egg22.png")
      );
    }
    else if(popCount >= 125 && popCount< 200)
    {
      setImageSource(
        popCount % 2 === 1
          ? require("../assets/egg31.png")
          : require("../assets/egg32.png")
      );
    }
    else
    {
      setImageSource(require("../assets/monster1.png"));
    }
  };

  const handlePressOut = () => {
    if (popCount < 50)
    {
      setImageSource(require("../assets/egg1.png"));
    }
    else if (popCount >= 50 && popCount<125)
    {
      setImageSource(require("../assets/egg2.png"));
    }
    else if(popCount >= 125 && popCount< 200)
    {
      setImageSource(require("../assets/egg3.png"));
    }
    else
    {
      setImageSource(require("../assets/monster.png"));
    }
    setPopCount((prevCount) => prevCount + 1);
  };

  const restartGame = () => {
    setPopCount(0);
    setImageSource(require("../assets/egg1.png"));
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Image source={imageSource} style={styles.popcatImage} />
      </TouchableWithoutFeedback>
      <Text style={styles.countText}>{popCount}</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <TouchableOpacity
             style={[styles.button, {width: (windowWidth / 4)}]}
            onPress={restartGame}
          >
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { width: (windowWidth / 2)- 25, backgroundColor: popCount < 200 ? "#9e9e9e" : "#2196f3" }]}
            onPress={popCount <= 0 ? null : () => navigation.navigate("Game1")}
            disabled={popCount <= 0}
          >
            <Text style={styles.buttonText}>Game 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { width: (windowWidth / 2)- 25, backgroundColor: popCount < 200 ? "#9e9e9e" : "#2196f3" }]}
            onPress={popCount <= 0 ? null : () => navigation.navigate("Game3")}
            disabled={popCount <= 0}
          >
            <Text style={styles.buttonText}>Game 3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
        <TouchableOpacity
            style={[styles.button, {width: (windowWidth / 4)}]}
            onPress={() => navigation.navigate("Homescreen")}
          >
            <Text style={styles.buttonText}>Quit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { width: (windowWidth / 2)- 25 , backgroundColor: popCount < 200 ? "#9e9e9e" : "#2196f3" }]}
            onPress={popCount <= 0 ? null : () => navigation.navigate("Game2")}
            disabled={popCount <= 0}
          >
            <Text style={styles.buttonText}>Game 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { width: (windowWidth / 2)- 25, backgroundColor: popCount < 200 ? "#9e9e9e" : "#2196f3" }]}
            onPress={popCount <= 0 ? null : () => navigation.navigate("Game4")}
            disabled={popCount <= 0}
          >
            <Text style={styles.buttonText}>Game 4</Text>
          </TouchableOpacity>
        </View>
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
  popcatImage: {
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
});

export default PopcatGame;




