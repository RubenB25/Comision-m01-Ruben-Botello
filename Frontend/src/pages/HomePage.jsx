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
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse cum
        veniam, tenetur deleniti vel aut quos, blanditiis repellendus numquam
        doloribus suscipit amet quaerat a ab doloremque aliquid debitis earum
        nostrum. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
        rerum sint eius quibusdam animi assumenda accusantium deleniti,
        cupiditate exercitationem asperiores?
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
