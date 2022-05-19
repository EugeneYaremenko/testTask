import {object, string} from 'yup';

const phoneSubValidation = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,20}(\s*)?$/


export const signUpUserValidationSchema = object({
    name: string()
        .min(2, 'Name should be of minimum 2 characters length')
        .max(60, 'Name should be of maximum 60 characters length')
        .required('Name is required'),
    email: string()
        .email('Enter a valid email')
        .min(5, 'Email should be of minimum 5 characters length')
        .max(50, 'Email should be of maximum 50 characters length')
        .required('Email is required'),
    phone: string()
        .required("Phone number is required")
        .min(2, "Phone number should be of minimum 10 characters length")
        .max(100, "Phone number should be of maximum 20 characters length")
        .matches(phoneSubValidation, "That doesn't look like a phone number"),
    position: string()
        .nullable()
        .required("Please select position")
});