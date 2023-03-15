import withContext from "../../../../withContext";
import React, {useEffect, useState} from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import $ from 'jquery';
import CompanyProfile from "../../../Company/CompanyProfile";
import axios from "axios";
import ClassifiedDetails from "./ClassifiedDetails";
import SimilarClassifieds from "./SimilarClassifieds";
import "./index.css";

const ViewClassified = (props) => {

    
    let {id} = useParams();

    const [classified, setClassified] = useState(null);
    const [show, setShow] = useState("both");

    let navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
        if (classified === null){
            const classified_id = id;
            axios.post("/api/get-classified",{classified_id}).then(res => {
                if (res.status === 200){
                    setClassified(res.data);
                }else{
                    setClassified(false);
                }
            });
        }
        if (window.screen.width < 1023){
           // localStorage.getItem("column") ? setShow(localStorage.getItem("column")) : setShow('job');
           setShow('job');
        }
        window.addEventListener('resize', updateSize);
        if (document.documentElement.classList.contains("hide-scroll") === false){
            document.documentElement.classList.add("hide-scroll");
        }
    }, [classified, window.screen.width, document]);

    const updateSize = () => {
        if (window.screen.width > 1022){
            setShow('both');
        }else{
            setShow(localStorage.getItem("column"));
        }
    }

    return (
        <div className="hero">
            {classified ?
            <div className="hero-container">
                <div id="job-content" className="job-content">
                    <div className="control-card card job-controls">
                        <div className="card-content columns is-mobile p-0 m-0">
                            <button className="column is-2 button" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i>  </button>

                            <button onClick={e => {setShow("job");localStorage.setItem("column","job");}} className="column button is-5 p-0 m-0">
                                Job
                            </button>
                            <button onClick={e => {setShow("company");localStorage.setItem("column","company");}} className="column button is-5 p-0 m-0">
                                Company
                            </button>
                        </div>
                    </div>
                    <div className="columns no-padding no-margin">
                        {show !== "job" &&
                            <div id="company" className="leftContent column no-padding no-margin">
                                <CompanyProfile show={show} company={classified.company} />
                            </div>
                        }
                        {show !== "company" &&
                            <div id="job" className="rightContent column">
                                <ClassifiedDetails classified={classified} />
                                <hr />
                                <SimilarClassifieds classified={classified} />
                            </div>
                        }
                    </div>
                </div>
            </div>:
            <div className="hero-container">
                <div className="hero-body">
                    {classified === false ?
                        <span className="is-size-3" style={{color:"gray"}}>
                            Job is not found !
                        </span>
                        :
                        <span className="is-size-3" style={{color:"gray"}}>
                            Loading .....
                        </span>
                    }
                </div>
            </div>
            }
        </div>
    )

}
export default withContext(ViewClassified);