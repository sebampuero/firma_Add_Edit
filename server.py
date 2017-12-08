from flask import Flask, Response, redirect
from Service.json_request import get_firms_json

app = Flask(__name__)


@app.route('/')
def hello():
    return Response("<a href='/firmen_json'>Hallo</a>", mimetype="text/html")


@app.route('/create', methods=['POST'])
def create():
    return Response("a")


@app.route('/edit', methods=['PUT'])
def edit():
    return Response("a")


@app.route('/firmen_json', methods=['GET'])
def get():
    return Response(get_firms_json(),status=200,mimetype="application/json")


if __name__ == "__main__":
    app.run()
