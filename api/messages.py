from api import app
import time
import json
import os

from flask import request, jsonify
from sqlalchemy import or_ , and_ , func, select
from sqlalchemy.orm import aliased
from api.models import db, User, Message, Profile 
from api.security import confirm_token
###############----messages.py-----##############

#api method to create new messages.
@app.route('/api/create-message', methods=['GET','POST'])
def create_message():
    if request.method == 'POST':
        token = request.json.get('token', None)
        uname = request.json.get('uname', None)
        sender_id = confirm_token(token)
        receiver_id = User.query.filter_by(username=uname).first().user_id
        theMsg = request.json.get('theMsg', None)
        theDate = request.json.get('theDate', None)
        newMessage = Message(sender_id=sender_id, receiver_id=receiver_id, message_content=theMsg, sent_date=theDate)
        db.session.add(newMessage)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg":"Message sent successfully.", "message_id":newMessage.message_id}) , 200
    return jsonify({"msg":"There was an error when sending the message."}), 400

#api method to get all convos
"""@app.route('/api/get-convos-scrap', methods=['GET','POST'])
def get_convos_scrap():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        print(user_id)
        convos = []
        #query1 = db.session.query(Message.receiver_id).filter(Message.sender_id == user_id).distinct(Message.receiver_id)
        #query2 = db.session.query(Message.sender_id).filter(Message.receiver_id == user_id).distinct(Message.sender_id)
        #query1 = db.session.query(Message).filter(Message.sender_id == user_id).order_by(Message.message_id.desc()).group_by(Message.message_id, Message.receiver_id)
        #query2 = db.session.query(Message).filter(Message.receiver_id == user_id).order_by(Message.message_id.desc()).group_by(Message.message_id, Message.sender_id)
        query1 = db.session.query(Message).filter(Message.message_id.in_(db.session.query(func.max(Message.message_id)).filter(Message.sender_id == user_id).group_by(Message.message_id, Message.receiver_id)))
        #query1 = db.session.query(Message).filter(Message.sender_id == user_id).group_by(Message.message_id, Message.receiver_id).having(func.count(Message.message_id) > 1)
        query2 = db.session.query(Message).filter(Message.receiver_id == user_id).group_by(Message.message_id, Message.sender_id).having(func.count(Message.message_id) > 1)
        q3 = query1.union(query2).order_by(Message.message_id.desc())
        print(q3)
        results = db.session.execute(query1)
        #results = Message.query.filter(or_(Message.sender_id == user_id, Message.receiver_id == user_id)).order_by(Message.message_id.desc()).first() #.distinct(Message.sender_id, Message.receiver_id)
        #results = Message.query.filter(or_(Message.sender_id == user_id, Message.receiver_id == user_id)).group_by(Message.receiver_id, Message.sender_id)
        #results = Message.query(func.max(Message.message_id)).filter(or_(Message.sender_id == user_id, Message.receiver_id == user_id)).group_by(Message.receiver_id)
        #results = db.session.query(Message).filter(Message.sender_id == user_id).distinct(Message.receiver_id)
        #results = Message.query.filter(or_(Message.sender_id == user_id, Message.receiver_id == user_id)).order_by(Message.message_id.desc()).group_by()
        for message in results:
            print(message)
            #msgObj = {"message_id":message.message_id, "sender_id":message.sender_id, "receiver_id":message.receiver_id, "message_content":message.message_content, "sent_date":message.sent_date, "is_seen":message.is_seen, "is_visible":message.is_visible}
            convos.append("")
        return {"convos":convos}, 200
    return jsonify({"msg":"There was an error; request not accepted."}), 400"""

