from api import app
import time
import json
import os

from lib2to3.refactor import _identity
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from flask import request, jsonify
from sqlalchemy import or_ , and_
from api.models import db, User, Accesses, Profile, Pree, Approvals, Media, Quote, Exclusive, ExclusiveSale, Subscriber, Subscription, GroupPree, Group
from api.specials import Preepedia, Biography, Product
from api.relations import check_follower, check_following

###############-----actions.py----##############

def str2bool(v):
  return v.lower() == "true" 

#api method for prees of followers - is-neccessary ? is-beneficial 

#api method for all prees
@app.route('/api/ypree', methods=['GET', 'POST'])
def ypree():
    if request.method == 'POST': 
        result = request.form
        type_of = result["type_of"]
        user_id = result["user_id"]
        date_added = result["theDateTime"]
        pree_type = result["pree_type"]
        print(type_of)
        if type_of == 'media':
            is_media = True
        else:
            is_media = False
        newPree = Pree(user_id=user_id,date_added=date_added,is_media=is_media, pree_type=pree_type)
        db.session.add(newPree)
        db.session.flush()
        print(is_media)
        if is_media == True:
            print("inside")
            media = request.files.getlist("media")
            no_of_media = (len(media))
            print(no_of_media)
            newMedia = Media(pree_id=newPree.pree_id,caption=result["caption"],no_of_media=no_of_media,has_image=str2bool(result["has_image"]),has_audio=str2bool(result["has_audio"]),has_video=str2bool(result["has_video"]))
            db.session.add(newMedia)
            prefix = "pree" + str(newPree.pree_id)
            os.makedirs(app.config['UPLOAD_FOLDER'] + "media/" + prefix)
            for index, file in enumerate(media):
                filename = "post" + str(index) 
                file.save(os.path.join(app.config['UPLOAD_FOLDER'] + "media/" + prefix, filename)) 
        else:
            newQuote = Quote(pree_id=newPree.pree_id,the_quote=result["a_quote"])
            db.session.add(newQuote)
        if pree_type == 'group':
            match_group = GroupPree(pree_id=newPree.pree_id,group_id=result["group_id"])
            db.session.add(match_group)
        db.session.commit()
        return jsonify({"msg": "Pree made successfully","id":newPree.pree_id}), 200        
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-pree', methods=['POST'])
def get_pree():
    if request.method == 'POST':
        pree_id = request.json.get('pree_id', None)
        user_id = request.json.get('user_id', None)
        #users = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter(or_(User.username.ilike('%'+checkwg+'%'), User.firstname.ilike('%'+checkwg+'%'), User.lastname.ilike('%'+checkwg+'%') )).all() 
        #results = db.session.query(Pree, Approvals).join(Approvals, Pree.pree_id == Approvals.pree_id).order_by(Pree.pree_id.desc()).all()
        pree = Pree.query.get(pree_id)
        if pree.is_visible == True:
            theUser = User.query.get(pree.user_id)
            userObj = {"user_id":theUser.user_id, "username":theUser.username,"access-type":theUser.accessType}
            if pree.is_media and pree.pree_type != 'exclusive':
                theMedia = Media.query.get(pree.pree_id)
                attachment = {"caption":theMedia.caption, "no_of_media":theMedia.no_of_media, "has_image":theMedia.has_image, "has_audio":theMedia.has_audio, "has_video":theMedia.has_video}
            elif pree.is_media and pree.pree_type == 'exclusive':
                theExclusive = Exclusive.query.filter_by(pree_id = pree.pree_id).first()
                attachment = {"exclusive_id":theExclusive.exclusive_id,"title":theExclusive.title, "artistname":theExclusive.artistname, "genre":theExclusive.genre, "captionlist":theExclusive.captionlist, "description":theExclusive.description, "playback":theExclusive.playback, "unlock_requirement": theExclusive.unlock_requirement, "is_locked":theExclusive.is_locked, "is_downloadable":theExclusive.is_downloadable, "unlock_fee":theExclusive.unlock_fee, "no_of_media":theExclusive.no_of_media, "mediatypes":theExclusive.mediatypes , "influence":theExclusive.influence,"stereo":theExclusive.stereo, "md" : theExclusive.md,"magazine":theExclusive.magazine, "views":theExclusive.views , "has_cover_art":theExclusive.has_cover_art }
            elif pree.is_media and pree.pree_type == 'product':
                product = Product.query.filter_by(pree_id = pree.pree_id).first()
                attachment = {"product_id":product.product_id,"lister":product.lister,"brand":product.brand,"name":product.name,"category":product.category,"condition":product.condition,"typeOf":product.typeOf,"location":product.location,"stock":product.stock,"price":product.price,"currency":product.currency, "year": product.year, "colors": product.colors, "package": product.package, "description": product.description, "numOfPics":product.numOfPics}
            else:
                theQuote = Quote.query.get(pree.pree_id)
                attachment = {"the_quote":theQuote.the_quote}
            if pree.pree_type == "group":
                #change to single query eventually
                group_pree = GroupPree.query.get(pree.pree_id)
                theGroup = Group.query.get(group_pree.group_id)
                groupObj = {"group_id":theGroup.group_id,"group_name":theGroup.name}
            else:
                groupObj = {}
            record = Approvals.query.filter_by(user_id=user_id,pree_id=pree.pree_id).first()
            if record is not None:
                approvedObj = record.is_approved
            else:
                approvedObj = None
            preeObj = {"pree_id":pree.pree_id, "user":userObj, "date_added":str(pree.date_added), "is_media":pree.is_media,"pree_type":pree.pree_type, "approvals":pree.approvals, "disapprovals":pree.disapprovals, "comments":pree.comments, "attachment" : attachment, "group":groupObj,"is_approved": approvedObj}
            return preeObj, 200
        else:
            return {"msg":"pree no longer is visible"}, 201
    return jsonify({"msg":"There was an error somewhere."}), 400
