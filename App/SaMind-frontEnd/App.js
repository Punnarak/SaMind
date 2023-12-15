import React from "react";
import { MainNavigation } from "./Navigation";
import * as Device from "expo-device";
// import { AppRegistry } from "react-native";
// import First from "./screen/First"; // เปลี่ยนเป็นชื่อของ component ที่ต้องการที่จะเป็นหน้าหลัก

const SaMind = () => {
  const newModel = Device.modelName;
  console.log("New Model:", newModel);

  return (
    <>
      <MainNavigation />
    </>
  );
};

// ลงทะเบียนชื่อ "SaMind" และใช้ component "First" เป็นหน้าหลัก
// AppRegistry.registerComponent("SaMind", () => First);

export default SaMind; // แก้ให้ export SaMind ไม่ใช่ MyApp
