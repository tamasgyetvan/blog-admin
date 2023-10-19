import "./PostCard.scss";

type PostCardProps = {
  data: any;
};

export function PostCard({ data }: PostCardProps) {
  return (
    <div key={data._id} className="postCard">
      <img src="public/image-picture-svgrepo-com.svg" alt="" />
      <div className="infoContainer">
        <h3 className="postTitle">{data.title}</h3>
        <p className="postAuthor">{data.author.username}</p>
        <p className="creationDate">{data.timestamp}</p>
      </div>
      <div className="actionContainer">
        <button>
          <img
            className="editIcon"
            src="public/edit-3-svgrepo-com.svg"
            alt=""
          />
        </button>
        <button>
          <img
            className="deleteIcon"
            src="public/delete-2-svgrepo-com.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}
