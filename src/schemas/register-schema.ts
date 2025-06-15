import * as yup from 'yup';

const passwordRules = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/;

const registerSchema = yup.object({
  name: yup.string().required('Name is required!'),
  email: yup.string().email('Invalid email').required('Email is required!'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      passwordRules,
      'Password must be at least 6 characters, include 1 uppercase letter, 1 number, and 1 special character'
    ),
  confirmPassword: yup
    .string()
    .required('You must confirm your password first')
    .oneOf([yup.ref('password')], 'Password not confirmed')
});

export default registerSchema;
