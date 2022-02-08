import React from "react";
import styles from './InputPractice.module.css';
import { Formik, Form, useField } from 'formik';
import TextField from "../TextField/TextField";
import * as Yup from 'yup';

const InputPractice = () => {
    // const [field, meta] = useField()
    const validate = Yup.object({
        firstName: Yup.string().max(15, "Must be 15 characters or less").required('Required'),
        lastName: Yup.string().max(20, "Must be 20 characters or less").required('Required'),
        email: Yup.string().email("Email is Invalid").required('Email is required'),
        password: Yup.string().min(6, "Password must be at least 6 characters").required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required('Confirm password is required')
    })

    const submitHandler = (e) => {

        e.preventDefault();

    }

    return (
        <Formik initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }}
            validationSchema={validate}
            onSubmit={submitHandler}
        >
            {formik => (

                <Form>
                    <h1>Sign Up</h1>

                    <TextField type="text" label="First Name" name="firstName" />
                    <TextField type="text" label="Last Name" name="lastName" />
                    <TextField type="text" label="Email Address" name="email" />
                    <TextField type="password" label="Password" name="password" />
                    <TextField type="password" label="Confirm Password" name="confirmPassword" />

                    <div className={styles.btn_container}>
                        <button className={styles.btn_register}>Register</button>
                        <button type="button" className={styles.btn_reset}>Reset</button>
                    </div>

                </Form>
            )}

        </Formik>
    )

}


export default InputPractice;