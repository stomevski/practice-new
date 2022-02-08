import { createContext, useState } from 'react';

export const AuthContext = createContext()


const AuthStore = (props) => {

    const [token, setToken] = useState('');
    const isAuthenticated = Boolean(token);
    const [error, setError] = useState('');



    //### Login ###
    const login = async (data) => {



        const result = await fetch(props.config.login, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (result.status === 200) {

            const fetchedToken = await result.json();

            setToken(fetchedToken);
            setError('');

        } else {
            const errorMessage = await result.json();
            setError(errorMessage.message);
        }

        console.log(result);

    }

    //### Logout ###
    const logout = () => {

        setToken('');
    }

    //### Register ###
    const register = async (data) => {


        const result = await fetch(props.config.register, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (result.status === 201) {

            const fetchedToken = await result.json();

            setToken(fetchedToken);
            setError('');

        } else {
            const errorMessage = await result.json();
            setError(errorMessage.message);
        }

        console.log(result);

    }

    //### Password Reset ###
    const passwordReset = async (data) => {

        const result = await fetch(props.config.passwordReset, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if (result.status === 401) {
            setError('You are not authorized');
        } else {

            setError('');

        }
    }




    return (

        <AuthContext.Provider value={{ isAuthenticated, login, logout, error, register, passwordReset }}>
            {props.children}
        </AuthContext.Provider>

    )



}



export default AuthStore;