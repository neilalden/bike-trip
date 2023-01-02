import MapboxGL from '@rnmapbox/maps';
import {Platform} from 'react-native';
export async function hasLocationPermission() {
  if (
    Platform.OS === 'web' ||
    Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)
  ) {
    return true;
  }
  const isGranted = await MapboxGL.requestAndroidLocationPermissions();
  return isGranted;
}
