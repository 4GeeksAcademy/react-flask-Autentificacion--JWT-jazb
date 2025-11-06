import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

   
    const loginUser = async (e) => {
        e.preventDefault();

        const values = {username,password}
        console.log(values)

        const resp = await fetch(`https://fluffy-giggle-wv7vqj7gvpvhv959-3001.app.github.dev/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!resp.ok)
            throw Error(" Hay un problema con la informacion");

        if (resp.status == 401) {
            throw ("Invalid credential")
        } else if (resp.status == 400) {
            throw ("Invalid email o password!")
        }


       const data = await resp.json();
        localStorage.setItem("jwt-token", data.token);

        // Redirige a la página privada
        navigate("/Private");

       

       
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
                            value={password} onInput={(e) => setPassword(e.target.value)} />

                        <button className="btn btn-primary w-100">Ingresar</button>
                        <Link to={"/"}> <h5>Volver</h5></Link>

                        {error && <p className="text-danger">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
