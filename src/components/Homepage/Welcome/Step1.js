import React from 'react';
import withContext from '../../../withContext';

const Step1 = props => {

    return(
        <div>
            <h3 className="subtitle has-text-weight-bold"> Step 1 of 3 </h3>

            <h3 className="subtitle"> Enter a preferred username to have a unique space on the gwaan. </h3>

            <span className="give-space error-msg">{props.unameError}</span>

            <br />

            <input className={`give-space input welcome-input ${ props.uname === "" ? 'not-unique' : ''} 
                ${ props.uname !== "" &&  props.uname !== null ? 'is-unique' : ''}`} 
                type="text" name="uname" onChange={ e => props.checkUname(e) } />

            <br />
            {props.uname !== "" && <span className="give-space success-msg">{props.responseMsg +" "+ props.val}</span> }
            <br />
            <button className="button is-medium is-success" onClick={ e => props.saveUname(e) }> Save username </button> 

            <hr />

            <button className="button is-medium is-info is-pulled-right" onClick={e => props.next(e,1)}> Next Step </button> 
            <br /><br />
            {/*props.showNextBtn || props.val ? <button className="button is-medium is-info is-pulled-right" onClick={props.next()}> Next Step </button> : <></>*/}
            <hr />
        </div>
    )

}

export default withContext(Step1);