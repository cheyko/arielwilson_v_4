from . import db
from werkzeug.security import generate_password_hash
from api.sqlal_mutable_array import MutableList
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime

class Accomadation(db.Model):
    __tablename__ = 'wg_accomadations'

    accomadate_id = db.Column(db.Integer, db.Sequence('wg_accomadations_accomadate_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    title = db.Column(db.String(255))
    typeOf = db.Column(db.String(80))
    address = db.Column(db.String(255))
    pets = db.Column(db.Boolean)
    description = db.Column(db.String(1026))
    amenities = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    additional = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    cuisine = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    minors = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    cooperate = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    facilities = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    attraction = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    transit = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    establishment = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    languages = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    overview = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    requirements = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    fees = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    children = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    others = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    parking = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    roomslist = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    subtopics = db.Column(MutableList.as_mutable(ARRAY(db.PickleType)))
    dateAdded = db.Column(db.DateTime, default=datetime.utcnow)
    is_available = db.Column(db.Boolean, default=True)
    is_visible = db.Column(db.Boolean, default=True)
    numOfPics = db.Column(db.Integer)

    def __init__(self,lister,pree_id,title,typeOf,address,description,pets,amenities,additional,cuisine,minors,cooperate,facilities,attraction,transit,establishment,languages,overview,requirements,fees,children,others,parking,roomslist,subtopics,numOfPics):
        self.lister = lister
        self.pree_id = pree_id
        self.title = title
        self.typeOf = typeOf
        self.address = address 
        self.description = description
        self.pets = pets
        self.amenities = amenities
        self.additional = additional
        self.cuisine = cuisine
        self.minors = minors
        self.cooperate = cooperate
        self.facilities = facilities
        self.attraction = attraction
        self.transit = transit
        self.establishment = establishment
        self.languages = languages 
        self.overview = overview
        self.requirements = requirements
        self.fees = fees
        self.children = children
        self.others = others
        self.parking = parking
        self.roomslist = roomslist
        self.subtopics = subtopics
        self.numOfPics = numOfPics


class Listing(db.Model):
    __tablename__ = 'wg_listings'

    listing_id = db.Column(db.Integer, db.Sequence('wg_listings_listing_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    title = db.Column(db.String(255))
    category = db.Column(db.String(80))
    typeOf = db.Column(db.String(80))
    address = db.Column(db.String(255))
    price = db.Column(db.Integer)
    currency = db.Column(db.String(80))
    beds = db.Column(db.Integer)
    baths = db.Column(db.Integer)
    insideSqft = db.Column(db.Integer)
    lotSqft = db.Column(db.Integer)
    parking = db.Column(MutableList.as_mutable(ARRAY(db.String(100)))) #reduce string size
    interior = db.Column(MutableList.as_mutable(ARRAY(db.String(80))))
    exterior = db.Column(MutableList.as_mutable(ARRAY(db.String(80))))
    description = db.Column(db.String(255))
    numOfPics = db.Column(db.Integer)
    dateAdded = db.Column(db.DateTime, default=datetime.utcnow)
    is_available = db.Column(db.Boolean, default=True)
    is_visible = db.Column(db.Boolean, default=True)

    def __init__(self, pree_id, lister, title, category, typeOf, address, price, currency, beds, baths, insideSqft, lotSqft, parking, description, numOfPics, interior, exterior):
        self.pree_id = pree_id
        self.lister = lister
        self.title = title
        self.category = category
        self.typeOf = typeOf
        self.address = address
        self.price = price
        self.currency = currency
        self.beds = beds
        self.baths = baths
        self.insideSqft = insideSqft
        self.lotSqft = lotSqft
        self.parking = parking
        self.description = description
        self.numOfPics = numOfPics
        self.interior = interior
        self.exterior = exterior

    def __repr__(self):
        return '<Listing %r>' %  self.title

class Vehicle(db.Model):
    __tablename__ = 'wg_vehicles'

    vehicle_id = db.Column(db.Integer, db.Sequence('wg_vehicles_vehicle_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    make = db.Column(db.String(80))
    model = db.Column(db.String(80))
    condition = db.Column(db.String(80))
    typeOf = db.Column(db.String(80))
    fuel = db.Column(db.String(80))
    transmission = db.Column(db.String(80))
    mileage = db.Column(db.Integer)
    location = db.Column(db.String(255))
    price = db.Column(db.Integer)
    currency = db.Column(db.String(80))
    engine = db.Column(db.Float)
    year = db.Column(db.String(80))
    steering = db.Column(db.String(80))
    color = db.Column(db.String(80))
    ignition = db.Column(db.String(80))
    seats = db.Column(db.Integer)
    description = db.Column(db.String(255))
    numOfPics = db.Column(db.Integer)
    dateAdded = db.Column(db.DateTime, default=datetime.utcnow)
    is_available = db.Column(db.Boolean, default=True)
    is_visible = db.Column(db.Boolean, default=True)

    def __init__(self,pree_id, lister, make, model, condition, typeOf, fuel, transmission, mileage, location, price, currency, engine, year, steering, color, ignition, seats, description, numOfPics):
        self.pree_id = pree_id
        self.lister = lister
        self.make = make
        self.model = model
        self.condition = condition
        self.typeOf = typeOf
        self.fuel = fuel
        self.transmission = transmission
        self.mileage = mileage
        self.location = location
        self.price = price
        self.currency = currency
        self.engine = engine
        self.year = year
        self.steering = steering
        self.color = color
        self.ignition = ignition
        self.seats = seats
        self.description = description
        self.numOfPics = numOfPics

    def __repr__(self):
        return '<Vehicle %d %r %r %r>' %  (self.vehicle_id, self.year, self.make, self.model)

class Product(db.Model):
    __tablename__ = 'wg_products'

    product_id = db.Column(db.Integer, db.Sequence('wg_products_product_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    name = db.Column(db.String(255))
    brand = db.Column(db.String(80))
    category = db.Column(db.String(80))
    condition = db.Column(db.String(80))
    typeOf = db.Column(db.String(80))
    location = db.Column(db.String(255))
    stock = db.Column(db.Integer)
    price = db.Column(db.Integer)
    currency = db.Column(db.String(80))
    year = db.Column(db.String(80))
    colors = db.Column(MutableList.as_mutable(ARRAY(db.String(100))))
    package = db.Column(db.String(80))
    description = db.Column(db.String(255))
    numOfPics = db.Column(db.Integer)
    dateAdded = db.Column(db.DateTime, default=datetime.utcnow)
    additional_info = db.Column(db.Boolean, default=False)
    is_available = db.Column(db.Boolean, default=True)
    is_visible = db.Column(db.Boolean, default=True)

    def __init__(self, pree_id, lister, name, brand, category, condition, typeOf, location, stock, price, currency, year, colors, package, description, numOfPics):
        self.pree_id = pree_id
        self.lister = lister
        self.name = name
        self.brand = brand
        self.category = category
        self.condition = condition
        self.typeOf = typeOf
        self.location = location
        self.stock = stock
        self.price = price
        self.currency = currency
        self.year = year
        self.colors = colors
        self.package = package
        self.description = description
        self.numOfPics = numOfPics

    def __repr__(self):
        return '<Product %d %r %r %r>' %  (self.product_id, self.brand, self.name, self.price)

class Additional(db.Model):
    __tablename__ = 'wg_additional'

    product_id = db.Column(db.Integer, db.ForeignKey('wg_products.product_id'), nullable=False, primary_key=True)
    quantity = db.Column(db.Integer)
    unit = db.Column(db.String(255))
    specifications = db.Column(MutableList.as_mutable(ARRAY(db.String(100))))
    composition = db.Column(MutableList.as_mutable(ARRAY(db.String(100))))
    other = db.Column(MutableList.as_mutable(ARRAY(db.String(100))))

    def __init__(self, product_id, quantity, unit, specifications, composition, other):
        self.product_id = product_id
        self.quantity = quantity
        self.unit = unit
        self.specifications = specifications
        self.composition = composition
        self.other = other
    
    def __repr__(self):
        return '<Product %d>' % (self.product_id)

class Preepedia(db.Model):
    __tablename__ = "preepedia"

    page_id = db.Column(db.Integer, db.Sequence('preepedia_page_id_seq'), primary_key=True)
    drafter = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    pagetype = db.Column(db.String(80))
    section = db.Column(db.String(80))
    title = db.Column(db.String(255))
    intro = db.Column(db.String(255)) #remove
    subtitles = db.Column(MutableList.as_mutable(ARRAY(db.String(80))))
    subcontent = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))#remove
    has_mainmedia = db.Column(db.Boolean)
    no_of_media = db.Column(db.Integer, default=0)
    mediatypes = db.Column(MutableList.as_mutable(ARRAY(db.String(80))))
    captionlist = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    has_medialist = db.Column(db.Boolean)
    pmcaptionlist = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    views = db.Column(db.Integer, default=0)
    state = db.Column(db.String(255))

    def __init__(self, drafter, pagetype, section, title, intro, subtitles, subcontent, has_mainmedia, no_of_media, mediatypes, captionlist, has_medialist, pmcaptionlist, state):
        self.drafter = drafter
        self.pagetype = pagetype
        self.section = section
        self.title = title
        self.intro = intro #remove
        self.subtitles = subtitles
        self.subcontent = subcontent #remove
        self.has_mainmedia = has_mainmedia
        self.no_of_media = no_of_media
        self.mediatypes = mediatypes
        self.captionlist = captionlist
        self.has_medialist = has_medialist
        self.pmcaptionlist = pmcaptionlist
        self.state = state
    
    def __repr__(self):
        return '<Preepedia %d>' % (self.page_id)

class Biography(db.Model):
    __tablename__ = 'biography'

    bio_id = db.Column(db.Integer, db.Sequence('biography_bio_id_seq'), primary_key=True)
    page_id = db.Column(db.Integer, db.ForeignKey('preepedia.page_id'), nullable=False)
    bioname = db.Column(db.String(255))
    gender = db.Column(db.String(10))
    dob = db.Column(db.Date)

    def __init__(self, page_id, bioname, gender, dob):
        self.page_id = page_id
        self.bioname = bioname
        self.gender = gender
        self.dob = dob
    
    def __repr__(self):
        return '<Biography %d>' % (self.bio_id)

class Item(db.Model):
    __tablename__ = 'wg_items'

    item_id = db.Column(db.Integer, db.Sequence('wg_items_item_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    name = db.Column(db.String(255))
    category = db.Column(db.String(80))
    typeOf = db.Column(db.String(80))
    calories = db.Column(db.Integer)
    price = db.Column(db.Integer)
    currency = db.Column(db.String(80))
    ingredients = db.Column(MutableList.as_mutable(ARRAY(db.String(100))))
    description = db.Column(db.String(255))
    numOfPics = db.Column(db.Integer)
    dateAdded = db.Column(db.DateTime, default=datetime.utcnow)
    #additional_info = db.Column(db.Boolean, default=False)
    is_available = db.Column(db.Boolean, default=True)
    is_visible = db.Column(db.Boolean, default=True)

    def __init__(self,pree_id, lister, name, category, typeOf, calories, price, currency, ingredients, description, numOfPics):
        self.pree_id = pree_id
        self.lister = lister
        self.name = name
        self.category = category
        self.typeOf = typeOf
        self.calories = calories
        self.price = price
        self.currency = currency
        self.ingredients = ingredients
        self.description = description
        self.numOfPics = numOfPics

    def __repr__(self):
        return '<Item %d %r %r %r>' %  (self.item_id, self.name, self.price)

class Service(db.Model):
    __tablename__ = 'wg_services'

    service_id = db.Column(db.Integer, db.Sequence('wg_services_service_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    title = db.Column(db.String(255))
    category = db.Column(db.String(80))
    deliverable = db.Column(db.String(80))
    provider = db.Column(db.String(80))
    contact = db.Column(db.String(80))
    email = db.Column(db.String(80))
    timetaken = db.Column(db.Integer)
    timeunit = db.Column(db.String(80))
    price = db.Column(db.Integer)
    currency = db.Column(db.String(80))
    description = db.Column(db.String(255))
    procedures = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    numOfPics = db.Column(db.Integer)
    dateAdded = db.Column(db.DateTime, default=datetime.utcnow)
    #additional_info = db.Column(db.Boolean, default=False)
    is_available = db.Column(db.Boolean, default=True)
    is_visible = db.Column(db.Boolean, default=True)
    time_contingency = db.Column(db.String(80))
    price_contingency = db.Column(db.String(80))
    requirements = db.Column(db.String(255))
    address = db.Column(db.String(255))

    def __init__(self,pree_id, lister, title, category, deliverable, provider, contact, email, timetaken, timeunit, price, currency, description, procedures,numOfPics, time_contingency, price_contingency,requirements, address):
        self.pree_id = pree_id
        self.lister = lister
        self.title = title
        self.category = category
        self.deliverable = deliverable
        self.provider = provider
        self.contact = contact
        self.email = email
        self.timetaken = timetaken
        self.timeunit = timeunit
        self.price = price
        self.currency = currency
        self.procedures = procedures
        self.description = description
        self.numOfPics = numOfPics
        self.time_contingency = time_contingency
        self.price_contingency = price_contingency
        self.requirements = requirements
        self.address = address

    def __repr__(self):
        return '<Service %d %r %r %r>' %  (self.service_id, self.title, self.price)

#--- class Actions(db.Model):
class Task(db.Model):
    __tablename__ = 'wg_tasks'

    task_id = db.Column(db.Integer, db.Sequence('wg_tasks_task_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    is_for = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    title = db.Column(db.String(80))
    project = db.Column(db.String(80))
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    description = db.Column(db.String(255))
    status = db.Column(db.String(80))
    is_visible = db.Column(db.Boolean, default=True)

    def __init__(self,lister,is_for,title,project,date_added,start_date,end_date,description,status):
        self.lister = lister
        self.is_for = is_for
        self.title = title
        self.project = project
        self.date_added = date_added
        self.start_date = start_date
        self.end_date = end_date
        self.description = description
        self.status = status

    def __repr__(self):
        return '<Task %d title: %r>' %  (self.task_id,self.title)
    
class Request(db.Model):
    __tablename__ = 'wg_requests'

    request_id = db.Column(db.Integer, db.Sequence('wg_requests_request_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    is_for = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False) 
    typeOf = db.Column(db.String(10))
    question = db.Column(db.String(255))
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    choices = db.Column(MutableList.as_mutable(ARRAY(db.String(80))))
    answer = db.Column(db.Integer)
    status = db.Column(db.String(80))
    is_visible = db.Column(db.Boolean, default=True)
    
    def __init__(self,lister,is_for, typeOf,question,date_added,status,choices):
        self.lister = lister
        self.is_for = is_for
        self.typeOf = typeOf
        self.question = question
        self.date_added = date_added
        self.choices = choices
        self.status = status

    def __repr__(self):
        return '<Request %d Question: %r>' %  (self.request_id,self.question)

class Logistic(db.Model):
    __tablename__ = 'wg_logistics'

    logistic_id = db.Column(db.Integer, db.Sequence('wg_logistics_logistic_id_seq'), primary_key=True)
    sender = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    receiver = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False) 
    send_address = db.Column(db.String(255))  
    recv_address = db.Column(db.String(255))  
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    send_date = db.Column(db.Date)
    receive_date = db.Column(db.Date)
    package_type = db.Column(db.String(31))
    status = db.Column(db.String(80))
    description = db.Column(db.String(255))
    is_visible = db.Column(db.Boolean, default=True)

    def __init__(self,sender,receiver,send_address,recv_address,date_added,package_type,description,status):
        self.sender = sender
        self.receiver = receiver
        self.send_address = send_address
        self.recv_address = recv_address
        self.date_added = date_added
        self.package_type = package_type
        self.description = description
        self.status = status

    def __repr__(self):
        return '<Logistic %d Package: %r>' %  (self.logistic_id,self.package_type)
    
class Poll(db.Model):
    __tablename__ = 'wg_polls'

    poll_id = db.Column(db.Integer, db.Sequence('wg_polls_poll_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    category = db.Column(db.String(40))
    question = db.Column(db.String(255))
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    choices = db.Column(MutableList.as_mutable(ARRAY(db.String(31))))
    results = db.Column(MutableList.as_mutable(ARRAY(db.Integer)))
    votes = db.Column(db.Integer, default=0)
    end_date = db.Column(db.Date)
    end_time = db.Column(db.Time)
    status = db.Column(db.String(10))
    is_visible = db.Column(db.Boolean, default=True)
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)

    def __init__(self,lister,category,question,date_added,choices,results, end_date, end_time, status, pree_id):
        self.lister = lister
        self.category = category
        self.question = question
        self.date_added = date_added
        self.choices = choices
        self.results = results #array with zeros
        self.end_date = end_date
        self.end_time = end_time
        self.status = status
        self.pree_id = pree_id

    def __repr__(self):
        return '<Poll %d Question: %r>' %  (self.poll_id,self.question)

class Vote(db.Model):
    __tablename__ = 'wg_votes'

    vote_id = db.Column(db.Integer, db.Sequence('wg_votes_vote_id_seq'), primary_key=True) 
    poll_id = db.Column(db.Integer, db.ForeignKey('wg_polls.poll_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    choice = db.Column(db.Integer)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, poll_id, user_id, choice):
        self.poll_id = poll_id
        self.user_id = user_id
        self.choice = choice

    def __repr__(self):
        return '<Vote %d choice %s>' % (self.vote_id, self.choice)  
class Event(db.Model):
    __tablename__ = 'wg_events'

    event_id = db.Column(db.Integer, db.Sequence('wg_events_event_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    title = db.Column(db.String(255))
    host = db.Column(db.String(255))
    description = db.Column(db.String(255))
    category = db.Column(db.String(80))
    typeOf = db.Column(db.String(80))
    metrics = db.Column(db.String(31))
    venue = db.Column(db.String(80))
    where = db.Column(db.String(80))
    status = db.Column(db.String(80))
    dates = db.Column(MutableList.as_mutable(ARRAY(db.Date)))
    start_times = db.Column(MutableList.as_mutable(ARRAY(db.Time)))
    end_times = db.Column(MutableList.as_mutable(ARRAY(db.Time)))
    attendees = db.Column(db.Integer, default=0)
    confirmations = db.Column(db.Integer, default=0)
    denials = db.Column(db.Integer, default=0)
    tickets = db.Column(MutableList.as_mutable(ARRAY(db.String(31))))
    costs = db.Column(MutableList.as_mutable(ARRAY(db.Integer)))
    currencies = db.Column(MutableList.as_mutable(ARRAY(db.String(10))))
    personnel_ids = db.Column(MutableList.as_mutable(ARRAY(db.Integer))) #change to personnel
    personnel = db.Column(MutableList.as_mutable(ARRAY(db.String(80)))) #change to personnel_types
    attractions = db.Column(MutableList.as_mutable(ARRAY(db.String(80))))
    numOfPics = db.Column(db.Integer)
    is_visible = db.Column(db.Boolean, default=True)

    def __init__(self,lister,pree_id,title,host,description,category,typeOf,metrics,venue,where,status,dates,start_times,end_times,tickets,costs, currencies,personnel_ids,personnel,attractions, numOfPics):
        self.lister = lister
        self.pree_id = pree_id
        self.title = title
        self.host = host
        self.description = description
        self.category = category
        self.typeOf = typeOf
        self.metrics = metrics
        self.venue = venue
        self.where = where
        self.status = status
        self.dates = dates
        self.start_times = start_times
        self.end_times = end_times
        self.tickets = tickets
        self.costs = costs
        self.currencies = currencies
        self.personnel_ids = personnel_ids
        self.personnel = personnel
        self.attractions = attractions
        self.numOfPics = numOfPics

    def __repr__(self):
        return '<Event %d title: %r>' %  (self.event_id,self.title)

#save description to file
class Classified(db.Model):
    __tablename__ = 'wg_classifieds'

    classified_id = db.Column(db.Integer, db.Sequence('wg_classifieds_classified_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    title = db.Column(db.String(255))
    category = db.Column(db.String(80))
    typeOf = db.Column(db.String(80))
    metrics = db.Column(db.String(31)) #reduce to 10
    location = db.Column(db.String(80))
    salary = db.Column(db.String(31)) 
    company = db.Column(db.String(80))
    description = db.Column(MutableList.as_mutable(ARRAY(db.String(1023))))
    subtopics = db.Column(MutableList.as_mutable(ARRAY(db.String(80))))
    contents = db.Column(MutableList.as_mutable(ARRAY(db.String(10))))
    subcontent = db.Column(MutableList.as_mutable(ARRAY(db.String(1023)))) #review
    qualifications = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    benefits = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    skills = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    questions = db.Column(MutableList.as_mutable(ARRAY(db.String(255)))) 
    responses = db.Column(MutableList.as_mutable(ARRAY(db.String(80)))) #review
    end_date = db.Column(db.Date)
    is_available = db.Column(db.Boolean, default=True)
    is_visible = db.Column(db.Boolean, default=True)


    def __init__(self,lister,pree_id,title,description,category,typeOf,metrics,location,salary,company,subtopics,contents,subcontent,qualifications,benefits,skills,questions,responses,end_date):
        self.lister = lister
        self.pree_id = pree_id
        self.title = title
        self.description = description
        self.category = category
        self.typeOf = typeOf
        self.metrics = metrics
        self.location = location
        self.salary = salary
        self.company = company
        self.subtopics = subtopics
        self.contents = contents
        self.subcontent = subcontent
        self.qualifications = qualifications
        self.benefits = benefits
        self.skills = skills
        self.questions = questions
        self.responses = responses
        self.end_date = end_date

    def __repr__(self):
        return '<Classified %d title: %r>' %  (self.classified_id,self.title)
    
class Volunteer(db.Model):
    __tablename__ = 'wg_volunteers'

    volunteer_id = db.Column(db.Integer, db.Sequence('wg_volunteers_volunteer_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
    pree_id = db.Column(db.Integer, db.ForeignKey('wg_prees.pree_id'), nullable=False)
    title = db.Column(db.String(255))
    category = db.Column(db.String(80))
    metrics = db.Column(db.String(10))
    venue = db.Column(db.String(80))
    location = db.Column(db.String(255))
    description = db.Column(db.String(2047))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    start_time = db.Column(db.Time)
    end_time = db.Column(db.Time)
    contributions = db.Column(MutableList.as_mutable(ARRAY(db.String(255))))
    numOfPics = db.Column(db.Integer)
    is_visible = db.Column(db.Boolean, default=True)

    def __init__(self,lister,pree_id,title,category,venue,location,description,start_date,end_date,start_time,end_time,contributions,metrics, numOfPics):
        self.lister = lister
        self.pree_id = pree_id
        self.title = title
        self.category = category
        self.venue = venue
        self.location = location
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.start_time = start_time
        self.end_time = end_time
        self.contributions = contributions
        self.numOfPics = numOfPics
        self.metrics = metrics
    
    def __repr__(self):
        return '<Volunteer %d title: %r>' %  (self.volunteer_id,self.title)
    
#class Application(db.Model):
#class Assignment(db.Model):

