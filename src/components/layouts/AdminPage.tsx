import { useContext, useState } from "react";
import { PostCard } from "../PostCard";
import "../../scss/layouts/AdminPage.scss";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { useDeleteFetch } from "../hooks/useDeleteFetch";

export function AdminPage() {
  const { error, loading, data, removeBlogItem } = useContext(DataContext);
  const navigate = useNavigate();

  const handleDeleteRequest = async (id: string | undefined) => {
    console.log(id);
    const deleteResponse = await useDeleteFetch(
      `http://localhost:3000/api/delete_post/${id}`,
      "DELETE"
    );
    if (deleteResponse.errorMessage) {
      alert(deleteResponse.errorMessage);
    } else {
      alert("Delete successful");
      removeBlogItem(id);
    }
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
