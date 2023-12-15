import React from "react";
import "./App.css";

import FormikContainer from "./components/FormikContainer";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import EnrollmentForm from "./components/EnrollmentForm";

import { ChakraProvider, theme as chakraTheme } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider theme={chakraTheme}>
      <div className="App">
        {/* <FormikContainer /> */}
        <LoginForm />
        {/* <RegistrationForm /> */}
        {/* <EnrollmentForm /> */}
      </div>
    </ChakraProvider>
  );
}

export default App;
