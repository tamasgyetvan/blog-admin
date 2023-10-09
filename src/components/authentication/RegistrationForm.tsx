export default function RegistrationForm() {
  return (
    <form className="registrationForm">
      <label>
        Username:
        <input type="text" name="username" id="" />
      </label>
      <label>
        Password:
        <input type="password" name="password" id="asd" />
      </label>
      <label>
        Re-enter password:
        <input type="password" name="password" id="" />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
