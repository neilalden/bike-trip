import {StyleSheet, SafeAreaView, ViewStyle, ScrollView} from 'react-native';
import React from 'react';
import {SIZE} from '../common/utils/size';
type Props = {
  style?: ViewStyle;
  children?: React.ReactNode;
};
const Screen = ({style, children}: Props) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
