import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
import { horizontalScale, moderateScale, verticalScale } from "./Metrics";

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={item.imgUrl} style={styles.image} />
      <Text style={[styles.header, item.header]}>{item.title}</Text>
      <Text style={[styles.body, item.body]}>{item.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: verticalScale(600),
    // height: "70%",
    // height: 600,
    borderRadius: 15,
  },

  header: {
    fontSize: moderateScale(64),
    marginTop: verticalScale(100),
    marginLeft: horizontalScale(10),
    paddingRight: horizontalScale(10),
    paddingLeft: horizontalScale(20),
  },
  body: {
    ...Platform.select({
      android: {
        // marginTop: 275,
        // marginTop: "60%",
        marginTop: verticalScale(275),
      },
      ios: {
        // marginTop: 275,
        // marginTop: "70%",
        marginTop: verticalScale(250),
      },
    }),
    marginLeft: horizontalScale(35),
    fontSize: moderateScale(36),
    // marginTop: verticalScale(250),
  },
  image: {
    ...Platform.select({
      android: {
        width: "98%",
        // height: "150%",
      },
      ios: {
        width: "100%",
        // width: horizontalScale(400),
        // marginTop: "10%",
        // height: "150%",
      },
    }),

    // width: horizontalScale(400),
    height: verticalScale(750),
    // flex: 1,

    // height: "100%",

    resizeMode: "cover",
  },
});

export default CarouselCardItem;