#api method for prees of figures -- standard
@app.route('/api/see-the-pree', methods=['GET','POST'])
def see_the_pree():
    if request.method == 'POST':         
        user_id = request.json.get('user_id', None)
        results = Pree.query.filter(Pree.is_visible == True).order_by(Pree.pree_id.desc()).all()
        prees = []
        for pree in results:
            if(check_following(user_id, pree.user_id) or pree.user_id == user_id):
                theUser = User.query.get(pree.user_id)
                theProfile = Profile.query.get(pree.user_id)
                #theUsers = User.query.join(Profile, User.user_id == Profile.user_id).filter(User.user_id == pree.user_id)
                userObj = {"user_id":theUser.user_id, "username":theUser.username,"access-type":theUser.accessType, "has_dp":theProfile.has_dp}
                if pree.is_media and pree.pree_type == 'individual':
                    theMedia = Media.query.get(pree.pree_id)
                    attachment = {"caption":theMedia.caption, "no_of_media":theMedia.no_of_media, "has_image":theMedia.has_image, "has_audio":theMedia.has_audio, "has_video":theMedia.has_video}
                elif pree.is_media and pree.pree_type == 'exclusive':
                    theExclusive = Exclusive.query.filter_by(pree_id = pree.pree_id).first()
                    attachment = {"exclusive_id":theExclusive.exclusive_id,"title":theExclusive.title, "artistname":theExclusive.artistname, "genre":theExclusive.genre, "captionlist":theExclusive.captionlist, "description":theExclusive.description, "playback":theExclusive.playback, "unlock_requirement": theExclusive.unlock_requirement, "is_locked":theExclusive.is_locked, "is_downloadable":theExclusive.is_downloadable, "unlock_fee":theExclusive.unlock_fee, "no_of_media":theExclusive.no_of_media, "mediatypes":theExclusive.mediatypes , "influence":theExclusive.influence,"stereo":theExclusive.stereo, "md" : theExclusive.md,"magazine":theExclusive.magazine, "views":theExclusive.views, "has_cover_art":theExclusive.has_cover_art }
                elif pree.is_media and pree.pree_type == 'product':
                    product = Product.query.filter_by(pree_id = pree.pree_id).first()
                    attachment = {"product_id":product.product_id,"lister":product.lister,"brand":product.brand,"name":product.name,"category":product.category,"condition":product.condition,"typeOf":product.typeOf,"location":product.location,"stock":product.stock,"price":product.price,"currency":product.currency, "year": product.year, "colors": product.colors, "package": product.package, "description": product.description, "numOfPics":product.numOfPics}
                else:
                    theQuote = Quote.query.get(pree.pree_id)
                    attachment = {"the_quote":theQuote.the_quote}
                if pree.pree_type == "group":
                    #change to single query eventually
                    group_pree = GroupPree.query.get(pree.pree_id)
                    theGroup = Group.query.get(group_pree.group_id)
                    groupObj = {"group_id":theGroup.group_id,"group_name":theGroup.name}
                else:
                    groupObj = {}
                record = Approvals.query.filter_by(user_id=user_id,pree_id=pree.pree_id).first()
                if record is not None:
                    approvedObj = record.is_approved
                else:
                    approvedObj = None
                preeObj = {"pree_id":pree.pree_id, "user":userObj, "date_added":str(pree.date_added), "is_media":pree.is_media,"pree_type":pree.pree_type, "approvals":pree.approvals, "disapprovals":pree.disapprovals, "comments":pree.comments, "attachment" : attachment, "group":groupObj, "is_approved": approvedObj}
                prees.append(preeObj)
        return json.dumps(prees), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method for pree of Followers -- cutting edge
