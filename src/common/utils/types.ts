export type VoidFunction = () => void;
export type ArgFunction = (arg?: any) => void;
import {StackNavigationProp} from '@react-navigation/stack';
export type RootStackParamList = {
  [key: string]: undefined;
};

export type UserDataType = {
  createdAt: Date;
  email: string;
  uid: string;
  name: string;
  plants?: Array<string>;
  [key: string]: any;
};
export type NavigationType = StackNavigationProp<RootStackParamList>;
