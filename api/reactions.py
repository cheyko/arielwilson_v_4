from api import app
import time
import json
import os

from flask import request, jsonify
from sqlalchemy import or_ , and_
from api.models import db, User, Accesses, Profile, Pree, Approvals, Media, Quote, Follower, Comments, CommentsApprovals, CommentsReplies

###############----reactions.py-----##############

#helper method to see if pree was liked or disliked
def was_clicked(user_id, pree_id):
    wasClicked = Approvals.query.filter_by(user_id=user_id,pree_id=pree_id).first()
    if wasClicked is not None:
        return True
    else:
        return False

#api method to get reaction for prees (#hopefully implement with list of pree-IDS)
@app.route('/api/get-reaction', methods=['POST'])
def get_reaction():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        pree_id = request.json.get('pree_id', None) #hopefully implement with list of pree-IDS to reduce number of calls
        wasClicked = was_clicked(user_id,pree_id)
        if wasClicked == True:
            record = Approvals.query.filter_by(user_id=user_id,pree_id=pree_id).first()
            return {"is_approved": record.is_approved}, 200
        else:
            return {"is_approved": None}, 201
    return jsonify({"msg":"There was an error somewhere."}), 400
    
#api method to add pree likes
@app.route('/api/like-pree', methods=['POST', 'PUT'])
def like_pree():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        pree_id = request.json.get('pree_id', None)
        wasClicked = was_clicked(user_id,pree_id)
        if wasClicked == True:
            record = Approvals.query.filter_by(user_id=user_id,pree_id=pree_id).first()
            if (record.is_approved == False):
                pree_details = Pree.query.get(pree_id)
                dislikedcount = pree_details.disapprovals - 1
                pree_details.disapprovals = dislikedcount
            record.is_approved = True
        else:
            newCLick = Approvals(user_id=user_id,pree_id=pree_id,is_approved=True)
            db.session.add(newCLick)
        pree_details = Pree.query.get(pree_id)
        likedcount = pree_details.approvals + 1
        pree_details.approvals = likedcount
        db.session.commit()
        return jsonify({"msg":"Like added.","is_liked":True, "likedcount":likedcount, "dislikedcount": pree_details.disapprovals}) , 200
    if request.method == 'PUT':
        print('un-like')
        user_id = request.json.get('user_id', None)
        pree_id = request.json.get('pree_id', None)
        record = Approvals.query.filter_by(user_id=user_id,pree_id=pree_id).first()
        record.is_approved = None

        pree_details = Pree.query.get(pree_id)
        likedcount = pree_details.approvals - 1
        pree_details.approvals = likedcount
        db.session.commit()
        return jsonify({"msg":"Like added.","is_liked": None, "likedcount":likedcount}) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to add pree dislikes
@app.route('/api/dislike-pree', methods=['POST', 'PUT'])
def dislike_pree():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        pree_id = request.json.get('pree_id', None)
        wasClicked = was_clicked(user_id,pree_id)
        if wasClicked == True:
            record = Approvals.query.filter_by(user_id=user_id,pree_id=pree_id).first()
            if (record.is_approved == True):
                pree_details = Pree.query.get(pree_id)
                likedcount = pree_details.approvals - 1
                pree_details.approvals = likedcount
            record.is_approved = False
        else:
            newCLick = Approvals(user_id=user_id,pree_id=pree_id,is_approved=False)
            db.session.add(newCLick)
        pree_details = Pree.query.get(pree_id)
        dislikedcount = pree_details.disapprovals + 1
        pree_details.disapprovals = dislikedcount
        db.session.commit()
        return jsonify({"msg":"Pree was disliked.","is_liked":False,"likedcount":pree_details.approvals,"dislikedcount":dislikedcount}) , 200
    if request.method == 'PUT':
        print('un-dis-like')
        user_id = request.json.get('user_id', None)
        pree_id = request.json.get('pree_id', None)
        record = Approvals.query.filter_by(user_id=user_id,pree_id=pree_id).first()
        record.is_approved = None

        pree_details = Pree.query.get(pree_id)
        dislikedcount = pree_details.disapprovals - 1
        pree_details.disapprovals = dislikedcount
        db.session.commit()
        return jsonify({"msg":"Like added.","is_liked": None,"dislikedcount":dislikedcount}) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to get comments --> returns list + add comments replies (reduce number of calls if possible)
