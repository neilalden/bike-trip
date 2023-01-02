import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {COLORS} from '../common/utils/colors';
import {FONT_WEIGHT} from '../common/utils/font';
import {SIZE} from '../common/utils/size';
import {Button, ButtonOutline} from '../components/Buttons';
import IMAGES from '../common/images';
import {APP_NAME} from '../common/constants/text';
import {TEXT_SHADOW} from '../common/utils/styles';
import {ROUTES} from '../common/routes';
import Icon from '../components/Icon';
const LandingScreen = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate(ROUTES.LOGIN_SCREEN);
  };
  const handleRegister = () => {
    navigation.navigate(ROUTES.REGISTER_SCREEN);
  };
  return (
    <ImageBackground source={IMAGES.ic_background} style={styles.container}>
      <Screen
        style={{
          backgroundColor: 'rgba(0,0,0,.5)',
          width: '100%',
          marginLeft: 0,
        }}>
        <Icon
          source={IMAGES.ic_app}
          size={SIZE.x125}
          iconStyle={styles.icon}
          containerStyle={styles.iconContainer}
        />
        <Text style={[styles.title, TEXT_SHADOW]}>{APP_NAME}</Text>
        <Button
          text={'LOGIN'}
          onPress={handleLogin}
          containerStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
        />
        <ButtonOutline
          text={'REGISTER'}
          onPress={handleRegister}
          containerStyle={styles.buttonOutlineContainer}
          textStyle={{color: COLORS.BLUE}}
        />
      </Screen>
    </ImageBackground>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  iconContainer: {
    alignSelf: 'center',
    marginTop: SIZE.x150,
  },
  container: {
    flex: 1,
    // remove width and height to override fixed static size
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    margin: 0,
    padding: 0,
  },
  title: {
    fontSize: SIZE.x40,
    FONT_WEIGHT: FONT_WEIGHT.x900,
    color: COLORS.BLUE,
    marginTop: SIZE.x20,
    alignSelf: 'center',
  },
  buttonContainer: {
    width: SIZE.x300,
    alignSelf: 'center',
    marginTop: SIZE.x54,
    backgroundColor: COLORS.BLUE,
  },
  buttonText: {
    color: COLORS.WHITE,
  },
  buttonOutlineContainer: {
    width: SIZE.x300,
    alignSelf: 'center',
    marginTop: SIZE.x54,
    backgroundColor: COLORS.NONE,
    borderColor: COLORS.BLUE,
  },
});
