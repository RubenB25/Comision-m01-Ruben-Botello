import { useRef } from "react";
import { API_URL } from "../utils/consts";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate,useLocation } from "react-router-dom";
function LoginForm() {
  const ref = useRef(null);

  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const user = {
      email,
      password,
    };

    const req = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (req.status !== 200) {
      ref.current.reset();
      return alert("Error al iniciar sesión");
    }

    const res = await req.json();

    login(res);

    ref.current.reset();

    navigate(location.state?.from || "/posts");
  };

  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center h-100"
      style={{ minWidth: "100vw" }}
    >
      <form onSubmit={handleSubmit} ref={ref}>
        <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>

        <div className="form-floating">
          <input
            type="email"
            name="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Contraseña</label>
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Recordarme
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Iniciar sesión
        </button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
      </form>
    </div>
  );
}

export default LoginForm;