@app.route('/api/see-the-view', methods=['POST'])
def see_the_view():
    if request.method == 'POST':         
        print('POST-GET')
        user_id = request.json.get('user_id', None)
        results = Pree.query.filter(Pree.is_visible == True).order_by(Pree.pree_id.desc()).all()
        prees = []
        for pree in results:
            if (check_follower(user_id,Pree.user_id) and pree.user_id == user_id):
                theUser = User.query.get(pree.user_id)
                userObj = {"user_id":theUser.user_id, "username":theUser.username,"access-type":theUser.accessType}
                if pree.is_media and pree.pree_type != 'exclusive':
                    theMedia = Media.query.get(pree.pree_id)
                    attachment = {"caption":theMedia.caption, "no_of_media":theMedia.no_of_media, "has_image":theMedia.has_image, "has_audio":theMedia.has_audio, "has_video":theMedia.has_video}
                elif pree.is_media and pree.pree_type == 'exclusive':
                    theExclusive = Exclusive.query.filter_by(pree_id = pree.pree_id).first()
                    attachment = {"exclusive_id":theExclusive.exclusive_id,"title":theExclusive.title, "artistname":theExclusive.artistname, "genre":theExclusive.genre, "captionlist":theExclusive.captionlist, "description":theExclusive.description, "playback":theExclusive.playback, "unlock_requirement": theExclusive.unlock_requirement, "is_locked":theExclusive.is_locked, "is_downloadable":theExclusive.is_downloadable, "unlock_fee":theExclusive.unlock_fee, "no_of_media":theExclusive.no_of_media, "mediatypes":theExclusive.mediatypes , "influence":theExclusive.influence,"stereo":theExclusive.stereo, "md" : theExclusive.md,"magazine":theExclusive.magazine, "views":theExclusive.views }
                else:
                    theQuote = Quote.query.get(pree.pree_id)
                    attachment = {"the_quote":theQuote.the_quote}
                if pree.pree_type == "group":
                    #change to single query eventually
                    group_pree = GroupPree.query.get(pree.pree_id)
                    theGroup = Group.query.get(group_pree.group_id)
                    groupObj = {"group_id":theGroup.group_id,"group_name":theGroup.name}
                else:
                    groupObj = {}
                preeObj = {"pree_id":pree.pree_id, "user":userObj, "date_added":str(pree.date_added), "is_media":pree.is_media,"pree_type":pree.pree_type, "approvals":pree.approvals, "disapprovals":pree.disapprovals, "comments":pree.comments, "attachment" : attachment, "group":groupObj}
                prees.append(preeObj)
        return json.dumps(prees)
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method for performing search of Users only ( add rank to search result )
@app.route('/api/search-users', methods=['POST'])
def search_users():
    if request.method == 'POST':
        searchval = request.json.get('searchval', None)
        user_id = request.json.get('user_id', None)
        users = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter(or_(User.username.ilike('%'+searchval+'%') )).order_by(User.username).all() 
        userlist = []
        for user in users:
            is_follower = check_follower(user_id,user.User.user_id)
            aUserObj = {"user_id":user.User.user_id, "firstname":user.User.firstname, "lastname":user.User.lastname, "username":user.User.username, "tagline":user.Profile.tagline, "location":user.Profile.location, "has_dp":user.Profile.has_dp, "is_follower":is_follower}
            userlist.append(aUserObj)
        result = {"userlist":userlist}
        return result , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method for performing search (reduce data from search result -x-  replace access-type with ranking )
