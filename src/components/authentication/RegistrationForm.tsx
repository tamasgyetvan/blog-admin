import { FieldValues, useForm } from "react-hook-form";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="registrationForm">
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
      <label>
        Re-enter Password:
        <input
          {...register("confirmPassword", {
            required: "Password is required.",
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
