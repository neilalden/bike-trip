import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {DestinationsContext} from '../context/DestinationsContext';
import BottomNav from '../components/BottomNav';

const AccountScreen = () => {
  const {destinations, destinationsImage} =
    React.useContext(DestinationsContext);
  return (
    <React.Fragment>
      <Screen></Screen>
      <BottomNav />
    </React.Fragment>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
