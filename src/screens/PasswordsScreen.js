import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  TextInput,
  ImageBackground
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import { ListItem, Divider } from 'react-native-elements';
import PassFire from "../core/PassFire";
// import firebase from "firebase";

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
    PassFire.shared.getFoods(this.Received);
    // const user = this.props.uid || Fire.shared.uid;

    // this.unsubscribe = Fire.shared.firestore
    //     .collection('')
    //     .doc(user)
    //     .onSnapshot(doc => {
    //         this.setState({ user: doc.data() });
    //     });

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
  test =  (id, text) => {
    PassFire.shared.delete(id, text);
    PassFire.shared.getFoods(this.Received);
  }
  // convertBack = async (text) => {
  //   // CryptoJS = require("crypto-js");
  //   // bytes  = CryptoJS.AES.decrypt(text.toString(), 'secret key 123');
  //   // plaintext = bytes.toString(CryptoJS.enc.Utf8);
  //   johnny = text.text;
  //   return johnny;
  // }
  // componentWillUnmount() {
  //   this.unsubscribe();
  // }
  render() {
    // const food = this.props.navigation.getParam('food');

    // const onFoodDeleted = this.props.navigation.getParam('foodDeletedCallback');
    
    return this.state.foodList.length > 0 ?
    <ImageBackground
      source={require("../assets/hackerback.jpg")}
      // resizeMode="repeat"
      imageStyle= {{opacity:0.5}}
      style={styles.background}
    >
      <SafeAreaView style={styles.container} >
        <View>
       <View style={styles.header}>
            <Text style={{fontSize: 20, fontWeight: 'bold', borderColor: "black"}}>Secured Data</Text>
        </View>
        </View>
        
        <View style= {{backgroundColor: "white"}}>
        <FlatList 
          data={this.state.foodList}
          ItemSeparatorComponent={() => <Divider style={{ backgroundColor: "black", height: 10 }} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ListItem button onPress={() => Alert.alert(
                'Delete?',
                'Cannot be undone',
                [
                  { text: 'Cancel' },
                  { text: "Confirm", onPress: () => this.test(item.id.toString(), item.text.toString()) }

                ],
                { cancelable: false },
              )}
                containerStyle={styles.listItem}                
                title={`Decrypted: ${item.text}`}

                subtitle={`Date Added: ${moment(item.time).format("MMMM D, YYYY")}`}
                titleStyle={styles.titleStyle}
                subtitleStyle={styles.subtitleStyle}

              />
              
            );
          }
          }
        />
        </View>
        
       <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#E9CD13' title="Make or Change Keys" onPress={() => this.props.navigation.navigate("KeyScreen")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Encrypt" onPress={() => this.props.navigation.navigate("PostPassScreen")}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title="Passwood Generator" onPress={() => this.props.navigation.navigate("PassGenScreen")}>
            <Icon name="md-key" style={styles.actionButtonIcon} />
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Secured Data</Text>
        </View>
        <Background>
          <Logo />
          <Header>No Hidden Text Found.</Header>
          <Paragraph>
            Click the + button below encrypt a message to the severs.
          </Paragraph>
        
        </Background>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#E9CD13' title="Make or Change Keys" onPress={() => this.props.navigation.navigate("KeyScreen")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Encrypt" onPress={() => this.props.navigation.navigate("PostPassScreen")}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title="Passwood Generator" onPress={() => this.props.navigation.navigate("PassGenScreen")}>
            <Icon name="md-key" style={styles.actionButtonIcon} />
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
      
      // backgroundColor: "black"
  },
  background: {
    flex: 1,
    width: "100%",
    // opacity: .3,
    backgroundColor: "transparent"
    },
  profile: {
      marginTop: 64,
      alignItems: "center"
  },
  // actionButtonIcon: {
  //   height: 10
  // },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB"
    // backgroundColor: "white",
    // fontSize: 20,
    // fontWeight: "bold"
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
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 5
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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


