import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../common/utils/size';
import {IMAGES} from '../common/images';

const Icon = props => {
  const source = props?.source ?? IMAGES.ic_app;
  const containerStyle = props?.containerStyle;
  const size = props?.size ?? SIZE.x20;
  const onPress = props?.onPress;
  const imageStyle = {
    ...props?.imageStyle,
    height: size,
    width: size,
    alignSelf: 'center',
    resizeMode: props?.imageStyle?.resizeMode ?? 'contain',
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.5 : 1}
      style={[
        styles.icon_container,
        {height: size, width: size},
        containerStyle,
      ]}>
      <Image source={source} style={imageStyle} />
    </TouchableOpacity>
  );
};

export default Icon;

const styles = StyleSheet.create({
  icon_container: {},
  icon: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
