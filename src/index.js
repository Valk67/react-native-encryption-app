import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// import { TabScreen } from '../screens/TabScreen';
import { TabScreen } from './screens/TabScreen';
// export { default as PasswordsScreen } from './screens/PasswordsScreen';
// export { default as ImagesScreen } from './screens/ImagesScreen';
export { default as SettingsScreen } from './screens/SettingsScreen';
// import { PostStack } from './screens/PostStack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  AuthLoadingScreen,
  Dashboard,
  ImagesScreen, //testing
  PostImageScreen,
  PostPassScreen,
  KeyScreen,
  GalleryScreen,
  PassGenScreen
  
} from "./screens";



const AppStack = createStackNavigator({ TabScreen });

const PostStack = createStackNavigator(
  {
    PostPassScreen,
    PostImageScreen,
    KeyScreen,
    GalleryScreen,
    PassGenScreen
    // Dashboard
  },
  {
    // initialRouteName: "PostPassScreen",
    headerMode: "none"
  }
);

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    AuthLoadingScreen
    
  },
  {
    initialRouteName: "AuthLoadingScreen",
    headerMode: "none"
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    Auth: Router,
    App: AppStack,
    ImageP: PostStack
  }
  
));
