//stylesheets
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-image-lightbox/style.css';
import 'react-tabs/style/react-tabs.css';

//Helpers
import React, { Component } from "react";
import { Routes, Route, Navigate, BrowserRouter as Router} from "react-router-dom";
import axios from "axios";
import Context from "./Context";
import jwt_decode from 'jwt-decode';
import CryptoJS from 'crypto-js';

//Components
import Profile from "./components/Profile";
import Timeline from "./components/Timeline";
import Notifications from "./components/Notifications";
import Quotes from "./components/Quotes";
import Audios from './components/Audios';
import Messages from './components/Messages';
import Images from './components/Images';
import Videos from './components/Videos';
import Settings from './components/Settings';
import Homepage from './components/Homepage';

//import Follower from './components/Follower';
//import Following from './components/Following';
//import Login from './components/Login';
//import Signup from './components/Signup';

import Search from './components/Search';
import Test from './components/Test';
import Wallet from './components/Wallet';
import Activities from './components/Activities';
import Shops from './components/Shops';
import WGR from './components/WGR';
import ViewUserProfile from './components/ViewUserProfile';
import ViewUserList from './components/ViewUserList';
import PropFinder from './components/Shops/PropFinder';
import Social from './components/Social';
import ViewPree from './components/Timeline/ViewPree';
import ViewListing from './components/Shops/PropFinder/ViewListing';
import ViewVehicle from './components/Shops/WOV/ViewVehicle';
import ViewProduct from './components/Shops/Products/ViewProduct';
import ViewItem from './components/Shops/BickleCourt/ViewItem';
import ViewService from './components/Shops/Services/ViewService';
import Groups from './components/Groups';
import ViewGroup from './components/Groups/ViewGroup';
import Preepedia from './components/Search/Preepedia';
import ViewPage from './components/Search/Preepedia/ViewPage';
import ViewMediaItem from './components/Audios/ViewMediaItem';
import ViewTrend from './components/Images/ViewTrend';
//import ItemView from './components/Shops/BickleCourt/ItemImageView';

import $ from 'jquery';
import Specials from './components/Specials';
import Talkie from './components/Talkie';
import Live from './components/Live';
import Layout from './components/Layout';
//import Trendy from './components/Images/Trendy';
import AddService from './components/Shops/Services/AddService';
import AddVehicle from './components/Shops/WOV/AddVehicle';
import HostEvent from './components/Activities/Events/HostEvent';
import AddClassified from './components/Activities/Jobs/Classifieds/AddClassified';
import AddVolunteer from './components/Activities/Jobs/Volunteer/AddVolunteer';
import ViewEvent from './components/Activities/Events/ViewEvent';
import ViewClassified from './components/Activities/Jobs/Classifieds/ViewClassified';
import ViewVolunteer from './components/Activities/Jobs/Volunteer/ViewVolunteer';

const sign = require('jwt-encode');
const secret = 'some$3cretKey';
const algorithm = 'HS256';
const data = {
  token : 'Required'
};


export default class App extends Component {
  constructor(props){
    super(props);
    let user = localStorage.getItem("user-context");
    user = user ? JSON.parse(user) : null;
    
    this.state = {
      user: user,
      prees: [],
      menuChoice: "",
      jwt : sign(data, secret, algorithm), // creation of the JSON Web Token which is placed in the API request headers.
    };
    /// Create Router reference 
    this.routerRef = React.createRef();
  }

  async componentDidMount(){
    //this.setState({ready:true}); 

    await axios.get('/api/time',{
      headers: {
        'Authorization' : this.state.jwt
      }
    });

    let user = localStorage.getItem("user-context");
    let ready = localStorage.getItem("ready");
    let welcome = localStorage.getItem("welcome");
    let userlist = localStorage.getItem("userlist");
    let recent = localStorage.getItem("recent");
    let menuChoice = JSON.parse(localStorage.getItem("choice"));
    user = user ? JSON.parse(user) : null;
    ready = ready ? JSON.parse(ready) : null;
    welcome = welcome ? JSON.parse(welcome) : null;
    let val = window.screen.width;
    let boxWidth;
    if (val < 500){
       boxWidth = "80%";
    }else{
        boxWidth = "60%";
    }

    //if User is logged in
    recent = recent ? parseInt(recent) : 0;
    userlist = userlist ? JSON.parse(userlist) : [];
    const user_id = user ? user.id : 0;
    const prees = user ? await axios.post("/api/see-the-pree",{user_id}) : {"data":null}; //add reactions to the prees from the backend before response to request.
    const messages = user ? await this.getMessages(user_id) : null; // review if data too large later offset maybe needed
    //console.log(prees);
    this.setState({user, ready, welcome, prees:prees.data, userlist, menuChoice, recent, messages, boxWidth:boxWidth}); //, 
  }

