import React, { useContext, useState } from "react";
import styles from './InputPractice.module.css';
import { Formik, Form, useField } from 'formik';
import TextField from "../TextField/TextField";
import * as Yup from 'yup';
import { AuthContext } from "../../store/AuthStore";
import { TailSpin } from 'react-loader-spinner';

const InputPractice = () => {

    const ctx = useContext(AuthContext);
    // const [field, meta] = useField()

    const [registerOrLogin, setRegisterOrLogin] = useState(false);

    const [spinner, setSpinner] = useState(false);

    const formHeaderText = registerOrLogin ? <h1>Register</h1> : <h1>Login</h1>;
    const formButtonText = registerOrLogin ? <React.Fragment>Register</React.Fragment> : <React.Fragment>Login</React.Fragment>
    const switchFormText = registerOrLogin ? <React.Fragment>Already have an account ? Login here !</React.Fragment> : <React.Fragment>Don't have an account ? Register here !</React.Fragment>


    const registerOrLoginFormHandler = () => {

        setRegisterOrLogin(!registerOrLogin);

    }


    const validate = Yup.object({
        username: Yup.string().max(15, "Must be 15 characters or less").required('Required'),
        email: Yup.string().email("Email is Invalid").required('Email is required'),
        password: Yup.string().min(6, "Password must be at least 6 characters").required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required('Confirm password is required')
    })


    const loginValidate = Yup.object({
        email: Yup.string().email("Email is Invalid").required('Email is required'),
        password: Yup.string().min(6, "Password must be at least 6 characters").required('Password is required'),
    })


    const submitHandler = (values) => {

        if (!registerOrLogin) {
            setSpinner(true);
            ctx.login({ email: values.email, password: values.password }).then(() => { console.log("Success"); setSpinner(false); }).catch((err) => { console.log(err); setSpinner(false); });
        }

        else {
            setSpinner(true);
            ctx.register({ username: values.username, email: values.email, password: values.password }).then(() => { setRegisterOrLogin(false); setSpinner(false); }).catch((err) => { console.log(err); setSpinner(false); });
        }


    }

    const chooseValidationSchema = registerOrLogin ? validate : loginValidate;



    return (




        <Formik initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={chooseValidationSchema}
            onSubmit={submitHandler}
        >
            {formik => (

                spinner ? <div style={{ "width": "100%", "height": "100vh", "display": "flex", "justifyContent": "center", "alignItems": "center", }}><TailSpin

                    heigth={200}
                    width={200}
                    color="#24A19C"

                /></div> : <Form>
                    {formHeaderText}

                    {registerOrLogin && <TextField type="text" label="User Name" name="username" />}
                    <TextField type="text" label="Email Address" name="email" />
                    <TextField type="password" label="Password" name="password" />
                    {registerOrLogin && <TextField type="password" label="Confirm Password" name="confirmPassword" />}

                    <div className={styles.btn_container}>
                        <button type="submit" className={styles.btn_register}>{formButtonText}</button>
                        {/*<button type="button" className={styles.btn_reset}>Reset</button>*/}
                    </div>
                    {ctx.error && <p style={{ "color": "red", "fontWeight": "bold" }}>{ctx.error}</p>}
                    <p onClick={registerOrLoginFormHandler} className={styles.loginOrRegister}>{switchFormText}</p>


                </Form>
            )}

        </Formik>
    )

}


export default InputPractice;