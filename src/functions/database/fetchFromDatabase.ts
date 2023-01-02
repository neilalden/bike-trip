import firestore from '@react-native-firebase/firestore';

export const fetchUser = async (id, collection): Promise<undefined | any> => {
  try {
    const res = await firestore().collection(collection).doc(id).get();
    const resData = res.data();
    if (resData !== undefined) {
      const userData: any = {
        createdAt: resData.createdAt.toDate(),
        email: resData.email,
        uid: resData.uid,
        name: resData.name,
        image: resData.image,
        contactNumber: resData.contactNumber,
        address: resData.address,
      };
      return userData;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchCollection = async collection => {
  try {
    const res = await firestore().collection(collection).get();
    const array: any = [];
    res.forEach(snapShot => array.push({...snapShot.data(), id: snapShot.id}));
    return array;
  } catch (error) {
    console.error(error.message);
  }
};
