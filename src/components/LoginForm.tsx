import { FieldValues, useForm } from "react-hook-form";
import { useFetch } from "./hooks/useFetch";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLoginSubmit = async (data: FieldValues) => {
    const loginResponse = await useFetch(
      "http://localhost:3000/api/login",
      "POST",
      JSON.stringify(data)
    );

    if (loginResponse.token) {
      localStorage.setItem("token", loginResponse.token);
      localStorage.setItem("user", loginResponse.user);
      window.location.reload();
    } else {
      alert("Authentication failed!");
    }
  };
  return (
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
  );
}
