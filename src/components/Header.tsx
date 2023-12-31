import { useNavigate } from "react-router-dom";
import "../scss/components/Header.scss";

export function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <h1>blog.</h1>
      {localStorage.getItem("token") ? (
        <nav>
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/create_post")}>
            Create new blog post
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.reload();
            }}
            type="submit"
          >
            Log out
          </button>
        </nav>
      ) : null}
    </header>
  );
}
