import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {DestinationsContext} from '../context/DestinationsContext';
import BottomNav from '../components/BottomNav';
import {Button} from '../components/Buttons';
import Map from '../components/Map';
import {COLORS} from '../common/utils/colors';

const MapScreen = () => {
  const {tripStarted, stopTrip, destinations, destinationsImage} =
    React.useContext(DestinationsContext);
  return (
    <React.Fragment>
      <Map />
      {tripStarted === true ? (
        <Button
          onPress={stopTrip}
          text={'STOP TRIP'}
          textStyle={{color: COLORS.BLUE}}
          containerStyle={{backgroundColor: COLORS.WHITE}}
        />
      ) : null}
      <BottomNav />
    </React.Fragment>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
