from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/user.db"
app.config["JWT_SECRET_KEY"] = "4geeks"

db = SQLAlchemy(app)
jwt = JWTManager(app)


CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)



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
            "password": self.password,
            "name": self.name,
            "lastname": self.lastname
        }

@app.route("/users", methods=["POST", "GET"])
def getOrAddUser():
    if request.method == "GET":
        users = User.query.all()
        return jsonify([u.serialize() for u in users]), 200

    if request.method == "POST":
        data = request.get_json()
        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "Usuario creado", "ok": True}), 201


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
    user = User.query.filter_by(username=username, password=password).first()

    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({"token": access_token, "user_id": user.id, "user_name": user.name, "user_username": user.username})


@app.route("/protected", methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"id": user.id,"name":user.name, "lastname":user.lastname,"username": user.username}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=3001, debug=True)
