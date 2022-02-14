import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../store/AuthStore";
import { TailSpin } from 'react-loader-spinner';

const Header = () => {

    const ctx = useContext(AuthContext);

    const [spinner, setSpinner] = useState(false);


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

            {spinner && <div style={{ "width": "100%", "height": "100vh", "display": "flex", "justifyContent": "center", "alignItems": "center", }}><TailSpin

                heigth="200"
                width="200"
                color="#24A19C"

            /></div>}
        </React.Fragment>
    )

}


export default Header;