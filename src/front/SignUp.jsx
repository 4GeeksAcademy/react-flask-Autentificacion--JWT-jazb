import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [resultado , setResultado] = useState("");
    const navigate = useNavigate()

    const loginUser = async(e) => {
         e.preventDefault();
        console.log(username, password);

         try {
      const resp = await fetch(
        `https://fluffy-giggle-wv7vqj7gvpvhv959-3001.app.github.dev/users`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ name, lastname, username, password }),
        }
      );

      const data = await resp.json();
      console.log("Respuesta del backend:", data);

      if (!resp.ok) {
        setResultado("Hubo un error al registrar el usuario");
        return;
      }

      setResultado(data.mensaje);

      // Redirigir luego de 1.5s
      setTimeout(() => navigate("/login"), 1500);
      
    } catch (error) {
      console.error("Error:", error);
      setResultado("Error en la conexión con el servidor");
    }
  };

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-4 offset-md-4">
                    <form className="row g-3" onSubmit={loginUser}>
                        <h2>Crear Cuenta</h2>

                        <div className="col-12">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onInput={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onInput={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onInput={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastname}
                                onInput={(e) => setLastname(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-success w-100">Registrar Usuario</button>
                        </div>

                        {resultado && <p className="text-center mt-2">{resultado}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;