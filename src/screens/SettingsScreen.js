import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Screen from '../components/Screen';
import {DestinationsContext} from '../context/DestinationsContext';
import BottomNav from '../components/BottomNav';
import {Button, ButtonOutline} from '../components/Buttons';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {TextInput} from '../components/TextInput';
import {TEXT_SHADOW} from '../common/utils/styles';
import {FONT_WEIGHT} from '../common/utils/font';
import {createFromDatabase} from '../functions/database/createFromDatabase';
const SettingsScreen = () => {
  const {destinations, destinationsImage} =
    React.useContext(DestinationsContext);
  const [name, setName] = useState();
  const [brngy, setBrngy] = useState();
  const [city, setCity] = useState();
  const [recommended_bike, setRecommendedBike] = useState();
  const [near_by_to, setNearByTo] = useState();
  const handleSubmit = () => {
    const data = {name, brngy, city, recommended_bike, near_by_to};
    // createFromDatabase(data, 'Suggestions');
    console.log(data);
  };
  return (
    <React.Fragment>
      <Screen>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>SUGGEST DESTINATION</Text>
          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            label="Destination name"
          />
          <TextInput
            value={brngy}
            onChangeText={text => setBrngy(text)}
            label="Barangay"
          />

          <TextInput
            value={city}
            onChangeText={text => setCity(text)}
            label="City/Municipality"
          />

          <TextInput
            value={recommended_bike}
            onChangeText={text => setRecommendedBike(text)}
            label="Recommended Bike"
          />

          <TextInput
            value={near_by_to}
            onChangeText={text => setNearByTo(text)}
            label="Near by to"
          />

          <ButtonOutline
            text={'SUBMIT'}
            containerStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            onPress={handleSubmit}
          />
        </View>
        <Button
          text={'SIGN OUT'}
          containerStyle={{backgroundColor: COLORS.BLUE, margin: SIZE.x10}}
        />
      </Screen>
      <BottomNav />
    </React.Fragment>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  card: {margin: SIZE.x10},
  cardTitle: {
    fontSize: SIZE.x22,
    fontWeight: FONT_WEIGHT.x600,
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  buttonContainer: {
    borderColor: COLORS.BLUE,
    marginVertical: SIZE.x20,
  },
  buttonText: {
    color: COLORS.BLUE,
  },
});
