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
    return render_template('index.html', title='ICWE2018')

@app.route('/wizard')
def wizard():
    return render_template('wizard.html', title='ICWE2018')



if __name__ == '__main__':
    #app.run(debug=True)
    socketio.run(app,port=configuration.SOCKETIO_PORT)
