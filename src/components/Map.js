/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import IMAGES from '../../src/common/images';
import {MAPBOX_API_KEY} from '@env';
import {DestinationsContext} from '../context/DestinationsContext';
import Icon from './Icon';
import {SIZE} from '../common/utils/size';
import {COLORS} from '../common/utils/colors';
import {renderDestinationPoint, renderRoute, renderStart} from './Path';
MapboxGL.setAccessToken(MAPBOX_API_KEY);

const App = () => {
  const {
    route,
    destination,
    tripStarted,
    destinations,
    destinationsImage,
    userLocation,
    setUserLocation,
    zoomLevel,
  } = React.useContext(DestinationsContext);
  const CameraRef = React.useRef(null);

  const onUserLocationUpdate = loc => {
    setUserLocation([loc.coords.longitude, loc.coords.latitude]);
  };
  function CenterCamera(location) {
    if (CameraRef.current) {
      CameraRef.current.setCamera({
        centerCoordinate: location,
        zoomLevel: zoomLevel,
        animationDuration: 1000,
      });
    }
  }
  return (
    <SafeAreaView style={styles.page}>
      <MapboxGL.MapView
        style={styles.map}
        zoomEnabled={true}
        scrollEnabled={true}
        showUserLocation={true}
        compassEnabled={true}
        scaleBarEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
        styleURL={MapboxGL.StyleURL.TrafficNight}>
        <MapboxGL.Camera
          centerCoordinate={userLocation}
          ref={ref => {
            CameraRef.current = ref;
            CenterCamera(userLocation);
          }}
        />

        <MapboxGL.UserLocation
          visible={true}
          showsUserHeadingIndicator={true}
          androidRenderMode="gps"
          minDisplacement={8}
          onUpdate={_newUserLocation => {
            onUserLocationUpdate(_newUserLocation);
            // setUserLocation([121.2185, 14.178]);
          }}>
          <MapboxGL.SymbolLayer
            id={'index'}
            style={{
              iconImage: IMAGES.ic_person,
              iconRotationAlignment: 'map',
              iconAllowOverlap: true,
              iconSize: 0.25,
            }}
          />
        </MapboxGL.UserLocation>

        {destinations &&
          destinations.map((_destination, index) => {
            const image =
              destinationsImage && destinationsImage[_destination.id]
                ? {uri: destinationsImage[_destination.id]}
                : IMAGES.ic_app;
            return (
              <MapboxGL.MarkerView
                key={String(index)}
                coordinate={_destination.coordinates}>
                <Icon
                  source={image}
                  size={SIZE.x125}
                  imageStyle={{
                    borderWidth: SIZE.x4,
                    borderRadius: SIZE.x4,
                    borderColor: COLORS.BLUE,
                    resizeMode: 'cover',
                  }}
                />
              </MapboxGL.MarkerView>
            );
          })}
        {renderRoute(route)}
        {renderDestinationPoint(destination, tripStarted)}
        {renderStart(userLocation, tripStarted)}
      </MapboxGL.MapView>
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  container: {
    height: '50%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  markerContainer: {
    alignItems: 'center',
  },
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 5,
    circlePitchAlignment: 'map',
  },
  clusteredPoints: {},
  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
  },
  circleLayer: {
    circlePitchAlignment: 'map',
    circleColor: '#A59ADD',
    circleRadius: [
      'step',
      ['get', 'point_count'],
      20,
      100,
      25,
      250,
      30,
      750,
      40,
    ],
    circleOpacity: 0.84,
    circleStrokeWidth: 0,
    circleStrokeColor: 'blue',
  },
});
