import { FieldValues, useForm } from "react-hook-form";
import { useFetch } from "./utils/useFetch";
import { useState } from "react";
import { AuthenticationAlert } from "../types/authenticationAlert.type";
import { Alert, CircularProgress } from "@mui/material";

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AuthenticationAlert>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onRegistrationSubmit = async (data: FieldValues) => {
    setLoading(true);
    const registrationResponse = await useFetch(
      "http://localhost:3000/api/signup",
      "POST",
      JSON.stringify(data)
    );
    setLoading(false);
    if (registrationResponse.errorMessage) {
      setAlert({ type: "error", text: registrationResponse.errorMessage });
    } else {
      setAlert({ type: "success", text: registrationResponse.successMessage });
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onRegistrationSubmit)}
        className="registrationForm"
      >
        <label>
          Username
          <input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should contain at least 5 characters.",
              },
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
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  "Password should contain at least 8 characters, one lowercase, on uppercase and a number.",
              },
            })}
            type="password"
          ></input>
          {errors.password && <span>{`${errors.password.message}`}</span>}
        </label>
        <label>
          Re-enter Password
          <input
            {...register("confirmPassword", {
              required: "Please re-enter your password.",
              validate: (value) =>
                value === getValues("password") || "Passwords must match",
            })}
            type="password"
          ></input>
          {errors.confirmPassword && (
            <span>{`${errors.confirmPassword.message}`}</span>
          )}
        </label>
        <button type="submit">Register</button>
      </form>
      {loading && <CircularProgress />}
      {alert && <Alert severity={alert.type}>{alert.text}</Alert>}
    </>
  );
}
