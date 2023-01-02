import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../common/utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import {SIZE} from '../common/utils/size';
import {FONT_WEIGHT} from '../common/utils/font';
import Icon from './Icon';
import {IMAGES} from '../common/images';
export const Button = ({
  containerStyle,
  textStyle,
  onPress,
  text,
  gradientColor = [],
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, containerStyle]}>
      {gradientColor.length > 0 ? (
        <LinearGradient colors={gradientColor} style={styles.linearGradient}>
          <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        </LinearGradient>
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
export const ButtonOutline = ({containerStyle, textStyle, onPress, text}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonOutlineContainer, containerStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export const SettingsButton = ({
  containerStyle,
  textStyle,
  onPress,
  text,
  iconEndStyle,
  iconStart,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[containerStyle]}>
        <View style={styles.start}>
          <Icon source={iconStart} size={SIZE.x18} />
        </View>
        <Text style={[textStyle]}>{text}</Text>
        <View style={[iconEndStyle]}>
          <Icon source={IMAGES.ic_proceed} size={SIZE.x18} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: SIZE.p100,
    width: SIZE.p100,
    flex: 1,
  },
  buttonContainer: {
    overflow: 'hidden',
    height: SIZE.x50,
    backgroundColor: COLORS.WHITE,
  },
  buttonText: {
    marginTop: SIZE.x12,
    alignSelf: 'center',
    color: COLORS.WHITE,
    fontWeight: FONT_WEIGHT.BOLD,
    fontSize: SIZE.x20,
  },
  buttonOutlineContainer: {
    overflow: 'hidden',
    height: SIZE.x50,
    backgroundColor: 'transparent',
    borderWidth: SIZE.x2,
    borderColor: COLORS.WHITE,
  },
});
