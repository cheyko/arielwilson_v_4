from api import app
import time
import json
import os
import pathlib
import jwt

#from flask import send_from_directory
from lib2to3.refactor import _identity
from werkzeug.security import check_password_hash
#from flask_jwt_extended import create_access_token, create_refresh_token
from flask import request, jsonify, Response
from sqlalchemy import or_ , and_
from api.models import db, User, Accesses, Profile, TokenAlpha, TokenOmega
from api.relations import update_stats
from flask_cors import CORS, cross_origin
from os import walk
from api.security import authenticate_token, assign_token, detach_token, confirm_token
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
        token = assign_token(newuser.user_id)

        #### send authentication email to new user ####
        #welcomeEmail = MIMEText(welcomeEmailTemp.format(firstname), "html")
        #subject = "Welcome Message from thaKKB.com"
        #sendEmail(email,subject,welcomeEmail)
    return jsonify({"msg": "New User added","token":token}), 200

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
            tokens = assign_token(user.user_id)
            profile_record = Profile.query.get(user.user_id)
            if profile_record is None:
                has_profile = False
                location = ""
            else:
                has_profile = True
                location = profile_record.location
                update_stats(user.user_id)
            return {
                'id':user.user_id,
                'username' : user.username,
                'access_token' : tokens['token_alpha']+""+tokens['token_omega'], 
                'has_profile' : has_profile,
                'gender': user.gender,
                'location' : location,
            }
        return jsonify({"msg": "Incorrect email or password"}), 400
    else:
        return jsonify({"msg": "There was an error"}), 400

"""@app.route('/api/get-details', methods=['GET','POST'])
def get_details():
    if request.method == 'POST':
        tokens = request.json.get('token', None).split('-')
        user = db.session.query(User, TokenAlpha, TokenOmega).join(TokenAlpha, TokenAlpha.assigned_to == User.user_id).join(TokenOmega, TokenOmega.assigned_to == User.user_id).filter(and_(TokenAlpha.token_val == tokens[0], TokenOmega.token_val == tokens[1])).first()
        print(user)
        if user is not None:
            return {
                'username' : user.User.username,
                'gender' : user.User.gender
            }
        else:
            return jsonify({"msg": "invalid token"}), 400
    return jsonify({"msg": "There was an error"}), 400    
"""
@app.route('/api/logout', methods=['GET','POST'])
def logout():
    if request.method == 'POST':
        token = request.json.get('token', None)
        detach_token(token)
        return jsonify({"msg": "token detached successfully"}), 200
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
        token = request.json.get('user_id', None)
        user_id = confirm_token(token)
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
        token = request.json.get('user_id', None)
        user_id = confirm_token(token)
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
        token = request.json.get('token', None)
        user_id = confirm_token(token)
        profile_record = Profile.query.get(user_id)
        if profile_record is not None:
            return{
                'has_cv' : profile_record.has_cv,
                'has_dp' : profile_record.has_dp,
                'user_id': user_id
            }, 200
        return jsonify({"msg":"User Profile not found."}), 205
    return jsonify({"msg":"Request not accepted."}), 400

@app.route('/api/get-user-media', methods=['GET','POST'])
def get_user_media():
    if request.method == 'POST':
        username = request.json.get('uname', None)
        profile_record = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter(username == User.username).first()
        if profile_record is not None:
            return{
                'has_cv' : profile_record.Profile.has_cv,
                'has_dp' : profile_record.Profile.has_dp,
                'user_id': profile_record.User.user_id
            }, 200
        return jsonify({"msg":"User Profile not found."}), 205
    return jsonify({"msg":"Request not accepted."}), 400

#api method to save cover-videos and display photos
@app.route('/api/main-media', methods=['POST'])
def main_media():
    if request.method == 'POST':
        result = request.form
        token = result["token"]
        user_id = confirm_token(token)
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
            file_name = user_id + ".jpeg"
            image_upload.save(os.path.join(display_folder, file_name)) 
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
        #change this to just user_id
        token = request.json.get('token', None)
        user_id = confirm_token(token)
        if(user_id != 0):
            #user_id = request.json.get('user_id', None)
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
        token = request.json.get('token', None)
        user_id = confirm_token(token)
        if(user_id != 0):
            #user_id = request.json.get('user_id', None)
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
        return jsonify({"msg":"Incorrect Token"}), 201
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to load profile bio
@app.route('/api/get-bio', methods=['POST'])
def get_bio():
    if request.method == 'POST':
        token = request.json.get('user_id', None)
        user_id = confirm_token(token)
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

#api method for getting full profile details --> (change to user-view in future)
@app.route('/api/profile-details', methods=['POST'])
def profile_details():
    if request.method == 'POST':
        uname = request.json.get('uname', None)
        #print(user_id)
        if uname != '':
            user_details = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter(User.username == uname).first()  
            myUserObj = {"user_id":user_details.User.user_id, "firstname":user_details.User.firstname, "lastname":user_details.User.lastname, "username":user_details.User.username, "access-type":user_details.User.accessType, "dob": user_details.Profile.dob , "tagline":user_details.Profile.tagline, "description":user_details.Profile.description, "location":user_details.Profile.location, "followers":user_details.Profile.followers, "figures":user_details.Profile.figures, "fraternity":user_details.Profile.fraternity,"groups":user_details.Profile.groups, "has_dp":user_details.Profile.has_dp, "has_cv":user_details.Profile.has_cv}
            return myUserObj , 200
        else:
            return jsonify({"msg":"User does not have ID of Zero (0)."}), 205
    return jsonify({"msg":"There was an error somewhere."}), 400