  /*setMenuChoice = (choice) => {
      this.setState({menuChoice:choice});
  }*/

  getTargetPhotos = (theElement, contextType) => {
    const targetPhotos = [];
    switch(contextType){
      case 'listing':
        /*const { listings } = this.state;
        const listing = listings ? listings.find(listing => listing.listing_id.toString() === theID.toString()) : null;
        */
       const listing = theElement;
        for (var x=0; x<parseInt(listing.numOfPics); x++){
          let url = process.env.PUBLIC_URL + "/images/listings/listing" + listing.listing_id + "/" + x;
          targetPhotos.push(url);
        }
        break;
      case 'vehicle':
        /*const { vehicles } = this.state;
        const vehicle = vehicles ? vehicles.find(vehicle => vehicle.vehicle_id.toString() === theID.toString()) : null;
        */
       const vehicle = theElement;
        for (var y=0; y<parseInt(vehicle.numOfPics); y++){
          let url = process.env.PUBLIC_URL + "/images/vehicles/vehicle" + vehicle.vehicle_id + "/" + y;
          targetPhotos.push(url);
        }
        break;
      case 'product':
          //const { products } = this.state;
          //const product = products ? products.find(product => product.product_id.toString() === theID.toString()) : null;
          const product = theElement;
          for (var z=0; z<parseInt(product.numOfPics); z++){
            let url = process.env.PUBLIC_URL + "/images/products/product" + product.product_id + "/" + z;
            targetPhotos.push(url);
          }
          break;
      case 'service':
        /*const { services } = this.state;
        const service = services ? services.find(service => service.service_id.toString() === theID.toString()) : null;*/
        const service = theElement;
        for (var i=0; i<parseInt(service.numOfPics); i++){
          let url = process.env.PUBLIC_URL + "/images/services/service" + service.service_id + "/" + i;
          targetPhotos.push(url);
        }
        break;
      case 'item':
        /*const { items } = this.state;
        const item = items ? items.find(item => item.item_id.toString() === theID.toString()) : null;*/
        const item = theElement;
        for (var j=0; j<parseInt(item.numOfPics); j++){
          let url = process.env.PUBLIC_URL + "/images/items/item" + item.item_id + "/" + j;
          targetPhotos.push(url);
        }
        break;
      default:
        break;
    }
    return targetPhotos;
  }

  getListing = async (listingID) => {
    const { listings } = this.state;
    const listing = listings ? listings.find(listing => listing.listing_id.toString() === listingID.toString()) : null;
    let result;
    if (listing === undefined || listing === null){
      const listing_id = listingID;
      const val = await axios.post("/api/get-listing",{listing_id}).catch(error => {console.log(error)});
      if (val.status === 200){
        result = val.data;
      }else{
        result = false;
      }
      
    }else{
      result = listing;
    }
    return result;
  }

  getVehicle = async (vehicleID) => {
    const { vehicles } = this.state;
    const vehicle = vehicles ? vehicles.find(vehicle => vehicle.vehicle_id.toString() === vehicleID.toString()) : null;
    let result;
    if (vehicle === undefined || vehicle === null){
      const vehicle_id = vehicleID;
      const val = await axios.post("/api/get-vehicle",{vehicle_id}).catch(error => {console.log(error)});
      if (val.status === 200){
        result = val.data;
      }else{
        result = false;
      }
      
    }else{
      result = vehicle;
    }
    return result;
  }

  getProduct = async (productID) => {
    //const { products } = this.state;
    //return products ? products.find(product => product.product_id.toString() === productID.toString()) : null;
    const { products } = this.state;
    const product = products ? products.find(product => product.product_id.toString() === productID.toString()) : null;
    //console.log(pree === undefined);
    let result;
    if (product === undefined || product === null){
      const product_id = productID;
      const val = await axios.post("/api/get-product",{product_id}).catch(error => {console.log(error)});
      if (val.status === 200){
        result = val.data;
      }else{
        result = false;
      }
      
    }else{
      result = product;
    }
    return result;
  }

  getService = async (serviceID) => {
    const { services } = this.state;
    const service = services ? services.find(service => service.service_id.toString() === serviceID.toString()) : null;
    let result;
    if (service === undefined || service === null){
      const service_id = serviceID;
      const val = await axios.post("/api/get-service",{service_id}).catch(error => {console.log(error)});
      if (val.status === 200){
        result = val.data;
      }else{
        result = false;
      }
      
    }else{
      result = service;
    }
    return result;
  }

