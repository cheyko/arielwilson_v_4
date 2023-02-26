import withContext from "../../../../withContext"

const LogisticsItem = props => {

    return(
        <div className="card">
            <div className="media">
                <div className="content">
                    <b>Status</b> {" "} <span>On its Way</span> <span> 3 days</span> remaining.
                </div>
            </div>
            <div className="columns">
                <div className="column is-half">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                        </figure>
                    </div>
                    <div className="card-content">
                        <span className="">Sample Description</span>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <b className="">Type: </b>{" "} 
                                <span className=""> Sample</span>
                            </div>
                        </div>
                        <div className="box columns is-multiline is-mobile">
                            <div className="label"> <b>Sender : </b>&nbsp;</div>
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                                    </figure>
                                </div> 
                                <div className="media-content">
                                    <p className="title is-4">John Smith</p>
                                    <p className="subtitle is-6">@johnsmith</p>
                                </div>
                            </div>
                        </div>
                        <div className="box columns is-multiline is-mobile">
                            <div className="label "> <b>Receiver :</b> &nbsp; </div>
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">John Smith</p>
                                    <p className="subtitle is-6">@johnsmith</p>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    )
}

export default withContext(LogisticsItem);