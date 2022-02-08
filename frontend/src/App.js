import React, { useContext, useState } from "react";
import InputPractice from "./components/InputPractice/InputPractice";
import AuthStore from "./store/AuthStore";


const App = () => {

  return (
    // <React.Fragment>
    //   <AuthStore config={{ login: "loginUrl", register: "registerUrl", passwordReset: "passwordResetUrl" }}>
    //     <h1>Hello</h1>
    //   </AuthStore>
    // </React.Fragment>

    <InputPractice />
  );
}

export default App;
