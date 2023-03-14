from api import app
import time
import json
import os

from flask import request, jsonify
from sqlalchemy import or_ , and_
from api.models import db, User, Accesses, Profile, Pree
from api.specials import Task, Request, Logistic, Poll, Event, Classified, Volunteer, Vote
#from datetime import datetime
import datetime
from api.relations import check_follower, check_following

@app.route('/api/activities')
def activities():
    return "activities", 200

@app.route('/api/get-tasks', methods=['POST'])
def get_tasks():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        result = db.session.query(Task, User, Profile).join(User, User.user_id == Task.is_for).join(Profile, Profile.user_id == Task.is_for).filter(Task.is_visible == True,or_(Task.lister == user_id,Task.is_for == user_id)).order_by(Task.task_id).all()
        tasks = []
        for task in result:
            #reduce payload
            done_by = {"user_id":task.User.user_id, "firstname":task.User.firstname, "lastname":task.User.lastname, "username":task.User.username, "tagline":task.Profile.tagline, "location":task.Profile.location, "has_dp":task.Profile.has_dp}
            taskObj = {"task_id":task.Task.task_id,"lister":task.Task.lister,"is_for":task.Task.is_for, "done_by":done_by,"title":task.Task.title,"project":task.Task.project,"start_date":str(task.Task.start_date),"end_date":str(task.Task.end_date),"description":task.Task.description,"status":task.Task.status}
            tasks.append(taskObj)
        return json.dumps(tasks)
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-projects', methods=['POST'])
def get_projects():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        result = db.session.query(Task.project).filter(or_(Task.lister == user_id,Task.is_for == user_id)).distinct()
        projectlist = []
        for task in result:
            project = task.project
            projectlist.append(project)
        return {"projectlist" : projectlist} , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/tasks', methods=['POST','PUT'])
