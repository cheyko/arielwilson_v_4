from flask import Flask, send_from_directory, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
 
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource, reqparse

import pathlib

app = Flask(__name__, static_url_path='', static_folder='../build')
api = Api(app)

app.config['SECRET_KEY'] = "some$3cretKey"  # you should make this more random and unique
#app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://jgiabcpuvcjlww:bf4966d0c8eac19564fef74bdd2a26a8fcbac821b5735b72b5480420f4e48c28@ec2-52-203-74-38.compute-1.amazonaws.com:5432/da700pbtj5h0e2"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://cheykodon_7:snikwad67@localhost/wahgwaan"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # added just to suppress a warning
#app.config['UPLOAD_FOLDER'] = "../public/images/media/"
parentpath = pathlib.Path().resolve() 
#app.config['UPLOAD_FOLDER'] = str(parentpath) + "/build/images/"
app.config['UPLOAD_FOLDER'] = "../public/images/"
#print(parentpath)
app.url_map.strict_slashes = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwtmanager = JWTManager(app)

app.config.from_object(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

from api import actions, messages, profile, reactions, relations, shops, exclusives, mobile, activities, test

@app.route("/", defaults={'path':''})
@app.route('/index')
@cross_origin(allow_headers=app.config['CORS_HEADERS'])
def serve(path):
    return send_from_directory(app.static_folder,'index.html')