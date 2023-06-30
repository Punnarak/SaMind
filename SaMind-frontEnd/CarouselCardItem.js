import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={item.imgUrl} style={styles.image} />
      <Text style={[styles.header, item.header]}>{item.title}</Text>
      <Text style={[styles.header, item.body]}>{item.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",

    width: ITEM_WIDTH,
    height: 600,
    borderRadius: 15,
    // paddingBottom: "4%",
    // shadowColor: "#000",
    // shadowset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  header: {},
  body: {},
  image: {
    // flex: 1,
    width: "100%",
    // marginTop: "10%",
    height: "150%",

    // height: "100%",

    resizeMode: "cover",
    borderRadius: 15,
  },
});

export default CarouselCardItem;