def tasks():
    if request.method == 'POST':
        result = request.form
        newTask = Task(lister=result["user_id"],is_for=result["isFor"],title=result["title"],project=result["project"],date_added=result["theDateTime"],start_date=result["start_date"],end_date=result["end_date"],description=result["description"],status=result["status"])
        db.session.add(newTask)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg": "added successfully", "task_id":newTask.task_id}), 200
    elif request.method == 'PUT':
        result = request.form
        theTask = Task.query.get(result["task_id"])
        theTask.is_for=result["isFor"]
        theTask.title=result["title"]
        theTask.project=result["project"]
        theTask.start_date=result["start_date"]
        theTask.end_date=result["end_date"]
        theTask.description=result["description"]
        db.session.commit()
        return jsonify({"msg":"Task informaiton updated."}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/update-task', methods=['PUT'])
def update_task():
    if request.method == 'PUT':
        user_id = request.json.get('user_id', None)
        task_id = request.json.get('task_id', None)
        status = request.json.get('status', None)
        theTask = Task.query.get(task_id)
        if theTask.lister == user_id or theTask.is_for == user_id:
            theTask.status = status
        db.session.commit()
        return jsonify({"msg":"Task informaiton updated."}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/delete-task', methods=['PUT'])
def delete_task():
    if request.method == 'PUT':
        user_id = request.json.get('user_id', None)
        task_id = request.json.get('task_id', None)
        theTask = Task.query.get(task_id)
        if theTask.lister == user_id or theTask.is_for == user_id:
            theTask.is_visible = False
        db.session.commit()
        return jsonify({"msg":"Task informaiton updated."}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-requests', methods=['POST'])
def get_requests():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        result = Request.query.filter(Request.is_visible == True,or_(Request.lister == user_id,Request.is_for == user_id)).all()
        requests = []
        for aRequest in result:
            #reduce payload
            lister = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter_by(user_id=aRequest.lister).first()
            listerObj = {"user_id":lister.User.user_id, "firstname":lister.User.firstname, "lastname":lister.User.lastname, "username":lister.User.username, "tagline":lister.Profile.tagline, "location":lister.Profile.location, "has_dp":lister.Profile.has_dp}
            is_for = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter_by(user_id=aRequest.is_for).first()
            forObj = {"user_id":is_for.User.user_id, "firstname":is_for.User.firstname, "lastname":is_for.User.lastname, "username":is_for.User.username, "tagline":is_for.Profile.tagline, "location":is_for.Profile.location, "has_dp":lister.Profile.has_dp}
            requestObj = {"request_id":aRequest.request_id,"lister":listerObj,"is_for":forObj,"question":aRequest.question,"answer":aRequest.answer,"status":aRequest.status,"choices":aRequest.choices}
            requests.append(requestObj)
        return json.dumps(requests)
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/answer-request', methods=['PUT'])
def answer_request():
    if request.method == 'PUT':
        user_id = request.json.get('user_id', None)
        request_id = request.json.get('request_id', None)
        answer = request.json.get('answer', None)
        status = "Responded"
        theRequest = Request.query.get(request_id)
        if theRequest.is_for == user_id:
            theRequest.answer = int(answer)
            theRequest.status = status
        db.session.commit()
        return jsonify({"msg":"Task informaiton updated."}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/edit-request', methods=['PUT'])
def edit_request():
    #only if not answered as yet
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/delete-request', methods=['PUT'])
def delete_request():
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/requests', methods=['POST'])
def requests():
    if request.method == 'POST':
        result = request.form
        newRequest = Request(lister=result["user_id"],is_for=result["isFor"],question=result["question"],date_added=result["theDateTime"],status=result["status"],choices=result.getlist("choices"))
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
            #reduce payload
            logisticObj = {"logistic_id":logistic.logistic_id,"sender":logistic.sender,"receiver":logistic.receiver,"send_address":logistic.send_address,"recv_address":logistic.recv_address,"date_added":logistic.date_added,"send_date":logistic.send_date,"receive_date":logistic.receive_date,"package_type":logistic.package_type,"status":logistic.status,"description":logistic.description}
            logistics.append(logisticObj)
        return json.dumps(logistics)
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/logistics', methods=['POST'])
def logistics():
    if request.method == 'POST':
        result = request.form
        send_address = result["sendAddr"]
        if result["recvAddr"] == 'system':
            recv_address = get_recv_address(result["receiver"])
        else:
            recv_address = result["recvAddr"]
        newLogistic = Logistic(sender=result["sender"],receiver=result["receiver"], send_address=send_address,recv_address=recv_address,date_added=result["theDateTime"],package_type=result["typeOf"], status=result["status"],description=result["description"])
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
        #result = Poll.query.filter(Poll.is_visible == True).all()
        result = db.session.query(Poll, User, Profile).join(User, User.user_id == Poll.lister).join(Profile, Profile.user_id == Poll.lister).filter(Poll.is_visible == True).order_by(Poll.poll_id.desc()).all()
        polls = []
        for poll in result:
            #if poll.Poll.status == 'Open':
            #    check_poll(poll)
            record = Vote.query.filter_by(user_id=user_id,poll_id=poll.Poll.poll_id).first()
            if record is not None:
                didVote = True
            else:
                didVote = False
            #if(check_following(user_id, poll.lister) or poll.lister == user_id):
            #reduce payload
            lister = {"user_id":poll.User.user_id, "firstname":poll.User.firstname, "lastname":poll.User.lastname, "username":poll.User.username, "tagline":poll.Profile.tagline, "location":poll.Profile.location, "has_dp":poll.Profile.has_dp}
            pollObj = {"poll_id":poll.Poll.poll_id,"lister":lister,"pree_id":poll.Poll.pree_id,"category":poll.Poll.category,"question":poll.Poll.question,"choices":poll.Poll.choices,"results":poll.Poll.results,"votes":poll.Poll.votes,"end_date":str(poll.Poll.end_date),"end_time":str(poll.Poll.end_time), "status" : poll.Poll.status, "did_vote":didVote}
            polls.append(pollObj)
        return json.dumps(polls)
    return jsonify({"msg":"There was an error somewhere."}), 400

#close polls in a script ...daily or hourly
def check_poll(poll):
    print(poll.Poll.end_date)
    print(datetime.date.today())
    if poll.Poll.end_date < datetime.date.today():
        print(True)
    elif poll.Poll.end_date == datetime.date.today():
        print(True)
    else:
        print(False)
        
@app.route('/api/polls', methods=['POST'])
def polls():
    if request.method == 'POST':
        result = request.form
        choices = result.getlist("choices")
        zeros = list(map(lambda x: 0, choices))
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=False, pree_type="poll")
        db.session.add(newPree)
        db.session.flush()
        newPoll = Poll(lister=result["user_id"],pree_id=newPree.pree_id,category=result["category"],question=result["poll"],date_added=result["theDateTime"],choices=choices,results=zeros, end_date=result["end_date"], end_time=result["end_time"], status="Open")
        db.session.add(newPoll)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg": "added successfully", "poll_id":newPoll.poll_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/vote-poll', methods=['POST'])
def vote_poll():
    #post to a vote table similar to likes
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        poll_id = request.json.get('poll_id', None)
        choice = request.json.get('choice', None)
        newVote = Vote(user_id=user_id,poll_id=poll_id,choice=choice)
        db.session.add(newVote)
        poll_details = Poll.query.get(poll_id)
        new_results = poll_details.results
        new_results[choice] = poll_details.results[choice] + 1
        poll_details.results.set(new_results)
        votecount = poll_details.votes + 1
        poll_details.votes = votecount
        db.session.commit()
        return jsonify({"msg":"vote added.", "votes":votecount,"results":new_results}) , 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/delete-poll', methods=['PUT'])
def delete_poll():
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/events', methods=['GET','POST'])
def events():
    if request.method == 'POST':
        result = request.form
        photos = request.files.getlist("media")
        numOfPics = (len(photos))
        dates = result.getlist("dates")
        start_times = result.getlist("start_times")
        end_times = result.getlist("end_times")
        tickets = result.getlist("tickets")
        costs = result.getlist("costs")
        currencies = result.getlist("currencies")
        personnel_ids = result.getlist("personnel_ids")
        personnel = result.getlist("personnel")
        attractions = result.getlist("attractions")
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=True, pree_type="event")
        db.session.add(newPree)
        db.session.flush()
        newEvent = Event(lister=result["user_id"],pree_id=newPree.pree_id,title=result["title"], host=result["host"],description=result["description"],category=result["category"],typeOf=result["typeOf"],metrics=result["metrics"],venue=result["venue"],where=result["where"],status=result["status"],dates=dates,start_times=start_times,end_times=end_times,tickets=tickets,costs=costs, currencies=currencies,personnel_ids=personnel_ids,personnel=personnel,attractions=attractions, numOfPics=numOfPics)
        db.session.add(newEvent)
        db.session.flush()
        prefix = "event" + str(newEvent.event_id)
        event_folder = app.config['UPLOAD_FOLDER'] + "events/"
        os.makedirs(event_folder + prefix)   
        for index, pic in enumerate(photos):
            filename = prefix + "/" + str(index)
            #s3.Bucket(AWS_BUCKET).put_object(Key=key, Body=pic)
            pic.save(os.path.join(event_folder , filename))
        db.session.commit()
        return jsonify({"msg": "added successfully", "event_id":newEvent.event_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-events', methods=['POST'])
def get_events():
    if request.method == 'POST':
        user_id = request.json.get('user_id', None)
        typeOf = request.json.get('typeOf', None)
        result = db.session.query(Event, User, Profile).join(User, User.user_id == Event.lister).join(Profile, Profile.user_id == Event.lister).filter(Event.is_visible == True, Event.typeOf == typeOf).order_by(Event.event_id.desc()).all()
        events = []
        for event in result:
            #reduce payload
            lister = {"user_id":event.User.user_id, "firstname":event.User.firstname, "lastname":event.User.lastname, "username":event.User.username, "tagline":event.Profile.tagline, "location":event.Profile.location, "has_dp":event.Profile.has_dp}
            eventObj = {"event_id":event.Event.event_id,"lister":lister,"pree_id":event.Event.pree_id,"title":event.Event.title,"host":event.Event.host,"description":event.Event.description,"category":event.Event.category,"typeOf":event.Event.typeOf,"metrics":event.Event.metrics,"venue":event.Event.venue,"where":event.Event.where,"status":event.Event.status,"dates":list(map(lambda x: str(x), event.Event.dates)),"start_times":list(map(lambda x: str(x), event.Event.start_times)),"end_times":list(map(lambda x:str(x), event.Event.end_times)),"tickets":event.Event.tickets,"costs":event.Event.costs,"currencies":event.Event.currencies,"personnel_ids":event.Event.personnel_ids,"personnel":event.Event.personnel,"attractions":event.Event.attractions, "numOfPics":event.Event.numOfPics}
            events.append(eventObj)
        return json.dumps(events)
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-event', methods=['POST'])
def get_event():
    if request.method == 'POST':
        event_id = request.json.get('event_id', None)
        event = Event.query.get(event_id)
        if event != None and event.is_visible == True:
            personnel = []
            for i in event.personnel_ids:
                result = db.session.query(User, Profile).join(Profile, Profile.user_id == User.user_id).filter(User.user_id == int(i)).first()
                #result = User.query.get(int(i))
                obj = {"user_id":result.User.user_id, "firstname":result.User.firstname, "lastname":result.User.lastname, "username":result.User.username, "has_dp":result.Profile.has_dp}
                personnel.append(obj)
            eventObj = {"event_id":event.event_id,"lister":event.lister,"pree_id":event.pree_id,"title":event.title,"host":event.host,"description":event.description,"category":event.category,"typeOf":event.typeOf,"metrics":event.metrics,"venue":event.venue,"where":event.where,"status":event.status,"dates":list(map(lambda x: str(x), event.dates)),"start_times":list(map(lambda x: str(x), event.start_times)),"end_times":list(map(lambda x:str(x), event.end_times)),"tickets":event.tickets,"costs":event.costs,"currencies":event.currencies,"personnel":personnel,"personnel_type":event.personnel,"attractions":event.attractions, "numOfPics":event.numOfPics}
            return eventObj, 200
        else:
            return {"msg":"event no longer is visible"}, 201
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/classifieds', methods=['GET','POST'])
def classifieds():
    if request.method == 'GET':
        result = Classified.query.filter(Classified.is_visible == True).all()
        classifieds = []
        for job in result:
            #reduce payload
            jobObj = {"classified_id":job.classified_id,"lister":job.lister,"pree_id":job.pree_id,"title":job.title,"category":job.category,"typeOf":job.typeOf,"metrics":job.metrics,"location":job.location,"salary":job.salary,"company":job.company,"description":job.description,"subtopics":job.subtopics, "contents":job.contents,"subcontent":job.subcontent,"qualifications":job.qualifications,"benefits":job.benefits,"skills":job.skills,"questions":job.questions,"responses":job.responses,"end_date":str(job.end_date)}
            classifieds.append(jobObj)
        return json.dumps(classifieds)
    elif request.method == 'POST':
        result = request.form
        description = result.getlist("description")
        subtopics = result.getlist("subtopics")
        contents = result.getlist("contents")
        #subcontent = result.getlist("subcontent")
        #responses = result.getlist("responses")
        qualifications = result.getlist("qualifications")
        benefits = result.getlist("benefits")
        skills = result.getlist("skills")
        questions = result.getlist("questions")
        subcontent = []
        responses = []
        initialRes = []
        initialContent = []
        for x in range(len(questions)):
            aList = result.getlist("responses"+str(x))
            initialRes.append(aList)
        mostR = 0
        for y in initialRes:
            if len(y) > mostR:
                mostR = len(y)
        for z in initialRes:
            for i in range(len(z),mostR):
                z.append("")
            responses.append(z)

        for x in range(len(contents)):
            aList = result.getlist("subcontent"+str(x))
            initialContent.append(aList)
        mostC = 0
        for y in initialContent:
            if len(y) > mostC:
                mostC = len(y)
        for z in initialContent:
            for i in range(len(z),mostC):
                z.append("")
            subcontent.append(z)
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=True, pree_type="classified")
        db.session.add(newPree)
        db.session.flush()
        newJob = Classified(lister=result["user_id"],pree_id=newPree.pree_id,title=result["title"],description=description,category=result["category"],typeOf=result["typeOf"],metrics=result["metrics"],location=result["location"],salary=result["salary"],company=result["company"],subtopics=subtopics,contents=contents,subcontent=subcontent,qualifications=qualifications,benefits=benefits,skills=skills,questions=questions,responses=responses,end_date=str(result["end_date"]))
        db.session.add(newJob)
        db.session.flush()
        db.session.commit()
        return jsonify({"msg": "added successfully", "classified_id":newJob.classified_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-classified', methods=['POST'])
def get_classified():
    if request.method == 'POST':
        classified_id = request.json.get('classified_id', None)
        job = Classified.query.get(classified_id)
        if job != None and job.is_visible == True:
            jobObj = {"classified_id":job.classified_id,"lister":job.lister,"pree_id":job.pree_id,"title":job.title,"category":job.category,"typeOf":job.typeOf,"metrics":job.metrics,"location":job.location,"salary":job.salary,"company":job.company,"description":job.description,"subtopics":job.subtopics, "contents":job.contents,"subcontent":job.subcontent,"qualifications":job.qualifications,"benefits":job.benefits,"skills":job.skills,"questions":job.questions,"responses":job.responses,"end_date":str(job.end_date)}
            return jobObj, 200
        else:
            return {"msg":"event no longer is visible"}, 201
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/volunteer', methods=['GET','POST'])
def volunteer():
    if request.method == 'GET':
        result = Volunteer.query.filter(Volunteer.is_visible == True).all()
        volunteering = []
        for volunteer in result:
            volunteerObj = {"volunteer_id":volunteer.volunteer_id,"lister":volunteer.lister,"pree_id":volunteer.pree_id,"title":volunteer.title,"category":volunteer.category,"venue":volunteer.venue,"location":volunteer.location,"description":volunteer.description,"start_date":str(volunteer.start_date),"end_date":str(volunteer.end_date),"start_time":str(volunteer.start_time),"end_time":str(volunteer.end_time),"metrics":volunteer.metrics,"numOfPics":volunteer.numOfPics,"contributions":volunteer.contributions}
            volunteering.append(volunteerObj)
        return json.dumps(volunteering)
    elif request.method == 'POST':
        result = request.form
        photos = request.files.getlist("media")
        numOfPics = (len(photos))
        contributions = result.getlist("contributions")
        newPree = Pree(user_id=result["user_id"],date_added=result["theDateTime"],is_media=True, pree_type="volunteer")
        db.session.add(newPree)
        db.session.flush()
        newVolunteer = Volunteer(lister=result["user_id"],pree_id=newPree.pree_id,title=result["title"],description=result["description"],category=result["category"],venue=result["venue"],location=result["location"],start_date=result["start_date"],end_date=result["end_date"],start_time=result["start_time"],end_time=result["end_time"],contributions=contributions,metrics=result["metrics"],numOfPics=numOfPics)
        db.session.add(newVolunteer)
        db.session.flush()
        prefix = "volunteer" + str(newVolunteer.volunteer_id)
        event_folder = app.config['UPLOAD_FOLDER'] + "volunteers/"
        os.makedirs(event_folder + prefix)   
        for index, pic in enumerate(photos):
            filename = prefix + "/" + str(index)
            #s3.Bucket(AWS_BUCKET).put_object(Key=key, Body=pic)
            pic.save(os.path.join(event_folder , filename))
        db.session.commit()
        return jsonify({"msg": "added successfully", "volunteer_id":newVolunteer.volunteer_id}), 200
    return jsonify({"msg":"There was an error somewhere."}), 400

@app.route('/api/get-volunteer', methods=['POST'])
def get_volunteer():
    if request.method == 'POST':
        volunteer_id = request.json.get('volunteer_id', None)
        volunteer = Volunteer.query.get(volunteer_id)
        if volunteer != None and volunteer.is_visible == True:
            volunteerObj = {"volunteer_id":volunteer.volunteer_id,"lister":volunteer.lister,"pree_id":volunteer.pree_id,"title":volunteer.title,"category":volunteer.category,"venue":volunteer.venue,"location":volunteer.location,"description":volunteer.description,"start_date":str(volunteer.start_date),"end_date":str(volunteer.end_date),"start_time":str(volunteer.start_time),"end_time":str(volunteer.end_time),"metrics":volunteer.metrics,"numOfPics":volunteer.numOfPics,"contributions":volunteer.contributions}
            return volunteerObj, 200
        else:
            return {"msg":"Activity no longer is visible"}, 201
    return jsonify({"msg":"There was an error somewhere."}), 400
