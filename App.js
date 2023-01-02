import React from 'react';
import {Text} from 'react-native';
import {hasLocationPermission} from './src/functions/utility/permissions';
import Navigation from './src/Navigation';
const App = () => {
  const [permission, setPermission] = React.useState();
  React.useEffect(() => {
    if (!permission) {
      const task = async () => {
        const per = await hasLocationPermission();
        setPermission(per);
      };
      task();
    }
  }, []);
  if (!permission) {
    return (
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: '#000',
        }}>
        Please allow location permission
      </Text>
    );
  }
  return <Navigation />;
};

export default App;
