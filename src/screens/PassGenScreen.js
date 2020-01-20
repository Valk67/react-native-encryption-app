import React, { Component } from "react";
import { StyleSheet, 
  TouchableOpacity, SafeAreaView, 
  Clipboard, 
  ScrollView, 
  Slider, 
  Switch, 
  Text, 
  ImageBackground,
  ToastAndroid,  
  View } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import { CheckBox } from 'react-native-elements'
  import { Checkbox } from 'react-native-paper';


  // import styles from "./styles";

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ["!", "$", "%", "@", "#"]; //add more
const lower = [
  "a","b","c","d","e","f","g","h","i","j","k","l","m",
  "n","o","p","q","r","s","t","u","v","w","x","y","z"
];
const upper = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

export default class GenPassScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      settings: {
        lower: false,
        upper: false,
        numbers: false,
        symbol: false,
        length: 12
      },
      value: ""
    };
  };

  _getActiveCharacterTypes() {
    const allCharacterTypes = [
      { items: lower, value: this.state.settings.lower },
      { items: upper, value: this.state.settings.upper },
      { items: numbers, value: this.state.settings.numbers },
      { items: symbols, value: this.state.settings.symbols }
    ];

    return allCharacterTypes
      .filter(characterType => {
        return characterType.value;
      })
      .map(characterType => {
        return characterType.items;
      });
  };

  _generatePassword() {
    let password = "";
    const length = this.state.settings.length;
    const characterTypes = this._getActiveCharacterTypes();

    if (characterTypes.length < 1) {
      return password;
    } else {
      for (let i = 0; i < length; i++) {
        const randomCharacter = this._getRandomCharacter(characterTypes);
        password += randomCharacter;
      }

      return password;
    }
  }

  _getRandomCharacter(characterTypes) {
    const randomType = this._getRandomCharacterType(characterTypes);
    let randNum = Math.round(Math.random() * (randomType.length - 1));

    return randomType[randNum];
  }

  _getRandomCharacterType(characterTypes) {
    const randNum = Math.round(Math.random() * (characterTypes.length - 1));
    return characterTypes[randNum];
  }

  _handleGenerateButtonPress() {
    if (this.state.lower && this.state.upper && this.state.numbers && this.state.symbol) {
      alert("Must select at least one option below before hitting submit.")
    } else {
    this._updatePassword();
    }
  }

  test = () => {
    // if (!this.state.lower && !this.state.upper && !this.state.numbers && !this.state.symbol) {
    //   alert("Must select at least one option below before hitting submit.")
    // } else {
    this._handleGenerateButtonPress();
    // }
  }

  _handleSliderChange = (value) => {
    this.setState(prevState => {
      return {
        settings: { ...prevState.settings, ...{ length: value } }
      };
    });
  }

  _handleSwitchChange(type) {
    this.setState(prevState => {
      return {
        settings: { ...prevState.settings, ...{ [type]: !prevState.settings[type] } }
      };
    });
  }

  _setPassword(value) {
    this.setState({
      value: value
    });
  }

  _updatePassword() {
    const password = this._generatePassword();
    this._setPassword(password);
  }

  componentWillMount() {
    this._updatePassword();
    // this.setState({
    //   value: "Must select >1 option."
    // }); 
  }

  render() {
    return (
      <ImageBackground
        imageStyle={{opacity:0.3}}
        source={require("../assets/hackerback.jpg")}
        resizeMode="repeat"
        style={styles.background}
      >
      {/* // <View style={styles.container}> */}
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("PasswordsScreen")}>
              <Ionicons name="md-arrow-back" size={24} color="#4E84BD"></Ionicons>
          </TouchableOpacity>
          <Text>Password Post Screen</Text>
       </View>
          <View style={styles.contentContainer}>
            <Text style={styles.headlineText}>
              Trouble making a secure password? No worries!{"\n"}
              Select options below and have us do it for you!
            </Text>
            <View style={{padding: 25, color: "black", fontWeight: "bold"}}>
              <Text style={styles.passwordValue} numberOfLines={1} selectable={true}>
                {this.state.value}
              </Text>
            </View>

            <View style={styles.togglesContainer}>
              <View style={styles.toggleRow}>
                <View style={styles.toggleContainer}> 
                  <Text style={styles.toggleLabel}>A-Z</Text>
                  <Switch thumbColor = "black" trackColor={{true: "white",false: "black",}} 
                    onValueChange={() => this._handleSwitchChange("upper")}
                    value={this.state.settings.upper}
                  />
                </View>
                <View style={styles.toggleContainer}>
                  <Text style={styles.toggleLabel}>0-9</Text>
                  <Switch thumbColor = "black" trackColor={{true: "white",false: "black",}}
                    onValueChange={() => this._handleSwitchChange("numbers")}
                    value={this.state.settings.numbers}
                  />
                </View>
              </View>

              <View style={styles.toggleRow}>
                <View style={styles.toggleContainer}>
                  <Text style={styles.toggleLabel}>a-z</Text>
                  <Switch thumbColor = "black" trackColor={{true: "white",false: "black",}}
                    onValueChange={() => this._handleSwitchChange("lower")} 
                    value={this.state.settings.lower} />
                </View>
                <View style={styles.toggleContainer}>
                  <Text style={styles.toggleLabel}>!$%@#</Text>
                  <Switch thumbColor = "black" trackColor={{true: "white",false: "black",}}
                    onValueChange={() => this._handleSwitchChange("symbols")} 
                    value={this.state.settings.symbols} />
                </View>
              </View>

              <View style={styles.sliderContainer}>
              <Text style={styles.sliderText}>How Long? {this.state.settings.length}</Text>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={20}
                thumbTintColor={"black"}
                minimumTrackTintColor={"black"}
                step={1}
                value={this.state.settings.length}
                onSlidingComplete={this._handleSliderChange}
              />
            </View>
              <View style={styles.submitButton}>
              <TouchableOpacity
                onPress={this.test}>
                <View>
                  <Text style={styles.submitText}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
            </View>

          </View>
      </SafeAreaView>
      </ImageBackground>
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
  toolbar: {
    backgroundColor: "#009688",
    height: 56
  },
  contentContainer: {
    flex: 1,
    alignItems: "center"
  },
  headlineText: {
    fontSize: 20,
    margin: 40,
    marginTop: 50,
    marginBottom: 35,
    color: "black",
    textAlign: "center"
  },
  passwordValue: {
    fontSize: 26,
    color: "#5c5c5c",
    fontWeight: "600",
    marginLeft: 10,
    marginRight: 10
  },
  submitButton: {
    marginTop: 12,
    marginBottom: 25,
    backgroundColor: "black",
    borderRadius: 20
  },
  submitText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 55,
    paddingLeft: 55
  },
  background: {
    flex: 1,
    width: "100%",
    // opacity: .3,
    backgroundColor: "transparent"
    },
  togglesContainer: {
    width: "70%",
    justifyContent: "flex-start"
  },
  toggleRow: {
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  toggleContainer: {
    flexDirection: "row"
  },
  toggleLabel: {
    fontSize: 17,
    marginRight: 18,
    paddingTop: 2,
    color: "black"
  },
  sliderContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center"
  },
  sliderText: {
    fontSize: 17,
    paddingBottom: 14,
    color: "black"
  },
  slider: {
    width: "100%",
    color: "black"
  }
});









//     }

// };


/*
<TextInput
style={styles.textInputStyle}
placeholder="Enter Name"
returnKeyLabel = {"next"}
onChangeText={(text) => this.setState({text})}
/>
*/