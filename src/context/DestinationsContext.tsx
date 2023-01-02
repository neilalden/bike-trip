import React, {useState, createContext, useEffect} from 'react';
import {fetchImage} from '../functions/storage/fetchImage';
import {fetchCollection} from '../functions/database/fetchFromDatabase';

export const DestinationsContext = createContext<any>('Default Value');
const DestinationsContextProvider = props => {
  const [zoomLevel, setZoomLevel] = React.useState(10);
  const [userLocation, setUserLocation] = React.useState();
  const [destinations, setDestinations] = useState<Array<any>>();
  const [destinationsImage, setDestinationsImage] = useState<any>();
  const [tripStarted, setTripStarted] = useState<boolean>();
  const [route, setRoute] = useState<any>();
  const [destination, setDestination] = useState<any>();
  const startTrip = () => {
    setTripStarted(true);
  };
  const stopTrip = () => {
    setTripStarted(false);
    setDestination(undefined);
    setRoute(undefined);
  };
  useEffect(() => {
    (async () => {
      const collection = 'Destinations';
      const result = await fetchCollection(collection);
      if (Array.isArray(result)) {
        setDestinations(result);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        if (destinations && destinations.length > 0) {
          const images: Object = {};
          for (const destination of destinations) {
            if (destination.image) {
              images[`${String(destination.id)}`] = await fetchImage(
                `Destinations/${destination.image}`,
              );
            }
          }
          setDestinationsImage(images);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [destinations]);
  return (
    <DestinationsContext.Provider
      value={{
        tripStarted,
        destinations,
        destinationsImage,
        userLocation,
        setUserLocation,
        route,
        setRoute,
        destination,
        setDestination,
        startTrip,
        stopTrip,
        zoomLevel,
        setZoomLevel,
      }}>
      {props.children}
    </DestinationsContext.Provider>
  );
};

export default DestinationsContextProvider;
