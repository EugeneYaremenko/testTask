import {ChangeEvent, FC, useCallback, useEffect, useRef, useState} from "react";
import {useFormik} from 'formik';
import {toast} from "react-toastify";
// styles
import styles from './SignUpForm.module.scss';
import styled from 'styled-components';
// redux
import {userAPI} from "../../store/redux/services/UserService";
import {setGlobalLoading, setUsersPage} from "../../store/redux/reducers/GlobalSlice";
import {useAppDispatch} from "../../hooks/redux";
// types
import {signUpUserValidationSchema} from '../../schema/validation';
import {
    IInitialInputValues,
    IUserPosition,
    IUserRegistrationRequest,
} from "../../types";
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
    const [userData, setUserData] = useState<IUserRegistrationRequest | null>(null);
    const {data, error: fetchUsersPositionsError, isLoading} = userAPI.useFetchUsersPositionsQuery();
    const {refetch} = userAPI.useFetchUsersQuery({page: 1, count: 6});
    const [registrationNewUser, {
        isLoading: createNewUserLoading,
        error: createNewUserError,
    }] = userAPI.useRegistrationNewUserMutation();
    const [usersPositions, setUsersPositions] = useState<IUserPosition[] | []>([]);


    const {
        handleSubmit,
        values,
        handleChange,
        touched,
        errors,
        setValues,
        setFieldValue,
        dirty,
        resetForm,
    } = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            position: '',
            position_id: 0,
            photo: null,
        } as IInitialInputValues,
        validationSchema: signUpUserValidationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values, actions) => {
            actions.validateForm(values)
                .then(() => setUserData({
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    position_id: Number(values.position_id),
                    photo: values.photo,
                }))
                .catch(() => toast.error('Something went wrong please try again'));
        },
    });


    const getUsersPositions = useCallback(() => {
        if (data) {
            const sortedUsersPositions = data?.positions.slice().sort((a: any, b: any) => a.id - b.id);

            setUsersPositions(prevState => {
                return [
                    ...prevState,
                    ...sortedUsersPositions,
                ]
            });
        }
    }, [data]);

    const setPositionValue = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedPositionId: number =
            Number(usersPositions.find((item: IUserPosition) => item?.name === e.target.value)?.id);

        setValues({
            ...values,
            position: e.target.value,
            position_id: selectedPositionId,
        })
    }

    const uploadUserPhoto = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFieldValue('photo', e.target?.files[0]);

            e.target.value = '';
        }
    }, [userData]);

    const addNewUser = useCallback(async () => {
        if (userData) {
            const {photo, position_id, phone, email, name} = userData;

            const userBodyData = new FormData();
            userBodyData.append('name', name);
            userBodyData.append('email', email);
            userBodyData.append('phone', phone);
            userBodyData.append('position_id', position_id.toString());
            userBodyData.append('photo', photo);


            try {
                const res = await registrationNewUser(userBodyData);

                if ('data' in res) {
                    toast.success('User successfully registered');
                    setUserData(null);
                    resetForm();
                    refetch();
                    dispatch(setUsersPage(1));
                    return res;
                }
            } catch (e: any) {
                console.error(e);

                if (e.message) {
                    toast.error(e.message);
                }

                toast.error(e);
            }
        }
    }, [userData]);


    useEffect(() => {
        getUsersPositions();

        dispatch(setGlobalLoading(false));
    }, [data]);

    useEffect(() => {
        dispatch(setGlobalLoading(false));

        if (fetchUsersPositionsError && 'data' in fetchUsersPositionsError) {
            console.error("fetchUsersPositionsError", fetchUsersPositionsError);
            toast.error(fetchUsersPositionsError.data.message);
        }

        if (createNewUserError && 'data' in createNewUserError) {
            console.error("createNewUserError", createNewUserError);
            toast.error(createNewUserError.data.message);
        }
    }, [fetchUsersPositionsError, createNewUserError]);

    useEffect(() => {
        if (isLoading) {
            dispatch(setGlobalLoading(isLoading));
        }

        if (createNewUserLoading) {
            dispatch(setGlobalLoading(createNewUserLoading));
        }
    }, [isLoading, createNewUserLoading]);

    useEffect(() => {
        addNewUser().catch(console.error);
    }, [userData]);


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
                        accept=".jpg, .jpeg"
                        onChange={uploadUserPhoto}
                        onClick={fileRef.current?.click()}
                    />

                    <label htmlFor="upload_btn">
                        <div className={styles.upload__button}>Upload</div>

                        <div className={styles.upload__placeholder} title={values.photo?.name || ''}>
                            {values.photo?.name ? values.photo?.name : 'Upload your photo'}
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