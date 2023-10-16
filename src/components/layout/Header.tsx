import { NavLink, Navigate, redirect, useNavigate } from "react-router-dom";
import "./header.scss";

export function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <h1>blog.</h1>
      {localStorage.getItem("token") ? (
        <nav>
          <NavLink to="/create_post">Create post</NavLink>
          <NavLink to="/edit_post">Edit post</NavLink>
          <NavLink to="/remove_post">Remove Post</NavLink>
          <button
            onClick={() => {
              localStorage.removeItem("token");
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
