import { useContext, useState } from "react";
import { PostCard } from "../PostCard";
import "../../scss/layouts/AdminPage.scss";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { useDeleteFetch } from "../utils/useDeleteFetch";
import { AuthenticationAlert } from "../../types/authenticationAlert.type";
import { Alert, Snackbar } from "@mui/material";

export function AdminPage() {
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<AuthenticationAlert>();
  const { error, loading, data, removeBlogItem } = useContext(DataContext);
  const navigate = useNavigate();

  const handleDeleteRequest = async (id: string | undefined) => {
    const deleteResponse = await useDeleteFetch(
      `http://localhost:3000/api/delete_post/${id}`,
      "DELETE"
    );
    if (deleteResponse.errorMessage) {
      console.log(deleteResponse);
      setOpen(true);
      setAlert({ type: "error", text: deleteResponse.errorMessage });
    } else {
      setOpen(true);
      removeBlogItem(id);
      setAlert({ type: "success", text: deleteResponse.successMessage });
      setTimeout(() => {
        setOpen(false);
      }, 3000);
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
          <p>There are no blogposts to show.</p>
        )}
      </div>
      <Snackbar open={open}>
        <Alert severity={alert?.type}>{alert?.text}</Alert>
      </Snackbar>
    </>
  );
}
