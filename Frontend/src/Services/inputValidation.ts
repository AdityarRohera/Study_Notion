

export const signupValidation = ({
  firstName,
  lastName,
  email,
  createPassword,
  confirmPassword,
}: any): string | boolean => {
    console.log("Inside Signup validation")
  if (!firstName) return 'First name required';
  if (!lastName) return 'Last name required';
  if (!email) return 'Email required';
  if (!email.includes("@")) return 'Invalid Email';
  if (!createPassword) return 'Password required';
  if (!confirmPassword) return 'Confirm password required';
  if (createPassword !== confirmPassword) return 'Passwords do not match';

  return true;
};

export const signinValidation = ({
  email,
  password
}: any): string | boolean => {
    console.log("Inside Signup validation")
  if (!email) return 'Email required';
  if (!email.includes("@")) return 'Invalid Email';
  if (!password) return 'Password required';
  return true;
};