import * as Yup from 'yup';

export const emailValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email adress!').required('Email is required'),
});

export const loginValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email adress!').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export const registrationValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email adress!').required('Email is required'),
    displayName: Yup.string().min(2, 'Display name must be at least 2 characters').required('Display name is required'),
    password: Yup.string().required('Password is required').matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Password must contain at least 1 uppercase letter, 1 number and be at least 8 characters long'
    ),
});


