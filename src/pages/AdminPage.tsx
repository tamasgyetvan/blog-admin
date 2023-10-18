import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [blogData, setBlogData] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/api/get_posts", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => setBlogData(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  });
  if (error) return <p>Network error... please reload!</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <h2>Blog data will be rendered here...</h2>
    </>
  );
}
