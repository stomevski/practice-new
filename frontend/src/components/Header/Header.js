import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../store/AuthStore";
import useSpinner from "../../hooks/spinnerHook";

const Header = () => {

    const ctx = useContext(AuthContext);

    const { spinner, setSpinner, spinnerForm } = useSpinner();


    const logoutHandler = () => {
        setSpinner(true);
        ctx.logout().then(() => { setSpinner(false) }).catch((err) => { console.log(err); setSpinner(false) });

    }


    return (
        <React.Fragment>
            <header>
                <Link style={{ "textDecoration": "none", "color": "inherit" }} to="/"><h1>AuthApp</h1></Link>
                <div className={styles.user_nav}>
                    {!ctx.isAuthenticated && <Link style={{ "textDecoration": "none", "color": "inherit" }} to="/login"><p>Login</p></Link>}
                    {ctx.isAuthenticated && <p onClick={logoutHandler}>Logout</p>}
                    {ctx.isAuthenticated && <Link style={{ "textDecoration": "none", "color": "inherit" }} to="/resetPassword"><p>Change Password</p></Link>}
                </div>
            </header>

            {spinner && spinnerForm}

        </React.Fragment>
    )

}


export default Header;