from api import app
import time
import json
import os

from flask import request, jsonify
from sqlalchemy import or_ , and_
from api.models import db, User, Accesses, Profile, Pree, Approvals, Media, Quote, Follower, Comments, CommentsApprovals, CommentsReplies, Group ,GroupRelations
from api.security import confirm_token

###############----relations.py-----##############
@app.route('/api/relations/')
def relations():
    return "relations"

#helper method to compute count of followers
def get_count_followers(user_id):
    count = len(Follower.query.filter(Follower.figure_id==user_id, Follower.is_following==True).all())
    return count

#helper method to compute count of following
def get_count_figures(user_id):
    count = len(Follower.query.filter(Follower.follower_id==user_id, Follower.is_following==True).all())
    return count

#helper method to compute count of fraternity
def get_count_fraternity(user_id):
    followers = Follower.query.filter(Follower.figure_id==user_id, Follower.is_following==True).all()
    figures = Follower.query.filter(Follower.follower_id==user_id, Follower.is_following==True).all() 
    fraternity = []
    for follower in followers:
        for figure in figures:
            if (follower.follower_id == figure.figure_id):
                fraternity.append(figure)
    count = len(fraternity)
    return count

#helper method to compute count of groups
def get_count_groups(user_id):
    count = len(GroupRelations.query.filter(GroupRelations.user_id==user_id, GroupRelations.in_group==True).all())
    return count

#helper method to compute count of family
def get_count_family(user_id):
    count = len(Follower.query.filter(Follower.user_id==user_id, Follower.is_following==True).all())
    return count

#helper method to update stats --> find more reasons for using this function
def update_stats(user_id):
    user_profile = Profile.query.get(user_id)
    if(user_profile.followers != get_count_followers(user_id)):
        user_profile.followers = get_count_followers(user_id)
    if(user_profile.figures != get_count_figures(user_id)):
        user_profile.figures = get_count_figures(user_id)
    if(user_profile.fraternity != get_count_fraternity(user_id)):
        user_profile.fraternity = get_count_fraternity(user_id)
    if(user_profile.groups != get_count_groups(user_id)):
        user_profile.groups = get_count_groups(user_id)
    db.session.commit()
    return True

#api method to get followers
@app.route('/api/get-followers', methods=['POST'])
def get_followers():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        followers = Follower.query.filter(Follower.figure_id == user_id, Follower.is_following==True).all()#, Follower.is_following == True).all()
        followerslist = []
        for follower in followers:
            user_details = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter(User.user_id == follower.follower_id).first()
            aUserObj = {"user_id":user_details.User.user_id, "firstname":user_details.User.firstname, "lastname":user_details.User.lastname, "username":user_details.User.username, "access-type":user_details.User.accessType, "tagline":user_details.Profile.tagline, "location":user_details.Profile.location, "has_dp":user_details.Profile.has_dp}
            followerslist.append(aUserObj)
        return {"followerslist":followerslist}, 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to get followings
@app.route('/api/get-figures', methods=['POST'])
def get_figures():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        figures = Follower.query.filter(Follower.follower_id == user_id, Follower.is_following==True).all()
        figureslist = []
        for figure in figures:
            user_details = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter(User.user_id == figure.figure_id).first()
            aUserObj = {"user_id":user_details.User.user_id, "firstname":user_details.User.firstname, "lastname":user_details.User.lastname, "username":user_details.User.username, "access-type":user_details.User.accessType, "tagline":user_details.Profile.tagline, "location":user_details.Profile.location, "has_dp":user_details.Profile.has_dp}
            figureslist.append(aUserObj)
        return {"figureslist":figureslist} , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to get fraternity
@app.route('/api/get-fraternity', methods=['POST'])
def get_fraternity():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None) 
        followers = Follower.query.filter(Follower.figure_id == user_id, Follower.is_following==True).all() 
        figures = Follower.query.filter(Follower.follower_id == user_id, Follower.is_following==True).all()
        fraternity = []
        for follower in followers:
            for figure in figures:
                if (follower.follower_id == figure.figure_id):
                    fraternity.append(figure)
        fraternitylist = []
        for linkage in fraternity:
            user_details = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter(User.user_id == linkage.figure_id).first()
            aUserObj = {"user_id":user_details.User.user_id, "firstname":user_details.User.firstname, "lastname":user_details.User.lastname, "username":user_details.User.username, "access-type":user_details.User.accessType, "tagline":user_details.Profile.tagline, "location":user_details.Profile.location, "has_dp":user_details.Profile.has_dp}
            fraternitylist.append(aUserObj)
        return {"fraternitylist":fraternitylist} , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#helper method to see if this match is in Follower table
