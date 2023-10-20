import { useForm, FieldValues } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePostPage.scss";

export function CreatePostPage() {
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState({
    content: "",
  });

  const handleEditorChange = (content: any) => {
    setEditorContent({ content });
  };

  const onSubmit = async (data: FieldValues) => {
    const token: string | null = localStorage.getItem("token");
    const formData: object = {
      ...data,
      ...editorContent,
      user: localStorage.user,
    };
    const jsonData = JSON.stringify(formData);
    fetch("http://localhost:3000/api/create_post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errorMessage !== undefined) {
          console.log(data);
          alert(data.errorMessage);
        } else {
          alert(data.successMessage);
          navigate("/home");
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
                value: 25,
                message: "Title cannot be longer than 25 characters",
              },
            })}
            type="text"
          ></input>
          {errors.username && <span>{`${errors.username.message}`}</span>}
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
    </>
  );
}
