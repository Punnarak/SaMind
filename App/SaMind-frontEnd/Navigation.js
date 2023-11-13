import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Loginscreen from "./screen/Login";
import Signupscreen from "./screen/Signup";
import Firstscreen from "./screen/First";
import Homescreen from "./screen/Home";
import Editscreen from "./screen/Edit";
import Profilescreen from "./screen/Profile";
import Dashboardscreen from "./screen/Dashboard";
import Calendarscreen from "./screen/Calendar";
import Libraryscreen from "./screen/Library";
import Notiscreen from "./screen/Notification";
import Testscreen from "./screen/Test";
import Avatarscreen from "./screen/Avatar";
import Upcomingscreen from "./screen/Upcoming";
import Appointmentscreen from "./screen/Appointment";
import Forgotscreen from "./screen/Forgotpassword";
import Selectappointmentscreen from "./screen/SelectAppointment";
import Signupinscreen from "./screen/SignupIn";
import Generaltestscreen from "./screen/GeneralTest";
import Phq9testscreen from "./screen/Phq9";
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

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};
export { MainNavigation };
