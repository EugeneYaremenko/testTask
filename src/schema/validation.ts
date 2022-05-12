import {object, string, number} from 'yup';


export const signUpUserValidationSchema = object({
    name: string()
        .min(3, 'Name should be of minimum 3 characters length')
        .max(30, 'Name should be of maximum 30 characters length')
        .required('Name is required'),
    email: string()
        .email('Enter a valid email')
        .min(5, 'Email should be of minimum 5 characters length')
        .max(50, 'Email should be of maximum 50 characters length')
        .required('Email is required'),
    phone: number()
        .typeError("That doesn't look like a phone number")
        .positive("A Phone number can't start with a minus")
        .integer("A Phone number can't include a decimal point")
        .min(8, 'Phone number should be of minimum 8 characters length')
        .min(30, 'Phone number should be of maximum 30 characters length')
        .required('A Phone number is required'),
});