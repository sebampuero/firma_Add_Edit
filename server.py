from flask import Flask, Response, request, render_template
from Service.json_requests import get_firms_by_name_json, get_title_json, get_firms_json, get_branches_json
from Service.firmen_service import create_firm, edit_firm

app = Flask(__name__)


@app.route('/')
def hello():
    if request.args.get('create', '') != "":
        return render_template('index.html', create=request.args.get('create'))
    if request.args.get('edit', '') != "":
        return render_template('index.html', edit=request.args.get('edit'))
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
    status = create_firm(content)
    return str(status)


@app.route('/firm/edit', methods=['PUT'])
def edit():
    content = request.get_json()
    status = edit_firm(content)
    return str(status)


@app.route('/firms', methods=['GET'])
def get():
    query = request.args.get('query', '').lower()
    if query is '':
        return Response(get_firms_json(), status=200, mimetype="application/json")
    return Response(get_firms_by_name_json(query), status=200, mimetype="application/json")


@app.route('/titles', methods=['GET'])
def get_a_title():
    query = request.args.get('query', '').lower()
    if query is '':
        return Response(status=400)
    return Response(get_title_json(query), status=200, mimetype="application/json")


@app.route('/branch', methods=['GET'])
def get_branches():
    return Response(get_branches_json(), status=200, mimetype="application/json")


if __name__ == "__main__":
    app.run()