def was_recorded(figure_id, follower_id):
    wasRecorded = Follower.query.filter_by(figure_id=figure_id,follower_id=follower_id).first()
    if wasRecorded is not None:
        return True
    else:
        return False

def check_follower(figure_id, follower_id):
    wasRecorded = was_recorded(figure_id, follower_id)
    if wasRecorded is not None:
        isFollow = Follower.query.filter_by(figure_id=figure_id,follower_id=follower_id, is_following=True).first()
        if isFollow is not None:
            return True
        else:
            return False
    else:
        return False

"""def check_following(follower_id, following_id):
    wasRecorded = was_recorded(following_id, follower_id)
    if wasRecorded is not None:
        isFollow = Follower.query.filter_by(user_id=following_id,follower_id=follower_id, is_following=True).first()
        if isFollow is not None:
            return True 
        else:
            return False
    else:
        return False"""

#api method to see check if this is a match in Follower Table
@app.route('/api/is-follower', methods=['POST'])
def is_follower():
    if request.method == 'POST':
        token = request.json.get('token', None)
        uname = request.json.get('uname', None)
        user_id = confirm_token(token)
        userview_id = User.query.filter_by(username=uname).first().user_id
        #user_id = request.json.get('user_id', None)
        #userview_id = request.json.get('userview_id', None)
        return {"is_follower" : check_follower(userview_id,user_id)}, 200 
    return jsonify({"msg":"There was an error somewhere."}), 400

###### not needed, just reverse the parameters of is-follower to get is-following
@app.route('/api/is-figure', methods=['POST'])
def is_figure():
    if request.method == 'POST':
        token = request.json.get('token', None)
        uname = request.json.get('uname', None)
        user_id = confirm_token(token)
        userview_id = User.query.filter_by(username=uname).first().user_id
        return {"is_figure" : check_follower(user_id,userview_id)}, 200 
    return jsonify({"msg":"There was an error somewhere."}), 400
   
#api method to see check if this is a match and match reverse (is-linkage) in Follower Table

#api method to add followers
@app.route('/api/add-follower', methods=['POST'])
def add_follower():
    if request.method == 'POST':
        token = request.json.get('token', None)
        uname = request.json.get('uname', None)
        follower_id = confirm_token(token)
        figure_id = User.query.filter_by(username=uname).first().user_id
        #follower_id = request.json.get('user_id', None)
        #figure_id = request.json.get('userview_id', None)
        wasRecorded = was_recorded(figure_id,follower_id)
        print(wasRecorded)
        if wasRecorded == True:
            record = Follower.query.filter_by(figure_id=figure_id,follower_id=follower_id).first()
            record.is_following = True
        else:
            newFollow = Follower(figure_id=figure_id,follower_id=follower_id,is_following=True)
            db.session.add(newFollow)
        figure_profile = Profile.query.get(figure_id)
        followercount = figure_profile.followers + 1
        figure_profile.followers = followercount
        follower_profile = Profile.query.get(follower_id)
        figurecount = follower_profile.figures + 1
        follower_profile.figures = figurecount

        db.session.commit()

        return jsonify({"msg":"Follower added.","is_follower":True}) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to add followers
@app.route('/api/un-follow', methods=['PUT'])
def un_follow():
    if request.method == 'PUT':
        #follower_id = request.json.get('user_id', None)
        #figure_id = request.json.get('userview_id', None)
        token = request.json.get('token', None)
        uname = request.json.get('uname', None)
        follower_id = confirm_token(token)
        figure_id = User.query.filter_by(username=uname).first().user_id
        record = Follower.query.filter_by(figure_id=figure_id,follower_id=follower_id).first()
        record.is_following = False

        figure_profile = Profile.query.get(figure_id)
        followercount = figure_profile.followers - 1
        figure_profile.followers = followercount
        follower_profile = Profile.query.get(follower_id)
        figurecount = follower_profile.figures - 1
        follower_profile.figures = figurecount

        db.session.commit()
        return jsonify({"msg":"User unfollowed succesfully.","is_follower":False}) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400


