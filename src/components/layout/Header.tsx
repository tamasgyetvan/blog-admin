import { NavLink } from "react-router-dom";
import "./header.scss";

export function Header() {
  return (
    <header>
      <h1>blog.</h1>
      <nav>
        <NavLink to="/create_post">Create post</NavLink>
        <NavLink to="/edit_post">Edit post</NavLink>
        <NavLink to="/remove_post">Remove Post</NavLink>
        <button type="submit">Log out</button>
      </nav>
    </header>
  );
}
