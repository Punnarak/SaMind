import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "./Metrics";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <ImageLink
        imageSource={item.imgUrl}
        link={item.url}
        style={styles.image}
      />

      <Text style={[styles.header]}>{item.title}</Text>
    </View>
  );
};
const ImageLink = ({ imageSource, link }) => {
  const handlePress = () => {
    Linking.openURL(link);
  };
  // console.log(imageSource);
  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={{
          uri: String(imageSource),
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(37.5),
    // marginTop: "10%",
    width: ITEM_WIDTH,
    height: verticalScale(290),
    // height: "74%",
  },

  header: {
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 20,
    marginTop: "-13%",
    backgroundColor: "rgba(217, 217, 217, 0.47);",
    padding: "4%",
  },
  body: {},
  image: {
    width: horizontalScale(375),
    // width: "100%",
    // marginTop: "10%",
    height: verticalScale(290),
    // height: "100%",
    // alignItems: "center",
    // height: "100%",

    resizeMode: "cover",
    // borderRadius: 15,
  },
});

export default CarouselCardItem;
