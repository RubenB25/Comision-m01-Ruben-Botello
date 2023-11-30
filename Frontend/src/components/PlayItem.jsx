import { BsFillTrashFill, BsMusicNoteList } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import Swal from "sweetalert2";
import { API_URL } from "../utils/consts";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import styles from "../styles/Playlist.module.css";
const PlayItem = ({ playlistId, title, avatar, username, comments, refresh }) => {
  const { auth } = useContext(AuthContext);

  const handleDelete = async (playlistId) => {
    return await fetch(`${API_URL}/playlist/${playlistId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth.token,
      },
    });
  };

  return (
    <div className={styles.item}>
      <div className="row g-0">
        <div className="col-md-5">
          <img src={avatar} className="img-fluid rounded-start" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <b>@{username} </b>
            </p>
            <div className="d-flex flex-row justify-content-between">
              <span className="card-text">
                <small className="text-body-secondary"style={{ display: 'flex', alignItems: 'center' }}>
                <FaRegComment style={{ marginRight: '2px' }} />{comments.length } Comentarios
                </small>
              </span>
              <div>
                <Link
                  className="btn btn-primary"
                  to={`/playlist/${playlistId}`}
                >
                  <BsMusicNoteList />
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    Swal.fire({
                      title: "¿Estás seguro?",
                      text: "¡Esta acción no se puede revertir!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Cancelar",
                      confirmButtonText: "¡Si, borrar!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(playlistId).then((res) => {
                          if (res.status !== 200) {
                            return Swal.fire({
                              icon: "error",
                              title: "Oops...",
                              text: "Something went wrong!",
                              timer: 2500,
                            });
                          } else {
                            Swal.fire({
                              title: "¡Eliminado!",
                              text: "Se ha eliminado la publicación.",
                              icon: "Éxito",
                            });
                            refresh();
                          }
                        });
                      }
                    });
                  }}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayItem;
