import { useEffect, useState } from "react";
import { PostCard } from "../components/PostCard";
import "../App.scss";
import "./AdminPage.scss";

export function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [blogData, setBlogData] = useState([]);
  const token: string | null = localStorage.getItem("token");

  const handleDeleteClick = async (e: React.MouseEvent<HTMLElement>) => {
    const token: string | null = localStorage.getItem("token");
    const target = e.target as Element | null;
    const id: string | undefined = target?.closest(".postCard")?.id;
    fetch(`http://localhost:3000/api/delete_post/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errorMessage) {
          alert(data.errorMessage);
        } else {
          setBlogData(
            blogData.filter((blog: any) => {
              blog._id != id;
            })
          );
        }
      });
  };

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
  }, [blogData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return blogData.length !== 0 ? (
    blogData.map((data: any) => {
      return (
        <PostCard
          handleDeleteClick={handleDeleteClick}
          key={data._id}
          data={data}
        ></PostCard>
      );
    })
  ) : (
    <p>No posts in DB</p>
  );
}
