import { Input } from "../core/Input";

export default function LoginForm() {
  return (
    <form className="loginForm">
      <Input
        type="text"
        name="username"
        label="Username:"
        required={true}
        /* errorMessage="Username should be 4-16 characters long."
        pattern="^[A-Za-z0-9{3-16}" */
      ></Input>
      <Input
        type="password"
        name="password"
        label="Password:"
        required={true}
        /* errorMessage=""
        pattern="" */
      ></Input>

      <button type="submit">Log in:</button>
    </form>
  );
}
