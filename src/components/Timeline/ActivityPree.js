import PollItem from "../Activities/Actions/Polls/PollItem";
import EventItem from "../Activities/Events/EventItem";
import ClassifiedItem from "../Activities/Jobs/Classifieds/ClassifiedItem";
import VolunteerItem from "../Activities/Jobs/Volunteer/VolunteerItem";

const ActivityPree = props => {
    let {aPree} = props;
    let {index} = props;

    let template;

    if(aPree.pree_type === 'poll'){
        template = <div>
                        <PollItem 
                            poll={aPree.attachment}
                            key={index}
                            page={"timeline"}
                        />
                        <br/>
                    </div>
    }else if(aPree.pree_type === 'event'){
        template = <div>
                        <EventItem 
                            event={aPree.attachment}
                            key={index}
                            page={"timeline"}
                        />
                        <br/>
                    </div>
    }else if(aPree.pree_type === 'classified'){
        template = <div>
                        <ClassifiedItem 
                            job={aPree.attachment}
                            key={index}
                        />
                        <br/>
                    </div>
    }else if(aPree.pree_type === 'volunteer'){
        template = <div>
                        <VolunteerItem 
                            activity={aPree.attachment}
                            key={index}
                        />
                        <br/>
                    </div>
    }

    return(
        <div className="pree-item">
            {template}
        </div>
    )
}
export default ActivityPree;