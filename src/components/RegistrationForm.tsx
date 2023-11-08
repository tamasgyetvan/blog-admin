import { FieldValues, useForm } from "react-hook-form";
import { useFetch } from "./hooks/useFetch";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onRegistrationSubmit = async (data: FieldValues) => {
    const registrationResponse = await useFetch(
      "http://localhost:3000/api/signup",
      "POST",
      JSON.stringify(data)
    );
    alert(Object.values(registrationResponse)[0]);
  };
  return (
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
              value: 4,
              message: "Username should contain at least 4 characters.",
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
  );
}
