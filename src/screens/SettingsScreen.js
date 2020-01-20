import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";
import PassFire from "../core/PassFire";


const SettingsScreen = () => (
    <Background>
      <Logo />
      <Header>settings</Header>
      <Paragraph>
        (Under Construction)
      </Paragraph>
      <Button color="white" mode="outlined" onPress={() => logoutUser()}>
        Logout
      </Button>
    </Background>
  );
  
  export default memo(SettingsScreen);
  