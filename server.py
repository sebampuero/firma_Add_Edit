from flask import Flask, Response, redirect


app = Flask(__name__)


@app.route('/')
def hello():
    return Response("<h1>Hallo</h1><br>Edit | Create", mimetype="text/html")


@app.route('/create', methods=['POST'])
def create():
    return Response("a")


@app.route('/edit', methods=['PUT'])
def edit():
    return Response("a")


@app.route('/firmen_json', methods=['GET'])
def get():
    return Response("json")


if __name__ == "__main__":
    app.run()
