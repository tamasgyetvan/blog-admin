import { useForm, FieldValues } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useContext, useState } from "react";
import "./CreatePostPage.scss";
import { DataContext } from "../../context/DataContext";

export function CreatePostPage() {
  const { addBlogItem } = useContext(DataContext);
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
          alert(data.errorMessage);
        } else {
          console.log(data.newPost);
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
                value: 30,
                message: "Title cannot be longer than 25 characters",
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
    </>
  );
}