@app.route('/api/do-search', methods=['POST'])
def do_search():
    if request.method == 'POST':
        checkwg = request.json.get('checkwg', None)
        user_id = request.json.get('user_id', None)
        #users = User.query.filter(or_( User.firstname.like(checkwg), User.lastname.like(checkwg), User.username.like(checkwg) )).all()
        users = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter(or_(User.username.ilike('%'+checkwg+'%'), User.firstname.ilike('%'+checkwg+'%'), User.lastname.ilike('%'+checkwg+'%') )).order_by(User.username).all() 
        userlist = []
        #portfolios
        portfoliolist = [1,2,3,4,5]
        for user in users:
            is_follower = check_follower(user_id,user.User.user_id)
            aUserObj = {"user_id":user.User.user_id, "firstname":user.User.firstname, "lastname":user.User.lastname, "username":user.User.username, "access-type":user.User.accessType, "tagline":user.Profile.tagline, "location":user.Profile.location, "has_dp":user.Profile.has_dp, "is_follower":is_follower}
            userlist.append(aUserObj)
        result = {"userlist":userlist,"portfoliolist":portfoliolist}
        return result , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method for getting full profile details --> (change to user-view in future)
@app.route('/api/my-view', methods=['POST'])
def my_view():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        print(user_id)
        if user_id != '0':
            user_details = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter(User.user_id == user_id).first() #.filter(or_( User.firstname.like(checkwg), User.lastname.like(checkwg), User.username.like(checkwg) )).all()
            myUserObj = {"user_id":user_details.User.user_id, "firstname":user_details.User.firstname, "lastname":user_details.User.lastname, "username":user_details.User.username, "access-type":user_details.User.accessType, "dob": user_details.Profile.dob , "tagline":user_details.Profile.tagline, "description":user_details.Profile.description, "location":user_details.Profile.location, "followers":user_details.Profile.followers, "following":user_details.Profile.following, "linkages":user_details.Profile.linkages,"groups":user_details.Profile.groups, "has_dp":user_details.Profile.has_dp, "has_cv":user_details.Profile.has_cv}
            return myUserObj , 200
        else:
            return jsonify({"msg":"User does not have ID of Zero (0)."}), 205
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/testing', methods=['POST'])
def testing():
    if request.method == 'POST':
        #request_data = request.get_json()
        medialist = request.files.getlist('medialist')
        print(len(medialist))
        for index, pic in enumerate(medialist):
            if pic.filename == "empty":
                print("empty")
            else:
                print(pic)
        pmcaptionlist = request.form["pmcaptionlist"].split(',')
        return jsonify({"msg":"Testing"}), 200
    return jsonify({"msg":"There was an error somewhere."}), 404

