import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {DestinationsContext} from '../context/DestinationsContext';
import BottomNav from '../components/BottomNav';
import {COLORS} from '../common/utils/colors';
import {SIZE, WINDOW_HEIGHT} from '../common/utils/size';
import {FONT_WEIGHT} from '../common/utils/font';
import {AuthContext} from '../context/AuthContext';
import {STARS} from '../common/constants/ratings';
import Icon from '../components/Icon';
import IMAGES from '../common/images';

const AccountScreen = () => {
  const {reviewers, reviews} = React.useContext(DestinationsContext);
  const {user} = React.useContext(AuthContext);
  return (
    <React.Fragment>
      <Screen>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{user.name}</Text>
          <Text style={styles.cardTitle}>
            Contact Number : {user.contactNumber ?? 'N/A'}
          </Text>
          {reviews.length > 0 ? (
            <ScrollView>
              <Text style={[styles.cardTitle, {marginVertical: SIZE.x10}]}>
                REVIEWS :
              </Text>
              {reviews.map((review, index) => {
                if (review.userID !== user.uid) return;
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
          ) : null}
        </View>
      </Screen>
      <BottomNav />
    </React.Fragment>
  );
};

export default AccountScreen;

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
    padding: SIZE.x10,
    height: WINDOW_HEIGHT * 0.8,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
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
});
