import { FieldValues, useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const formData = JSON.stringify(data);
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: formData,
    })
      .then((result) => result.json())
      .then((info) => {
        console.log(info);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
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
