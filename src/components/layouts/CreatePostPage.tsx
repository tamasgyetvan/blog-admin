import { useForm, FieldValues } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useContext, useState } from "react";
import "../../scss/layouts/CreatePostPage.scss";
import { DataContext } from "../../context/DataContext";
import { AuthenticationAlert } from "../../types/authenticationAlert.type";
import { Snackbar, Alert } from "@mui/material";

export function CreatePostPage() {
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<AuthenticationAlert>();
  const { addBlogItem } = useContext(DataContext);
  const [editorContent, setEditorContent] = useState({
    content: "",
  });

  const handleEditorChange = (content: any) => {
    setEditorContent({ content });
  };

  const onSubmit = async (data: FieldValues) => {
    const formData: object = {
      ...data,
      ...editorContent,
      user: localStorage.user,
    };
    fetch("http://localhost:3000/api/create_post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          setAlert({ type: "success", text: "Blogpost successfully created!" });
          setTimeout(() => {
            setOpen(false);
          }, 3000);
          addBlogItem(data.newPost);
        }
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <form className="createPostForm" onSubmit={handleSubmit(onSubmit)}>
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
          ></input>
          {errors.title && <span>{`${errors.title.message}`}</span>}
        </label>
        <Editor
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
        <button type="submit">Create Post</button>
      </form>
      <Snackbar open={open}>
        <Alert severity={alert?.type}>{alert?.text}</Alert>
      </Snackbar>
    </>
  );
}
