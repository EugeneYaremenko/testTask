import {object, string} from 'yup';

const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,20}(\s*)?$/


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
    phone: string()
        .required("Phone number is required")
        .min(10, "Phone number should be of minimum 10 characters length")
        .max(20, "Phone number should be of maximum 20 characters length")
        .matches(phoneRegExp, "That doesn't look like a phone number"),

});