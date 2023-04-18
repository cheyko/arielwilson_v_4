from api import app
import time
import json
import os
import openai

from flask import request, jsonify, send_file, render_template
from sqlalchemy import or_ , and_
from api.models import db, User, Accesses, Profile, Pree
from api.specials import Listing, Vehicle, Product, Item, Service, Classified
from datetime import datetime
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from api.relations import update_stats
from api.security import authenticate_token

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/api/login2', methods=['GET','POST'])
@authenticate_token
def login2():
    if request.method == 'POST':
        #enc1 = base64.b64decode(request.form["lkjhg1"])
        #enc2 = base64.b64decode(request.form["lkjhg2"])
        #cipher = AES.new((str(os.getenv("AES_KEY"))).encode('utf-8'), AES.MODE_ECB)
        #email = unpad(cipher.decrypt(enc1),AES.block_size).decode("utf-8", "ignore")
        #password = unpad(cipher.decrypt(enc2),AES.block_size).decode("utf-8", "ignore")
        email = request.form["email"]
        password = request.form["password"]
 
        if not email:
            return jsonify({"msg": "Missing username parameter"}), 400, {"Access-Control-Allow-Origin": "*"}
        if not password:
            return jsonify({"msg": "Missing password parameter"}), 400, {"Access-Control-Allow-Origin": "*"}
        
        user = User.query.filter_by(email=email).first()
        if user is not None and check_password_hash(user.password,password):           
            access_token = create_access_token(identity=email)
            refresh_token = create_refresh_token(identity=email)
            profile_record = Profile.query.get(user.user_id)
            if profile_record is None:
                has_profile = False
                location = ""
            else:
                has_profile = True
                location = profile_record.location
                update_stats(user.user_id)
            return {
                'user_id' : user.user_id,
                'firstname' : user.firstname,
                'lastname' : user.lastname,
                'username' : user.username,
                'phonenumber' : user.phonenumber,
                'access_token': access_token,
                'refresh_token': refresh_token,
                'access_type': user.accessType,
                'has_profile' : has_profile,
                'gender' : user.gender,
                'location': location
            }, 200, {"Access-Control-Allow-Origin": "*"}
        return jsonify({"msg": "Incorrect email or password"}), 400, {"Access-Control-Allow-Origin": "*"}
    else:
        return jsonify({"msg": "There was an error"}), 400, {"Access-Control-Allow-Origin": "*"}
    
@app.route('/api/test-function', methods=['POST'])
def test_func():
    if request.method == 'POST':
        result = request.form
        choices = result["choices"].split(',')
        test = request.form.getlist("choices")
        zeros = list(map(lambda x: 0, test))
        print(zeros)
        print(test)
        print(result["choices"])
        print(choices)
        print(choices[0])
        timeobj = datetime.time
        print(timeobj)
        print(time.time())
        return {"msg":"procedures sent","poll_id":1,"time":str(timeobj)}, 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/test-function2', methods=['POST'])
def test_func2():
    if request.method == 'POST':
        input_id = request.json.get('input_id', None)
        job = Classified.query.filter_by(classified_id=input_id).first()
        jobObj = {"classified_id":job.classified_id,"lister":job.lister,"pree_id":job.pree_id,"title":job.title,"category":job.category,"typeOf":job.typeOf,"metrics":job.metrics,"location":job.location,"salary":job.salary,"company":job.company,"description":job.description,"subtopics":job.subtopics,"subcontent":job.subcontent,"qualifications":job.qualifications,"benefits":job.benefits,"skills":job.skills,"questions":job.questions,"responses":job.responses,"end_date":job.end_date}
        return {"msg":"procedures sent","classified":jobObj}, 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/test-func', methods=['GET'])
def test_function():
    if request.method == 'GET':
        #print(set([1,2,1]) == set([1,2]))
        a={1:9,2:8,3:4, 4:6, 5:6}
        print(a.get(6))
        return {"msg":"procedures sent","classified":1}, 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/test-func2', methods=['GET'])
