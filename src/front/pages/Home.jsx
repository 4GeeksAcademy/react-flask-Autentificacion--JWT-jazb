import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Mi App</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Registrarse</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="bg-light py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Bienvenido a mi App 🚀</h1>
          <p className="lead">Esta es tu página principal. Desde aquí puedes iniciar sesión o registrarte.</p>

          <div className="mt-4">
            <Link className="btn btn-primary btn-lg mx-2" to="/login">Login</Link>
            <Link className="btn btn-outline-secondary btn-lg mx-2" to="/signup">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">© {new Date().getFullYear()} Mi App - Todos los derechos reservados</p>
      </footer>

    </div>
  );
}
