import { useParams } from "react-router-dom";

export function EditPostPage() {
  const params = useParams();
  return <h1>{params.id}</h1>;
}
