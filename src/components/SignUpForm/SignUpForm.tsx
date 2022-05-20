import {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import {useFormik} from 'formik';
import {toast} from "react-toastify";
// styles
import styles from './SignUpForm.module.scss';
import styled from 'styled-components';
// redux
import {userAPI} from "../../services/UserService";
import {setGlobalLoading} from "../../store/redux/reducers/GlobalSlice";
import {useAppDispatch} from "../../hooks/redux";
// types
import {signUpUserValidationSchema} from '../../schema/validation';
import {IInitialInputValues, IUserPosition, UserPositions} from "../../types";
// components
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";

const StyledTextField = styled(TextField)`
  & {
    width: 100%;
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
    font-family: 'Nunito', sans-serif;
  }
`;

const StyledFormControl = styled(FormControl)`
  & .MuiFormGroup-root {
    padding-bottom: 42px;
  }

  & .MuiFormLabel-root {
    line-height: 26px;
    color: rgba(0, 0, 0, 0.87);
    text-align: left;
    font-family: 'Nunito', sans-serif;
  }

  & .MuiRadio-root {
    padding-bottom: 1px;
  }

  & .MuiTypography-root {
    padding-top: 7px;
    font-family: 'Nunito', sans-serif;
  }

  & .MuiFormLabel-root.Mui-focused {
    color: rgba(0, 0, 0, 0.87);
  }

,
`;


const SignUpForm: FC = () => {
    const dispatch = useAppDispatch();
    const fileRef = useRef<any>(null);
    const [test, setTest] = useState<any>(null);
    const {data, error, isLoading} = userAPI.useFetchUsersPositionsQuery();
    const [usersPositions, setUsersPositions] = useState<IUserPosition[] | []>([]);

    const {
        handleSubmit,
        values,
        handleChange,
        touched,
        errors,
        setValues,
        setFieldValue,
        dirty
    } = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            position: '',
            position_id: 0,
            photo: '',
        } as IInitialInputValues,
        validationSchema: signUpUserValidationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values, actions) => {
            actions.validateForm(values)
                .then(() => setTest(values))
                .then(() => setTest(null))
                .then(() => toast.success('Sign up is successful!'))
                .catch(() => toast.error('Something went wrong please try again'));

            actions.resetForm();
        },
    });

    console.log(test)

    useEffect(() => {
        if (data) {
            const sortedUsersPositions = data?.positions.slice().sort((a, b) => a.id - b.id);

            setUsersPositions(prevState => {
                return [
                    ...prevState,
                    ...sortedUsersPositions,
                ]
            });

            dispatch(setGlobalLoading(false));
        }
    }, [data]);

    useEffect(() => {
        // @ts-ignore
        error && toast.error(error.error);
    }, [error]);

    useEffect(() => {
        dispatch(setGlobalLoading(isLoading));
    }, [isLoading]);

    const setPositionValue = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedPositionId: number =
            Number(usersPositions.find((item: IUserPosition) => item?.name === e.target.value)?.id);

        setValues({
            ...values,
            position: e.target.value,
            position_id: selectedPositionId,
        })
    }

    const uploadUserPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            setFieldValue('photo', e.target?.files[0])
        }
    }


    return (
        <section className={styles.signUpForm}>
            <h2 id="signUpForm" className={styles.signUpForm__title}>Working with POST request</h2>

            <form
                className={styles.signUpForm__body}
                onSubmit={handleSubmit}
            >
                <StyledTextField
                    sx={{marginBottom: '50px'}}
                    className={styles.signUpForm__input}
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                />

                <StyledTextField
                    sx={{marginBottom: '50px'}}
                    className={styles.signUpForm__input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                />
                <StyledTextField
                    sx={{marginBottom: '43px'}}
                    className={styles.signUpForm__input}
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={values.phone}
                    onChange={handleChange}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone || '+38 (XXX) XXX - XX - XX'}
                />

                <StyledFormControl error={touched.position && Boolean(errors.position)}>
                    <FormLabel error={false}>Select your position</FormLabel>
                    <RadioGroup
                        onChange={setPositionValue}
                        value={values.position}
                    >
                        {usersPositions.map(item => <FormControlLabel
                            key={item.id}
                            value={item.name}
                            label={item.name}
                            control={<Radio color="secondary"/>}
                        />)}
                        <FormHelperText>{errors.position}</FormHelperText>
                    </RadioGroup>
                </StyledFormControl>

                <div className={styles.upload}>
                    <input
                        id="upload_btn"
                        type="file"
                        onChange={uploadUserPhoto}
                        onClick={fileRef.current?.click()}
                    />

                    <label htmlFor="upload_btn">
                        <div className={styles.upload__button}>Upload</div>

                        <div className={styles.upload__placeholder} title={values.photo.name || ''}>
                            {values.photo.name ? values.photo.name : 'Upload your photo'}
                        </div>
                    </label>

                    <FormHelperText
                        className={styles.upload__errorText}
                        error={Boolean(errors.photo)}>{errors.photo}</FormHelperText>
                </div>


                <Button
                    type="submit"
                    disabled={!dirty}
                >
                    Sign up
                </Button>
            </form>
        </section>
    )
}

export default SignUpForm;