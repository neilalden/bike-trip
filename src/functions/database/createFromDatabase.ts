import firestore from '@react-native-firebase/firestore';

export const createFromDatabase = (data, collection) => {
  firestore()
    .collection(collection)
    .add(data)
    .then(() => {
      alert('Success!');
    })
    .catch(error => {
      alert(error.message);
    });
};
