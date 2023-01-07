import React, {useState, createContext, useEffect} from 'react';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import {MAPBOX_API_KEY} from '@env';
import {fetchImage} from '../functions/storage/fetchImage';
import {
  fetchCollection,
  fetchUser,
} from '../functions/database/fetchFromDatabase';
import {lineString as makeLineString} from '@turf/helpers';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../common/routes';
import {NavigationType} from '../common/utils/types';

const directionsClient = MapboxDirectionsFactory({accessToken: MAPBOX_API_KEY});
export const DestinationsContext = createContext<any>('Default Value');
const DestinationsContextProvider = props => {
  const [zoomLevel, setZoomLevel] = React.useState(13);
  const [userLocation, setUserLocation] = React.useState();
  const [destinations, setDestinations] = useState<Array<any>>();
  const [destinationsImage, setDestinationsImage] = useState<any>();
  const [tripStarted, setTripStarted] = useState<boolean>();
  const [route, setRoute] = useState<any>();
  const [destination, setDestination] = useState<any>();
  const [reviews, setReviews] = useState<any>();
  const [reviewers, setReviewers] = useState<any>();
  const [refresh, setRefresh] = useState<any>(false);
  const [segway, setSegway] = useState<Array<any>>([]);
  const [params, setParams] = useState<any>();
  const navigation: NavigationType = useNavigation();
  const startTrip = () => {
    setTripStarted(true);
  };
  const stopTrip = () => {
    setTripStarted(undefined);
    setDestination(undefined);
    setSegway([]);
    setParams(undefined);
    setRoute(undefined);
    setZoomLevel(13);
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
  useEffect(() => {
    (async () => {
      try {
        if (
          tripStarted === false ||
          userLocation === undefined ||
          params === undefined
        )
          return;
        const reqOptions = {
          waypoints: [
            {coordinates: userLocation},
            {coordinates: params.coordinates},
            ...segway,
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
        setDestination(params);
        setZoomLevel(15);
        startTrip();
        navigation.navigate(ROUTES.MAP_SCREEN);
      } catch (e) {
        console.error(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segway, params]);
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
        segway,
        setSegway,
        params,
        setParams,
      }}>
      {props.children}
    </DestinationsContext.Provider>
  );
};

export default DestinationsContextProvider;
