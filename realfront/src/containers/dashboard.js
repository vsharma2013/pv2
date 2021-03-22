/* 
dashboard JS 
*/
import React, { Component, createRef, useRef } from "react";
import bg from "../assets/images/background.jpg";
import reading from "../assets/images/reading.png";
import "./dashboard.css";
import ReactSearchBox from "react-search-box";
import StackGrid from "react-stack-grid";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/navbar";
import TopRated from "../components/toprated";
import NewsLetter from "../components/newsletter";
import NewDevelopment from "../components/newdevelopment";
import Blog from "../components/blog";
import Footer from "../components/footer";
import user from "../assets/icons/user.png";
import insta from "../assets/icons/insta.png";
import fb from "../assets/icons/fb.png";
import Star from "../assets/icons/star.png";
import twitter from "../assets/icons/twitter.png";
import Camera from "../assets/icons/camera.png";
import pinterest from "../assets/icons/pinterest.png";
import linkedin from "../assets/icons/linkedin_white.png";
import axios from "axios";
import maleuser from "../assets/icons/user1.png";
import Projects from "./Projects/projects";
// import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import StarRatings from "react-star-ratings";
import Geo from "../components/GeoLocation/geolocation";
import Search from "../components/Search/search";
import SignUp from "../components/SignUp/signup";

import Login from "../components/Login/login";
import MobileSignup from "../components/MobileSignup/mobilesignup";
import Registration from "../components/Registration/registration";
import "regenerator-runtime/runtime";
import WriteReview from "../components/WriteReview/createreview";
import Sticky from "react-sticky-el";
import PostAPicture from "../components/PostAPicture/postApicture";
import location_dropdownIcon from "../assets/icons/down2.png";
import searchIcon from "../assets/icons/search.png";
import Location_drop from "../components/LocationDropdown/location_dropdown";
import LogoIcon from "../assets/icons/logo_white.png";
import LogoIconGrey from "../assets/icons/logo.png";
import SweetAlert from "react-bootstrap-sweetalert";
import DashboardNavBar from "./DashboardNavBar";
import Dashbannerweb from '../../src/assets/images/bannerweb.png';
import Dashbanner from '../../src/assets/images/bannermob.png';



// import ReactGA from 'react-ga';
// import auth from './auth.ts'; // Sample authentication provider

// const trackingId = "UA-1234567890-1"; // Replace with your Google Analytics tracking ID
// ReactGA.initialize(trackingId);
// ReactGA.set({
//   userId: auth.currentUserId(),
//   // any data that is relevant to the user session
//   // that you would like to track with google analytics
// })

