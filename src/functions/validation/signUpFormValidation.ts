import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validatename,
} from './stringValidation';

export const signUpFormValidation = (
  name,
  email,
  password,
  confirmPassword,
) => {
  const valdiatedname = validatename(name);
  const validatedEmail = validateEmail(email);
  const validatedPassword = validatePassword(password);
  const validatedConfirmPassword = validateConfirmPassword(
    password,
    confirmPassword,
  );
  if (valdiatedname !== true) {
    alert(valdiatedname);
    return false;
  }
  if (!validatedEmail) {
    alert('Please enter a valid email');
    return false;
  }
  if (validatedPassword !== true) {
    alert(validatedPassword);
    return false;
  }
  if (validatedConfirmPassword !== true) {
    alert(validatedConfirmPassword);
    return false;
  }
  return true;
};
