import auth from '@react-native-firebase/auth';
export const signOut = () => {
  auth()
    .signOut()
    .then(() => {})
    .catch(error => alert(error.code));
};
