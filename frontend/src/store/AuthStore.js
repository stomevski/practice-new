import { createContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';

export const AuthContext = createContext()


const AuthStore = (props) => {

    const navigate = useNavigate();


    const initialToken = localStorage.getItem("token");
    const initialRefreshToken = localStorage.getItem("refreshToken");
    const initialUser = localStorage.getItem("user");


    const [refreshToken, setRefreshToken] = useState(initialRefreshToken);
    const [token, setToken] = useState(initialToken);

    const isAuthenticated = Boolean(token);
    const [error, setError] = useState(null);

    // Show username of logged in user
    const [user, setUser] = useState(initialUser);

    //if we visit our page after the access token expired, but the refresh token is still valid
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        let refreshRate = 1000 * 60 * 60 * props.config.tokenRefreshTime;

        if (loading) {

            refresh();

        }

        let interval = setInterval(() => {

            if (token && refreshToken) {
                refresh();
            }

        }, refreshRate);

        return () => clearInterval(interval);


    }, [token, refreshToken]);




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

            localStorage.setItem("token", fetchedToken.token);
            localStorage.setItem("refreshToken", fetchedToken.refreshToken);
            localStorage.setItem("user", fetchedToken.username);

            setToken(fetchedToken.token);
            setRefreshToken(fetchedToken.refreshToken);
            setUser(fetchedToken.username);
            setError('');



            navigate("/");

        } else {
            const errorMessage = await result.json();

            setError(errorMessage.message);
        }



    }

    //### Logout ###
    const logout = async () => {

        const result = await fetch(props.config.logout, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: initialRefreshToken })

        })

        if (result.status === 200) {
            localStorage.clear();
            setRefreshToken(null);
            setToken(null);
            setUser(null);

            navigate("/");
        }

        const aws = await result.json()

        console.log(aws);

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

            await result.json();

            navigate('/login');

            setError('');

        } else {
            const errorMessage = await result.json();
            setError(errorMessage.message);
            throw new Error(errorMessage.message);
        }

        console.log(result);

    }

    //### Password Reset ###
    const passwordReset = async (data) => {

        const result = await fetch(props.config.passwordReset, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if (result.status === 401) {
            setError('You are not authorized');
        }
        else if (result.status === 400) {

            setError("Passwords dont match");

        }
        else {

            logout();
            setError('');

            navigate("/login");

        }
    }



    //### Refresh Token ###
    const refresh = async () => {

        console.log("REFRESH !!!");

        const result = await fetch(props.config.refresh, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: refreshToken })
        })

        if (result.status === 200) {

            const fetchedToken = await result.json();

            localStorage.setItem("token", fetchedToken.token);
            localStorage.setItem("refreshToken", fetchedToken.refreshToken);
            localStorage.setItem("user", fetchedToken.username);

            setToken(fetchedToken.token);
            setRefreshToken(fetchedToken.refreshToken);
            setUser(fetchedToken.username);
            setError('');
        } else {
            localStorage.clear();
            setToken(null);
            setRefreshToken(null);
            setUser(null);
            setError('');

        }

        if (loading) {
            setLoading(false);
        }

    }





    return (

        <AuthContext.Provider value={{ isAuthenticated, login, logout, error, register, passwordReset, user }}>
            {loading ? null : props.children}
        </AuthContext.Provider>

    )



}



export default AuthStore;