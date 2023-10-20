import "./PostCard.scss";

type PostCardProps = {
  data: any;
};

export function PostCard({ data }: PostCardProps) {
  const handleDeleteClick = async (e: React.MouseEvent<HTMLElement>) => {
    const token: string | null = localStorage.getItem("token");
    const target = e.target as Element | null;
    const id: string | undefined = target?.closest(".postCard")?.id;
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
          alert(data);
        }
      });
  };
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