def isAlmostPalidrome():
    word = 'abccba'
    count = 0
    for x in range(0,len(word)//2):
        if(word[x] != word[(-x-1)]): 
            count += 1
    if count < 2: print(True)
    else: print(False)
    return {"msg":"procedures sent","classified":1}, 200

@app.route('/api/test-func3', methods=['GET'])
def MostPopularNumber():
    arr = [34,31,34,77,82]
    val = 5
    count = 0
    answer = arr[0]
    for i in arr:
        frequency = arr.count(i)
        if(frequency > count):
            count = frequency
            answer = i
        elif (frequency == count) and (i < answer):
            count = frequency
            answer = i
    print(answer)
    return {"msg":"procedures sent","classified":1}, 200

@app.route('/api/test-function3', methods=['POST','GET'])
def test_func3():
    if request.method == 'GET':
        media_folder = app.config['UPLOAD_FOLDER'] + "defaults"
        media =  media_folder + "/volunteers" + "/" + "Education.jpg"
        return send_file(media, mimetype="image/jpg") , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/test-function4/<username>', methods=['POST','GET'])
def test_func4(username):
    if request.method == 'GET':
        return emailTemp.format(username) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/test-function5', methods=['POST','GET'])
def test_func5():
    if request.method == 'GET':
        username = request.args.get('username')
        return emailTemp.format(username) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/test-function6', methods=['POST','GET'])
def test_func6():
    if request.method == 'GET':
        username = request.args.get('username')
        return render_template('hello.html',name=username) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/test-function7', methods=['POST','GET'])
def test_func7():
    if request.method == "POST":
        animal = request.form["animal"]
        #print("key :" + os.getenv("OPENAI_API_KEY"))
        #print(animal)
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt(animal),
            temperature=0.6,
        )
        return {"response":response.choices[0].text}

    result = request.args.get("result")
    return {"result":result}

@app.route('/api/test-function8', methods=['POST','GET'])
def test_func8():
    if request.method == "POST":
        username = request.form["username"]
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt2(username),
            temperature=0.6,
        )
        return {"response":response.choices[0].text}

    result = request.args.get("result")
    return {"result":result}

@app.route('/api/test-function9', methods=['POST','GET'])
def test_func9():
    if request.method == "POST":
        user_id = request.form["user_id"]
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt3(user_id),
            temperature=0.6,
        )
        return {"response":response.choices[0].text}

    result = request.args.get("result")
    return {"result":result}

def generate_prompt(animal):
    return """Suggest three names for an animal that is a superhero.
Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: {}
Names:""".format(
        animal.capitalize()
    )

def generate_prompt2(username):
    return """Suggest three other usernames for a new user on my website.
User: Spider_girl
Usernames: Eight_leg_hero, Miss_Venom, Spider_girl_3
User: James Bond
Usernames: Mr. 007, Top_Spy_70, Sir MI6
User: {}
Usernames:""".format(
        username
    )

user_purchases = ['sony hd 2023 camera', 'spectrum 2019 tv', 'converse all-star']
user_browsing_history = ['venus hd highlighter', 'gucci shirt', 'coffee beans']

def generate_prompt3(user_id):
    """products = ["Absorbent cotton","Alfalfa pellets","Allspice","Almonds","Aniseed","Apples","Apples, dried","Apricot kernels","Apricots, dried", "Artichokes"
    "Asparagus","Automobiles","Avocados",]"""
    #return "Generate product recommendations for user {0} from this list of products; {1}".format(user_id,", ".join(map(str,products)))
    return "Generate product recommendations for user {0}. {1}".format(user_id, generate_context())

def generate_context():
    return 'The user has purchased ' + ", ".join(map(str,user_purchases)) + ' and has browsed ' + ", ".join(map(str,user_browsing_history))

emailTemp = """\
    <!DOCTYPE html>
    <html>
        <body style="background-color:burlywood;padding:3rem">
            <h1 style="color:crimson;font-family:fantasy"> Welcome {0} to Test.com </h1>
            <br>
            <b style="color:chocolate;text-decoration:underline"> You have created a New User ! </b>
            <br>
            <p style="color:black;padding:1rem;font-style:italic">
                Now You can Make 'Make-Up' Bookings and get Slayed by the Best
                Make-Up Artist, Shop the Finest Wigs and See some Awesome
                Tutorials.
            </p>
            <p style="color:black;padding:1rem;font-style:italic">
                There are several Testimonial Pictures of previous Slayed Faces,
                You'll get an idea of what your transformation will look like.
                You will be impressed; not only by Pictures of Beautiful and Happy Clients, and
                Products that give Value for your Dollars but You'll adorn the
                LifeStyle. Become a 'BADDIE' or a 'BARBIE'.
            </p>
            <p style="color:black;padding:1rem;font-style:italic">
                Services are provided for Girls only. Sign-in, Check out all
                the pages of the <a href="https://d302vm3ge3u1go.cloudfront.net/" style="color:crimson;font-family:fantasy">Test.com</a> .
                Call 1-646-477-9309 for any immaediate queries that you may have.
            </p>
            <small> Copyright &copy; 2021. </small>
        </body>
    </html>
    """