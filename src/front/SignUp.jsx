import { useState } from "react";
import { Link } from "react-router-dom";


const SignUp = () => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [resultado, setResultado] = useState("");


    const createUser = async (e) => {
        e.preventDefault();

        console.log(username, password);


        const resp = await fetch(
            "https://fluffy-giggle-wv7vqj7gvpvhv959-3001.app.github.dev/users",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, lastname, username, password }),

            })

        if (!resp.ok) throw Error("Hay un problema con la informacion del login")

        if (resp.status == 401) {
            throw ("Invalid credential")
        } else if (resp.status == 400) {
            throw ("Invalid email o password!")
        }

        const data = await resp.json()
        if (data.estado == "ok") {
            setResultado(data.mensaje);
        }



    }

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-4 offset-md-4">
                    <form className="row g-3" >
                        
                        <h2>Sign Up</h2>

                        <div className="col-12">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">LastName</label>
                            <input
                                type="lastname"
                                className="form-control"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-success w-100" onClick={createUser}>
                                Registrar Usuario
                            </button>
                            
                        </div>
                        <Link to={"/"}> <h5>Volver</h5></Link>

                        {resultado && (
                            <p className="text-center mt-2">{resultado}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
