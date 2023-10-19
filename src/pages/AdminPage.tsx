import { useEffect, useState } from "react";
import { PostCard } from "../components/PostCard";
import "../App.scss";
import "./AdminPage.scss";

export function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [blogData, setBlogData] = useState([]);
  const token: string | null = localStorage.getItem("token");
  useEffect(() => {
    fetch("http://localhost:3000/api/queryposts", {
      mode: "cors",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.errorMessage) {
          setError(response.errorMessage);
          setLoading(false);
        } else {
          console.log(response);
          setBlogData(response);
          setLoading(false);
        }
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="postContainer">
      {blogData.map((data: any) => {
        return <PostCard data={data}></PostCard>;
      })}
    </div>
  );
}
