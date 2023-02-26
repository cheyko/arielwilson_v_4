import withContext from "../../../../withContext"

const RequestItem = props => {
    return(
<       div className="box">
            <div className="media">
                <div className="media-content">
                    
                    <b><em>This is the Request ? </em> </b>
                    
                    <div className="columns is-multiline">
                        <div className="column">
                            <button className="button"> Response 1 </button>   
                        </div>
                        <div className="column">
                            <button className="button"> Response 2 </button>  
                        </div>  
                        <div className="column">
                            <button className="button"> Response 3 </button>           
                        </div>
                        <div className="column">
                            <button className="button"> Response 4 </button>            
                        </div>  
                    </div>
                </div>
            </div>
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
    )

}
export default withContext(RequestItem);