import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=> {
    conts[username, setUsername] = useState("");
    conts[password,setPassword] = useState("");
    conts[error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();


        try {
            const resp = await fetch(`https://fluffy-giggle-wv7vqj7gvpvhv959-3001.app.github.dev/token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!resp.ok) {
                setError("Usuario o contraseña incorrectos");
                return;
            }

            const data = await resp.json();

            // Guardar token
            localStorage.setItem("token", data.token);

            // Redirigir a ruta privada
            navigate("/private");

        } catch (error) {
            console.error(error);
            setError("Hubo un error en el login");
        }
    };

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-3 offset-md-4">
                    <form className="row g-3" onSubmit={handleLogin}>
                        <h2>Login</h2>

                        <input className="form-control" placeholder="Username"
                            value={username} onInput={(e) => setUsername(e.target.value)} />

                        <input className="form-control" type="password" placeholder="Password"
                            value={password} onInput={(e) => setPassword(e.target.value)} />

                        <button className="btn btn-primary w-100">Ingresar</button>

                        {error && <p className="text-danger">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
