import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { useForm, FieldValues } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import "../../scss/layouts/EditPostPage.scss";
import { SubmitBlogObject } from "../../types/submitBlogObject.type";

export function EditPostPage() {
  const params = useParams();
  const { error, loading, data, updateBlogItem } = useContext(DataContext);
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
      .then((response) => {
        if (response.errorMessage !== undefined) {
          alert(response.errorMessage);
        } else {
          alert(response.successMessage);
          updateBlogItem(params.id, editorContent.content, data.title);
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
                value: 30,
                message: "Title cannot be longer than 25 characters",
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
    </>
  );
}
