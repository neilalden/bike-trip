import React, {useState, createContext, useEffect} from 'react';
import {fetchImage} from '../functions/storage/fetchImage';
import {
  fetchCollection,
  fetchUser,
} from '../functions/database/fetchFromDatabase';

export const DestinationsContext = createContext<any>('Default Value');
const DestinationsContextProvider = props => {
  const [zoomLevel, setZoomLevel] = React.useState(10);
  const [userLocation, setUserLocation] = React.useState();
  const [destinations, setDestinations] = useState<Array<any>>();
  const [destinationsImage, setDestinationsImage] = useState<any>();
  const [tripStarted, setTripStarted] = useState<boolean>();
  const [route, setRoute] = useState<any>();
  const [destination, setDestination] = useState<any>();
  const [reviews, setReviews] = useState<any>();
  const [reviewers, setReviewers] = useState<any>();
  const [refresh, setRefresh] = useState<any>(false);
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
      try {
        const destinationsRes = await fetchCollection('Destinations');
        if (Array.isArray(destinationsRes)) {
          setDestinations(destinationsRes);
        }
        const reviewsRes = await fetchCollection('Reviews');
        if (Array.isArray(reviewsRes)) {
          setReviews(reviewsRes);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [refresh]);
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
  }, [destinations, refresh]);
  useEffect(() => {
    (async () => {
      if (reviews.length === 0) return;
      try {
        const arr: any = [];
        for (const review of reviews) {
          arr.push(await fetchUser(review.userID));
        }
        setReviewers(arr);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [reviews, refresh]);
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
        reviews,
        reviewers,
        setRefresh,
      }}>
      {props.children}
    </DestinationsContext.Provider>
  );
};

export default DestinationsContextProvider;
