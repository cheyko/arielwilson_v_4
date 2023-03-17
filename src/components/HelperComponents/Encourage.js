import { useNavigate } from "react-router-dom";

const Encourage = props => {
    const {wanted} = props;
    let navigate = useNavigate();

    return(
        <div className="hero" style={{height:"100%"}}>
            <div className="card" style={{height:"100%"}}>
                <article className="message is-info" style={{height:"100%"}}>
                    <div className="message-header">
                        <p>W@H GW@@N</p>
                        {props.use === "modal" ? 
                            <button onClick={ e => props.closeModal(e)} className="is-large delete" aria-label="delete"></button>:
                            <button className="is-large info" aria-label="info"></button>
                        }
                    </div>
                    <div className="message-body">
                        <h1 className="title">
                            Welcome to W@H GW@@N
                        </h1>
                        <div className="info">
                            <h3>Login or Sign Up to {wanted} </h3>
                        </div>  
                        <br />
                        <div>
                            <button onClick={e => navigate("/home")} className='button is-link'>Login / Signup</button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}
export default Encourage;