############################################
##### to be reviewed ###################
############################################
#api method to add closest not being used as yet
@app.route('/api/add-closest', methods=['POST'])
def add_closest():
    if request.method == 'POST':
        """follower_id = request.json.get('user_id', None)
        following_id = request.json.get('userview_id', None)
        wasRecorded = was_recorded(following_id,follower_id)
        print(wasRecorded)
        if wasRecorded == True:
            record = Follower.query.filter_by(user_id=following_id,follower_id=follower_id).first()
            record.is_following = True
        else:
            newFollow = Follower(user_id=following_id,follower_id=follower_id,is_following=True)
            db.session.add(newFollow)

        user_profile = Profile.query.get(following_id)
        followercount = user_profile.followers + 1
        user_profile.followers = followercount
        follower_profile = Profile.query.get(follower_id)
        followingcount = follower_profile.following + 1
        follower_profile.following = followingcount

        db.session.commit()"""
        return jsonify({"msg":"Follower added.","is_follower":True}) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to get closest
@app.route('/api/get-closest', methods=['POST'])
def get_closest():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        followers = Follower.query.filter(Follower.user_id == user_id).all()
        followerslist = []
        for follower in followers:
            user_details = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter(User.user_id == follower.follower_id).first()
            aUserObj = {"user_id":user_details.User.user_id, "firstname":user_details.User.firstname, "lastname":user_details.User.lastname, "username":user_details.User.username, "access-type":user_details.User.accessType, "tagline":user_details.Profile.tagline, "location":user_details.Profile.location, "has_dp":user_details.Profile.has_dp}
            followerslist.append(aUserObj)
        return {"followerslist":followerslist}, 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to save profile bio
