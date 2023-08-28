from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from database import get_database
from pymongo import MongoClient
from models.user import User
from dotenv import load_dotenv
import os
from bson import ObjectId

# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("SESSION_SECRET")
app.config['SESSION_TYPE'] = 'mongodb'
app.config.from_object(__name__)
Session(app)
 
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

# Connect to MongoDB
client = MongoClient()
db = get_database()

@app.route('/')
def home():
    return "Hello, world!"

@app.route('/user')
def get_current_user():
    user_id = session["user_id"]

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = db.users.find_one({"_id": ObjectId(user_id)})
    
    if not user: 
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": str(user["_id"]),
        "username": user["username"]
    })


@app.route('/register', methods=["POST"])
def register_user():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    
    existing_user_by_email = User.find_by_email(email)
    existing_user_by_username = User.find_by_username(username)
    if existing_user_by_email or existing_user_by_username:
        return jsonify({"error": "User already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username, email, hashed_password)
    result = new_user.save()

    user_id = str(result.inserted_id)
    session["user_id"] = user_id
    
    return jsonify({
        "id": user_id,
        "email": email
    })

@app.route('/login', methods=["POST"])
def login_user():
    username = request.json["username"]
    password = request.json["password"]

    user = User.find_by_username(username)

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Unauthorized"}), 401
    
    user_id = str(user["_id"])
    session["user_id"] = user_id

    return jsonify({
        "id": str(user["_id"]),
        "username": user["username"]
    })

@app.route('/logout', methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


if __name__ == "__main__":
    app.run(port=6745, debug=True)
