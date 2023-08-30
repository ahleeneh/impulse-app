from flask import Flask, request
from database import get_database
from datetime import datetime

db = get_database()
budget_collection = db["budgets"]

# Check if the index already exists
existing_indexes = budget_collection.index_information()
if "user_id_year_month_1" not in existing_indexes:
    budget_collection.create_index([("user_id", 1), ("year", 1), ("month", 1)], name="user_id_year_month_1", unique=True)


class Budget:
    def __init__(self, user_id, budgets=None, month=None, year=None):
        self.user_id = user_id
        if budgets is None:
            self.budgets = {
                "month": month or datetime.now().month,
                "year": year or datetime.now().year,
                "categories": {
                    "income": [],
                    "housing": [],
                    "recurring": [],
                    "additional": [] 
                }
            }
        else:
            self.budgets = budgets

    def save(self):
        data = {
            "user_id": self.user_id,
            "month": self.budgets["month"],
            "year": self.budgets["year"],
            "categories": self.budgets["categories"]
        }
        return budget_collection.insert_one(data)
    
    def add_item_to_category(self, category, item_name, item_amount):
         item = {"name": item_name, "amount": item_amount}
         self.budgets["categories"][category].append(item)

    def update_database(self):
        data = {
            "user_id": self.user_id,
            "month": self.budgets["month"],
            "year": self.budgets["year"],
            "categories": self.budgets["categories"]
        }

        query = {"user_id": self.user_id}
        budget_collection.update_one(query, {"$set": data})
