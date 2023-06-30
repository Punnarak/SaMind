import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import Loginscreen from "./screen/login";

import Signupscreen from "./screen/signup";
import Firstscreen from "./screen/first";
import Homescreen from "./screen/home";
import Editscreen from "./screen/edit";
import Profilescreen from "./screen/profile";
import Dashboardscreen from "./screen/dashboard";
import Calendarscreen from "./screen/calendar";
import Libraryscreen from "./screen/library";
import Notiscreen from "./screen/notification";
import Testscreen from "./screen/test";
import Avatarscreen from "./screen/avatar";

import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import { Ionicons } from "@expo/vector-icons";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Firstscreen">
        <Stack.Screen
          name="Firstscreen"
          component={Firstscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Loginscreen"
          component={Loginscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Homescreen"
          component={Homescreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboardscreen"
          component={Dashboardscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Calendarscreen"
          component={Calendarscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Libraryscreen"
          component={Libraryscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Testscreen"
          component={Testscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notiscreen"
          component={Notiscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Avatarscreen"
          component={Avatarscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profilescreen"
          component={Profilescreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Editscreen"
          component={Editscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signupscreen"
          component={Signupscreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
