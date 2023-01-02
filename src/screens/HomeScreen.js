import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {DestinationsContext} from '../context/DestinationsContext';
import Map from '../components/Map';
import BottomNav from '../components/BottomNav';
import {ButtonOutline} from '../components/Buttons';
import Screen from '../components/Screen';
import IMAGES from '../common/images';
import {SIZE} from '../common/utils/size';
import {COLORS} from '../common/utils/colors';
import {FONT_WEIGHT} from '../common/utils/font';
import Icon from '../components/Icon';
import {Difficulty} from '../common/constants/difficulty';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../common/routes';
const HomeScreen = () => {
  const {destinations, destinationsImage} =
    React.useContext(DestinationsContext);
  const navigation = useNavigation();
  const handlePress = destination => {
    navigation.navigate(ROUTES.DESTINATION_DETAILS_SCREEN, destination);
  };
  return (
    <React.Fragment>
      <Screen>
        {destinations &&
          destinations.map((destination, index) => {
            const image =
              destinationsImage && destinationsImage[destination.id]
                ? {uri: destinationsImage[destination.id]}
                : IMAGES.ic_app;
            const stars = [];
            if (destination?.rating) {
              for (let i = 0; i < destination.rating.rate; i++) {
                stars.push(i);
              }
            }
            return (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => handlePress(destination)}>
                <Image source={image} style={styles.cardImage} />
                <View style={styles.cardDescriptionContainer}>
                  <Text style={styles.cardTitle}>{destination.name}</Text>
                  <View style={styles.ratingContainer}>
                    {stars.map((_, i) => (
                      <Icon
                        size={SIZE.x20}
                        source={IMAGES.ic_star_fill}
                        key={i}
                      />
                    ))}
                  </View>
                  {destination.difficulty ? (
                    <Text style={styles.difficultyText}>
                      {Difficulty[destination.difficulty]}
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
      </Screen>
      <BottomNav />
    </React.Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  card: {
    height: SIZE.x250,
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