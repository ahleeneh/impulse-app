from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, world!"

# Members API Route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}


if __name__ == "__main__":
    app.run(port=6745, debug=True)

# app.run(port)