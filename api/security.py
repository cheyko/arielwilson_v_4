from api import app
from flask import jsonify, request
from functools import wraps
import jwt

#function used to wrap API Functions preventing unauthorized access.
def authenticate_token(t):
    @wraps(t)
    def decorated_func(*args, **kwargs):
        auth = request.headers.get('Authorization', None)

        if not auth:
            return jsonify({'error': 'Access Denied : No Token Found'}), 401
        else:
            try:
                result = jwt.decode(auth, app.config['SECRET_KEY'],algorithms=['HS256'])
            except jwt.exceptions.InvalidSignatureError as e:
                return jsonify({'error':'Invalid Token'})
            except jwt.exceptions.DecodeError as e:
                return jsonify({'error': 'Invalid Token'})
            return t(*args, **kwargs)
    return decorated_func
