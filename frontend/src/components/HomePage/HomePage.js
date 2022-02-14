import { useContext } from "react";
import { AuthContext } from "../../store/AuthStore";
import styles from "./HomePage.module.css";



const HomePage = () => {

    const ctx = useContext(AuthContext);

    return (
        <h1 style={{ "textAlign": "center", "marginTop": "20vh" }}>{ctx.user ? `Hello ${ctx.user}` : "Login to see your username"}</h1>
    )

}


export default HomePage;