  getItem = async (itemID) => {
    const { items } = this.state;
    const item = items ? items.find(item => item.item_id.toString() === itemID.toString()) : null;
    let result;
    if (item === undefined || item === null){
      const item_id = itemID;
      const val = await axios.post("/api/get-item",{item_id}).catch(error => {console.log(error)});
      if (val.status === 200){
        result = val.data;
      }else{
        result = false;
      }
      
    }else{
      result = item;
    }
    return result;
  }

  addListing = (listing, callback) => {
    let listings = this.state.listings.slice();
    listings.push(listing);
    this.setState({ listings }, () => callback && callback());
  };

  //method to populate shops
  setShops = async () => {
    const listings = await axios.get("/api/listings");
    const vehicles = await axios.get("/api/vehicles");
    const products = await axios.get("/api/products");
    const items = await axios.get("/api/items");
    const services = await axios.get("/api/services");
    this.setState({listings : listings.data, vehicles : vehicles.data , products : products.data, services: services.data, items:items.data });
  }

  //method to set most recent correspondent implement with group later
  setRecent = (userview_id) => {
    console.log(userview_id);
    const recent = userview_id;
    this.setState({recent});
    localStorage.setItem("recent", userview_id);
  }

  //get all user's messages 
  getMessages = async (user_id) => {
    //const user_id = this.state.user ? this.state.user.id : 0;
    if (user_id){
      const messages = await axios.post('/api/get-messages',{user_id}).catch(
        (messages) => {
          if (messages.status !== 200){ 
            console.log("no messages from request.");
            return false;
          }else{
            console.log("message are loaded");
          }
        }
      ); 
        
      if (messages.status === 200){
        const allmessages = messages.data.messages;
        //correspondents is a unique list of senders and recipients of messages exchanged between a user.
        const correspondents = allmessages ? [...new Set(allmessages.map((unique)=> ((unique.sender_id === user_id) && unique.receiver_id) || unique.sender_id ))] : [];
        //console.log(correspondents);
        var i = 0, len = correspondents.length;
        let viewlist = new Set();
        //let y;
        while (i < len) {
          this.getUserView(correspondents[len-1-i]).then(
                (y) => {
                    if (!y){
                        throw new Error("There was an error while searching for this user.");
                    }else{
                        //console.log(y);
                        viewlist.add(y);
                        //console.log(viewlist);
                        this.setState({viewlist:[...new Set(viewlist)]});
                    }
                }
            ) 
            i++
        }
        this.setState({correspondents});
        return messages.data.messages;
      }else{
        return [];
      }
    }
  }

  //get a user's convo with another user for use in message component and message shortcut compone
  getConvo = async (userview_id) => {
    const user_id = this.state.user.id;

    if (user_id && userview_id !== 0){
      const convo = await axios.post('/api/get-convo',{user_id, userview_id}).catch(
        (convo) => {
          if (convo.status !== 200){ 
            console.log("Convo not found.");
            return false;
          }
        }
      )

      if (convo.status === 200){
        //console.log(convo.data.convo);
        return convo.data.convo;
      }else{
        return "no messages";
      }  
    }else{
      return false;
    }
  }

  //main page func that saves all list; takes as params a list and a option
  listSave = (alist, option) => {
      //console.log(alist);
      switch(option){
        case 'userlist':
          const userlist = alist;
          this.setState({userlist});
          localStorage.setItem("userlist", JSON.stringify(this.state.userlist));
          break;
        case 'portfolios':
          this.setState({"portfolios":alist});
          break;
        case 'preepedia':
          this.setState({"preepedia":alist});
          break;
        case 'crawllist':
          this.setState({"crawllist":alist});
          break;
        default:
          break;
      }
  }

  //pull all and find specific user from list or do request with return of specific user from query ?
  getMyView = async () => {
    const user_id = this.state.user ? this.state.user.id : 0;
    const userview =  await axios.post('/api/my-view',{user_id}).catch(
      (userview) => {
          if (userview.status !== 200){ 
              console.log("No results from search");
              return false;
          }
      }
    );
    
    if (userview.status === 200){
      return userview.data;
    }else{
      return false;
    }
  }
  
