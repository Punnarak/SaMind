import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Linking,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "../Clibrary";
import dataL from "../dataL";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
// import axios from "./axios";

export default function Login() {
  const navigation = useNavigation();

  // useEffect(() => {
  //   // โหลดและตั้งค่า fontFamily
  //   Font.loadAsync({
  //     "poppins-regular": require("../assets/fonts/Poppins-Regular.ttf"),
  //     "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
  //     "poppins-italic": require("../assets/fonts/Poppins-Italic.ttf"),
  //     // เพิ่ม font อื่นๆ ตามต้องการ
  //   });
  // },

  handleLogin = async () => {};

  const [searchText, setSearchText] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);
  // let [data, setData] = useState([]);
  // useEffect(() => {
  //   // Make a GET request to fetch data from "/question?type=test2"
  //   axios
  //     .get("/library")
  //     .then((response) => {
  //       // Set the fetched data in your state
  //     this.links = setData(response.data);
  //     })
  //     .catch((error) => {
  //       // Handle any errors here
  //       console.error("Axios error:", error);
  //     });
  // }, []);
  // let links = data
  const links = [
    {
      id: 1,
      name: "10 ตุลาคมวันสุขภาพจิต",
      url: "https://www.lovecarestation.com/10-ตุลาคม-วันสุขภาพจิตโลก",
    },
    {
      id: 2,
      name: "สุขภาพจิตไทย...วัดใจไปพร้อมกัน",
      url: "https://www.thailandplus.tv/archives/403806",
    },
    { id: 3, name: "สุขภาพจิตวัยรุ่น", url: "https://www.hitap.net/166484" },
    {
      id: 4,
      name: "How To บริหารสุขภาพจิตในช่วง\nวิกฤตCOVID-19",
      url: "https://www.rama.mahidol.ac.th/ramachannel/infographic/how-to-%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%99%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%87/",
    },
    {
      id: 5,
      name: "7 วิธีดูแลสภาพจิตใจหลังเผชิญ\nความโศกเศร้า",
      url: "https://www.camri.go.th/th/home/infographic/infographic-395",
    },
    {
      id: 6,
      name: "CheckList สุขภาพจิตแบบไหนถึง\nควรพบแพทย์",
      url: "https://www.rama.mahidol.ac.th/ramachannel/infographic/check-list-%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%84%E0%B8%AB%E0%B8%99%E0%B8%96%E0%B8%B6%E0%B8%87%E0%B8%84%E0%B8%A7%E0%B8%A3/",
    },
    // เพิ่มลิงก์อื่น ๆ ตามต้องการ
  ];
  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredLinks([]);
    } else {
      const filtered = links.filter((link) =>
        link.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLinks(filtered);
    }
  };

  const renderLink = ({ item }) => {
    return (
      <Text style={styles.link} onPress={() => handleLinkPress(item)}>
        {item.name}
      </Text>
    );
  };

  const handleLinkPress = (link) => {
    // ทำสิ่งที่คุณต้องการเมื่อผู้ใช้กดลิงก์ เช่นเปิดลิงก์ในเบราว์เซอร์
    Linking.openURL(link.url);
    console.log("Opening link:", link.url);
  };

  //popup picture
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  // X button
  const [isButtonVisible, setButtonVisible] = useState(false);

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
    setButtonVisible(!isButtonVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
    setButtonVisible(!isButtonVisible);
  };
  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
    setButtonVisible(!isButtonVisible);
  };

  // Dotindex , Carousel
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    // <View style={styles.container1}>
    <ImageBackground
      source={require("../assets/Game.png")}
      style={{ alignItems: "center", flex: 1, postition: "absolute" }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "20%",
        }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="#3987FD"
          style={{
            // position: "absolute",
            marginRight: "80%",
            // marginTop: "20%",
          }}
          onPress={() => navigation.goBack()}
        />
      </View>

      <TextInput
        placeholder="ค้นหา..."
        placeholderTextColor={"#AAAAAA"}
        style={styles.textin}
        value={searchText}
        onChangeText={handleSearch}
      />
      {filteredLinks.length > 0 ? (
        <FlatList
          data={filteredLinks}
          renderItem={renderLink}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      ) : null}

      <Ionicons
        name="search-outline"
        size={25.7}
        color="white"
        style={{
          borderWidth: 1,
          borderColor: "#569AFF",
          backgroundColor: "#569AFF",

          marginTop: "-9.65%",
          marginLeft: "61%",
        }}
      />
      <Carousel
        ref={isCarousel}
        data={dataL}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        autoplay={true} // Enable auto carousel
        loop={true} // Enable looping of items
        autoplayInterval={2000} // Set the interval between each slide (in milliseconds)
      />

      <Modal isVisible={isModalVisible1} onBackdropPress={toggleModal1}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{
              uri: "https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2020/05/how-to-%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95.png",
            }}
            style={{ width: 400, height: 400, resizeMode: "contain" }}
          />
          <Button
            title="X"
            onPress={toggleModal1}
            isVisible={isButtonVisible}
          />
        </View>
      </Modal>
      <Modal isVisible={isModalVisible2} onBackdropPress={toggleModal2}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{
              uri: "https://camri.go.th/th/images_file/info_home/images/7%20%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%94%E0%B8%B9%E0%B9%81%E0%B8%A5%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95%20%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B9%80%E0%B8%9C%E0%B8%8A%E0%B8%B4%E0%B8%8D%E0%B8%A0%E0%B8%B2%E0%B8%A7%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%82%E0%B8%A8%E0%B8%81%E0%B9%80%E0%B8%A8%E0%B8%A3%E0%B9%89%E0%B8%B2.jpg",
            }}
            style={{ width: 400, height: 400, resizeMode: "contain" }}
          />
          <Button
            title="X"
            onPress={toggleModal2}
            isVisible={isButtonVisible}
          />
        </View>
      </Modal>
      <Modal isVisible={isModalVisible3} onBackdropPress={toggleModal3}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{
              uri: "https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2020/10/Info-checkList-%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95.jpg",
            }}
            style={{ width: 400, height: 400, resizeMode: "contain" }}
          />
          <Button
            title="X"
            onPress={toggleModal3}
            isVisible={isButtonVisible}
          />
        </View>
      </Modal>
      <Text style={styles.title}>เกร็ดน่ารู้</Text>
      <View style={styles.container2}>
        <ScrollView horizontal="true" style={{}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "2%",
              flex: 1,
            }}
          >
            <TouchableOpacity onPress={toggleModal1}>
              <Image
                source={{
                  uri: "https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2020/05/how-to-%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95.png",
                }}
                style={{ width: 188, height: 237 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal2}>
              <Image
                source={{
                  uri: "https://camri.go.th/th/images_file/info_home/images/7%20%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%94%E0%B8%B9%E0%B9%81%E0%B8%A5%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95%20%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B9%80%E0%B8%9C%E0%B8%8A%E0%B8%B4%E0%B8%8D%E0%B8%A0%E0%B8%B2%E0%B8%A7%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%82%E0%B8%A8%E0%B8%81%E0%B9%80%E0%B8%A8%E0%B8%A3%E0%B9%89%E0%B8%B2.jpg",
                }}
                style={{ width: 188, height: 237, marginLeft: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal3}>
              <Image
                source={{
                  uri: "https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2020/10/Info-checkList-%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95.jpg",
                }}
                style={{ width: 188, height: 237, marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.undertag}>
          <Feather
            name="bell"
            style={styles.picul}
            size={25}
            color="#222222"
            onPress={() => navigation.navigate("Notiscreen")}
          />
          <Feather
            name="smile"
            style={styles.picur}
            size={25}
            color="#222222"
            onPress={() => navigation.navigate("Avatarscreen")}
          />
        </View>
      </View>
    </ImageBackground>
    // </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  list: {
    position: "absolute",
    maxHeight: 200,
    width: 200,
    marginTop: "28.5%",
    zIndex: 1,
  },
  link: {
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#EEF7FF",
  },
  container2: {
    backgroundColor: "#EEF7FF",
    alignItems: "center",
    marginTop: "2%",
    width: "100%",
    height: "40%",
    paddingHorizontal: 30,
    shadowColor: "rgba(0,0,0, 0.25)", // IOS
    shadowOffset: { height: -2, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  textin: {
    marginTop: "-7.6%",
    marginLeft: "2%",
    backgroundColor: "#FFFFFF",
    height: 30,
    width: "55%",
    marginBottom: "2%",
    borderWidth: 4,
    borderColor: "#569AFF",
    paddingHorizontal: 8,
    paddingTop: "2%",
  },
  title: {
    marginTop: "-10%",
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  undertag: {
    width: "120%",
    height: "20.5%",
    marginBottom: "0%",
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    flexDirection: "row",
    alignItems: "center",
  },
  picur: {
    marginLeft: "70%",
  },
  picul: {
    marginLeft: "9%",
  },
});
