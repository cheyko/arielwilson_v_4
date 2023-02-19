

const StallView = props => {

    return (
        <div className="box">
            <article className="media">
                <figure className="media-left">
                    <p className="image is-64x64">
                        <img alt="Display" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                    </p>
                    
                </figure>
                <div className="media-content">
                    <div className="content">
                        <span>Vendor Name</span><br />
                        <span>Overall Ratings</span>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default StallView;