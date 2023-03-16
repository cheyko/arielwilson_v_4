import { useNavigate } from "react-router-dom";

const Encourage = props => {
    const {wanted} = props;
    let navigate = useNavigate();

    return(
        <div className="hero">
            <div className="box">
                <article className="message is-info">
                    <div className="message-header">
                        <p>W@H GW@@N</p>
                        <button className="info" aria-label="info"></button>
                    </div>
                    <div className="message-body">
                        <h1 className="title">
                            Welcome to W@H GW@@N
                        </h1>
                        <p className="info">
                            <h3>Login or Sign Up to {wanted} </h3>
                        </p>  
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