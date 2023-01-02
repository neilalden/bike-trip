/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import {MAPBOX_API_KEY} from '@env';
import Screen from '../components/Screen';
import Header from '../components/Header';
import {Button} from '../components/Buttons';
import {COLORS} from '../common/utils/colors';
import {DestinationsContext} from '../context/DestinationsContext';
import {lineString as makeLineString} from '@turf/helpers';
import {ROUTES} from '../common/routes';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {SIZE} from '../common/utils/size';
import {Difficulty} from '../common/constants/difficulty';
import {FONT_WEIGHT} from '../common/utils/font';
import IMAGES from '../common/images';
import Icon from '../components/Icon';
const directionsClient = MapboxDirectionsFactory({accessToken: MAPBOX_API_KEY});

const DestinationDetailsScreen = props => {
  const navigation = useNavigation();
  const params = props?.route?.params;
  const {
    tripStarted,
    startTrip,
    setDestination,
    setRoute,
    started,
    userLocation,
    setZoomLevel,
    destinationsImage,
  } = React.useContext(DestinationsContext);

  const [data, setData] = React.useState();
  useEffect(() => {
    (async () => {
      try {
        const distance = await getDistance(userLocation, params);
        setData(distance);
      } catch (e) {
        console.log(String(e));
      }
    })();
  }, []);

  const handlePress = () => {
    (async () => {
      try {
        if (started === false || userLocation === undefined) return;
        const reqOptions = {
          waypoints: [
            {coordinates: userLocation},
            {coordinates: params.coordinates},
            // {coordinates: [userLocation[0] + 0.002, userLocation[1] + 0.001]},
          ],
          profile: 'driving',
          geometries: 'geojson',
          annotations: ['duration', 'distance', 'speed', 'congestion'],
          overview: 'full',
          alternatives: true,
        };
        const res = await directionsClient.getDirections(reqOptions).send();
        const newRoute = makeLineString(
          res.body.routes[0].geometry.coordinates,
        );
        setRoute(newRoute);
      } catch (e) {
        console.error(e.body.message);
      }
    })();
    setDestination(params);
    setZoomLevel(16);
    startTrip();
    navigation.navigate(ROUTES.MAP_SCREEN);
  };

  const image =
    destinationsImage && destinationsImage[params.id]
      ? {uri: destinationsImage[params.id]}
      : IMAGES.ic_app;
  const stars = [];
  if (params?.rating) {
    for (let i = 0; i < params.rating.rate; i++) {
      stars.push(i);
    }
  }
  return (
    <React.Fragment>
      <Header />
      <Screen>
        <View style={styles.card}>
          <Image source={image} style={styles.cardImage} />
          <View style={styles.cardDescriptionContainer}>
            <Text style={styles.cardTitle}>{params.name}</Text>
            <View style={styles.ratingContainer}>
              {stars.map((_, i) => {
                return (
                  <Icon size={SIZE.x20} source={IMAGES.ic_star_fill} key={i} />
                );
              })}
            </View>
            {params.difficulty ? (
              <Text style={styles.difficultyText}>
                {Difficulty[params.difficulty]}
              </Text>
            ) : null}
            {data ? (
              <React.Fragment>
                <Text style={styles.difficultyText}>
                  {String((data.distance / 10).toFixed(2))} km away
                </Text>
                <Text style={styles.difficultyText}>
                  {String((data.duration / 10).toFixed(2))} minute ride
                </Text>
              </React.Fragment>
            ) : null}
          </View>
        </View>
      </Screen>
      {!tripStarted ? (
        <Button
          onPress={handlePress}
          text={'START TRIP'}
          textStyle={{color: COLORS.WHITE}}
          containerStyle={{backgroundColor: COLORS.BLUE}}
        />
      ) : null}
    </React.Fragment>
  );
};

export default DestinationDetailsScreen;

const styles = StyleSheet.create({
  textPrimaryTitle: {
    fontWeight: '900',
    color: COLORS.BLACK,
    fontSize: SIZE.x20,
  },
  textSecondaryTitle: {
    fontWeight: '600',
    color: COLORS.BLACK,
    fontSize: SIZE.x16,
  },
  card: {
    height: SIZE.x500,
    width: SIZE.p96,
    marginTop: SIZE.x10,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  cardImage: {
    height: SIZE.x150,
    width: SIZE.p100,
  },
  cardDescriptionContainer: {
    margin: SIZE.x10,
  },
  cardTitle: {
    fontSize: SIZE.x22,
    fontWeight: FONT_WEIGHT.x600,
    color: COLORS.BLACK,
  },
  ratingContainer: {
    marginTop: SIZE.x2,
    flexDirection: 'row',
  },
  difficultyText: {
    marginTop: SIZE.x2,
    fontSize: SIZE.x18,
    color: COLORS.BLACK,
  },
});

const getDistance = async (userLocation, destination) => {
  const reqOptions = {
    waypoints: [
      {coordinates: userLocation},
      {coordinates: destination.coordinates},
    ],
    profile: 'driving',
    geometries: 'geojson',
    annotations: ['duration', 'distance', 'speed', 'congestion'],
    overview: 'full',
    alternatives: true,
  };
  const res = await directionsClient.getDirections(reqOptions).send();
  const duration = res.body.routes[0].duration;
  const distance = res.body.routes[0].distance;
  const name = destination.name;
  return {
    name,
    coordinates: destination.coordinates,
    distance,
    duration,
  };
};
