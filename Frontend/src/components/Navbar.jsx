import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaPlane } from 'react-icons/fa';

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-danger bg-danger border-bottom border-body sticky-top"
      data-bs-theme="dark"
    >
      <div className="container">
        <Link className="navbar-brand" to="/" >
        <FaPlane size={50}  />
        TravelPost
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "nav-link active" : "nav-link";
                }}
                aria-current="page"
                to="/recent"
              >
                Recientes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "nav-link active" : "nav-link";
                }}
                aria-current="page"
                to="/posts"
              >
                Mis publicaciones
              </NavLink>
            </li>
            <li className="nav-item">
            </li>
          </ul>
        </div>
        <div className="d-flex" role="search">
          <button className="btn btn-outline-dark btn-sm btn btn-light" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
