import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";


const Dashboard = () => (
  <Background>
    <Logo />
    <Header>Home</Header>
    <Paragraph>
      (Under Construction)
    </Paragraph>
    <Button color="white" mode="outlined" onPress={() => logoutUser()}>
      Logout
    </Button>
  </Background>
);

export default memo(Dashboard);

// import React from "react";

// import { createBottomTabNavigator } from 'react-navigation-tabs';

// // createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);


// import { createAppContainer } from "react-navigation";

// import {
//   // Dashboard,
//   PasswordsScreen,
//   ImagesScreen,
//   SettingsScreen
// } from "../screens";

// const TabNavigator = createBottomTabNavigator({
//   // Dashboard,
//   PasswordsScreen,
//   ImagesScreen,
//   SettingsScreen
// });

// export default createAppContainer(TabNavigator);
