from api import app
import time
import json
import os

from flask import request, jsonify
from sqlalchemy import or_ , and_
from api.models import db, User, Accesses, Profile, Pree
from api.specials import Task, Request, Logistic, Poll, Event, Classified, Volunteer
from datetime import datetime
from api.relations import check_follower, check_following

@app.route('/api/activities')
def activities():
    return "activities", 200

@app.route('/api/get-tasks', methods=['POST'])
def get_tasks():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        result = Task.query.filter(Task.is_visible == True,or_(Task.lister == user_id,Task.is_for == user_id)).all()
        tasks = []
        for task in result:
            taskObj = {"task_id":task.task_id,"lister":task.lister,"is_for":task.is_for,"title":task.title,"project":task,"start_date":task.start_date,"end_date":task.end_date,"description":task.description,"status":task.status}
            tasks.append(taskObj)
        return json.dumps(tasks)
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-projects', methods=['POST'])
def get_projects():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        result = Task.query(Task.project).filter(or_(Task.lister == user_id,Task.is_for == user_id)).all()
        return result , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/tasks', methods=['POST'])
def tasks():
    if request.method == 'POST':
        result = request.form
        newTask = Task(lister=result["user_id"],is_for=result["isFor"],title=result["title"],project=result["project"],date_added=result["date_added"],start_date=result["start_date"],end_date=result["end_date"],description=result["description"],status=result["status"])
        db.session.add(newTask)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg": "added successfully", "task_id":newTask.task_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-requests', methods=['POST'])
def get_requests():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        result = Request.query.filter(Request.is_visible == True,or_(Request.lister == user_id,Request.is_for == user_id)).all()
        requests = []
        for aRequest in result:
            requestObj = {"request_id":aRequest.request_id,"lister":aRequest.lister,"is_for":aRequest.is_for,"question":aRequest.question,"choices":aRequest.choices}
            requests.append(requestObj)
        return json.dumps(requests)
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/requests', methods=['POST'])
def requests():
    if request.method == 'POST':
        result = request.form
        newRequest = Request(lister=result["user_id"],is_for=result["isFor"],question=result["question"],date_added=result["date_added"],choices=result["choices"].split(','))
        db.session.add(newRequest)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg": "added successfully", "request_id":newRequest.request_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400
   
@app.route('/api/get-logistics', methods=['POST'])
def get_logistics():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        result = Logistic.query.filter(Logistic.is_visible == True,or_(Logistic.sender == user_id,Logistic.receiver == user_id)).all()
        logistics = []
        for logistic in result:
            logisticObj = {}
            logistics.append(logisticObj)
        return json.dumps(logistics)
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/logistics', methods=['POST'])
def requests():
    if request.method == 'POST':
        result = request.form
        send_address = result["sendAddr"]
        if result["recvAddr"] == 'system':
            recv_address = get_recv_address(result["receiver"])
        else:
            recv_address = result["recvAddr"]
        newLogistic = Logistic(sender=result["sender"],receiver=result["receiver"], send_address=send_address,recv_address=recv_address,date_added=result["date_added"],package_type=result["typeOf"],description=result["description"])
        db.session.add(newLogistic)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg": "added successfully", "logistic_id":newLogistic.logistic_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

def get_recv_address(receiver_id):
    profile_record = Profile.query.get(receiver_id)
    return profile_record.location

@app.route('/api/get-polls', methods=['POST'])
def get_polls():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        result = Poll.query.filter(Poll.is_visible == True).all()
        polls = []
        for poll in result:
            if(check_following(user_id, poll.lister) or poll.lister == user_id):
                pollObj = {"poll_id":poll.poll_id,"lister":poll.lister,"question":poll.question,"choices":poll.choices,"results":poll.results,"votes":poll.votes,"end_date":poll.end_date,"end_time":poll.end_time}
                polls.append(pollObj)
        return json.dumps(polls)
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/polls', methods=['POST'])
def polls():
    if request.method == 'POST':
        result = request.form
        choices = result["choices"].split(',')
        zeros = []
        newPoll = Poll(lister=result["user_id"],question=result["question"],date_added=result["date_added"],choices=choices,results=zeros, end_date=result["end_date"], end_time=result["end_time"])
        db.session.add(newPoll)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg": "added successfully", "poll_id":newPoll.poll_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400
       
