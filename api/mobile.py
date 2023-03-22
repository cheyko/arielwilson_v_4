################################
# API Functions Tailored for mobile only
################################
from api import app
import time
import json
import os
import pathlib

#from flask import send_from_directory
from lib2to3.refactor import _identity
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from flask import request, jsonify, send_file
from sqlalchemy import or_ , and_
from api.models import db, User, Accesses, Profile, Pree, Approvals, Media, Quote, Exclusive, ExclusiveSale, Subscriber, Subscription, GroupPree, Group
from api.relations import update_stats
from flask_cors import CORS, cross_origin
from os import walk
from api.relations import check_follower

@app.route("/api/get-mirror-pic", methods=["GET","POST"])
def get_mirror_pic():
    if request.method == "POST":
        user_id = request.json.get('user_id', None)
        profile_record = Profile.query.get(user_id)
        if profile_record is not None:
            if profile_record.has_dp:
                display_folder = app.config['UPLOAD_FOLDER'] + "bio/display"
                image =  display_folder + "/" + str(user_id)
                return send_file(image, mimetype="image/jpg") , 200
            else:
                return jsonify({"msg":"Image not found."}), 205
        return jsonify({"msg":"User Profile not found."}), 404
    else:
        return jsonify({"msg": "This was a " + request.method + " request"})

#api method for prees of figures -- standard
@app.route('/api/mobile-prees', methods=['GET','POST'])
def mobile_prees():
    if request.method == 'POST':         
        user_id = request.json.get('user_id', None)
        results = Pree.query.filter(Pree.is_visible == True).order_by(Pree.pree_id.desc()).all()
        prees = []
        for pree in results:
            if(check_follower(pree.user_id, user_id) or pree.user_id == user_id):
                theUser = User.query.get(pree.user_id)
                 
                if pree.is_media and pree.pree_type != 'exclusive':
                    theMedia = Media.query.get(pree.pree_id)
                    caption = theMedia.caption
                    if theMedia.has_image == True:
                        media_type = "image"
                    elif theMedia.has_audio == True:
                        media_type = "audio"
                    else:
                        media_type = "video"
                    #attachment = {"caption":theMedia.caption, "no_of_media":theMedia.no_of_media, "has_image":theMedia.has_image, "has_audio":theMedia.has_audio, "has_video":theMedia.has_video}
                elif pree.is_media and pree.pree_type == 'exclusive':
                    theExclusive = Exclusive.query.filter_by(pree_id = pree.pree_id).first()
                    #attachment = {"exclusive_id":theExclusive.exclusive_id,"title":theExclusive.title, "artistname":theExclusive.artistname, "genre":theExclusive.genre, "captionlist":theExclusive.captionlist, "description":theExclusive.description, "playback":theExclusive.playback, "unlock_requirement": theExclusive.unlock_requirement, "is_locked":theExclusive.is_locked, "is_downloadable":theExclusive.is_downloadable, "unlock_fee":theExclusive.unlock_fee, "no_of_media":theExclusive.no_of_media, "mediatypes":theExclusive.mediatypes , "influence":theExclusive.influence,"stereo":theExclusive.stereo, "md" : theExclusive.md,"magazine":theExclusive.magazine, "views":theExclusive.views }
                else:
                    theQuote = Quote.query.get(pree.pree_id)
                    caption = theQuote.the_quote
                    media_type = "quote"
                    #attachment = {"the_quote":theQuote.the_quote}
                if pree.pree_type == "group":
                    #change to single query eventually
                    group_pree = GroupPree.query.get(pree.pree_id)
                    theGroup = Group.query.get(group_pree.group_id)
                    groupObj = {"group_id":theGroup.group_id,"group_name":theGroup.name}
                else:
                    groupObj = {}
                preeObj = {"pree_id":pree.pree_id, "user_id":theUser.user_id, "username":theUser.username,"access-type":theUser.accessType, "date_added":str(pree.date_added), "is_media":pree.is_media,"pree_type":pree.pree_type, "media_type":media_type, "approvals":pree.approvals, "disapprovals":pree.disapprovals, "comments":pree.comments, "caption" : caption, "group":groupObj}
                prees.append(preeObj)
        return json.dumps(prees), 200
    return jsonify({"msg":"There was an error somewhere in request."}), 400

@app.route("/api/get-pree-media", methods=["GET","POST"])
def get_pree_media():
    if request.method == "POST":
        pree_id = request.json.get('pree_id', None)
        thePree = Pree.query.get(pree_id)
        #thePree = Pree.query.filter(Pree.pree_id == pree_id).first() 
        if thePree is not None:
            if thePree.is_media:
                media_folder = app.config['UPLOAD_FOLDER'] + "media"
                media =  media_folder + "/pree" + str(pree_id) + "/" + "post0"
                theMedia = Media.query.get(pree_id)
                if theMedia.has_image == True:
                    return send_file(media, mimetype="image/jpg") , 200
                elif theMedia.has_audio == True:
                    return send_file(media, mimetype="audio/mp3") , 200
                else:
                    return send_file(media, mimetype="video/mp4") , 200
            else:
                return jsonify({"msg":"Pree is a quote."}), 205
        return jsonify({"msg":"Pree not found."}), 404
    else:
        return jsonify({"msg": "This was a " + request.method + " request"})

@app.route("/api/post-mirror-pic", methods=["POST"])
def post_mirror_pic():
    return 1



