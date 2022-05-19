import {ChangeEvent, FC, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useFormik} from 'formik';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
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


const StyledTextField = styled(TextField)`
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
    font-family: 'Nunito', sans-serif;
  }
`;

const StyledFormControl = styled(FormControl)`
  & .MuiFormGroup-root {
    padding-bottom: 47px;
  }

  & .MuiFormLabel-root {
    padding-bottom: 11px;
    line-height: 26px;
    color: rgba(0, 0, 0, 0.87);
    text-align: left;
    font-family: 'Nunito', sans-serif;
  }

  & .MuiTypography-root {
    font-family: 'Nunito', sans-serif;
  }

  & .MuiFormLabel-root.Mui-focused {
    color: rgba(0, 0, 0, 0.87);
  }

,
`;


const SignUpForm: FC = () => {
    const dispatch = useAppDispatch();
    const {data, error, isLoading} = userAPI.useFetchUsersPositionsQuery();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [usersPositions, setUsersPositions] = useState<IUserPosition[] | []>([]);

    const {
        handleSubmit,
        values,
        handleChange,
        touched,
        errors,
        setValues,
    } = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            position: null,
            position_id: 0,
            photo: '',
        } as IInitialInputValues,
        validationSchema: signUpUserValidationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    useEffect(() => {
        data && setUsersPositions(prevState => {
            return [
                ...prevState,
                ...data.positions,
            ]
        });

        dispatch(setGlobalLoading(false));
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

    return (
        <section className={styles.signUpForm}>
            <h2 className={styles.signUpForm__title}>Working with POST request</h2>

            <form className={styles.signUpForm__body} onSubmit={handleSubmit}>
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

                <StyledFormControl error={isSubmit && errors.position !== ''}>
                    <FormLabel error={false}>Select your position</FormLabel>
                    <RadioGroup
                        onChange={setPositionValue}
                        value={values.position}
                    >
                        <FormControlLabel
                            value={UserPositions.LAWYER}
                            label={UserPositions.LAWYER}
                            control={<Radio color="secondary"/>}
                        />

                        <FormControlLabel
                            value={UserPositions.CONTENT_MANAGER}
                            label={UserPositions.CONTENT_MANAGER}
                            control={<Radio color="secondary"/>}
                        />

                        <FormControlLabel
                            value={UserPositions.SECURITY}
                            label={UserPositions.SECURITY}
                            control={<Radio color="secondary"/>}
                        />

                        <FormControlLabel
                            value={UserPositions.DESIGNER}
                            label={UserPositions.DESIGNER}
                            control={<Radio color="secondary"/>}
                        />

                        <FormHelperText>{errors.position}</FormHelperText>
                    </RadioGroup>
                </StyledFormControl>

                <label htmlFor="contained-button-file">
                    <Input
                        id="contained-button-file"
                        type="file"
                        placeholder='Upload your photo'/>
                </label>


                <Button onClick={() => setIsSubmit(true)} type="submit">Submit</Button>
            </form>
        </section>
    )
}

export default SignUpForm;