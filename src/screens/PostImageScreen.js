import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
// import Paragraph from "../components/Paragraph";
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
  TextInput
} from 'react-native';
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../core/Fire";
import * as ImagePicker from "expo-image-picker";

const firebase = require("firebase");
require("firebase/firestore");

export default class PostImageScreen extends React.Component {
    state = {
        user: {
            image: null
        }
    };


    componentDidMount() {
        this.getPhotoPermission();
    }

    getPhotoPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status != "granted") {
                alert("We need permission to use your camera roll if you'd like to incude a photo.");
            }
        }
    };

    handlePost = () => {
        Fire.shared
            .addPicture({ localUri: this.state.user.image })
            .then(ref => {
                this.setState({ image: null }); //sets post back to null, maybe??
                this.props.navigation.navigate("ImagesScreen");
                //user { ...this etc } on setState causes post not to redirect or image added
            })
            .catch(error => {
                alert(error);
            });
    };

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ user: { ...this.state.user, image: result.uri }});
        }
    };

    render() {
      return this.state.user.image == null ?
      <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ImagesScreen")}>
                        <Ionicons name="md-arrow-back" size={24} color="#4E84BD"></Ionicons>
                    </TouchableOpacity>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Image Post Screen</Text>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{ fontWeight: "500", color: '#4E84BD' }}>Post</Text>
                    </TouchableOpacity>
                </View>
                <View>
                <View>

                <TouchableOpacity style={styles.photoB4image} onPress={this.pickImage}>
                    <Ionicons name="md-camera" size={65} color="#4E84BD"></Ionicons>
                </TouchableOpacity>
                </View>
                </View>
                {/* <View style={{ marginHorizontal: 32, marginTop: 32, height: 225 }}>
                    <Image source={{ uri: this.state.user.image }} style={{ width: "100%", height: "100%" }}></Image>
                </View> */}
            </SafeAreaView>
       :

            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ImagesScreen")}>
                        <Ionicons name="md-arrow-back" size={24} color="#4E84BD"></Ionicons>
                    </TouchableOpacity>
                    <Text>Image Post Screen</Text>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{ fontWeight: "500", color: '#4E84BD' }}>Post</Text>
                    </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Ionicons name="md-camera" size={32} color="#4E84BD"></Ionicons>
                </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 32, marginTop: 32, height: 225 }}>
                    <Image source={{ uri: this.state.user.image }} style={{ width: "100%", height: "100%" }}></Image>
                </View>
            </SafeAreaView>
       
      }
}

//or for after theres an image.


const styles = StyleSheet.create({
    container: {
        flex: 1
        // backgroundColor: "black"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB"
    },
    inputContainer: {
        margin: 32,
        flexDirection: "row"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32,
        height: -50,
        padding: 0
    },
    photoB4image: {
      alignItems: "center",
      // marginHorizontal: 32,
      height: -50,
      padding: 44
  }
});






