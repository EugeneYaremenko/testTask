import {mixed, object, string} from 'yup';

const phoneSubValidationRule = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,20}(\s*)?$/
const photoSupportedFormat = ["image/jpg", "image/jpeg"];

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
        .min(13, "Phone number should be of minimum 13 characters length")
        .max(13, "Phone number should be of maximum 13 characters length")
        .matches(phoneSubValidationRule, "That doesn't look like a phone number"),
    position: string()
        .required("Please select position"),
    photo: mixed()
        .nullable()
        .required("Photo is required")
        .test("PHOTO_SIZE",
            "Please upload a photo no larger than 5 MB",
            (value) => !value || (value && value.size <= 5242880))
        .test("PHOTO_FORMAT",
            "File does not support. You must use .jpg or .jpeg",
            (value) => !value || (value && photoSupportedFormat.includes(value?.type)))
});