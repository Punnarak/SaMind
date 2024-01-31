import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';

const { width } = Dimensions.get('window');

const initialSnake = [
  { x: 2, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 0 },
];
const initialFood = { x: 5, y: 5 };

const SnakeGame = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);

  const handleSwipe = (gestureName) => {
    switch (gestureName) {
      case swipeDirections.SWIPE_UP:
        setDirection('UP');
        break;
      case swipeDirections.SWIPE_DOWN:
        setDirection('DOWN');
        break;
      case swipeDirections.SWIPE_LEFT:
        setDirection('LEFT');
        break;
      case swipeDirections.SWIPE_RIGHT:
        setDirection('RIGHT');
        break;
    }
  };

  const restartGame = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection('RIGHT');
    setGameOver(false);
  };

  useEffect(() => {
    return () => {
      // Cleanup event listener
    };
  }, []);

  useEffect(() => {
    const moveSnake = () => {
      if (gameOver) return;

      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      newSnake.unshift(head);
      newSnake.pop();
      setSnake(newSnake);
    };

    const checkCollisions = () => {
      const head = snake[0];

      // Check collision with walls
      if (head.x < 0 || head.x >= 10 || head.y < 0 || head.y >= 10) {
        handleGameOver();
      }

      // Check collision with itself
      for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          handleGameOver();
          break;
        }
      }
    };

    const checkFoodCollision = () => {
      const head = snake[0];

      // Check collision with food
      if (head.x === food.x && head.y === food.y) {
        // Snake ate the food, grow the snake and spawn new food
        const newSnake = [...snake, { x: -1, y: -1 }]; // Dummy position for the new tail
        setSnake(newSnake);
        spawnNewFood();
      }
    };

    const spawnNewFood = () => {
      const newFood = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      };
      setFood(newFood);
    };

    const handleGameOver = () => {
      setGameOver(true);
      // Handle game over logic (e.g., display a message, reset the game, etc.)
    };

    // Start the game loop
    const gameInterval = setInterval(() => {
      moveSnake();
      checkCollisions();
      checkFoodCollision();
    }, 200); // Adjust the interval as needed

    return () => {
      // Cleanup interval on component unmount
      clearInterval(gameInterval);
    };
  }, [snake, food, direction, gameOver]);

  const renderGameGrid = () => {
    const grid = Array.from({ length: 10 }, () => Array(10).fill(0));

    // Place the snake on the grid
    snake.forEach((segment) => {
      grid[segment.y][segment.x] = 'S';
    });

    // Place the food on the grid
    grid[food.y][food.x] = 'F';

    // Render the game grid using FlatList
    return (
      <FlatList
        data={grid}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, rowIndex }) => (
          <View key={rowIndex} style={styles.row}>
            {item.map((cell, cellIndex) => (
              <View
                key={cellIndex}
                style={[
                  styles.cell,
                  {
                    backgroundColor:
                      cell === 'S' ? 'blue' : cell === 'F' ? 'red' : 'white',
                  },
                ]}
              />
            ))}
          </View>
        )}
      />
    );
  };

  return (
    <GestureRecognizer
      onSwipe={(direction) => handleSwipe(direction)}
      config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
      style={styles.container}
    >
      <Text style={styles.title}>Snake Game</Text>
      <View style={styles.gameContainer}>{renderGameGrid()}</View>
      {gameOver && (
        <TouchableOpacity onPress={() => restartGame()}>
          <Text style={styles.button}>Restart Game</Text>
        </TouchableOpacity>
      )}
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gameContainer: {
    width: width - 40,
    aspectRatio: 1, // Maintain a square aspect ratio
    borderWidth: 2,
    borderColor: 'black',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
  },
  button: {
    fontSize: 20,
    color: 'blue',
    marginTop: 20,
  },
});

export default SnakeGame;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Accelerometer } from 'expo-sensors';

// const DinoGame = () => {
//   const [isJumping, setIsJumping] = useState(false);
//   const [gameOver, setGameOver] = useState(false);
//   const [score, setScore] = useState(0);
//   const [accelerometerData, setAccelerometerData] = useState({});

//   useEffect(() => {
//     const subscription = Accelerometer.addListener((data) => {
//       setAccelerometerData(data);
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   const jump = () => {
//     if (!isJumping && !gameOver) {
//       setIsJumping(true);
//       setTimeout(() => {
//         setIsJumping(false);
//       }, 500);
//     }
//   };

//   const endGame = () => {
//     setGameOver(true);
//   };

//   useEffect(() => {
//     if (!gameOver) {
//       const gameLoop = setInterval(() => {
//         // Update game logic here (e.g., move obstacles, check collisions)

//         // For simplicity, increment the score every second
//         setScore((prevScore) => prevScore + 1);
//       }, 1000);

//       return () => clearInterval(gameLoop);
//     }
//   }, [gameOver]);

//   return (
//     <View style={styles.container}>
//       {!gameOver ? (
//         <>
//           <View style={[styles.dino, { marginBottom: isJumping ? 20 : 0 }]} />
//           <TouchableOpacity style={styles.touchArea} onPress={jump} />
//           <Text style={styles.score}>Score: {score}</Text>
//           <Text style={styles.acceleration}>
//             Acceleration: x={accelerometerData.x?.toFixed(2)}, y={accelerometerData.y?.toFixed(2)}
//           </Text>
//         </>
//       ) : (
//         <View style={styles.gameOverContainer}>
//           <Text style={styles.gameOverText}>Game Over</Text>
//           <Text style={styles.score}>Your Score: {score}</Text>
//           <TouchableOpacity style={styles.restartButton} onPress={() => setGameOver(false)}>
//             <Text style={styles.restartButtonText}>Restart</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dino: {
//     width: 50,
//     height: 50,
//     backgroundColor: 'green',
//   },
//   touchArea: {
//     width: 50,
//     height: 50,
//     backgroundColor: 'transparent',
//     position: 'absolute',
//   },
//   score: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   acceleration: {
//     fontSize: 12,
//     marginTop: 5,
//   },
//   gameOverContainer: {
//     alignItems: 'center',
//   },
//   gameOverText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   restartButton: {
//     padding: 10,
//     backgroundColor: 'blue',
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   restartButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default DinoGame;