@app.route('/api/get-comments', methods=['POST'])
def get_comments():
    if request.method == "POST":
        pree_id = request.json.get('pree_id', None)
        result = Comments.query.filter(Comments.pree_id == pree_id, Comments.is_visible == True).order_by(Comments.comment_id.desc()).all()
        comments = []
        for comment in result:
            commentObj = {"comment_id":comment.comment_id, "pree_id":comment.pree_id, "user_id":comment.user_id, "comment_text":comment.comment_text, "date_added":str(comment.date_added), "c_approvals":comment.c_approvals, "c_disapprovals":comment.c_disapprovals, "replies":comment.replies}
            comments.append(commentObj)
        results = {"comments":comments}
        return results, 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to add, edit, and delete comments ---> returns result of request
@app.route('/api/handle-comments', methods=['POST', 'PUT', 'DELETE'])
def handle_comments():
    if request.method == "POST":
        user_id = request.json.get('user_id', None)
        pree_id = request.json.get('pree_id', None)
        comment = request.json.get('comment', None)
        newComment = Comments(pree_id=pree_id, user_id=user_id, comment_text=comment)
        pree_details = Pree.query.get(pree_id)
        count = pree_details.comments + 1
        pree_details.comments = count
        db.session.add(newComment)
        db.session.flush()
        commentObj = {"comment_id":newComment.comment_id, "pree_id":newComment.pree_id, "user_id":newComment.user_id, "comment_text":newComment.comment_text, "date_added":str(newComment.date_added), "c_approvals":newComment.c_approvals, "c_disapprovals":newComment.c_disapprovals, "replies":newComment.replies}
        db.session.commit()
        return jsonify({"msg":"Comment was successful.", "comment_num":count, "comment":commentObj}), 200
    if request.method == "PUT":
        user_id = request.json.get('user_id', None)
        comment_id = request.json.get('comment_id', None)
        editcomment = request.json.get('editcomment', None)
        comment_details = Comments.query.get(comment_id)
        comment_details.comment_text = editcomment
        db.session.commit()
        return jsonify({"msg":"Comment update was successful.","comment_id":comment_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#helper method to see if comment was liked or disliked
def was_c_clicked(user_id, comment_id):
    wasClicked = CommentsApprovals.query.filter_by(user_id=user_id,comment_id=comment_id).first()
    if wasClicked is not None:
        return True
    else:
        return False

#api method to get reaction for comments (#hopefully implement with list of comments IDS to reduce number of calls)
@app.route('/api/get-c-reaction', methods=['POST'])
def get_c_reaction():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        comment_id = request.json.get('comment_id', None) #hopefully implement with list of comments IDS
        wasClicked = was_c_clicked(user_id,comment_id)
        if wasClicked == True:
            record = CommentsApprovals.query.filter_by(user_id=user_id,comment_id=comment_id).first()
            return {"is_c_approved": record.is_c_approved}, 200
        else:
            return {"is_c_approved": None}, 201
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to add comment likes
@app.route('/api/like-comment', methods=['POST', 'PUT'])
def like_comment():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        comment_id = request.json.get('comment_id', None)
        wasClicked = was_c_clicked(user_id,comment_id)
        if wasClicked == True:
            record = CommentsApprovals.query.filter_by(user_id=user_id,comment_id=comment_id).first()
            if (record.is_c_approved == False):
                comment_details = Comments.query.get(comment_id)
                dislikedcount = comment_details.c_disapprovals - 1
                comment_details.c_disapprovals = dislikedcount
            record.is_c_approved = True
        else:
            newCLick = CommentsApprovals(user_id=user_id,comment_id=comment_id,is_c_approved=True)
            db.session.add(newCLick)
        comment_details = Comments.query.get(comment_id)
        likedcount = comment_details.c_approvals + 1
        comment_details.c_approvals = likedcount
        db.session.commit()
        return jsonify({"msg":"Like added.","is_liked":True, "likedcount":likedcount, "dislikedcount": comment_details.c_disapprovals}) , 200
    if request.method == 'PUT':
        print('un-like')
        user_id = request.json.get('user_id', None)
        comment_id = request.json.get('comment_id', None)
        record = CommentsApprovals.query.filter_by(user_id=user_id,comment_id=comment_id).first()
        record.is_c_approved = None
        comment_details = Comments.query.get(comment_id)
        likedcount = comment_details.c_approvals - 1
        comment_details.c_approvals = likedcount
        db.session.commit()
        return jsonify({"msg":"Like added.","is_liked": None, "likedcount":likedcount}) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to add comment dislikes
@app.route('/api/dislike-comment', methods=['POST', 'PUT'])
def dislike_comment():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        comment_id = request.json.get('comment_id', None)
        wasClicked = was_c_clicked(user_id,comment_id)
        if wasClicked == True:
            record = CommentApprovals.query.filter_by(user_id=user_id,comment_id=comment_id).first()
            if (record.is_c_approved == True):
                comment_details = Comments.query.get(comment_id)
                likedcount = comment_details.c_approvals - 1
                comment_details.c_approvals = likedcount
            record.is_c_approved = False
        else:
            newCLick = CommentsApprovals(user_id=user_id,comment_id=comment_id,is_c_approved=False)
            db.session.add(newCLick)
        comment_details = CommentsApprovals.query.get(comment_id)
        dislikedcount = comment_details.c_disapprovals + 1
        comment_details.c_disapprovals = dislikedcount
        db.session.commit()
        return jsonify({"msg":"Pree was disliked.","is_liked":False,"likedcount":comment_details.c_approvals,"dislikedcount":dislikedcount}) , 200
    if request.method == 'PUT':
        print('un-dis-like')
        user_id = request.json.get('user_id', None)
        comment_id = request.json.get('comment_id', None)
        record = CommentsApprovals.query.filter_by(user_id=user_id,comment_id=comment_id).first()
        record.is_c_approved = None

        comment_details = Comments.query.get(comment_id)
        dislikedcount = comment_details.c_disapprovals - 1
        comment_details.c_disapprovals = dislikedcount
        db.session.commit()
        return jsonify({"msg":"Like added.","is_liked": None,"dislikedcount":dislikedcount}) , 201
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to delete comment
@app.route('/api/delete-comment', methods=['POST'])
def delete_comment():
    if request.method == "POST":
        comment_id = request.json.get('comment_id', None)
        pree_id = request.json.get('pree_id', None)
        comment_details = Comments.query.get(comment_id)
        comment_details.is_visible = False
        pree_details = Pree.query.get(pree_id)
        count = pree_details.comments - 1
        pree_details.comments = count
        db.session.commit()
        return jsonify({"msg":"Comment deleted was successful.","comment_id":comment_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to get comments --> returns list + add comments replies (reduce number of calls if possible)
@app.route('/api/get-replies', methods=['POST'])
def get_replies():
    if request.method == "POST":
        comment_id = request.json.get('comment_id', None)
        result = CommentsReplies.query.filter(CommentsReplies.comment_id == comment_id, CommentsReplies.is_visible == True).all()
        replies = []
        for reply in result:
            replyObj = {"reply_id":reply.reply_id, "comment_id":reply.comment_id, "user_id":reply.user_id, "reply_text":reply.reply_text, "date_added":str(reply.date_added), "r_approvals":reply.r_approvals, "r_disapprovals":reply.r_disapprovals}
            replies.append(replyObj)
        results = {"replies":replies}
        return results, 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to add, edit, and delete comments ---> returns result of request
@app.route('/api/handle-replies', methods=['POST', 'PUT', 'DELETE'])
def handle_replies():
    if request.method == "POST":
        user_id = request.json.get('user_id', None)
        comment_id = request.json.get('comment_id', None)
        reply = request.json.get('reply', None)
        newReply = CommentsReplies(comment_id=comment_id, user_id=user_id, reply_text=reply)
        db.session.add(newReply)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg":"Comment was successful","reply_id":newReply.reply_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#helper method to see if reply was liked or disliked
def was_r_clicked(user_id, reply_id):
    wasClicked = RepliesApprovals.query.filter_by(user_id=user_id,reply_id=reply_id).first()
    if wasClicked is not None:
        return True
    else:
        return False

#api method to add comment likes
@app.route('/api/like-reply', methods=['POST', 'PUT'])
def like_reply():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        reply_id = request.json.get('reply_id', None)
        wasClicked = was_r_clicked(user_id,reply_id)
        if wasClicked == True:
            record = RepliesApprovals.query.filter_by(user_id=user_id,reply_id=reply_id).first()
            if (record.is_r_approved == False):
                reply_details = CommentsReplies.query.get(reply_id)
                dislikedcount = reply_details.r_disapprovals - 1
                reply_details.r_disapprovals = dislikedcount
            record.is_r_approved = True
        else:
            newCLick = RepliesApprovals(user_id=user_id,reply_id=reply_id,is_r_approved=True)
            db.session.add(newCLick)
        reply_details = CommentsReplies.query.get(reply_id)
        likedcount = reply_details.r_approvals + 1
        reply_details.r_approvals = likedcount
        db.session.commit()
        return jsonify({"msg":"Like added.","is_liked":True, "likedcount":likedcount, "dislikedcount": reply_details.r_disapprovals}) , 200
    if request.method == 'PUT':
        print('un-like')
        user_id = request.json.get('user_id', None)
        reply_id = request.json.get('reply_id', None)
        record = RepliesApprovals.query.filter_by(user_id=user_id,reply_id=reply_id).first()
        record.is_r_approved = None
        reply_details = CommentsReplies.query.get(reply_id)
        likedcount = reply_details.r_approvals - 1
        reply_details.r_approvals = likedcount
        db.session.commit()
        return jsonify({"msg":"Like added.","is_liked": None, "likedcount":likedcount}) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to add comment dislikes
@app.route('/api/dislike-reply', methods=['POST', 'PUT'])
def dislike_reply():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        reply_id = request.json.get('reply_id', None)
        wasClicked = was_r_clicked(user_id,reply_id)
        if wasClicked == True:
            record = RepliesApprovals.query.filter_by(user_id=user_id,reply_id=reply_id).first()
            if (record.is_r_approved == True):
                reply_details = CommentsReplies.query.get(reply_id)
                likedcount = reply_details.r_approvals - 1
                reply_details.r_approvals = likedcount
            record.is_r_approved = False
        else:
            newCLick = RepliesApprovals(user_id=user_id,reply_id=reply_id,is_r_approved=False)
            db.session.add(newCLick)
        reply_details = RepliesApprovals.query.get(reply_id)
        dislikedcount = reply_details.r_disapprovals + 1
        reply_details.r_disapprovals = dislikedcount
        db.session.commit()
        return jsonify({"msg":"Pree was disliked.","is_liked":False,"likedcount":reply_details.r_approvals,"dislikedcount":dislikedcount}) , 200
    if request.method == 'PUT':
        print('un-dis-like')
        user_id = request.json.get('user_id', None)
        reply_id = request.json.get('reply_id', None)
        record = RepliesApprovals.query.filter_by(user_id=user_id,reply_id=reply_id).first()
        record.is_r_approved = None

        reply_details = CommentsReplies.query.get(reply_id)
        dislikedcount = reply_details.r_disapprovals - 1
        comment_details.r_disapprovals = dislikedcount
        db.session.commit()
        return jsonify({"msg":"Like added.","is_liked": None,"dislikedcount":dislikedcount}) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to delete reply
@app.route('/api/delete-reply', methods=['POST'])
def delete_reply():
    if request.method == "POST":
        comment_id = request.json.get('comment_id', None)
        reply_id = request.json.get('reply_id', None)
        reply_details = CommentsReplies.query.get(comment_id)
        reply_details.is_visible = False
        comment_details = Comments.query.get(comment_id)
        count = pree_details.replies - 1
        comment_details.replies = count
        db.session.commit()
        return jsonify({"msg":"Reply deleted was successful.","reply_id":reply_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

#api method to add pree to favourites

#api method to get the respective favourites