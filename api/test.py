from api import app
import time
import json
import os

from flask import request, jsonify, send_file, render_template
from sqlalchemy import or_ , and_
from api.models import db, User, Accesses, Profile, Pree
from api.specials import Listing, Vehicle, Product, Item, Service, Classified
from datetime import datetime

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