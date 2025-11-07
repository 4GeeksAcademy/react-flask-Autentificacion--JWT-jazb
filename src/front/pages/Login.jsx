import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [resultado, setResultado] = useState("");
    const navigate = useNavigate();



    const loginUser = async (e) => {
        e.preventDefault();

        const resp = await fetch("https://fluffy-giggle-wv7vqj7gvpvhv959-3001.app.github.dev/token", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ username, password })
         });


        console.log("Status:", resp.status);

        if (!resp.ok) {
            const data = await resp.json();
            setResultado(data.msg || "Error al iniciar sesión");
            return;   // NO continúa, NO guarda token, NO navega
        }

        const data = await resp.json();
        localStorage.setItem("jwt-token", data.token);
        navigate("/Private", { replace: true });
    };



    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-3 offset-md-4">
                    <form className="row g-3" onSubmit={loginUser}>

                        <h2>Login</h2>

                        <input className="form-control" placeholder="Username"
                            value={username} onChange={(e) => setUsername(e.target.value)} />

                        <input className="form-control" type="password" placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                         
                        <button className="btn btn-primary w-100" type="submit">Enviar</button>

                        <Link to={"/"}> <h5>Volver</h5></Link>

                        {resultado && <p className="text-danger">{resultado}</p>}
                    </form>
                    <p className="may-5">No tienes una cuenta ? puedes registrarte <Link to={"/SignUp"} className="faw-bold text-decoration-none">aqui</Link></p>
                    {resultado ? <div className="alert alert-danger my-5" role="alert">{resultado}</div> : ""}
                </div>
            </div>
        </div>
    );
};

export default Login;