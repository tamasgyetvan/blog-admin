import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import "./authenticator.scss";

export default function Authenticator() {
  const [toggler, setToggler] = useState("Login");

  return (
    <div className="authenticator">
      <div className="typeToggler">
        <button
          className={toggler === "Login" ? "active" : "passive"}
          onClick={() => {
            setToggler("Login");
          }}
        >
          Login
        </button>
        <button
          className={toggler === "Register" ? "active" : "passive"}
          onClick={() => {
            setToggler("Register");
          }}
        >
          Register
        </button>
      </div>
      {toggler === "Login" ? <LoginForm /> : <RegistrationForm />}
    </div>
  );
}
