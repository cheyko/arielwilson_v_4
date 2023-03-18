from api import app
import time
import json
import os
import pathlib
import jwt

#from flask import send_from_directory
from lib2to3.refactor import _identity
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from flask import request, jsonify, Response
from sqlalchemy import or_ , and_
from api.models import db, User, Accesses, Profile
from api.relations import update_stats
from flask_cors import CORS, cross_origin
from os import walk
from api.security import authenticate_token
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import base64 

###############----profile.py-----##############

#@app.route("/", defaults={'path':''})
#def serve(path):
#    return send_from_directory(app.static_folder,'index.html')

@app.route('/api/time')
@authenticate_token
def get_current_time():
    return {'time': time.time()}

@app.route('/api/signup', methods=['POST'])
def signup():
    if request.method == 'POST':     
        cipher = AES.new((str(os.getenv("AES_KEY"))).encode('utf-8'), AES.MODE_ECB)
        firstname = unpad(cipher.decrypt(base64.b64decode(request.form["lkjhg1"])),AES.block_size).decode("utf-8", "ignore")
        lastname = unpad(cipher.decrypt(base64.b64decode(request.form["lkjhg2"])),AES.block_size).decode("utf-8", "ignore")
        gender = unpad(cipher.decrypt(base64.b64decode(request.form["lkjhg3"])),AES.block_size).decode("utf-8", "ignore")
        phonenumber = unpad(cipher.decrypt(base64.b64decode(request.form["lkjhg4"])),AES.block_size).decode("utf-8", "ignore")
        email = unpad(cipher.decrypt(base64.b64decode(request.form["lkjhg5"])),AES.block_size).decode("utf-8", "ignore")
        password = unpad(cipher.decrypt(base64.b64decode(request.form["lkjhg6"])),AES.block_size).decode("utf-8", "ignore")
        if not firstname:
            return jsonify({"msg": "Missing firstname parameter"}), 400
        if not lastname:
            return jsonify({"msg": "Missing lastname parameter"}), 400
        if not gender:
            return jsonify({"msg": "Missing gender parameter"}), 400
        if not email:
            return jsonify({"msg": "Missing username parameter"}), 400
        if not password:
            return jsonify({"msg": "Missing password parameter"}), 400
        if not phonenumber:
            return jsonify({"msg": "Missing contact parameter"}), 400

        theAccess = 1
        newuser = User(firstname=firstname, lastname=lastname, gender=gender, email=email, password=password, phonenumber=phonenumber, accessType=theAccess)
        db.session.add(newuser)
        db.session.flush()
        db.session.commit()

        #### send authentication email to new user ####
        #welcomeEmail = MIMEText(welcomeEmailTemp.format(firstname), "html")
        #subject = "Welcome Message from thaKKB.com"
        #sendEmail(email,subject,welcomeEmail)
    return jsonify({"msg": "New User added","user_id":newuser.user_id}), 200

#api method for Login
#@cross_origin()
@app.route('/api/login', methods=['GET','POST'])
@authenticate_token
def login():
    if request.method == 'POST':
        enc1 = base64.b64decode(request.form["lkjhg1"])
        enc2 = base64.b64decode(request.form["lkjhg2"])
        cipher = AES.new((str(os.getenv("AES_KEY"))).encode('utf-8'), AES.MODE_ECB)
        email = unpad(cipher.decrypt(enc1),AES.block_size).decode("utf-8", "ignore")
        password = unpad(cipher.decrypt(enc2),AES.block_size).decode("utf-8", "ignore")

        if not email:
            return jsonify({"msg": "Missing username parameter"}), 400
        if not password:
            return jsonify({"msg": "Missing password parameter"}), 400
        
        user = User.query.filter_by(email=email).first()
        if user is not None and check_password_hash(user.password,password):           
            access_token = create_access_token(identity=email)
            refresh_token = create_refresh_token(identity=email)
            profile_record = Profile.query.get(user.user_id)
            if profile_record is None:
                has_profile = False
                location = ""
            else:
                has_profile = True
                location = profile_record.location
                update_stats(user.user_id)
            return {
                'user_id' : user.user_id,
                'firstname' : user.firstname,
                'lastname' : user.lastname,
                'username' : user.username,
                'phonenumber' : user.phonenumber,
                'access_token': access_token,
                'refresh_token': refresh_token,
                'access_type': user.accessType,
                'has_profile' : has_profile,
                'gender' : user.gender,
                'location': location
            }
        return jsonify({"msg": "Incorrect email or password"}), 400
    else:
        return jsonify({"msg": "There was an error"}), 400

def str2bool(v):
  return v.lower() == "true" 

#api method to check if username registered
@app.route('/api/check-uname', methods=['GET','POST'])
def check_uname():
    if request.method == 'POST':
        user_input = request.json.get('userInput', None)
        result = User.query.filter_by(username=user_input).first()
        if result is None:
            return jsonify({"msg":"username registered"}), 200
        else:
            return jsonify({"msg":"username not registered"}), 205
    return jsonify({"msg":"method not accepted"}), 400

