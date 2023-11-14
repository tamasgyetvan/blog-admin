import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { useForm, FieldValues } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import "../../scss/layouts/EditPostPage.scss";
import { SubmitBlogObject } from "../../types/submitBlogObject.type";
import { AuthenticationAlert } from "../../types/authenticationAlert.type";
import { Snackbar, Alert } from "@mui/material";

export function EditPostPage() {
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<AuthenticationAlert>();
  const { error, loading, data, renderTriggerer } = useContext(DataContext);
  const [editorContent, setEditorContent] = useState({
    content: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEditorChange = (content: any) => {
    setEditorContent({ content });
  };

  const onSubmit = async (data: FieldValues) => {
    const token: string | null = localStorage.getItem("token");
    const formData: SubmitBlogObject = {
      title: data.title,
      ...editorContent,
      user: localStorage.user,
    };
    fetch(`http://localhost:3000/api/post/${params.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errorMessage !== undefined) {
          setOpen(true);
          setAlert({ type: "error", text: data.errorMessage });
        } else {
          setOpen(true);
          setAlert({ type: "success", text: data.successMessage });
          setTimeout(() => {
            setOpen(false);
          }, 3000);
          renderTriggerer();
        }
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const postToEdit = data.filter((data) => data._id === params.id)[0];
  return (
    <>
      <form className="editPostForm" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title
          <input
            {...register("title", {
              required: "Title is required.",
              maxLength: {
                value: 50,
                message: "Title cannot be longer than 50 characters",
              },
            })}
            type="text"
            defaultValue={postToEdit.title}
          ></input>
          {errors.title && <span>{`${errors.title.message}`}</span>}
        </label>
        <Editor
          initialValue={postToEdit.text}
          onEditorChange={handleEditorChange}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button type="submit">Edit Post</button>
      </form>
      <Snackbar open={open}>
        <Alert severity={alert?.type}>{alert?.text}</Alert>
      </Snackbar>
      ;
    </>
  );
}