  //pull all and find specific user from list or do request with return of specific user from query ?
  getUserView = async(userID) => {
    const user_id = userID;
    if (user_id && user_id !== 0){
      const userview =  await axios.post('/api/my-view',{user_id}).catch(
        (userview) => {
            if (userview.status !== 200){ 
                console.log("No results from search");
                return false;
            }
        }
      );
      
      if (userview.status === 200){
        //console.log(userview.data);
        return userview.data;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  //pull all and find specific user from list or do request with return of specific user from query ?
  getGroupView = async(group_id) => {
    if (group_id && group_id !== 0){
      const groupview =  await axios.post('/api/group-view',{group_id}).catch(
        (groupview) => {
            if (groupview.status !== 200){ 
                console.log("No results from search");
                return false;
            }
        }
      );
      
      if (groupview.status === 200){
        //console.log(userview.data);
        return groupview.data;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  //making post function
  ypree = (pree, callback) => {
    let prees = this.state.prees.slice();
    prees.push(pree);
    this.setState({ prees }, () => callback && callback());
  }

  getPree = async (pree_id) => {
    const { prees } = this.state;
    const pree = prees.find(pree => pree.pree_id.toString() === pree_id.toString());
    //console.log(pree === undefined);
    let result;
    if (pree === undefined){
      const user_id = this.state.user ? this.state.user.id : 0;
      const val = await axios.post("/api/get-pree",{pree_id, user_id}).catch(error => {console.log(error)});
      if (val.status === 200){
        result = val.data;
      }else{
        result = false;
      }
      
    }else{
      result = pree;
    }
    return result;
  }
  
  //setError
  setError = (msg) => {
    this.setState({ error: msg });
  }

  //clear password and set application to ready state
  clearCred = () => {
    this.setState({email:"", password:"", welcome: false, ready:true});
    localStorage.setItem("ready", JSON.stringify(this.state.ready));
    localStorage.setItem("welcome", JSON.stringify(this.state.welcome));
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }

  //welcome
  welcomeFunc = (email, password) => {
    const welcome = true;
    this.setState({email,password,welcome}); 
    localStorage.setItem("welcome", JSON.stringify(welcome));
    localStorage.setItem("email", email);
    localStorage.setItem("password", CryptoJS.AES.encrypt(password, this.state.secret));
  }

  //sign-up
  signUp = async (firstname,lastname,gender,email,password,phonenumber) => {
    const res = await axios.post('/api/signup', {firstname,lastname,gender,email,password,phonenumber}).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    });

    if (res.status === 200){
      const user_id = res.data.user_id;
      localStorage.setItem("user_id", JSON.stringify(user_id));
      this.setState({user_id});
      return true;
    }else{
      return false;
    }
  }

  //login
  login = async (email, password) => {

    const res = await axios.post("/api/login",{email,password},{
      headers: {
        'Authorization' : this.state.jwt
      }
    }).catch(
      (res) => { 
        if (res.status !== 200) { return { status: res.status, message: 'Not successful' } }
      }
    )
    if (res.status === 200){
      //console.log("test4");
      //let email = jwt_decode(res.data.access_token).identity;
      //console.log(email);
      let welcome;
      let user;
      let ready;
      let toggle = false;
      let user_id;
      //console.log(jwt_decode(res.data.access_token));

      // get access level from database
      user = {
        id: res.data.user_id,
        email:email,
        token: res.data.access_token,
        accessLevel: res.data.access_type,
        username: res.data.username,
        fullname : res.data.firstname + " " + res.data.lastname,
        has_profile : res.data.has_profile,
        phonenumber: res.data.phonenumber,
        gender : res.data.gender,
        location : res.data.location
      }
      if (res.data.has_profile === true){
        ready = true;
        welcome = false;
        user_id = res.data.user_id;
        const prees = await axios.post("/api/see-the-pree",{user_id});
        const messages = await this.getMessages(user_id);
        this.setState({prees:prees.data,messages:messages});
      }else{
        ready = false;
        welcome = true;
        user_id = res.data.user_id;
        this.setState({email,password});
      }
      
      //replace the implementations that used user_id with user.id inside the welcome features
      localStorage.setItem("user-context", JSON.stringify(user));
      localStorage.setItem("ready", JSON.stringify(ready));
      localStorage.setItem("welcome", JSON.stringify(welcome));
      localStorage.setItem("user_id", JSON.stringify(user_id));
      this.setState({user,welcome,ready,toggle:toggle,user_id});
      return true;
    }else{
      return false;
    }
  };

  //logout
  logout = e => {
    e.preventDefault();
    this.setState({user : null, ready : false, welcome: false, recent:0, prees:null});
    localStorage.setItem("recent", JSON.stringify(this.state.recent));
    localStorage.removeItem("user-context");
    localStorage.removeItem("ready");
    localStorage.removeItem("welcome");
    return <Navigate to="/home" replace={true}/>;
  }

  toggleMenu = e => {
    if(this.state.toggle && window.innerWidth < 1024){
      $(".custom-nav").animate({
          width: 0,
          left: "-25px"
      });
      this.setState({toggle:false});
    }else if(!this.state.toggle && window.innerWidth < 1024){
      $(".custom-nav").animate({
        width: this.state.boxWidth,
        left: 0,
      });
      this.setState({toggle:true});
    }
  }

  render(){
    return (
      <Context.Provider
        value ={{
          ...this.state,
          setMenuChoice: this.setMenuChoice,
          login: this.login,
          signUp: this.signUp,
          logout: this.logout,
          clearCred: this.clearCred,
          welcomeFunc: this.welcomeFunc,
          getMyView : this.getMyView,
          getUserView: this.getUserView,
          listSave : this.listSave,
          ypree: this.ypree,
          setRecent: this.setRecent,
          getMessages: this.getMessages,
          getConvo: this.getConvo,
          setError: this.setError,
          getPree: this.getPree,
          addListing: this.addListing,
          getListing: this.getListing,
          getTargetPhotos: this.getTargetPhotos,
          getVehicle: this.getVehicle,
          getProduct: this.getProduct,
          getService: this.getService,
          getItem: this.getItem,
          setShops: this.setShops,
          getGroupView: this.getGroupView,
          toggleMenu:this.toggleMenu
        }}>
          <Router ref={this.routeRef}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Timeline />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/audios" element={<Audios />} />
                {/*<Route path="/audios/stereo" element={<Audios />} />*/}
                <Route path="/images" element={<Images />} />
                {/*<Route path="/follower" component={Follower} />
                <Route path="/following" component={Following} />*/}
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/settings" element={<Settings />} />
                {/*<Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />*/}
                <Route path="/videos" element={<Videos />} />
                {/*<Route path="/notifications" element={<Notifications />} />*/}
                <Route path="/social" element={<Social />} />
                <Route path="/messages/:category/:msgtype/:id" element={<Messages />} />
                <Route path="/search" element={<Search />} />
                <Route path="/test" element={<Test />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/shops" element={<Shops />} />
                <Route path="/wgr" element={<WGR />} />
                <Route path="/view-pree/:id" element={<ViewPree />} />
                <Route path="/view-blueberry/:id" element={<ViewMediaItem />} />
                <Route path="/view-trendy/:id" element={<ViewTrend />} />
                <Route path="/view-user-profile/:id" element={<ViewUserProfile />} />
                <Route path="/view-user-list/:id/:action" element={<ViewUserList />} />
                <Route path="/groups/:id/:action" element={<Groups />} />
                <Route path="/view-group/:id/" element={<ViewGroup />} />
                {/*<Route path="/shops/propfinder" element={<PropFinder />} />*/}
                <Route path="/listing-view/:id" element={<ViewListing />} />
                <Route path="/vehicle-view/:id" element={<ViewVehicle />} />
                <Route path="/product-view/:id" element={<ViewProduct />} />
                <Route path="/service-view/:id" element={<ViewService />} />
                <Route path="/volunteer-view/:id" element={<ViewVolunteer />} />
                <Route path="/service-add" element={<AddService />} />
                <Route path="/vehicle-add" element={<AddVehicle />} />
                <Route path="/item-view/:id" element={<ViewItem />} />
                <Route path="/preepedia" element={<Preepedia />} />
                <Route path="/preepedia/view-page/:id/" element={<ViewPage />} />
                <Route path="/specials" element={<Specials />} />
                <Route path="/talkie" element={<Talkie />} />
                <Route path="/live" element={<Live />} />
                <Route path="/add-event" element={<HostEvent />} />
                <Route path="/add-classified" element={<AddClassified />} />
                <Route path="/add-volunteer" element={<AddVolunteer />} />
                <Route path="/event-view/:id" element={<ViewEvent />} />
                <Route path="/classified-view/:id" element={<ViewClassified />} />
                {/*<Route path='/trendy' element={<Trendy />} />*/}
                {/*<Route path="/welcome" component={Welcome} />*/}
              </Route>
              <Route path="/home" element={<Homepage />} />
              <Route path='/about/test' element={<Test />} />
              {/*advertising components*/}
              {/* about W@H-GW@@N */}
              {/* about Trendy */}
              {/* about Blueberry */}
              {/* about Reports */}
              {/* about Glossa */}
              {/* about Market */}
            </Routes>
            
          </Router>
      </Context.Provider>
    )
  }
}