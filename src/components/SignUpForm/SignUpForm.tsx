import {FC} from "react";
import {useFormik} from 'formik';
// styles
import styles from './SignUpForm.module.scss';
// types
import {signUpUserValidationSchema} from '../../schema/validation';
// components
import {Button, TextField} from "@mui/material";


const SignUpForm: FC = () => {
    const formik = useFormik({
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
    const {handleSubmit, values, handleChange, touched, errors} = formik;


    return (
        <section className={styles.signUpForm}>
            <h2 className={styles.signUpForm__title}>Working with POST request</h2>

            <form onSubmit={handleSubmit}>
                <TextField
                    className={styles.signUpForm__name}
                    id="password"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                />

                <TextField
                    className={styles.signUpForm__email}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                />
                <TextField
                    className={styles.signUpForm__phone}
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={values.phone}
                    onChange={handleChange}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                />
                <Button type="submit">Submit</Button>
            </form>
        </section>
    )
}

export default SignUpForm;