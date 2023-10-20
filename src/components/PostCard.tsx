import { MouseEventHandler } from "react";
import "./PostCard.scss";

type PostCardProps = {
  data: any;
  handleDeleteClick: MouseEventHandler;
};

export function PostCard({ data, handleDeleteClick }: PostCardProps) {
  return (
    <div id={data._id} className="postCard">
      <img src="/image-picture-svgrepo-com.svg" alt="" />
      <div className="infoContainer">
        <h3 className="postTitle">{data.title}</h3>
        <p className="postAuthor">{data.author.username}</p>
        <p className="creationDate">{data.timestamp}</p>
      </div>
      <div className="actionContainer">
        <button>
          <img className="editIcon" src="/edit-3-svgrepo-com.svg" alt="" />
        </button>
        <button onClick={handleDeleteClick}>
          <img className="deleteIcon" src="/delete-2-svgrepo-com.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
