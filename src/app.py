from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=False)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/user.db"
app.config["JWT_SECRET_KEY"] = "4geeks"

db = SQLAlchemy(app)
jwt = JWTManager(app)




class User(db.Model):
    # Aquí definimos el nombre de la tabla "Person"
    # Es opcional debiado a que usa el nombre de la clase por defecto.
    __tablename__ = "users"

    # Ten en cuenta que cada columna es también un atributo normal de primera instancia de Python.
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    name = db.Column(db.String(250), nullable=False)
    lastname = db.Column(db.String(250), nullable=False)

    # El método serialize convierte el objeto en un diccionario
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "lastname": self.lastname
        }


@app.route("/users", methods=["POST", "GET"])
def getOrAddUser():
    if (request.method == "GET"):
        result = User.query.all()
        result = list(map(lambda x: x.serialize(), result))

        return jsonify(result)

    elif (request.method == "POST"):
        datos = request.get_json()
        result = User(name=datos["name"], lastname=datos["lastname"],
                      username=datos["username"], password=datos["password"])
        db.session.add(result)
        db.session.commit()

        return jsonify({"estado": "ok", "mensaje": "El usuario se agrego correctamente!"})


@app.route("/users/<int:id>", methods=['GET', 'DELETE'])
def getOrDeleteUser(id):
    result = User.query.get(id)

    if result is None:
        return jsonify({"estado": "error", "mensaje": "No se encontró el usuario!!"}), 400

    if request.method == "GET":
        return jsonify(result.serialize())

    elif request.method == "DELETE":
        db.session.delete(result)
        db.session.commit()
        return jsonify({"estado": "ok", "mensaje": "El usuario se eliminó correctamente!!"})


@app.route("/token", methods=['POST'])
def generateToken():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # Validar si el usuario existe
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"msg": "User not found"}), 401

    # Validar contraseña
    if user.password != password:
        return jsonify({"msg": "Wrong password"}), 400

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "token": access_token,
        "user_id": user.id,
        "user_name": user.name,
        "user_username": user.username
    }), 200


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    user_id = get_jwt_identity()  # <- esto es el ID del usuario
    user = User.query.get(user_id)  # <- buscar por ID

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify({
        "name": user.name,
        "lastname": user.lastname,
        "username": user.username
    }), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=3001, debug=True)
