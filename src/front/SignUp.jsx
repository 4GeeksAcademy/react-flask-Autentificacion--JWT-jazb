import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [resultado, setResultado] = useState("");
    const navigate = useNavigate();

    const loginUser = async () => {
        
        console.log(username, password);

        
        const resp = await fetch(
                "https://fluffy-giggle-wv7vqj7gvpvhv959-3001.app.github.dev/userss",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, lastname, username, password }),
                })
                console.log(resp);
            
        if(!resp.ok) throw Error ("Hay un problema con la informacion del login")
        
        if(resp.status==401){
            throw("Invalid credential")
        } else if(resp.status ==400){
            throw("Invalid email o password!")
        }

        const data = await resp.json()
        localStorage.setItem("jwt-token", data.token);

        return data,
    }

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-4 offset-md-4">
                    <form className="row g-3" onSubmit={loginUser}>
                        <h2>Crear Cuenta</h2>

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
                                type="password"
                                className="form-control"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                        </div>

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
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-success w-100">
                                Registrar Usuario
                            </button>
                        </div>

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
