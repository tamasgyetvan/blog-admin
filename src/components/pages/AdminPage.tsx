import { useContext, useState } from "react";
import { PostCard } from "../PostCard";
import "../../App.scss";
import "./AdminPage.scss";
import { DataContext } from "../../context/DataContext";
import { Navigate, useNavigate } from "react-router-dom";

export function AdminPage() {
  const { error, loading, data, removeBlogItem } = useContext(DataContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleDeleteRequest = async (id: string | undefined) => {
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
          removeBlogItem(id);
        }
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="postContainer">
        {data.length !== 0 ? (
          data.map((data) => {
            return (
              <PostCard
                handleUpdateClick={() => {
                  navigate(`/post/${data._id}`);
                }}
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
