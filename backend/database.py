from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Access environment variables
conn1 = os.environ.get("START_MONGODB_STRING")
conn2 = os.environ.get("DBUSER_MONGODB")
conn3 = os.environ.get("PASSWORD_MONGODB")
conn4 = os.environ.get("END_MONGODB_STRING")

conn = f"{conn1}://{conn2}:{conn3}{conn4}"

def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = conn
    
    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example
    return client['impulse_budget']

# This is added so that many files can reuse the function get_database()
if __name__ == '__main__':
    dbname = get_database()


 