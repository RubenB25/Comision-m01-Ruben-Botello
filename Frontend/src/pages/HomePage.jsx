import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
function HomePage() {
  const { auth,logout } = useContext(AuthContext);
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center gap-4 pt-5">
      <h1 className="text-center">Bienvenido a TravelPost</h1>
      <h2>Sumérgete en aventuras únicas a través de las vivencias de nuestra comunidad viajera</h2>
      <p className="w-75">
        
¡Explora el mundo a través de los ojos de los aventureros! En TravelPost, cada experiencia es una historia que aguarda ser compartida. Descubre destinos, conecta con viajeros apasionados y sumérgete en un océano de culturas diversas. Únete a nuestra comunidad y haz que tus viajes perduren a través de relatos, fotos y conexiones que trascienden fronteras. ¡Encuentra inspiración y comparte la tuya en cada paso del camino!
      </p>
      <li className="btn btn-primary btn-lg">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "nav-link active" : "nav-link";
                }}
                aria-current="page"
                to={auth ? "/posts" : "/login"}
              >
                Mis publicaciones
              </NavLink>
            </li>
    </div>
  );
}
export default HomePage;
