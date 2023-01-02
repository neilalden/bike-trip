import firestore from '@react-native-firebase/firestore';
export const updateDatabase = async (collection, data, docID) => {
  if (!collection || !data || !docID) return 'error with params';
  try {
    const res = await firestore()
      .collection(collection)
      .doc(docID)
      .update(data)
      .then(() => 'Account successfully updated');
    return res;
  } catch (e) {
    console.error(e.message);
  }
};