#api method to check if username registered
@app.route('/api/check-email', methods=['GET','POST'])
def check_email():
    if request.method == 'POST':
        email = request.json.get('email', None)
        print(email)
        result = User.query.filter_by(email=email).first()
        if result is None:
            return jsonify({"msg":"email is available registered"}), 200
        else:
            return jsonify({"msg":"email is already registered"}), 205
    return jsonify({"msg":"method not accepted"}), 400

#api method to checkif username has uname
@app.route('/api/has-uname', methods=['POST'])
def has_uname():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        #print(user_id)
        user_record = User.query.get(user_id)
        #print(user_record)
        if user_record is not None:
            #print(True)
            return {'has_uname' : True, 'uname':user_record.username}
        else:
            return {'has_uname' : False, 'uname':""}
    return jsonify({"msg":"method not accepted"}), 400

#api method to save username in User Table
@app.route('/api/save-uname', methods=['PUT'])
def save_uname():
    if request.method == 'PUT':
        user_id = request.json.get('user_id', None)
        uname = request.json.get('uname', None)
        user_record = User.query.get(user_id) 
        user_record.username = uname
        db.session.commit()
        return jsonify({"msg":"username registered"}), 200
    return jsonify({"msg":"method not accepted"}), 400

#api method to check if cv or dp is available
@app.route('/api/get-main-media', methods=['GET','POST'])
def get_media():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        profile_record = Profile.query.get(user_id)
        if profile_record is not None:
            return{
                'has_cv' : profile_record.has_cv,
                'has_dp' : profile_record.has_dp
            }, 200
        return jsonify({"msg":"User Profile not found."}), 205
    return jsonify({"msg":"Request not accepted."}), 400

#api method to save cover-videos and display photos
@app.route('/api/main-media', methods=['POST'])
def main_media():
    if request.method == 'POST':
        result = request.form
        user_id = result["user_id"]
        has_cover = result["has_cover"]
        has_display = result["has_display"]
        profile_record = Profile.query.get(user_id) 
        #mypath = pathlib.Path(__file__).parent.resolve()
        parentpath = pathlib.Path().resolve()
        #filenames = next(walk(parentpath), (None, None, []))[2]  # [] if no file
        #for item in filenames:
        #    print(item)
        if has_display == 'true':
            profile_record.has_dp = True
            display_folder = app.config['UPLOAD_FOLDER'] + "bio/display"
            #display_folder = "../public/images/bio/display"
            image_upload = request.files['display']
            image_upload.save(os.path.join(display_folder, user_id)) 
        if has_cover == 'true':
            profile_record.has_cv = True
            cover_folder = app.config['UPLOAD_FOLDER'] + "bio/cover"
            #cover_folder = "../build/images/bio/cover"
            video_upload = request.files['cover']
            file_name = user_id + ".mp4"
            video_upload.save(os.path.join(cover_folder, file_name)) 
        db.session.commit()
        return jsonify({"msg":"Main media of user updated."}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to save profile bio
@app.route('/api/bio', methods=['GET','POST','PUT'])
def bio():
    if request.method == 'POST':
        print('POST')
        #change this to just user_id
        user_id = request.json.get('user_id', None)
        dob = request.json.get('dob', None)
        tagline = request.json.get('tagline', None)
        description = request.json.get('description', None)
        location = request.json.get('location', None)
        newProfile = Profile(user_id=user_id, dob=dob, tagline=tagline, description=description, location=location)
        db.session.add(newProfile)
        db.session.commit()
        return jsonify({"msg":"Bio informaiton added."}), 200
    elif request.method == 'PUT':
        print('PUT')
        user_id = request.json.get('user_id', None)
        uname = request.json.get('uname', None)
        dob = request.json.get('dob', None)
        tagline = request.json.get('tagline', None)
        description = request.json.get('description', None)
        location = request.json.get('location', None)
        user_record = User.query.get(user_id)
        check = User.query.filter_by(username=uname).first()
        if check is None or user_record.username == uname:
            user_record.username = uname
        else:
            return {"msg":"Username not available"}, 206
        profile_record = Profile.query.get(user_id) 
        profile_record.dob = dob
        profile_record.tagline = tagline
        profile_record.description = description
        profile_record.location = location
        db.session.commit()
        return jsonify({"msg":"Bio informaiton updated."}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to load profile bio
@app.route('/api/get-bio', methods=['POST'])
def get_bio():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        #reduce to one query
        user_record = User.query.get(user_id)
        profile_record = Profile.query.get(user_id) 
        if profile_record is not None:
            print(profile_record)
            return {
                'uname': user_record.username,
                'dob' : profile_record.dob,
                'tagline' : profile_record.tagline,
                'description' : profile_record.description,
                'location' : profile_record.location
            }, 200
        return jsonify({"msg":"Profile not found"}), 205
    return jsonify({"msg": "There was an error, method not executed"}), 400
