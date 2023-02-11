from . import db
from werkzeug.security import generate_password_hash
from api.sqlal_mutable_array import MutableList
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime

class Accesses(db.Model):
    __tablename__ = 'wg_access_types'

    access_id = db.Column(db.Integer, db.Sequence('wg_access_types_access_id_seq'), primary_key=True)
    access_name = db.Column(db.String(80))

    def __init__(self,access_name):
        self.access_name = access_name
        
class User(db.Model):

    __tablename__ = 'wg_users'

    user_id = db.Column(db.Integer, db.Sequence('wg_users_user_id_seq'), primary_key=True)
    firstname = db.Column(db.String(80)) #change to fullname and drop lastname from database
    lastname = db.Column(db.String(80))
    username = db.Column(db.String(80))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    phonenumber = db.Column(db.String(80))
    accessType = db.Column(db.Integer, db.ForeignKey('wg_access_types.access_id'), nullable=False)
    dateAdded = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, default=datetime.utcnow)
    gender = db.Column(db.String(10))
    is_active = db.Column(db.Boolean)
    is_online = db.Column(db.Boolean)
    #fullname = db.Column(db.String(255))
    #add ran to user table
    #is_group
    
    def __init__(self, firstname, lastname, gender, email, password, phonenumber, accessType):
        self.firstname = firstname
        self.lastname = lastname
        self.gender = gender
        self.email = email
        self.password = generate_password_hash(password, method = 'pbkdf2:sha256')
        self.phonenumber = phonenumber
        self.accessType = accessType

    def is_authenticated(self):
        return True
    
    def is_active(self):
        return True
    
    def is_anonymous(self):
        return False
    
    def get_id(self):
        try:
            return unicode(self.id)
        except NameError:
            return str(self.id)
    
    def __repr__(self):
        return '<User %s %s %s>' % (self.firstname, self.lastname, self.email)

class Rankings(db.Model):
    __tablename__ = 'wg_rankings'

    ranking_id = db.Column(db.Integer, db.Sequence('wg_rankings_id_seq'), primary_key=True)
    ranking_title = db.Column(db.String(80))

    def __init__(self,ranking_title):
        self.ranking_title = ranking_title

class Profile(db.Model):
    __tablename__ = 'wg_profiles'

    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False, primary_key=True)
    dob = db.Column(db.Date)
    tagline = db.Column(db.String(80))
    description = db.Column(db.String(255))
    location = db.Column(db.String(255))
    followers = db.Column(db.Integer, default=0)
    following = db.Column(db.Integer, default=0) #on production database change to followings ?? would require many changes in api functions as well as potential foreign keys
    linkages = db.Column(db.Integer, default=0) #on production database change to fraternity
    groups = db.Column(db.Integer, default=0)
    family = db.Column(db.Integer, default=0)
    closest = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'))
    has_dp = db.Column(db.Boolean)
    has_cv = db.Column(db.Boolean)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    ranking = db.Column(db.Integer, db.ForeignKey('wg_rankings.ranking_id'), default=1) #, nullable=False)

    def __init__(self, user_id, dob, tagline, description, location):
        self.user_id = user_id
        self.dob = dob
        self.tagline = tagline
        self.description = description
        self.location = location

    def __repr__(self):
        return '<Profile %s %s>' % (self.user_id, self.dob)

class Group(db.Model):
    __tablename__ = 'wg_groups'

    group_id = db.Column(db.Integer, db.Sequence('wg_groups_group_id_seq'), primary_key=True)
    name = db.Column(db.String(255))
    tagline = db.Column(db.String(255))
    creator = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    category = db.Column(db.String(255))
    location = db.Column(db.String(255))
    description = db.Column(db.String(255))
    has_dp = db.Column(db.Boolean)
    status = db.Column(db.String(255))
    dateAdded = db.Column(db.DateTime, default=datetime.utcnow)
    members = db.Column(db.Integer, default=1)

    def __init__(self,name, tagline, creator, category, location, description, status):
        self.creator = creator
        self.name = name
        self.category = category
        self.tagline = tagline
        self.location = location
        self.description = description
        self.status = status


    def __repr__(self):
        return '<Group %d category %s>' % (self.group_id, self.category)

