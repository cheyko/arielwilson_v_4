from api import app
import time
import json
import os

from lib2to3.refactor import _identity
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from flask import request, jsonify
from sqlalchemy import or_ , and_
from api.models import db, User, Accesses, Profile, Pree, Approvals, Exclusive, ExclusiveSale, Subscriber, Subscription
from api.specials import Preepedia, Biography

def str2bool(v):
  return v.lower() == "true" 

@app.route('/api/exclusive', methods=['GET', 'POST'])
def exclusive():
    if request.method == 'POST': 
        result = request.form
        playback = result["playback"]
        mediatypes = result["mediatypes"].split(',')
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=True, pree_type=result["pree_type"])
        db.session.add(newPree)
        db.session.flush()
        mainmedia = request.files.getlist("mainmedia")
        no_of_media = (len(mainmedia))
        unlock_requirement = 0
        if playback == "Purchase":
            unlock_requirement = 9
        elif playback == "Free":
            unlock_requirement = 8
        elif playback == "Contingency" or playback == "Follower" or playback == "Frat" or playback == "Rank":
            unlock_requirement = 7
        elif playback == "Stream" and str2bool(result["stereo"]):
            unlock_requirement = 1
        elif playback == "Stream" and str2bool(result["md"]):
            unlock_requirement = 2
        elif playback == "Stream" and str2bool(result["influence"]):
            unlock_requirement = 3
        elif playback == "Stream" and str2bool(result["magazine"]):
            unlock_requirement = 4
        newExclusive = Exclusive(pree_id=newPree.pree_id,title=result["title"],artistname=result["artistname"],category=result["category"],genre=result["genre"],captionlist=result["captionlist"].split(","),description=result["description"],playback=result["playback"],contingency=result["contingency"],is_locked=str2bool(result["is_locked"]), is_downloadable=str2bool(result["is_downloadable"]), unlock_requirement=unlock_requirement, unlock_fee=result["unlock_fee"], currency=result["currency"],no_of_media=no_of_media,mediatypes=mediatypes, influence=str2bool(result["influence"]), magazine=str2bool(result["magazine"]), stereo=str2bool(result["stereo"]),md=str2bool(result["md"]))
        db.session.add(newExclusive)
        db.session.flush()
        upload_folder = app.config['UPLOAD_FOLDER'] + "exclusives/"
        prefix = "exclusive" + str(newExclusive.exclusive_id)
        os.makedirs(upload_folder + prefix)
        for index, file in enumerate(mainmedia):
            filename = "upload" + str(index) 
            file.save(os.path.join(upload_folder + prefix, filename)) 
        db.session.commit()
        return jsonify({"msg": "Upload made successfully","pree_id":newPree.pree_id, "exclusive_id": newExclusive.exclusive_id}), 200
    elif request.method == 'GET':
        results = Pree.query.filter(and_(Pree.is_visible == True,Pree.pree_type == "exclusive")).order_by(Pree.pree_id.desc()).all()
        exclusives = []
        for pree in results:
            theUser = User.query.get(pree.user_id)
            userObj = {"user_id":theUser.user_id, "username":theUser.username,"access-type":theUser.accessType}
            if pree.is_media and pree.pree_type == 'exclusive':
                theExclusive = Exclusive.query.filter_by(pree_id=pree.pree_id).first()
                attachment = {"exclusive_id":theExclusive.exclusive_id,"title":theExclusive.title, "artistname":theExclusive.artistname, "category":theExclusive.category, "genre":theExclusive.genre,"captionlist":theExclusive.captionlist, "description":theExclusive.description, "playback":theExclusive.playback, "unlock_requirement":theExclusive.unlock_requirement, "is_locked":theExclusive.is_locked, "is_downloadable":theExclusive.is_downloadable, "unlock_fee": theExclusive.unlock_fee ,"no_of_media": theExclusive.no_of_media,"mediatypes":theExclusive.mediatypes, "influence":theExclusive.influence, "stereo":theExclusive.stereo, "md":theExclusive.md, "magazine":theExclusive.magazine}
            preeObj = {"pree_id":pree.pree_id, "user":userObj, "date_added":str(pree.date_added), "is_media":pree.is_media,"pree_type":pree.pree_type, "approvals":pree.approvals, "disapprovals":pree.disapprovals, "comments":pree.comments, "attachment" : attachment}
            exclusives.append(preeObj)
        return {"exclusives":exclusives}, 200
    return jsonify({"msg":"There was an error somewhere."}), 400

"""@app.route('/api/get-exclusive', methods=['GET','POST'])
def get_exclusive():
    if request.method == 'POST':
        exclusive_id = request.json.get('exclusive_id', None)
        
        if page_id != '0':
            page_details = Preepedia.query.filter(Preepedia.page_id == page_id).first()
            if page_details.pagetype == "mini-biography":
                bioinfo = Biography.query.filter_by(page_id=page_details.page_id).first()
                additional = {"bioname":bioinfo.bioname,"gender":bioinfo.gender,"dob":bioinfo.dob}
            else:
                additional = {}
            upload_folder = "/images/preepedia/"
            prefix = "page" + str(page_id)
            paragraphs = []
            f = open(upload_folder + prefix + "/content.txt", "r")
            if f.mode == "r":
                contents = f.readlines()
            if(contents[0].strip() == "*^&Intro*^&"):
                intro = contents[1].strip()
            else:
                intro = ""
            count = 0
            for line in contents:
                if line.strip() == "*^&SUBCONTENT*^&":
                    count += 1
                    paragraphs.append([])
                if line.strip() != "*^&SUBCONTENT*^&" and line.strip() != "*^&Intro*^&" and count > 0:
                    paragraphs[count - 1].append(line.strip())
            print(len(paragraphs))
            pageObj = {"page_id":page_details.page_id,"drafter":page_details.drafter,"pagetype":page_details.pagetype,"section":page_details.section,"title":page_details.title,"intro":intro,"subtitles":page_details.subtitles,"subcontent":paragraphs,"has_mainmedia":page_details.has_mainmedia,"no_of_media":page_details.no_of_media, "mediatypes":page_details.mediatypes,"captionlist":page_details.captionlist,"additional":additional}
            return {"page":pageObj} , 200
        else:
            return jsonify({"msg":"Group does not have ID of Zero (0)."}), 205
    return jsonify({"msg":"There was an error somewhere."}), 400"""
