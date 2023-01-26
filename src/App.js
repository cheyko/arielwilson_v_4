//stylesheets
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-image-lightbox/style.css';
import 'react-tabs/style/react-tabs.css';

//Helpers
import React, { Component } from "react";
import { HashRouter, Switch, Route, Link, Redirect, BrowserRouter as Router} from "react-router-dom";
import axios from "axios";
import Context from "./Context";
import jwt_decode from 'jwt-decode';

//Components
import Profile from "./components/Profile";
import Timeline from "./components/Timeline";
import Navbar from "./components/Navbar";
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

import Welcome from './components/Homepage/Welcome';
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
import ItemView from './components/Shops/BickleCourt/ItemImageView';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import Specials from './components/Specials';
import Talkie from './components/Talkie';
import Live from './components/Live';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      prees: [],
    };
    /// Create Router reference 
    this.routerRef = React.createRef();
  }

  async componentDidMount(){
    //this.setState({ready:true});
    const time = await axios.get("/api/time");
    console.log(time);
    let user = localStorage.getItem("user-context");
    let ready = localStorage.getItem("ready");
    let welcome = localStorage.getItem("welcome");
    let userlist = localStorage.getItem("userlist");
    let recent = localStorage.getItem("recent");
    user = user ? JSON.parse(user) : null;
    ready = ready ? JSON.parse(ready) : null;
    welcome = welcome ? JSON.parse(welcome) : null;

    let val = window.screen.width;
    let boxWidth;
    if (val < 500){
       boxWidth = 300;
    }else{
        boxWidth = 700;
    }
    //if User is logged in
    recent = recent ? parseInt(JSON.parse(recent)) : 0;
    userlist = userlist ? JSON.parse(userlist) : [];
    const user_id = user ? user.id : null;
    const prees = ready ? await axios.post("/api/see-the-pree",{user_id}) : {"data":null}; //add reactions to the prees from the backend before response to request.
    const messages = ready ? await this.getMessages(user_id) : null; // review if data too large later offset maybe needed
    console.log(messages);
    this.setState({user, prees:prees.data, ready, welcome, userlist, recent, messages, boxWidth:boxWidth});
  }

  getTargetPhotos = (theID, contextType) => {
    const targetPhotos = [];
    switch(contextType){
      case 'listing':
        const { listings } = this.state;
        const listing = listings ? listings.find(listing => listing.listing_id.toString() === theID.toString()) : null;
        for (var x=0; x<parseInt(listing.numOfPics); x++){
          let url = process.env.PUBLIC_URL + "/images/listings/listing" + listing.listing_id + "/" + x;
          targetPhotos.push(url);
        }
        break;
      case 'vehicle':
        const { vehicles } = this.state;
        const vehicle = vehicles ? vehicles.find(vehicle => vehicle.vehicle_id.toString() === theID.toString()) : null;
        for (var x=0; x<parseInt(vehicle.numOfPics); x++){
          let url = process.env.PUBLIC_URL + "/images/vehicles/vehicle" + vehicle.vehicle_id + "/" + x;
          targetPhotos.push(url);
        }
        break;
      case 'product':
          const { products } = this.state;
          const product = products ? products.find(product => product.product_id.toString() === theID.toString()) : null;
          for (var x=0; x<parseInt(product.numOfPics); x++){
            let url = process.env.PUBLIC_URL + "/images/products/product" + product.product_id + "/" + x;
            targetPhotos.push(url);
          }
          break;
      case 'service':
        const { services } = this.state;
        const service = services ? services.find(service => service.service_id.toString() === theID.toString()) : null;
        for (var x=0; x<parseInt(service.numOfPics); x++){
          let url = process.env.PUBLIC_URL + "/images/services/service" + service.service_id + "/" + x;
          targetPhotos.push(url);
        }
        break;
      case 'item':
        const { items } = this.state;
        const item = items ? items.find(item => item.item_id.toString() === theID.toString()) : null;
        for (var x=0; x<parseInt(item.numOfPics); x++){
          let url = process.env.PUBLIC_URL + "/images/items/item" + item.item_id + "/" + x;
          targetPhotos.push(url);
        }
        break;
    }
    return targetPhotos;
  }

  getListing = (listingID) => {
    const { listings } = this.state;
    return listings ? listings.find(listing => listing.listing_id.toString() === listingID.toString()) : null;
  }

  getVehicle = (vehicleID) => {
    const { vehicles } = this.state;
    return vehicles ? vehicles.find(vehicle => vehicle.vehicle_id.toString() === vehicleID.toString()) : null;
  }

  getProduct = (productID) => {
    const { products } = this.state;
    return products ? products.find(product => product.product_id.toString() === productID.toString()) : null;
  }

  getService = (serviceID) => {
    const { services } = this.state;
    return services ? services.find(service => service.service_id.toString() === serviceID.toString()) : null;
  }

  getItem = (itemID) => {
    const { items } = this.state;
    return items ? items.find(item => item.item_id.toString() === itemID.toString()) : null;
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
    const recent = userview_id;
    this.setState({recent});
    localStorage.setItem("recent", JSON.stringify(this.state.recent));
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
        const correspondents = allmessages ? [...new Set(allmessages.map((unique)=> unique.sender_id === user_id && unique.receiver_id || unique.sender_id ))] : [];
        //console.log(correspondents);
        var i = 0, len = correspondents.length;
        let viewlist = new Set();
        let y;
        while (i < len) {
            y = this.getUserView(correspondents[len-1-i]).then(
                (y) => {
                    if (!y){
                        throw new Error("There was an error while searching for this user.");
                    }else{
                        console.log(y);
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
      console.log(alist);
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

  getPree = preeId => {
    const { prees } = this.state
    return prees.find(pree => pree.pree_id.toString() === preeId.toString())
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
  }

  //welcome
  welcomeFunc = (email, password) => {
    const welcome = true;
    console.log("test2");
    this.setState({email,password,welcome}); 
    localStorage.setItem("welcome", JSON.stringify(welcome));
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

    const res = await axios.post("/api/login",{email,password}).catch(
      (res) => { 
        if (res.status !== 200) { return { status: res.status, message: 'Not successful' } }
      }
    )

    //console.log("test3");
    if (res.status === 200){
      //console.log("test4");
      let email = jwt_decode(res.data.access_token).identity;
      let welcome;
      let user;
      let ready;
      let toggle = false;
      let user_id;
      //console.log(user_id);

      // get access level from database
      user = {
        id: res.data.user_id,
        email,
        token: res.data.access_token,
        accessLevel: email === 'admin@example.com' ? 0 : 1, 
        username: res.data.username,
        has_profile : res.data.has_profile,
        gender : res.data.gender
      }
      console.log("one");
      if (res.data.has_profile === true){
        console.log("two");
        ready = true;
        welcome = false;
        user_id = res.data.user_id;
        const prees = await axios.post("/api/see-the-pree",{user_id});
        const messages = await this.getMessages(user_id);
        this.setState({prees:prees.data,toggle:toggle,messages:messages});
      }else{
        ready = false;
        welcome = true;
        this.setState({email,password});
      }
      
      //replace the implementations that used user_id with user.id inside the welcome features
      
      localStorage.setItem("user-context", JSON.stringify(user));
      localStorage.setItem("ready", JSON.stringify(ready));
      localStorage.setItem("welcome", JSON.stringify(welcome));
      this.setState({user,welcome,ready});
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
    return <Redirect to="/" />;
  }

  toggleMenu = e => {
    if(this.state.toggle){
      $(".custom-nav").animate({
          width: 0,
      });
      this.setState({toggle:false});
    }else{
      $(".custom-nav").animate({
        width: this.state.boxWidth,
      });
      this.setState({toggle:true});
    }
  }

  render(){
    return (
      <Context.Provider
        value ={{
          ...this.state,
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
             <HashRouter>
              {this.state.ready ? (           
                <div className="hero main-container">
                  <div className="columns is-mobile is-multiline">
                    <div className="column nav-column is-one-quarter"> 
                      <div className="App">
                        <Navbar />
                      </div>
                    </div>
                    <div className="column container app-container is-three-quarters"> 
                      <div className={`mobile-menu menu-color reaction-btn ${!this.state.toggle ? "has-text-centered" : "has-text-right"}`} onClick={ e => this.toggleMenu(e) }>
                          {!this.state.toggle ?
                            ( <span className="button reverse-colors"><b> Main Menu </b> &nbsp; <FontAwesomeIcon icon={faBars} size="2x" /> </span> )
                            :
                            ( <span className="button reverse-colors"><FontAwesomeIcon icon={faTimes} size="2x" /> </span> )
                          }
                      </div>
                      <Switch>
                        <Route exact path="/" component={Timeline} />
                        <Route exact path="/home" component={Homepage} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/audios" component={Audios} />
                        <Route exact path="/audios/stereo" component={Audios} />
                        <Route exact path="/images" component={Images} />
                        {/*<Route exact path="/follower" component={Follower} />
                        <Route exact path="/following" component={Following} />*/}
                        <Route exact path="/quotes" component={Quotes} />
                        <Route exact path="/settings" component={Settings} />
                        {/*<Route exact path="/signup" component={Signup} />
                        <Route exact path="/login" component={Login} />*/}
                        <Route exact path="/videos" component={Videos} />
                        <Route exact path="/notifications" component={Notifications} />
                        <Route exact path="/social" component={Social} />
                        <Route exact path="/messages/:category/:msgtype/:id" component={Messages} />
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/test" component={Test} />
                        <Route exact path="/wallet" component={Wallet} />
                        <Route exact path="/activities" component={Activities} />
                        <Route exact path="/shops" component={Shops} />
                        <Route exact path="/wgr" component={WGR} />
                        <Route exact path="/view-pree/:id" component={ViewPree} />
                        <Route exact path="/view-blueberry/:id" component={ViewMediaItem} />
                        <Route exact path="/view-trendy/:id" component={ViewTrend} />
                        <Route exact path="/view-user-profile/:id" component={ViewUserProfile} />
                        <Route exact path="/view-user-list/:id/:action" component={ViewUserList} />
                        <Route exact path="/groups/:id/:action" component={Groups} />
                        <Route exact path="/view-group/:id/" component={ViewGroup} />
                        <Route exact path="/shops/propfinder" component={PropFinder} />
                        <Route exact path="/listing-view/:id" component={ViewListing} />
                        <Route exact path="/vehicle-view/:id" component={ViewVehicle} />
                        <Route exact path="/product-view/:id" component={ViewProduct} />
                        <Route exact path="/service-view/:id" component={ViewService} />
                        <Route exact path="/item-view/:id" component={ViewItem} />
                        <Route exact path="/preepedia" component={Preepedia} />
                        <Route exact path="/preepedia/view-page/:id/" component={ViewPage} />
                        <Route exact path="/specials" component={Specials} />
                        <Route exact path="/talkie" component={Talkie} />
                        <Route exact path="/live" component={Live} />
                        {/*<Route exact path="/welcome" component={Welcome} />*/}
                      </Switch>
                    </div>
                  </div>
                </div>
              ):( 
                this.state.welcome ? (
                  <div className="hero">
                      <Welcome />
                  </div>
                ):(
                  <div className="hero homepage-div">
                      <Homepage />  
                  </div>
                )                
              )}
            </HashRouter>
          </Router>
      </Context.Provider>
    )
  }
}