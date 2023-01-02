import {StyleSheet, View} from 'react-native';
import React from 'react';
import {MAPBOX_API_KEY} from '@env';
import MapboxGL from '@rnmapbox/maps';
import {COLORS} from '../common/utils/colors';
const accessToken = MAPBOX_API_KEY;
MapboxGL.setAccessToken(accessToken);

export const renderDestinationPoint = (started, destination) => {
  return destination && started === true ? (
    <MapboxGL.PointAnnotation
      id="destination"
      title="destination location"
      coordinate={destination}>
      <View style={styles.circle}>
        <View style={styles.innerCircle}>
          <View style={styles.dotCircle} />
        </View>
      </View>
    </MapboxGL.PointAnnotation>
  ) : null;
};

export const renderStart = (started, userLocation) => {
  return userLocation && started === true ? (
    <MapboxGL.PointAnnotation
      id="start"
      title="start location"
      coordinate={userLocation}>
      <View style={styles.circle}>
        <View style={styles.innerCircle}>
          <View style={styles.dotCircle} />
        </View>
      </View>
    </MapboxGL.PointAnnotation>
  ) : null;
};

export const renderRoute = route => {
  return route !== undefined ? (
    <MapboxGL.ShapeSource id="routeSource" shape={route}>
      <MapboxGL.LineLayer id="routeFill" style={layerStyles.route} />
    </MapboxGL.ShapeSource>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, .5)',
    height: '100%',
    width: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startRouteButton: {
    alignItems: 'center',
    zIndex: 8,
    top: 8,
    backgroundColor: 'red',
  },
  text: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(68, 154, 235, .2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(68, 154, 235, 1)',
  },
});

const layerStyles = {
  route: {
    lineColor: COLORS.BLUE,
    lineCap: MapboxGL.LineJoin.Round,
    lineWidth: 5,
    lineOpacity: 0.84,
  },
};
