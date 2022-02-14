import Header from "./components/Header/Header";
import InputPractice from "./components/InputPractice/InputPractice";
import AuthStore from "./store/AuthStore";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const App = () => {

  return (

    <AuthStore config={{ tokenRefreshTime: 23, login: "http://localhost:5000/api/v1/login", register: "http://localhost:5000/api/v1/register", passwordReset: "http://localhost:5000/api/v1/resetPassword", logout: "http://localhost:5000/api/v1/logout", refresh: "http://localhost:5000/api/v1/refreshToken" }}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<InputPractice />} />
        <Route path="/resetPassword" element={<ChangePassword />} />
      </Routes>
    </AuthStore>



  );
}

export default App;
