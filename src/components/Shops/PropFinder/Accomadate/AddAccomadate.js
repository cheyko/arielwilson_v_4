import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../../../../withContext";
import axios from "axios";
import $ from "jquery";
import Slider from "react-slick";

const AddAccomadate = props => {

    const settings = {
        dots: false,
        arrows:true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyload: 'progressive',
        autoplay: false,
        autoplayspeed: 5000,
    };

    const token = props.context.token ? props.context.token : 0;
    const [photos, setPhotos] = useState([]);
    const [selected, setSelected] = useState(null);
    const standardTypes = ["Apartment","Bed and Breakfast","Guest House","Hostel","Hotel","Private Vacation Home","Villa"];
    const otherTypes = ["All Inclusive", "Cabin", "Condo", "Condominium Resort", "Cottage", "House Boat", "Inn", "Lodge", "Townhouse", "TreeHouse"];
    const [title, setTitle] = useState("");
    const [typeOf, setTypeOf] = useState("");
    const [address, setAddress] = useState("");
    
    const amenitiesList = ["Unlimited Drinks", "Unlimited Food", "Beach", "Pool", "Free WiFi", "Connecting Rooms", "Restaurant", "Air Conditioning", "Parking Available", "Slot Machines", "Gym", "Spa"];
    const [amenities, setAmenities] = useState([]);
    const [additional, setAdditional] = useState("");
    const [additionalList, setAdditionalList] = useState([]);
    const [cuisine, setCuisine] = useState("");
    const [cuisineList, setCuisineList] = useState([]);
    const [minors, setMinors] = useState("");
    const [minorsList, setMinorsList] = useState([]);
    const [todo, setToDo] = useState("");
    const [todoList, setToDoList] = useState([]);
    const [cooperate, setCoorperate] = useState("");
    const [cooperateList, setCoorperateList] = useState([]);
    const [service, setService] = useState("");
    const [serviceList, setServiceList] = useState([]);
    const [facilities, setFacilities] = useState("");
    const [facilitiesList, setFacilitiesList] = useState([]);
    const [accessibility,setAccessibility] = useState("");
    const [accessList, setAccessList] = useState([]);

    const [roomsList, setRoomsList] = useState([]);
    const [roomTitle, setRoomTitle] = useState("");
    const [roomSize, setRoomSize] = useState(0);
    const [roomCapacity, setRoomCapacity] = useState(0);
    const [beds, setBeds] = useState("");
    const [wifi, setWifi] = useState(null);
    const [roomPhotos, setRoomPhotos] = useState([]);
    const [rselected, setRSelected] = useState(null);
    const [show, setShow] = useState(null);
    const [attraction, setAttraction] = useState("");
    const [attractions, setAttractions] = useState([]);
    const [transit, setTransit] = useState("");
    const [transitList, setTransitList] = useState([]);
    const [establishment, setEstablishment] = useState("");
    const [establishments, setEstablishments] = useState([]);
    const [description, setDescription] = useState("");
    const languageList = ["English", "Spanish", "French", "Mandarin", "Italian", "German", "Russian", "Arabic", "Bengali", "Japanese", "Tamil", "Portuguese", "Javanese"];
    const [languages, setLanguages] = useState([]);
    const [overview, setOverview] = useState("");
    const [overviewList, setOverviewList] = useState([]);
    const [check, setCheck] = useState("");
    const [checkList, setCheckList] = useState([]);
    const [requirement, setRequirement] = useState("");
    const [requirements, setRequirements] = useState([]);
    const [fee, setFee] = useState("");
    const [fees, setFees] = useState([]);
    const [covid, setCovid] = useState("");
    const [covidList, setCovidList] = useState([]);
    const [pets, setPets] = useState(null);
    const [children, setChildren] = useState("");
    const [childrenList, setChildrenList] = useState([]);
    const [other, setOther] = useState("");
    const [otherList, setOtherList] = useState([]);
    const [parking, setParking] = useState("");
    const [parkingList, setParkingList] = useState([]); 
    const [subtopic, setSubTopic] = useState("");
    const [feature, setFeature] = useState("");
    const [features, setFeatures] = useState([]);
    const [subtopics, setSubtopics] = useState([]);
    const [featuresList, setFeaturesList] = useState([]);
    
    const [edit, setEdit] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [responseMsg, setResponseMsg] = useState("");
    const [viewUpload, setViewUpload] = useState("");

    const picked = (index, type) => {
        switch(type){
            case "property":
                if(selected === index){
                    setSelected(null);
                }else{
                    setSelected(index);
                }
                break;
            case "room":
                if(rselected === index){
                    setRSelected(null);
                }else{
                    setRSelected(index);
                }
                break;
            default:
                break;
        }
    }

    let navigate = useNavigate();

    const clearFunc = () => {
        setTitle("");setTypeOf("");setAddress("");
        setPhotos([]);setSelected(null);
        setAmenities([]); setCuisine(""); setCuisineList([]);
        setAdditional("");setAdditionalList([]);
        setMinors(""); setMinorsList([]); setToDo(""); setToDoList([]);
        setCoorperate(""); setCoorperateList([]); setService(""); setServiceList([]);
        setFacilities(""); setFacilitiesList([]); setAccessibility(""); setAccessList([]);
        setRoomsList([]);setRoomTitle("");setRoomSize(0);setRoomCapacity(0);
        setBeds("");setWifi(false);setRoomPhotos([]);document.getElementById("wifi-false").checked = true;
        setAttraction("");setAttractions([]);setTransit("");setTransitList([]);
        setEstablishment(""); setEstablishments([]); setDescription("");
        setLanguages([]);setOverview("");setOverviewList([]);
        setCheck("");setCheckList([]);setRequirement("");
        setRequirements([]);setFee("");setFees([]); setCovid("");setCovidList([]);
        setPets(null);setChildren("");setChildrenList([]);
        setOther("");setOtherList([]);setParking("");setParkingList([]); 
        document.getElementById("photos").value = ""; document.getElementById("room-photos").value = "";
        setResponseMsg("");setSubTopic("");setFeature("");setFeatures([]);
        setSubtopics([]);setFeaturesList([]);setEdit(null);setEditIndex(null);
    }

    const saveProp = async (e) => {
        e.preventDefault();
        setResponseMsg("");
        if (typeOf !== "" && address !== "" ){
            //const user_id = props.context.user.id;
            const formData = new FormData();
            formData.append('token',token);
            formData.append('title',title);
            formData.append('typeOf',typeOf);
            formData.append('address',address);
            formData.append('description',description);
            formData.append('pets',pets);
            amenities.forEach((val) => { formData.append('amenities', val);});
            additionalList.forEach((val) => {if (val !== ''){formData.append('additional', val);}});
            cuisineList.forEach((val) => {if (val !== ''){formData.append('cuisine', val);}});
            minorsList.forEach((val) => {if (val !== ''){formData.append('minors', val);}});
            cooperateList.forEach((val) => {if (val !== ''){formData.append('cooperate', val);}});
            facilitiesList.forEach((val) => {if (val !== ''){formData.append('facilities', val);}});
            attractions.forEach((val) => {if (val !== ''){formData.append('attraction', val);}});
            transitList.forEach((val) => {if (val !== ''){formData.append('transit', val);}});
            establishments.forEach((val) => {if (val !== ''){formData.append('establishment', val);}});
            languages.forEach((val) => {if (val !== ''){formData.append('languages', val);}});
            overviewList.forEach((val) => {if (val !== ''){formData.append('overview', val);}});
            requirements.forEach((val) => {if (val !== ''){formData.append('requirement', val);}});
            fees.forEach((val) => {if (val !== ''){formData.append('fee', val);}});
            childrenList.forEach((val) => {if (val !== ''){formData.append('children', val);}}); //remove
            otherList.forEach((val) => {if (val !== ''){formData.append('others', val);}});
            parkingList.forEach((val) => {if (val !== ''){formData.append('parking', val);}});
            subtopics.forEach((val,index) =>{
                console.log(val);
                formData.append('subtopics',val);
                featuresList[index].map((aFeature) => {if (aFeature !== ''){formData.append('features'+index, aFeature)}});
            });  
            roomsList.map((val,index) => {
                console.log(val);
                const room = val;
                val.roomPhotos.forEach((photo) => {formData.append('roomphotos'+index,photo);});
                //delete room["roomPhotos"];
                formData.append('rooms',JSON.stringify(room));
            })          
            photos.forEach( (photo) => {formData.append('photos',photo);});

            await axios.post(`${process.env.REACT_APP_PROXY}/api/accomadation`,formData, 
                {
                headers: {
                'Content-Type': 'multipart/form-data'
                },
            }).then(
                (result) => {
                    if (result.status === 200){
                        setResponseMsg("Property was saved.");
                        const accomadate_id = result.data.accomadate_id;
                        setViewUpload('/accomadation/'+accomadate_id);
                        clearFunc();
                    }else{
                        setResponseMsg("Property was not saved, please try again. Contact us for suppport if problem persist.");
                    }
                }
            );
            return true;
        }else{
            setResponseMsg("Listing is missing some important details.");
            return false;
        }
    }

    const handlePhotos = (e,type) => {
        if(type === 'property'){
            setPhotos(Array.from(e.target.files));
        }else if(type === 'room'){
            setRoomPhotos(Array.from(e.target.files));
        }
    }

    const handleCheckboxChange = (event,type) => {
        let newArray = [];
        switch(type){
            case "amenities":
                newArray = amenities.length > 0 ? [...amenities, event.target.value] : [event.target.value];
                if (amenities.includes(event.target.value)) {
                    newArray = newArray.filter(opt => opt !== event.target.value);
                } 
                setAmenities(newArray);
                break;
            case "languages":
                newArray = languages.length > 0 ? [...languages, event.target.value] : [event.target.value];
                if (languages.includes(event.target.value)) {
                    newArray = newArray.filter(opt => opt !== event.target.value);
                } 
                setLanguages(newArray);
                break;
            default:
                break;
        }
    };

    const addChoice = (e,adding) => {
        let tempList;
        if(adding === 'additional'){
            let tempAdditionalList = additionalList;
            if (additionalList.length > 0){
                tempAdditionalList[additionalList.length-1] = e.target.value;
            }else{
                tempAdditionalList[additionalList.length] = e.target.value;
            }
            setAdditionalList([...tempAdditionalList]);
        }else if(adding === 'cuisine'){
            let tempCuisineList = cuisineList;
            if (cuisineList.length > 0){
                tempCuisineList[cuisineList.length-1] = e.target.value;
            }else{
                tempCuisineList[cuisineList.length] = e.target.value;
            }
            setCuisineList([...tempCuisineList]);
        }else if(adding === 'minors'){
            let tempMinorsList = minorsList;
            if (minorsList.length > 0){
                tempMinorsList[minorsList.length-1] = e.target.value;
            }else{
                tempMinorsList[minorsList.length] = e.target.value;
            }
            setMinorsList([...tempMinorsList]);
        }else if(adding === 'todo'){
            let tempToDoList = todoList;
            if (todoList.length > 0){
                tempToDoList[todoList.length-1] = e.target.value;
            }else{
                tempToDoList[todoList.length] = e.target.value;
            }
            setToDoList([...tempToDoList]);
        }else if(adding === 'cooperate'){
            let tempCooperateList = cooperateList;
            if (cooperateList.length > 0){
                tempCooperateList[cooperateList.length-1] = e.target.value;
            }else{
                tempCooperateList[cooperateList.length] = e.target.value;
            }
            setCoorperateList([...tempCooperateList]);
        }else if(adding === 'service'){
            let tempServiceList = serviceList;
            if (serviceList.length > 0){
                tempServiceList[serviceList.length-1] = e.target.value;
            }else{
                tempServiceList[serviceList.length] = e.target.value;
            }
            setServiceList([...tempServiceList]);
        }else if(adding === 'facilities'){
            let tempFacilitiesList = facilitiesList;
            if (facilitiesList.length > 0){
                tempFacilitiesList[facilitiesList.length-1] = e.target.value;
            }else{
                tempFacilitiesList[facilitiesList.length] = e.target.value;
            }
            setFacilitiesList([...tempFacilitiesList]);
        }else if(adding === 'accessibility'){
            let tempAccessList = accessList;
            if (accessList.length > 0){
                tempAccessList[accessList.length-1] = e.target.value;
            }else{
                tempAccessList[accessList.length] = e.target.value;
            }
            setAccessList([...tempAccessList]);
        }else if(adding === 'attraction'){
            let tempAttractions = attractions;
            if (attractions.length > 0){
                tempAttractions[attractions.length-1] = e.target.value;
            }else{
                tempAttractions[attractions.length] = e.target.value;
            }
            setAttractions([...tempAttractions]);
        }else if(adding === 'transit'){
            let tempTransits = transitList;
            if (transitList.length > 0){
                tempTransits[transitList.length-1] = e.target.value;
            }else{
                tempTransits[transitList.length] = e.target.value;
            }
            setTransitList([...tempTransits]);
        }else if(adding === 'establishment'){
            let tempEsts = establishments;
            if (establishments.length > 0){
                tempEsts[establishments.length-1] = e.target.value;
            }else{
                tempEsts[establishments.length] = e.target.value;
            }
            setEstablishments([...tempEsts]);
        }else if(adding === 'overview'){
            let tempOverview = overviewList;
            if (overviewList.length > 0){
                tempOverview[overviewList.length-1] = e.target.value;
            }else{
                tempOverview[overviewList.length] = e.target.value;
            }
            setOverviewList([...tempOverview]);
        }else if(adding === 'requirement'){
            tempList = requirements;
            if (requirements.length > 0){
                tempList[requirements.length-1] = e.target.value;
            }else{
                tempList[requirements.length] = e.target.value;
            }
            setRequirements([...tempList]);
        }else if(adding === 'check'){
            tempList = checkList;
            if (checkList.length > 0){
                tempList[checkList.length-1] = e.target.value;
            }else{
                tempList[checkList.length] = e.target.value;
            }
            setCheckList([...tempList]);
        }else if(adding === 'fee'){
            tempList = fees;
            if (fees.length > 0){
                tempList[fees.length-1] = e.target.value;
            }else{
                tempList[fees.length] = e.target.value;
            }
            setFees([...tempList]);
        }else if(adding === 'covid'){
            tempList = covidList;
            if (covidList.length > 0){
                tempList[covidList.length-1] = e.target.value;
            }else{
                tempList[covidList.length] = e.target.value;
            }
            setCovidList([...tempList]);
        }else if(adding === 'children'){
            tempList = childrenList;
            if (childrenList.length > 0){
                tempList[childrenList.length-1] = e.target.value;
            }else{
                tempList[childrenList.length] = e.target.value;
            }
            setChildrenList([...tempList]);
        }else if(adding === 'other'){
            tempList = otherList;
            if (otherList.length > 0){
                tempList[otherList.length-1] = e.target.value;
            }else{
                tempList[otherList.length] = e.target.value;
            }
            setOtherList([...tempList]);
        }else if(adding === 'parking'){
            tempList = parkingList;
            if (parkingList.length > 0){
                tempList[parkingList.length-1] = e.target.value;
            }else{
                tempList[parkingList.length] = e.target.value;
            }
            setParkingList([...tempList]);
        }else if(adding === 'feature'){
            tempList = features;
            if (features.length > 0){
                tempList[features.length-1] = e.target.value;
            }else{
                tempList[features.length] = e.target.value;
            }
            setFeatures([...tempList]);
        }
    }

    const newInput = (adding) => {
        if(adding === 'additional'){
            if(additional !== ""){
                setAdditionalList([...additionalList, ""]);
                setAdditional("");
            }else{
                document.querySelector("#additional").style.borderColor = "red";
            }
        }else if(adding === 'cuisine'){
            if(cuisine !== ""){
                setCuisineList([...cuisineList, ""]);
                setCuisine("");
            }else{
                document.querySelector("#cuisine").style.borderColor = "red";
            }
        }else if(adding === 'minors'){
            if(minors !== ""){
                setMinorsList([...minorsList, ""]);
                setMinors("");
            }else{
                document.querySelector("#minors").style.borderColor = "red";
            }
        }else if(adding === 'todo'){
            if(todo !== ""){
                setToDoList([...todoList, ""]);
                setToDo("");
            }else{
                document.querySelector("#todo").style.borderColor = "red";
            }
        }else if(adding === 'cooperate'){
            if(cooperate !== ""){
                setCoorperateList([...cooperateList, ""]);
                setCoorperate("");
            }else{
                document.querySelector("#cooperate").style.borderColor = "red";
            }
        }else if(adding === 'service'){
            if(service !== ""){
                setServiceList([...serviceList, ""]);
                setService("");
            }else{
                document.querySelector("#service").style.borderColor = "red";
            }
        }else if(adding === 'facilities'){
            if(facilities !== ""){
                setFacilitiesList([...facilitiesList, ""]);
                setFacilities("");
            }else{
                document.querySelector("#facilities").style.borderColor = "red";
            }
        }else if(adding === 'accessibility'){
            if(accessibility !== ""){
                setAccessList([...accessList, ""]);
                setAccessibility("");
            }else{
                document.querySelector("#accessibility").style.borderColor = "red";
            }
        }else if(adding === 'attraction'){
            if(attraction !== ""){
                setAttractions([...attractions, ""]);
                setAttraction("");
            }else{
                document.querySelector("#attraction").style.borderColor = "red";
            }
        }else if(adding === 'transit'){
            if(transit !== ""){
                setTransitList([...transitList, ""]);
                setTransit("");
            }else{
                document.querySelector("#transit").style.borderColor = "red";
            }
        }else if(adding === 'establishment'){
            if(establishment !== ""){
                setEstablishments([...establishments, ""]);
                setEstablishment("");
            }else{
                document.querySelector("#establishment").style.borderColor = "red";
            }
        }else if(adding === 'overview'){
            if(overview !== ""){
                setOverviewList([...overviewList, ""]);
                setOverview("");
            }else{
                document.querySelector("#overview").style.borderColor = "red";
            }
        }else if(adding === 'check'){
            if(check !== ""){
                setCheckList([...checkList, ""]);
                setCheck("");
            }else{
                document.querySelector("#check").style.borderColor = "red";
            }
        }else if(adding === 'requirement'){
            if(requirement !== ""){
                setRequirements([...requirements, ""]);
                setRequirement("");
            }else{
                document.querySelector("#requirement").style.borderColor = "red";
            }
        }else if(adding === 'fee'){
            if(fee !== ""){
                setFees([...fees, ""]);
                setFee("");
            }else{
                document.querySelector("#fee").style.borderColor = "red";
            }
        }else if(adding === 'covid'){
            if(covid !== ""){
                setCovidList([...covidList, ""]);
                setCovid("");
            }else{
                document.querySelector("#covid").style.borderColor = "red";
            }
        }else if(adding === 'children'){
            if(children !== ""){
                setChildrenList([...childrenList, ""]);
                setChildren("");
            }else{
                document.querySelector("#children").style.borderColor = "red";
            }
        }else if(adding === 'other'){
            if(other !== ""){
                setOtherList([...otherList, ""]);
                setOther("");
            }else{
                document.querySelector("#other").style.borderColor = "red";
            }
        }else if(adding === 'parking'){
            if(parking !== ""){
                setParkingList([...parkingList, ""]);
                setParking("");
            }else{
                document.querySelector("#parking").style.borderColor = "red";
            }
        }else if(adding === 'room'){
            if(roomTitle !== "" && roomCapacity !== 0 && roomSize !== 0 && beds !== ""){
                let newRoom = {roomTitle,roomCapacity,roomSize,beds,wifi,roomPhotos};
                setRoomsList([...roomsList, newRoom]);
                setRoomTitle("");
                setRoomSize(0);
                setRoomCapacity(0);
                setBeds("");
                setWifi(null);
                setRoomPhotos([]);
                document.getElementById("room-photos").value = null;
                document.getElementById("wifi-false").checked = false;
                document.getElementById("wifi-true").checked = false;
            }else{
                if(roomTitle === ""){
                    document.querySelector("#roomTitle").style.borderColor = "red";
                }if(roomCapacity === 0){
                    document.querySelector("#roomCapacity").style.borderColor = "red";
                }if(roomSize === ""){
                    document.querySelector("#roomSize").style.borderColor = "red";
                }if(beds === ""){
                    document.querySelector("#beds").style.borderColor = "red";
                }
            }
        }else if(adding === 'feature'){
            if(feature !== ""){
                setFeatures([...features, ""]);
                setFeature("");
            }else{
                document.querySelector("#feature").style.borderColor = "red";
            }
        }else if(adding === 'special'){
            if(subtopic !== "" && features.length !== 0 ){
                setSubtopics([...subtopics, subtopic]);
                setFeaturesList([...featuresList, features]);
                setSubTopic("");
                setFeature("");
                setFeatures([]);
            }else{
                if(subtopic === ""){
                    document.querySelector("#subtopic").style.borderColor = "red";
                }if(features.length === 0){
                    document.querySelector("#feature").style.borderColor = "red";
                }
            }
        }
    }

    const editChoice = (e,index,editing) => {
        if(editing === 'additional'){
            let tempAdditionalList = additionalList;
            tempAdditionalList[index] = e.target.value;
            setAdditionalList([...tempAdditionalList]);
        }else if(editing === 'cuisine'){
            let tempCuisineList = cuisineList;
            tempCuisineList[index] = e.target.value;
            setCuisineList([...tempCuisineList]);
        }else if(editing === 'minors'){
            let tempMinorsList = minorsList;
            tempMinorsList[index] = e.target.value;
            setMinorsList([...tempMinorsList]);
        }else if(editing === 'todo'){
            let tempToDoList = todoList;
            tempToDoList[index] = e.target.value;
            setToDoList([...tempToDoList]);
        }else if(editing === 'cooperate'){
            let tempCooperateList = cooperateList;
            tempCooperateList[index] = e.target.value;
            setCoorperateList([...tempCooperateList]);
        }else if(editing === 'service'){
            let tempServiceList = serviceList;
            tempServiceList[index] = e.target.value;
            setServiceList([...tempServiceList]);
        }else if(editing === 'facilities'){
            let tempFacilitiesList = facilitiesList;
            tempFacilitiesList[index] = e.target.value;
            setFacilitiesList([...tempFacilitiesList]);
        }else if(editing === 'accessibility'){
            let tempAccessList = accessList;
            tempAccessList[index] = e.target.value;
            setAccessList([...tempAccessList]);
        }else if(editing === 'attraction'){
            let tempAttractions = attractions;
            tempAttractions[index] = e.target.value;
            setAttractions([...tempAttractions]);
        }else if(editing === 'transit'){
            let tempTransits = transitList;
            tempTransits[index] = e.target.value;
            setTransitList([...tempTransits]);
        }else if(editing === 'establishment'){
            let tempEsts = establishments;
            tempEsts[index] = e.target.value;
            setEstablishments([...tempEsts]);
        }else if(editing === 'overview'){
            let tempOverview = overviewList;
            tempOverview[index] = e.target.value;
            setOverviewList([...tempOverview]);
        }else if(editing === 'check'){
            let tempCheckList = checkList;
            tempCheckList[index] = e.target.value;
            setCheckList([...tempCheckList]);
        }else if(editing === 'requirement'){
            let tempRequirements = requirements;
            tempRequirements[index] = e.target.value;
            setRequirements([...tempRequirements]);
        }else if(editing === 'fee'){
            let tempFees = fees;
            tempFees[index] = e.target.value;
            setFees([...tempFees]);
        }else if(editing === 'covid'){
            let tempCovidList = covidList;
            tempCovidList[index] = e.target.value;
            setCovidList([...tempCovidList]);
        }else if(editing === 'children'){
            let tempChildren = childrenList;
            tempChildren[index] = e.target.value;
            setChildrenList([...tempChildren]);
        }else if(editing === 'other'){
            let tempOtherList = otherList;
            tempOtherList[index] = e.target.value;
            setOtherList([...tempOtherList]);
        }else if(editing === 'parking'){
            let tempParkingList = parkingList;
            tempParkingList[index] = e.target.value;
            setParkingList([...tempParkingList]);
        }else if(editing === 'room'){
            setEditIndex(index);
            setEdit(editing);
            setRoomTitle(roomsList[index].roomTitle);
            setRoomSize(roomsList[index].roomSize);
            setRoomCapacity(roomsList[index].roomCapacity);
            setBeds(roomsList[index].beds);
            setWifi(roomsList[index].wifi);
            setRoomPhotos(roomsList[index].roomPhotos);
            if(roomsList[index].wifi){
                document.getElementById("wifi-true").checked = true;
            }else{
                document.getElementById("wifi-false").checked = true;
            }
        }else if(editing === 'feature'){
            let featureList = features;
            featureList[index] = e.target.value;
            setFeatures([...featureList]);
        }else if(editing === 'special'){
            setEditIndex(index);
            setEdit(editing);
            setSubTopic(subtopics[index]);
            setFeatures(featuresList[index]);
            setFeature(featuresList[index][featuresList[index].length-1]);
        }
    }

    const deleteChoice = (index,type) => {
        if(type === 'room'){
            setRoomsList(roomsList.filter((val,idx) => index !== idx));
            if(edit === 'room' && editIndex === index){
                setRoomTitle("");
                setRoomSize(0);
                setRoomCapacity(0);
                setBeds("");
                setWifi(null);
                setRoomPhotos([]);
                document.getElementById("room-photos").value = null;
                document.getElementById("wifi-false").checked = false;
                document.getElementById("wifi-true").checked = false;
                setEdit(null);
                setEditIndex(null);
            }
        }else if(type === 'special'){
            setSubtopics(subtopics.filter((val,idx) => index !== idx));
            setFeaturesList(featuresList.filter((val,idx) => index !== idx));
            if(edit === 'special' && editIndex === index){
                setEditIndex(null);
                setEdit(null);
                setSubTopic("");
                setFeatures([]);
                setFeature("");
            }
        }else if(type === 'additional'){
            setAdditionalList(additionalList.filter((val,idx) => index !== idx));
        }else if(type === 'cuisine'){
            setCuisineList(cuisineList.filter((val,idx) => index !== idx));
        }else if(type === 'minors'){
            setMinorsList(minorsList.filter((val,idx) => index !== idx));
        }else if(type === 'todo'){
            setToDoList(todoList.filter((val,idx) => index !== idx));
        }else if(type === 'cooperate'){
            setCoorperateList(cooperateList.filter((val,idx) => index !== idx));
        }else if(type === 'service'){
            setServiceList(serviceList.filter((val,idx) => index !== idx));
        }else if(type === 'facilities'){
            setFacilitiesList(facilitiesList.filter((val,idx) => index !== idx));
        }else if(type === 'accessibility'){
            setAccessList(accessList.filter((val,idx) => index !== idx));
        }else if(type === 'attraction'){
            setAttractions(attractions.filter((val,idx) => index !== idx));
        }else if(type === 'transit'){
            setTransitList(transitList.filter((val,idx) => index !== idx));
        }else if(type === 'establishment'){
            setEstablishments(establishments.filter((val,idx) => index !== idx));
        }else if(type === 'overview'){
            setOverviewList(overviewList.filter((val,idx) => index !== idx));
        }else if(type === 'requirement'){
            setRequirements(requirements.filter((val,idx) => index !== idx));
        }else if(type === 'check'){
            setCheckList(checkList.filter((val,idx) => index !== idx));
        }else if(type === 'fee'){
            setFees(fees.filter((val,idx) => index !== idx));
        }else if(type === 'covid'){
            setCovidList(covidList.filter((val,idx) => index !== idx));
        }else if(type === 'children'){
            setChildrenList(childrenList.filter((val,idx) => index !== idx));
        }else if(type === 'other'){
            setOtherList(otherList.filter((val,idx) => index !== idx));
        }else if(type === 'parking'){
            setParkingList(parkingList.filter((val,idx) => index !== idx));
        }else if(type === 'feature'){
            setFeatures(features.filter((val,idx) => index !== idx));
        }

    }

    const cancel = (typeOf) => {
        if(typeOf === 'room'){
            setRoomTitle("");
            setRoomSize(0);
            setRoomCapacity(0);
            setBeds("");
            setWifi(null);
            setRoomPhotos([]);
            document.getElementById("room-photos").value = null;
            document.getElementById("wifi-false").checked = false;
            document.getElementById("wifi-true").checked = false;
            setEdit(null);
            setEditIndex(null);
        }else if(typeOf === 'special'){
            setEditIndex(null);
            setEdit(null);
            setSubTopic("");
            setFeature("");
            setFeatures([]);
        }
    }

    const reAdd = (type) =>{
        if(type === 'room'){
            let tempRooms = roomsList;
            let addRoom = {roomTitle,roomCapacity,roomSize,beds,wifi,roomPhotos};
            tempRooms[editIndex] = addRoom;
            setRoomsList(tempRooms);
            setRoomTitle("");
            setRoomSize(0);
            setRoomCapacity(0);
            setBeds("");
            setWifi(null);
            setRoomPhotos([]);
            document.getElementById("room-photos").value = null;
            document.getElementById("wifi-false").checked = false;
            document.getElementById("wifi-true").checked = false;
            setEdit(null);
            setEditIndex(null);
        }else if(type === 'special'){
            let tempSubTopics = subtopics;
            let tempFeaturesList = featuresList;
            tempSubTopics[editIndex] = subtopic;
            tempFeaturesList[editIndex] = features;
            setEditIndex(null);
            setEdit(null);
            setSubTopic("");
            setFeatures([]);
            setFeature("");
        }
    }

    const moveUp = (type) => {
        switch(type){
            case "property":
                if(selected > 0){
                    let templist = photos;
                    let x = photos[selected];
                    let y = photos[selected - 1];
                    templist[selected - 1] = x;
                    templist[selected] = y;
                    setPhotos([...templist]);
                    setSelected(selected - 1);
                }
                break;
            case "room":
                if(rselected > 0){
                    let templist = roomPhotos;
                    let x = roomPhotos[rselected];
                    let y = roomPhotos[rselected - 1];
                    templist[rselected - 1] = x;
                    templist[rselected] = y;
                    setRoomPhotos([...templist]);
                    setRSelected(rselected - 1);
                }
                break;
            default:
                break;
        }
    }

    const moveDown = (type) => {
        switch(type){
            case "property":
                if(selected < (photos.length - 1)){
                    let templist = photos;
                    let x = photos[selected];
                    let y = photos[selected + 1];
                    templist[selected + 1] = x;
                    templist[selected] = y;
                    setPhotos([...templist]);
                    setSelected(selected + 1);
                }
                break;
            case "room":
                if(rselected < (roomPhotos.length - 1)){
                    let templist = roomPhotos;
                    let x = roomPhotos[rselected];
                    let y = roomPhotos[rselected + 1];
                    templist[rselected + 1] = x;
                    templist[rselected] = y;
                    setRoomPhotos([...templist]);
                    setRSelected(rselected + 1);
                }
                break;
            default:
                break;
        }
    }

    /* Prevent scrolling for number input types*/
    $('form').on('focus', 'input[type=number]', function (e) {
        $(this).on('wheel.disableScroll', function (e) {
            e.preventDefault()
        })
    });
    $('form').on('blur', 'input[type=number]', function (e) {
        $(this).off('wheel.disableScroll')
    });

    return(
        <div className="hero">
            <div className="hero-container">
                <div className="box">
                    <div className="add-title has-text-centered">
                        <h1>Add Accomadation to W@H GW@@N</h1>
                    </div>
                    <button className="button" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i> </button>
                    <br />
                    <form>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label"> Photos <small className="has-text-danger">*</small> </label>
                                
                            </div>
                            <div className="field-body">
                                <div className="file has-name is-boxed">
                                    <label className="file-label">
                                        <input 
                                        className="file-input"
                                            id="photos"
                                            name="photos"
                                            type="file"
                                            multiple
                                            onChange={e => handlePhotos(e,'property')}
                                        />
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose file(s)…
                                        </span>
                                        </span>
                                        <span className="file-name">
                                            {photos.length} picture(s) selected
                                        </span>
                                    </label>
                                </div>
                                <button type="button" onClick={e => {setPhotos([]);document.getElementById("photos").value = "";}} className=" give-space button is-warning"><i className="fas fa-trash"></i> Clear Photos</button>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                <div className="columns is-multiline">
                                    {photos.map((photo,index) => 
                                        <div className="column" key={index}>
                                            <span> {index + 1} </span>
                                            <br />
                                            <img onClick={e => picked(index,'property')} style={selected === index ? {border:"solid 3px blue"}:{border:"none"}} alt={`${index} of Event Uploads`} className="is-256x256" src={URL.createObjectURL(photo)} />
                                            {selected === index &&
                                                <div className="controls">
                                                    <button onClick={e => moveUp('property')} type="button" className="mx-1 button is-info"><i className="fas fa-arrow-up"></i></button>
                                                    <button onClick={e => moveDown('property')} type="button" className="mx-1 button is-info"><i className="fas fa-arrow-down"></i></button>
                                                </div>
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label"> Property Name <small className="has-text-danger">*</small></label>
                            </div>
                            <div className="field-body">
                                <input 
                                    className="input"
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={e => {setTitle(e.target.value); setResponseMsg("");}}
                                />
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Accomadation Type <small className="has-text-danger">*</small></label>
                            </div>
                            <div className="field-body">
                                <div className="select">
                                    <select
                                        id="typeOf"
                                        name="typeOf"
                                        value={typeOf}
                                        onChange={e => setTypeOf(e.target.value)}>
                                            <optgroup>
                                                <option value="">Choose...</option>
                                                {standardTypes.map((val,index) => 
                                                    <option key={index} value={val}>{val}</option>
                                                )}
                                            </optgroup>
                                            <optgroup label="--- ---">
                                                {otherTypes.map((val,index) => 
                                                    <option key={index} value={val}>{val}</option>
                                                )}
                                            </optgroup>
                                        </select>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Address <small className="has-text-danger">*</small></label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="text"
                                            name="address"
                                            value={address}
                                            onChange={e => {setAddress(e.target.value);setResponseMsg("");}}
                                            placeholder="Enter location"
                                            />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-globe"></i>
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label"> Standard Amenities </label>
                            </div>
                            <div className="field-body">
                                <div className="field is-narrow">
                                    <div className="control">
                                        {amenitiesList.map((val,index) => 
                                            <label key={index} className="checkbox">
                                                <input type="checkbox" name="amenities-checkbox" onChange={e => handleCheckboxChange(e,"amenities")} value={val} />
                                                {val}
                                            </label>
                                        )}
                                    </div>        
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Additional Amenities</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div>
                                        {additionalList.map((val,index) =>
                                            {if(index !== (additionalList.length-1)){ 
                                                return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'additional')} className="fas fa-trash"></i><input key={index} id={`additional${index}`} name={`additional${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'additional')}/></span>)
                                            }}
                                        )}
                                    </div>
                                    <p className="control my-1">
                                        <input 
                                            className="input"
                                            id="additional"
                                            type="text"
                                            name="additional"
                                            value={additional}
                                            onChange={e => {setAdditional(e.target.value);addChoice(e,'additional');setResponseMsg(""); document.querySelector("#additional").style.borderColor = "lightgray";}}
                                        />
                                    </p>
                                    <button type="button" onClick={e => {newInput('additional')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="p-1" style={{border:"solid 1px black"}}>
                            <div className="has-text-centered">
                                <b>Hospitality</b>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Food and Drink</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {cuisineList.map((val,index) =>
                                                {if(index !== (cuisineList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'cuisine')} className="fas fa-trash"></i><input key={index} id={`cuisine${index}`} name={`cuisine${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'cuisine')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="cuisine"
                                                type="text"
                                                name="cuisine"
                                                value={cuisine}
                                                onChange={e => {setCuisine(e.target.value);addChoice(e,'cuisine');setResponseMsg(""); document.querySelector("#cuisine").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('cuisine')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Children Policy</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {minorsList.map((val,index) =>
                                                {if(index !== (minorsList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'minors')} className="fas fa-trash"></i><input key={index} id={`minors${index}`} name={`minors${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'minors')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="minors"
                                                type="text"
                                                name="minors"
                                                value={minors}
                                                onChange={e => {setMinors(e.target.value);addChoice(e,'minors');setResponseMsg(""); document.querySelector("#minors").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('minors')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Activities</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {todoList.map((val,index) =>
                                                {if(index !== (todoList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'todo')} className="fas fa-trash"></i><input key={index} id={`todo${index}`} name={`todo${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'todo')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="todo"
                                                type="text"
                                                name="todo"
                                                value={todo}
                                                onChange={e => {setToDo(e.target.value);addChoice(e,'todo');setResponseMsg(""); document.querySelector("#todo").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('todo')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Cooperate Commodities</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {cooperateList.map((val,index) =>
                                                {if(index !== (cooperateList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'cooperate')} className="fas fa-trash"></i><input key={index} id={`cooperate${index}`} name={`cooperate${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'cooperate')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="cooperate"
                                                type="text"
                                                name="cooperate"
                                                value={cooperate}
                                                onChange={e => {setCoorperate(e.target.value);addChoice(e,'cooperate');setResponseMsg(""); document.querySelector("#cooperate").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('cooperate')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Services</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {serviceList.map((val,index) =>
                                                {if(index !== (serviceList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'service')} className="fas fa-trash"></i><input key={index} id={`service${index}`} name={`service${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'service')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="service"
                                                type="text"
                                                name="service"
                                                value={service}
                                                onChange={e => {setService(e.target.value);addChoice(e,'service');setResponseMsg(""); document.querySelector("#service").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('service')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Facilities</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {facilitiesList.map((val,index) =>
                                                {if(index !== (facilitiesList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'facilities')} className="fas fa-trash"></i><input key={index} id={`facilities${index}`} name={`facilities${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'facilities')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="facilities"
                                                type="text"
                                                name="facilities"
                                                value={facilities}
                                                onChange={e => {setFacilities(e.target.value);addChoice(e,'facilities');setResponseMsg(""); document.querySelector("#facilities").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('facilities')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Accessibility</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {accessList.map((val,index) =>
                                                {if(index !== (accessList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'accessibility')} className="fas fa-trash"></i><input key={index} id={`accessibility${index}`} name={`accessibility${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'accessibility')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="accessibility"
                                                type="text"
                                                name="accessibility"
                                                value={accessibility}
                                                onChange={e => {setAccessibility(e.target.value);addChoice(e,'accessibility');setResponseMsg(""); document.querySelector("#accessibility").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('accessibility')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 p-1" style={{border:"solid 1px black"}}>
                            <div className="has-text-centered">
                                <b>Rooms</b>
                            </div>
                            {roomsList.map((room, index) => {
                                return(
                                    <div key={index} className="field is-horizontal">
                                        <div className="field-label is-normal"></div>
                                        <div className="field-body">
                                            <div className="card" style={ (edit === 'room' && editIndex === index) ? {width:"20rem",backgroundColor:"orange"}:{width:"20rem"} }>
                                                <header onClick={e => {show !== index ? setShow(index) : setShow(null); e.preventDefault();}} className="card-header">
                                                    <p className="card-header-title">
                                                        {room.roomTitle}
                                                    </p>
                                                    <button className="card-header-icon" aria-label="more options">
                                                        <span className="icon">
                                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                        </span>
                                                    </button>
                                                </header>
                                                {(show === index) &&
                                                    <div className="card">
                                                        <div className="card-image">
                                                            <div className="slick-wrapper">
                                                                <Slider {...settings}>
                                                                {room.roomPhotos.map((slide,idx) => 
                                                                    <div key={idx}>
                                                                        <img className="slick-slide-image customSlide" 
                                                                            alt={idx} src={URL.createObjectURL(slide)}>
                                                                        </img>
                                                                    </div>
                                                                )}
                                                                </Slider>
                                                            </div>
                                                        </div>
                                                        <div className="card-content p-1">
                                                              <small><i className="fas fa-compass-drafting"></i> {room.roomSize + " sq m"}</small>
                                                              <br/>
                                                              <small><i className="fas fa-users"></i> {"Holds " + room.roomCapacity}</small>
                                                              <br/>
                                                              <small><i className="fas fa-bed"></i> {room.beds}</small>
                                                              <br/>
                                                              {room.wifi && <small><i className="fas fa-wifi"></i> Free WiFi</small>}
                                                      </div>    
                                                  </div>
                                                }
                                            </div>
                                            <div className="mx-1">
                                                <span className="mx-1" style={{cursor:"pointer", fontSize:"1.5rem"}} onClick={e => editChoice(e, index,'room')}><i className="fas fa-edit"></i></span>{" "}
                                                <span className="mx-1" style={{cursor:"pointer", fontSize:"1.5rem"}} onClick={e => deleteChoice(index,'room')}><i className="fas fa-trash"></i></span>{" "}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label"> Room Title <small className="has-text-danger">*</small></label>
                                </div>
                                <div className="field-body">
                                    <input 
                                        className="input"
                                        type="text"
                                        id="roomTitle"
                                        name="roomTitle"
                                        value={roomTitle}
                                        onChange={e => {setRoomTitle(e.target.value); setResponseMsg("");document.querySelector("#roomTitle").style.borderColor = "lightgray";}}
                                    />
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label"> Room Size (Sq m) <small className="has-text-danger">*</small></label>
                                </div>
                                <div className="field-body">
                                    <input 
                                        className="input"
                                        type="number"
                                        id="roomSize"
                                        name="roomSize"
                                        value={roomSize}
                                        onChange={e => {setRoomSize(e.target.value); setResponseMsg("");document.querySelector("#roomSize").style.borderColor = "lightgray";}}
                                    />
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label"> Room Capacity <small className="has-text-danger">*</small></label>
                                </div>
                                <div className="field-body">
                                    <input 
                                        className="input"
                                        type="number"
                                        id="roomCapacity"
                                        name="roomCapacity"
                                        value={roomCapacity}
                                        onChange={e => {setRoomCapacity(e.target.value); setResponseMsg("");document.querySelector("#roomCapacity").style.borderColor = "lightgray";}}
                                    />
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label"> Beds <small className="has-text-danger">*</small></label>
                                </div>
                                <div className="field-body">
                                    <input 
                                        className="input"
                                        type="text"
                                        id="beds"
                                        name="beds"
                                        placeholder="1 Queen Size Bed"
                                        value={beds}
                                        onChange={e => {setBeds(e.target.value); setResponseMsg("");document.querySelector("#beds").style.borderColor = "lightgray";}}
                                    />
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> Free WiFi </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <label className="radio">
                                                <input type="radio" id="wifi-true" name="wifi-checkbox" onChange={e => setWifi(e.target.value)} value={true} />
                                                Yes
                                            </label>
                                            <label className="radio">
                                                <input type="radio" id="wifi-false" name="wifi-checkbox" onChange={e => setWifi(e.target.value)} value={false} />
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label"> Room Photos </label>
                                </div>
                                <div className="field-body">
                                    <div className="file has-name is-boxed">
                                        <label className="file-label">
                                            <input 
                                            className="file-input"
                                                id="room-photos"
                                                name="room-photos"
                                                type="file"
                                                multiple
                                                onChange={e => handlePhotos(e, "room")}
                                            />
                                            <span className="file-cta">
                                            <span className="file-icon">
                                                <i className="fas fa-upload"></i>
                                            </span>
                                            <span className="file-label">
                                                Choose file(s)…
                                            </span>
                                            </span>
                                            <span className="file-name">
                                                {roomPhotos.length} picture(s) selected
                                            </span>
                                        </label>
                                    </div>
                                    <button type="button" onClick={e => {setRoomPhotos([]);document.getElementById("room-photos").value = "";}} className=" give-space button is-warning"><i className="fas fa-trash"></i> Clear Photos</button>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal"></div>
                                <div className="field-body">
                                    <div className="columns is-multiline">
                                        {roomPhotos.map((photo,index) => 
                                            <div className="column" key={index}>
                                                <span> {index + 1} </span>
                                                <br />
                                                <img onClick={e => picked(index,'room')} style={rselected === index ? {border:"solid 3px blue"}:{border:"none"}} alt={`${index} of Event Uploads`} className="is-256x256" src={URL.createObjectURL(photo)} />
                                                {rselected === index &&
                                                    <div className="controls">
                                                        <button onClick={e => moveUp('room')} type="button" className="mx-1 button is-info"><i className="fas fa-arrow-up"></i></button>
                                                        <button onClick={e => moveDown('room')} type="button" className="mx-1 button is-info"><i className="fas fa-arrow-down"></i></button>
                                                    </div>
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="has-text-centered m-3">
                                {edit === 'room' ?
                                    <div>
                                        <button type="button" onClick={e => {reAdd('room')}} className="button is-info mx-1"><i className="fas fa-floppy-disk"></i> Re-Add Room</button>
                                        <button type="button" onClick={e => {cancel('room')}} className="button is-info mx-1"><i className="fas fa-circle-xmark"></i> Cancel Edit</button>
                                    </div>
                                    :
                                    <button type="button" onClick={e => {newInput('room')}} className="button is-info"><i className="fas fa-plus"></i> Add Room</button>
                                }
                            </div>
                        </div>
                        <div className="my-3 p-1" style={{border:"solid 1px black"}}>
                            <div className="has-text-centered">
                                <b>About this area</b>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Nearby Attractions</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {attractions.map((val,index) =>
                                                {if(index !== (attractions.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'attractions')} className="fas fa-trash"></i><input key={index} id={`attraction${index}`} name={`attraction${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'attraction')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="attraction"
                                                type="text"
                                                name="attraction"
                                                placeholder="Las Vegas Convention Center - 26 min walk"
                                                value={attraction}
                                                onChange={e => {setAttraction(e.target.value);addChoice(e,'attraction');setResponseMsg(""); document.querySelector("#attraction").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('attraction')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Transit Options</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {transitList.map((val,index) =>
                                                {if(index !== (transitList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'transit')} className="fas fa-trash"></i><input key={index} id={`transit${index}`} name={`transit${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'transit')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="transit"
                                                type="text"
                                                placeholder="SAHARA Las Vegas Monorail Station - 11 min walk"
                                                name="transit"
                                                value={transit}
                                                onChange={e => {setTransit(e.target.value);addChoice(e,'transit');setResponseMsg(""); document.querySelector("#transit").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('transit')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Nearby Restaurants & Bars</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {establishments.map((val,index) =>
                                                {if(index !== (establishments.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'establishment')} className="fas fa-trash"></i><input key={index} id={`establishment${index}`} name={`establishment${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'establishment')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="establishment"
                                                type="text"
                                                placeholder="Radius Rooftop Pool & Wet Lounge - 11 min walk"
                                                name="establishment"
                                                value={establishment}
                                                onChange={e => {setEstablishment(e.target.value);addChoice(e,'establishment');setResponseMsg(""); document.querySelector("#establishment").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('establishment')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 p-1" style={{border:"solid 1px black"}}>
                            <div className="has-text-centered">
                                <b>About the Property</b>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label"> Description </label>
                                </div>
                                <div className="field-body">
                                    <textarea
                                        className="textarea"
                                        type="text"
                                        rows="8"
                                        style={{ resize: "none" }}
                                        name="description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> Languages </label>
                                </div>
                                <div className="field-body">
                                    <div className="field is-narrow">
                                        <div className="control">
                                            {languageList.map((val,index) => 
                                                <label key={index} className="checkbox">
                                                    <input type="checkbox" name="language-checkbox" onChange={e => handleCheckboxChange(e, "languages")} value={val} />
                                                    {val}
                                                </label>
                                            )}
                                        </div>        
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> Property Overview (Size, Rooms, Units) </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {overviewList.map((val,index) =>
                                                {if(index !== (overviewList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'overview')} className="fas fa-trash"></i><input key={index} id={`overview${index}`} name={`overview${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'overview')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="overview"
                                                type="text"
                                                placeholder="2427 units"
                                                name="overview"
                                                value={overview}
                                                onChange={e => {setOverview(e.target.value);addChoice(e,'overview');setResponseMsg(""); document.querySelector("#overview").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('overview')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 p-1" style={{border:"solid 1px black"}}>
                            <div className="has-text-centered">
                                <b>Policies</b>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> Check-in/Check-out </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {checkList.map((val,index) =>
                                                {if(index !== (checkList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'check')} className="fas fa-trash"></i><input key={index} id={`check${index}`} name={`check${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'check')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="check"
                                                type="text"
                                                placeholder="Check-in time from 3:00 PM - 3:00 AM"
                                                name="check"
                                                value={check}
                                                onChange={e => {setCheck(e.target.value);addChoice(e,'check');setResponseMsg(""); document.querySelector("#check").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('check')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> Requirements </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {requirements.map((val,index) =>
                                                {if(index !== (requirements.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'requirement')} className="fas fa-trash"></i><input key={index} id={`requirement${index}`} name={`requirement${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'requirement')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="requirement"
                                                type="text"
                                                placeholder="Credit card required for incidental charges"
                                                name="requirement"
                                                value={requirement}
                                                onChange={e => {setRequirement(e.target.value);addChoice(e,'requirement');setResponseMsg(""); document.querySelector("#requirement").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('requirement')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> Fees </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {fees.map((val,index) =>
                                                {if(index !== (fees.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'fee')} className="fas fa-trash"></i><input key={index} id={`fee${index}`} name={`fee${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'fee')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="fee"
                                                type="text"
                                                placeholder="Resort Fee"
                                                name="fee"
                                                value={fee}
                                                onChange={e => {setFee(e.target.value);addChoice(e,'fee');setResponseMsg(""); document.querySelector("#fee").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('fee')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> Covid-19 </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {covidList.map((val,index) =>
                                                {if(index !== (covidList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'covid')} className="fas fa-trash"></i><input key={index} id={`covid${index}`} name={`covid${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'covid')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="covid"
                                                type="text"
                                                placeholder="Mask available"
                                                name="covid"
                                                value={covid}
                                                onChange={e => {setCovid(e.target.value);addChoice(e,'covid');setResponseMsg(""); document.querySelector("#covid").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('covid')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> Pets </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <label className="radio">
                                                <input type="radio" id="pets-true" name="pets-checkbox" onChange={e => setPets(e.target.value)} value={true} />
                                                Allowed
                                            </label>
                                            <label className="radio">
                                                <input type="radio" id="pets-false" name="pets-checkbox" onChange={e => setPets(e.target.value)} value={false} />
                                                Not-Allowed
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> Children </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {childrenList.map((val,index) =>
                                                {if(index !== (childrenList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'children')} className="fas fa-trash"></i><input key={index} id={`overview${index}`} name={`children${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'children')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="children"
                                                type="text"
                                                placeholder="No cribs available"
                                                name="children"
                                                value={children}
                                                onChange={e => {setChildren(e.target.value);addChoice(e,'children');setResponseMsg(""); document.querySelector("#children").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('children')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> Parking </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {parkingList.map((val,index) =>
                                                {if(index !== (parkingList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'parking')} className="fas fa-trash"></i><input key={index} id={`parking${index}`} name={`parking${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'parking')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="parking"
                                                type="text"
                                                placeholder="$10 parking available"
                                                name="parking"
                                                value={parking}
                                                onChange={e => {setParking(e.target.value);addChoice(e,'parking');setResponseMsg(""); document.querySelector("#parking").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('parking')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> Other Information </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div>
                                            {otherList.map((val,index) =>
                                                {if(index !== (otherList.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'other')} className="fas fa-trash"></i><input key={index} id={`other${index}`} name={`other${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'other')}/></span>)
                                                }}
                                            )}
                                        </div>
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="other"
                                                type="text"
                                                placeholder="Smoking allowed"
                                                name="other"
                                                value={other}
                                                onChange={e => {setOther(e.target.value);addChoice(e,'other');setResponseMsg(""); document.querySelector("#other").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('other')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 p-1" style={{border:"solid 1px black"}}>
                            <div className="has-text-centered">
                                <b>Special Features</b>
                            </div>
                            {subtopics.map((subtopic, index) => {
                                return(
                                    <div key={index} className="field is-horizontal">
                                        <div className="field-label is-normal"></div>
                                        <div className="field-body">
                                            <div className="mx-1">
                                                <span className="mx-1" style={{cursor:"pointer", fontSize:"1.5rem"}} onClick={e => editChoice(e, index,'special')}><i className="fas fa-edit"></i></span>{" "}
                                                <span className="mx-1" style={{cursor:"pointer", fontSize:"1.5rem"}} onClick={e => deleteChoice(index,'special')}><i className="fas fa-trash"></i></span>{" "}
                                            </div>
                                            <div style={ (edit === 'special' && editIndex === index) ? {backgroundColor:"orange"}:{backgroundColor:"white"} }>
                                                <b>{subtopic}</b>
                                                <ul className="px-3">
                                                    {featuresList[index].map((feature,idx) => 
                                                        <li key={idx}>{feature}</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                );
                            })}
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> Subtopic </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="subtopic"
                                                type="text"
                                                placeholder="Dining"
                                                name="subtopic"
                                                value={subtopic}
                                                onChange={e => {setSubTopic(e.target.value);addChoice(e,'subtopic');setResponseMsg(""); document.querySelector("#subtopic").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <div>
                                            {features.length > 0 && <b>{subtopic !== "" ? <span>Features of {subtopic}:</span> : <small className="has-text-danger">Enter Subtopic </small>}</b>}
                                            {features.map((val,index) =>
                                                {if(index !== (features.length-1)){ 
                                                    return (<span className="field has-addons"><i style={{cursor:"pointer"}} onClick={e => deleteChoice(index,'feature')} className="fas fa-trash"></i><input key={index} id={`feature${index}`} name={`feature${index}`} className="input mx-1" value={val} onChange={e => editChoice(e,index,'feature')}/></span>)
                                                }}
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label"> 
                                        Feature(s)
                                    </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <p className="control my-1">
                                            <input 
                                                className="input"
                                                id="feature"
                                                type="text"
                                                placeholder="New Restaurant & Bar"
                                                name="feature"
                                                value={feature}
                                                onChange={e => {setFeature(e.target.value);addChoice(e,'feature');setResponseMsg(""); document.querySelector("#feature").style.borderColor = "lightgray";}}
                                            />
                                        </p>
                                        <button type="button" onClick={e => {newInput('feature')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="has-text-centered m-3">
                                {edit === 'special' ?
                                    <div>
                                        <button type="button" onClick={e => {reAdd('special')}} className="button is-info mx-1"><i className="fas fa-floppy-disk"></i> Re-Add Room</button>
                                        <button type="button" onClick={e => {cancel('special')}} className="button is-info mx-1"><i className="fas fa-circle-xmark"></i> Cancel Edit</button>
                                    </div>
                                    :
                                    <button type="button" onClick={e => {newInput('special')}} className="button is-info"><i className="fas fa-plus"></i> Add New Subtopic</button>
                                }
                            </div>
                        </div>
                        
                        
                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                <span>{responseMsg}</span>
                                {viewUpload !== "" &&
                                    <p className="mx-3">
                                        <button className="button is-link" onClick={() => navigate(viewUpload)}>View Upload</button>
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="field is-clearfix">
                        
                            <button type="button" onClick={e => clearFunc()} className="button is-warning is-pulled-right give-space">
                                Cancel
                            </button>
                            
                            <button onClick={e => saveProp(e)} className="button is-primary is-pulled-right give-space" type="submit">
                                Submit
                            </button>
                           
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )

}
export default withContext(AddAccomadate);