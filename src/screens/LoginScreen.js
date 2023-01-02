import {Image, ImageBackground, StyleSheet, Text} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {FONT_WEIGHT} from '../common/utils/font';
import IMAGES from '../common/images';
import {TEXT_SHADOW} from '../common/utils/styles';
import Header from '../components/Header';
import {TextInput} from '../components/TextInput';
import {signIn} from '../functions/authentication/signIn';
const LoginScreen = () => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  return (
    <ImageBackground source={IMAGES.ic_background} style={styles.container}>
      <Screen
        style={{
          backgroundColor: 'rgba(0,0,0,.5)',
          width: '100%',
          marginLeft: 0,
        }}>
        <Header />
        <Image source={IMAGES.ic_app} style={styles.icon} />
        <Text style={[styles.title, TEXT_SHADOW]}>LOGIN</Text>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          label="Email"
          containerStyle={styles.textInputContainer}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          label="Password"
          containerStyle={styles.textInputContainer}
        />
        <Button
          text={'LOGIN'}
          onPress={() => signIn(email, password)}
          containerStyle={styles.buttonContainer}
          textStyle={styles.buttoText}
        />
      </Screen>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  icon: {
    height: SIZE.x150,
    marginTop: SIZE.x20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  title: {
    fontSize: SIZE.x30,
    FONT_WEIGHT: FONT_WEIGHT.x700,
    color: COLORS.WHITE,
    marginTop: SIZE.x46,
    alignSelf: 'center',
  },
  textInputContainer: {
    marginTop: SIZE.x10,
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
  container: {
    flex: 1,
    // remove width and height to override fixed static size
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    margin: 0,
    padding: 0,
  },
});
