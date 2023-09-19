import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

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
import Upcomingscreen from "./screen/upcoming";
import Appointmentscreen from "./screen/appointment";
import Forgotscreen from "./screen/forgotpassword";
import Selectappointmentscreen from "./screen/selectappointment";
import Signupinscreen from "./screen/signupin";
import Generaltestscreen from "./screen/generaltest";
import Phq9testscreen from "./screen/phq9";
import Q2testscreen from "./screen/Q2";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
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
        name="Forgotscreen"
        component={Forgotscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signupscreen"
        component={Signupscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signupinscreen"
        component={Signupinscreen}
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
        name="Appointmentscreen"
        component={Appointmentscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Selectappointmentscreen"
        component={Selectappointmentscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Calendarscreen"
        component={Calendarscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Upcomingscreen"
        component={Upcomingscreen}
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
        name="Generaltestscreen"
        component={Generaltestscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Phq9testscreen"
        component={Phq9testscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Q2testscreen"
        component={Q2testscreen}
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
    </Stack.Navigator>
  );
};

// const MainStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="Firstscreen">
//       <Stack.Screen
//         name="Firstscreen"
//         component={Firstscreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Loginscreen"
//         component={Loginscreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Signupscreen"
//         component={Signupscreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

// const FeaturesStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="Homescreen">
//       <Stack.Screen
//         name="Homescreen"
//         component={Homescreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Dashboardscreen"
//         component={Dashboardscreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Appointmentscreen"
//         component={Appointmentscreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Calendarscreen"
//         component={Calendarscreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Upcomingscreen"
//         component={Upcomingscreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Libraryscreen"
//         component={Libraryscreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Testscreen"
//         component={Testscreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Notiscreen"
//         component={Notiscreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Avatarscreen"
//         component={Avatarscreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

// const ProfileStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Profilescreen"
//         component={Profilescreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Editscreen"
//         component={Editscreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

// const FeaturesNavigation = () => {
//   return (
//     <NavigationContainer>
//       <FeaturesStack />
//     </NavigationContainer>
//   );
// };

// const ProfileNavigation = () => {
//   return (
//     <NavigationContainer>
//       <ProfileStack />
//     </NavigationContainer>
//   );
// };

export { MainNavigation };
// export { MainNavigation, FeaturesNavigation, ProfileNavigation };
