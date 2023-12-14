import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const NewCommentPage = () => {
  const { postId } = useParams();

  const [post, setPost] = useState(null);

  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const getPost = (postId) => {
    fetch(`${API_URL}/post/${postId}`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setPost(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      content: formData.get("content"),
      author: auth.user._id,
    };

    fetch(`${API_URL}/comment/${postId}`, {
      method: "POST",
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status !== 201) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 2500,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Comment added to post",
          timer: 2500,
        }).then(() => {
          navigate(`/post/${postId}`);
        });
      }
    });
  };

  useEffect(() => {
    getPost(postId);
  }, []);

  if (!post) {
    return (
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
        <h3 className="text-center mt-4">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
      <h1 className="text-center">New comment from "{post.title}"</h1>

      <form
        className="d-flex flex-column mt-4 gap-2"
        onSubmit={handleSubmit}
        style={{ width: "500px" }}
      >
        <div className="form-floating">
          <input
            type="text"
            name="content"
            required
            className="form-control"
            id="content"
            placeholder="name@example.com"
          />
          <label htmlFor="content">Comentario</label>
        </div>
        
  
        <button className="btn btn-success" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewCommentPage;
