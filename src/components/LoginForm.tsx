import { FieldValues, useForm } from "react-hook-form";
import { useFetch } from "./utils/useFetch";
import { useState } from "react";
import { AuthenticationAlert } from "../types/authenticationAlert.type";
import { Alert, CircularProgress } from "@mui/material";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AuthenticationAlert>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLoginSubmit = async (data: FieldValues) => {
    setLoading(true);
    const loginResponse = await useFetch(
      "http://localhost:3000/api/login",
      "POST",
      JSON.stringify(data)
    );

    if (loginResponse.token && loginResponse.user) {
      setLoading(false);
      setAlert({ type: "success", text: "Successful login, please wait!" });
      localStorage.setItem("token", loginResponse.token);
      localStorage.setItem("user", loginResponse.user);
      window.location.reload();
    } else {
      setLoading(false);
      setAlert({ type: "error", text: loginResponse.errorMessage });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onLoginSubmit)} className="loginForm">
        <label>
          Username
          <input
            {...register("username", {
              required: "Username is required.",
            })}
            type="text"
          ></input>
          {errors.username && <span>{`${errors.username.message}`}</span>}
        </label>
        <label>
          Password
          <input
            {...register("password", {
              required: "Password is required.",
            })}
            type="password"
          ></input>
          {errors.password && <span>{`${errors.password.message}`}</span>}
        </label>
        <button type="submit">Log in</button>
      </form>
      {loading && <CircularProgress />}
      {alert && <Alert severity={alert.type}>{alert.text}</Alert>}
    </>
  );
}
