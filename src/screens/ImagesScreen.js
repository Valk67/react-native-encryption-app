import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";
import moment from "moment";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ImageBackground,
  TextInput
} from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Fire from "../core/Fire";
import Gallery from 'react-native-image-gallery';
import { Ionicons } from "@expo/vector-icons";


export default class ImagesScreen extends React.Component {

  state = {
    foodList: [],
    user: {}
  };

  unsubscribe = null;
  


  Received = (foodList) => {
    this.setState(prevState => ({
      foodList: prevState.foodList = foodList
    }));
  }

  componentDidMount() {
    Fire.shared.getFoods(this.Received);
    const user = this.props.uid || Fire.shared.uid;

    this.unsubscribe = Fire.shared.firestore
        .collection("images99")
        .doc(user)
        .onSnapshot(doc => {
            this.setState({ user: doc.data() });
        });

          // .get()//here until end of catch is new
          // .then(function(doc) {
          //   if (doc.exists) {
          //       alert("image uploaded");

          //       doc => { this.setState({ user: doc.data() }) };
          //       console.log("Document data:", doc.data());
          //   } else {
          //       // doc.data() will be undefined in this case
          //       alert("image NA");
          //       console.log("No such document!");
          //   }
          // }).catch(function(error) {
          //   console.log("Error getting document:", error);
          // });

          
  }

  test =  (id) => {
    Fire.shared.delete(id);
    Fire.shared.getFoods(this.Received);
  }
 
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return this.state.foodList.length > 0 ?
    <ImageBackground
      source={require("../assets/hackerback.jpg")}
      // resizeMode="repeat"
      imageStyle={{opacity:0.5}}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View>
        <View style={styles.header}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Posted Images</Text>
        </View>
        {/* <Text>HEY THERES FUCKING ITEMS</Text> */}
        <View>
        <FlatList
          data={this.state.foodList}
          ItemSeparatorComponent={() => <Divider style={{ height: 10,  backgroundColor: 'black' }} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ListItem button onPress={() => Alert.alert(
                'Delete?',
                'Cannot be undone',
                [
                  { text: 'Cancel' },
                  { text: "Confirm", onPress: () => this.test(item.id.toString()) }

                ],
                { cancelable: false },
              )}
                containerStyle={styles.listItem}
                title={`Date Added: ${moment(item.time).format("MMMM D, YYYY")}`}
                leftAvatar={{
                  size: 'large',
                  rounded: false,
                  source: item.image && { uri: item.image }
                }}

              />
            );
          }
          }
        />
        </View>
        </View>
       <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#259821' title="View Gallery" onPress={() => this.props.navigation.navigate("GalleryScreen")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Add Image" onPress={() => this.props.navigation.navigate("PostImageScreen")}>
            <Icon name="md-camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Log Out" onPress={() => logoutUser()}>
            <Icon name="md-exit" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        
      </SafeAreaView> 
      </ImageBackground>
      
      :

      //NO PICTURES YET
     <SafeAreaView style={styles.container}>
      <View style={styles.header}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Posted Images</Text>
        </View>
      <Background>
        <Logo />
        <Header>No Images Found.</Header>
        <Paragraph>
          Click the + button below to add images to your new Library.
        </Paragraph>
        
     </Background>
          <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Add an Image." onPress={() => this.props.navigation.navigate("PostImageScreen")}>
            <Icon name="md-camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Log Out" onPress={() => logoutUser()}>
            <Icon name="md-exit" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </SafeAreaView>

      
  }
}



const styles = StyleSheet.create({
  container: {
      flex: 1
      // backgroundColor: "white"
  },
  background: {
    flex: 1,
    width: "100%",
    // opacity: 1,
    backgroundColor: "transparent"
    },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB"
  },
  profile: {
      marginTop: 64,
      alignItems: "center"
  },
  avatarContainer: {
      shadowColor: "#151734",
      shadowRadius: 30,
      shadowOpacity: 0.4
  },
  avatar: {
      width: 136,
      height: 136,
      borderRadius: 68
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8
  },
  name: {
      marginTop: 24,
      fontSize: 16,
      fontWeight: "600"
  },
  statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 32
  },
  stat: {
      alignItems: "center",
      flex: 1
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
},
  statAmount: {
      color: "#4F566D",
      fontSize: 18,
      fontWeight: "300"
  },
  statTitle: {
      color: "#C3C5CD",
      fontSize: 12,
      fontWeight: "500",
      marginTop: 4
  }
});


// const styles = StyleSheet.create({
//   actionButtonIcon: {
//     fontSize: 20,
//     height: 22,
//     color: 'white',
//   },
// });

{/* <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}