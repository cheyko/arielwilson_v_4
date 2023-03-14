from api import app
import time
import json
import os

from flask import request, jsonify
from sqlalchemy import or_ , and_
from api.models import db, User, Accesses, Profile, Pree
from api.specials import Listing, Vehicle, Product, Item, Service, Classified
from datetime import datetime

###############----shops.py-----##############

@app.route('/api/shops')
def shops():
    return "shops", 200

## development listings
@app.route('/api/listings', methods=['GET', 'POST'])
def listings():
    if request.method == 'GET':
        result = Listing.query.filter(Listing.is_visible == True).all()
        listings = []
        for listing in result:
            listingObj = {"listing_id":listing.listing_id,"lister":listing.lister,"pree_id":listing.pree_id,"title":listing.title,"category":listing.category,"typeOf":listing.typeOf,"address":listing.address,"price":listing.price,"currency":listing.currency,"beds":listing.beds, "baths": listing.baths, "insideSqft": listing.insideSqft, "lotSqft": listing.lotSqft, "parking": listing.parking, "description": listing.description, "numOfPics":listing.numOfPics}
            listings.append(listingObj)
        return json.dumps(listings)
    elif request.method == 'POST':
        result = request.form
        photos = request.files.getlist("photos")
        numOfPics = (len(photos))
        parking = result["parking"].split(',')
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=True, pree_type="listing")
        db.session.add(newPree)
        db.session.flush()
        #newAddress = Address(address1=result["address1"],address2=result["address2"],town=result["town"],parish=result["parish"])
        newListing = Listing(pree_id=newPree.pree_id,lister=result["user_id"],title=result["title"],category=result["category"],typeOf=result["typeOf"],address=result["address"],price=result["price"],currency=result["currency"],beds=result["beds"],baths=result["baths"],insideSqft=result["insideSqft"],lotSqft=result["lotSqft"],parking=parking,description=result["description"], numOfPics=numOfPics)
        db.session.add(newListing)
        db.session.flush()
        prefix = "listing" + str(newListing.listing_id)
        listing_folder = app.config['UPLOAD_FOLDER'] + "listings/"
        os.makedirs(listing_folder + prefix)   
        for index, pic in enumerate(photos):
            filename = prefix + "/" + str(index)
            #s3.Bucket(AWS_BUCKET).put_object(Key=key, Body=pic)
            pic.save(os.path.join(listing_folder , filename))
        db.session.commit()
        return jsonify({"msg": "added successfully", "listing_id":newListing.listing_id, "numOfPics":numOfPics}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-listing', methods=['POST'])
def get_listing():
    if request.method == 'POST':
        listing_id = request.json.get('listing_id', None)
        listing = Listing.query.get(listing_id)
        if listing != None and listing.is_visible == True:
            listingObj = {"listing_id":listing.listing_id,"lister":listing.lister,"pree_id":listing.pree_id,"title":listing.title,"category":listing.category,"typeOf":listing.typeOf,"address":listing.address,"price":listing.price,"currency":listing.currency,"beds":listing.beds, "baths": listing.baths, "insideSqft": listing.insideSqft, "lotSqft": listing.lotSqft, "parking": listing.parking, "description": listing.description, "numOfPics":listing.numOfPics}
            return listingObj, 200
        else:
            return {"msg":"product no longer is visible"}, 201
    return jsonify({"msg":"There was an error somewhere."}), 400

## development vehicles
@app.route('/api/vehicles', methods=['GET', 'POST'])
def vehicles():
    if request.method == 'GET':
        result = Vehicle.query.filter(Vehicle.is_visible == True).all()
        vehicles = []
        for vehicle in result:
            vehicleObj = {"vehicle_id":vehicle.vehicle_id,"lister":vehicle.lister,"pree_id":vehicle.pree_id,"make":vehicle.make,"model":vehicle.model,"condition":vehicle.condition,"typeOf":vehicle.typeOf,"fuel":vehicle.fuel,"transmission":vehicle.transmission,"mileage":vehicle.mileage,"location":vehicle.location,"price":vehicle.price,"currency":vehicle.currency,"engine":vehicle.engine, "year": vehicle.year, "color": vehicle.color, "steering": vehicle.steering, "ignition": vehicle.ignition, "seats":vehicle.seats, "description": vehicle.description, "numOfPics":vehicle.numOfPics}
            vehicles.append(vehicleObj)
        return json.dumps(vehicles)
    elif request.method == 'POST':
        result = request.form
        photos = request.files.getlist("photos")
        numOfPics = (len(photos))
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=True, pree_type="vehicle")
        db.session.add(newPree)
        db.session.flush()
        #parking = result["parking"].split(',')
        #newAddress = Address(address1=result["address1"],address2=result["address2"],town=result["town"],parish=result["parish"])
        newVehicle = Vehicle(pree_id=newPree.pree_id,lister=result["user_id"],make=result["make"],model=result["model"],condition=result["condition"],typeOf=result["typeOf"],fuel=result["fuel"],transmission=result["transmission"],mileage=result["mileage"],location=result["location"],price=result["price"],currency=result["currency"],engine=result["engine"],year=result["year"],color=result["color"],steering=result["steering"],ignition=result["ignition"], seats=result["seats"],description=result["description"], numOfPics=numOfPics)
        db.session.add(newVehicle)
        db.session.flush()
        prefix = "vehicle" + str(newVehicle.vehicle_id)
        vehicle_folder = app.config['UPLOAD_FOLDER'] + "vehicles/"
        os.makedirs(vehicle_folder + prefix)   
        for index, pic in enumerate(photos):
            filename = prefix + "/" + str(index)
            #s3.Bucket(AWS_BUCKET).put_object(Key=key, Body=pic)
            pic.save(os.path.join(vehicle_folder , filename))
        db.session.commit()
        return jsonify({"msg": "added successfully", "vehicle_id":newVehicle.vehicle_id, "numOfPics":numOfPics}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-vehicle', methods=['POST'])
def get_vehicle():
    if request.method == 'POST':
        vehicle_id = request.json.get('vehicle_id', None)
        vehicle = Vehicle.query.get(vehicle_id)
        if vehicle != None and vehicle.is_visible == True:
            vehicleObj = {"vehicle_id":vehicle.vehicle_id,"lister":vehicle.lister,"pree_id":vehicle.pree_id,"make":vehicle.make,"model":vehicle.model,"condition":vehicle.condition,"typeOf":vehicle.typeOf,"fuel":vehicle.fuel,"transmission":vehicle.transmission,"mileage":vehicle.mileage,"location":vehicle.location,"price":vehicle.price,"currency":vehicle.currency,"engine":vehicle.engine, "year": vehicle.year, "color": vehicle.color, "steering": vehicle.steering, "ignition": vehicle.ignition, "seats":vehicle.seats, "description": vehicle.description, "numOfPics":vehicle.numOfPics}
            return vehicleObj, 200
        else:
            return {"msg":"product no longer is visible"}, 201
    return jsonify({"msg":"There was an error somewhere."}), 400

## development products
@app.route('/api/products', methods=['GET', 'POST'])
def products():
    if request.method == 'GET':
        result = Product.query.filter(Product.is_visible == True).all()
        products = []
        for product in result:
            productObj = {"product_id":product.product_id,"lister":product.lister,"pree_id":product.pree_id,"brand":product.brand,"name":product.name,"category":product.category,"condition":product.condition,"typeOf":product.typeOf,"location":product.location,"stock":product.stock,"price":product.price,"currency":product.currency, "year": product.year, "colors": product.colors, "package": product.package, "description": product.description, "numOfPics":product.numOfPics}
            products.append(productObj)
        return json.dumps(products)
    elif request.method == 'POST':
        result = request.form
        photos = request.files.getlist("photos")
        numOfPics = (len(photos))
        colors = result["colors"].split(',')
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=True, pree_type="product")
        db.session.add(newPree)
        db.session.flush()
        #newAddress = Address(address1=result["address1"],address2=result["address2"],town=result["town"],parish=result["parish"])
        newProduct = Product(pree_id=newPree.pree_id,lister=result["user_id"],brand=result["brand"],name=result["name"],category=result["category"],condition=result["condition"],typeOf=result["typeOf"],location=result["location"],stock=result["stock"],price=result["price"],currency=result["currency"],year=result["year"],colors=colors,package=result["packageInfo"],description=result["description"], numOfPics=numOfPics)
        db.session.add(newProduct)
        db.session.flush()
        prefix = "product" + str(newProduct.product_id)
        product_folder = app.config['UPLOAD_FOLDER'] + "products/"
        os.makedirs(product_folder + prefix)   
        for index, pic in enumerate(photos):
            filename = prefix + "/" + str(index)
            #s3.Bucket(AWS_BUCKET).put_object(Key=key, Body=pic)
            pic.save(os.path.join(product_folder , filename))
        db.session.commit()
        return jsonify({"msg": "added successfully", "product_id":newProduct.product_id, "numOfPics":numOfPics}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-product', methods=['POST'])
def get_product():
    if request.method == 'POST':
        product_id = request.json.get('product_id', None)
        product = Product.query.get(product_id)
        if product != None and product.is_visible == True:
            productObj = {"product_id":product.product_id,"pree_id":product.pree_id,"lister":product.lister,"brand":product.brand,"name":product.name,"category":product.category,"condition":product.condition,"typeOf":product.typeOf,"location":product.location,"stock":product.stock,"price":product.price,"currency":product.currency, "year": product.year, "colors": product.colors, "package": product.package, "description": product.description, "numOfPics":product.numOfPics}
            return productObj, 200
        else:
            return {"msg":"product no longer is visible"}, 201
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/items', methods=['GET', 'POST'])
def items():
    if request.method == 'GET':
        result = Item.query.filter(Item.is_visible == True).all()
        items = []
        for item in result:
            itemObj = {"item_id":item.item_id,"lister":item.lister,"pree_id":item.pree_id,"name":item.name,"category":item.category,"typeOf":item.typeOf,"calories":item.calories,"price":item.price,"currency":item.currency, "ingredients": item.ingredients, "description": item.description, "numOfPics":item.numOfPics}
            items.append(itemObj)
        return json.dumps(items)
    elif request.method == 'POST':
        result = request.form
        media = request.files.getlist("media")
        numOfPics = (len(media))
        ingredients = result["ingredients"].split(',')
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=True, pree_type="item")
        db.session.add(newPree)
        db.session.flush()
        #newAddress = Address(address1=result["address1"],address2=result["address2"],town=result["town"],parish=result["parish"])
        newItem = Item(pree_id=newPree.pree_id,lister=result["user_id"],name=result["name"],category=result["category"],typeOf=result["typeOf"],calories=result["calories"],price=result["price"],currency=result["currency"],ingredients=ingredients,description=result["description"], numOfPics=numOfPics)
        db.session.add(newItem)
        db.session.flush()
        prefix = "item" + str(newItem.item_id)
        item_folder = app.config['UPLOAD_FOLDER'] + "items/"
        os.makedirs(item_folder + prefix)   
        for index, pic in enumerate(media):
            filename = prefix + "/" + str(index)
            #s3.Bucket(AWS_BUCKET).put_object(Key=key, Body=pic)
            pic.save(os.path.join(item_folder , filename))
        db.session.commit()
        return jsonify({"msg": "added successfully", "item_id":newItem.item_id, "numOfPics":numOfPics}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-item', methods=['POST'])
def get_item():
    if request.method == 'POST':
        item_id = request.json.get('item_id', None)
        item = Item.query.get(item_id)
        if item != None and item.is_visible == True:
            itemObj = {"item_id":item.item_id,"lister":item.lister,"pree_id":item.pree_id,"name":item.name,"category":item.category,"typeOf":item.typeOf,"calories":item.calories,"price":item.price,"currency":item.currency, "ingredients": item.ingredients, "description": item.description, "numOfPics":item.numOfPics}
            return itemObj, 200
        else:
            return {"msg":"product no longer is visible"}, 201
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/services', methods=['GET', 'POST'])
def services():
    if request.method == 'GET':
        result = Service.query.filter(Service.is_visible == True).all()
        services = []
        for service in result:
            serviceObj = {"service_id":service.service_id,"lister":service.lister,"pree_id":service.pree_id,"title":service.title,"category":service.category,"deliverable":service.deliverable, "provider":service.provider, "contact":service.contact, "email":service.email,"timetaken":service.timetaken,"timeunit":service.timeunit,"price":service.price,"currency":service.currency,"procedures":service.procedures, "description": service.description, "numOfPics":service.numOfPics, "time_contingency" : service.time_contingency, "price_contingency" : service.price_contingency, "requirements" : service.requirements, "address":service.address}
            services.append(serviceObj)
        return json.dumps(services)
    elif request.method == 'POST':
        result = request.form
        photos = request.files.getlist("media")
        numOfPics = (len(photos))
        procedures = result["procedures"].split(',')
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=True, pree_type="service")
        db.session.add(newPree)
        db.session.flush()
        #newAddress = Address(address1=result["address1"],address2=result["address2"],town=result["town"],parish=result["parish"])
        newService = Service(pree_id=newPree.pree_id,lister=result["user_id"],title=result["title"],category=result["category"],deliverable=result["deliverable"],provider=result["provider"],contact=result["contact"],email=result["email"],timetaken=result["timetaken"],timeunit=result["timeunit"],price=result["price"],currency=result["currency"],procedures=procedures,description=result["description"], numOfPics=numOfPics, time_contingency=result["time_contingency"], price_contingency=result["price_contingency"], requirements=result["requirements"], address=result["address"])
        db.session.add(newService)
        db.session.flush()
        prefix = "service" + str(newService.service_id)
        service_folder = app.config['UPLOAD_FOLDER'] + "services/"
        os.makedirs(service_folder + prefix)   
        for index, pic in enumerate(photos):
            filename = prefix + "/" + str(index)
            #s3.Bucket(AWS_BUCKET).put_object(Key=key, Body=pic)
            pic.save(os.path.join(service_folder , filename))
        db.session.commit()
        return jsonify({"msg": "added successfully", "service_id":newService.service_id, "numOfPics":numOfPics}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-service', methods=['POST'])
def get_service():
    if request.method == 'POST':
        service_id = request.json.get('service_id', None)
        service = Service.query.get(service_id)
        if service != None and service.is_visible == True:
            serviceObj = {"service_id":service.service_id,"lister":service.lister,"pree_id":service.pree_id,"title":service.title,"category":service.category,"deliverable":service.deliverable, "provider":service.provider, "contact":service.contact, "email":service.email,"timetaken":service.timetaken,"timeunit":service.timeunit,"price":service.price,"currency":service.currency,"procedures":service.procedures, "description": service.description, "numOfPics":service.numOfPics, "time_contingency" : service.time_contingency, "price_contingency" : service.price_contingency, "requirements" : service.requirements, "address":service.address}
            return serviceObj, 200
        else:
            return {"msg":"product no longer is visible"}, 201
    return jsonify({"msg":"There was an error somewhere."}), 400

## Production listings

"""@app.route('/api/listings', methods=['GET', 'POST'])
def listings():
    if request.method == 'GET':
        result = House.query.all()
        houses = []
        for house in result:
            addrObj = {"address1":house.address.address1,"address2":house.address.address2,"town":house.address.town,"parish":house.address.parish}
            houseObj = {"id":house.id,"name":house.name,"category":house.category,"typeOf":house.typeOf,"address":addrObj,"price":house.price,"currency":house.currency,"beds":house.beds, "baths": house.baths, "insideSqft": house.insideSqft, "lotSqft": house.lotSqft, "parking": house.parking, "description": house.description, "numOfPics":house.numOfPics}
            houses.append(houseObj)
        return json.dumps(houses)
    else:
        s3 = boto3.resource('s3')
        result = request.form
        photos = request.files.getlist("photos")
        numOfPics = (len(photos))
        parking = result["parking"].split(',')
        newAddress = Address(address1=result["address1"],address2=result["address2"],town=result["town"],parish=result["parish"])
        newHouse = House(name=result["name"],category=result["category"],typeOf=result["typeOf"],address=newAddress,price=result["price"],currency=result["currency"],beds=result["beds"],baths=result["baths"],insideSqft=result["insideSqft"],lotSqft=result["lotSqft"],parking=parking,description=result["description"], numOfPics=numOfPics)
        db.session.add(newHouse)
        db.session.flush()
        filename = "house" + str(newHouse.id)
        for index, pic in enumerate(photos):
            key = filename + "/" + str(index)
            s3.Bucket(AWS_BUCKET).put_object(Key=key, Body=pic)
        db.session.commit()
        return jsonify({"msg": "added successfully","id":newHouse.id, "numOfPics":numOfPics}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400
"""