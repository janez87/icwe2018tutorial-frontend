#system modules
import datetime

#external modules
from flask import Flask, render_template,request, jsonify, redirect, url_for
from pymongo import MongoClient
from bson import ObjectId
from flask_socketio import SocketIO, emit

# my modules
from configuration import configuration

app = Flask(__name__)

app.debug = True
socketio = SocketIO(app, async_mode='eventlet')

client = MongoClient(
    configuration.DB_HOST, configuration.DB_PORT)

db = client[configuration.DB_NAME]

# Views rendering
@app.route('/')
def index():
    applications = list(db["application"].find())
    return render_template('index.html', title='ICWE2018',applications=applications)


@app.route('/add-engine-page')
def add_engine_page():
        return render_template('add-engine.html', title='ICWE2018')

@app.route('/wizard-app')
def wizard_app():
    engines = list(db["engine"].find(projection={"_id": 0}))

    return render_template('wizard-app.html', title='ICWE2018', engines=engines)


@app.route('/wizard-obs')
def wizard_obs():
    return render_template('wizard-obs.html', title='ICWE2018')


@app.route('/wizard-stream')
def wizard_stream():
    return render_template('wizard-stream.html', title='ICWE2018')


@app.route('/add-app', methods=['POST'])
def add_app():
    print(request.get_json())

    db["application"].save(request.get_json())

    return jsonify({"status":"ok"})

@app.route('/add-engine', methods=['POST'])
def add_engine():
    print(request.get_json())

    db["engine"].save(request.get_json())

    return jsonify({"status": "ok"})


@app.route('/get-engines', methods=['GET'])
def get_engines():
    engines = list(db["engine"].find(projection={"_id":0}))

    return jsonify(engines)

@app.route('/add-stream', methods=['POST'])
def add_stream():
    print(request.get_json())

    db["stream"].save(request.get_json())

    return jsonify({"status": "ok"})


@app.route('/add-observer', methods=['POST'])
def add_obs():
    print(request.get_json())

    db["stream"].save(request.get_json())

    return jsonify({"status": "ok"})

if __name__ == '__main__':
    #app.run(debug=True)
    socketio.run(app,port=configuration.SOCKETIO_PORT)
