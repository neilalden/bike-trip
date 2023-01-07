/* eslint-disable prettier/prettier */
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {TEXT_SHADOW} from '../common/utils/styles';
import IMAGES from '../common/images';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {FONT_WEIGHT} from '../common/utils/font';
import {TextInput} from '../components/TextInput';
import {accountRegister} from '../functions/authentication/accountRegistration';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [name, setname] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();
  return (
    <ImageBackground source={IMAGES.ic_background} style={styles.container}>
      <Screen>
        <Header />

        <View
          style={{
            backgroundColor: 'rgba(255  ,255  ,255  ,.35)',
            width: SIZE.p90,
            paddingBottom: SIZE.x20,
            alignSelf: 'center',
          }}>
          <Image source={IMAGES.ic_app} style={styles.icon} />
          <Text style={[styles.title, TEXT_SHADOW]}>REGISTER</Text>
          <TextInput
            value={name}
            onChangeText={text => setname(text)}
            label="Name"
          />
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            label="Email"
            keyboardtype="email-address"
          />
          <TextInput
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            label="Phone number"
            keyboardtype="phone-pad"
          />
          <TextInput
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
            label="Password"
          />
          <TextInput
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            label="Confirm Password"
          />
          <Button
            text={'REGISTER'}
            containerStyle={styles.buttonContainer}
            onPress={() =>
              accountRegister(
                name,
                email,
                phoneNumber,
                password,
                confirmPassword,
              )
            }
          />
        </View>
      </Screen>
    </ImageBackground>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  icon: {
    height: SIZE.x150,
    marginTop: SIZE.x20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    // remove width and height to override fixed static size
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: SIZE.x30,
    FONT_WEIGHT: FONT_WEIGHT.x700,
    color: COLORS.BLUE,
    marginTop: SIZE.x20,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginVertical: SIZE.x30,
    width: SIZE.x300,
    alignSelf: 'center',
    backgroundColor: COLORS.BLUE,
  },
});
