# from database import get_database

# db = get_database()
# collection = db["users"]

# user_1 = {
#     "_id": "U12345",
#     "username": "user123",
#     "email": "user123@example.com",
#     "password": "hashed_password_here"
# }

# user_2 = {
#     "_id": "U54321",
#     "username": "user543",
#     "email": "user543@example.com",
#     "password": "hashed_password_here"
# }

# collection.insert_many([user_1,user_2])

from database import get_database

db = get_database()
collection = db["sessions"]

user_1 = {
  "_id": "5f72b9c3d4a3b9614a21e037",
  "session_id": "6c9a7c5c-eb9b-4d5b-bafd-17020ab1ccf9",
  "data": {
    "user_id": "12345",
    "username": "john_doe"
  },
  "expiration": "2023-08-30T10:00:00Z"
}

collection.insert_one(user_1)