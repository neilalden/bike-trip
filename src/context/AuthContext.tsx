import React, {useState, createContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../common/routes';
import {fetchUser} from '../functions/database/fetchFromDatabase';
import {NavigationType, UserDataType} from '../common/utils/type';

export const AuthContext = createContext<any>('Default Value');
const AuthContextProvider = props => {
  const navigation: NavigationType = useNavigation();
  const [userAuth, setUserAuth] = useState(undefined);
  const [user, setUser] = useState<UserDataType | undefined>();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [reload]);

  const onAuthStateChanged = async userAuth => {
    if (userAuth) {
      const data = await fetchUser(userAuth.uid, 'Users');
      setUserAuth(userAuth);
      setUser(data);
      navigation.navigate(ROUTES.MAP_SCREEN);
    } else {
      setUserAuth(undefined);
      setUser(undefined);
      navigation.navigate(ROUTES.LANDING_SCREEN);
    }
  };

  return (
    <AuthContext.Provider value={{user, setUser, setReload}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
