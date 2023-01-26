import React from "react";
import Bio from '../../HelperComponents/Bio';
import withContext from "../../../withContext";
//import axios from 'axios';

const Step2 = props => {

    return(
        <div>
            <button className="button is-medium is-info" onClick={e => props.prev(e,2)}> Previous Step </button>

            <h3 className="subtitle has-text-weight-bold"> Step 2 of 3 </h3>

            <h3 className="subtitle"> Enter your Bio Information. </h3>

            <Bio responseMsg={props.responseMsg} setTagline={props.setTagline} setResponseMsg={props.setResponseMsg} func="create"/>

            <hr />

            <button className="button is-medium is-info is-pulled-right" onClick={e => props.next(e,2)}> Next Step </button>
            {/*props.showNextBtn ? <button className="button is-medium is-info is-pulled-right" onClick={props.next()}> Next Step </button> : <></> */}
            <br /><br />
            <hr />
        </div>
    )
}
export default withContext(Step2);