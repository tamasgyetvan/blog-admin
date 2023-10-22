import Authenticator from "../authentication/Authenticator";
import "./AuthenticationPage.scss";
import "../../App.scss";

export function AuthenticationPage() {
  return (
    <div className="authContainer">
      <Authenticator></Authenticator>
    </div>
  );
}
