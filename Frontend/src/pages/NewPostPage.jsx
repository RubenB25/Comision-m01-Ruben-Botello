import { useContext, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NewPostPage = () => {
  const [title, setTitle] = useState("");
  const { auth } = useContext(AuthContext);
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title,url,content }),
    }).then((res) => {
      if (res.status !== 201)
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 2500,
        });

      setTitle("");
      navigate("/posts");
    });
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
      <h1 className="text-center">Nueva publicación</h1>
      <form className="d-flex mt-4" onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            placeholder="name@example.com"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
          <label htmlFor="title">Titulo de publicación</label>
        </div>

        <div className="form-floating">
          <input
            type="url"
            name="url"
            className="form-control"
            id="url"
            required
            placeholder="name@example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          
          <label htmlFor="url">Url de la imágen</label>
        </div>
        
        <div className="form-floating">
          <input
            type="text"
            name="content"
            className="form-control"
            id="content"
            required
            placeholder="name@example.com"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          <label htmlFor="content">Contenido</label>
        </div>
        <button className="btn btn-success">Publicar</button>
      </form>
    </div>
  );
};

export default NewPostPage;
