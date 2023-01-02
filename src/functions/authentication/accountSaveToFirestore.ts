import firestore from '@react-native-firebase/firestore';

export const accountSaveToFirestore = (uid, data, collection = 'Users') => {
  firestore()
    .collection(collection)
    .doc(uid)
    .set(data)
    .then(() => {
      alert('User account created & signed in!');
    })
    .catch(error => {
      alert(error.message);
    });
};
