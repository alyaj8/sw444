import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Icon from "react-native-vector-icons/Ionicons";
//import BookInfo from "./BookInfo";

export default function Discovry({ navigation }) {
  const [catergoryIndex, setCategoryIndex] = useState(0);
  const categories = ["ALL", "ADULT", "ROMANCE"];

  const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}
          >
            <Text
              style={[
                styles.categoryText,
                catergoryIndex === index && styles.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const [books, setBooks] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const width1 = Dimensions.get("screen").width / 2 - 35;
  const hight1 = Dimensions.get("screen").height / 3 - 70;

  const width2 = Dimensions.get("screen").width / 2.5 - 20;
  const Datacat = (str, num) => {
    if (str.length > num) {
      return str.substring(0, num) + "...";
    }
    return str;
  };

  const getData = async () => {
    try {
      const colRef = collection(db, "Book");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      //store data in AsyncStorage
      setBooks(myData);
      console.log("This is the data I get from the firebae");
      console.log(myData);
    } catch (error) {
      console.log(error);
    }
  };

  /* const restUrl = (link1) => {
    setUrl(link1)  }*/

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("./111.jpg")} resizeMode="cover">
        <View
          style={{
            backgroundColor: "#FFF",
            // D0ECDF
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginHorizontal: 20,
            borderRadius: 15,
            marginTop: 25,
            marginBottom: -10,
            flexDirection: "row",
            alignItems: "center",
            borderColor: "black",
            borderWidth: 0.2,
          }}
        >
          <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Search by title or for a user"
            placeholderTextColor="#b1e5d3"
            style={{
              fontWeight: "bold",
              fontSize: 18,
              width: 260,
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: "#FFF",
            paddingVertical: 6,
            paddingHorizontal: 10,
            margin: 20,
            borderRadius: 10,
            marginTop: 25,
            flexDirection: "row",
            alignItems: "center",
            borderColor: "#00a46c",
            borderWidth: 0.6,
          }}
        >
          <FlatList
            columnWrapperStyle={{ justifyContent: "space-between" }}
            numColumns={2}
            data={books}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              //  restUrl(item.data.poster)
              <View style={{ width: width1, height: hight1 }}>
                <View style={styles.card}>
                  <View style={{ alignItems: "flex-end" }}>
                    <View
                      style={{
                        width: 19,
                        height: 19,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                        marginTop: -7,
                        marginRight: -12,
                      }}
                    >
                      <Icon
                        name="bookmarks"
                        size={16}
                        style={{ color: "#00a46c" }}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("BookInfo", item)}
                  >
                    <Image
                      style={styles.container}
                      source={{
                        uri: item.poster,
                      }}
                    />
                    <Text>
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: 12,
                          //margin: 10,
                        }}
                      >
                        {Datacat(item.title, 11)}
                        {"\n"}
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",
                          color: "grey",
                          fontSize: 9,
                        }}
                      >
                        By:
                        {Datacat(item.author, 19)} {"\n"}{" "}
                      </Text>

                      <Icon
                        name="star"
                        size={16}
                        style={{ color: "#ECEF50" }}
                      />
                      <Icon
                        name="star"
                        size={16}
                        style={{ color: "#ECEF50" }}
                      />
                      <Icon
                        name="star"
                        size={16}
                        style={{ color: "#ECEF50" }}
                      />
                      <Icon
                        name="star"
                        size={16}
                        style={{ color: "#ECEF50" }}
                      />
                      <Icon
                        name="star-half"
                        size={16}
                        style={{ color: "#ECEF50" }}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )} //here i want my data
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "73%",
    width: "88%",
    borderRadius: 4,
    resizeMode: "stretch",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 2,
      height: 8,
    },
    alignSelf: "center",

    //alignItems: "center",
    // margin: 15,
  },
  oneBook: {
    //padding: 1,
    height: 128,
    justifyContent: "center",
    width: 350,
    backgroundColor: "lightgrey",
    borderRadius: 25,
    margin: 5,
    alignItems: "center",
  },
  card: {
    height: "95%",
    backgroundColor: "#EDF5F0",
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    borderColor: "#00a46c",
    borderWidth: 0.2,
  },
  categoryContainer: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  categoryText: { fontSize: 15, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: "green",
    paddingBottom: 5,
    borderBottomWidth: 2,
  },
});

/*const booksCol = collection(db, "Book");
  useEffect(() => {
    const q = query(booksCol); //which tabel
    onSnapshot(q, (querySnapshot) => {
      setBooks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);


  const Create = () => {
    const myDoc = doc(db, "as", "ss");

    const docData = {
      name: "ali",
      username: "alii",
    };
    setDoc(myDoc, docData).then(() => {
      alert("donnne");
    });
  };*/

/*
    <Button title="click" onPress={Read}></Button>
      {books != null && <Text>{books.name}</Text>}
  



  const Read = () => {
    const myDoc = doc(db, "as", "ss");

    getDoc(myDoc).then((snapshot) => {
      //if (snapshot.exists)
      setBooks(snapshot.data());
    });
  };*/

/*
const [books1, setBooks1] = useState([]);

  const Doc = query(collection(db, "as"));

  getDocs(Doc).then((querySnapshot) => {
    let values = null;
    querySnapshot.forEach((doc) => {
      //  console.log(doc.data());
      setBooks1(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  });*/