class GroupRelations(db.Model):
    __tablename__ = 'wg_group_relations'

    #Quote_id

    match_id = db.Column(db.Integer, db.Sequence('wg_group_relations_match_id_seq'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('wg_groups.group_id'), nullable=False)
    is_admin = db.Column(db.Boolean)
    in_group = db.Column(db.Boolean)

    def __init__(self, user_id, group_id, is_admin, in_group):
        self.user_id = user_id
        self.group_id = group_id
        self.is_admin = is_admin
        self.in_group = in_group
    
    def __repr__(self):
        return '<User %d is in Group %d ; %s and is admin of group: %s>' % (self.user_id , self.group_id, self.in_group, self.is_admin)

class Pree(db.Model):
    __tablename__ = 'wg_prees'

    pree_id = db.Column(db.Integer, db.Sequence('wg_prees_pree_id_seq'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    is_media = db.Column(db.Boolean, nullable=False)
    pree_type = db.Column(db.String(80))
    approvals = db.Column(db.Integer, default=0)
    disapprovals = db.Column(db.Integer, default=0)
    comments = db.Column(db.Integer, default=0)
    is_visible = db.Column(db.Boolean, default=True)
    #is_exclusive = db.Column(db.Boolean, default=False) #remove

    def __init__(self, user_id, date_added, is_media, pree_type):
        self.user_id = user_id
        self.date_added = date_added
        self.is_media = is_media
        self.pree_type = pree_type

    def __repr__(self):
        return '<Pree %d is_media %s>' % (self.pree_id, self.is_media)

class GroupPree(db.Model):
    __tablename__ = 'wg_group_pree'

    #Quote_id
    match_pree = db.Column(db.Integer, db.Sequence('wg_group_pree_match_pree_seq'), primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('wg_groups.group_id'), nullable=False)
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)

    def __init__(self, group_id, pree_id):
        self.pree_id = pree_id
        self.group_id = group_id
    
    def __repr__(self):
        return '<Match group pree %d groups : %d pree %d>' % (self.match_pree, self.group_id, self.user_id)

class Approvals(db.Model):
    __tablename__ = 'wg_approvals'

    approval_id = db.Column(db.Integer, db.Sequence('wg_approvals_approval_id_seq'), primary_key=True) 
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    is_approved = db.Column(db.Boolean)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, pree_id, user_id, is_approved):
        self.pree_id = pree_id
        self.user_id = user_id
        self.is_approved = is_approved

    def __repr__(self):
        return '<Approvals %d is_approved %s>' % (self.pree_id, self.is_approved)

"""class Favourites(db.Model):
    __tablename__ = 'wg_favourites'

    favourite_id = db.Column(db.Integer, db.Sequence('wg_favourites_favourite_id_seq'), primary_key=True) 
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, pree_id, user_id):
        self.pree_id = pree_id
        self.user_id = user_id

    def __repr__(self):
        return '<Favourite %d >' % (self.pree_id)
"""
class Comments(db.Model):
    __tablename__ = 'wg_comments'

    comment_id = db.Column(db.Integer, db.Sequence('wg_comments_comment_id_seq'), primary_key=True) 
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    comment_text = db.Column(db.String(255))
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    is_visible = db.Column(db.Boolean, default=True)
    c_approvals = db.Column(db.Integer, default=0)
    c_disapprovals = db.Column(db.Integer, default=0)
    replies = db.Column(db.Integer, default=0)

    def __init__(self, pree_id, user_id, comment_text):
        self.pree_id = pree_id
        self.user_id = user_id
        self.comment_text = comment_text

    def __repr__(self):
        return '<Comment %d is_visible %s>' % (self.comment_id, self.is_visible)

class CommentsApprovals(db.Model):
    __tablename__ = 'wg_comments_approvals'

    c_approval_id = db.Column(db.Integer, db.Sequence('wg_comments_approvals_c_approval_id_seq'), primary_key=True) 
    comment_id = db.Column(db.Integer, db.ForeignKey('wg_comments.comment_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    is_c_approved = db.Column(db.Boolean)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, comment_id, user_id, is_c_approved):
        self.comment_id = comment_id
        self.user_id = user_id
        self.is_c_approved = is_c_approved

    def __repr__(self):
        return '<C-Approvals %d is_c_approved %s>' % (self.c_approval_id, self.is_c_approved)

class CommentsReplies(db.Model):
    __tablename__ = 'wg_comments_replies'

    reply_id = db.Column(db.Integer, db.Sequence('wg_comments_replies_reply_id_seq'), primary_key=True) 
    comment_id = db.Column(db.Integer, db.ForeignKey('wg_comments.comment_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    reply_text = db.Column(db.String(255))
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    is_visible = db.Column(db.Boolean, default=True)
    r_approvals = db.Column(db.Integer, default=0)
    r_disapprovals = db.Column(db.Integer, default=0)

    def __init__(self, comment_id, user_id, reply_text):
        self.comment_id = comment_id
        self.user_id = user_id
        self.reply_text = reply_text

    def __repr__(self):
        return '<Reply %d is_visible %s>' % (self.reply_id, self.is_visible)

class RepliesApprovals(db.Model):
    __tablename__ = 'wg_replies_approvals'

    r_approval_id = db.Column(db.Integer, db.Sequence('wg_replies_approvals_r_approval_id_seq'), primary_key=True) 
    reply_id = db.Column(db.Integer, db.ForeignKey('wg_comments_replies.reply_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    is_r_approved = db.Column(db.Boolean)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, reply_id, user_id, is_r_approved):
        self.reply_id = reply_id
        self.user_id = user_id
        self.is_r_approved = is_r_approved

    def __repr__(self):
        return '<R-Approvals %d is_r_approved %s>' % (self.r_approval_id, self.is_r_approved)

class Quote(db.Model):
    __tablename__ = 'wg_quotes'

    #Quote_id
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False, primary_key=True)
    the_quote = db.Column(db.String(255))

    def __init__(self, pree_id, the_quote):
        self.pree_id = pree_id
        self.the_quote = the_quote
    
    def __repr__(self):
        return '<Quote is_pree %d>' % (self.pree_id)

class Media(db.Model):
    __tablename__ = 'wg_media'

    #Media_id
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False, primary_key=True)
    caption = db.Column(db.String(255))
    no_of_media = db.Column(db.Integer)
    has_image = db.Column(db.Boolean)
    has_audio = db.Column(db.Boolean)
    has_video = db.Column(db.Boolean)
    #has_multiple = db.Column(db.Boolean)
    #multi = db.Column(db.String(80), default=("No"))


    def __init__(self, pree_id, caption, no_of_media, has_image, has_audio, has_video):
        self.pree_id = pree_id
        self.caption = caption
        self.no_of_media = no_of_media
        self.has_image = has_image
        self.has_audio = has_audio
        self.has_video = has_video

class Subscription(db.Model):
    __tablename__ = 'wg_subscriptions'

    subscription_id = db.Column(db.Integer, db.Sequence('wg_subscriptions_subscription_id_seq'), primary_key=True)
    subscription_name = db.Column(db.String(80))

    def __init__(self,subscription_name):
        self.subscription_name = subscription_name

class Exclusive(db.Model):
    __tablename__ = 'wg_exclusives'

    #Media_id
    exclusive_id = db.Column(db.Integer, db.Sequence('wg_exclusives_exclusive_id_seq'), primary_key=True) 
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    title = db.Column(db.String(255))
    artistname = db.Column(db.String(80))
    category = db.Column(db.String(80))
    genre = db.Column(db.String(80))
    features = db.Column(MutableList.as_mutable(ARRAY(db.String(80))))
    captionlist = db.Column(MutableList.as_mutable(ARRAY(db.String(255)))) #used for playlist, albums, mixtapes, etc
    description = db.Column(db.String(255))
    playback = db.Column(db.String(255))
    contingency = db.Column(db.String(255))
    options = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    is_locked = db.Column(db.Boolean, default=False)
    is_downloadable = db.Column(db.Boolean, default=False)
    unlock_requirement = db.Column(db.Integer, db.ForeignKey('wg_subscriptions.subscription_id'), nullable=False)
    unlock_fee = db.Column(db.Float, default=0)
    currency = db.Column(db.String(10))
    no_of_media = db.Column(db.Integer)
    mediatypes = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    influence = db.Column(db.Boolean)
    stereo = db.Column(db.Boolean)
    md = db.Column(db.Boolean)
    magazine = db.Column(db.Boolean)
    views = db.Column(db.Integer)
    has_cover_art = db.Column(db.Boolean)
    #has_multiple = db.Column(db.Boolean)
    #multi = db.Column(db.String(80), default=("No"))

    def __init__(self, pree_id,title, artistname, category, genre, captionlist, description, playback, contingency, unlock_requirement, is_locked, is_downloadable, unlock_fee, currency ,no_of_media,mediatypes, influence, stereo, md, magazine):
        self.pree_id = pree_id
        self.title = title
        self.artistname = artistname
        self.category = category
        self.genre = genre
        #add features
        self.captionlist = captionlist
        self.description = description
        self.playback = playback
        self.contingency = contingency
        self.is_locked = is_locked
        self.unlock_fee = unlock_fee
        self.currency = currency
        self.unlock_requirement = unlock_requirement
        self.is_downloadable = is_downloadable
        self.unlock_fee = unlock_fee
        self.mediatypes = mediatypes
        self.no_of_media = no_of_media
        self.influence = influence
        self.stereo = stereo
        self.md = md
        self.magazine = magazine

class Subscriber(db.Model):
    __tablename__ = 'wg_subscribers'

    match_id = db.Column(db.Integer, db.Sequence('wg_subscribers_match_id_seq'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    subscription_id = db.Column(db.Integer, db.ForeignKey('wg_subscriptions.subscription_id'), nullable=False)
    is_subscribed = db.Column(db.Boolean)

    def __init__(self, user_id, subscription_id, is_subscribed):
        self.user_id = user_id
        self.subscription_id = subscription_id
        self.is_subscribed = is_subscribed

class ExclusiveSale(db.Model):
    __tablename__ = 'wg_exclusive_sales'

    sale_id = db.Column(db.Integer, db.Sequence('wg_exclusive_sales_sale_id_seq'), primary_key=True) 
    exclusive_id = db.Column(db.Integer, db.ForeignKey('wg_exclusives.exclusive_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    is_aquired = db.Column(db.Boolean)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, exclusive_id, user_id, is_aquired):
        self.exclusive_id = exclusive_id
        self.user_id = user_id
        self.is_aquired = is_aquired

    def __repr__(self):
        return '<Exclusive %d is Sold : %s to %d>' % (self.exclusive_id, self.is_aquired, self.user_id)

class Follower(db.Model):
    __tablename__ = 'wg_followers'

    match_id = db.Column(db.Integer, db.Sequence('wg_followers_match_id_seq'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    follower_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    is_following = db.Column(db.Boolean)

    def __init__(self, user_id, follower_id, is_following):
        self.user_id = user_id
        self.follower_id = follower_id
        self.is_following = is_following

class Block(db.Model):
    __tablename__ = 'wg_blocks'

    #block_id
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False, primary_key=True)
    blocked_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    is_blocked = db.Column(db.Boolean)

    def __init__(self, user_id, blocked_id, is_blocked):
        self.user_id = user_id
        self.blocked_id = blocked_id
        self.is_blocked = is_blocked

class Message(db.Model):
    __tablename__ = 'wg_messages'

    message_id = db.Column(db.Integer, db.Sequence('wg_messages_message_id_seq'), nullable=False, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    message_content = db.Column(db.String(255))
    sent_date = db.Column(db.DateTime, default=datetime.utcnow)
    is_seen = db.Column(db.Boolean, default=False)
    is_visible = db.Column(db.Boolean, default=True)

    def __init__(self,sender_id,receiver_id,message_content,sent_date):
        self.sender_id = sender_id
        self.receiver_id = receiver_id
        self.message_content = message_content
        self.sent_date = sent_date

    def __repr__(self):
        return '<Message %d>' % (self.message_id)
  
### Move to Another Api File

class Wallets(db.Model):
    __tablename__ = 'wg_wallets'
    
    #wallet_id
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False, primary_key=True)
    balance = db.Column(db.Float)
    currency = db.Column(db.String(80))

class Transactions(db.Model):
    __tablename__ = 'wg_transactions'

    #transaction_id
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False, primary_key=True)
    type_of = db.Column(db.String(80))
    correspondent = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
      
class Audit(db.Model):
    __tablename__ = 'wg_audits'
    
    audit_id = db.Column(db.Integer, db.Sequence('wg_audits_audit_id_seq'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    correspondent = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=True)
    action = db.Column(db.String(255))
    #description = db.Column(db.String(255))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, user_id, correspondent, action, timestamp):
        self.user_id = user_id
        self.correspondent = correspondent
        self.action = action
        self.timestamp = timestamp

### Move to Another Api File