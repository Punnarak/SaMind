import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUpIn = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("SignUpIn Screen");
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require(`../assets/emailsign.png`)}
        style={{
          width: 250,
          height: 250,
          resizeMode: "contain",
          marginTop: -70,
        }}
      />
      <Text style={styles.content}>CONFIRM AT YOUR EMAIL</Text>
      <Text style={styles.detail}>
        Account activation link has been sent to {"\n"} the e-mail address you
        provided
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Homescreen")}
      >
        <Text style={styles.text}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BED8FF",
    flex: 1,
  },
  content: {
    marginTop: -20,
    color: "black",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 15,
  },
  detail: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 30,
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#569AFF",
    width: "60%",
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default SignUpIn;
