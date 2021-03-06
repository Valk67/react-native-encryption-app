import React, { memo } from "react";
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
  TextInput
} from 'react-native';
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import PassFire from "../core/PassFire";
import * as ImagePicker from "expo-image-picker";

const firebase = require("firebase");
require("firebase/firestore");

export default class PostPassScreen extends React.Component {
    state = {
        text: ""
    };

    // componentDidMount() {
    //     this.getPhotoPermission();
    // }

    // getPhotoPermission = async () => {
    //     if (Constants.platform.ios) {
    //         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //         if (status != "granted") {
    //             alert("We need permission to use your camera roll if you'd like to incude a photo.");
    //         }
    //     }
    // };

    handlePost = () => {
        PassFire.shared
            .addPost({ text: this.state.text.trim() })
            .then(ref => {
                this.setState({ text: "" });
                this.props.navigation.navigate("PasswordsScreen");
            })
            .catch(error => {
                alert(error);
            });
    };


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("PasswordsScreen")}>
                        <Ionicons name="md-arrow-back" size={24} color="#4E84BD"></Ionicons>
                    </TouchableOpacity>
                    <Text>Password Post Screen</Text>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{ fontWeight: "500", color: '#4E84BD' }}>Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    {/* <Image source={require("../assets/tempAvatar.jpg")} style={styles.avatar}></Image> */}
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder="Place text to be encrypted here."
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
                </View>
                <View>
                  <Text style={{textAlign:"center"}}>Encryption supports AES-128, AES-192, and AES-256. It will pick the variant by the size of the key you pass in.</Text>
                </View>

                {/* <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Ionicons name="md-camera" size={32} color="#4E84BD"></Ionicons>
                </TouchableOpacity>

                <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
                    <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>
                </View> */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        marginHorizontal: 32
    }
});