@app.route('/api/events', methods=['GET','POST'])
def events():
    if request.method == 'GET':
        result = Event.query.filter(Event.is_visible == True).all()
        events = []
        for event in result:
            eventObj = {"event_id":event.event_id,"lister":event.lister,"pree_id":event.pree_id,"title":event.title,"host":event.host,"description":event.description,"category":event.category,"typeOf":event.typeOf,"metrics":event.metrics,"where":event.where,"status":event.status,"dates":event.dates,"start_times":event.start_times,"end_times":event.end_times,"tickets":event.tickets,"costs":event.costs,"personnel_ids":event.personnel_ids,"personnel":event.personnel,"attractions":event.attractions}
            events.append(eventObj)
        return json.dumps(events)
    elif request.method == 'POST':
        result = request.form
        dates = result["dates"].split(",")
        start_times = result["start_times"].split(",")
        end_times = result["end_times"].split(",") 
        tickets = result["tickets"].split(",") 
        costs = result["costs"].split(",")
        personnel_ids = result["personnel_ids"].split(",")
        personnel = result["personnel"].split(",")
        attractions = result["attractions"].split(",")
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=True, pree_type="event")
        db.session.add(newPree)
        db.session.flush()
        newEvent = Event(lister=result["user_id"],pree_id=newPree.pree_id,title=result["title"],description=result["description"],category=result["category"],typeOf=result["typeOf"],metrics=result["metrics"],venue=result["venue"],where=result["where"],status=result["status"],dates=dates,start_times=start_times,end_times=end_times,tickets=tickets,costs=costs,personnel_ids=personnel_ids,personnel=personnel,attractions=attractions)
        db.session.add(newEvent)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg": "added successfully", "event_id":newEvent.event_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400
    
@app.route('/api/classifieds', methods=['GET','POST'])
def classifieds():
    if request.method == 'GET':
        result = Classified.query.filter(Classified.is_visible == True).all()
        classifieds = []
        for job in result:
            jobObj = {"classified_id":job.classified_id,"lister":job.lister,"pree_id":job.pree_id,"title":job.title,"category":job.category,"typeOf":job.typeOf,"metrics":job.metrics,"location":job.location,"salary":job.salary,"company":job.company,"description":job.description,"subtopics":job.subtopics,"subcontent":job.subcontent,"qualifications":job.qualifications,"benefits":job.benefits,"skills":job.skills,"questions":job.questions,"responses":job.responses,"end_date":job.end_date}
            classifieds.append(jobObj)
        return json.dumps(classifieds)
    elif request.method == 'POST':
        description = result["description"].split(",")
        subtopics = result["subtopics"].split(",")
        subcontent = result["subcontent"].split(",")
        qualifications = result["qualifications"].split(",")
        benefits = result["benefits"].split(",")
        skills = result["skills"].split(",")
        questions = result["questions"].split(",")
        responses = result["responses"].split(",")
        result = request.form
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=True, pree_type="classified")
        db.session.add(newPree)
        db.session.flush()
        newJob = Classified(lister=result["user_id"],pree_id=newPree.pree_id,title=result["title"],description=description,category=result["category"],typeOf=result["typeOf"],metrics=result["metrics"],location=result["location"],salary=result["salary"],company=result["company"],subtopics=subtopics,subcontent=subcontent,qualifications=qualifications,benefits=benefits,skills=skills,questions=questions,responses=responses,end_date=result["end_date"])
        db.session.add(newJob)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg": "added successfully", "classified_id":newJob.classified_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/volunteer', methods=['GET','POST'])
def volunteer():
    if request.method == 'GET':
        result = Volunteer.query.filter(Volunteer.is_visible == True).all()
        volunteering = []
        for volunteer in result:
            volunteerObj = {"volunteer_id":volunteer.volunteer_id,"lister":volunteer.lister,"pree_id":volunteer.pree_id,"title":volunteer.title,"category":volunteer.category,"venue":volunteer.venue,"location":volunteer.location,"description":volunteer.description,"start_date":volunteer.start_date,"end_date":volunteer.end_date,"start_time":volunteer.start_time,"end_time":volunteer.end_time,"contributions":volunteer.contributions}
            volunteering.append(volunteerObj)
        return json.dumps(volunteering)
    elif request.method == 'POST':
        result = request.form
        contributions = result["contributions"]
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=True, pree_type="classified")
        db.session.add(newPree)
        db.session.flush()
        newVolunteer = Volunteer(lister=result["user_id"],pree_id=newPree.pree_id,title=result["title"],description=result["description"],category=result["category"],venue=result["venue"],location=result["location"],start_date=result["start_date"],end_date=result["end_date"],start_time=result["start_time"],end_time=result["end_time"],contributions=contributions)
        db.session.add(newVolunteer)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg": "added successfully", "volunteer_id":newVolunteer.volunteer_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400