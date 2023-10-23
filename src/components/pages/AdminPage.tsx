import { useEffect, useState } from "react";
import { PostCard } from "../PostCard";
import "../../App.scss";
import "./AdminPage.scss";

type BlogPost = {
  _id: string;
  author: object;
  text: string;
  timestamp: string;
  title: string;
};

export function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [blogData, setBlogData] = useState<Array<BlogPost>>([]);
  const token: string | null = localStorage.getItem("token");

  const handleDeleteRequest = async (id: string) => {
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
          alert("Delete successful");
          setBlogData(blogData.filter((data) => data._id !== id));
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
    <>
      <div className="postContainer">
        {blogData.length !== 0 ? (
          blogData.map((data: BlogPost) => {
            return (
              <PostCard
                handleDeleteClick={() => {
                  handleDeleteRequest(data._id);
                }}
                key={data._id}
                data={data}
              ></PostCard>
            );
          })
        ) : (
          <p>No posts in DB</p>
        )}
      </div>
    </>
  );
}
