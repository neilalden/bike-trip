/* eslint-disable react-hooks/exhaustive-deps */
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import {MAPBOX_API_KEY} from '@env';
import Screen from '../components/Screen';
import Header from '../components/Header';
import {Button, ButtonOutline} from '../components/Buttons';
import {COLORS} from '../common/utils/colors';
import {DestinationsContext} from '../context/DestinationsContext';
import {lineString as makeLineString} from '@turf/helpers';
import {ROUTES} from '../common/routes';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {SIZE, WINDOW_HEIGHT} from '../common/utils/size';
import {Difficulty} from '../common/constants/difficulty';
import {FONT_WEIGHT} from '../common/utils/font';
import IMAGES from '../common/images';
import Icon from '../components/Icon';
import {STARS} from '../common/constants/ratings';
import {TextInput} from '../components/TextInput';
import {updateDatabase} from '../functions/database/updateDatabase';
import {createFromDatabase} from '../functions/database/createFromDatabase';
import {AuthContext} from '../context/AuthContext';
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
    reviews,
    setRefresh,
    segway,
    setParams,
  } = React.useContext(DestinationsContext);
  const {user} = React.useContext(AuthContext);

  const [data, setData] = React.useState();
  const [review, setReview] = React.useState('');
  const [rate, setRate] = React.useState();
  useEffect(() => {
    (async () => {
      try {
        const distance = await getDistance(userLocation, params);
        setData(distance);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  const handleSubmit = async () => {
    const numRate = Number(rate);
    if (typeof numRate === 'number') {
      if (numRate > 0 && numRate <= 5) {
        const currentRate = params.rating.rate ?? 0;
        let currentRateBy = params.rating.rateBy ?? 0;
        currentRateBy += 1;
        const updateData = {
          rate: Math.round((currentRate + numRate) / currentRateBy),
          rateBy: currentRateBy,
        };
        alert(await updateDatabase('Destinations', updateData, params.id));
        const reviewData = {
          destinationID: params.id,
          rate: numRate,
          review: review,
          userID: user.uid,
        };
        createFromDatabase(reviewData, 'Reviews');
        setReview('');
        setRate();
        setRefresh(prev => !prev);
      } else {
        alert('rating has to be between 1-5');
      }
    } else {
      alert('rating is not a number');
    }
  };
  const handlePress = () => {
    setParams(params);
    return;
    // (async () => {
    //   try {
    //     if (started === false || userLocation === undefined) return;
    //     const reqOptions = {
    //       waypoints: [
    //         {coordinates: userLocation},
    //         {coordinates: params.coordinates},
    //         ...segway,
    //       ],
    //       profile: 'driving',
    //       geometries: 'geojson',
    //       annotations: ['duration', 'distance', 'speed', 'congestion'],
    //       overview: 'full',
    //       alternatives: true,
    //     };
    //     const res = await directionsClient.getDirections(reqOptions).send();
    //     const newRoute = makeLineString(
    //       res.body.routes[0].geometry.coordinates,
    //     );
    //     setRoute(newRoute);
    //   } catch (e) {
    //     console.error(e.body.message);
    //   }
    // })();
    // setDestination(params);
    // setZoomLevel(16);
    // setParams(params);
    // startTrip();
    // navigation.navigate(ROUTES.MAP_SCREEN);
  };

  const image =
    destinationsImage && destinationsImage[params.id]
      ? {uri: destinationsImage[params.id]}
      : IMAGES.ic_app;
  return (
    <React.Fragment>
      <Header />
      <Screen>
        <View style={styles.card}>
          <Image source={image} style={styles.cardImage} />
          <View style={styles.cardDescriptionContainer}>
            <Text style={styles.cardTitle}>{params.name}</Text>
            <View style={styles.flexRow}>
              <View style={styles.ratingContainer}>
                {params?.rating &&
                  STARS.map((_, i) => {
                    if (i < params.rating.rate) {
                      return (
                        <Icon
                          size={SIZE.x20}
                          source={IMAGES.ic_star_fill}
                          key={i}
                        />
                      );
                    } else {
                      return (
                        <Icon size={SIZE.x20} source={IMAGES.ic_star} key={i} />
                      );
                    }
                  })}
              </View>
              {params.difficulty ? (
                <Text style={styles.difficultyText}>
                  {Difficulty[params.difficulty]}
                </Text>
              ) : null}
            </View>
            {data ? (
              <View style={styles.flexRow}>
                <Text style={styles.textPrimaryTitle}>
                  {String((data.distance / 1000).toFixed(2))} km away
                </Text>
                <Text style={styles.textPrimaryTitle}>
                  {String((data.duration / 60).toFixed(2))} minute ride
                </Text>
              </View>
            ) : null}
            <View style={styles.flexRow}>
              <Text style={styles.textPrimaryTitle}>
                Recommended bike :{' '}
                {params.recommended_bike ? params.recommended_bike : 'N/A'}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.textPrimaryTitle}>
                Near by to :{' '}
                {params.near_by_to
                  ? String(params.near_by_to).replaceAll(',', ', ')
                  : 'N/A'}
              </Text>
            </View>
          </View>
          {reviews.length > 0 ? (
            <React.Fragment>
              <Text style={[styles.cardTitle, {margin: SIZE.x10}]}>
                REVIEWS
              </Text>
              <ScrollView>
                {reviews.map((review, index) => {
                  if (review.destinationID !== params.id) return;
                  return (
                    <ScrollView key={index} style={styles.reviewCard}>
                      <View style={styles.ratingContainer}>
                        {STARS.map((_, i) => {
                          if (i < review.rate) {
                            return (
                              <Icon
                                size={SIZE.x20}
                                source={IMAGES.ic_star_fill}
                                key={i}
                              />
                            );
                          } else {
                            return (
                              <Icon
                                size={SIZE.x20}
                                source={IMAGES.ic_star}
                                key={i}
                              />
                            );
                          }
                        })}
                      </View>
                      <Text style={styles.textSecondaryTitle}>
                        {review.review}
                      </Text>
                    </ScrollView>
                  );
                })}
              </ScrollView>
            </React.Fragment>
          ) : null}
        </View>
        <View style={styles.writeReviewCard}>
          <Text style={styles.writeReviewCardTitle}>WRITE REVIEW</Text>
          <TextInput
            value={review}
            onChangeText={text => setReview(text)}
            label="Review"
          />
          <TextInput
            value={rate}
            onChangeText={text => setRate(text)}
            label="Rate from 1-5"
            keyboardType="number-pad"
          />
          <ButtonOutline
            text={'SUBMIT'}
            containerStyle={styles.writeReviewButtonContainer}
            textStyle={styles.writeReviewButtonText}
            onPress={handleSubmit}
          />
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

const styles = StyleSheet.create({
  textPrimaryTitle: {
    color: COLORS.BLACK,
    fontSize: SIZE.x20,
  },
  textSecondaryTitle: {
    fontWeight: '600',
    color: COLORS.BLACK,
    fontSize: SIZE.x16,
  },
  card: {
    width: SIZE.p96,
    margin: SIZE.x10,
    minHeight: WINDOW_HEIGHT * 0.8,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    overflow: 'hidden',
  },
  cardImage: {
    height: SIZE.x200,
    width: SIZE.p150,
    alignSelf: 'center',
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
    marginTop: SIZE.x4,
    flexDirection: 'row',
  },
  difficultyText: {
    marginTop: SIZE.x4,
    fontSize: SIZE.x18,
    color: COLORS.BLACK,
    fontWeight: FONT_WEIGHT.x600,
  },
  flexRow: {
    marginTop: SIZE.x4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewCard: {
    width: SIZE.p96,
    margin: SIZE.x10,
    padding: SIZE.x10,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    maxHeight: SIZE.x200,
    minHeight: SIZE.x50,
  },
  writeReviewCard: {
    width: SIZE.p96,
    margin: SIZE.x10,
    padding: SIZE.x10,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    height: SIZE.x300,
  },
  writeReviewCardTitle: {
    fontSize: SIZE.x22,
    fontWeight: FONT_WEIGHT.x600,
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  writeReviewButtonContainer: {
    borderColor: COLORS.BLUE,
    marginVertical: SIZE.x20,
  },
  writeReviewButtonText: {
    color: COLORS.BLUE,
  },
});
