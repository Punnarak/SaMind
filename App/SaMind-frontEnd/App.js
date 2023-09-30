import React, { useEffect } from "react";
import { MainNavigation } from "./Navigation";
import * as Device from "expo-device"; // Correct import for Device

const App = () => {
  // Log the Device model name to the console
  const newModel = Device.modelName;
  console.log("New Model:", newModel);

  useEffect(() => {
    // Any additional logic you may want to add after component mounts
  }, []);

  return (
    <>
      <MainNavigation />
    </>
  );
};

export default App;
