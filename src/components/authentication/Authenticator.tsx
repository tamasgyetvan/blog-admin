import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import "./authenticator.scss";

export default function Authenticator() {
  const [toggler, setToggler] = useState("Login");

  const onLoginSubmit = async (data: FieldValues) => {
    const formData = JSON.stringify(data);
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.reload();
        } else {
          alert("Authentication failed!");
        }
      });
  };

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
      {toggler === "Login" ? (
        <LoginForm onLoginSubmit={onLoginSubmit} />
      ) : (
        <RegistrationForm />
      )}
    </div>
  );
}
