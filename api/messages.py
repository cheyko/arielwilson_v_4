from api import app
import time
import json
import os

from flask import request, jsonify
from sqlalchemy import or_ , and_
from api.models import db, User, Message 

###############----messages.py-----##############

#api method to create new messages.
@app.route('/api/create-message', methods=['GET','POST'])
def create_message():
    if request.method == 'POST':
        sender_id = request.json.get('user_id', None)
        receiver_id = request.json.get('userview_id', None)
        theMsg = request.json.get('theMsg', None)
        theDate = request.json.get('theDate', None)
        newMessage = Message(sender_id=sender_id, receiver_id=receiver_id, message_content=theMsg, sent_date=theDate)
        db.session.add(newMessage)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg":"Message sent successfully.", "message_id":newMessage.message_id}) , 200
    return jsonify({"msg":"There was an error when sending the message."}), 400

#api method to get all messages
@app.route('/api/get-messages', methods=['GET','POST'])
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

#api method to get convo
@app.route('/api/get-convo', methods=['GET','POST'])
def get_convo():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        userview_id = request.json.get('userview_id', None)
        convo = []
        results = Message.query.filter(or_( and_(Message.sender_id == user_id,Message.receiver_id == userview_id), and_(Message.sender_id == userview_id, Message.receiver_id == user_id))).all()
        #print(results)
        for message in results:
            msgObj = {"message_id":message.message_id, "sender_id":message.sender_id, "receiver_id":message.receiver_id, "message_content":message.message_content, "sent_date":message.sent_date, "is_seen":message.is_seen, "is_visible":message.is_visible}
            convo.append(msgObj)
        return {"convo":convo}, 200
    return jsonify({"msg":"There was an error; request not accepted."}), 400
