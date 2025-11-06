import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Private = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");

        if (!token) {
            alert("No estás logueado!");
            navigate("/login");
            return;
        }

        const getProtectedData = async () => {
            const resp = await fetch(
                "https://fluffy-giggle-wv7vqj7gvpvhv959-3001.app.github.dev/protected",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                }
            );

            if (!resp.ok) {
                alert("Token inválido o expirado");
                localStorage.removeItem("jwt-token");
                navigate("/login");
                return;
            }

            const data = await resp.json();
            setUser(data);
        };

        getProtectedData();
    }, []);

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-6 offset-md-3 text-center">
                    <h2>Zona Privada 🛡️</h2>

                    <Link to={"/"}>
                        <h5>Volver</h5>
                    </Link>

                    {!user && <p>Cargando datos...</p>}

                    {user && (
                        <div className="card p-3 mt-3">
                            <h4>Bienvenido {user.name}!</h4>
                            <p><strong>Usuario:</strong> {user.username}</p>
                            <p><strong>Apellido:</strong> {user.lastname}</p>

                            <button
                                className="btn btn-danger mt-2"
                                onClick={() => {
                                    localStorage.removeItem("jwt-token");
                                    navigate("/login");
                                }}
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Private;
