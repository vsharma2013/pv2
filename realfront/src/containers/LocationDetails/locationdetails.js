/* 
LocationDetails JS 
*/
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import '../Projects/projects.css'
// import { Container, Row, Col } from 'react-bootstrap';
import React from "react";
// import logo from '../logo.svg';
import user from "./assets/user.png";
import projectcoverphoto from "./assets/projectcoverphoto.png";
// import sideprojectimages from './assets/sideprojectimages.png';
// import reading from './assets/reading.png';
import "./locationdetails.css";
import StarRatingComponent from "react-star-rating-component";
import downarrow from "./assets/down.png";
import uparrow from "./assets/up.png";
import share from "./assets/share.png";

import moment from 'moment'

import comment from "./assets/comment.png";

import AdImage from '../../assets/images/bannerweb.png';

import AdImagemob from '../../assets/images/bannermob.png';


import LogoIcon from "../../assets/icons/logo.png";
import underconstruction from "./assets/underconstruction.jpg";
import followup from "./assets/followup.png";
import sideprojectimages from "./assets/sideprojectimages.png";
import usericon from "./assets/usericon.png";
import swimming from "./assets/swimming.png";
import gym from "./assets/gym.png";
import kidsplay from "./assets/kidsplay.png";
import garden from "./assets/garden.png";
import outdoor from "./assets/outdoor.png";
import indoor from "./assets/indoor.png";
import mumbaiback from "./assets/mumbaiback.jpg";
import more from "./assets/more.png";
import footerback from "./assets/footerback.png";
// import insta from '../../assets/icons/insta.png';
// import fb from '../../assets/icons/fb.png';
// import twitter from '../../assets/icons/twitter.png';
// import pinterest from '../../assets/icons/pinterest.png';
import map from "./assets/map.png";
import developer from "./assets/developer.png";
import managementphoto from "./assets/managementphoto.png";
import userphoto from "./assets/userphoto.png";
import floorphoto from "./assets/floorphoto.png";
import addimage from "./assets/add.png";
import noimage from "../../assets/images/noimage.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import thumb from "./assets/thumb.png";
import redflag from "./assets/redflag.png";
import StarRatings from "react-star-ratings";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import Tabs, { Tab } from "react-awesome-tabs";
import Search from "../../components/Search/search";
import Footer from "../../components/footer";
import StackGrid from "react-stack-grid";
import MapLocations from "../../components/MapLocations/MapLocations";
import LocationRatings from "../../components/LocationRatings/LocationRatings";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem, Divider } from "rc-menu";
import menu1icon from "../../assets/icons/menu1.png";
import menu2icon from "../../assets/icons/menu2.png";
import { Button, Modal } from "react-bootstrap";
import Facebook from "../../assets/icons/fb1.png";
import Google from "../../assets/icons/google.png";
import Linkedin from "../../assets/icons/linkedin.png";
import closeIcon from "../../assets/icons/close.png";
import LocationPostAPic from "../../components/LocationPostAPic/LocationPostAPic";
import SignUp from "../../components/SignUp/signup";
import Login from "../../components/Login/login";
// import MobileSignup from '../components/MobileSignup/mobilesignup';
import MobileSignup from "../../components/MobileSignup/mobilesignup";
import Registration from "../../components/Registration/registration";
import direction from "./assets/direction.png";
import searchIcon from "../../assets/icons/search.png";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import LogoIconMobile from "../../assets/icons/logo_mobile.png";
import NavBarMenu from "./NavBarMenu";
import imageCompression from "browser-image-compression";
let helpful_id = [];
let localhelp;
let LoggedIn = "";
let LoggedInUserEmail = "";

class LocationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectmedia: "",
      locationdetails: "",
      reviewdetails: "",
      projectinfo: "",
      projecttransaction: "",
      suggestedproject: "",
      projectamenities: "",
      developerinfo: "",
      menu1: "red",
      menu2: "",
      menu3: "",
      sort: false,
      itemsToShow: 3,
      expanded: false,
      activeTab: 0,
      menutext1: "white",
      menutext2: "black",
      menutext3: "black",
      showReview: false,
      rating: 0,
      rating1: 0,
      rating2: 0,
      rating3: 0,
      rating4: 0,
      rating5: 0,
      drag1: [],
      selected_imagefile: [],
      photoText: "",
      email: "",
      loggedinuseremail: "",
      className: "drop-zone-show_det",
      submitted: false,
      formdata: "",
      showPostPicture: false,
      loginComponent: false,
      signupComponent: false,
      mloginComponent: false,
      registerComponent: false,
      loggedin: false,

      loggedinusername: "",

      managementmedia: "",
      carouseldisplay: "",
      managementmedia: "",
      displaymanagement: false,
      displayuser: false,
      nouserimagefound: false,
      usermedia: "",
      photoIndex: 0,
      photoIndex1: 0,
      isOpen: false,
      isOpen1: false,
      formdata: "",
      shownotifproject: false,
      shownotifstatus: false,
      shownotifrating: false,
      shownotifemail_phone: false,
      shownotifemailname: false,
      shownotifpassword: false,
      shownotifotp: false,
      shownotifphonename: false,
      passworderror: false,
      reviewsubmiterror: false,
      otperror: false,
      email_phone: "",
      showpasswordfield: false,
      showemailnamefield: false,
      showotpfield: false,
      showphonenamefield: false,
      password: "",
      username: "",
      otp: "",
      phonename: "",
      // normal:true,
      // previmg:false,
      // nextimg:false
    };
    this.AddReviewModel = this.AddReviewModel.bind(this);
    this.PostPictureModel = this.PostPictureModel.bind(this);
    this.onCloseb = this.onCloseb.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onDragEnter = this._onDragEnter.bind(this);
    this._onDragLeave = this._onDragLeave.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this.changeImageTitle = this.changeImageTitle.bind(this);

    // this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.signup = this.signup.bind(this);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.openlogin1 = this.openlogin1.bind(this);
    this.loginsuccess = this.loginsuccess.bind(this);
    this.mobilesignup = this.mobilesignup.bind(this);
    this.opennotif = this.opennotif.bind(this);
    this.close = this.close.bind(this);
    this.closenotif = this.closenotif.bind(this);
    this.showreviewstatus = this.showreviewstatus.bind(this);
    this.showpicturestatus = this.showpicturestatus.bind(this);
    // this.previmg = this.previmg.bind(this);

    this.ratingdivRef = React.createRef();
    this.reviewdivRef = React.createRef();
    this.trendingdivRef = React.createRef();
    this.trendingdivRef2 = React.createRef();

    this.sectionRefs = [
      { section: "ratingdiv", ref: this.ratingdivRef },
      { section: "reviewdiv", ref: this.reviewdivRef },
      { section: "trendingdiv", ref: this.trendingdivRef },
      { section: "trendingdiv", ref: this.trendingdivRef2 },
    ];
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("MATHEWSUBMIT");
    console.log(this.state);
    const fd = new FormData();
    fd.append(
      "location_id",
      this.state.search_id
        ? this.state.search_id
        : this.props.match.params.location_id
        ? this.props.match.params.location_id
        : "2"
    );
    fd.append(
      "location_name",
      this.state.search_name
        ? this.state.search_name
        : this.state.locationalllinksdetails
        ? this.state.locationalllinksdetails[0].area
        : null
    );
    if (this.state.drag1.length) {
      for (let i = 0; i < this.state.drag1.length; i++) {
        fd.append("review_media", this.state.drag1[i]);
        fd.append("review_media_text", this.state.drag1[i].photoText)

      }
    } else {
      for (let i = 0; i < this.state.selected_imagefile.length; i++) {
        fd.append("review_media", this.state.selected_imagefile[i]);
        fd.append("review_media_text", this.state.selected_imagefile[i].photoText)

      }
    }
    fd.append("overall_rating", this.state.rating);
    fd.append("social_appeal", this.state.rating1);
    fd.append("schools", this.state.rating2);
    fd.append("malls", this.state.rating3);
    fd.append("medical", this.state.rating4);
    fd.append("transport", this.state.rating5);
    fd.append("review_title", this.state.review);
    fd.append("review", this.state.experience);
    fd.append(
      "reviewer_email",
      this.state.loggedinuseremail
        ? this.state.loggedinuseremail
        : "mathewuser@comportement.in"
    );

    console.log("MATHEW");
    console.log(fd);
    axios.post(
      "https://www.propviewz.com/be/save_location_review/",
      fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("i got called");
    alert("Review has been submitted");
    console.log(this.state);
    console.log(this.state.experience);

    this.setState({
      name: "",
      status: "",
      rating: 0,
      rating1: 0,
      rating2: 0,
      rating3: 0,
      rating4: 0,
      rating5: 0,
      review: "",
      experience: "",
      drag1: [],
      selected_imagefile: [],
      email: "",
      submitted: true,
    });
  }

  AddReviewModel() {
    console.log("Add review function");
    this.setState({
      showReview: !this.state.showReview,
      drag1: []
    });
  }
  PostPictureModel() {
    console.log("posttt");
    this.setState({
      showPostPicture: true,
    });
  }

  getPositionlongitude(s) {
    // var maplink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7777.678540293056!2d77.6153493503024!3d12.918049989780634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14559a0550cb%3A0xd34d84a4d288974e!2sSpurthy%20Hospital!5e0!3m2!1sen!2sin!4v1596102074029!5m2!1sen!2sin";
    var a1 = "2d";
    var b1 = "!";
    var p1 = s.indexOf(a1) + a1.length;
    var longitude = s.substring(p1, s.indexOf(b1, p1));
    return longitude;
  }

  getPositionlatitude(s) {
    // var maplink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7777.678540293056!2d77.6153493503024!3d12.918049989780634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14559a0550cb%3A0xd34d84a4d288974e!2sSpurthy%20Hospital!5e0!3m2!1sen!2sin!4v1596102074029!5m2!1sen!2sin";
    var a = "3d";
    var b = "!";
    var p = s.indexOf(a) + a.length;
    var latitude = s.substring(p, s.indexOf(b, p));
    return latitude;
  }

  handleTabSwitch(active) {
    this.setState({ activeTab: active });
  }

  helpfulclick(reviewid) {
    let votedid = localStorage.getItem("location_helpfulid");
    votedid = JSON.parse(votedid);
    votedid.push(reviewid);
    localStorage.setItem("location_helpfulid", JSON.stringify(votedid));
    console.log(JSON.parse(localStorage.getItem("location_helpfulid")));
    this.setState({ helpful_id: helpful_id });
    alert("voted");
    let success = axios.get(
      `https://www.propviewz.com/be/helpful_review/` + reviewid
    );
    console.log(success);
  }

  copyToClipboard(id) {
    var textField = document.createElement("textarea");
    let location1 = location.href;
    var n = location1.indexOf("#");
    if (n != -1) {
      location1 = location1.substring(0, location1.indexOf("#"));
    }
    let code = location1 + "#" + id;
    // console.log(code)
    textField.innerText = code;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    alert("Link Copied");
  }

  showMore = () => {
    this.state.itemsToShow === 3
      ? this.setState({
          itemsToShow: this.state.reviewdetails.length,
          expanded: true,
        })
      : this.setState({ itemsToShow: 3, expanded: false });
  };

  togglesort = () => {
    if (this.state.sort === true) {
      this.setState((prevState) => {
        this.state.reviewdetails.sort(
          (a, b) => new Date(a.review_date) - new Date(b.review_date)
        );
      });
    } else {
      this.setState((prevState) => {
        this.state.reviewdetails.sort(
          (a, b) => new Date(b.review_date) - new Date(a.review_date)
        );
      });
    }
    this.setState((state) => ({ sort: !state.sort }));
  };

  // colorchange(number, e) {
  //   e.preventDefault();
  //   if (number === 1) {
  //     this.setState({
  //       menu1: "red",
  //       menu2: "transparent",
  //       menu3: "transparent",
  //       menutext1: "white",
  //       menutext2: "black",
  //       menutext3: "black",
  //     });
  //     var elmntToView = document.getElementById("ratingdiv");
  //     elmntToView.scrollIntoView();
  //   } else if (number === 2) {
  //     this.setState({
  //       menu1: "transparent",
  //       menu2: "red",
  //       menu3: "transparent",
  //       menutext1: "black",
  //       menutext2: "white",
  //       menutext3: "black",
  //     });
  //     var elmntToView = document.getElementById("reviewdiv");
  //     elmntToView.scrollIntoView();
  //   } else if (number === 3) {
  //     this.setState({
  //       menu1: "transparent",
  //       menu2: "transparent",
  //       menu3: "red",
  //       menutext1: "black",
  //       menutext2: "black",
  //       menutext3: "white",
  //     });
  //     var elmntToView = document.getElementById("trendingdiv");
  //     elmntToView.scrollIntoView();
  //     var elmntToView = document.getElementById("trendingdiv1");
  //     elmntToView.scrollIntoView();
  //   } else {
  //   }
  // }

  locationdetails = async () => {
    try {
      const { location_id } = this.props.match.params;
      console.log(location_id);
      //dev
      //   let projectdetails = await axios.get(`http://localhost:8081/project_details/`+project_id);
      //aws
      let locationdetails = await axios.get(
        `https://www.propviewz.com/be/location_page_area_details/` + location_id
      );
      console.log("location Detail DATA");
      console.log(locationdetails.data);

      if (locationdetails.data.length > 0) {
        this.setState({ locationdetails: locationdetails.data });
      } else {
        window.location.replace("/404");
      }
    } catch (e) {
      console.log(e);
    }
  };

  reviewdetails = async () => {
    try {
      const { location_id } = this.props.match.params;
      //dev
      //  let reviewdetails = await axios.get(`http://localhost:8081/project_review/`+project_id);
      //aws
      let reviewdetails = await axios.get(
        `https://www.propviewz.com/be/location_page_location_review/` +
          location_id
      );
      console.log("Review DATA");
      console.log(reviewdetails.data);
      this.setState({ reviewdetails: reviewdetails.data });
    } catch (e) {
      console.log(e);
    }
  };

  trendingprojectdetails = async () => {
    try {
      const { location_id } = this.props.match.params;
      //dev
      //  let reviewdetails = await axios.get(`http://localhost:8081/project_review/`+project_id);
      //aws
      let trendingprojectdetails = await axios.get(
        `https://www.propviewz.com/be/location_page_trending_projects/` +
          location_id
      );
      console.log("location_page_trending_projects DATA");
      console.log(trendingprojectdetails.data);
      this.setState({ trendingprojectdetails: trendingprojectdetails.data });
    } catch (e) {
      console.log(e);
    }
  };

  locationalllinksdetails = async () => {
    try {
      const { location_id } = this.props.match.params;
      //dev
      //  let reviewdetails = await axios.get(`http://localhost:8081/project_review/`+project_id);
      //aws
      let locationalllinksdetails = await axios.get(
        `https://www.propviewz.com/be/location_page_map_link/` + location_id
      );
      console.log("location_page_all_map_links DATA");
      console.log(locationalllinksdetails.data);
      this.setState({ locationalllinksdetails: locationalllinksdetails.data });
    } catch (e) {
      console.log(e);
    }
  };

  projectmediafetch = async () => {
    try {
      const { location_id } = this.props.match.params;
      //dev
      // let projectmedia = await axios.get(`http://localhost:8081/project_media/`+project_id);
      //aws
      let projectmedia = await axios.get(
        `https://www.propviewz.com/be/fetch_management_media_for_location_page/` +
          location_id
      );
      let userphotomedia = await axios.get(
        `https://www.propviewz.com/be/fetch_user_media_for_location_page/` +
          location_id
      );
      console.log("Media DATA");
      console.log(userphotomedia.data);
      console.log(projectmedia.data);
      this.setState({
        projectmedia: projectmedia.data,
        managementphotomedia: projectmedia.data,
        userphotomedia: userphotomedia.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  managementmediafetch = async () => {
    try {
      if (this.state.managementmedia === "") {
        const { location_id } = this.props.match.params;
        //dev
        // let projectmedia = await axios.get(`http://localhost:8081/project_media/`+project_id);
        //aws
        let managementmedia = await axios.get(
          `https://www.propviewz.com/be/fetch_management_media_for_location_page/` +
            location_id
        );

        console.log("management Media DATA");
        console.log(managementmedia);

        this.setState({
          managementmedia: managementmedia.data,
          carouseldisplay: managementmedia.data,
          displaymanagement: true,
          displayuser: false,
        });
      } else {
        this.setState({
          carouseldisplay: this.state.managementmedia,
          displaymanagement: true,
          displayuser: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  usermediafetch = async () => {
    try {
      if (this.state.usermedia === "") {
        const { location_id } = this.props.match.params;
        //dev
        // let projectmedia = await axios.get(`http://localhost:8081/project_media/`+project_id);
        //aws
        let usermedia = await axios.get(
          `https://www.propviewz.com/be/fetch_user_media_for_location_page/` +
            location_id
        );

        console.log("user Media DATA");
        console.log(usermedia);

        if (usermedia.data.length > 0) {
          this.setState({
            usermedia: usermedia.data,
            carouseldisplay: usermedia.data,
            displaymanagement: false,
            displayuser: true,
          });
        } else {
          this.setState({
            usermedia: [{ post_media: noimage }],
            carouseldisplay: [{ post_media: noimage }],
            nouserimagefound: true,
            displaymanagement: false,
            displayuser: true,
          });
        }
        console.log("checkingggg");
        console.log(this.state);
      } else {
        this.setState({
          carouseldisplay: this.state.usermedia,
          displaymanagement: false,
          displayuser: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  async componentWillMount() {
    const { location_id } = this.props.match.params;

    console.log(this.props);
    await this.locationdetails();
    await this.locationalllinksdetails();
    await this.reviewdetails();
    await this.trendingprojectdetails();
    await this.managementmediafetch();
    let location1 = location.href;
    console.log("this is location");
    console.log(location1);
    if (location1.indexOf("#") != -1) {
      location1 = location1.substring(location1.indexOf("#") + 1);
      var elmntToView = document.getElementById(location1);
      if (elmntToView) {
        elmntToView.scrollIntoView();
      }
    }
    console.log("from mount - >", location1);
  }

  async componentDidMount() {
    this.setState({
      loggedin: localStorage.getItem("loggedin"),
      loggedinuseremail: localStorage.getItem("loggedInUseremail"),
      loggedinusername: localStorage.getItem("loggedInUsername"),
    });

    localStorage.getItem("location_helpfulid");
    let votedid = localStorage.getItem("location_helpfulid");
    votedid = JSON.parse(votedid);
    if (votedid === null) {
      votedid = [];
      votedid.push(-2);
      localStorage.setItem("location_helpfulid", JSON.stringify(votedid));
    }
    window.addEventListener("mouseup", this._onDragLeave);
    window.addEventListener("dragenter", this._onDragEnter);
    window.addEventListener("dragover", this._onDragOver);
    // document.getElementById('dragbox').addEventListener('dragleave', this._onDragLeave);
    window.addEventListener("drop", this._onDrop);
    this.setState({
      loggedin: localStorage.getItem("loggedin"),
      loggedinuseremail: localStorage.getItem("loggedInUseremail"),
      loggedinusername: localStorage.getItem("loggedInUsername"),
      city: localStorage.getItem("city"),
    });
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this._onDragLeave);
    window.removeEventListener("dragenter", this._onDragEnter);
    window.addEventListener("dragover", this._onDragOver);
    // document.getElementById('dragbox').removeEventListener('dragleave', this._onDragLeave);
    window.removeEventListener("drop", this._onDrop);
  }

  // async componentWillReceiveProps(nextProps) {
  // await this.projectmediafetch();
  // await this.projectdetails();
  // await this.reviewdetails();
  // await this.projectinfo();
  // await this.projecttransaction();
  // await this.suggestedproject();
  // }

  onCloseb() {
    this.setState({
      showReview: false,
      showPostPicture: false,
    });
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }
  onStarClick1(nextValue1, prevValue1, name) {
    this.setState({ rating1: nextValue1 });
  }
  onStarClick2(nextValue2, prevValue2, name) {
    this.setState({ rating2: nextValue2 });
  }
  onStarClick3(nextValue3, prevValue3, name) {
    this.setState({ rating3: nextValue3 });
  }
  onStarClick4(nextValue4, prevValue4, name) {
    this.setState({ rating4: nextValue4 });
  }
  onStarClick5(nextValue5, prevValue5, name) {
    this.setState({ rating5: nextValue5 });
  }

  myChangeHandlerArray = async (event) => {
    //   let selected_imagefile = event.target.name;
    //   console.log("QWERTY")
    //   console.log(event.target.files)
    //   let randomarray2 = event.target.files;
    //   if(event.target.files){
    //   if(event.target.files[0].size>1999999)
    //   {
    //     console.log("TOOO BIG")
    //     alert("Image size too large, please upload images below 2MB")
    //     randomarray2=[];
    //   }
    // }
    //   this.setState({selected_imagefile: randomarray2});

    let selected_imagefile = event.target.name;
    console.log("QWERTY");
    console.log(event.target.files);
    try {
      let randomarray2 = [...event.target.files];
      if (event.target.files) {
        for (let i = 0; i < randomarray2.length; i++) {
          if (randomarray2[i].size > 1999999) {
            console.log(randomarray2[i].size);
            let compFile = {};
            randomarray2[i] = await this.imageCompressor(randomarray2[i]);
            console.log(randomarray2);
          }
        }
      }

      randomarray2.map(img => {
        let iid = uuid()
        img.photoId = iid 
        img.photoText = this.state.photoText
        console.log('singeliiiiiimmmmmgg=> ', img)
      })    


      if(this.state.selected_imagefile.length > 0){
        for(let i = 0; i < randomarray2.length; i++){

          this.state.selected_imagefile.push(randomarray2[i])

        }


      } else {
        this.setState({ selected_imagefile: Object.values(randomarray2) });
      }





    } catch (error) {
      console.error(error);
    }
    this.closenotif();

  };

  imageCompressor = async (file) => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    console.log("in compressor");

    const compressedFile = await imageCompression(file, options);

    console.log(file);
    console.log(compressedFile.size);

    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);

    console.log(compressedFile);

    return compressedFile;
  };

  _onDragEnter(e) {
    this.setState({ className: "drop-zone-show_det" });
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  _onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  _onDragLeave(e) {
    this.setState({ className: "drop-zone-show_det" });
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  async _onDrop(e) {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    console.log("Files dropped: ", files);
    // Upload files
    // if(files[0].size>1999999)
    // {
    //   alert("Image size too large, please upload images below 2MB")
    //   files=[];
    // }
    // this.setState({className:'drop-zone-show_det',drag:files});
    // return false;

    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 1999999) {
        console.log(files[i].size);
        let compFile = {};
        files[i] = await this.imageCompressor(files[i]);
        console.log(files);
      }
    }
    files.map(img => {
      let iid = uuid()
      img.photoId = iid 
      img.photoText = this.state.photoText
      console.log('singeliiiiiimmmmmgg=> ', img)
    })




    if(this.state.drag1.length > 0){
      for(let i = 0; i < files.length; i++){

        this.state.drag1.push(files[i])

      }


    } else {
      this.setState({ className: "drop-zone-show_det", drag1: Object.values(files) });
    }







    this.closenotif();
    return false;
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
  opennotif() {
    this.setState({
      notification: true,
    });
  }
  closenotif() {
    this.setState({
      notification: false,
    });
  }
  close() {
    this.setState({
      loginComponent: false,
      signupComponent: false,
      mloginComponent: false,
      registerComponent: false,
    });
  }

  handleSubmit1 = async (event) => {
    event.preventDefault();
    if (this.state.search_name == "" || this.state.search_id == "") {
      // alert("Please Select a Project");
      var elmntToView = document.getElementById("topele");
      elmntToView.scrollIntoView();
      this.setState({ shownotifproject: true });
      // this.emailphoneInput.current.focus();
    } else if (this.state.status == "") {
      // alert("Please select status");
      var elmntToView = document.getElementById("topele");
      elmntToView.scrollIntoView();
      this.setState({ shownotifstatus: true });
      // this.emailphoneInput.current.focus();
    } else if (this.state.rating == "") {
      // alert("Please Fill Rating");
      var elmntToView = document.getElementById("topele");
      elmntToView.scrollIntoView();
      this.setState({ shownotifrating: true });
      // this.emailphoneInput.current.focus();
    } else if (this.state.email_phone == "") {
      // alert("Enter the Email/Phone Field");
      this.emailphoneInput.current.focus();
      this.setState({ shownotifemail_phone: true });
    } else {
      let loginresponse = await axios.post(
        "https://www.propviewz.com/be/login/login_with_review/",
        {
          id: this.state.email_phone,
        }
      );
      console.log("review loginresponse", loginresponse);

      if (loginresponse.data.Response === "Success") {
        if (isNaN(this.state.email_phone)) {
          this.setState({ showpasswordfield: true });
          // this.setState({register_show:false, signupComponent:false, loginComponent:false, value: event.target.value})
        } else {
          this.setState({ showpasswordfield: true });
        }
      } else {
        if (isNaN(this.state.email_phone)) {
          this.setState({ showemailnamefield: true });
          // this.setState({register_show:false, signupComponent:false, loginComponent:false, value: event.target.value})
          //write code here to show the name field to enter when user email is not signed up
        } else {
          this.setState({ showotpfield: true });
          // ,showphonenamefield:true});
          //write code here to show the otp field to enter when user phone is not signed up
        }
      }
    }
  };

  openlogin() {
    if (this.state.search_name == "" || this.state.search_id == "") {
      // alert("Please Select a Project");
      var elmntToView = document.getElementById("topele");
      elmntToView.scrollIntoView();
      this.setState({ shownotifproject: true });
      // this.emailphoneInput.current.focus();
    } else if (this.state.status == "") {
      // alert("Please select status");
      var elmntToView = document.getElementById("topele");
      elmntToView.scrollIntoView();
      this.setState({ shownotifstatus: true });
      // this.emailphoneInput.current.focus();
    } else if (this.state.rating == "") {
      // alert("Please Fill Rating");
      var elmntToView = document.getElementById("topele");
      elmntToView.scrollIntoView();
      this.setState({ shownotifrating: true });
      // this.emailphoneInput.current.focus();
    }
    // else if(this.state.email_phone == '')
    // {
    //   // alert("Enter the Email/Phone Field");
    //   this.emailphoneInput.current.focus();
    //   this.setState({shownotifemail_phone:true});
    // }
    else {
      const fd1 = new FormData();
      // fd.append('image[0]',this.state.drag1, this.state.drag.name)
      fd1.append(
        "project_id",
        this.state.search_id
          ? this.state.search_id
          : this.props.project_id
          ? this.props.project_id.project_id
          : ""
      );
      // project_name:this.state.name,
      fd1.append(
        "project_name",
        this.state.search_name
          ? this.state.search_name
          : this.props.project_details
          ? this.props.project_details.project_name
          : ""
      );
      fd1.append("reviewer_type", this.state.status);
      fd1.append("overall_rating", this.state.rating);
      fd1.append("location", this.state.rating1);
      fd1.append("amenities", this.state.rating2);
      fd1.append("floor_plan", this.state.rating3);
      fd1.append("customer_service", this.state.rating4);
      fd1.append("vom", this.state.rating5);
      fd1.append("review_title", this.state.review);
      if (this.state.drag1.length) {
        for (let i = 0; i < this.state.drag1.length; i++) {
          fd1.append("review_media", this.state.drag1[i]);
        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fd1.append("review_media", this.state.selected_imagefile[i]);
        }
      }
      //enable below line to take email id
      // fd.append("reviewer_email",this.state.email);
      // fd1.append("reviewer_email",this.props.loggedinuseremail?this.props.loggedinuseremail:"demo@gmail.com");
      fd1.append("review", this.state.experience);

      localStorage.setItem("formdataavailable", true);
      this.setState({ formdata: fd1, showlogin: true });
    }
  }

  closelogin() {
    this.setState({ showlogin: false });
  }

  phonereg = async (event) => {
    if (this.state.phonename == "") {
      // alert("Enter Name Please");
      this.phonenameInput.current.focus();
      this.setState({ shownotifphonename: true });
    } else {
      console.log("new phone review method");

      const fd4 = new FormData();
      // fd.append('image[0]',this.state.drag, this.state.drag.name)
      fd4.append(
        "project_id",
        this.state.search_id
          ? this.state.search_id
          : this.props.project_id
          ? this.props.project_id.project_id
          : ""
      );
      // project_name:this.state.name,
      fd4.append(
        "project_name",
        this.state.search_name
          ? this.state.search_name
          : this.props.project_details
          ? this.props.project_details.project_name
          : ""
      );
      fd4.append("reviewer_type", this.state.status);
      fd4.append("overall_rating", this.state.rating);
      fd4.append("location", this.state.rating1);
      fd4.append("amenities", this.state.rating2);
      fd4.append("floor_plan", this.state.rating3);
      fd4.append("customer_service", this.state.rating4);
      fd4.append("vom", this.state.rating5);
      fd4.append("review_title", this.state.review);
      if (this.state.drag1.length) {
        for (let i = 0; i < this.state.drag1.length; i++) {
          fd4.append("review_media", this.state.drag1[i]);
        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fd4.append("review_media", this.state.selected_imagefile[i]);
        }
      }
      //enable below line to take email id
      fd4.append("reviewer_email", this.state.email_phone);
      // fd1.append("reviewer_email",this.props.loggedinuseremail?this.props.loggedinuseremail:"demo@gmail.com");
      fd4.append("review", this.state.experience);
      
      fd4.append("reviewer_name", this.state.phonename);

      let review_status = await axios.post(
        "https://www.propviewz.com/be/write_review_without_registration/",
        fd4,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Submitted review status", review_status);
      if (review_status.data.Status === "Success") {
        this.props.onClose();
        this.showreviewstatus();
      } else {
        // alert("Error submitting review. Please Try again.")
        this.setState({ reviewsubmiterror: true });
      }
    }
  };
  otpverify = async (event) => {
    if (this.state.otp == "") {
      // alert("Enter OTP Please");
      this.otpInput.current.focus();
      this.setState({ shownotifotp: true });
    } else {
      console.log("otp verify function");
      let otpverifyresponse = await axios.post(
        "https://www.propviewz.com/be/login/phone_login",
        {
          phoneNum: this.state.email_phone,
          otp: this.state.otp,
        }
      );
      console.log("otp match RESPONSE", otpverifyresponse);

      if (otpverifyresponse.data.Response === "Success") {
        this.setState({ showphonenamefield: true });
      } else {
        //  alert("Wrong OTP entered. Try Again");
        this.setState({ otperror: true });
      }
    }
  };
  emailreg = async (event) => {
    if (this.state.username == "") {
      // alert("Enter Name Please");
      this.UsernameInput.current.focus();
      this.setState({ shownotifemailname: true });
    } else {
      console.log("Link Sending and submit review method");

      const fd3 = new FormData();
      // fd.append('image[0]',this.state.drag, this.state.drag.name)
      fd3.append(
        "project_id",
        this.state.search_id
          ? this.state.search_id
          : this.props.project_id
          ? this.props.project_id.project_id
          : ""
      );
      // project_name:this.state.name,
      fd3.append(
        "project_name",
        this.state.search_name
          ? this.state.search_name
          : this.props.project_details
          ? this.props.project_details.project_name
          : ""
      );
      fd3.append("reviewer_type", this.state.status);
      fd3.append("overall_rating", this.state.rating);
      fd3.append("location", this.state.rating1);
      fd3.append("amenities", this.state.rating2);
      fd3.append("floor_plan", this.state.rating3);
      fd3.append("customer_service", this.state.rating4);
      fd3.append("vom", this.state.rating5);
      fd3.append("review_title", this.state.review);
      if (this.state.drag1.length) {
        for (let i = 0; i < this.state.drag1.length; i++) {
          fd3.append("review_media", this.state.drag1[i]);
        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fd3.append("review_media", this.state.selected_imagefile[i]);
        }
      }
      //enable below line to take email id
      fd3.append("reviewer_email", this.state.email_phone);
      // fd1.append("reviewer_email",this.props.loggedinuseremail?this.props.loggedinuseremail:"demo@gmail.com");
      fd3.append("review", this.state.experience);

      fd3.append("reviewer_name", this.state.username);

      let review_status = await axios.post(
        "https://www.propviewz.com/be/write_review_without_registration/",
        fd3,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Submitted review status", review_status);
      if (review_status.data.Status === "Success") {
        this.props.onClose();
        this.showreviewstatus();
      } else {
        // alert("Error submitting review. Please Try again.")
        this.setState({ reviewsubmiterror: true });
      }
    }
  };
  loginsubmit1 = async (event) => {
    if (this.state.password == "") {
      // alert("Enter Password Please");
      this.passwordInput.current.focus();
      this.setState({ shownotifpassword: true });
    } else {
      console.log("login submit");
      let loginresponse = await axios.post(
        "https://www.propviewz.com/be/login/email_login",
        {
          id: this.state.email_phone,
          pass: this.state.password,
        }
      );
      console.log("FINAL LOGIN RESPONSE", loginresponse);

      if (loginresponse.data.Response === "Success") {
        const fd2 = new FormData();
        // fd.append('image[0]',this.state.drag, this.state.drag.name)
        fd2.append(
          "project_id",
          this.state.search_id
            ? this.state.search_id
            : this.props.project_id
            ? this.props.project_id.project_id
            : ""
        );
        // project_name:this.state.name,
        fd2.append(
          "project_name",
          this.state.search_name
            ? this.state.search_name
            : this.props.project_details
            ? this.props.project_details.project_name
            : ""
        );
        fd2.append("reviewer_type", this.state.status);
        fd2.append("overall_rating", this.state.rating);
        fd2.append("location", this.state.rating1);
        fd2.append("amenities", this.state.rating2);
        fd2.append("floor_plan", this.state.rating3);
        fd2.append("customer_service", this.state.rating4);
        fd2.append("vom", this.state.rating5);
        fd2.append("review_title", this.state.review);
        if (this.state.drag1.length) {
          for (let i = 0; i < this.state.drag1.length; i++) {
            fd2.append("review_media", this.state.drag1[i]);
          }
        } else {
          for (let i = 0; i < this.state.selected_imagefile.length; i++) {
            fd2.append("review_media", this.state.selected_imagefile[i]);
          }
        }
        //enable below line to take email id
        fd2.append("reviewer_email", loginresponse.data.ValidEmail);
        // fd1.append("reviewer_email",this.props.loggedinuseremail?this.props.loggedinuseremail:"demo@gmail.com");
        fd2.append("review", this.state.experience);

        await axios.post(
          "https://www.propviewz.com/be/save_project_review/",
          fd2,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        localStorage.setItem("loggedin", true);
        localStorage.setItem("loggedInUsername", loginresponse.data.Name);
        localStorage.setItem(
          "loggedInUseremail",
          loginresponse.data.ValidEmail
        );
        this.loginsuccess(
          true,
          loginresponse.data.ValidEmail,
          loginresponse.data.Name
        );
        this.props.onClose();
        this.showreviewstatus();
      } else {
        // alert("Please Enter the correct Password");
        this.passwordInput.current.focus();
        this.setState({ passworderror: true });
      }
    }
  };

  onClose() {
    this.setState({
      showComponent1: false,
      showComponent: false,
    });
  }

  showreviewstatus() {
    this.setState({ review_status: true });
  }

  showpicturestatus() {
    this.setState({ picture_status: true });
  }

  closenotif() {
    this.setState({
      shownotifproject: false,
      shownotifstatus: false,
      shownotifrating: false,
      shownotifemail_phone: false,
      shownotifemailname: false,
      shownotifpassword: false,
      shownotifotp: false,
      shownotifphonename: false,
      passworderror: false,
      reviewsubmiterror: false,
      otperror: false,
    });
  }

  onImgRemove = (index, type = null) => {
    
    console.log(index);
    console.log(type);
    this.setState({photoText: ""})
    console.log(this.state.selected_imagefile);
    let files =
      type === "drag" ? this.state.drag1 : this.state.selected_imagefile;
    let removeFile =
      type === "drag"
        ? this.state.drag1[index]
        : this.state.selected_imagefile[index];
    console.log("files", files, "removeFile", removeFile);
    files = Object.values(files).filter((img) => {
      if (img.name) {
        return img.name !== removeFile.name;
      }
    });
    type === "drag"
      ? this.setState({ drag1: files })
      : this.setState({ selected_imagefile: files });
  };

  changeImageTitle(image, e) {

    if (this.state.selected_imagefile.length) {
      this.state.selected_imagefile.map(img => {
        if(img.photoId == image.photoId){
          img.photoText = e.target.value
        }
      })
    }
  
    if (this.state.drag1.length) {
  
      this.state.drag1.map(img => {
        if(img.photoId == image.photoId){
          img.photoText = e.target.value
        }
      })
    }
    console.log('trenddddddddd => ',this.state.selected_imagefile)
    this.setState({photoText: e.target.value})
  }

  render() {



  if(this.state.showReview == true) {
  console.log('draggggggggggggggggggggggger => ', this.state.drag1)

  }

    console.log('trenddddddddd => ',this.state.selected_imagefile)



    const { photoIndex, isOpen, photoIndex1, isOpen1 } = this.state;
    console.log("LOCATION DETAIL STATe");
    console.log(this.state);
    console.log(this.props);
    const { rating } = this.state;
    const { rating1 } = this.state;
    const { rating2 } = this.state;
    const { rating3 } = this.state;
    const { rating4 } = this.state;
    const { rating5 } = this.state;
    let overall_rating = 0;
    let total_review = 0;
    let rating1_count = 0;
    let rating2_count = 0;
    let rating3_count = 0;
    let rating4_count = 0;
    let rating5_count = 0;
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    let filename = [];
    let allcaroselimage1;
    let allcaroselimage2;

    if (this.state.carouseldisplay.length > 0) {
      console.log("normal image");

      if (this.state.displaymanagement && !this.state.displayuser) {
        allcaroselimage1 = this.state.carouseldisplay.map((media) => (
          <div>
            {media.media_link && (
              <img
                src={media.media_link ? media.media_link : noimage}
                className="projectphoto"
                alt="Project pics"
                onClick={() => this.setState({ isOpen1: true })}
              />
            )}

            {/* {media.post_media &&
          <img src={media.post_media?media.post_media:noimage} className="projectphoto" alt="Project pics" onClick={() => this.setState({ isOpen: true })}/>
          } */}
          </div>
        ));
      } else if (!this.state.displaymanagement && this.state.displayuser) {
        allcaroselimage2 = this.state.carouseldisplay.map((media) => (
          <div>
            {media.media_link && (
              <img
                src={media.media_link ? media.media_link : noimage}
                className="projectphoto"
                alt="Project pics"
                onClick={() => this.setState({ isOpen1: true })}
              />
            )}

            {media.post_media && (
              <img
                src={media.post_media ? media.post_media : noimage}
                className="projectphoto"
                alt="Project pics"
                onClick={() =>
                  this.state.nouserimagefound
                    ? ""
                    : this.setState({ isOpen: true })
                }
              />
            )}
          </div>
        ));
      }
    } else {
      allcaroselimage1 = (
        <div>
          <img src={noimage} className="projectphoto" alt="No Image Found" />
        </div>
      );
    }

    // List of selected file name

    // if(this.state.selected_imagefile.length ){
    // for (let i = 0 ; i < this.state.selected_imagefile.length ; i++) {
    //   filename.push(this.state.selected_imagefile[i].name);}
    //   console.log("SEEEEEEEEE")
    //   console.log(filename)
    // }
    // if(this.state.drag.length ){
    //   for (let i = 0 ; i < this.state.drag.length ; i++) {
    //     filename.push(this.state.drag[i].name);}
    //     console.log("SEEEEEEEEE drag")
    //     console.log(filename)
    //   }

    let allimagesnames = [];
    if (this.state.selected_imagefile.length) {
      let allimages = Object.values(this.state.selected_imagefile);
      allimagesnames = allimages.map((image, index) => {
        let filename = image.name.split(".");
        let finalname = "";
        let fileextension = filename[1];
        if (image.name.indexOf(".") > 15) {
          finalname = filename[0].substring(0, 15);
          return (
            <div className="selected-img">
            <li>
              {" "}
              <div className = 'reviewimg-container'>
              <img
                src={URL.createObjectURL(image)}
                style={{ height: "100px", width: "100px" }}
              />
              <div
                className="remove-btn"
                onClick={() => this.onImgRemove(index)}
              >
                <span>
                  {" "}
                  {(this.state.img_alias ? this.state.img_alias : "") +
                    "_img" +
                    (index + 1) +
                    "." +
                    fileextension}
                </span>
                Remove
              </div>
              </div>
            </li>
            <div className='addimg-title'>
            <input type="text" value={image.photoText} onChange={(e) => this.changeImageTitle(image, e)} placeholder="add title" />
            </div>
            </div>
          );
        } else {
          // finalname = filename[0];
          return (
            <div className="selected-img">
            <li>
            <div className = 'reviewimg-container'>
              <img
                src={URL.createObjectURL(image)}
                style={{ height: "100px", width: "100px" }}
              />
              <div
                className="remove-btn"
                onClick={() => this.onImgRemove(index)}
              >
                <span>
                  {" "}
                  {(this.state.img_alias ? this.state.img_alias : "") +
                    "_img" +
                    (index + 1) +
                    "." +
                    fileextension}
                </span>
                Remove
              </div>
              </div>
            </li>
            <div className='addimg-title'>
            <input type="text" value={image.photoText} onChange={(e) => this.changeImageTitle(image, e)} placeholder="add title" />
            </div>
            </div>
          );
        }
        // console.log("filename",filename,finalname,fileextension)
      });
    }
    if (this.state.drag1.length) {
      let allimages = Object.values(this.state.drag1);
      allimagesnames = allimages.map((image, index) => {
        let filename = image.name.split(".");
        let finalname = "";
        let fileextension = filename[1];
        if (image.name.indexOf(".") > 15) {
          finalname = filename[0].substring(0, 15);
          return (
            <div className="selected-img">
            <li>
              {" "}
              <div className = 'reviewimg-container'>

              <img
                src={URL.createObjectURL(image)}
                style={{ height: "100px", width: "100px" }}
              />
              <div
                className="remove-btn"
                onClick={() => this.onImgRemove(index, "drag")}
              >
                <span>
                  {" "}
                  {(this.state.img_alias ? this.state.img_alias : "") +
                    "_img" +
                    (index + 1) +
                    "." +
                    fileextension}
                </span>
                Remove
              </div>
              </div>
            </li>
            <div className='addimg-title'>
            <input type="text" value={image.photoText} onChange={(e) => this.changeImageTitle(image, e)} placeholder="add title" />
            </div>
            </div>
          );
        } else {
          return (
            <div className="selected-img">
            <li>
              {" "}
              <div className = 'reviewimg-container'>
              <img
                src={URL.createObjectURL(image)}
                style={{ height: "100px", width: "100px" }}
              />
              <div
                className="remove-btn"
                onClick={() => this.onImgRemove(index, "drag")}
              >
                <span>
                  {" "}
                  {(this.state.img_alias ? this.state.img_alias : "") +
                    "_img" +
                    (index + 1) +
                    "." +
                    fileextension}
                </span>
                Remove
              </div>
              </div>
            </li>
            <div className='addimg-title'>
            <input type="text" value={image.photoText} onChange={(e) => this.changeImageTitle(image, e)} placeholder="add title" />
            </div>
            </div>
          );
        }
        // console.log("filename",filename,finalname,fileextension)
      });
    }

    if (this.state.locationdetails) {
      overall_rating = this.state.locationdetails[0].overall_rating;
      total_review = this.state.locationdetails[0].total_review;
      rating1_count = this.state.locationdetails[0].rating1_count;
      rating2_count = this.state.locationdetails[0].rating2_count;
      rating3_count = this.state.locationdetails[0].rating3_count;
      rating4_count = this.state.locationdetails[0].rating4_count;
      rating5_count = this.state.locationdetails[0].rating5_count;
      console.log("SEEEEEEEEE total");
      console.log(rating4_count);
    }
    let allreviews;

    let alltrendingproject;
    let allmaplinks;

    let menu = (
      <Menu>
        <MenuItem>
          <h6>
            {" "}
            <div
              onClick={this.AddReviewModel}
              style={{
                placeContent: "center",
                display: "flex",
                fontFamily: "Catamaran-Semibold",
                color: "#ef403c",
                fontSize: "1.2rem",
              }}
            >
              <img width="30px" src={menu1icon} />
              <div style={{ marginTop: "6px", marginLeft: "5px" }}>
                Add Review
              </div>
            </div>
          </h6>
        </MenuItem>

        {/* <MenuItem><h6><span onClick={this.AddReview} style={{fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}><span style={{verticalAlign: "bottom"}}> <img width="30px" src={menu1icon}/></span>&nbsp; Add Review</span></h6></MenuItem> */}
        <Divider />

        <MenuItem>
          <h6>
            <div
              onClick={this.PostPictureModel}
              style={{
                placeContent: "center",
                display: "flex",
                fontFamily: "Catamaran-Semibold",
                color: "#ef403c",
                fontSize: "1.2rem",
              }}
            >
              <img width="30px" src={menu2icon} />
              <div style={{ marginTop: "6px", marginLeft: "5px" }}>
                Post a Picture
              </div>
            </div>
          </h6>
        </MenuItem>
        {/* {this.state.showPostPicture && 
      <LocationPostAPic locationalllinksdetails ={this.state.locationalllinksdetails?this.state.locationalllinksdetails[0].area:null} location_id={this.props.match.params.location_id}/>
}  */}
      </Menu>
    );

    if (this.state.reviewdetails) {
      allreviews = this.state.reviewdetails
        .slice(0, this.state.itemsToShow)
        .map((review) => (
          <div
            className="reviewcard"
            id={review.location_review_id}
            style={{ scrollMargin: "30vh" }}
          >
            <div className="row">
              <div className="col-sm-6">
                <div className="reviewcardfirstrow">
                  <img
                    src={usericon}
                    alt=""
                    className="reviewprofileimagestyle"
                    alt="sideprojectcover"
                  />
                  <div className="reviewcontainer">
                    <h4>{review.reviewer_name}</h4>
                    {/* <div>June 2020</div> */}
                  </div>
                </div>
              </div>

              <div className="col-sm-6 rightalign">
                <div className="bigstar">
                  <StarRatings
                    rating={review.overall_rating}
                    starRatedColor="rgb(251, 200, 0)"
                    changeRating={this.changeRating}
                    starDimension="40px"
                    numberOfStars={5}
                    name="rating"
                    starSpacing="0px"
                  />
                </div>
                <div className="smallstar">
                  <StarRatings
                    rating={review.overall_rating}
                    starRatedColor="rgb(251, 200, 0)"
                    changeRating={this.changeRating}
                    starDimension="20px"
                    numberOfStars={5}
                    name="rating"
                    starSpacing="0px"
                  />
                </div>

                {/* <img src={noimage} alt="No Image Available" className="reviewimagestyle"/> */}
              </div>

              {/* <img src={sideprojectimages} alt="" className="sideprojectimagestyle"/> */}
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div>
                  <h3 className="reviewdetailtitle">{review.review_title}</h3>
                  <p className="reviewdetail">{review.review}</p>
                </div>
              </div>
            </div>

            <footer className="review-footer">
              <div className="upvote">
                <h4 className="anchorstyle">Comment</h4>

                <img src={comment} className="commentimage" />
              </div>

              {JSON.parse(localStorage.getItem("location_helpfulid")).indexOf(
                review.location_review_id
              ) === -1 && (
                <div
                  className="help"
                  style={{ cursor: "pointer" }}
                  onClick={this.helpfulclick.bind(
                    this,
                    review.location_review_id
                  )}
                >
                  <img src={thumb} className="helpimage" />
                  <a className="anchorstyle">Helpful</a>
                </div>
              )}

              {JSON.parse(localStorage.getItem("location_helpfulid")).indexOf(
                review.location_review_id
              ) >= 0 && (
                <div className="help">
                  <img src={thumb} className="helpimage" />
                  <a className="anchorstyle">Voted!!</a>
                </div>
              )}

              <div
                className="report"
                onClick={this.copyToClipboard.bind(
                  this,
                  review.location_review_id
                )}
                style={{ cursor: "pointer" }}
              >
                <img src={share} className="reportimage" />
                <a className="anchorstyle">Share</a>
              </div>

              <div className="report">
                <img src={redflag} className="reportimage" />
                <a
                  href={"/projects/reportreview/" + review.location_review_id}
                  className="anchorstyle"
                >
                  Report
                </a>
              </div>
            </footer>
          </div>
        ));
    }

    if (this.state.trendingprojectdetails) {
      // let status1= project.construction_status.toUpperCase()

      alltrendingproject = this.state.trendingprojectdetails.map((project) => (
        <div className="proj_det">
          {this.state.trendingprojectdetails && (
            <a href={"/projects/" + project.project_id} className="anchorstyle">
              <div className="boxD_det">
                <div className="imageframeD_det">
                  <img className="imageboxD_det" src={project.cover_image} />

                  <div className="paraplacestatus_det">
                    {project.construction_status
                      ? project.construction_status == "Ready Possession"
                        ? "READY"
                        : project.construction_status.toUpperCase()
                      : project.construction_status.toUpperCase()}
                  </div>

                  <div className="paraplaceD_det">{project.area}</div>
                </div>
                <div className="contentframeD_det">
                  <p className="paraheadingD_det">{project.project_name}</p>
                  <div className="row">
                    <div className="parastarD_web">
                      <StarRatings
                        rating={Math.round(project.overall_rating * 100) / 100}
                        starRatedColor="#FFFFFF"
                        starEmptyColor="#202020"
                        // changeRating={this.changeRating}
                        numberOfStars={5}
                        starDimension="1.5vw"
                        name="rating"
                        starSpacing="0.2vw"
                      />
                    </div>
                    <div className="parastarD_mob">
                      <StarRatings
                        rating={Math.round(project.overall_rating * 100) / 100}
                        starRatedColor="#FFFFFF"
                        starEmptyColor="#202020"
                        // changeRating={this.changeRating}
                        numberOfStars={5}
                        starDimension="2.5vh"
                        name="rating"
                        starSpacing="0.3vh"
                      />
                    </div>
                  </div>
                  <div className="parasubD_det">
                    {Math.round(project.overall_rating * 100) / 100}(
                    {project.no_of_review} Reviews)
                  </div>
                </div>
              </div>
            </a>
          )}
        </div>
      ));
    }

    let locationsData = [];
    if (this.state.locationalllinksdetails) {
      let k = 0;
      let alllocalprojectdata;
      let id;
      let lat;
      let lng;
      let title;
      let pimage;

      for (let i = 0; i < this.state.locationalllinksdetails.length; i++) {
        alllocalprojectdata = {
          id: this.state.locationalllinksdetails[i].project_id,
          lat: parseFloat(
            this.getPositionlatitude(
              this.state.locationalllinksdetails[i].google_map_link
            )
          ),
          lng: parseFloat(
            this.getPositionlongitude(
              this.state.locationalllinksdetails[i].google_map_link
            )
          ),
          zoomlevel: 13,
          area: this.state.locationalllinksdetails[i].area,
          overallrating: this.state.locationalllinksdetails[i].overall_rating,
          no_of_review: this.state.locationalllinksdetails[i].total_review,
          image: this.state.locationalllinksdetails[i].media_link,
          project_name: this.state.locationalllinksdetails[i].project_name,
          status: this.state.locationalllinksdetails[i].construction_status,
        };
        locationsData[k] = alllocalprojectdata;
        k++;
      }

      console.log("all map link", locationsData);

      // console.log("sssss",this.state.locationalllinksdetails[0].construction_status)
    }
    let login_status;
    if ((this.state.loggedin === true) | (this.state.loggedin === "true")) {
      let name = this.state.loggedinusername;
      let username = name;
      login_status = (
        // <div  style={{color: "white", position: "absolute"}}>
        <div className="logout_options">
          <a className="username_project_new" href="/account/">
            {username}
          </a>

          <p className="logout_project_new" onClick={this.logout}>
            Logout
          </p>
        </div>
        // </div>
      );
    }

    // if(this.state.normal){
    //   <img src= {this.state.carouseldisplay[photoIndex1].media_link}/>
    //   this.setState({
    //     previmg: false,
    //     nextimg:false,
    //   })
    // }
    // if(this.state.previmg){
    //   <img src= {this.state.carouseldisplay[((photoIndex1 + this.state.carouseldisplay.length - 1) % this.state.carouseldisplay.length + this.state.carouseldisplay.length - 1) % this.state.carouseldisplay.length].media_link}/>
    //   this.setState({
    //   normal: false,
    //     nextimg:false,
    //   })
    // }
    // if(this.state.nextimg){
    //   <img src= {this.state.carouseldisplay[((photoIndex1 + 1) % this.state.carouseldisplay.length + 1) % this.state.carouseldisplay.length].media_link}/>
    //     this.setState({
    //   normal: false,
    //     previmg:false,
    //   })
    // }

    // if(this.state.normal ){
    //   <img src= {this.state.carouseldisplay[photoIndex1].media_link}/>

    // }
    // if(this.state.previmg)
    // {

    //   <img src= {this.state.carouseldisplay[(photoIndex1 + this.state.carouseldisplay.length - 1) % this.state.carouseldisplay.length].media_link}/>

    // }
    // if(this.state.nextimg)
    // {
    //   <img src= {this.state.carouseldisplay[(photoIndex1 + 1) % this.state.carouseldisplay.length].media_link}/>

    // }

    // {this.state.normal &&
    //   <img src= {this.state.carouseldisplay[photoIndex1].media_link}/>
    //   console.log("normal")

    // }
    // {this.state.previmg &&

    //   <img src= {this.state.carouseldisplay[(photoIndex1 + this.state.carouseldisplay.length - 1) % this.state.carouseldisplay.length].media_link}/>

    // }
    // {this.state.nextimg &&

    //   <img src= {this.state.carouseldisplay[(photoIndex1 + 1) % this.state.carouseldisplay.length].media_link}/>

    // }

    return (
      <div>
        {
          this.state.showPostPicture && (
            <LocationPostAPic
              onClose={this.onClose.bind(this)}
              loggedinuseremail={this.state.loggedinuseremail}
              loginsuccess={this.loginsuccess}
              showpicturestatus={this.showpicturestatus.bind(this)}
              locationalllinksdetails={
                this.state.locationalllinksdetails
                  ? this.state.locationalllinksdetails[0].area
                  : null
              }
              location_id={this.props.match.params.location_id}
              onCloseb={this.onCloseb.bind(this)}
            />
          )
          //   <PostAPicture
          //   onClose={this.onClose.bind(this)}
          //   loggedinuseremail={this.state.loggedinuseremail}
          //   loginsuccess={this.loginsuccess}
          //   showpicturestatus={this.showpicturestatus.bind(this)}
          //   isLocationDetailPage={true}
          //   onCloseb = {this.onCloseb.bind(this)}
          //   locationalllinksdetails ={this.state.locationalllinksdetails?this.state.locationalllinksdetails[0].area:null} location_id={this.props.match.params.location_id} onCloseb = {this.onCloseb.bind(this)}
          // />
        }

        {this.state.showReview && (
          <Modal show={this.state.showReview} className="modal_review">
            {/* <div class="scrollbar" id="style-3">
        <div class="force-overflow"></div>
      </div> */}
            <img
              className="closebtn_det"
              src={closeIcon}
              onClick={this.onCloseb}
            />
            {/* <Modal.Header closeButton onClick={() => this.AddReviewModel()}>
<Modal.Title>Modal heading</Modal.Title>
</Modal.Header> */}
            <div className="modal-content" id="topele">
              {/* {this.state.shownotifproject &&
         <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',top:'2%',padding:'10px'}}>
          <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif.bind(this)} style={{cursor:'pointer'}}>&times;</p>
            Please Select a Project.
          </div>
         } */}

              {/* {this.state.shownotifstatus &&
         <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',top:'2%',padding:'10px'}}>
          <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif.bind(this)} style={{cursor:'pointer'}}>&times;</p>
            Please Select Status.
          </div>
         } */}

              {this.state.shownotifrating && (
                <div
                  class="alert alert-danger alert-dismissible"
                  style={{
                    position: "absolute",
                    zIndex: "99",
                    width: "100%",
                    top: "2%",
                    padding: "10px",
                  }}
                >
                  <p
                    class="close"
                    data-dismiss="alert"
                    aria-label="close"
                    onClick={this.closenotif.bind(this)}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </p>
                  Please Fill Overall Rating.
                </div>
              )}

              {this.state.shownotifemail_phone && (
                <div
                  class="alert alert-danger alert-dismissible"
                  style={{
                    position: "absolute",
                    zIndex: "99",
                    width: "100%",
                    top: "69.5%",
                    padding: "10px",
                  }}
                >
                  <p
                    class="close"
                    data-dismiss="alert"
                    aria-label="close"
                    onClick={this.closenotif.bind(this)}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </p>
                  Please Enter Email/Phone.
                </div>
              )}

              {this.state.shownotifemailname && (
                <div
                  class="alert alert-danger alert-dismissible"
                  style={{
                    position: "absolute",
                    zIndex: "99",
                    width: "100%",
                    top: "69.5%",
                    padding: "10px",
                  }}
                >
                  <p
                    class="close"
                    data-dismiss="alert"
                    aria-label="close"
                    onClick={this.closenotif.bind(this)}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </p>
                  Please Enter Your Name.
                </div>
              )}

              {this.state.shownotifpassword && (
                <div
                  class="alert alert-danger alert-dismissible"
                  style={{
                    position: "absolute",
                    zIndex: "99",
                    width: "100%",
                    top: "69.5%",
                    padding: "10px",
                  }}
                >
                  <p
                    class="close"
                    data-dismiss="alert"
                    aria-label="close"
                    onClick={this.closenotif.bind(this)}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </p>
                  Please Enter Password.
                </div>
              )}

              {this.state.shownotifotp && (
                <div
                  class="alert alert-danger alert-dismissible"
                  style={{
                    position: "absolute",
                    zIndex: "99",
                    width: "100%",
                    top: "69.5%",
                    padding: "10px",
                  }}
                >
                  <p
                    class="close"
                    data-dismiss="alert"
                    aria-label="close"
                    onClick={this.closenotif.bind(this)}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </p>
                  Please Enter OTP.
                </div>
              )}

              {this.state.shownotifphonename && (
                <div
                  class="alert alert-danger alert-dismissible"
                  style={{
                    position: "absolute",
                    zIndex: "99",
                    width: "100%",
                    top: "69.5%",
                    padding: "10px",
                  }}
                >
                  <p
                    class="close"
                    data-dismiss="alert"
                    aria-label="close"
                    onClick={this.closenotif.bind(this)}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </p>
                  Please Enter Your Name.
                </div>
              )}

              {this.state.passworderror && (
                <div
                  class="alert alert-danger alert-dismissible"
                  style={{
                    position: "absolute",
                    zIndex: "99",
                    width: "100%",
                    top: "69.5%",
                    padding: "10px",
                  }}
                >
                  <p
                    class="close"
                    data-dismiss="alert"
                    aria-label="close"
                    onClick={this.closenotif.bind(this)}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </p>
                  Please Enter correct Password.
                </div>
              )}

              {this.state.reviewsubmiterror && (
                <div
                  class="alert alert-danger alert-dismissible"
                  style={{
                    position: "absolute",
                    zIndex: "99",
                    width: "100%",
                    top: "69.5%",
                    padding: "10px",
                  }}
                >
                  <p
                    class="close"
                    data-dismiss="alert"
                    aria-label="close"
                    onClick={this.closenotif.bind(this)}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </p>
                  Error Occurrred. Try Again
                </div>
              )}

              {this.state.otperror && (
                <div
                  class="alert alert-danger alert-dismissible"
                  style={{
                    position: "absolute",
                    zIndex: "99",
                    width: "100%",
                    top: "69.5%",
                    padding: "10px",
                  }}
                >
                  <p
                    class="close"
                    data-dismiss="alert"
                    aria-label="close"
                    onClick={this.closenotif.bind(this)}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </p>
                  Please enter correct OTP
                </div>
              )}

              <p className="add_det">ADD</p>

              <p className="rev_det">REVIEW</p>
              <hr className="h1_det"></hr>
              <hr className="h2_det"></hr>

              <form onSubmit={this.handleSubmit}>
                <p className="pText_det">Location</p>
                <input
                  type="text"
                  className="pField_det"
                  id="name"
                  name="name"
                  required
                  value={
                    this.state.locationalllinksdetails
                      ? this.state.locationalllinksdetails[0].area
                      : null
                  }
                  disabled
                />
                <div>{}</div>

                {/* <input type="text" pl className="pField_det" id="name" name="name" required  disabled/> */}
                <div className="start-container">
                <p className="OverRating_det">
                  Your overall rating of this location
                </p>
                <div className="star_det">
                  <StarRatingComponent
                    className="starcss_det"
                    name="rating"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                    emptyStarColor={"#cecece"}
                    starColor={"red"}
                    id="rating"
                    onChange={this.myChangeHandler}
                  />
                </div>
                </div>

                <p className="location_det">Location Ratings</p>
                <div className="star-container">
                <p className="social_det">Social Appeal</p>
                <div className="star1_det">
                  {
                    <StarRatingComponent
                      className="starSmall_det"
                      name="rating1"
                      starCount={5}
                      value={rating1}
                      onStarClick={this.onStarClick1.bind(this)}
                      emptyStarColor={"#cecece"}
                      starColor={"red"}
                      id="rating1"
                      onChange={this.myChangeHandler}
                    />
                  }
                </div>
                </div>
                <div className="star-container">
                <p className="school_det">Schools</p>
                <div className="star2_det">
                  {
                    <StarRatingComponent
                      className="starSmall_det"
                      name="rating2"
                      starCount={5}
                      value={rating2}
                      onStarClick={this.onStarClick2.bind(this)}
                      emptyStarColor={"#cecece"}
                      starColor={"red"}
                      id="rating2"
                      onChange={this.myChangeHandler}
                    />
                  }
                </div>
                </div>
                <div className="star-container">
                <p className="malls_det">Malls/ Resturants/ Entertainment</p>
                <div className="star3_det">
                  {
                    <StarRatingComponent
                      className="starSmall_det"
                      name="rating3"
                      starCount={5}
                      value={rating3}
                      onStarClick={this.onStarClick3.bind(this)}
                      emptyStarColor={"#cecece"}
                      starColor={"red"}
                      id="rating3"
                      onChange={this.myChangeHandler}
                    />
                  }
                </div>
                </div>
                <div className="star-container">
                <p className="medical_det">Medical Facilities</p>
                <div className="star4_det">
                  {
                    <StarRatingComponent
                      className="starSmall_det"
                      name="rating4"
                      starCount={5}
                      value={rating4}
                      onStarClick={this.onStarClick4.bind(this)}
                      emptyStarColor={"#cecece"}
                      starColor={"red"}
                      id="rating4"
                      onChange={this.myChangeHandler}
                    />
                  }
                </div>
                </div>
                <div className="star-container">
                <p className="public_det">Public Transport</p>
                <div className="star5_det">
                  {
                    <StarRatingComponent
                      className="starSmall_det"
                      name="rating5"
                      starCount={5}
                      value={rating5}
                      onStarClick={this.onStarClick5.bind(this)}
                      emptyStarColor={"#cecece"}
                      starColor={"red"}
                      id="rating5"
                      onChange={this.myChangeHandler}
                    />
                  }
                </div>
                </div>
                <p className="revText_det">Review Title</p>
                <input
                  type="text"
                  name="review"
                  className="revField_det"
                  id="review"
                  placeholder="e.g. Great property in a fantastic location"
                  onChange={this.myChangeHandler}
                  required
                />
                <p className="your_det">Your Review</p>
                <textarea
                  className="shareEx_det"
                  id="exper"
                  placeholder="Share your experience"
                  name="experience"
                  onChange={this.myChangeHandler}
                  required
                ></textarea>
                <p className="share_det">Share photos </p>











                <div className="testt">

                {this.props.children}
                {!this.state.selected_imagefile.length &&
                  !this.state.drag1.length && (
                    <div id="dragbox_review" className="drop-zone-show_det">
                      <p className="dr1_det">Drag & Drop</p>
                      <p className="dr2_det">OR</p>
                    </div>
                  )}

              
                {this.state.selected_imagefile.length > 0 &&
                  !this.state.drag1.length > 0 && (
                    <div id="dragbox" className={this.state.className}>
                      <ul
                        style={{ lineHeight: "1", overflowWrap: "break-word" }}
                      >
                        {allimagesnames}
                      </ul>
                    </div>
                  )}
                {this.state.drag1.length > 0 && (
                  <div id="dragbox" className={this.state.className}>
                    <ul style={{ lineHeight: "1", overflowWrap: "break-word" }}>
                      {/* <li className="dr1_det">{allimagesnames}</li> */}
                      {allimagesnames}
                    </ul>
                  </div>
                )}

                  <div>
                    <input
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      id="file"
                      name="file"
                      multiple
                      onChange={this.myChangeHandlerArray}
                      value={this.state.file}
                    />
                    <label for="file" className="file1_det">
                      Select Image{" "}
                    </label>
                    <input
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      id="file"
                      name="file"
                      multiple
                      onChange={this.myChangeHandlerArray}
                      value={this.state.file}
                    />
                    <label for="file" className="take_det">
                      Take Photo{" "}
                    </label>
                  </div>
                   {/* my code */}
                 {this.state.selected_imagefile.length > 0 &&
                    
                    <div id="dragbox123" className={this.state.className}>
                      <ul
                        style={{
                          lineHeight: "1",
                          overflowWrap: "break-word",
                          flexWrap: "wrap !important",
                        }}
                      >
                        {allimagesnames}
                      </ul>
                    </div>
         }
         {/* my code end */}

                </div>












             
                

                {/* {this.state.drag.length>0 &&
        // <div id="dragbox1" className={this.state.className}>
          <ul>
        <li className="dr1_det">{filename}</li>
        </ul>
      // </div>
        } */}

                {this.state.loggedinuseremail ? (
                  <div></div>
                ) : (
                  <div>
                    <p className="sign_det">SIGN UP</p>
                    <hr className="hr3_det"></hr>
                    <hr className="hr4_det"></hr>
                    <img src={Facebook} className="fbb_det" />
                    <img src={Google} className="googleplus_det" />
                    <img src={Linkedin} className="linkedin_det" />
                    <p className="oroption_det">OR</p>
                    <hr className="hr5_det"></hr>
                    <hr className="hr6_det"></hr>

                    {!this.state.showpasswordfield &&
                      !this.state.showotpfield && (
                        <p className="emId_det">Email Id / Mobile No. </p>
                      )}
                    {!this.state.showpasswordfield &&
                      !this.state.showotpfield &&
                      !this.state.showemailnamefield && (
                        <input
                          type="text"
                          className="emField_det"
                          id="email"
                          placeholder="Enter your Email ID or mobile no."
                          name="email"
                          onChange={this.myChangeHandler}
                          value={this.state.email}
                          required
                          disabled
                        />
                      )}
                    {!this.state.showpasswordfield &&
                      !this.state.showemailnamefield &&
                      !this.state.showotpfield && (
                        <button
                          className="cont_det"
                          onClick={this.handleSubmit1.bind(this)}
                        >
                          Continue
                        </button>
                      )}
                    {this.state.showpasswordfield && (
                      <p className="emId">Password</p>
                    )}

                    {this.state.showpasswordfield && (
                      <input
                        type="password"
                        ref={this.passwordInput}
                        className="emField"
                        id="password"
                        placeholder="Enter your password."
                        name="password"
                        required
                        onChange={this.myChangeHandler}
                        value={this.state.password}
                      />
                    )}
                    {this.state.showpasswordfield && (
                      <button
                        type="button"
                        className="cont"
                        onClick={this.loginsubmit1.bind(this)}
                      >
                        Login
                      </button>
                    )}

                    {this.state.showemailnamefield && (
                      <input
                        type="text"
                        ref={this.emailphoneInput}
                        className="emField"
                        id="email_phone"
                        placeholder="Enter your Email ID or mobile no."
                        name="email_phone"
                        disabled
                        onChange={this.myChangeHandler}
                        value={this.state.email_phone}
                      />
                    )}

                    {this.state.showemailnamefield && (
                      <p className="emIdName">Name</p>
                    )}

                    {this.state.showemailnamefield && (
                      <input
                        type="text"
                        ref={this.UsernameInput}
                        className="emFieldName"
                        id="username"
                        placeholder="Ex - John Doe."
                        name="username"
                        required
                        onChange={this.myChangeHandler}
                        value={this.state.username}
                      />
                    )}
                    {this.state.showemailnamefield && (
                      <button
                        type="button"
                        className="contnamesubmit"
                        onClick={this.emailreg.bind(this)}
                      >
                        Submit Review
                      </button>
                    )}

                    {this.state.showotpfield &&
                      !this.state.showphonenamefield && (
                        <p className="emId">OTP</p>
                      )}

                    {this.state.showotpfield &&
                      !this.state.showphonenamefield && (
                        <input
                          type="text"
                          ref={this.otpInput}
                          className="emField"
                          id="otp"
                          placeholder="Enter the received otp."
                          name="otp"
                          required
                          onChange={this.myChangeHandler}
                          value={this.state.otp}
                        />
                      )}

                    {this.state.showotpfield && !this.state.showphonenamefield && (
                      <button
                        type="button"
                        className="cont"
                        onClick={this.otpverify.bind(this)}
                      >
                        Verify OTP
                      </button>
                    )}

                    {this.state.showphonenamefield && (
                      <p className="emId">Name</p>
                    )}

                    {this.state.showphonenamefield && (
                      <input
                        type="text"
                        ref={this.phonenameInput}
                        className="emField"
                        id="phonename"
                        placeholder="Enter - John Doe."
                        name="phonename"
                        required
                        onChange={this.myChangeHandler}
                        value={this.state.phonename}
                      />
                    )}

                    {this.state.showphonenamefield && (
                      <button
                        type="button"
                        className="cont"
                        onClick={this.phonereg.bind(this)}
                      >
                        Submit Review
                      </button>
                    )}

                    <p className="already_det">
                      Already a member of Propviewz?
                    </p>
                    <a
                      className="login_det"
                      href="#"
                      onClick={this.openlogin.bind(this)}
                    >
                      Login
                    </a>
                  </div>
                )}
                {this.state.loggedinuseremail && (
                 <div className="sbmit-container">
                    <button className="sub_det">SUBMIT</button>
                 </div>
                )}
              </form>
            </div>

            {this.state.showlogin && (
              <Login
                onClose={this.onClose.bind(this)}
                close={this.closelogin.bind(this)}
                formdata3={this.state.formdata ? this.state.formdata : "nodata"}
                loginsuccess={this.loginsuccess}
                showreviewstatus={this.showreviewstatus}
              />
            )}
          </Modal>
        )}

        {this.state.notification && (
          <div
            class="alert alert-success alert-dismissible_loc"
            style={{ position: "absolute", zIndex: "107", width: "100%" }}
          >
            <p
              class="close"
              data-dismiss="alert"
              aria-label="close"
              onClick={this.closenotif}
              style={{ cursor: "pointer" }}
            >
              &times;
            </p>
            A <strong>registration Link</strong> has been sent to your Email ID.
          </div>
        )}








        
        <div className="staticmenu_details web-header">
          <div className="mainContainer full-view-1st-row_det">
            <div className="container-fluid">
              <div className="row reviewrow custommargin">
                {/* <div className="col-lg-9 flexstyle">
        <a href={'/'}><img className="toplogo2" src={LogoIcon}/></a> 
        <a href={'/'}><img className="toplogo_mobile_det" src={LogoIconMobile}/></a> 
          <div className="search_div_details" >
         
          <Search/>
         
          </div>  

          <div className="search_div_details_mob" >
          <div style={{margin: "-35px",width: "100%", marginBottom:"0px",marginLeft:"-25px"}}>
          <Search/>
          </div>
          </div>
        </div> */}
                <div className="col-lg-9 col-md-8 col-sm-8 col-xs-12 header-top-left">
                  {/* <h3 className="toplogo">LOGO</h3>  */}
                  <div class="logo">
                    <a href={"/"}>
                      <img className="toplogo" src={LogoIcon} />
                    </a>
                  </div>
                  <div className="outersearchdiv">
                    <div className="search-detail">
                      <Search />
                    </div>
                    <div className="search-icon">
                      <img className="search_icon2" src={searchIcon} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 reviewbar_details">
                  {/* <div className="row">
            <div className="col-md-9 reviewbar"> */}
                  <span className="locationstyle_det">{this.state.city}</span>
                  {/* </div> */}
                  {/* <div className="col-md-3"> */}

                  {this.state.loggedin ? (
                    <img src={user} className="usericon_det" alt="usericon" />
                  ) : (
                    <a onClick={this.signup}>
                      <img src={user} className="usericon_det" alt="usericon" />
                    </a>
                  )}

                  {login_status}
                  <div ref={this.setWrapperRef}>
                    {this.state.locationDrop && (
                      <Location_drop
                        myChangeHandler={this.myChangeHandler.bind(this)}
                      />
                    )}
                  </div>
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

                  {/* <img src={user} className="usericon" alt="usericon"/> */}

                  {/* </div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>

            {/* <div className="" style={{display: "flex", justifyContent: "space-between", marginTop: "27px"}}> 
                        <div className="centeralign">
                        <a className="navbar-brand1" href="#ratingdiv" style={{backgroundColor:this.state.menu1,textDecoration:"none"}} onClick={(e) => this.colorchange(1, e)}>ABOUT</a>
                        </div>
                        <div className="centeralign">
                        <a className="navbar-brand1" href="#reviewdiv" style={{backgroundColor:this.state.menu2,textDecoration:"none"}} onClick={(e) => this.colorchange(2, e)}>REVIEWS</a>
                        </div>
                        <div className="centeralign">
                        <a className="navbar-brand1" href="#trendingdiv" style={{backgroundColor:this.state.menu3,textDecoration:"none"}} onClick={(e) => this.colorchange(3, e)}>TRENDING PROJECTS</a>
                        </div>
                        
                    
                  </div> */}

                    {/* <div className="web_bar_det" style={{justifyContent: "unset",display:"flex"}}> 

                        <div className="centeralign">
                        <a className="navbar-brand" href="#ratingdiv" style={{backgroundColor:this.state.menu1, fontFamily: this.state.fonttext1}} onClick={(e) => this.colorchange(1, e)}>ABOUT</a>
                        </div>
                        <div className="centeralign">
                        <a className="navbar-brand" href="#reviewdiv" style={{backgroundColor:this.state.menu2, fontFamily: this.state.fonttext2}} onClick={(e) => this.colorchange(2, e)}>REVIEWS</a>
                        </div>
                        <div className="centeralign">
                        <a className="navbar-brand" href="#trendingdiv" style={{backgroundColor:this.state.menu3, fontFamily: this.state.fonttext3}} onClick={(e) => this.colorchange(3, e)}>TRENDING PROJECTS</a>
                        </div>
                    
                      </div> */}

          <div className="navbarrow_details">
            <div className="mainContainer">
              <div className="container-fluid">
                <div className="row reviewrow">
                  <div className="col-xl-9">
                  
                    <NavBarMenu sectionRefs={this.sectionRefs} />

                    {/* <div className="mob_bar_det" style={{justifyContent: "unset",display:"flex"}}> 
                        <div className="centeralign1">
                        <a className="navbar-brand_about" href="#ratingdiv" style={{backgroundColor:this.state.menu1, fontFamily: this.state.fonttext1}} onClick={(e) => this.colorchange(1, e)}>ABOUT</a>
                        </div>
                        <div className="centeralign1">
                        <a className="navbar-brand_reviews" href="#reviewdiv" style={{backgroundColor:this.state.menu2, fontFamily: this.state.fonttext2}} onClick={(e) => this.colorchange(2, e)}>REVIEWS</a>
                        </div>
                        <div className="centeralign1">
                        <a className="navbar-brand_trending" href="#trendingdiv1" style={{backgroundColor:this.state.menu3, fontFamily: this.state.fonttext3}} onClick={(e) => this.colorchange(3, e)}>TRENDING PROJECTS</a>
                        </div>
                    
                      </div> */}
                  </div>

                  {/* <div className="col-xl-3 reviewbar1"> */}
                  <div className="col-xl-2">
                    <Dropdown
                      trigger={["click"]}
                      overlay={menu}
                      animation="slide-up"
                    >
                      <button className="btn_share">
                        <img className="addimagestyle_share" src={addimage} />
                        <span className="ShareView_share">SHARE VIEWS</span>
                      </button>
                      {/* <button className="btnshare_loc_det"><img className="buttonadd_loc_det" src={addimage}/> Share Views</button> */}
                    </Dropdown>
                  </div>

                  {/* </div>   */}
                </div>
              </div>
            </div>
          </div>
        </div>





        <div className="staticmenu_details mob-header">
          <div className="mainContainer full-view-1st-row_det">
          <div className="container-fluid">
                <div className="row reviewrow custommargin">
                  <div className="col-lg-9 header-top-left">
                    {/* <h3 className="toplogo">LOGO</h3>  */}
                    <div class="logo">
                      <a href={"/"}>
                        <img className="toplogo" src={LogoIconMobile} />
                      </a>
                    </div>
                    <div className="outersearchdiv">
                      <div className="search-detail">
                        <Search />
                      </div>
                      <div className="search-icon">
                        <img className="search_icon2" src={searchIcon} />
                      </div>
                    </div>


                    {/* {
        this.state.showBanner && <img src={sideprojectimages} />
        ||  <div style={{margin: "-35px",width: "100%", marginBottom:"0px"}}>
        <Search/>
        </div>
      }    */}
                  </div>


                  <div className="col-lg-3 reviewbar reviewbar_details">
                    {/* <div className="row">
            <div className="col-md-9 reviewbar"> */}
                     <div className="locationicon-project">

<div className="cityicon-container">
  <div className="locationstyle">{this.state.city}</div>

  {/* <img src={user} className="usericon-mobile" alt="usericon"/> */}
  {this.state.loggedin ? (
    <img src={user} className="usericonp" alt="usericon" />
    
  ) : (
      <a onClick={this.signup}>
        {/* <img src={user} className="usericon1"/> */}
        <img
          src={user}
          className="usericonp"
          alt="usericon"
        />
      </a>
    )}
</div>


{/* </div> */}
{/* </div> */}
{login_status}


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
                    {/* </div> */}
                    {/* </div> */}








                  </div>
                </div>
              </div>
        
        
        
        
        
        
        
        
        
        
          </div>

            {/* <div className="" style={{display: "flex", justifyContent: "space-between", marginTop: "27px"}}> 
                        <div className="centeralign">
                        <a className="navbar-brand1" href="#ratingdiv" style={{backgroundColor:this.state.menu1,textDecoration:"none"}} onClick={(e) => this.colorchange(1, e)}>ABOUT</a>
                        </div>
                        <div className="centeralign">
                        <a className="navbar-brand1" href="#reviewdiv" style={{backgroundColor:this.state.menu2,textDecoration:"none"}} onClick={(e) => this.colorchange(2, e)}>REVIEWS</a>
                        </div>
                        <div className="centeralign">
                        <a className="navbar-brand1" href="#trendingdiv" style={{backgroundColor:this.state.menu3,textDecoration:"none"}} onClick={(e) => this.colorchange(3, e)}>TRENDING PROJECTS</a>
                        </div>
                        
                    
                  </div> */}

                    {/* <div className="web_bar_det" style={{justifyContent: "unset",display:"flex"}}> 

                        <div className="centeralign">
                        <a className="navbar-brand" href="#ratingdiv" style={{backgroundColor:this.state.menu1, fontFamily: this.state.fonttext1}} onClick={(e) => this.colorchange(1, e)}>ABOUT</a>
                        </div>
                        <div className="centeralign">
                        <a className="navbar-brand" href="#reviewdiv" style={{backgroundColor:this.state.menu2, fontFamily: this.state.fonttext2}} onClick={(e) => this.colorchange(2, e)}>REVIEWS</a>
                        </div>
                        <div className="centeralign">
                        <a className="navbar-brand" href="#trendingdiv" style={{backgroundColor:this.state.menu3, fontFamily: this.state.fonttext3}} onClick={(e) => this.colorchange(3, e)}>TRENDING PROJECTS</a>
                        </div>
                    
                      </div> */}

          <div className="navbarrow_details">
            <div className="mainContainer">
              <div className="container-fluid">
                <div className="row reviewrow">
                  <div className="col-xl-9">
                  
                    <NavBarMenu sectionRefs={this.sectionRefs} />

                    {/* <div className="mob_bar_det" style={{justifyContent: "unset",display:"flex"}}> 
                        <div className="centeralign1">
                        <a className="navbar-brand_about" href="#ratingdiv" style={{backgroundColor:this.state.menu1, fontFamily: this.state.fonttext1}} onClick={(e) => this.colorchange(1, e)}>ABOUT</a>
                        </div>
                        <div className="centeralign1">
                        <a className="navbar-brand_reviews" href="#reviewdiv" style={{backgroundColor:this.state.menu2, fontFamily: this.state.fonttext2}} onClick={(e) => this.colorchange(2, e)}>REVIEWS</a>
                        </div>
                        <div className="centeralign1">
                        <a className="navbar-brand_trending" href="#trendingdiv1" style={{backgroundColor:this.state.menu3, fontFamily: this.state.fonttext3}} onClick={(e) => this.colorchange(3, e)}>TRENDING PROJECTS</a>
                        </div>
                    
                      </div> */}
                  </div>

                  {/* <div className="col-xl-3 reviewbar1"> */}
                  <div className="col-xl-2">
                    <Dropdown
                      trigger={["click"]}
                      overlay={menu}
                      animation="slide-up"
                    >
                      <button className="btn_share">
                        <img className="addimagestyle_share" src={addimage} />
                        <span className="ShareView_share">SHARE VIEWS</span>
                      </button>
                      {/* <button className="btnshare_loc_det"><img className="buttonadd_loc_det" src={addimage}/> Share Views</button> */}
                    </Dropdown>
                  </div>

                  {/* </div>   */}
                </div>
              </div>
            </div>
          </div>
        </div>













        <div className="rollingcontent2">
          <div className="locationbackgrounddiv">
            <img
              src={
                this.state.locationdetails
                  ? this.state.locationdetails[0].cover_img === null
                    ? noimage
                    : this.state.locationdetails[0].cover_img
                  : ""
              }
              className="locationbackgroundimage"
            />
          </div>
          <div className="mainContainer2">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-9">
                  <div className="row projectdetailsrow">
                    <div className="col-lg-7">
                      {this.state.locationdetails && (
                        <p className="projectline3">
                          {" "}
                          {this.state.locationdetails[0].location_disc === null
                            ? "No Description Available"
                            : this.state.locationdetails[0].location_disc}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-lg-5 centeralign"
                      ref={this.ratingdivRef}
                      id="ratingdiv"
                    >
                      <div className="ratingdiv_details">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 rightalign">
                            {this.state.locationdetails && (
                              <div>
                                <div className="star_web_details">
                                  <StarRatings
                                    rating={
                                      Math.round(overall_rating * 100) / 100
                                    }
                                    starRatedColor="rgb(251, 200, 0)"
                                    changeRating={this.changeRating}
                                    starDimension="40px"
                                    numberOfStars={5}
                                    name="rating"
                                    starSpacing="0px"
                                  />
                                </div>
                                {/* <div  className="star_mob_details">
                  <StarRatings
                       
                        rating={Math.round(overall_rating*100)/100}
                        starRatedColor="rgb(251, 200, 0)"
                        changeRating={this.changeRating}
                        starDimension="35px"
                        numberOfStars={5}
                        name='rating'
                        starSpacing='0px'
                      />
                      </div> */}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 rightalign">
                            {this.state.locationdetails && (
                              <div className="starratingtext">
                                {Math.round(overall_rating * 100) / 100} (
                                {total_review} reviews)
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-xl-3">
                            <div className="side_details">
                              <div>5 Star</div>
                            </div>
                          </div>
                          <div className="col-xl-7">
                            <div className="middle">
                              <div className="bar-container">
                                <div
                                  className="bar-5"
                                  style={{
                                    width:
                                      (rating5_count / total_review) * 100 +
                                      "%",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-2">
                            <div className="right_details">
                              {this.state.locationdetails && (
                                <div>{rating5_count}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-xl-3">
                            <div className="side_details">
                              <div>4 Star</div>
                            </div>
                          </div>
                          <div className="col-xl-7">
                            <div className="middle">
                              <div className="bar-container">
                                <div
                                  className="bar-4"
                                  style={{
                                    width:
                                      (rating4_count / total_review) * 100 +
                                      "%",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-2">
                            <div className="right_details">
                              {this.state.locationdetails && (
                                <div>{rating4_count}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-xl-3">
                            <div className="side_details">
                              <div>3 Star</div>
                            </div>
                          </div>
                          <div className="col-xl-7">
                            <div className="middle">
                              <div className="bar-container">
                                <div
                                  className="bar-3"
                                  style={{
                                    width:
                                      (rating3_count / total_review) * 100 +
                                      "%",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-2">
                            <div className="right_details">
                              {this.state.locationdetails && (
                                <div>{rating3_count}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-xl-3">
                            <div className="side_details">
                              <div>2 Star</div>
                            </div>
                          </div>
                          <div className="col-xl-7">
                            <div className="middle">
                              <div className="bar-container">
                                <div
                                  className="bar-2"
                                  style={{
                                    width:
                                      (rating2_count / total_review) * 100 +
                                      "%",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-2">
                            <div className="right_details">
                              {this.state.locationdetails && (
                                <div>{rating2_count}</div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-3">
                            <div className="side_details">
                              <div>1 Star</div>
                            </div>
                          </div>
                          <div className="col-xl-7">
                            <div className="middle">
                              <div className="bar-container">
                                <div
                                  className="bar-1"
                                  style={{
                                    width:
                                      (rating1_count / total_review) * 100 +
                                      "%",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-2">
                            <div className="right_details">
                              {this.state.locationdetails && (
                                <div>{rating1_count}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row ratingsection">
                          {this.state.locationdetails && (
                            <LocationRatings
                              location_points={
                                this.state.locationdetails[0].social_appeal
                                  ? this.state.locationdetails[0].social_appeal
                                  : 0
                              }
                              amenity_points={
                                this.state.locationdetails[0].school_rating
                                  ? this.state.locationdetails[0].school_rating
                                  : 0
                              }
                              layout_rating={
                                this.state.locationdetails[0]
                                  .mall_restaurent_rating
                                  ? this.state.locationdetails[0]
                                      .mall_restaurent_rating
                                  : 0
                              }
                              customer_rating={
                                this.state.locationdetails[0]
                                  .medical_facilities_rating
                                  ? this.state.locationdetails[0]
                                      .medical_facilities_rating
                                  : 0
                              }
                              valueformoney_rating={
                                this.state.locationdetails[0]
                                  .public_transport_rating
                                  ? this.state.locationdetails[0]
                                      .public_transport_rating
                                  : 0
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mobileContainer_det mobile-view-row-design_det">
                    <div className="container-fluid">
                      <div
                        className="ratingrow-mobile_det"
                        id="ratingdivmobile_det"
                      >
                        <div className="row centerClass">
                          <div className="col-12">
                            {this.state.locationdetails && (
                              <div>
                                <div className="main-star-mobile">
                                  <StarRatings
                                    rating={
                                      Math.round(overall_rating * 100) / 100
                                    }
                                    starRatedColor="rgb(251, 200, 0)"
                                    changeRating={this.changeRating}
                                    starDimension="35px"
                                    numberOfStars={5}
                                    name="rating"
                                    starSpacing="0px"
                                  />
                                </div>
                              </div>
                            )}
                            {this.state.locationdetails && (
                              <div className="starratingtext_det">
                                {Math.round(overall_rating * 100) / 100} ({"2"}{" "}
                                reviews)
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="row centerClass">
                          <div className="col-12">
                            <div className="row">
                              <div className="col-3">
                                <div className="side_details">
                                  <div>5 Star</div>
                                </div>
                              </div>
                              <div className="col-7 removepadding_det">
                                <div className="middle_details">
                                  <div className="bar-container_details">
                                    <div
                                      className="bar-5"
                                      style={{
                                        width:
                                          (rating5_count / total_review) * 100 +
                                          "%",
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="right_details">
                                  {this.state.locationdetails && (
                                    <div>{rating5_count}</div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-3">
                                <div className="side_details">
                                  <div>4 Star</div>
                                </div>
                              </div>
                              <div className="col-7 removepadding">
                                <div className="middle_details">
                                  <div className="bar-container_details">
                                    <div
                                      className="bar-4"
                                      style={{
                                        width:
                                          (rating4_count / total_review) * 100 +
                                          "%",
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="right_details">
                                  {this.state.locationdetails && (
                                    <div>{rating4_count}</div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-3">
                                <div className="side_details">
                                  <div>3 Star</div>
                                </div>
                              </div>
                              <div className="col-7 removepadding">
                                <div className="middle_details">
                                  <div className="bar-container_details">
                                    <div
                                      className="bar-3"
                                      style={{
                                        width:
                                          (rating3_count / total_review) * 100 +
                                          "%",
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="right_details">
                                  {this.state.locationdetails && (
                                    <div>{rating3_count}</div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-3">
                                <div className="side_details">
                                  <div>2 Star</div>
                                </div>
                              </div>
                              <div className="col-7 removepadding">
                                <div className="middle_details">
                                  <div className="bar-container_details">
                                    <div
                                      className="bar-2"
                                      style={{
                                        width:
                                          (rating2_count / total_review) * 100 +
                                          "%",
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="right_details">
                                  {this.state.locationdetails && (
                                    <div>{rating2_count}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-3">
                                <div className="side_details">
                                  <div>1 Star</div>
                                </div>
                              </div>
                              <div className="col-7 removepadding">
                                <div className="middle_details">
                                  <div className="bar-container_details">
                                    <div
                                      className="bar-1"
                                      style={{
                                        width:
                                          (rating1_count / total_review) * 100 +
                                          "%",
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="right_details">
                                  {this.state.locationdetails && (
                                    <div>{rating1_count}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row ratingsection">
                          {this.state.locationdetails && (
                            <LocationRatings
                              location_points={
                                this.state.locationdetails[0].social_appeal
                                  ? this.state.locationdetails[0].social_appeal
                                  : 0
                              }
                              amenity_points={
                                this.state.locationdetails[0].school_rating
                                  ? this.state.locationdetails[0].school_rating
                                  : 0
                              }
                              layout_rating={
                                this.state.locationdetails[0]
                                  .mall_restaurent_rating
                                  ? this.state.locationdetails[0]
                                      .mall_restaurent_rating
                                  : 0
                              }
                              customer_rating={
                                this.state.locationdetails[0]
                                  .medical_facilities_rating
                                  ? this.state.locationdetails[0]
                                      .medical_facilities_rating
                                  : 0
                              }
                              valueformoney_rating={
                                this.state.locationdetails[0]
                                  .public_transport_rating
                                  ? this.state.locationdetails[0]
                                      .public_transport_rating
                                  : 0
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-8 ">
                      <div className="carousel-wrapper_details">
                        <div className="carousel carousel-slider_details">
                          {this.state.displaymanagement &&
                            !this.state.displayuser && (
                              <Carousel
                                infiniteLoop={true}
                                showStatus={false}
                                showIndicators={false}
                                autoPlay={false}
                                showThumbs={true}
                              >
                                {allcaroselimage1}
                              </Carousel>
                            )}

                          {!this.state.displaymanagement &&
                            this.state.displayuser && (
                              <Carousel
                                infiniteLoop={true}
                                showStatus={false}
                                showIndicators={false}
                                autoPlay={false}
                                showThumbs={true}
                              >
                                {allcaroselimage2}
                              </Carousel>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 custompaddingleft_details">
                      <div className="row">
                        <div className="col-xl-12">
                          {/* onClick={() => this.setState({ isOpen1: true })} */}
                          <div
                            className="container1"
                            onClick={this.managementmediafetch}
                          >
                            <img
                              className="otherimages_details"
                              src={managementphoto}
                              alt="Snow"
                            />

                            <div className="centered_details">
                              Management Photos
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          {/* onClick={() => this.setState({ isOpen: true })} */}
                          <div
                            className="container1"
                            onClick={this.usermediafetch}
                          >
                            <img
                              className="otherimages_details"
                              src={userphoto}
                              alt="Snow"
                            />
                            <div className="centered_details">User Photos</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                

                  {isOpen && this.state.carouseldisplay.length > 0 && (
                    <Lightbox
                      mainSrc={
                        this.state.carouseldisplay[photoIndex].post_media
                      }

                      imageCaption ={
                        <div className="captions-container">
                        <h2>{this.state.carouseldisplay[photoIndex].given_by}</h2>
                        <p>{ this.state.carouseldisplay[photoIndex].post_time ? (moment(this.state.carouseldisplay[photoIndex].post_time).format('ll')) : (moment(new Date()).format('ll'))}</p>
                          {
                            // this.state.carouseldisplay[photoIndex].title !== 'N/A' ? 
                            this.state.carouseldisplay[photoIndex].post_title ?
                            <p className="photo-comment">{this.state.carouseldisplay[photoIndex].post_title}</p> :<></>
                          }
                        </div>
                      }

                      nextSrc={
                        this.state.carouseldisplay[
                          (photoIndex + 1) % this.state.carouseldisplay.length
                        ].post_media
                      }
                      prevSrc={
                        this.state.carouseldisplay[
                          (photoIndex + this.state.carouseldisplay.length - 1) %
                            this.state.carouseldisplay.length
                        ].post_media
                      }
                      onCloseRequest={() => this.setState({ isOpen: false })}
                      onMovePrevRequest={() =>
                        this.setState({
                          photoIndex:
                            (photoIndex +
                              this.state.carouseldisplay.length -
                              1) %
                            this.state.carouseldisplay.length,
                        })
                      }
                      onMoveNextRequest={() =>
                        this.setState({
                          photoIndex:
                            (photoIndex + 1) %
                            this.state.carouseldisplay.length,
                        })
                      }
                    />
                  )}

                  {/* {this.state.normal &&
  <img src= {this.state.carouseldisplay[photoIndex1].media_link}/>
  
}
{this.state.previmg &&
 
  <img src= {this.state.carouseldisplay[(photoIndex1 + this.state.carouseldisplay.length - 1) % this.state.carouseldisplay.length].media_link}/>

}
{this.state.nextimg &&
  <img src= {this.state.carouseldisplay[(photoIndex1 + 1) % this.state.carouseldisplay.length].media_link}/>
   
} */}

                  {isOpen1 && this.state.carouseldisplay.length > 0 && (
                    <Lightbox
                      mainSrc={
                        this.state.carouseldisplay[photoIndex].media_link
                      }
                      imageCaption = {
                        <div className="captions-container">
                        <h2>{this.state.carouseldisplay[photoIndex].given_by}</h2>
                        <p>{ this.state.carouseldisplay[photoIndex].post_time ? (moment(this.state.carouseldisplay[photoIndex].post_time).format('ll')) : (moment(new Date()).format('ll'))}</p>
                          {
                            // this.state.carouseldisplay[photoIndex].comment !== 'N/A' ? 
                            this.state.carouseldisplay[photoIndex].post_title ?
                             <p className="photo-comment">{this.state.carouseldisplay[photoIndex].post_title}</p> : <></> 
                          }
                        </div>
                      }
                      nextSrc={
                        this.state.carouseldisplay[
                          (photoIndex + 1) % this.state.carouseldisplay.length
                        ].media_link
                      }
                      prevSrc={
                        this.state.carouseldisplay[
                          (photoIndex + this.state.carouseldisplay.length - 1) %
                            this.state.carouseldisplay.length
                        ].media_link
                      }
                      onCloseRequest={() => this.setState({ isOpen1: false })}
                      onMovePrevRequest={() =>
                        this.setState({
                          photoIndex:
                            (photoIndex +
                              this.state.carouseldisplay.length -
                              1) %
                            this.state.carouseldisplay.length,
                        })
                      }
                      onMoveNextRequest={() =>
                        this.setState({
                          photoIndex:
                            (photoIndex + 1) %
                            this.state.carouseldisplay.length,
                        })
                      }
                    />
                  )}

                  <div className="row allprojectmapsrow">
                    <div className="col-md-12 centerClass">
                      {this.state.locationalllinksdetails && (
                        <MapLocations locations={locationsData} />
                      )}
                    </div>
                  </div>

                  {/* lat change  start*/}
                  <div className="adsrow">
                    <div className="reviewrowtitle ReviewHeading">
                      <div className="redbox1"></div><h3 className="reviewrowtitletext_det">&nbsp;Ads&nbsp;</h3><div className="redbox2"></div>
                    </div>
                    <img src={AdImagemob} img width="100%" />
                  </div>

                  {/* lat change end */}

                  <div
                    className="reviewrow"
                    ref={this.reviewdivRef}
                    id="reviewdiv"
                  >
                    <div className="reviewrowtitle ReviewHeading">
                      <div className="redbox1"></div>
                      <h3 className="reviewrowtitletext_det">
                        &nbsp;REVIEWS&nbsp;
                      </h3>
                      <div className="redbox2"></div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="sortbutton">
                          <h4 onClick={this.togglesort}>
                            Most Recent{" "}
                            <img src={this.state.sort ? uparrow : downarrow} />
                          </h4>
                        </div>
                      </div>
                    </div>

                    {this.state.reviewdetails ? allreviews : ""}

                    <div className="row">
                      <div className="col-xl-12">
                        <div className="morebutton">
                          <h5
                            className="moreclickstyle"
                            onClick={this.showMore}
                          >
                            {this.state.expanded ? "See Less" : "See More"}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="projects_web_det">
                    <div
                      className="transactionrow"
                      ref={this.trendingdivRef}
                      id="trendingdiv"
                    >
                      <div className="reviewrowtitle ProjectInfoHeading">
                        {/* <div className="redbox3"></div><h3  className="transactionrowtitletext">&nbsp;MOST &nbsp;<span className="grey">TRENDING</span>&nbsp;&nbsp;</h3><div className="redbox4"></div> */}
                        <div className="redbox1_trend"></div>
                        <h3 className="navrowtitletextmosttrend_det">
                          &nbsp;MOST TRENDING&nbsp;
                        </h3>
                        <div className="redbox2_trend"></div>
                      </div>
                      <div className="trendingprojects">
                        <div className="responsive_grids1">
                          <div className="grid-container31">
                            {this.state.trendingprojectdetails
                              ? alltrendingproject
                              : ""}
                          </div>
                        </div>

                        {/* <StackGrid columnWidth={373} gutterHeight={15} gutterWidth={20}  >
              
              
            <a href={'/projects/1'} className="anchorstyle">
            <div className="box1" >
                    <div className="imageframe4">
                    <img className="imagebox"src={mumbaiback}/>
                    <div className="paraplace">{'Andheri'}</div>
                    </div>
                    <div className="contentframe4">
                    <p className="paraheading4">{'The Nook'}</p>
                    <div className="row">
                  <div className="parastar">
                  <StarRatings
                        rating={Math.round(3.6666*100)/100}
                        starRatedColor="#FFFFFF"
                        starEmptyColor="#202020"
                        numberOfStars={5}
                        starDimension="25px"
                        name='rating'
                        starSpacing='2px'
                      />
                      </div>
             </div>
                        <div className="parasub">{Math.round(3.6666*100)/100}({'12'} Reviews)</div>
                        
                    </div>
            </div>
            </a>
            <a href={'/projects/1'} className="anchorstyle">
            <div className="box1" >
                    <div className="imageframe4">
                    <img className="imagebox"src={mumbaiback}/>
                    <div className="paraplace">{'Andheri'}</div>
                    </div>
                    <div className="contentframe4">
                    <p className="paraheading4">{'The Nook'}</p>
                    <div className="row">
                  <div className="parastar">
                  <StarRatings
                        rating={Math.round(3.6666*100)/100}
                        starRatedColor="#FFFFFF"
                        starEmptyColor="#202020"
                        numberOfStars={5}
                        starDimension="25px"
                        name='rating'
                        starSpacing='2px'
                      />
                      </div>
             </div>
                        <div className="parasub">{Math.round(3.6666*100)/100}({'12'} Reviews)</div>
                        
                    </div>
            </div>
            </a>
            <a href={'/projects/1'} className="anchorstyle">
            <div className="box1" >
                    <div className="imageframe4">
                    <img className="imagebox"src={mumbaiback}/>
                    <div className="paraplace">{'Andheri'}</div>
                    </div>
                    <div className="contentframe4">
                    <p className="paraheading4">{'The Nook'}</p>
                    <div className="row">
                  <div className="parastar">
                  <StarRatings
                        rating={Math.round(3.6666*100)/100}
                        starRatedColor="#FFFFFF"
                        starEmptyColor="#202020"
                        numberOfStars={5}
                        starDimension="25px"
                        name='rating'
                        starSpacing='2px'
                      />
                      </div>
             </div>
                        <div className="parasub">{Math.round(3.6666*100)/100}({'12'} Reviews)</div>
                        
                    </div>
            </div>
            </a>
            <a href={'/projects/1'} className="anchorstyle">
            <div className="box1" >
                    <div className="imageframe4">
                    <img className="imagebox"src={mumbaiback}/>
                    <div className="paraplace">{'Andheri'}</div>
                    </div>
                    <div className="contentframe4">
                    <p className="paraheading4">{'The Nook'}</p>
                    <div className="row">
                  <div className="parastar">
                  <StarRatings
                        rating={Math.round(3.6666*100)/100}
                        starRatedColor="#FFFFFF"
                        starEmptyColor="#202020"
                        numberOfStars={5}
                        starDimension="25px"
                        name='rating'
                        starSpacing='2px'
                      />
                      </div>
             </div>
                        <div className="parasub">{Math.round(3.6666*100)/100}({'12'} Reviews)</div>
                        
                    </div>
            </div>
            </a>
            </StackGrid>    */}
                      </div>
                    </div>
                  </div>

                  <div className="projects_mob_det">
                    <div className="transactionrow"  ref={this.trendingdivRef2} id="trendingdiv">
                      <div className="reviewrowtitle ProjectInfoHeading">
                        {/* <div className="redbox3"></div><h3  className="transactionrowtitletext">&nbsp;MOST TRENDING&nbsp;</h3><div className="redbox4"></div>  */}
                        <div className="redbox3"></div>
                        <h3 className="transactionrowtitletext">
                          &nbsp;MOST TRENDING&nbsp;
                        </h3>
                        <div className="redbox4"></div>
                      </div>
                      <div className="trendingprojects">
                        <div className="responsive_grids1_det">
                          <div className="grid-container31_mob">
                            {this.state.trendingprojectdetails
                              ? alltrendingproject
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 locbannerweb">
                  {/* <SideProjects/> */}
                  {/* {suggestedprojectall} */}
                  <div>
              {/* <img src={AdImage} className="adswebrow"/> */}
                <img width="100%" src={AdImage}/>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-footer-menu_details">
          <div
            className="col-3 centeralign_details custommobilefooterpadding_details veticallyalign_details"
            onClick={this.AddReviewModel}
          >
            {/* onClick={() => this.setState({showReview: true}) } */}
            <span>
              <img
                width="30px"
                src={menu1icon}
                style={{ verticalAlign: "inherit" }}
              />
            </span>
            ADD REVIEW
          </div>
          <div
            className="col-3 centeralign_details custommobilefooterpadding_details veticallyalign_details"
            onClick={this.PostPictureModel}
          >
            <span>
              <img
                width="30px"
                src={menu2icon}
                style={{ verticalAlign: "inherit" }}
              />
            </span>
            POST A PICTURE
          </div>

          <div className="col-3 centeralign_details custommobilefooterpadding_details veticallyalign_details">
            <span>
              <img
                width="30px"
                src={share}
                style={{ verticalAlign: "inherit" }}
              />
            </span>
            SHARE
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default LocationDetails;
