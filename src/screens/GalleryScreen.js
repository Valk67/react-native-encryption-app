import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";
import Gallery from 'react-native-image-gallery';
import Fire from "../core/Fire";


export default class GalleryScreen extends React.Component {
    state = {
        foodList: [],
        user: {},
        imageBox: []
    };

    Received = (foodList) => {
        this.setState(prevState => ({
          foodList: prevState.foodList = foodList
        }));
    }
    
    componentDidMount() {
        Fire.shared.getFoods(this.Received);
        const user = this.props.uid || Fire.shared.uid;
    }
  
    render() {
{/* <Image source={{uri: 'asset:/app_icon.png'}} style={{width: 40, height: 40}} /> */}
        // Box = [];
        // for (let i = 0; i < this.state.foodList.length; i++) {
        //     a = this.state.foodList[i].image, ;
        //     Box.push(a);
        // }
        // this.imageBox = Box;
        Box = [
            //   { source= {{uri: `${this.state.foodList.image}` }} style={width: 40, height: 40} },
              { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
              { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
              { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
            ];
        
        return (
          <Gallery 
            style={{ flex: 1, backgroundColor: 'black' }}
              images={Box}

            //   { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
            // images={[
            //   { source: require('yourApp/image.png'), dimensions: { width: 150, height: 150 } },
            //   { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
            //   { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
            //   { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
            //   { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
            // ]}
          />
        );
      }
};



// return this.state.foodList.length > 0 ?
// <SafeAreaView style={styles.container}>
//   <Text>HEY THERES FUCKING ITEMS</Text>
//   <FlatList
//     data={this.state.foodList}
//     ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
//     keyExtractor={(item, index) => index.toString()}
//     renderItem={({ item, index }) => {
//       return (
//         <ListItem
//           containerStyle={styles.listItem}
//           title={moment(item.time).format("MMMM D, YYYY")}
//           // subtitle={`Category: ${item.category}`}
//           // titleStyle={styles.titleStyle}
//           // subtitleStyle={styles.subtitleStyle}
//           leftAvatar={{
//             size: 'large',
//             rounded: false,
//             source: item.image && { uri: item.image }
//           }}