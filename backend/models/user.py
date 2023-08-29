from flask import Flask, request
from database import get_database

db = get_database()
users_collection = db["users"]

class User:
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
    
    def save(self): 
        user_data = {
            "username": self.username,
            "email": self.email,
            "password": self.password
        }
        return users_collection.insert_one(user_data)
    
    @staticmethod
    def find_by_username(username):
        return users_collection.find_one({"username": username})
    
    @staticmethod
    def find_by_email(email):
        return users_collection.find_one({"email": email}) 
