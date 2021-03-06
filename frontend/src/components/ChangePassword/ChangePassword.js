import React, { useContext, useState } from "react";
import styles from '../InputPractice/InputPractice.module.css';
import { Formik, Form, useField } from 'formik';
import TextField from "../TextField/TextField";
import * as Yup from 'yup';
import { AuthContext } from "../../store/AuthStore";
import useSpinner from "../../hooks/spinnerHook";

const ChangePassword = () => {

    const { spinner, setSpinner, spinnerForm } = useSpinner();

    const ctx = useContext(AuthContext);


    const validate = Yup.object({
        password: Yup.string().min(6, "Password must be at least 6 characters").required('Old Password is required'),
        newPassword: Yup.string().min(6, "Password must be at least 6 characters").required('New Password is required')
    })

    const submitHandler = (values) => {
        setSpinner(true);
        ctx.passwordReset({ password: values.password, newPassword: values.newPassword }).then(() => { setSpinner(false) }).catch((err) => { console.log(err); setSpinner(false) });

    }

    return (
        <Formik initialValues={{
            password: '',
            newPassword: ''
        }}
            validationSchema={validate}
            onSubmit={submitHandler}
        >
            {formik => (

                spinner ? spinnerForm :
                    <Form>
                        <h1>Reset Password</h1>
                        <TextField type="password" label="Old Password" name="password" />
                        <TextField type="password" label="New Password" name="newPassword" />

                        <div className={styles.btn_container}>
                            <button type="submit" className={styles.btn_register}>Change Password</button>
                        </div>
                        {ctx.error && <p style={{ "color": "red", "fontWeight": "bold" }}>{ctx.error}</p>}

                    </Form>
            )}

        </Formik>
    )

}


export default ChangePassword;