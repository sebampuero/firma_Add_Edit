from flask import Flask, Response, redirect, request
from Service.json_request import get_firm_json
from Service.firmen_service import create_firm,edit_firm

app = Flask(__name__)


@app.route('/')
def hello():
    return Response("<a href='/firmen_json'>Hallo</a>", mimetype="text/html")


@app.route('/create', methods=['POST'])
def create():
    content = request.get_json()
    create_firm(content)
    return redirect("/")


@app.route('/edit', methods=['PUT'])
def edit():
    content = request.get_json()
    edit_firm(content)
    return redirect("/")


@app.route('/firmen_json', methods=['GET'])
def get():
    query = request.args.get('query', '').lower()
    if query is '':
        return Response(status=400)
    return Response(get_firm_json(query), status=200, mimetype="application/json")


if __name__ == "__main__":
    app.run()
