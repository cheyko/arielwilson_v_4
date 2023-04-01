from api import app
from flask import jsonify, request, Response
from functools import wraps
import jwt
from sqlalchemy import func, and_
from api.models import db, TokenAlpha, TokenOmega


#function used to wrap API Functions preventing unauthorized access.
def authenticate_token(t):
    @wraps(t)
    def decorated_func(*args, **kwargs):
        auth = request.headers.get('Authorization', None)

        if not auth:
            resp = Response("Incorrect email or password")
            resp.headers['Access-Control-Allow-Origin'] = '*'
            return resp, 401
            #return jsonify({'error': 'Access Denied : No Token Found'}), 401
        else:
            try:
                result = jwt.decode(auth, app.config['SECRET_KEY'],algorithms=['HS256'])
            except jwt.exceptions.InvalidSignatureError as e:
                return jsonify({'error':'Invalid Token'}), 201
            except jwt.exceptions.DecodeError as e:
                return jsonify({'error': 'Invalid Token'}), 201
            return t(*args, **kwargs)
    return decorated_func

def assign_token(user_id):
    token_alpha = db.session.query(TokenAlpha).filter_by(is_assigned = False).order_by(func.random()).limit(1).first()
    token_omega = db.session.query(TokenOmega).filter_by(is_assigned = False).order_by(func.random()).limit(1).first()
    token_alpha.is_assigned = True
    token_alpha.assigned_to = user_id
    token_omega.is_assigned = True
    token_omega.assigned_to = user_id
    db.session.commit()
    return {"token_alpha":token_alpha.token_val, "token_omega":token_omega.token_val}

def confirm_token(token):
    tokens = token.split('-')
    result = db.session.query(TokenAlpha, TokenOmega).join(TokenAlpha.assigned_to == TokenOmega.assigned_to).filter(and_(TokenAlpha.token_val == tokens[0], TokenOmega.token_val == tokens[1])).first()
    if result is not None:
        return result.TokenAlpha.assigned_to
    else:
        return False
    
def detach_token(token):
    tokens = token.split('-')
    token_alpha = db.session.query(TokenAlpha).filter_by(token_val = tokens[0]).first()
    token_omega = db.session.query(TokenOmega).filter_by(token_val = tokens[1]).first()
    token_alpha.is_assigned = False
    token_alpha.assigned_to = None
    token_omega.is_assigned = False
    token_omega.assigned_to = None
    db.session.commit()
    return True
