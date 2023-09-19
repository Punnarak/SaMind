import React from "react";
import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";

const CircleRadioButton = ({ selected, onPress }) => {
  return (
    <View
      style={{
        width: 15,
        height: 15,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: selected ? "#D1C9C9" : "#D1C9C9",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
      }}
      onTouchEnd={onPress} // เพิ่มการเชื่อมต่อกับ onPress
    >
      {selected && (
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 16,
            backgroundColor: "#D1C9C9",
            // marginBottom: 5,
          }}
        />
      )}
    </View>
  );
};

const RadioItem = ({ value, label, selected, onSelect }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <CircleRadioButton selected={selected} onPress={() => onSelect(value)} />
      {/* นำ onSelect(value) มาเชื่อมต่อกับการเลือก */}
      <Text style={{ marginLeft: 10 }}>{label}</Text>
    </View>
  );
};

export default RadioItem;