@app.route('/api/groups', methods=['POST','PUT'])
def groups():
    if request.method == 'POST':
        print('POST')
        #change this to just user_id
        result = request.form
        newGroup = Group(name=result["name"], tagline=result["tagline"], creator=result["user_id"], category=result["category"], description=result["description"], location=result["location"], status=result["status"])        
        db.session.add(newGroup)
        db.session.flush()
        if result["has_dp"] == 'true':
            newGroup.has_dp = True
            photo = request.files['photo']
            display_folder = "/images/group/display"
            photo.save(os.path.join(display_folder, str(newGroup.group_id))) 
        else:
            newGroup.has_dp = False

        newRelation = GroupRelations(user_id = result["user_id"], group_id = newGroup.group_id, is_admin=True, in_group=True)
        db.session.add(newRelation)
        db.session.commit()
        return jsonify({"msg":"Group informaiton added."}), 200
    elif request.method == 'PUT':
        print('Edit Group')
        user_id = request.json.get('user_id', None)
        uname =request.json.get('uname', None)
        dob = request.json.get('dob', None)
        tagline = request.json.get('tagline', None)
        description = request.json.get('description', None)
        location = request.json.get('location', None)
        user_record = User.query.get(user_id)
        check = User.query.filter_by(username=uname).first()
        if check is None:
            user_record.username = uname
        else:
            return jsonify({"msg":"Username not available"}), 205
        profile_record = Profile.query.get(user_id) 
        profile_record.dob = dob
        profile_record.tagline = tagline
        profile_record.description = description
        profile_record.location = location
        db.session.commit()
        return jsonify({"msg":"Bio informaiton updated."}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to get groups
@app.route('/api/get-groups', methods=['POST', 'GET'])
def get_groups():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        matches = GroupRelations.query.filter(GroupRelations.user_id == user_id).all()
        groupslist = []
        for match in matches:
            group_details = Group.query.filter(Group.group_id == match.group_id).first()
            aGroupObj = {"group_id":group_details.group_id, "name":group_details.name, "tagline":group_details.tagline, "has_dp":group_details.has_dp, "category":group_details.category, "location":group_details.location, "description":group_details.description, "members":group_details.members}
            groupslist.append(aGroupObj)
        return {"groupslist":groupslist}, 200
    elif request.method == 'GET':
        allGroups = Group.query.all()
        groupslist = []
        for group in allGroups:
            aGroupObj = {"group_id":group.group_id, "name":group.name, "tagline":group.tagline, "has_dp":group.has_dp, "category":group.category, "location":group.location, "description":group.description, "members":group.members}
            groupslist.append(aGroupObj)
        return {"groupslist":groupslist}, 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/group-view', methods=['POST'])
def group_view():
    if request.method == 'POST':
        group_id = request.json.get('group_id', None)
        if group_id != '0':
            group_details = Group.query.filter(Group.group_id == group_id).first()
            aGroupObj = {"group_id":group_details.group_id, "name":group_details.name, "tagline":group_details.tagline, "has_dp":group_details.has_dp, "category":group_details.category, "location":group_details.location, "description":group_details.description, "members":group_details.members}
            return aGroupObj , 200
        else:
            return jsonify({"msg":"Group does not have ID of Zero (0)."}), 205
    return jsonify({"msg":"There was an error somewhere."}), 400

#helper method to see if this match is in Group Relations table
def did_join(user_id, group_id):
    didJoin = GroupRelations.query.filter_by(user_id=user_id,group_id=group_id).first()
    if didJoin is not None:
        return True
    else:
        return False

#api method to check if cv or dp is available
@app.route('/api/get-group-media', methods=['POST'])
def get_group_media():
    if request.method == 'POST':
        group_id = request.json.get('group_id', None)
        group_record = Group.query.get(group_id)
        if group_record is not None:
            return{
                'has_dp' : group_record.has_dp
            }, 200
        return jsonify({"msg":"Group was not found."}), 205
    return jsonify({"msg":"Request not accepted."}), 400

#api method to see check if this is a match in Follower Table
@app.route('/api/in-group', methods=['POST'])
def in_group():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        group_id = request.json.get('group_id', None)
        didJoin = did_join(user_id, group_id)
        if didJoin is True:
            isApart = GroupRelations.query.filter_by(user_id=user_id,group_id=group_id, in_group=True).first()
            if isApart is not None:
                return {"in_group" : True}, 200
            else:
                return {"in_group" : False}, 200 
        else:
            return {"in_group" : False}, 200 
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to see check if this is a match in Follower Table
@app.route('/api/is-group-admin', methods=['POST'])
def is_group_admin():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        group_id = request.json.get('group_id', None)
        didJoin = did_join(user_id, group_id)
        if didJoin is True:
            isApart = GroupRelations.query.filter_by(user_id=user_id,group_id=group_id, is_admin=True).first()
            if isApart is not None:
                return {"is_admin" : True}, 200
            else:
                return {"is_admin" : False}, 200 
        else:
            return {"is_admin" : False}, 200 
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to add followers
@app.route('/api/join-group', methods=['POST'])
def join_group():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        group_id = request.json.get('group_id', None)
        didJoin = did_join(user_id,group_id)
        if didJoin == True:
            record = GroupRelations.query.filter_by(user_id=user_id,group_id=group_id).first()
            record.in_group = True
        else:
            newMember = GroupRelations(user_id=user_id,group_id=group_id,in_group=True)
            db.session.add(newMember)

        user_profile = Profile.query.get(user_id)
        groupcount = user_profile.groups + 1
        user_profile.groups = groupcount

        group_profile = Group.query.get(group_id)
        membercount = group_profile.members + 1
        group_profile.members = membercount

        db.session.commit()
        return jsonify({"msg":"Group Member added.","in_group":True}) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to add followers
@app.route('/api/leave-group', methods=['PUT'])
def leave_group():
    if request.method == 'PUT':
        follower_id = request.json.get('user_id', None)
        following_id = request.json.get('userview_id', None)
        record = Follower.query.filter_by(user_id=following_id,follower_id=follower_id).first()
        record.is_following = False

        user_profile = Profile.query.get(following_id)
        followercount = user_profile.followers - 1
        user_profile.followers = followercount
        follower_profile = Profile.query.get(follower_id)
        followingcount = follower_profile.following - 1
        follower_profile.following = followingcount

        db.session.commit()
        return jsonify({"msg":"User unfollowed succesfully.","is_follower":False}) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400
