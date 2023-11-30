import PlayItem from "../components/PostItem";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/consts";
import { Link } from "react-router-dom";
import styles from "../styles/Playlist.module.css";
const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [search, setSearch] = useState("");

  const { auth } = useContext(AuthContext);

  const getAllPlaylist = () => {
    fetch(`${API_URL}/post`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    getAllPlaylist();
  }, []);

  useEffect(() => {
    const filtereds = posts.filter((postF) => {
      return postF.title.toLowerCase().includes(search.toLowerCase().trim());
    });

    setFilteredPosts(filtereds);
  }, [posts, search]);

  return (
    <div className={styles.container}>
      <h1>Tus publicaciones</h1>
      <div className="w-50 d-flex flex-row gap-2 mt-4">
        <Link className="btn btn-success" to="/post/new">
          Crear publicación
        </Link>
        <input
          type="search"
          placeholder="Buscar"
          className="form-control"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="w-50 d-flex flex-column gap-2 mt-4">
        {filteredPosts.map((postF) => {
          return (
            <PlayItem
              key={postF._id}
              postId={postF._id}
              title={postF.title}
              url={postF.url}
              content={postF.content}
              username={postF.author.username}
              avatar={postF.author.avatar}
              comments={postF.comments}
              refresh={getAllPlaylist}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostsPage;