#api method to get all convos
@app.route('/api/get-convos', methods=['GET','POST'])
def get_convos():
    if request.method == 'POST':
        token = request.json.get('token', None)
        user_id = confirm_token(token)
        convos = []
        query1 = db.session.query(Message.receiver_id).filter(Message.sender_id == user_id).distinct(Message.receiver_id)
        query2 = db.session.query(Message.sender_id).filter(Message.receiver_id == user_id).distinct(Message.sender_id)
        q3 = query1.union(query2)
        results = db.session.execute(q3)
        for correspondent in results:
            #message = db.session.query(Message, User, Profile).join(User, User.user_id == Message.sender_id).join(Profile, Profile.user_id == Message.sender_id).filter(or_(and_(Message.sender_id == user_id, Message.receiver_id == correspondent[0]), and_(Message.sender_id == correspondent[0], Message.receiver_id == user_id))).order_by(Message.message_id.desc()).first()
            userRecv = aliased(User)
            userSend = aliased(User)
            profileSend = aliased(Profile)
            profileRecv = aliased(Profile)
            stmt = select(func.max(Message.message_id)).where(or_(and_(Message.sender_id == user_id, Message.receiver_id == correspondent[0]), and_(Message.sender_id == correspondent[0], Message.receiver_id == user_id)))
            message = db.session.query(Message, userSend.firstname, userSend.lastname, userSend.username, profileSend.tagline, profileSend.has_dp, userRecv.firstname, userRecv.lastname, userRecv.username, profileRecv.tagline, profileRecv.has_dp).\
                join(userSend, userSend.user_id == Message.sender_id).join(profileSend, profileSend.user_id == Message.sender_id).\
                join(userRecv, userRecv.user_id == Message.receiver_id).join(profileRecv, profileRecv.user_id == Message.receiver_id).\
                filter(Message.message_id == db.session.execute(stmt).first()[0]).first()
            if (message[0].sender_id == user_id):
                attachment = {"firstname":message[6], "lastname":message[7], "username":message[8], "tagline":message[9], "has_dp":message[10], "metrics":"sent"}
            else:
                attachment = {"firstname":message[1], "lastname":message[2], "username":message[3], "tagline":message[4], "has_dp":message[5], "metrics":"received"}
            msgObj = {"message_content":message[0].message_content, "sent_date":message[0].sent_date, "is_seen":message[0].is_seen, "is_visible":message[0].is_visible, "attachment":attachment}
            convos.append(msgObj)
        return {"convos":convos}, 200
    return jsonify({"msg":"There was an error; request not accepted."}), 400

#api method to get all messages
"""@app.route('/api/get-messages', methods=['GET','POST'])
def get_messages():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        messages = []
        results = Message.query.filter(or_(Message.sender_id == user_id, Message.receiver_id == user_id)).all()
        for message in results:
            msgObj = {"message_id":message.message_id, "sender_id":message.sender_id, "receiver_id":message.receiver_id, "message_content":message.message_content, "sent_date":message.sent_date, "is_seen":message.is_seen, "is_visible":message.is_visible}
            messages.append(msgObj)
        return {"messages":messages}, 200
    return jsonify({"msg":"There was an error; request not accepted."}), 400
"""

#api method to get convo
@app.route('/api/get-convo', methods=['GET','POST'])
def get_convo():
    if request.method == 'POST':
        #user_id = request.json.get('user_id', None)
        #userview_id = request.json.get('userview_id', None)
        token = request.json.get('token', None)
        uname = request.json.get('uname', None)
        user_id = confirm_token(token)
        userview_id = User.query.filter_by(username=uname).first().user_id
        convo = []
        results = Message.query.filter(or_( and_(Message.sender_id == user_id,Message.receiver_id == userview_id), and_(Message.sender_id == userview_id, Message.receiver_id == user_id))).all()
        #print(results)
        for message in results:
            msgObj = {"message_id":message.message_id, "sender_id":message.sender_id, "receiver_id":message.receiver_id, "message_content":message.message_content, "sent_date":message.sent_date, "is_seen":message.is_seen, "is_visible":message.is_visible}
            convo.append(msgObj)
        return {"convo":convo}, 200
    return jsonify({"msg":"There was an error; request not accepted."}), 400
