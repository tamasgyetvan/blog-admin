import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LoginForm({
  onLoginSubmit,
}: {
  onLoginSubmit: SubmitHandler<FieldValues>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onLoginSubmit)} className="loginForm">
      <label>
        Username:
        <input
          {...register("username", {
            required: "Username is required.",
          })}
          type="text"
        ></input>
        {errors.username && <span>{`${errors.username.message}`}</span>}
      </label>
      <label>
        Password:
        <input
          {...register("password", {
            required: "Password is required.",
          })}
          type="password"
        ></input>
        {errors.password && <span>{`${errors.password.message}`}</span>}
      </label>
      <button type="submit">Log in:</button>
    </form>
  );
}
