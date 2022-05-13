import {FC} from "react";
import {useFormik} from 'formik';
// styles
import styles from './SignUpForm.module.scss';
import styled from 'styled-components';
// types
import {signUpUserValidationSchema} from '../../schema/validation';
// components
import {Button, TextField} from "@mui/material";


const StylesTextField = styled(TextField)`
  & {
    width: 328px;
    height: 54px;
  }

  & .MuiOutlinedInput-notchedOutline {
    bottom: 1px;
    top: -13px;
  }

  & .MuiFormHelperText-root {
    margin-top: 1px;
    margin-left: 15px;
    color: #7e7e7e;
    letter-spacing: 0;
    font-family: 'Nunito', sans-serif;;
  }
`;


const SignUpForm: FC = () => {
    const {
        handleSubmit,
        values,
        handleChange,
        touched,
        errors
    } = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
        },
        validationSchema: signUpUserValidationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });


    return (
        <section className={styles.signUpForm}>
            <h2 className={styles.signUpForm__title}>Working with POST request</h2>

            <form onSubmit={handleSubmit}>
                <StylesTextField
                    sx={{marginBottom: '50px'}}
                    className={styles.signUpForm__input}
                    id="password"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                />

                <StylesTextField
                    sx={{marginBottom: '50px'}}
                    className={styles.signUpForm__input}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                />
                <StylesTextField
                    sx={{marginBottom: '43px'}}
                    className={styles.signUpForm__input}
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={values.phone}
                    onChange={handleChange}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone || '+38 (XXX) XXX - XX - XX'}
                />
                <Button disabled={true} type="submit">Submit</Button>
            </form>
        </section>
    )
}

export default SignUpForm;