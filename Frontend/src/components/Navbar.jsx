import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar la búsqueda
    // Puedes usar searchTerm para realizar la búsqueda
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.customNavbar}`}>
      <div className="container-fluid">

        <Link className={`navbar-brand ${styles.brandText}`} to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '300px' }}>
            <li className="nav-item">
              <Link className={`nav-link ${styles.brandText}`} to="/">
                Recientes
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.brandText}`} to="/playlist">
                Mis publicaciones
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.brandText}`} to="/playlist/new">
                Crear publicación
              </Link>
            </li>
          </ul>
          <Link className={`nav-link p-3 ${styles.brandText}`} to="/login">
            Iniciar sesión
          </Link>
          <Link className={`nav-link p-3 ${styles.brandText}`} to="/register">
            Registrarse
          </Link>
          <div className="col-lg-3">
            <form className="d-flex" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="btn btn-danger" type="submit">
                Explorar
              </button>
            </form>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;