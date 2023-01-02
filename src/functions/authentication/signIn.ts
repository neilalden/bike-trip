import auth from '@react-native-firebase/auth';
import {signInFormValidation} from '../validation/signInFormValidation';
export const signIn = (email, password) => {
  if (!signInFormValidation(email, password)) return;
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch(error => {
      alert(error.message);
    });
};
