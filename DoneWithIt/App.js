import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  Linking,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import TextStroke from "react-native-textstroke";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useTogglePasswordVisibility } from "./useTogglePasswordVisibility";

//View -> UIView
export default function App() {
  // const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  //   useTogglePasswordVisibility();
  // const [password, setPassword] = useState("");

  console.log("App executed!");
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.freeiconspng.com/thumbs/circle-png/cool-circle-designs-png-1.png",
        }}
        style={styles.icon}
      />

      <Text style={styles.title1}>Email</Text>
      <TextInput
        style={styles.TextInput} /*placeholder="type your username"*/
      />

      <Text style={styles.title2}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.TextInput} /*placeholder="type your password" */
      />
      {/* <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
        </Pressable>
      </TextInput> */}
      <Text
        style={styles.hyper}
        onPress={() => Linking.openURL("http://google.com")}
      >
        Forgot Password ?
      </Text>

      <TouchableOpacity
        style={styles.loginb}
        onPress={() => console.log("Button tapped")}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.n}>
        Don't have an account?{"  "}
        <Text
          style={styles.hyper}
          onPress={() => Linking.openURL("http://google.com")}
        >
          Sign up
        </Text>
      </Text>

      <View style={styles.undertag}>
        <Text style={styles.tu}>Sa-Mind</Text>
      </View>

      {/* <Button title="Login" onPress={() => alert("Button tapped")} /> */}
      {/* <Button
        title="Login"
        onPress={() =>
          Alert.alert("My title", "My message", [
            { text: "Yes", onPress: () => console.log("Yes") },
            { text: "No", onPress: () => console.log("No") },
          ])
        }
      /> */}
      {/* <Button
        title="Login"
        onPress={() =>
          Alert.prompt("My title", "My message", (text) => console.log(text))
        }
      /> */}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(238,186,0)",
    alignItems: "center",
  },
  TextInput: {
    marginTop: "2%",
    height: 40,
    width: "80%",
    borderColor: "aliceblue",
    borderWidth: 1,
    backgroundColor: "aliceblue",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 15,
  },
  title1: {
    marginTop: "10%",
    marginRight: "70%",
    fontWeight: "bold",
  },
  title2: {
    marginTop: "4%",
    marginRight: "62%",
    fontWeight: "bold",
  },
  hyper: {
    fontSize: 10,
    textDecorationLine: "underline",
    color: "white",
    marginTop: "1%",
    marginLeft: "55%",
    fontWeight: "bold",
  },
  icon: {
    width: 300,
    height: 300,
    alignItems: "center",
    marginTop: "15%",
    resizeMode: "contain",
  },
  loginb: {
    marginTop: "15%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 15,
    backgroundColor: "black",
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  n: {
    fontSize: 10,
    color: "black",
    marginTop: "3%",
    fontWeight: "bold",
  },
  undertag: {
    width: "100%",
    height: "10%",
    marginTop: "20%",
    justifyContent: "flex-end",
    backgroundColor: "black",
  },
  tu: {
    alignItems: "center",
    marginLeft: "35%",
    marginBottom: "10%",
    fontSize: 30,
    fontWeight: "bold",
    color: "rgb(238,186,0)",
  },
});

// // import * as React from "react";
// // import { NavigationContainer } from "@react-navigation/native";
// // import { createNativeStackNavigator } from "@react-navigation/native-stack";

// // const Stack = createNativeStackNavigator();

// // const MyStack = () => {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator>
// //         <Stack.Screen
// //           name="Home"
// //           component={HomeScreen}
// //           options={{ title: "Welcome" }}
// //         />
// //         <Stack.Screen name="Profile" component={ProfileScreen} />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // };
// // export default App;
// // const HomeScreen = ({ navigation }) => {
// //   return (
// //     <Button
// //       color="pink"
// //       title="Go to Jane's profile"
// //       onPress={() => navigation.navigate("Profile", { name: "Jane" })}
// //     />
// //   );
// // };
// // const ProfileScreen = ({ navigation, route }) => {
// //   return <Text>This is {route.params.name}'s profile</Text>;
// // };

// // import React from "react";
// // import { View, Text, Button } from "react-native";
// // import { createStackNavigator, createAppContainer } from "react-navigation";

// // class HomeScreen extends React.Component {
// //   render() {
// //     return (
// //       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
// //         <Text>Home Screen</Text>
// //         <Button
// //           title="Go to Profile"
// //           onPress={() => this.props.navigation.navigate("Profile")}
// //         />
// //       </View>
// //     );
// //   }
// // }
// // class ProfileScreen extends React.Component {
// //   render() {
// //     return (
// //       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
// //         <Text>Profile Screen</Text>
// //       </View>
// //     );
// //   }
// // }

// // const AppNavigator = createStackNavigator(
// //   {
// //     Home: HomeScreen,
// //     Profile: ProfileScreen,
// //   },
// //   {
// //     initialRouteName: "Home",
// //   }
// // );

// // const AppContainer = createAppContainer(AppNavigator);
// // export default class App extends React.Component {
// //   render() {
// //     return <AppContainer />;
// //   }
// // }
// // import React, { useState } from "react";
// // import { StyleSheet, Pressable, TextInput, View } from "react-native";
// // import { MaterialCommunityIcons } from "@expo/vector-icons";

// // import { useTogglePasswordVisibility } from "./useTogglePasswordVisibility";

// // export default function App() {
// //   const { passwordVisibility, rightIcon, handlePasswordVisibility } =
// //     useTogglePasswordVisibility();
// //   const [password, setPassword] = useState("");

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.inputContainer}>
// //         <TextInput
// //           style={styles.inputField}
// //           name="password"
// //           placeholder="Enter password"
// //           autoCapitalize="none"
// //           autoCorrect={false}
// //           textContentType="newPassword"
// //           secureTextEntry={passwordVisibility}
// //           value={password}
// //           enablesReturnKeyAutomatically
// //           onChangeText={(text) => setPassword(text)}
// //         />
// //         <Pressable onPress={handlePasswordVisibility}>
// //           <MaterialCommunityIcons name={rightIcon} size={22} color="white" />
// //         </Pressable>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#F5EEDC",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     paddingHorizontal: 12,
// //   },
// //   inputContainer: {
// //     backgroundColor: "white",
// //     width: "100%",
// //     borderRadius: 8,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     borderWidth: 4,
// //     borderColor: "#d7d7d7",
// //   },
// //   inputField: {
// //     padding: 14,
// //     fontSize: 22,
// //     width: "90%",
// //   },
// // });
// import * as React from "react";
// import { Button, View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate("Details")}
//       />
//     </View>
//   );
// }

// function DetailsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Details Screen</Text>
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