@app.route('/api/preepedia', methods=['POST', 'GET'])
def preepedia():
    if request.method == 'POST':
        result = request.form
        if result["pagetype"] == "mini-biography":
            title = result["bioname"]
        else:
            title = result["title"]
        has_mainmedia = has_medialist = False
        captionlist = pmcaptionlist = subtitles = []
        if result["has_media"] == "true":
            has_mainmedia = has_medialist = True
            captionlist = result["captionlist"].split(',')
            pmcaptionlist = request.form["pmcaptionlist"].split(',')
        subtitles = request.form["subtitles"].split(',')
        subcontent = request.form["subContent"].split("#*@#")
        #print(subcontent)
        subcontent.pop((len(subcontent) - 1))
        mainmedia = request.files.getlist("mainmedia")
        no_of_media = (len(mainmedia))
        mediatypes = request.form["mediatypes"].split(',')
        print(no_of_media)
        newPage = Preepedia(drafter=result["user_id"],pagetype=result["pagetype"],section=result["section"],title=title, intro="this is a test", subtitles=subtitles, subcontent=subtitles, has_mainmedia=has_mainmedia, no_of_media=no_of_media,mediatypes=mediatypes, captionlist=captionlist, has_medialist=has_medialist, pmcaptionlist=pmcaptionlist)
        db.session.add(newPage)
        db.session.flush()
        if result["pagetype"] == "mini-biography":
            newBio = Biography(page_id=newPage.page_id,bioname=result["bioname"],dob=result["dob"],gender=result["gender"])
            db.session.add(newBio)
        #upload_folder = "/images/preepedia/"
        upload_folder = app.config['UPLOAD_FOLDER']
        prefix = "page" + str(newPage.page_id)
        os.makedirs(upload_folder + prefix)
        if result["has_media"] == "true":
            for index, media in enumerate(mainmedia):
                filename = "main" + str(index) 
                media.save(os.path.join(upload_folder + prefix, filename)) 
        #paragraphs = []
        f = open(upload_folder + prefix + "/content.txt", "w+")
        if (request.form["intro"] != ""):
            f.write("*^&Intro*^&\r\n")
            f.write("%s\r\n" % request.form["intro"])
        for index, content in enumerate(subcontent):
            #paragraphs.append([])
            f.write("*^&SUBCONTENT*^&\r\n")
            arr = content.split("*^&")
            arr.pop((len(arr) - 1))
            #paragraphs[index] = arr
            for para in arr:
                if(para[0] == ","):
                    f.write("%s\r\n" % para.replace(",","",1))
                else:
                    f.write("%s\r\n" % para)
        #print(len(subcontent[0]))
        #print(paragraphs[2][0])
        #print(len(paragraphs[1][0]))

        medialist = request.files.getlist('medialist')
        print(len(medialist))
        for idx, pic in enumerate(medialist):
            if pic.filename == "empty":
                print("empty")
            else:
                filename = "paragraph" + str(idx) 
                pic.save(os.path.join(upload_folder + prefix, filename)) 
        db.session.commit()
        return jsonify({"msg": "page added successfully", "page_id":newPage.page_id, "numOfPics":1}), 200
    elif request.method == 'GET':
        results = Preepedia.query.all()
        pages = []
        upload_folder = app.config['UPLOAD_FOLDER'] + "preepedia/"
        for page in results:
            prefix = "page" + str(page.page_id)
            f = open(upload_folder + prefix + "/content.txt", "r")
            if f.mode == "r":
                contents = f.readlines()
            if(contents[0].strip() == "*^&Intro*^&"):
                intro = contents[1].strip()
            else:
                intro = ""
            if page.pagetype == "mini-biography":
                bioinfo = Biography.query.filter_by(page_id=page.page_id).first()
                additional = {"bioname":bioinfo.bioname,"gender":bioinfo.gender,"dob":bioinfo.dob}
            else:
                additional = {}
            pageObj = {"page_id":page.page_id,"drafter":page.drafter,"pagetype":page.pagetype,"section":page.section,"title":page.title,"intro":intro,"subtitles":page.subtitles,"additional":additional}
            pages.append(pageObj)
        return {"pages":pages}, 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to get single page
@app.route('/api/get-page', methods=['POST'])
def get_page():
    if request.method == 'POST':
        page_id = request.json.get('page_id', None)
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
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to check if cv or dp is available
@app.route('/api/get-page-media', methods=['POST'])
def get_page_media():
    if request.method == 'POST':
        page_id = request.json.get('page_id', None)
        page_record = Preepedia.query.get(page_id)
        if page_record is not None:
            return{'has_mainmedia' : page_record.has_mainmedia}, 200
        return jsonify({"msg":"Group was not found."}), 205
    return jsonify({"msg":"Request not accepted."}), 400
