from flask import Flask, Response, redirect, request, render_template
from Service.json_requests import get_firm_by_name_json, get_title, get_firms_json
from Service.firmen_service import create_firm, edit_firm

app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/create')
def create_template():
    return render_template('create.html')


@app.route('/edit')
def edit_template():
    return render_template('edit.html')


@app.route('/firm/create', methods=['POST'])
def create():
    content = request.get_json()
    create_firm(content)
    return redirect("/")


@app.route('/firm/edit', methods=['PUT'])
def edit():
    content = request.get_json()
    edit_firm(content)
    return redirect("/")


@app.route('/firms', methods=['GET'])
def get():
    query = request.args.get('query', '').lower()
    if query is '':
        return Response(get_firms_json(), status=200, mimetype="application/json")
    return Response(get_firm_by_name_json(query), status=200, mimetype="application/json")


@app.route('/titles', methods=['GET'])
def get_a_title():
    query = request.args.get('query', '').lower()
    if query is '':
        return Response(status=400)
    return Response(get_title(query), status=200, mimetype="application/json")


if __name__ == "__main__":
    app.run()
