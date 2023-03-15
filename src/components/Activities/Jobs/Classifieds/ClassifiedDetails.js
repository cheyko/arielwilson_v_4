
const ClassifiedDetails = props => {

    const {classified} = props;

    const convertDate = (val) => {
        var result;
        if (new Date().getDate() == new Date(val).getDate() + 1){
             result = "Today at";
        }else{
            result = new Date(new Date(val).setDate(new Date(val).getDate() + 1)).toDateString();
        }
        return result;
    }
    
    return(
        <div className="box">
            <div className="job-heading subtitle">
                <span className="tag is-large is-info">{classified.category}</span>
                <strong style={{textDecoration:"underline"}}>
                        <h3><b style={{ textTransform: "capitalize" }}>{classified.title}</b></h3>
                </strong>
                <p> {classified.company} </p>
                <div>
                    <span className="tag">{classified.typeOf}</span>{" "}
                    <span className="tag">{classified.metrics}</span>
                </div>
                <div className="columns is-mobile has-text-centered p-3">
                    <span className="column"><button className="button is-fullwidth is-link"> Apply !</button></span>
                    <span className="column"><button className="button is-fullwidth is-primary"> Save Job</button></span>
                </div>
            </div>
            
            <div id="first-content" className="content">
                <h5>
                    <i className="fas fa-globe" aria-hidden="true"></i>
                    {" "}{classified.location}
                </h5>   
                <h5>
                    <i className="fas fa-money-bill" aria-hidden="true"></i>
                    {" "}{classified.salary}
                </h5>   
                <h5>
                    <i className="fas fa-calendar" aria-hidden="true"></i>
                    {" "}{convertDate(classified.end_date)}
                </h5>           
            </div>
            <div className="content">
                <div className="descript">
                    <div className="has-text-centered"><b><h3 className="title">DESCRIPTION</h3></b></div>
                    {classified.description.map((para,idx) =>
                        <p key={idx} style={{fontStyle:"italic"}}> {para}</p>
                    )}
                    {classified.subtopics.map((topic,idx) =>
                        <div key={idx} className="mt-3">
                            <b style={{textDecoration:"underline"}}>{topic}</b>
                            <br />
                            {classified.contents[idx] === "fulltext" ? 
                                <p>
                                    {classified.subcontent[0]}
                                </p>:
                                <ul>
                                    {classified.subcontent[idx].map((point,i) =>
                                        <li key={i}>{point}</li>
                                    )}
                                </ul>
                            }
                        </div>
                    )}
                </div>
                <br />
                <div className="qualifications">
                    <div className="has-text-centered"><b><h3 className="title">QUALIFICATIONS</h3></b></div>
                    <ul>
                        {classified.qualifications.map((qual,idx) =>
                            <li key={idx}>{qual}</li>
                        )}
                    </ul>
                </div>
                <br/>
                <div className="skills">
                    <div className="has-text-centered"><b><h3 className="title">SKILLS</h3></b></div>
                    <ul>
                        {classified.skills.map((skill,idx) =>
                            <li key={idx}>{skill}</li>
                        )}
                    </ul>
                </div>
                <br/>
                <div className="benefits">
                    <div className="has-text-centered"><b><h3 className="title">BENEFITS</h3></b></div>
                    <ul>
                        {classified.benefits.map((benefit,idx) =>
                            <li key={idx}>{benefit}</li>
                        )}
                    </ul>
                </div>
            </div>
            <br />
        </div>
    )

}

export default ClassifiedDetails;