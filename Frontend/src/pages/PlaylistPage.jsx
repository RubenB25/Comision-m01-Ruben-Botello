import styles from "../styles/Playlist.module.css";

import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import Playlist from "../components/Playlist";


function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);

  const { auth } = useContext(AuthContext);

  const getPlaylist = useCallback(() => {
    fetch(`${API_URL}/playlist`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setPlaylists(data))
      .catch((err) => console.log(err));
  }, [auth.token]);

  useEffect(() => {
    getPlaylist();
  }, [auth, getPlaylist]);

  return (
    <div className={styles.container}>

      <h1>Mis publicaciones</h1>
      <main className={styles.section}>
        <Playlist getPlaylist={getPlaylist} playlists={playlists} />
      </main>
    </div>
  );
}
export default PlaylistPage;
