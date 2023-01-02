import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import IMAGES from '../common/images';
import Icon from './Icon';
import {ROUTES} from '../common/routes';
import {useNavigation, useRoute} from '@react-navigation/native';

const BottomNav = props => {
  const routeName = useRoute().name;
  const navigation = useNavigation();
  const handleOnPress = route => {
    navigation.navigate(route);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Icon
        onPress={() => handleOnPress(ROUTES.HOME_SCREEN)}
        size={SIZE.x40}
        containerStyle={[
          styles.icon_container,
          {marginVertical: SIZE.x14, marginLeft: SIZE.x14},
        ]}
        source={
          routeName === ROUTES.HOME_SCREEN
            ? IMAGES.ic_home_white
            : IMAGES.ic_home
        }
      />
      <Icon
        onPress={() => handleOnPress(ROUTES.MAP_SCREEN)}
        size={SIZE.x40}
        containerStyle={[styles.icon_container, {marginVertical: SIZE.x14}]}
        source={
          routeName === ROUTES.MAP_SCREEN ? IMAGES.ic_map_white : IMAGES.ic_map
        }
      />
      <Icon
        onPress={() => handleOnPress(ROUTES.ACCOUNT_SCREEN)}
        size={SIZE.x40}
        containerStyle={[
          styles.icon_container,
          {marginVertical: SIZE.x14, marginHorizontal: SIZE.x4},
        ]}
        source={
          routeName === ROUTES.ACCOUNT_SCREEN
            ? IMAGES.ic_account_white
            : IMAGES.ic_account
        }
      />
      <Icon
        onPress={() => handleOnPress(ROUTES.SETTINGS_SCREEN)}
        size={SIZE.x40}
        imageStyle={{resizeMode: 'contain'}}
        containerStyle={[
          styles.icon_container,
          {marginVertical: SIZE.x14, marginRight: SIZE.x14},
        ]}
        source={
          routeName === ROUTES.SETTINGS_SCREEN ||
          routeName === ROUTES.NOTIFICATION_SCREEN
            ? IMAGES.ic_settings_white
            : IMAGES.ic_settings
        }
      />
    </SafeAreaView>
  );
};
export default BottomNav;

const styles = StyleSheet.create({
  icon_container: {},
  container: {
    backgroundColor: COLORS.BLUE,
    height: SIZE.x80,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
