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

      <Text style={[styles.header, item.header]}>{item.title}</Text>
    </View>
  );
};
const ImageLink = ({ imageSource, link }) => {
  const handlePress = () => {
    Linking.openURL(link);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image source={imageSource} style={styles.image} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    width: ITEM_WIDTH,
    height: "74%",
  },

  header: {},
  body: {},
  image: {
    width: "100%",
    // marginTop: "10%",
    height: "100%",
    // alignItems: "center",
    // height: "100%",

    resizeMode: "cover",
    // borderRadius: 15,
  },
});

export default CarouselCardItem;
