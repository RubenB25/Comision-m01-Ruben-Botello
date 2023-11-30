import { useEffect, useState } from "react";
import PlayItem from "./PostItem";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Playlist.module.css";
const Post = ({ posts, getPost}) => {
  // la información que NO vamos a modificar.
  const [search, setSearch] = useState("");
  const [filterPosts, setFilterPosts] = useState(posts);

  const navigate = useNavigate();

  useEffect(() => {
    const filtered = posts.filter((postF) => {
      return postF.title.toLowerCase().includes(search.toLowerCase());
    });

    setFilterPosts(filtered);
  }, [search, posts]);

  return (
    <div style={{ minWidth: "420px" }}>
      <input
        type="search"
        className="form-control"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <>
        {filterPosts.map((post) => {
          return (
            <PlayItem
              getPost={getPost}
              key={post._id}
              post={post}
              onClick={() => {
                navigate(`/playlist/${post._id}`);
              }}
            />
          );
        })}
      </>
      <Link to="/playlist/new" className="btn btn-success">
        Nueva publicación
      </Link>
    </div>
  );
};

export default Post;