let LoggedIn = "";
let LoggedInUserEmail = "";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectmedia: "",
      showComponent: false,
      loginComponent: false,
      signupComponent: false,
      mloginComponent: false,
      locationDrop: false,
      registerComponent: false,
      more: false,
      loggedin: false,
      loggedinuseremail: "",
      loggedinusername: "",
      notification: false,
      review_status: false,
      picture_status: false,
    };
    this.newdevelop = React.createRef();
    this.topdivdash = React.createRef();
    this.mosttrend = React.createRef();
    this.toprated = React.createRef();
    this.blogs = React.createRef();
    this.myRef = React.createRef();
    this.state = { scrollTop: 0 };
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.close = this.close.bind(this);
    this.opennotif = this.opennotif.bind(this);
    this.closenotif = this.closenotif.bind(this);
    this.openlogin1 = this.openlogin1.bind(this);
    this.loginsuccess = this.loginsuccess.bind(this);
    this.mobilesignup = this.mobilesignup.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onPostPicture = this.onPostPicture.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.dashboardRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.location_dropdownMenu = this.location_dropdownMenu.bind(this);
    this.seeMoreHandler = this.seeMoreHandler.bind(this);

    this.sectionRefs = [
      { section: "dashboard", ref: this.dashboardRef },
      { section: "mosttrend", ref: this.mosttrend },
      { section: "toprated", ref: this.toprated },
      { section: "newdevelop", ref: this.newdevelop },
      { section: "blogs", ref: this.blogs },
    ];
  }
  // onScroll = () => {
  //   const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
  //   const scrollTop = this.myRef.current.scrollTop
  //   this.setState({
  //     scrollTop: scrollTop
  //   })
  // }

  project_function = async (res) => {
    try {
      // const { project_id } = this.props.match.params
      // let projectdetails = await axios.get(`http://localhost:8081/projects`);
      console.log("API DATAAAAAAAAA");
      console.log(res);
      let params = res.project_id;

      // this.setState({
      //     match: this.state.match.concat(params)
      //   })
      this.setState({ match: { params } });
      // console.log(projectdetails.data);
      // this.setState({projectmedia:projectdetails.data})
    } catch (e) {
      console.log(e);
    }
  };
  projectmediafetch = async () => {
    try {
      const { project_id } = this.props.match.params;
      // let projectdetails;
      console.log("STATE CITY NEW 12345");
      let city = "pune";
      console.log(this.state);
      // if(this.state.city){

      if ("city" in localStorage) {
        city = localStorage.getItem("city");
        console.log("1212121");
        console.log(city);
        this.setState({ city: city });
      } else if (this.state.city) {
        city = this.state.city ? this.state.city : this.state.geostate;
        console.log("34343434");
        console.log(city);
        localStorage.setItem("city", city);
      }
      city = "pune";
      let projectdetails = await axios.get(
        `https://www.propviewz.com/be/most_trending_geo_location_projects/` +
          city
      );
      this.setState({ projectmedia: projectdetails.data });
      let topprojectdetails = await axios.get(
        `https://www.propviewz.com/be/geo_location_projects/` + city
      );
      this.setState({ topprojectmedia: topprojectdetails.data });
      let recentprojectdetails = await axios.get(
        `https://www.propviewz.com/be/recent_launched_geo_location_projects/` +
          city
      );
      this.setState({ recentprojectmedia: recentprojectdetails.data });

      // }
      // else{
      //   let projectdetails = await axios.get(`https://www.propviewz.com/be/most_trending_geo_location_projects/India`);
      //       this.setState({projectmedia:projectdetails.data})
      //   let topprojectdetails = await axios.get(`https://www.propviewz.com/be/geo_location_projects/India`);
      //       this.setState({topprojectmedia:topprojectdetails.data})
      //   let recentprojectdetails = await axios.get(`https://www.propviewz.com/be/recent_launched_geo_location_projects/India`);
      //       this.setState({recentprojectmedia:recentprojectdetails.data})
      // }
      console.log("@@@@@");
      console.log(this.state);
      // }

      // console.log("API GEO DATA");
      // console.log(projectdetails.data);
      // this.setState({projectmedia:projectdetails.data})
    } catch (e) {
      console.log(e);
    }
  };
  myChangeHandler = async (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    console.log("VVVVVV");
    console.log(val);
    if (val == "india") {
      val = "India";
    } else if (val == "bangalore") {
      val = "Bangalore";
    } else if (val == "goa") {
      val = "Goa";
    } else if (val == "mumbai") {
      val = "Mumbai";
    } else if (val == "pune") {
      val = "Pune";
    } else if (val == "thane") {
      val = "Thane";
    }

    this.state.city = val;
    let city = this.state.city ? this.state.city : this.state.geostate;
    console.log("GEO CITY NEW 2");
    console.log(city);
    if ("city" in localStorage) {
      city = localStorage.setItem("city", city);
    } else {
      localStorage.setItem("city", city);
    }
    let projectdetails = await axios.get(
      `https://www.propviewz.com/be/most_trending_geo_location_projects/` + city
    );
    this.setState({ projectmedia: projectdetails.data, locationDrop: false });
    await this.projectmediafetch();
  };

  async componentWillMount() {
    const { project_id } = this.props.match.params;
    console.log("***************************************");
    console.log(project_id);
    console.log(this.state);

    document.addEventListener("mousedown", this.handleClickOutside);
    await this.projectmediafetch();
  }

  async componentDidMount() {
    console.log("yeash");
    console.log(this.state);
    document.addEventListener("mousedown", this.handleClickOutside);
    // LoggedIn = localStorage.getItem("loggedin");
    // console.log("EEEEEEEEEEEEEEEEEEEEeeeee", LoggedIn)
    // LoggedInUserEmail = localStorage.getItem("loggedInUseremail");
    this.setState({
      loggedin: localStorage.getItem("loggedin"),
      loggedinuseremail: localStorage.getItem("loggedInUseremail"),
      loggedinusername: localStorage.getItem("loggedInUsername"),
    });
    console.log("state values", this.state);
    let existingcity = null;
    if ("city" in localStorage) {
      console.log("11111111");
      this.state.city = localStorage.getItem("city");
    } else if (this.state.geostate) {
      console.log("2222222");
    } else if (this.state.city) {
      console.log("33333");
    } else {
      this.state.locationDrop = true;
      console.log("444444");
    }
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        locationDrop: false,
      });
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  New = async (LLvalue) => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        LLvalue +
        "&key=AIzaSyAWuh3j8uE0OrhRkqenhQFP696-Xy0ecMQ"
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("qwerty");
        // console.log(myLat)
        // console.log(myLon)
        console.log(LLvalue);
        console.log(response);
        let city_no = response.results.length;
        let current_city = city_no - 3;
        this.setState({
          geostate:
            response.results[current_city].address_components[0].long_name,
        });
        this.projectmediafetch();
      });

    //
    //         .then((responseJson) => {

    //             console.log(response)
    //             console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.jsonify(responseJson));
    // })
  };

  close() {
    this.setState({
      loginComponent: false,
      signupComponent: false,
      mloginComponent: false,
      registerComponent: false,
    });
  }

  loginsuccess(loggedin, loggedinuseremail, loggedinusername) {
    this.setState({
      loginComponent: false,
      signupComponent: false,
      mloginComponent: false,
      registerComponent: false,
      loggedin: loggedin,
      loggedinuseremail: loggedinuseremail,
      loggedinusername: loggedinusername,
    });
  }

  logout() {
    if ("loggedin" in localStorage) {
      delete localStorage["loggedin"];
    }
    if ("loggedInUseremail" in localStorage) {
      delete localStorage["loggedInUseremail"];
    }
    if ("loggedInUsername" in localStorage) {
      delete localStorage["loggedInUsername"];
    }
    this.setState({
      loggedin: false,
      loggedinusername: "",
      loggedinuseremail: "",
      showlogoutstatus: true,
    });
  }

  signup() {
    this.setState({
      signupComponent: true,
      loginComponent: false,
      mloginComponent: false,
      registerComponent: false,
    });
  }
  location_dropdownMenu = async () => {
    this.setState({
      locationDrop: true,
    });
  };

  login() {
    this.setState({
      loginComponent: true,
      signupComponent: false,
      mloginComponent: false,
      registerComponent: false,
    });
  }

  mobilesignup() {
    this.setState({
      mloginComponent: true,
      signupComponent: false,
      loginComponent: false,
      registerComponent: false,
    });
  }

  registration() {
    this.setState({
      registerComponent: true,
      signupComponent: false,
      loginComponent: false,
      mloginComponent: false,
    });
  }

  openlogin1() {
    this.setState({
      loginComponent: true,
      mloginComponent: false,
    });
  }

  loginHandler() {
    this.setState({ signupComponent: false, loginComponent: true });
  }
  signupHandler() {
    this.setState({ signupComponent: true, loginComponent: false });
  }

  registerHandler() {
    this.setState({ signupComponent: false, registerComponent: true });
  }

  onButtonClick() {
    this.setState({
      showComponent: true,
      showComponent1: false,
    });
  }
  onPostPicture() {
    this.setState({
      showComponent1: true,
      showComponent: false,
    });
  }
  onClose() {
    this.setState({
      showComponent1: false,
      showComponent: false,
    });
  }
  opennotif() {
    this.setState({
      notification: true,
    });
    this.turnOffnotifications = setTimeout(() => {
      this.setState(() => ({ notification: false }));
    }, 20000);
  }

  showreviewstatus() {
    this.setState({ review_status: true });
    this.turnOffnotifications = setTimeout(() => {
      this.setState(() => ({ review_status: false }));
    }, 20000);
  }

  showpicturestatus() {
    this.setState({ picture_status: true });
    this.turnOffnotifications = setTimeout(() => {
      this.setState(() => ({ picture_status: false }));
    }, 20000);
  }

  componentWillUnmount() {
    clearTimeout(this.turnOffnotifications);
  }

  closenotif() {
    this.setState({
      notification: false,
      review_status: false,
      picture_status: false,
    });
  }
  movetoTop = (event) => {
    console.log("TOPDASH");
    if (this.topdivdash.current) {
      this.topdivdash.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };
  seeMoreHandler(event) {
    console.log("LOCATION SEARCH PAGE");
    console.log(this.state);
    let id = this.state.city ? this.state.city : this.state.geostate;
    if (
      id == "Mumbai" ||
      id == "Pune" ||
      id == "Goa" ||
      id == "Thane" ||
      id == "Bangalore"
    ) {
      console.log("Found city");
    } else {
      id = "India";
      console.log("city not found");
    }
    window.open("/MostTrending/Location/" + id, "_blank");
  }

  render() {
    const { scrollTop } = this.state;
    //  if (localStorage.getItem("loggedin")){
    //    alert("success");
    //  }
    // function Dashboard(){
    console.log("DASH STATE");
    console.log(this.state.city);
    console.log("PROPS");
    console.log(this.props);
    let project_id;
    let project_id1;
    let project_id2;
    let project_id3;
    let project_id4;
    let project_id5;
    let overall, overall1, overall2, overall3, overall4, overall5;
    // let project_id6;let project_id7;let project_id8;
    if (this.state.projectmedia) {
      project_id = this.state.projectmedia[0].project_id;
      overall = this.state.projectmedia[0].overall_rating;
      console.log("OVERALL 1");
      console.log(overall);
      project_id1 = this.state.projectmedia[1].project_id;
      overall1 = this.state.projectmedia[1].overall_rating;
      project_id2 = this.state.projectmedia[2].project_id;
      overall2 = this.state.projectmedia[2].overall_rating;
      project_id3 = this.state.projectmedia[3].project_id;
      overall3 = this.state.projectmedia[3].overall_rating;
      project_id4 = this.state.projectmedia[4].project_id;
      overall4 = this.state.projectmedia[4].overall_rating;
      project_id5 = this.state.projectmedia[5].project_id;
      overall5 = this.state.projectmedia[5].overall_rating;
    }
    let login_status;
    if ((this.state.loggedin === true) | (this.state.loggedin === "true")) {
      login_status = (
        // <div  style={{color: "white", position: "absolute"}}>
        <div className="login-status-container">
          <div className="logout_btn1">
            <a style={{ marginBottom: "0px", color: "white" }} href="/account/">
              {this.state.loggedinusername}
              {/* Alpesh Jadav */}
            </a>
          </div>
          <div className="logout_btn2">
            <p onClick={this.logout}>Logout</p>
          </div>
        </div>
        // </div>
      );
    }
    if (
      this.state.showlogoutstatus === true &&
      (this.state.loggedin === false) | (this.state.loggedin === "false")
    ) {
      login_status = (
        // <div  style={{color: "white", position: "absolute"}}>
        <div>
          <div className="logout_btn1">
            <a
              style={{
                marginBottom: "0px",
                color: "white",
                fontStyle: "italic",
              }}
            >
              You logged out
            </a>
          </div>
        </div>
        // </div>
      );
    }

    return (
      <>
        {this.state.notification && (
          // <div class="alert alert-success alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%'}}>
          //   <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer'}}>&times;</p>
          //   A  <strong>registration Link</strong> has been sent to your Email ID.
          // </div>
          <SweetAlert
            success
            show={this.state.notification}
            confirmBtnBsStyle={"secondary"}
            style={{ fontFamily: "Catamaran-Semibold", color: "#404041" }}
            // title="Please Login or Signup to mark the project as favourite."
            // text="SweetAlert in React"
            // showCancelButton
            onConfirm={() => {
              // console.log('confirm');
              this.setState({ notification: false });
            }}
            onCancel={() => {
              // console.log('cancel');
              this.setState({ notification: false });
            }}
            timeout={600000}
            onEscapeKey={() => this.setState({ notification: false })}
            onOutsideClick={() => this.setState({ notification: false })}
            // confirmBtnBsStyle={"danger"}
          >
            A Registration Link has been sent to your Email ID.
          </SweetAlert>
        )}

        {this.state.review_status && (
          // <div class="alert alert-success alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%'}}>
          //   <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer'}}>&times;</p>
          //   Your <strong>Review</strong> has been Submitted.
          // </div>
          <SweetAlert
            success
            show={this.state.review_status}
            confirmBtnBsStyle={"secondary"}
            style={{ fontFamily: "Catamaran-Semibold", color: "#404041" }}
            // title="Please Login or Signup to mark the project as favourite."
            // text="SweetAlert in React"
            // showCancelButton
            onConfirm={() => {
              // console.log('confirm');
              this.setState({ review_status: false });
            }}
            onCancel={() => {
              // console.log('cancel');
              this.setState({ review_status: false });
            }}
            timeout={600000}
            onEscapeKey={() => this.setState({ review_status: false })}
            onOutsideClick={() => this.setState({ review_status: false })}
            // confirmBtnBsStyle={"danger"}
          >
            Your Review has been Submitted. Approval pending.
          </SweetAlert>
        )}

        {this.state.picture_status && (
          // <div class="alert alert-success alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%'}}>
          //   <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer'}}>&times;</p>
          //   Your <strong>Picture</strong> has been Submitted.
          // </div>
          <SweetAlert
            success
            show={this.state.picture_status}
            confirmBtnBsStyle={"secondary"}
            style={{ fontFamily: "Catamaran-Semibold", color: "#404041" }}
            // title="Please Login or Signup to mark the project as favourite."
            // text="SweetAlert in React"
            // showCancelButton
            onConfirm={() => {
              // console.log('confirm');
              this.setState({ picture_status: false });
            }}
            onCancel={() => {
              // console.log('cancel');
              this.setState({ picture_status: false });
            }}
            timeout={600000}
            onEscapeKey={() => this.setState({ picture_status: false })}
            onOutsideClick={() => this.setState({ picture_status: false })}
            // confirmBtnBsStyle={"danger"}
          >
            Your Picture has been Submitted. Approval pending.
          </SweetAlert>
        )}

        {/* <Geo New= {this.New.bind(this)}/> */}
        {/* enable after reverse geo coding */}
        {/* <Geo/> */}

        <div className="header-section">
          <div className="header-left">
            <a href={"/"}>
              <img className="logo" src={LogoIcon} />
            </a>
          </div>
          <div className="header-center" ref={this.dashboardRef}>
            <div className="header-center-top">
              <h2 className="unbiased">We help you decide</h2>
              <h3 className="on">Read reviews & view recent transactions</h3>
              <div className="search-wrapper">
                <Search />
                <button className="search_icon1">
                  <img src={searchIcon} />
                </button>
              </div>
            </div>
            <div className="header-center-bottom">
              <p className="tread">SHARE YOUR VIEWS WITH US</p>
              <div class="header-center-btn-wrapper">
                <button className="btnread" onClick={this.onButtonClick}>
                  <img className="smallimg" src={Star} />
                  <span>ADD REVIEW </span>
                </button>
                {this.state.showComponent && (
                  <WriteReview
                    showreviewstatus={this.showreviewstatus.bind(this)}
                    onClose={this.onClose.bind(this)}
                    loggedinuseremail={this.state.loggedinuseremail}
                    loginHandler={this.loginHandler.bind(this)}
                    loginsuccess={this.loginsuccess}
                  />
                )}
                <button className="btnread2" onClick={this.onPostPicture}>
                  <img className="smallimg" src={Camera} />
                  POST A PICTURE{" "}
                </button>
                {this.state.showComponent1 && (
                  <PostAPicture
                    onClose={this.onClose.bind(this)}
                    loggedinuseremail={this.state.loggedinuseremail}
                    loginsuccess={this.loginsuccess}
                    showpicturestatus={this.showpicturestatus.bind(this)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="header-right-left">
              <div onClick={this.location_dropdownMenu} className="headmumbai">
                {this.state.city ? (
                  this.state.city
                ) : this.state.geostate ? (
                  this.state.geostate
                ) : (
                  <Geo New={this.New.bind(this)} />
                )}
                <img
                  className="location_dropdown"
                  src={location_dropdownIcon}
                />
                <div ref={this.setWrapperRef}>
                  {this.state.locationDrop && (
                    <Location_drop
                      myChangeHandler={this.myChangeHandler.bind(this)}
                    />
                  )}
                </div>
              </div>
              {this.state.loggedin ? (
                <div className="icon-status-container">
                  <span className="usericon1">
                    <img src={user} />
                  </span>
                  {login_status}
                </div>
              ) : (
                <a onClick={this.signup} >
                  <img src={user} className="usericon1" />
                </a>
              )}

              {/* {login_status} */}
              {/* <div ref={this.setWrapperRef}>
                {this.state.locationDrop && (
                  <Location_drop
                    myChangeHandler={this.myChangeHandler.bind(this)}
                  />
                )}
              </div> */}
              {
                this.state.signupComponent && (
                  <SignUp
                    loginHandler={this.loginHandler.bind(this)}
                    loginsuccess={this.loginsuccess}
                    close={this.close}
                    mobilesignup={this.mobilesignup}
                    opennotif={this.opennotif}
                  />
                )
                //<Login/>
                // <MobileSignup/>
              }
              {this.state.loginComponent && (
                <Login
                  signupHandler={this.signupHandler.bind(this)}
                  loginsuccess={this.loginsuccess}
                  close={this.close}
                />
              )}

              {this.state.mloginComponent && (
                <MobileSignup
                  openlogin1={this.openlogin1}
                  loginsuccess={this.loginsuccess}
                  close={this.close}
                />
              )}

              {this.state.registerComponent && (
                <Registration
                  registerHandler={this.registerHandler.bind(this)}
                />
              )}
            </div>
            <div className="header-right-right">
              <h3 className="followus">Follow Us</h3>
              <ul>
                <li>
                  <a href="https://www.instagram.com/propviewz/">
                    <img src={insta} className="insta" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/propviewz/?modal=admin_todo_tour">
                    <img src={fb} className="fb" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/propviewz">
                    <img src={twitter} className="twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://in.pinterest.com/PROPVIEWZ/">
                    <img src={pinterest} className="pinterest" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/68974999/">
                    <img src={linkedin} className="linkedin_white" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* <Navi/> */}
        {/* <Sticky > */}
        {/* <div className="staticmenu"> */}

        <DashboardNavBar sectionRefs={this.sectionRefs} />

        {/* </div> */}
        {/* </Sticky> */}

        <div ref={this.mosttrend} id="mosttrend">
          <div className="col-8 sideheadings">
            <div className="sidetitle SidemainHeading">
              <div className="greybox1"></div>
              <h3 className="navrowtitletextmosttrend">
                &nbsp;MOST TRENDING&nbsp;
              </h3>
              <div className="greybox2mosttrend"></div>
            </div>
          </div>
          <div className="col-12 most">
            <div className="responsive_grids">
              <div className="grid-container3">
                {this.state.projectmedia && (
                  <a href={"/projects/" + project_id} className="anchorstyle">
                    <div className="boxD">
                      <div className="imageframeD">
                        <img
                          className="imageboxD"
                          src={
                            this.state.projectmedia
                              ? this.state.projectmedia[0].media_link
                              : null
                          }
                        />
                        <div className="paraplacestatus_rec">
                          {this.state.projectmedia
                            ? this.state.projectmedia[0].construction_status ==
                              "Ready Possession"
                              ? "READY"
                              : this.state.projectmedia[0].construction_status.toUpperCase()
                            : this.state.projectmedia[0].construction_status.toUpperCase()}
                        </div>
                        <div className="paraplaceD">
                          {this.state.projectmedia
                            ? this.state.projectmedia[0].area
                            : null}
                        </div>
                      </div>
                      <div className="contentframeD">
                        <p className="paraheadingDash">
                          {this.state.projectmedia
                            ? this.state.projectmedia[0].project_name
                            : null}
                        </p>
                        <div className="row">
                          <div className="parastarD">
                            <StarRatings
                              rating={Math.round(overall * 100) / 100}
                              starRatedColor="#FFFFFF"
                              starEmptyColor="#202020"
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              starDimension="1.2vw"
                              name="rating"
                              starSpacing="0.2vw"
                            />
                          </div>
                        </div>
                        <div className="parasubD">
                          {Math.round(overall * 100) / 100}(
                          {this.state.projectmedia
                            ? this.state.projectmedia[0].reviews
                            : null}{" "}
                          Reviews)
                        </div>
                      </div>
                    </div>
                  </a>
                )}
                {this.state.projectmedia && (
                  <a href={"/projects/" + project_id1} className="anchorstyle">
                    <div className="boxD">
                      <div className="imageframeD">
                        <img
                          className="imageboxD"
                          src={
                            this.state.projectmedia
                              ? this.state.projectmedia[1].media_link
                              : null
                          }
                        />
                        <div className="paraplacestatus_rec">
                          {this.state.projectmedia
                            ? this.state.projectmedia[1].construction_status ==
                              "Ready Possession"
                              ? "READY"
                              : this.state.projectmedia[1].construction_status.toUpperCase()
                            : this.state.projectmedia[1].construction_status.toUpperCase()}
                        </div>
                        <div className="paraplaceD">
                          {this.state.projectmedia
                            ? this.state.projectmedia[1].area
                            : null}
                        </div>
                      </div>
                      <div className="contentframeD">
                        <p className="paraheadingDash">
                          {this.state.projectmedia
                            ? this.state.projectmedia[1].project_name
                            : null}
                        </p>
                        <div className="row">
                          <div className="parastarD">
                            <StarRatings
                              rating={Math.round(overall1 * 100) / 100}
                              starRatedColor="#FFFFFF"
                              starEmptyColor="#202020"
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              starDimension="1.2vw"
                              name="rating"
                              starSpacing="0.2vw"
                            />
                          </div>
                        </div>
                        <div className="parasubD">
                          {Math.round(overall1 * 100) / 100}(
                          {this.state.projectmedia
                            ? this.state.projectmedia[1].reviews
                            : null}{" "}
                          Reviews)
                        </div>
                        {/* <div  className="parasubD">{this.state.projectmedia?this.state.projectmedia[1].location:null},{this.state.projectmedia?this.state.projectmedia[1].city:null}</div> */}
                      </div>
                    </div>
                  </a>
                )}
                {this.state.projectmedia && (
                  <a href={"/projects/" + project_id2} className="anchorstyle">
                    <div className="boxD">
                      <div className="imageframeD">
                        <img
                          className="imageboxD"
                          src={
                            this.state.projectmedia
                              ? this.state.projectmedia[2].media_link
                              : null
                          }
                        />
                        <div className="paraplacestatus_rec">
                          {this.state.projectmedia
                            ? this.state.projectmedia[2].construction_status ==
                              "Ready Possession"
                              ? "READY"
                              : this.state.projectmedia[2].construction_status.toUpperCase()
                            : this.state.projectmedia[2].construction_status.toUpperCase()}
                        </div>
                        <div className="paraplaceD">
                          {this.state.projectmedia
                            ? this.state.projectmedia[2].area
                            : null}
                        </div>
                      </div>
                      <div className="contentframeD">
                        <p className="paraheadingDash">
                          {this.state.projectmedia
                            ? this.state.projectmedia[2].project_name
                            : null}
                        </p>
                        <div className="row">
                          <div className="parastarD">
                            <StarRatings
                              rating={Math.round(overall2 * 100) / 100}
                              starRatedColor="#FFFFFF"
                              starEmptyColor="#202020"
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              starDimension="1.2vw"
                              name="rating"
                              starSpacing="0.2vw"
                            />
                          </div>
                        </div>
                        <div className="parasubD">
                          {Math.round(overall2 * 100) / 100}(
                          {this.state.projectmedia
                            ? this.state.projectmedia[2].reviews
                            : null}{" "}
                          Reviews)
                        </div>
                        {/* <div  className="parasubD">{this.state.projectmedia?this.state.projectmedia[2].location:null},{this.state.projectmedia?this.state.projectmedia[2].city:null}</div> */}
                      </div>
                    </div>{" "}
                  </a>
                )}
                {this.state.projectmedia && (
                  <a href={"/projects/" + project_id3} className="anchorstyle">
                    <div className="boxD">
                      <div className="imageframeD">
                        <img
                          className="imageboxD"
                          src={
                            this.state.projectmedia
                              ? this.state.projectmedia[3].media_link
                              : null
                          }
                        />
                        <div className="paraplacestatus_rec">
                          {this.state.projectmedia
                            ? this.state.projectmedia[3].construction_status ==
                              "Ready Possession"
                              ? "READY"
                              : this.state.projectmedia[3].construction_status.toUpperCase()
                            : this.state.projectmedia[3].construction_status.toUpperCase()}
                        </div>
                        <div className="paraplaceD">
                          {this.state.projectmedia
                            ? this.state.projectmedia[3].area
                            : null}
                        </div>
                      </div>
                      <div className="contentframeD">
                        <p className="paraheadingDash">
                          {this.state.projectmedia
                            ? this.state.projectmedia[3].project_name
                            : null}
                        </p>
                        <div className="row">
                          <div className="parastarD">
                            <StarRatings
                              rating={Math.round(overall3 * 100) / 100}
                              starRatedColor="#FFFFFF"
                              starEmptyColor="#202020"
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              starDimension="1.2vw"
                              name="rating"
                              starSpacing="0.2vw"
                            />
                          </div>
                        </div>
                        <div className="parasubD">
                          {Math.round(overall3 * 100) / 100}(
                          {this.state.projectmedia
                            ? this.state.projectmedia[3].reviews
                            : null}{" "}
                          Reviews)
                        </div>
                        {/* <div  className="parasubD">{this.state.projectmedia?this.state.projectmedia[3].location:null},{this.state.projectmedia?this.state.projectmedia[3].city:null}</div> */}
                      </div>
                    </div>
                  </a>
                )}
                {this.state.projectmedia && (
                  <a href={"/projects/" + project_id4} className="anchorstyle">
                    <div className="boxD">
                      <div className="imageframeD">
                        <img
                          className="imageboxD"
                          src={
                            this.state.projectmedia
                              ? this.state.projectmedia[4].media_link
                              : null
                          }
                        />
                        <div className="paraplacestatus_rec">
                          {this.state.projectmedia
                            ? this.state.projectmedia[4].construction_status ==
                              "Ready Possession"
                              ? "READY"
                              : this.state.projectmedia[4].construction_status.toUpperCase()
                            : this.state.projectmedia[4].construction_status.toUpperCase()}
                        </div>
                        <div className="paraplaceD">
                          {this.state.projectmedia
                            ? this.state.projectmedia[4].area
                            : null}
                        </div>
                      </div>
                      <div className="contentframeD">
                        <p className="paraheadingDash">
                          {this.state.projectmedia
                            ? this.state.projectmedia[4].project_name
                            : null}
                        </p>
                        <div className="row">
                          <div className="parastarD">
                            <StarRatings
                              rating={Math.round(overall4 * 100) / 100}
                              starRatedColor="#FFFFFF"
                              starEmptyColor="#202020"
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              starDimension="1.2vw"
                              name="rating"
                              starSpacing="0.2vw"
                            />
                          </div>
                        </div>
                        <div className="parasubD">
                          {Math.round(overall4 * 100) / 100}(
                          {this.state.projectmedia
                            ? this.state.projectmedia[4].reviews
                            : null}{" "}
                          Reviews)
                        </div>
                        {/* <div  className="parasubD">{this.state.projectmedia?this.state.projectmedia[4].location:null},{this.state.projectmedia?this.state.projectmedia[4].city:null}</div> */}
                      </div>
                    </div>{" "}
                  </a>
                )}
                {this.state.projectmedia && (
                  <a href={"/projects/" + project_id5} className="anchorstyle">
                    <div className="boxD">
                      <div className="imageframeD">
                        <img
                          className="imageboxD"
                          src={
                            this.state.projectmedia
                              ? this.state.projectmedia[5].media_link
                              : null
                          }
                        />
                        <div className="paraplacestatus_rec">
                          {this.state.projectmedia
                            ? this.state.projectmedia[5].construction_status ==
                              "Ready Possession"
                              ? "READY"
                              : this.state.projectmedia[5].construction_status.toUpperCase()
                            : this.state.projectmedia[5].construction_status.toUpperCase()}
                        </div>
                        <div className="paraplaceD">
                          {this.state.projectmedia
                            ? this.state.projectmedia[5].area
                            : null}
                        </div>
                      </div>
                      <div className="contentframeD">
                        <p className="paraheadingDash">
                          {this.state.projectmedia
                            ? this.state.projectmedia[5].project_name
                            : null}
                        </p>
                        <div className="row">
                          <div className="parastarD">
                            <StarRatings
                              rating={Math.round(overall5 * 100) / 100}
                              starRatedColor="#FFFFFF"
                              starEmptyColor="#202020"
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              starDimension="1.2vw"
                              name="rating"
                              starSpacing="0.2vw"
                            />
                          </div>
                        </div>
                        <div className="parasubD">
                          {Math.round(overall5 * 100) / 100}(
                          {this.state.projectmedia
                            ? this.state.projectmedia[5].reviews
                            : null}{" "}
                          Reviews)
                        </div>
                        {/* <div  className="parasubD">{this.state.projectmedia?this.state.projectmedia[5].location:null},{this.state.projectmedia?this.state.projectmedia[5].city:null}</div> */}
                      </div>
                    </div>{" "}
                  </a>
                )}
              </div>

              <div className="col-10 seemore_web" onClick={this.seeMoreHandler}>
                See More
              </div>

              <div className=" grid1">
                {this.state.projectmedia && (
                  <a href={"/projects/" + project_id} className="anchorstyle">
                    <div className="boxD_trend">
                      <div className="imageframeD_trend">
                        <img
                          className="imageboxD_trend"
                          src={
                            this.state.projectmedia
                              ? this.state.projectmedia[0].media_link
                              : null
                          }
                        />
                        <div className="paraplacestatus_rec">
                          {this.state.projectmedia
                            ? this.state.projectmedia[0].construction_status ==
                              "Ready Possession"
                              ? "READY"
                              : this.state.projectmedia[0].construction_status.toUpperCase()
                            : this.state.projectmedia[0].construction_status.toUpperCase()}
                        </div>
                        <div className="paraplaceD_trend">
                          {this.state.projectmedia
                            ? this.state.projectmedia[0].area
                            : null}
                        </div>
                      </div>
                      <div className="contentframeD_trend">
                        <p className="paraheadingDash_trend">
                          {this.state.projectmedia
                            ? this.state.projectmedia[0].project_name
                            : null}
                        </p>
                        <div className="row">
                          <div className="parastarD_trend">
                            <StarRatings
                              rating={Math.round(overall * 100) / 100}
                              starRatedColor="#FFFFFF"
                              starEmptyColor="#202020"
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              starDimension="25px"
                              name="rating"
                              starSpacing="2px"
                            />
                          </div>
                        </div>
                        <div className="parasubD_trend">
                          {Math.round(overall * 100) / 100}(
                          {this.state.projectmedia
                            ? this.state.projectmedia[0].reviews
                            : null}{" "}
                          Reviews)
                        </div>
                      </div>
                    </div>
                  </a>
                )}
                {this.state.projectmedia && (
                  <a href={"/projects/" + project_id1} className="anchorstyle">
                    <div className="boxD_trend">
                      <div className="imageframeD_trend">
                        <img
                          className="imageboxD_trend"
                          src={
                            this.state.projectmedia
                              ? this.state.projectmedia[1].media_link
                              : null
                          }
                        />
                        <div className="paraplacestatus_rec">
                          {this.state.projectmedia
                            ? this.state.projectmedia[1].construction_status ==
                              "Ready Possession"
                              ? "READY"
                              : this.state.projectmedia[1].construction_status.toUpperCase()
                            : this.state.projectmedia[1].construction_status.toUpperCase()}
                        </div>
                        <div className="paraplaceD_trend">
                          {this.state.projectmedia
                            ? this.state.projectmedia[1].area
                            : null}
                        </div>
                      </div>
                      <div className="contentframeD_trend">
                        <p className="paraheadingDash_trend">
                          {this.state.projectmedia
                            ? this.state.projectmedia[1].project_name
                            : null}
                        </p>
                        <div className="row">
                          <div className="parastarD_trend">
                            <StarRatings
                              rating={Math.round(overall1 * 100) / 100}
                              starRatedColor="#FFFFFF"
                              starEmptyColor="#202020"
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              starDimension="25px"
                              name="rating"
                              starSpacing="2px"
                            />
                          </div>
                        </div>
                        <div className="parasubD_trend">
                          {Math.round(overall1 * 100) / 100}(
                          {this.state.projectmedia
                            ? this.state.projectmedia[1].reviews
                            : null}{" "}
                          Reviews)
                        </div>
                        {/* <div  className="parasubD">{this.state.projectmedia?this.state.projectmedia[1].location:null},{this.state.projectmedia?this.state.projectmedia[1].city:null}</div> */}
                      </div>
                    </div>
                  </a>
                )}
                {this.state.projectmedia && (
                  <a href={"/projects/" + project_id2} className="anchorstyle">
                    <div className="boxD_trend">
                      <div className="imageframeD_trend">
                        <img
                          className="imageboxD_trend"
                          src={
                            this.state.projectmedia
                              ? this.state.projectmedia[2].media_link
                              : null
                          }
                        />
                        <div className="paraplacestatus_rec">
                          {this.state.projectmedia
                            ? this.state.projectmedia[2].construction_status ==
                              "Ready Possession"
                              ? "READY"
                              : this.state.projectmedia[2].construction_status.toUpperCase()
                            : this.state.projectmedia[2].construction_status.toUpperCase()}
                        </div>
                        <div className="paraplaceD_trend">
                          {this.state.projectmedia
                            ? this.state.projectmedia[2].area
                            : null}
                        </div>
                      </div>
                      <div className="contentframeD_trend">
                        <p className="paraheadingDash_trend">
                          {this.state.projectmedia
                            ? this.state.projectmedia[2].project_name
                            : null}
                        </p>
                        <div className="row">
                          <div className="parastarD_trend">
                            <StarRatings
                              rating={Math.round(overall2 * 100) / 100}
                              starRatedColor="#FFFFFF"
                              starEmptyColor="#202020"
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              starDimension="25px"
                              name="rating"
                              starSpacing="2px"
                            />
                          </div>
                        </div>
                        <div className="parasubD_trend">
                          {Math.round(overall2 * 100) / 100}(
                          {this.state.projectmedia
                            ? this.state.projectmedia[2].reviews
                            : null}{" "}
                          Reviews)
                        </div>
                        {/* <div  className="parasubD">{this.state.projectmedia?this.state.projectmedia[2].location:null},{this.state.projectmedia?this.state.projectmedia[2].city:null}</div> */}
                      </div>
                    </div>{" "}
                  </a>
                )}

                <div className="seemore" onClick={this.seeMoreHandler}>
                  See More
                </div>
              </div>
            </div>
            {/* up */}
            <div className="col-3 webBanner" style={{ marginLeft: "1vw" }}>
              {" "}
              <img width="100%" src={Dashbannerweb} />
            </div>
          </div>
        </div>

        {/* <div style={{'position': 'absolute','overflow': 'hidden','top':'754px'}}><TopRated/></div> */}

        {/* change */}
        <div className="dashbordbannermob">
          <div className="col-8 sideheadings">
            <div className="sidetitle SidemainHeading">
              <div className="greybox1"></div>
              <h3 className="navrowtitletexttop">&nbsp;Ads&nbsp;</h3>
              <div className="greybox2top"></div>
            </div>
          </div>
          <div className="container-fluid">
            <img
              width="100%"
              style={{ marginTop: "5%", marginBottom: "5%" }}
              src={Dashbanner}
            />
          </div>
        </div>
        {/* change over */}

        <div ref={this.toprated} id="toprated">
          {/* <Sticky> */}
          <div className="col-8 sideheadings">
            <div className="sidetitle SidemainHeading">
              <div className="greybox1"></div>
              <h3 className="navrowtitletexttop">&nbsp;TOP RATED&nbsp;</h3>
              <div className="greybox2top"></div>
            </div>
          </div>
          {/* </Sticky> */}
          <TopRated
            city={this.state.city}
            geostate={this.state.geostate}
            projectmedia={this.state.topprojectmedia}
          />
        </div>
        <div ref={this.newdevelop} id="newdevelop">
          {/* <Sticky> */}
          <div className="col-8 sideheadings">
            <div className="sidetitle SidemainHeading">
              <div className="greybox1"></div>
              <h3 className="navrowtitletextnew">
                &nbsp;RECENTLY LAUNCHED&nbsp;
              </h3>
              <div className="greybox2new"></div>
            </div>
          </div>
          {/* </Sticky> */}
          <NewDevelopment
            city={this.state.city}
            geostate={this.state.geostate}
            projectmedia={this.state.recentprojectmedia}
          />
        </div>
        {/* </div> */}
        <div ref={this.blogs} id="blogs">
          {/* <Sticky> */}
          <div className="col-sm-8 sideheadings">
            <div className="sidetitle SidemainHeading">
              <div className="greybox1"></div>
              <h3 className="navrowtitletextblog">&nbsp;OUR BLOGS&nbsp;</h3>
              <div className="greybox2blog"></div>
            </div>
          </div>
          {/* </Sticky> */}
          <Blog />
        </div>
        <NewsLetter />
        {/* <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> */}
        <Footer />
      </>
    );
  }
}
// }

export default Dashboard;
