export default function LoginForm() {
  return (
    <form className="loginForm">
      <label>
        Username:
        <input type="text" name="username"></input>
      </label>
      <label>
        Password:
        <input type="password" name="password"></input>
      </label>
      <button type="submit">Log in:</button>
    </form>
  );
}
