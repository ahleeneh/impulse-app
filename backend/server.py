from flask import Flask

app = Flask(__name__)
port = 6745

@app.route('/')

def home():
    return "Hello, world!"

app.run(port)