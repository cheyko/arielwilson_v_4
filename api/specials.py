from . import db
from werkzeug.security import generate_password_hash
from api.sqlal_mutable_array import MutableList
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime

class Listing(db.Model):
    __tablename__ = 'wg_listings'

    listing_id = db.Column(db.Integer, db.Sequence('wg_listings_listing_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
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
    parking = db.Column(MutableList.as_mutable(ARRAY(db.String(100))))
    description = db.Column(db.String(255))
    numOfPics = db.Column(db.Integer)
    dateAdded = db.Column(db.DateTime, default=datetime.utcnow)
    is_available = db.Column(db.Boolean, default=True)
    is_visible = db.Column(db.Boolean, default=True)

    def __init__(self, lister, title, category, typeOf, address, price, currency, beds, baths, insideSqft, lotSqft, parking, description, numOfPics):
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

    def __repr__(self):
        return '<Listing %r>' %  self.title

class Vehicle(db.Model):
    __tablename__ = 'wg_vehicles'

    vehicle_id = db.Column(db.Integer, db.Sequence('wg_vehicles_vehicle_id_seq'), primary_key=True)
    lister = db.Column(db.Integer, db.ForeignKey('wg_users.user_id'), nullable=False)
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

    def __init__(self, lister, make, model, condition, typeOf, fuel, transmission, mileage, location, price, currency, engine, year, steering, color, ignition, seats, description, numOfPics):
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

    def __init__(self, lister, name, brand, category, condition, typeOf, location, stock, price, currency, year, colors, package, description, numOfPics):
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

    def __init__(self, drafter, pagetype, section, title, intro, subtitles, subcontent, has_mainmedia, no_of_media, mediatypes, captionlist, has_medialist, pmcaptionlist):
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

    def __init__(self, lister, name, category, typeOf, calories, price, currency, ingredients, description, numOfPics):
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
    title = db.Column(db.String(255))
    category = db.Column(db.String(80))
    deliverable = db.Column(db.String(80))
    provider = db.Column(db.String(80))
    contact = db.Column(db.Integer)
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

    def __init__(self, lister, title, category, deliverable, provider, contact, email, timetaken, timeunit, price, currency, description, procedures,numOfPics):
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

    def __repr__(self):
        return '<Service %d %r %r %r>' %  (self.service_id, self.title, self.price)