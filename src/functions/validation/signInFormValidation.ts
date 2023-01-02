import {validateEmail, validatePassword} from './stringValidation';

export const signInFormValidation = (email, password) => {
  const validatedEmail = validateEmail(email);
  const validatedPassword = validatePassword(password);
  if (!validatedEmail) {
    alert('Please enter a valid email');
    return false;
  }
  if (validatedPassword !== true) {
    alert(validatedPassword);
    return false;
  }
  return true;
};
