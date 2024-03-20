import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from "../CarouselCardItem";
import { useNavigation } from "@react-navigation/native";
import data from "../data";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";

const First = () => {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  // const patientId = 2;
  // const hospitalName = "aaa";

  
  useEffect(() => {
    console.log("First Screen");
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        // layout="stack"
        // layoutCardOffset={30}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        autoplay={true} // Enable auto carousel
        loop={true} // Enable looping of items
        autoplayInterval={2000} // Set the interval between each slide (in milliseconds)
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 5,
          height: 5,
          borderRadius: 5,
          // marginHorizontal: -10,
          backgroundColor: "#6AA6FF",
          marginTop: "0%",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Loginscreen")}
        // onPress={() => navigation.navigate("Homescreen", { patientId, hospitalName })}
      >
        <Text style={styles.text}>Get started</Text>
      </TouchableOpacity>
      {/* <Text style={styles.n}>
        Don't Have Any Account?{"  "}
        <Text
          style={styles.hyper}
          onPress={() => navigation.navigate("Signupscreen")}
        >
          Sign up
        </Text>
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    // marginTop: "5%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#BED8FF",
    width: "60%",
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  hyper: {
    fontSize: 13,
    color: "#569AFF",
    marginTop: "1%",
    marginLeft: "55%",
    fontWeight: "bold",
  },
  n: {
    fontSize: 13,
    color: "black",
    marginTop: "3%",
    // fontWeight: "bold",
  },
});

export default First;
