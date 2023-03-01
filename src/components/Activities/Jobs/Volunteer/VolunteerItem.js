import withContext from "../../../../withContext"


const Volunteer = props => {

    return (
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder"/>
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">Beach Clean Up</p>
                        <p class="subtitle is-6">New Beach </p>
                    </div>
                </div>

                <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <span>@bulmaio</span>.
                    <span>#css</span> <span>#responsive</span>
                </div>
                <div class="content">
                    <div className="rows">
                        <div className="row">
                            <b>Venue : </b> <small>UWI BOWL</small> <br/>
                            <b>Address : </b> <small>10 New Street, Kingston 6.</small>
                        </div>
                        <hr className="info-seperator" />
                        <div className="row">
                            <b>Date : </b><time datetime="2016-1-1">1 Jan 2016, 10:00AM - 4:00AM</time>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="card-footer">
                <span className="card-footer-item">Participate</span>
                <span className="card-footer-item">Contribute</span>
            </footer>
        </div>
    )
}
export default withContext(Volunteer);