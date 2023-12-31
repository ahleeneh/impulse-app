from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from database import get_database
from pymongo import MongoClient
from models.user import User
from models.budget import Budget
from dotenv import load_dotenv
import os
from bson import ObjectId
from datetime import datetime

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

# -----------------------------
# Home Route
# -----------------------------
@app.route('/')
def home():
    return "Hello, world!"

# -----------------------------
# User Routes
# -----------------------------
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


@app.route('/user/register', methods=["POST"])
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


@app.route('/user/login', methods=["POST"])
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


@app.route('/user/logout', methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


# -----------------------------
# Budget Routes
# -----------------------------
@app.route('/budget')
def get_user_budget():
    user_id = session["user_id"]

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    month = int(request.args['month'])
    year = int(request.args['year'])

    if not (month and year):
        return jsonify({"error": "Month and year are required"}), 400

    budget_data = db.budgets.find_one(
        {"user_id": user_id, "month": month, "year": year})

    if budget_data:
        budget_data["_id"] = str(budget_data["_id"])
        return jsonify(budget_data), 200
    else:
        return jsonify({}), 204


@app.route('/budget/all-budgets')
def get_all_user_budgets():
    user_id = session["user_id"]

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    current_month = datetime.now().month
    current_year = datetime.now().year
    
    budget_data = db.budgets.find({"user_id": user_id, "$or": [{"year": {"$lt": current_year}}, {"year": current_year, "month": {"$lte": current_month}}]})

    budgets = [budget for budget in budget_data]

    if budgets:
        for budget in budgets:
            budget["_id"] = str(budget["_id"])
        return jsonify(budgets), 200
    else:
        return jsonify([]), 204


@app.route('/budget', methods=["POST"])
def add_item_to_budget():
    user_id = session["user_id"]

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    category = data.get('category')
    item_name = data.get('item_name')
    item_amount = data.get('item_amount')
    month = data.get('month')
    year = data.get('year')

    if not (category and item_name and item_amount and month and year):
        return jsonify({"error": "Invalid request"}), 400

    budget_data = db.budgets.find_one(
        {"user_id": user_id, "month": month, "year": year})

    if not budget_data:
        new_budget = Budget(user_id, month, year)
        new_budget.add_item_to_category(category, item_name, item_amount)
        new_budget.save()
    else:
        budget = Budget(user_id=user_id, month=month, year=year)
        budget.add_item_to_category(category, item_name, item_amount)
        budget.update_database(category, item_name, item_amount)

    return jsonify({"message": "Item added to budget"}), 200


@app.route('/budget/delete', methods=["DELETE"])
def delete_budget_item():
    user_id = session["user_id"]

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    category = data.get('category')
    item_name = data.get('item_name')
    month = data.get('month')
    year = data.get('year')

    if not (category and item_name and month and year):
        return jsonify({"error": "Invalid request"}), 400

    query = {
        "user_id": user_id,
        "month": month,
        "year": year
    }

    update_data = {
        "$pull": {
            f"categories.{category}": {"name": item_name}
        }
    }

    result = db.budgets.update_one(query, update_data)

    if result.modified_count == 0:
        return jsonify({"error": "Item not found"}), 404

    return jsonify({"message": "Item deleted from budget"}), 200


if __name__ == "__main__":
    app.run(port=6745, debug=True)
