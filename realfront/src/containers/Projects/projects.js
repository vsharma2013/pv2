/* 
Projects JS 
*/
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Col } from 'react-bootstrap';
import React from "react";
// import logo from '../logo.svg';
import user from "./assets/user.png";
import projectcoverphoto from "./assets/projectcoverphoto.png";
// import sideprojectimages from './assets/sideprojectimages.png';
// import reading from './assets/reading.png';
import "./projects.css";
import '../LocationDetails/locationdetails.css'
import StarRatingComponent from "react-star-rating-component";
import downarrow from "./assets/down.png";
import uparrow from "./assets/up.png";
import share from "./assets/share.png";
import direction from "./assets/direction.png";
import comment from "./assets/comment.png";
import underconstruction from "./assets/underconstruction.jpg";
import followup from "./assets/followup.png";
import favourite from "./assets/fav.png";
import projectpagead from '../../assets/images/bannerweb.png';
import moment from 'moment'
import projectpageadm from '../../assets/images/bannermob.png';

import sideprojectimages from "./assets/sideprojectimages.png";
import usericon from "./assets/usericon.png";
import swimming from "./assets/swimming.png";
import gym from "./assets/gym.png";
import kidsplay from "./assets/kidsplay.png";
import garden from "./assets/garden.png";
import outdoor from "./assets/outdoor.png";
import indoor from "./assets/indoor.png";
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
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import menu1icon from "../../assets/icons/menu1.png";
import menu2icon from "../../assets/icons/menu2.png";
import searchIcon from "../../assets/icons/search.png";
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
import Collapsible from "react-collapsible";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem, Divider } from "rc-menu";
import "rc-dropdown/assets/index.css";
import PostAPicture from "../../components/PostAPicture/postApicture";
import WriteReview from "../../components/WriteReview/createreview";
import SideProjects from "../../components/SideProjects/SideProjects";
import ProjectRatings from "../../components/ProjectRatings/ProjectRatings";
import LogoIcon from "../../assets/icons/logo.png";
import LogoIconMobile from "../../assets/icons/logo_mobile.png";
import location_dropdownIcon from "../../assets/icons/down2.png";
import { isChrome, isFirefox } from "react-device-detect";
import SweetAlert from "react-bootstrap-sweetalert";
import Modal from "../../components/shareModalbox/shareModalbox";
import { Button, ButtonToolbar } from "react-bootstrap";
import { Payment } from "../../components/Payment/Payment";

import SignUp from "../../components/SignUp/signup";
import Login from "../../components/Login/login";
import MobileSignup from "../../components/MobileSignup/mobilesignup";
import Registration from "../../components/Registration/registration";

import googlereviewicon from "../../assets/icons/googlereviewicon.png";
import { Affix } from "antd";
import NavBarMenu from "./NavBarMenu";
import MobileNav from './MobileNav'

let helpful_id = [];
let localhelp;

let LoggedIn = "";
let LoggedInUserEmail = "";

const images = [
  "//placekitten.com/1500/500",
  "//placekitten.com/4000/3000",
  "//placekitten.com/800/1200",
  "//placekitten.com/1500/1500",
];

const getDimensions = (ele) => {
  if (ele) {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;
    return {
      height,
      offsetTop,
      offsetBottom,
    };
  }
};

const scrollTo = (ele) => {
  ele.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
      carouseldisplay: "",
      allmedia: "",
      managementmedia: "",
      floormedia: "",
      displaymanagement: false,
      displayuser: false,
      displayfloor: false,
      nouserimagefound: false,
      usermedia: "",
      projectmedia: "",
      projectdetails: "",
      reviewdetails: "",
      projectinfo: "",
      projecttransaction: "",
      newprojecttransaction: "",
      // suggestedproject:"",
      projectamenities: "",
      developerinfo: "",
      menu1: "#ef403c",
      menu2: "",
      menu3: "",
      menu4: "",
      sort: false,
      sorttype: "",
      itemsToShow: 3,
      expanded: false,
      activeTab: 0,
      menutext1: "white",
      menutext2: "white",
      menutext3: "white",
      menutext4: "white",
      showComponent: false,
      showComponent1: false,
      photoIndex: 0,
      photoIndexz: 0,
      reviewimages: [],
      photoIndex1: 0,
      photoIndex0: 0,
      photoIndex2: 0,
      isOpen0: false,
      isOpen: false,
      isOpenz: false,
      isOpen1: false,
      isOpen2: false,
      fonttext1: "Catamaran-Extrabold",
      fonttext2: "Catamaran-Semibold",
      fonttext3: "Catamaran-Semibold",
      fonttext4: "Catamaran-Semibold",
      marked_favourite: false,
      loggedin: false,
      loggedinuseremail: "",
      loggedinusername: "",

      loginComponent: false,
      signupComponent: false,
      mloginComponent: false,
      registerComponent: false,

      shareviewdisplayoption: false,
      filteroptiondisplay: false,
      filteroptiondisplay2: false,
      // Payment Variables
      paymentShow1: false,
      paymentShow2: false,
      allcomments: "",
      usercomment: "",
      review_submitted: false,
      review_status: false,
      picture_status: false,
      votingnotification: false,
      showModal: 0,
      copiedlink: "",
      visibleSection: "",
      project_location: null
    };
    this.AddReview = this.AddReview.bind(this);
    this.AddPicture = this.AddPicture.bind(this);
    // this.getLocations = this.getLocations.bind(this);
    // this.handleScroll = this.handleScroll.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setWrapperRef1 = this.setWrapperRef1.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.showshareviewoptions = this.showshareviewoptions.bind(this);
    this.showfilterptions = this.showfilterptions.bind(this);
    this.showfilterptions2 = this.showfilterptions2.bind(this);
    this.paymentClose = this.paymentClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkfavourite = this.checkfavourite.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.openlogin1 = this.openlogin1.bind(this);
    this.loginsuccess = this.loginsuccess.bind(this);
    this.mobilesignup = this.mobilesignup.bind(this);
    this.opennotif = this.opennotif.bind(this);
    this.close = this.close.bind(this);

    this.closenotif = this.closenotif.bind(this);

    this.opennotif2 = this.opennotif2.bind(this);
    this.closenotif2 = this.closenotif2.bind(this);

    this.headerRef = React.createRef();
    this.ratingRef = React.createRef();
    this.reviewdivRef = React.createRef();
    this.projectinfodivRef = React.createRef();
    this.recenttransactiondivRef = React.createRef();
    this.dashboardRef1 = React.createRef();

    this.ratingRefMob = React.createRef();
    this.reviewdivRefMob = React.createRef();
    this.projectinfodivRefMob = React.createRef();
    this.recenttransactiondivRefMob = React.createRef();

    this.sectionRefs = [
      { section: "ratingdiv", ref: this.ratingRef },
      { section: "reviewdiv", ref: this.reviewdivRef },
      { section: "recenttransactiondiv", ref: this.recenttransactiondivRef },
      { section: "projectinfodiv", ref: this.projectinfodivRef },
    ];
    this.sectionRefsMob = [
      { section: "dashboard1", ref: this.dashboardRef1 },
      { section: "ratingdivmobile", ref: this.ratingRefMob },
      { section: "reviewdivmobile", ref: this.reviewdivRefMob },
      { section: "recenttransactiondivmobile", ref: this.recenttransactiondivRefMob },
      { section: "projectinfodivmobile", ref: this.projectinfodivRefMob },
    ];
  }

  AddReview() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    console.log("Add review function");
    this.setState({
      showComponent: true,
      showComponent1: false,
      shareviewdisplayoption: false,
    });
  }

  AddPicture() {
    console.log("Add Picture function");
    this.setState({
      showComponent1: true,
      showComponent: false,
      shareviewdisplayoption: false,
    });
  }

  // getLocations() {


  //   console.log('get locations')
  //   let userLocation = {lat:null, lng: null}
  //   let projectLocation = {lat:null, lng: null}

  // }

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

    this.checkfavourite();
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
      marked_favourite: false,
      showlogoutstatus: true,
    });
  }
  signup() {
    console.log("hello");
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
    console.log("hello1");
    this.setState({ signupComponent: false, loginComponent: true });
  }
  signupHandler() {
    console.log("hello2");
    this.setState({ signupComponent: true, loginComponent: false });
  }

  registerHandler() {
    this.setState({ signupComponent: false, registerComponent: true });
  }

  opennotif() {
    this.setState({
      notification: true,
    });
    this.turnOffnotifications = setTimeout(() => {
      this.setState(() => ({ notification: false }));
    }, 20000);
  }

  closenotif() {
    this.setState({
      notification: false,
      review_status: false,
      picture_status: false,
    });
  }

  opennotif2() {
    console.log("CALLEEEDDD");
    this.setState({
      favnotification: true,
    });
    this.turnOffnotifications = setTimeout(() => {
      this.setState(() => ({ favnotification: false }));
    }, 20000);
  }

  closenotif2() {
    this.setState({
      favnotification: false,
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

  // onSelect({ key }) {
  //   // console.log(`${key} selected`);
  //   if ({key} === 1){
  //     console.log("he")
  //   }
  //   else if({key} === 2)
  //   {
  //     console.log("she")
  //   }
  // }

  handleTabSwitch(active) {
    this.setState({ activeTab: active });
  }

  helpfulclick = async (reviewid) => {
    // let votedid = localStorage.getItem("helpfulid");
    // votedid = JSON.parse(votedid)
    // votedid.push(reviewid);
    // localStorage.setItem("helpfulid", JSON.stringify(votedid) );
    // console.log(JSON.parse(localStorage.getItem("helpfulid")));
    // this.setState({helpful_id:helpful_id, votingnotification:true});
    // alert("voted");
    let success = await axios.get(
      `https://www.propviewz.com/be/helpful_review/` + reviewid
    );
    console.log(success);

    if (success.data.Reponse == "Success") {
      console.log("response received");
      const { project_id } = this.props.match.params;
      //dev
      //  let reviewdetails = await axios.get(`http://localhost:8081/project_review/`+project_id);
      //aws
      let reviewdetails = await axios.get(
        `https://www.propviewz.com/be/project_review/` + project_id
      );

      this.setState({ reviewdetails: reviewdetails.data });
      let sorttype = this.state.sorttype;
      console.log(sorttype);
      this.togglesort(sorttype);
    }
  };

  getModal(value) {
    // var textField = document.createElement('textarea')
    let location1 = location.href;
    var n = location1.indexOf("#");
    if (n != -1) {
      location1 = location1.substring(0, location1.indexOf("#"));
    }
    let code = location1 + "#" + value;
    // console.log(code)
    // textField.innerText = code
    // document.body.appendChild(textField)
    // textField.select()
    // document.execCommand('copy')
    // textField.remove()
    // alert("Link Copied");
    this.setState({ showModal: value, copiedlink: code });
    document.body.style.overflow = "hidden";
  }

  hideModal = (value) => {
    this.setState({ showModal: 0 });
    document.body.style.overflow = "unset";
  };

  showreviewimage(image) {
    // var textField = document.createElement('textarea')
    let reviewimages = [];
    reviewimages = image;
    console.log("review images", reviewimages);
    // let  photoIndexz, isOpenz } = this.state;
    this.setState({ reviewimages: reviewimages, isOpenz: true });
  }

  showMore = () => {
    this.state.itemsToShow === 3
      ? this.setState({
          itemsToShow: this.state.reviewdetails.length,
          expanded: true,
        })
      : this.setState({ itemsToShow: 3, expanded: false });
  };

  togglesort(event) {
    this.setState({
      sorttype: event,
      filteroptiondisplay: false,
      filteroptiondisplay2: false,
    });

    console.log("Button Clicked");
    console.log(event);

    if (event == "Most recent") {
      this.setState((prevState) => {
        this.state.reviewdetails.sort(
          (a, b) => new Date(b.review_date) - new Date(a.review_date)
        );
      });
    } else if (event == "Highest rating") {
      this.setState((prevState) => {
        this.state.reviewdetails.sort(
          (a, b) => b.overall_rating - a.overall_rating
        );
      });
    } else if (event == "Lowest rating") {
      this.setState((prevState) => {
        this.state.reviewdetails.sort(
          (a, b) => a.overall_rating - b.overall_rating
        );
      });
    } else if (event == "Most useful") {
      this.setState((prevState) => {
        this.state.reviewdetails.sort(
          (a, b) => b.helpful_count - a.helpful_count
        );
      });
    }
    this.setState({ dummy: true });
    // if(this.state.sort === true){
    //   this.setState(prevState => {
    //       this.state.reviewdetails.sort((a, b) => (new Date(a.review_date) - new Date(b.review_date)))
    //     });
    // }
    // else{
    //   this.setState(prevState => {
    //     this.state.reviewdetails.sort((a, b) => (new Date(b.review_date) - new Date(a.review_date)))
    //   });
    // }
    // this.setState(state => ({ sort: !state.sort }))
  }

  colorchange(number, e) {
    e.preventDefault();
    // if (number === 1) {
    //   this.setState({ menu1: "#ef403c", menu2: "transparent", menu3: "transparent", menu4: "transparent", menutext1: "white", menutext2: "white", menutext3: "white", menutext4: "white", fonttext1: "Catamaran-Bold", fonttext2: "Catamaran-Semibold", fonttext3: "Catamaran-Semibold", fonttext4: "Catamaran-Semibold" });
    //   var elmntToView = document.getElementById("ratingdiv");
    //   elmntToView.scrollIntoView();
    // }
    // else if (number === 2) {
    //   this.setState({ menu1: "transparent", menu2: "#ef403c", menu3: "transparent", menu4: "transparent", menutext1: "white", menutext2: "white", menutext3: "white", menutext4: "white", fonttext1: "Catamaran-Semibold", fonttext2: "Catamaran-Bold", fonttext3: "Catamaran-Semibold", fonttext4: "Catamaran-Semibold" });
    //   var elmntToView = document.getElementById("reviewdiv");
    //   elmntToView.scrollIntoView();
    // }
    // else if (number === 3) {
    //   this.setState({ menu1: "transparent", menu2: "transparent", menu3: "#ef403c", menu4: "transparent", menutext1: "white", menutext2: "white", menutext3: "white", menutext4: "white", fonttext1: "Catamaran-Semibold", fonttext2: "Catamaran-Semibold", fonttext3: "Catamaran-Bold", fonttext4: "Catamaran-Semibold" });
    //   var elmntToView = document.getElementById("recenttransactiondiv");
    //   elmntToView.scrollIntoView();
    // }
    // else if (number === 4) {
    //   this.setState({ menu1: "transparent", menu2: "transparent", menu3: "transparent", menu4: "#ef403c", menutext1: "white", menutext2: "blawhiteck", menutext3: "white", menutext4: "white", fonttext1: "Catamaran-Semibold", fonttext2: "Catamaran-Semibold", fonttext3: "Catamaran-Semibold", fonttext4: "Catamaran-Bold" });
    //   var elmntToView = document.getElementById("projectinfodiv");
    //   elmntToView.scrollIntoView();
    // }
    // else {

    // }
  }

  colorchangemobile(number, e) {
    e.preventDefault();
    if (number === 1) {
      this.setState({
        menu1: "#ef403c",
        menu2: "transparent",
        menu3: "transparent",
        menu4: "transparent",
        menutext1: "white",
        menutext2: "white",
        menutext3: "white",
        menutext4: "white",
        fonttext1: "Catamaran-Bold",
        fonttext2: "Catamaran-Semibold",
        fonttext3: "Catamaran-Semibold",
        fonttext4: "Catamaran-Semibold",
      });
      var elmntToView = document.getElementById("ratingdivmobile");
      elmntToView.scrollIntoView();
    } else if (number === 2) {
      this.setState({
        menu1: "transparent",
        menu2: "#ef403c",
        menu3: "transparent",
        menu4: "transparent",
        menutext1: "white",
        menutext2: "white",
        menutext3: "white",
        menutext4: "white",
        fonttext1: "Catamaran-Semibold",
        fonttext2: "Catamaran-Bold",
        fonttext3: "Catamaran-Semibold",
        fonttext4: "Catamaran-Semibold",
      });
      var elmntToView = document.getElementById("reviewdivmobile");
      elmntToView.scrollIntoView();
    } else if (number === 3) {
      this.setState({
        menu1: "transparent",
        menu2: "transparent",
        menu3: "#ef403c",
        menu4: "transparent",
        menutext1: "white",
        menutext2: "white",
        menutext3: "white",
        menutext4: "white",
        fonttext1: "Catamaran-Semibold",
        fonttext2: "Catamaran-Semibold",
        fonttext3: "Catamaran-Bold",
        fonttext4: "Catamaran-Semibold",
      });
      var elmntToView = document.getElementById("recenttransactiondivmobile");
      elmntToView.scrollIntoView();
    } else if (number === 4) {
      this.setState({
        menu1: "transparent",
        menu2: "transparent",
        menu3: "transparent",
        menu4: "#ef403c",
        menutext1: "white",
        menutext2: "blawhiteck",
        menutext3: "white",
        menutext4: "white",
        fonttext1: "Catamaran-Semibold",
        fonttext2: "Catamaran-Semibold",
        fonttext3: "Catamaran-Semibold",
        fonttext4: "Catamaran-Bold",
      });
      var elmntToView = document.getElementById("projectinfodivmobile");
      elmntToView.scrollIntoView();
    } else if (number === 5) {
      this.setState({
        menu1: "transparent",
        menu2: "transparent",
        menu3: "transparent",
        menu4: "transparent",
        menutext1: "white",
        menutext2: "white",
        menutext3: "white",
        menutext4: "white",
        fonttext1: "Catamaran-Semibold",
        fonttext2: "Catamaran-Semibold",
        fonttext3: "Catamaran-Semibold",
        fonttext4: "Catamaran-Semibold",
      });
      var elmntToView = document.getElementById("topdivmobile");
      elmntToView.scrollIntoView();
    } else {
    }
  }

  projectmediafetch = async () => {
    try {
      const { project_id } = this.props.match.params;
      //dev
      // let projectmedia = await axios.get(`http://localhost:8081/project_media/`+project_id);
      //aws
      let projectmedia = await axios.get(
        `https://www.propviewz.com/be/project_media/` + project_id
      );
      let userphotomedia = await axios.get(
        `https://www.propviewz.com/be/fetch_user_photos/` + project_id
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

  allmediafetch = async () => {
    try {
      if (this.state.allmedia === "") {
        const { project_id } = this.props.match.params;
        //dev
        // let projectmedia = await axios.get(`http://localhost:8081/project_media/`+project_id);
        //aws
        let allmedia = await axios.get(
          `https://www.propviewz.com/be/project_media/` + project_id
        );

        console.log("all Media DATA");
        console.log(allmedia);

        this.setState({
          allmedia: allmedia.data,
          carouseldisplay: allmedia.data,
          displayall: true,
          displaymanagement: false,
          displayuser: false,
          displayfloor: false,
        });
      } else {
        this.setState({
          carouseldisplay: this.state.allmedia,
          displayall: true,
          displaymanagement: false,
          displayuser: false,
          displayfloor: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  managementmediafetch = async () => {
    try {
      if (this.state.managementmedia === "") {
        // const { project_id } = this.props.match.params

        //     let managementmedia = await axios.get(`https://www.propviewz.com/be/project_media/`+project_id);

        // console.log("management Media DATA");
        // console.log(managementmedia);

        const managementmediaphotos = this.state.allmedia.filter(
          (media) =>
            media.media_type === "cover image" ||
            media.media_type === "gallery image"
        );
        // this.setState({ lists: managementmediaphotos });

        this.setState({
          managementmedia: managementmediaphotos,
          carouseldisplay: managementmediaphotos,
          displayall: false,
          displaymanagement: true,
          displayuser: false,
          displayfloor: false,
        });
      } else {
        this.setState({
          carouseldisplay: this.state.managementmedia,
          displayall: false,
          displaymanagement: true,
          displayuser: false,
          displayfloor: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  usermediafetch = async () => {
    try {
      if (this.state.usermedia === "") {
        const { project_id } = this.props.match.params;
        //dev
        // let projectmedia = await axios.get(`http://localhost:8081/project_media/`+project_id);
        //aws
        let usermedia = await axios.get(
          `https://www.propviewz.com/be/fetch_user_photos/` + project_id
        );

        console.log("user Media DATA");
        console.log(usermedia);

        // if(usermedia.data.length > 0 ){
        this.setState({
          usermedia: usermedia.data,
          carouseldisplay: usermedia.data,
          displayall: false,
          displaymanagement: false,
          displayuser: true,
          displayfloor: false,
        });
        // }
        // else{
        //   this.setState({usermedia:[{post_media:noimage}], carouseldisplay:[{post_media:noimage}], nouserimagefound:true,  displayall:false, displaymanagement:false,displayuser:true,displayfloor:false})
        // }
        // console.log("checkingggg");
        // console.log(this.state);
      } else {
        this.setState({
          carouseldisplay: this.state.usermedia,
          displayall: false,
          displaymanagement: false,
          displayuser: true,
          displayfloor: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  floormediafetch = async () => {
    try {
      if (this.state.floormedia === "") {
        // const { project_id } = this.props.match.params

        //     let managementmedia = await axios.get(`https://www.propviewz.com/be/project_media/`+project_id);

        // console.log("management Media DATA");
        // console.log(managementmedia);

        const floormediaphotos = this.state.allmedia.filter(
          (media) => media.media_type === "floor image"
        );
        // this.setState({ lists: managementmediaphotos });
        console.log("floor Media DATA");
        console.log(floormediaphotos);

        this.setState({
          floormedia: floormediaphotos,
          carouseldisplay: floormediaphotos,
          displayall: false,
          displaymanagement: false,
          displayuser: false,
          displayfloor: true,
        });
      } else {
        this.setState({
          carouseldisplay: this.state.floormedia,
          displayall: false,
          displaymanagement: false,
          displayuser: false,
          displayfloor: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  projectdetails = async () => {
    try {
      const { project_id } = this.props.match.params;
      //dev
      //   let projectdetails = await axios.get(`http://localhost:8081/project_details/`+project_id);
      //aws
      let projectdetails = await axios.get(
        `https://www.propviewz.com/be/project_details/` + project_id
      );
      console.log("project DATA");
      console.log(projectdetails.data);

      if (projectdetails.data.length > 0) {
        this.setState({ projectdetails: projectdetails.data });
      } else {
        window.location.replace("/404");
      }
    } catch (e) {
      console.log(e);
    }
  };

  reviewdetails = async () => {
    try {
      const { project_id } = this.props.match.params;
      //dev
      //  let reviewdetails = await axios.get(`http://localhost:8081/project_review/`+project_id);
      //aws
      let reviewdetails = await axios.get(
        `https://www.propviewz.com/be/project_review/` + project_id
      );
      console.log("Review DATA");
      console.log(reviewdetails.data);
      this.setState({ reviewdetails: reviewdetails.data });
    } catch (e) {
      console.log(e);
    }
  };

  projectinfo = async () => {
    try {
      const { project_id } = this.props.match.params;
      //dev
      //  let projectinfo = await axios.get(`http://localhost:8081/project_config/`+project_id);
      //aws
      let projectinfo = await axios.get(
        `https://www.propviewz.com/be/project_config/` + project_id
      );
      console.log("Projectinfo DATA");
      console.log(projectinfo.data);
      this.setState({ projectinfo: projectinfo.data });
    } catch (e) {
      console.log(e);
    }
  };

  // projecttransaction = async () =>{
  //   try{
  //   const { project_id } = this.props.match.params
  //       //dev
  //       //    let projecttransaction = await axios.get(`http://localhost:8081/project_transaction/`+project_id);
  //       //aws
  //       let projecttransaction = await axios.get(`https://www.propviewz.com/be/project_transaction/`+project_id);
  //   console.log("projecttransaction DATA");
  //   console.log(projecttransaction.data);
  //   this.setState({projecttransaction:projecttransaction.data})
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }

  newprojecttransaction = async () => {
    try {
      const { project_id } = this.props.match.params;
      //dev
      //    let projecttransaction = await axios.get(`http://localhost:8081/project_transaction/`+project_id);
      //aws
      let newprojecttransaction = await axios.get(
        `https://www.propviewz.com/be/projectTransaction_new/` + project_id
      );
      console.log("newprojecttransaction DATA");
      console.log(newprojecttransaction.data);
      this.setState({ newprojecttransaction: newprojecttransaction.data });
    } catch (e) {
      console.log(e);
    }
  };

  // suggestedproject = async () =>{
  //   try{
  //   const { project_id } = this.props.match.params
  //       //dev
  //       //    let suggestedproject = await axios.get(`http://localhost:8081/suggested_project/`+project_id);
  //       //aws
  //       let suggestedproject = await axios.get(`https://www.propviewz.com/be/suggested_project/`+project_id);
  //   console.log("suggestedproject DATA");
  //   console.log(suggestedproject.data);
  //   this.setState({suggestedproject:suggestedproject.data})
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }

  projectamenities = async () => {
    try {
      const { project_id } = this.props.match.params;
      //dev
      //    let suggestedproject = await axios.get(`http://localhost:8081/suggested_project/`+project_id);
      //aws
      let projectamenities = await axios.get(
        `https://www.propviewz.com/be/project_amenities/` + project_id
      );
      console.log("projectamenities DATA");
      console.log(projectamenities.data);
      this.setState({ projectamenities: projectamenities.data });
    } catch (e) {
      console.log(e);
    }
  };

  developerinfo = async () => {
    try {
      const { project_id } = this.props.match.params;
      //dev
      //    let suggestedproject = await axios.get(`http://localhost:8081/suggested_project/`+project_id);
      //aws
      let developerinfo = await axios.get(
        `https://www.propviewz.com/be/developer_info/` + project_id
      );
      console.log("developerinfo DATA");
      console.log(developerinfo.data);
      this.setState({ developerinfo: developerinfo.data });
    } catch (e) {
      console.log(e);
    }
  };

  projectvisitcount = async () => {
    try {
      const { project_id } = this.props.match.params;
      let visitstatus = await axios.get(
        `https://www.propviewz.com/be/count_page_visit/` + project_id
      );
      console.log("visit status", visitstatus);
    } catch (e) {
      console.log(e);
    }
  };

  showshareviewoptions = async () => {
    this.setState({
      shareviewdisplayoption: !this.state.shareviewdisplayoption,
    });
  };

  showfilterptions = async () => {
    this.setState({
      filteroptiondisplay: !this.state.filteroptiondisplay,
    });
  };

  showfilterptions2 = async () => {
    this.setState({
      filteroptiondisplay2: !this.state.filteroptiondisplay2,
    });
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        shareviewdisplayoption: false,
      });
    } else if (this.wrapperRef1 && !this.wrapperRef1.contains(event.target)) {
      this.setState({
        filteroptiondisplay: false,
      });
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setWrapperRef1(node) {
    this.wrapperRef1 = node;
  }

  async componentWillMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    const { project_id } = this.props.match.params;
    console.log("ANKIT");
    console.log(this.props);
    await this.allmediafetch();
    await this.projectdetails();
    await this.reviewdetails();
    await this.projectinfo();
    // await this.projecttransaction();
    await this.newprojecttransaction();
    // await this.suggestedproject();
    await this.projectamenities();
    await this.developerinfo();
    await this.projectvisitcount();
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
    let sorttype = "Most recent";
    this.togglesort(sorttype);
    this.setState({ sorttype: "Most recent" });
  }

  // handleScroll(e) {
  //   if(window.pageYOffset > 550 && window.pageYOffset < 900) {
  //     console.log('scrolled');
  //     this.setState({
  //       showBanner: true,
  //     });
  //   } else {
  //     this.setState({
  //       showBanner: false,
  //     });
  //   }
  // }

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    localStorage.getItem("helpfulid");
    let votedid = localStorage.getItem("helpfulid");
    votedid = JSON.parse(votedid);
    if (votedid === null) {
      votedid = [];
      votedid.push(-2);
      localStorage.setItem("helpfulid", JSON.stringify(votedid));
    }
    // window.addEventListener('scroll', this.handleScroll);

    this.setState({
      loggedin: localStorage.getItem("loggedin"),
      loggedinuseremail: localStorage.getItem("loggedInUseremail"),
      loggedinusername: localStorage.getItem("loggedInUsername"),
      city: localStorage.getItem("city"),
    });
    console.log("browser", window);
    if (isChrome) {
      console.log("Chrome browser found");
    }
    if (isFirefox) {
      console.log("firefox browser found");
    }
    if (localStorage.getItem("loggedin")) {
      this.checkfavourite();
    }




    if(this.state.projectdetails) {

      let newName = this.state.projectdetails[0].project_name.split(" ").join("+")
      // string
      let newArea = this.state.projectdetails[0].area.split(',').join("+")
       let a = newArea.split(" ").join("+")
       let final = newName+ "+" + a;

      
        await this.setState(
         {
         project_location : final
         }
        )
   

      
    }
   
  }

  //Natrix Code.
  componentDidUpdate(prevState) {}

  onClose() {
    this.setState({
      showComponent1: false,
      showComponent: false,
    });
  }

  // async componentWillReceiveProps(nextProps) {
  // await this.projectmediafetch();
  // await this.projectdetails();
  // await this.reviewdetails();
  // await this.projectinfo();
  // await this.projecttransaction();
  // await this.suggestedproject();
  // }

  paymentClose() {
    this.setState({ paymentShow1: false, paymentShow2: false });
  }

  addFavourite = async (e) => {
    e.preventDefault();
    const { project_id } = this.props.match.params;
    console.log("Project id", project_id);
    if (this.state.loggedinuseremail) {
      let addFavouriteresponse = await axios.post(
        "https://www.propviewz.com/be/save_favorite_project/",
        {
          project_id: project_id,
          email: this.state.loggedinuseremail,
        }
      );
      console.log("favourite response", addFavouriteresponse);
      if (
        addFavouriteresponse.data.Response === "Success" &&
        addFavouriteresponse.data.Action === "Added"
      ) {
        this.setState({ marked_favourite: true });
      }
    } else {
      this.opennotif2();
    }

    // this.setState({allcomments:fetchallcomments.data})
  };

  removeFavourite = async (e) => {
    e.preventDefault();
    const { project_id } = this.props.match.params;
    console.log("Project id", project_id);
    if (this.state.loggedinuseremail) {
      let addFavouriteresponse = await axios.post(
        "https://www.propviewz.com/be/save_favorite_project/",
        {
          project_id: project_id,
          email: this.state.loggedinuseremail,
        }
      );
      console.log("favourite response", addFavouriteresponse);
      if (
        addFavouriteresponse.data.Response === "Success" &&
        addFavouriteresponse.data.Action === "Removed"
      ) {
        this.setState({ marked_favourite: false });
      }
    } else {
      this.opennotif2();
    }

    // this.setState({allcomments:fetchallcomments.data})
  };

  checkfavourite = async () => {
    console.log("checking favourite");

    const { project_id } = this.props.match.params;
    console.log("Project id", project_id);

    let checkFavouriteresponse = await axios.post(
      "https://www.propviewz.com/be/check_favorite/",
      {
        email: this.state.loggedinuseremail
          ? this.state.loggedinuseremail
          : localStorage.getItem("loggedInUseremail"),
        project_id: project_id,
      }
    );
    console.log("check favourite response", checkFavouriteresponse);

    if (checkFavouriteresponse.data.Response === "Success") {
      this.setState({ marked_favourite: true });
    }
  };

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    let review_id = event.target.review_id.value;
    console.log("REVIEW SUBMIT CALLED", this.state.usercomment, review_id);
    let reviewsubmitresponse = await axios.post(
      "https://www.propviewz.com/be/save_comment",
      {
        review_id: review_id,
        comment: this.state.usercomment,
        email: this.state.loggedinuseremail,
        name: this.state.loggedinusername,
      }
    );
    console.log("REVIEW SUBMIT RESPONSE", reviewsubmitresponse);
    if (reviewsubmitresponse.data.Response == "Success") {
      console.log("response received");
      const { project_id } = this.props.match.params;
      //dev
      //  let reviewdetails = await axios.get(`http://localhost:8081/project_review/`+project_id);
      //aws
      let reviewdetails = await axios.get(
        `https://www.propviewz.com/be/project_review/` + project_id
      );
      console.log("Review DATA");
      console.log(reviewdetails.data);
      this.setState({ reviewdetails: reviewdetails.data, usercomment: "" });
      let sorttype = this.state.sorttype;
      console.log(sorttype);
      this.togglesort(sorttype);
    }
  };

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


  render() {

    console.log('testttttttttttttttttttttttttttt => ', this.state.carouseldisplay)



    if(this.state.projectdetails) {

      let newName = this.state.projectdetails[0].project_name.split(" ").join("+")
      let newArea = this.state.projectdetails[0].area.split(',').join("+")
       let a = newArea.split(" ").join("+")

       let final = newName+ "+" + a;

       if(!this.state.project_location)
   {
    this.setState(
      {
        project_location : final
      }
      )
   }

      
    }

    // {this.state.projectdetails[0].project_name}
    // {this.state.projectdetails[0].area}



    // let menu = (
    //   <Menu>

    //     <MenuItem><h6> <div onClick={this.AddReview} style={{placeContent:"center",display:"flex",fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}>
    //          <img width="30px" src={menu1icon}/>
    //           <div style={{marginTop: "6px", marginLeft: "5px"}}>Add Review</div>
    //       </div></h6></MenuItem>

    //     {/* <MenuItem><h6><span onClick={this.AddReview} style={{fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}><span style={{verticalAlign: "bottom"}}> <img width="30px" src={menu1icon}/></span>&nbsp; Add Review</span></h6></MenuItem> */}
    //     <Divider />

    //     <MenuItem><h6><div onClick={this.AddPicture} style={{placeContent:"center",display:"flex",fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}>
    //          <img width="30px" src={menu2icon}/>
    //           <div style={{marginTop: "6px", marginLeft: "5px"}}>Post a Picture</div>
    //       </div></h6>
    //     </MenuItem>
    //     {/* <MenuItem><h6><span onClick={this.AddPicture} style={{fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}><span style={{verticalAlign: "bottom"}}> <img width="30px" src={menu2icon}/></span>&nbsp; Post a Picture</span></h6></MenuItem> */}
    //   </Menu>
    // );
    const {
      photoIndex,
      isOpen,
      photoIndex1,
      photoIndex0,
      photoIndex2,
      isOpen1,
      isOpen0,
      isOpen2,
      photoIndexz,
      isOpenz,
    } = this.state;
    let overall_rating = 0;
    if (this.state.projectdetails) {
      overall_rating = this.state.projectdetails[0].overall_rating;
    }
    let allcaroselimage0;
    let allcaroselimage1;
    let allcaroselimage2;
    let allcaroselimage3;
    let allcaroselimageno;
    let allreviews;
    let allreviews_mobile;
    let projectphase;
    let projectinfomobile;
    let projectconfiguration;
    let pricerange;
    let possession;
    // let suggestedprojectall;
    let amenitiesimage0;
    let amenitiesimage1;
    let amenitiesimage2;
    let amenitiesimage3;
    let amenitiesimage4;
    let amenitiesimage5;
    let commentbyid;

    let transactiondate;
    let transactiontype;
    let transactionunit;
    let transactionfloor;
    let transactionarea;
    let transactionamount;

    let mobiletransactionview;








    if (this.state.carouseldisplay.length > 0) {
      if (
        this.state.displayall &&
        !this.state.displaymanagement &&
        !this.state.displayuser &&
        !this.state.displayfloor
      ) {
        

        console.log('aaaaaaaaaaaallbbbbbllllllll =>', this.state.carouseldisplay)
        allcaroselimage0 = this.state.carouseldisplay.map((media) => (
          <div>
            {media.media_link && (
              <img
                src={media.media_link ? media.media_link : noimage}
                className="projectphoto"
                alt="Project pics"
                onClick={() => {
                  this.setState({ isOpen0: true })
                  this.setState({hide : true})
                }}
              />
            )}

            {/* {media.post_media &&
          <img src={media.post_media?media.post_media:noimage} className="projectphoto" alt="Project pics" onClick={() => this.setState({ isOpen: true })}/>
          } */}
          </div>
        ));
      } else if (
        !this.state.displayall &&
        this.state.displaymanagement &&
        !this.state.displayuser &&
        !this.state.displayfloor
      ) {
      
        console.log('aaaaaaaaaaaallllllllll displaymanagement =>', this.state.carouseldisplay)
        allcaroselimage1 = this.state.carouseldisplay.map((media) => (
          
          <div>
            {media.media_link && (
                <img
                src={media.media_link ? media.media_link : noimage}
                className="projectphoto"
                alt="Project pics"
                onClick={() => {
                  this.setState({ isOpen1: true })
                  this.setState({hide : true})
                }}
                

              />

      

            )}

            {/* {media.post_media &&
          <img src={media.post_media?media.post_media:noimage} className="projectphoto" alt="Project pics" onClick={() => this.setState({ isOpen: true })}/>
          } */}

           

          </div>
           
     
        ));
      } else if (
        !this.state.displayall &&
        !this.state.displaymanagement &&
        this.state.displayuser &&
        !this.state.displayfloor
      ) {
        console.log('aaaaaaaaaaaallllllllll user =>', this.state.carouseldisplay)
        allcaroselimage2 = this.state.carouseldisplay.map((media) => (
          <div>
            {/* {media.media_link &&
            <img src={media.media_link?media.media_link:noimage} className="projectphoto" alt="Project pics" onClick={() => this.setState({ isOpen1: true })}/>
            } */}

            {media.post_media && (
              <img
                src={media.post_media ? media.post_media : noimage}
                className="projectphoto"
                alt="Project pics"
                onClick={() => {
                  this.setState({ isOpen: true })
                  this.setState({hide : true})
                }}
              />
            )}
          </div>
        ));
      } else if (
        !this.state.displayall &&
        !this.state.displaymanagement &&
        !this.state.displayuser &&
        this.state.displayfloor
      ) {
        console.log("else if satidfied");
        allcaroselimage3 = this.state.carouseldisplay.map((media) => (
          <div>
            {media.media_link && (
             
                <img
                src={media.media_link ? media.media_link : noimage}
                className="projectphoto"
                alt="Project pics"
                onClick={() => {
                  this.setState({ isOpen2: true })
                  this.setState({hide : true})
                }}
              />
              
              
            )}

            {/* {media.post_media &&
          <img src={media.post_media?media.post_media:noimage} className="projectphoto" alt="Project pics" onClick={() => this.setState({ isOpen: true })}/>
          } */}
          </div>
        ));
      }
    } else {
      allcaroselimageno = (
        <div>
          <img src={noimage} className="projectphoto" alt="No Image Found" />
        </div>
      );
    }

    // if(this.state.allcomments.length>0){
    //   commentbyid = (
    //     this.state.allcomments.map(comment =>(
    //     <div className="commentshowdiv">
    //         <div className="reviewcardfirstrow">
    //           <img src={usericon} alt="" className="reviewprofileimagestylep" alt="sideprojectcover"/>
    //           <div className="reviewcontainerp">
    //             <h5 className="reviewernamep">{comment.name}</h5>
    //             <h6 className="reviewerdatep">{(comment.comment_date).toString().slice(0,10)}</h6>
    //           </div>
    //         </div>
    //         <div className="row">
    //           <div className="col-xl-12">
    //             <div>
    //                 <h5 className="reviewdetail">{comment.comment}</h5>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //   )));
    // }

    if (this.state.reviewdetails) {
      allreviews = this.state.reviewdetails
        .slice(0, this.state.itemsToShow)
        .map((review) => (
          <div
            className="reviewcard"
            id={review.review_id}
            style={{ scrollMargin: "30vh" }}
          >
            <div className="row">
              <div className="col-sm-6">
                <div className="reviewcardfirstrow">
                  <img
                    src={usericon}
                    alt=""
                    className="reviewprofileimagestylep"
                    alt="sideprojectcover"
                  />
                  <div className="reviewcontainerp">
                    <h5 className="reviewernamep">
                      {review.reviewer_name} (
                      {review.reviewer_type === "google_reviewer"
                        ? "Google Reviewer"
                        : review.reviewer_type}
                      )
                    </h5>
                    <h5 className="reviewerdatep">{review.review_date}</h5>
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
                    starDimension="30px"
                    numberOfStars={5}
                    name="rating"
                    starSpacing="2px"
                  />
                </div>
                <div className="smallstar">
                  <StarRatings
                    rating={review.overall_rating}
                    starRatedColor="rgb(251, 200, 0)"
                    changeRating={this.changeRating}
                    starDimension="30px"
                    numberOfStars={5}
                    name="rating"
                    starSpacing="2px"
                  />
                </div>
                {review.reviewer_type === "google_reviewer" && (
                  <div style={{ marginTop: "5px" }}>
                    <span className="googlereviewtextstyle">
                      Google Reviews
                    </span>
                  </div>
                )}
                {/* <img src={noimage} alt="No Image Available" className="reviewimagestyle"/> */}
              </div>

              {/* <img src={sideprojectimages} alt="" className="sideprojectimagestyle"/> */}
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "unset" }}>
                    <h4 className="reviewdetailtitle">{review.review_title}</h4>
                    <p className="reviewdetail">{review.review}</p>
                  </div>
                  {review.Media_data && review.Media_data.length > 0 && (
                    <div
                      className="container2"
                      onClick={() => this.showreviewimage(review.Media_data)}
                    >
                      <img
                        style={{ width: "20vh", height: "10vh" }}
                        src={review.Media_data[0].media_link}
                      />
                      
                      <div className="centered">{review.Media_data.length}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="commentcountstyle">
              {review.comment_count} Comments {review.helpful_count} Votes
            </div>
            <footer className="review-footer">
              <div className="upvote">
                <h4
                  className="reviewfooteranchorstyle"
                  style={{ visibility: "hidden" }}
                >
                  Comment
                </h4>

                <img src={comment} className="commentimage" />
              </div>

              {/* {JSON.parse(localStorage.getItem("helpfulid")).indexOf(review.review_id) === -1  && */}
              <div
                className="help"
                style={{ cursor: "pointer" }}
                onClick={this.helpfulclick.bind(this, review.review_id)}
              >
                <img src={thumb} className="helpimage" />
                <a className="reviewfooteranchorstyle">Helpful</a>
              </div>
              {/* } */}

              {/* {JSON.parse(localStorage.getItem("helpfulid")).indexOf(review.review_id) >= 0  &&
          <div className="help">
            <img src={thumb} className="helpimage"/>
             <a className="reviewfooteranchorstyle">Voted!!</a> 
          </div>
          } */}

              <div
                className="report"
                onClick={() => this.getModal(review.review_id)}
                style={{ cursor: "pointer" }}
              >
                <img src={share} className="reportimage" />
                <a className="reviewfooteranchorstyle">Share</a>
              </div>
              <Modal
                show={this.state.showModal === review.review_id}
                onHide={() => this.hideModal(review.review_id)}
                name={review.reviewer_name}
                // date={review.review_date}
                // rating={review.overall_rating}
                // title={review.review_title}
                review={review.review}
                copiedlink={this.state.copiedlink}
              />

              <div className="report">
                <img src={redflag} className="reportimage" />
                <a
                  href={"/projects/reportreview/" + review.review_id}
                  className="reviewfooteranchorstyle"
                  target="_blank"
                >
                  Report
                </a>
              </div>
            </footer>
            <div>
              <Collapsible trigger="Comment">
                {this.state.loggedin === true ||
                this.state.loggedin === "true" ? (
                  <div class="input-container">
                    <form
                      style={{ display: "contents" }}
                      onSubmit={this.handleSubmit}
                    >
                      <input
                        type="hidden"
                        id="review_id"
                        name="review_id"
                        value={review.review_id}
                      />
                      <input
                        type="text"
                        class="input-field"
                        id="usercomment"
                        name="usercomment"
                        placeholder="Enter Comment"
                        required
                        onChange={this.myChangeHandler}
                        value={this.state.usercomment}
                      />
                      <button type="submit" class="input-button">
                        POST
                      </button>
                    </form>
                  </div>
                ) : (
                  ""
                )}
                {/* {commentbyid} */}
                {review.comments.length > 0 ? (
                  review.comments.map((comment, i) => {
                    return (
                      <div className="commentshowdiv">
                        <div className="reviewcardfirstrow">
                          <img
                            src={usericon}
                            alt=""
                            className="reviewprofileimagestylep"
                            alt="sideprojectcover"
                          />
                          <div className="reviewcontainerp">
                            <h5 className="reviewernamep">{comment.name}</h5>
                            <h6 className="reviewerdatep">
                              {comment.comment_date.toString().slice(0, 10)}
                            </h6>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12">
                            <div>
                              <h5 className="reviewdetail">
                                {comment.comment}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="commentshowdiv">
                    <div className="row">
                      <div className="col-xl-12">
                        <div>
                          <h5
                            className="reviewdetail"
                            style={{ marginBottom: "0px" }}
                          >
                            {"No Comments Yet"}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Collapsible>
            </div>
          </div>
        ));

      allreviews_mobile = this.state.reviewdetails
        .slice(0, this.state.itemsToShow)
        .map((review) => (
          <div
            className="reviewcardmobile"
            id={review.review_id}
            style={{ scrollMargin: "30vh" }}
          >
            <div className="row">
              <div className="col-6" style={{ paddingRight: "0px" }}>
                <div className="reviewcardfirstrow">
                  <img
                    src={usericon}
                    alt=""
                    className="reviewprofileimagestylep"
                    alt="sideprojectcover"
                  />
                  <div className="reviewcontainerp">
                    <h6 className="reviewernamep">
                      {review.reviewer_name} (
                      {review.reviewer_type === "google_reviewer"
                        ? "Google Reviewer"
                        : review.reviewer_type}
                      )
                    </h6>
                    <h6 className="reviewerdatep">{review.review_date}</h6>
                    {/* <div>June 2020</div> */}
                  </div>
                </div>
              </div>

              <div className="col-6 rightalign" style={{ paddingLeft: "0px" }}>
                <div className="bigstar">
                  <StarRatings
                    rating={review.overall_rating}
                    starRatedColor="rgb(251, 200, 0)"
                    changeRating={this.changeRating}
                    starDimension="30px"
                    numberOfStars={5}
                    name="rating"
                    starSpacing="2px"
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
                    starSpacing="2px"
                  />
                </div>
                {/* <div style={{marginTop:'5px'}}><span className="googlereviewtextstyle">Google Reviews</span></div> */}
                {/* <img src={noimage} alt="No Image Available" className="reviewimagestyle"/> */}
              </div>

              {/* <img src={sideprojectimages} alt="" className="sideprojectimagestyle"/> */}
            </div>

            <div className="row">
              <div className="col-sm-12">
                {review.reviewer_type === "google_reviewer" && (
                  <div style={{ marginTop: "-10px", float: "right" }}>
                    <span className="googlereviewtextstyle">
                      Google Reviews
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "unset" }}>
                    <h5 className="reviewdetailtitle">{review.review_title}</h5>
                    <p className="reviewdetail">{review.review}</p>
                  </div>
                  {review.Media_data && review.Media_data.length > 0 && (
                    <div
                      className="container2"
                      onClick={() => this.showreviewimage(review.Media_data)}
                    >
                      <img
                        style={{ width: "20vh", height: "10vh" }}
                        src={review.Media_data[0].media_link}
                      />
                      <div className="centered">{review.Media_data.length}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="commentcountstyle">
              {review.comment_count} Comments {review.helpful_count} Votes
            </div>
            <footer className="review-footer">
              <div className="upvote">
                <h4
                  className="reviewfooteranchorstyle"
                  style={{ fontFamily: "Catamaran", visibility: "hidden" }}
                >
                  Comment
                </h4>

                <img src={comment} className="commentimage" />
              </div>

              {/* {JSON.parse(localStorage.getItem("helpfulid")).indexOf(review.review_id) === -1  && */}
              <div
                className="help"
                style={{ cursor: "pointer" }}
                onClick={this.helpfulclick.bind(this, review.review_id)}
              >
                <img src={thumb} className="helpimage" />
                <a className="reviewfooteranchorstyle">Helpful</a>
              </div>
              {/* } */}

              {/* {JSON.parse(localStorage.getItem("helpfulid")).indexOf(review.review_id) >= 0  &&
      <div className="help">
        <img src={thumb} className="helpimage"/>
         <a className="reviewfooteranchorstyle">Voted!!</a> 
      </div>
      } */}

              <div
                className="report"
                onClick={() => this.getModal(review.review_id)}
                style={{ cursor: "pointer" }}
              >
                <img src={share} className="reportimage" />
                <a className="reviewfooteranchorstyle">Share</a>
              </div>
              <Modal
                show={this.state.showModal === review.review_id}
                onHide={() => this.hideModal(review.review_id)}
                name={review.reviewer_name}
                // date={review.review_date}
                // rating={review.overall_rating}
                // title={review.review_title}
                review={review.review}
                copiedlink={this.state.copiedlink}
              />

              <div className="report">
                <img src={redflag} className="reportimage" />
                <a
                  href={"/projects/reportreview/" + review.review_id}
                  className="reviewfooteranchorstyle"
                  target="_blank"
                >
                  Report
                </a>
              </div>
            </footer>
            <div>
              <Collapsible trigger="Comment">
                {this.state.loggedin === true ||
                this.state.loggedin === "true" ? (
                  <div class="input-container">
                    <form
                      style={{ display: "contents" }}
                      onSubmit={this.handleSubmit}
                    >
                      <input
                        type="hidden"
                        id="review_id"
                        name="review_id"
                        value={review.review_id}
                      />
                      <input
                        type="text"
                        class="input-field"
                        id="usercomment"
                        name="usercomment"
                        placeholder="Enter Comment"
                        required
                        onChange={this.myChangeHandler}
                        value={this.state.usercomment}
                      />
                      <button type="submit" class="input-button">
                        POST
                      </button>
                    </form>
                  </div>
                ) : (
                  ""
                )}
                {/* {commentbyid} */}
                {review.comments.length > 0 ? (
                  review.comments.map((comment, i) => {
                    return (
                      <div className="commentshowdiv">
                        <div className="reviewcardfirstrow">
                          <img
                            src={usericon}
                            alt=""
                            className="reviewprofileimagestylep"
                            alt="sideprojectcover"
                          />
                          <div className="reviewcontainerp">
                            <h5 className="reviewernamep">{comment.name}</h5>
                            <h6 className="reviewerdatep">
                              {comment.comment_date.toString().slice(0, 10)}
                            </h6>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12">
                            <div>
                              <h5 className="reviewdetail">
                                {comment.comment}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="commentshowdiv">
                    <div className="row">
                      <div className="col-xl-12">
                        <div>
                          <h5
                            className="reviewdetail"
                            style={{ marginBottom: "0px" }}
                          >
                            {"No Comments Yet"}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Collapsible>
            </div>
          </div>
        ));
    }

    if (this.state.projectinfo) {
      projectphase = this.state.projectinfo.map((project) => (
        <p className="fieldmargin">{project.project_phase}</p>
      ));

      projectconfiguration = this.state.projectinfo.map((project) => (
        <p className="fieldmargin">{project.configuration}</p>
      ));

      pricerange = this.state.projectinfo.map((project) => (
        <p className="fieldmargin">{project.price_range}</p>
      ));
      possession = this.state.projectinfo.map((project) => (
        <p className="fieldmargin">{project.possesion_date}</p>
      ));
    }

    if (this.state.projectinfo) {
      projectinfomobile = this.state.projectinfo.map((project) => (
        <tr>
          <td>
            {this.state.projectinfo && (
              <p className="medium" style={{ color: "#404041" }}>
                {project.project_phase}
              </p>
            )}
          </td>
          <td>
            {this.state.projectinfo && (
              <p className="medium" style={{ color: "#404041" }}>
                {project.configuration}
              </p>
            )}
          </td>
          <td>
            {this.state.projectinfo && (
              <p className="medium" style={{ color: "#404041" }}>
                {project.price_range}
              </p>
            )}
          </td>
          <td>
            {this.state.projectinfo && (
              <p className="medium" style={{ color: "#404041" }}>
                {project.possesion_date}
              </p>
            )}
          </td>
        </tr>
      ));
    }

    // if(this.state.suggestedproject){
    //   suggestedprojectall =(
    //     this.state.suggestedproject.slice(0, 5).map(project =>(

    //         <SideProjects project_id={project.project_id}
    //                       media_link={project.media_link}
    //                       location={project.area}
    //                       city={project.city}
    //                       project_name={project.project_name}
    //                       overall_rating={project.overall_rating}
    //                       reviewcount={project.reviewcount}
    //                       />

    //   )));
    // }

    if (this.state.projectamenities && this.state.projectamenities[0]) {
      if (
        this.state.projectamenities[0].amenities_type.toLowerCase() ===
        "kids play area"
      ) {
        amenitiesimage0 = (
          <div>
            <img src={kidsplay} alt="amenities image" />
            <p className="medium custom-font-size">Kids Play Area</p>
          </div>
        );
      } else if (
        this.state.projectamenities[0].amenities_type.toLowerCase() ===
        "swimming pool"
      ) {
        amenitiesimage0 = (
          <div>
            <img src={swimming} alt="amenities image" />
            <p className="medium custom-font-size">Swimming Pool</p>
          </div>
        );
      } else if (
        this.state.projectamenities[0].amenities_type.toLowerCase() ===
        "indoor games"
      ) {
        amenitiesimage0 = (
          <div>
            <img src={indoor} alt="amenities image" />
            <p className="medium custom-font-size">Indoor Games</p>
          </div>
        );
      } else if (
        this.state.projectamenities[0].amenities_type.toLowerCase() === "garden"
      ) {
        amenitiesimage0 = (
          <div>
            <img src={garden} alt="amenities image" />
            <p className="medium custom-font-size">Garden</p>
          </div>
        );
      } else if (
        this.state.projectamenities[0].amenities_type.toLowerCase() ===
        "outdoor games"
      ) {
        amenitiesimage0 = (
          <div>
            <img src={outdoor} alt="amenities image" />
            <p className="medium custom-font-size">Outdoor Games</p>
          </div>
        );
      } else if (
        this.state.projectamenities[0].amenities_type.toLowerCase() === "gym"
      ) {
        amenitiesimage0 = (
          <div>
            <img src={gym} alt="amenities image" />
            <p className="medium custom-font-size">Gym</p>
          </div>
        );
      } else {
        amenitiesimage0 = <div></div>;
      }
    }

    if (this.state.projectamenities && this.state.projectamenities[1]) {
      if (
        this.state.projectamenities[1].amenities_type.toLowerCase() ===
        "kids play area"
      ) {
        amenitiesimage1 = (
          <div>
            <img src={kidsplay} alt="amenities image" />
            <p className="medium custom-font-size">Kids Play Area</p>
          </div>
        );
      } else if (
        this.state.projectamenities[1].amenities_type.toLowerCase() ===
        "swimming pool"
      ) {
        amenitiesimage1 = (
          <div>
            <img src={swimming} alt="amenities image" />
            <p className="medium custom-font-size">Swimming Pool</p>
          </div>
        );
      } else if (
        this.state.projectamenities[1].amenities_type.toLowerCase() ===
        "indoor games"
      ) {
        amenitiesimage1 = (
          <div>
            <img src={indoor} alt="amenities image" />
            <p className="medium custom-font-size">Indoor Games</p>
          </div>
        );
      } else if (
        this.state.projectamenities[1].amenities_type.toLowerCase() === "garden"
      ) {
        amenitiesimage1 = (
          <div>
            <img src={garden} alt="amenities image" />
            <p className="medium custom-font-size">Garden</p>
          </div>
        );
      } else if (
        this.state.projectamenities[1].amenities_type.toLowerCase() ===
        "outdoor games"
      ) {
        amenitiesimage1 = (
          <div>
            <img src={outdoor} alt="amenities image" />
            <p className="medium custom-font-size">Outdoor Games</p>
          </div>
        );
      } else if (
        this.state.projectamenities[1].amenities_type.toLowerCase() === "gym"
      ) {
        amenitiesimage1 = (
          <div>
            <img src={gym} alt="amenities image" />
            <p className="medium custom-font-size">Gym</p>
          </div>
        );
      } else {
        amenitiesimage1 = <div></div>;
      }
    }

    if (this.state.projectamenities && this.state.projectamenities[2]) {
      if (
        this.state.projectamenities[2].amenities_type.toLowerCase() ===
        "kids play area"
      ) {
        amenitiesimage2 = (
          <div>
            <img src={kidsplay} alt="amenities image" />
            <p className="medium custom-font-size">Kids Play Area</p>
          </div>
        );
      } else if (
        this.state.projectamenities[2].amenities_type.toLowerCase() ===
        "swimming pool"
      ) {
        amenitiesimage2 = (
          <div>
            <img src={swimming} alt="amenities image" />
            <p className="medium custom-font-size">Swimming Pool</p>
          </div>
        );
      } else if (
        this.state.projectamenities[2].amenities_type.toLowerCase() ===
        "indoor games"
      ) {
        amenitiesimage2 = (
          <div>
            <img src={indoor} alt="amenities image" />
            <p className="medium custom-font-size">Indoor Games</p>
          </div>
        );
      } else if (
        this.state.projectamenities[2].amenities_type.toLowerCase() === "garden"
      ) {
        amenitiesimage2 = (
          <div>
            <img src={garden} alt="amenities image" />
            <p className="medium custom-font-size">Garden</p>
          </div>
        );
      } else if (
        this.state.projectamenities[2].amenities_type.toLowerCase() ===
        "outdoor games"
      ) {
        amenitiesimage2 = (
          <div>
            <img src={outdoor} alt="amenities image" />
            <p className="medium custom-font-size">Outdoor Games</p>
          </div>
        );
      } else if (
        this.state.projectamenities[2].amenities_type.toLowerCase() === "gym"
      ) {
        amenitiesimage2 = (
          <div>
            <img src={gym} alt="amenities image" />
            <p className="medium custom-font-size">Gym</p>
          </div>
        );
      } else {
        amenitiesimage2 = <div></div>;
      }
    }

    if (this.state.projectamenities && this.state.projectamenities[3]) {
      if (
        this.state.projectamenities[3].amenities_type.toLowerCase() ===
        "kids play area"
      ) {
        amenitiesimage3 = (
          <div>
            <img src={kidsplay} alt="amenities image" />
            <p className="medium custom-font-size">Kids Play Area</p>
          </div>
        );
      } else if (
        this.state.projectamenities[3].amenities_type.toLowerCase() ===
        "swimming pool"
      ) {
        amenitiesimage3 = (
          <div>
            <img src={swimming} alt="amenities image" />
            <p className="medium custom-font-size">Swimming Pool</p>
          </div>
        );
      } else if (
        this.state.projectamenities[3].amenities_type.toLowerCase() ===
        "indoor games"
      ) {
        amenitiesimage3 = (
          <div>
            <img src={indoor} alt="amenities image" />
            <p className="medium custom-font-size">Indoor Games</p>
          </div>
        );
      } else if (
        this.state.projectamenities[3].amenities_type.toLowerCase() === "garden"
      ) {
        amenitiesimage3 = (
          <div>
            <img src={garden} alt="amenities image" />
            <p className="medium custom-font-size">Garden</p>
          </div>
        );
      } else if (
        this.state.projectamenities[3].amenities_type.toLowerCase() ===
        "outdoor games"
      ) {
        amenitiesimage3 = (
          <div>
            <img src={outdoor} alt="amenities image" />
            <p className="medium custom-font-size">Outdoor Games</p>
          </div>
        );
      } else if (
        this.state.projectamenities[3].amenities_type.toLowerCase() === "gym"
      ) {
        amenitiesimage3 = (
          <div>
            <img src={gym} alt="amenities image" />
            <p className="medium custom-font-size">Gym</p>
          </div>
        );
      } else {
        amenitiesimage3 = <div></div>;
      }
    }

    if (this.state.projectamenities && this.state.projectamenities[4]) {
      if (
        this.state.projectamenities[4].amenities_type.toLowerCase() ===
        "kids play area"
      ) {
        amenitiesimage4 = (
          <div>
            <img src={kidsplay} alt="amenities image" />
            <p className="medium custom-font-size">Kids Play Area</p>
          </div>
        );
      } else if (
        this.state.projectamenities[4].amenities_type.toLowerCase() ===
        "swimming pool"
      ) {
        amenitiesimage4 = (
          <div>
            <img src={swimming} alt="amenities image" />
            <p className="medium custom-font-size">Swimming Pool</p>
          </div>
        );
      } else if (
        this.state.projectamenities[4].amenities_type.toLowerCase() ===
        "indoor games"
      ) {
        amenitiesimage4 = (
          <div>
            <img src={indoor} alt="amenities image" />
            <p className="medium custom-font-size">Indoor Games</p>
          </div>
        );
      } else if (
        this.state.projectamenities[4].amenities_type.toLowerCase() === "garden"
      ) {
        amenitiesimage4 = (
          <div>
            <img src={garden} alt="amenities image" />
            <p className="medium custom-font-size">Garden</p>
          </div>
        );
      } else if (
        this.state.projectamenities[4].amenities_type.toLowerCase() ===
        "outdoor games"
      ) {
        amenitiesimage4 = (
          <div>
            <img src={outdoor} alt="amenities image" />
            <p className="medium custom-font-size">Outdoor Games</p>
          </div>
        );
      } else if (
        this.state.projectamenities[4].amenities_type.toLowerCase() === "gym"
      ) {
        amenitiesimage4 = (
          <div>
            <img src={gym} alt="amenities image" />
            <p className="medium custom-font-size">Gym</p>
          </div>
        );
      } else {
        amenitiesimage4 = <div></div>;
      }
    }
    if (this.state.projectamenities && this.state.projectamenities[5]) {
      if (
        this.state.projectamenities[5].amenities_type.toLowerCase() ===
        "kids play area"
      ) {
        amenitiesimage5 = (
          <div>
            <img src={kidsplay} alt="amenities image" />
            <p className="medium custom-font-size">Kids Play Area</p>
          </div>
        );
      } else if (
        this.state.projectamenities[5].amenities_type.toLowerCase() ===
        "swimming pool"
      ) {
        amenitiesimage5 = (
          <div>
            <img src={swimming} alt="amenities image" />
            <p className="medium custom-font-size">Swimming Pool</p>
          </div>
        );
      } else if (
        this.state.projectamenities[5].amenities_type.toLowerCase() ===
        "indoor games"
      ) {
        amenitiesimage5 = (
          <div>
            <img src={indoor} alt="amenities image" />
            <p className="medium custom-font-size">Indoor Games</p>
          </div>
        );
      } else if (
        this.state.projectamenities[5].amenities_type.toLowerCase() === "garden"
      ) {
        amenitiesimage5 = (
          <div>
            <img src={garden} alt="amenities image" />
            <p className="medium custom-font-size">Garden</p>
          </div>
        );
      } else if (
        this.state.projectamenities[5].amenities_type.toLowerCase() ===
        "outdoor games"
      ) {
        amenitiesimage5 = (
          <div>
            <img src={outdoor} alt="amenities image" />
            <p className="medium custom-font-size">Outdoor Games</p>
          </div>
        );
      } else if (
        this.state.projectamenities[5].amenities_type.toLowerCase() === "gym"
      ) {
        amenitiesimage5 = (
          <div>
            <img src={gym} alt="amenities image" />
            <p className="medium custom-font-size">Gym</p>
          </div>
        );
      } else {
        amenitiesimage5 = <div></div>;
      }
    }

    let login_status;
    if ((this.state.loggedin === true) | (this.state.loggedin === "true")) {
      let name = this.state.loggedinusername;
      let username = name;
      // if(name.indexOf(' ') > 0){
      //   username = name.substring(0, name.indexOf(' '));
      // }
      // if(username.length > 9){
      //   username = username.substring(0,9);
      // }
      console.log("name here", username.length);
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
    if (
      this.state.showlogoutstatus === true &&
      (this.state.loggedin === false) | (this.state.loggedin === "false")
    ) {
      login_status = (
        // <div  style={{color: "white", position: "absolute"}}>
        <div>
          <div className="logout_options2">
            <p className="username_project_new2">You logged</p>
            <p className="logout_project_new2">out</p>
          </div>
        </div>
        // </div>
      );
    }

    if (this.state.newprojecttransaction) {
      transactiondate = this.state.newprojecttransaction.map((transaction) => (
        <p className="fieldmargin">{transaction.month_year}</p>
      ));

      transactiontype = this.state.newprojecttransaction.map((transaction) => (
        <p className="fieldmargin">{transaction.transaction_type}</p>
      ));

      transactionunit = this.state.newprojecttransaction.map((transaction) => (
        <p className="fieldmargin">{transaction.unit_type}</p>
      ));
      transactionfloor = this.state.newprojecttransaction.map((transaction) => (
        <p className="fieldmargin">{"-"}</p>
      ));
      transactionarea = this.state.newprojecttransaction.map((transaction) => {
        let total_area = transaction.total_area;
        let split_String = total_area.split(" ");
        total_area = split_String[0];
        return <p className="fieldmargin">{total_area} sq.mts</p>;
      });

      transactionamount = this.state.newprojecttransaction.map(
        (transaction) => (
          <p className="fieldmargin">{transaction.rent_amount}</p>
        )
      );

      mobiletransactionview = this.state.newprojecttransaction.map(
        (transaction) => {
          let total_area = transaction.total_area;
          let split_String = total_area.split(" ");
          total_area = split_String[0];
          return (
            <tr>
              <td>
                <span
                  style={{ color: "#404041", fontSize: "1rem" }}
                  className="medium"
                >
                  {transaction.month_year}
                </span>
              </td>
              <td>
                <span
                  style={{ color: "#404041", fontSize: "1rem" }}
                  className="medium"
                >
                  {transaction.transaction_type}
                </span>
              </td>
              <td>
                <span
                  style={{ color: "#404041", fontSize: "1rem" }}
                  className="medium"
                >
                  {transaction.unit_type}
                </span>
              </td>
              <td>
                <span
                  style={{ color: "#404041", fontSize: "1rem" }}
                  className="medium"
                >
                  {"-"}
                </span>
              </td>
              <td>
                <span
                  style={{ color: "#404041", fontSize: "1rem" }}
                  className="medium"
                >
                  {total_area} sq.mts
                </span>
              </td>
              <td>
                <span
                  style={{ color: "#404041", fontSize: "1rem" }}
                  className="medium"
                >
                  {transaction.rent_amount}
                </span>
              </td>
            </tr>
          );
        }
      );

      // this.state.newprojecttransaction.map(transaction => (
      //   <tr>
      //     <td>
      //       <span style={{color: "#404041", fontSize:'1rem'}} className="medium">{transaction.month_year}</span>
      //     </td>
      //     <td>
      //       <span style={{color: "#404041", fontSize:'1rem'}} className="medium">{transaction.transaction_type}</span>
      //     </td>
      //     <td>
      //       <span style={{color: "#404041", fontSize:'1rem'}} className="medium">{transaction.unit_type}</span>
      //     </td>
      //     <td>
      //       <span style={{color: "#404041", fontSize:'1rem'}} className="medium">{'-'}</span>
      //     </td>
      //     <td>
      //       <span style={{color: "#404041", fontSize:'1rem'}} className="medium">{transaction.total_area}</span>
      //     </td>
      //     <td>
      //       <span style={{color: "#404041", fontSize:'1rem'}} className="medium">{transaction.rent_amount}</span>
      //     </td>

      //   </tr>
      // )
      // );
    }

    return (
      <div ref={(elem) => (this.nv = elem)} className="innerbody">
        {this.state.votingnotification && (
          // <div class="alert alert-success alert-dismissible_project" style={{position:'fixed',zIndex:'107',width:'100%'}}>
          //   <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer',marginBottom:'0px'}}>&times;</p>
          //   A  <strong>registration Link</strong> has been sent to your Email ID.
          // </div>
          <SweetAlert
            success
            show={this.state.votingnotification}
            confirmBtnBsStyle={"secondary"}
            style={{ fontFamily: "Catamaran-Semibold", color: "#404041" }}
            // title="Please Login or Signup to mark the project as favourite."
            // text="SweetAlert in React"
            // showCancelButton
            onConfirm={() => {
              // console.log('confirm');
              this.setState({ votingnotification: false });
            }}
            onCancel={() => {
              // console.log('cancel');
              this.setState({ votingnotification: false });
            }}
            timeout={600000}
            onEscapeKey={() => this.setState({ votingnotification: false })}
            onOutsideClick={() => this.setState({ votingnotification: false })}
            // confirmBtnBsStyle={"danger"}
          >
            You found this comment helpful, Thanks for voting.
          </SweetAlert>
        )}

        {this.state.notification && (
          // <div class="alert alert-success alert-dismissible_project" style={{position:'fixed',zIndex:'107',width:'100%'}}>
          //   <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer',marginBottom:'0px'}}>&times;</p>
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
          // <div class="alert alert-success alert-dismissible_project" style={{position:'fixed',zIndex:'107',width:'100%'}}>
          //   <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer',marginBottom:'0px'}}>&times;</p>
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
          // <div class="alert alert-success alert-dismissible_project" style={{position:'fixed',zIndex:'107',width:'100%'}}>
          //   <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer',marginBottom:'0px'}}>&times;</p>
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

        {this.state.favnotification && (
          // <div class="alert alert-danger alert-dismissible_project" style={{position:'fixed',zIndex:'107',width:'100%'}}>
          //   <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif2} style={{cursor:'pointer',marginBottom:'0px'}}>&times;</p>
          //   Please <strong>Login or Signup</strong> to mark the project as favourite.
          // </div>
          //   <SweetAlert info title="Please Login or Signup to mark the project as favourite." onConfirm={this.closenotif2} onCancel={this.closenotif2} timeout={100000}>
          // </SweetAlert>
          <SweetAlert
            danger
            show={this.state.favnotification}
            confirmBtnBsStyle={"secondary"}
            style={{ fontFamily: "Catamaran-Semibold", color: "#404041" }}
            // title="Please Login or Signup to mark the project as favourite."
            // text="SweetAlert in React"
            // showCancelButton
            onConfirm={() => {
              // console.log('confirm');
              this.setState({ favnotification: false });
            }}
            onCancel={() => {
              // console.log('cancel');
              this.setState({ favnotification: false });
            }}
            timeout={600000}
            onEscapeKey={() => this.setState({ favnotification: false })}
            onOutsideClick={() => this.setState({ favnotification: false })}
            // confirmBtnBsStyle={"danger"}
          >
            Please Login or Signup to mark the project as favourite.
          </SweetAlert>
        )}

        {this.state.showComponent && (
          <WriteReview
            showreviewstatus={this.showreviewstatus.bind(this)}
            loggedinuseremail={this.state.loggedinuseremail}
            onClose={this.onClose.bind(this)}
            project_details={this.state.projectdetails[0]}
            project_id={this.props.match.params}
            loginsuccess={this.loginsuccess}
          />
        )}
        
        {this.state.showComponent1 && (
          <PostAPicture
            loggedinuseremail={this.state.loggedinuseremail}
            onClose={this.onClose.bind(this)}
            loginsuccess={this.loginsuccess}
            showpicturestatus={this.showpicturestatus.bind(this)}
            project_details={this.state.projectdetails[0]}
            project_id={this.props.match.params}
          />
        )}

        <div className="parentclass">
          <div className="staticmenu">




            


            <div className="mainContainer full-view-1st-row">
              <div className="container-fluid">
                <div className="row reviewrow custommargin">
                  <div className="col-lg-9 header-top-left">
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
                    <div className="locationstyle locationstyle_det">{this.state.city}</div>
                    {/* </div> */}
                    {/* <div className="col-md-3"> */}
                    {this.state.loggedin ? (
                      <img src={user} className="usericonp usericon_det" alt="usericon" />
                    ) : (
                      <a onClick={this.signup}>
                        {/* <img src={user} className="usericon1"/> */}
                        <img src={user} className="usericonp usericon_det" alt="usericon" />
                      </a>
                    )}

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
                    {/* </div> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>

          
          
           
            <div className="mobileContainer mobile-view-row-design" id="dashboard1" ref={this.dashboardRef1}>
              <div className="container-fluid">
                <div className="row reviewrow custommargin">
                  <div
                    id="topdivmobile"
                    href="#topdivmobile"
                    className="col-9 flexstyle"
                  >
                    {/* <h3 className="mobile-toplogo">LOGO</h3> */}
                    <a href={"/"}>
                      <img className="mobile-toplogo" src={LogoIconMobile} />
                    </a>
                    <div className="outersearchdiv-mobile">
                      <div
                        style={{
                          margin: "-35px",
                          width: "100%",
                          marginBottom: "0px",
                          marginLeft: "0px",
                        }}
                      >
                        <Search />
                      </div>
                    </div>
                  </div>

                  <div className="col-3 reviewbar-mobile">
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
                  </div>
                </div>
                {/* <div className="row reviewrow custommargin">
              <div className="col-12">
              
              </div>
        </div> */}

                <div className="row reviewrow custommargin">
                  <div className="col-6">
                    {this.state.projectdetails && (
                      <h4 className="projectname">
                        {this.state.projectdetails[0].project_name}
                      </h4>
                    )}
                    {/* {this.state.projectdetails &&
                    <h6 className="projectline2" style={{color:"black"}}>{this.state.projectdetails[0].area}</h6>
                    } */}
                    {this.state.projectdetails && (
                      <h5 className="projectline2">
                        <a
                          href={
                            "/LocationDetails/" +
                            this.state.projectdetails[0].location_id
                          }
                          target="_blank"
                          className="locationanchorstyle"
                        >
                          {this.state.projectdetails[0].area}
                        </a>
                        {/* ,  */}
                        {/* {this.state.projectdetails[0].city} */}
                      </h5>
                    )}
                  </div>

                  <div className="col-6 reviewbar-mobile">
                    {this.state.marked_favourite === true ? (
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={favourite}
                        onClick={(e) => this.removeFavourite(e)}
                      />
                    ) : (
                      <img
                        className="followicon-mobile"
                        src={followup}
                        style={{ cursor: "pointer" }}
                        onClick={(e) => this.addFavourite(e)}
                      />
                    )}
                    {this.state.projectdetails &&
                      this.state.projectdetails[0].construction_status !=
                        "Ready Possession" && (
                        <img
                          className="contructionicon-mobile"
                          src={underconstruction}
                        />
                      )}
                  </div>
                </div>

                <div className="row" style={{ marginBottom: "0px" }}>
                  <div className="col-8 carousel-custompadding-mobile">
                    <div className="carousel-wrapper">
                      {this.state.displayall &&
                        !this.state.displaymanagement &&
                        !this.state.displayuser &&
                        !this.state.displayfloor && (
                          <Carousel
                            infiniteLoop={true}
                            showStatus={false}
                            showIndicators={false}
                            autoPlay={false}
                            showThumbs={false}
                          >
                            {allcaroselimage0}
                          </Carousel>
                        )}
                      {this.state.carouseldisplay.length > 0 &&
                        !this.state.displayall &&
                        this.state.displaymanagement &&
                        !this.state.displayuser &&
                        !this.state.displayfloor && (
                          <Carousel
                            infiniteLoop={true}
                            showStatus={false}
                            showIndicators={false}
                            autoPlay={false}
                            showThumbs={false}
                          >
                            {allcaroselimage1}
                          </Carousel>
                        )}

                      {this.state.carouseldisplay.length > 0 &&
                        !this.state.displayall &&
                        !this.state.displaymanagement &&
                        this.state.displayuser &&
                        !this.state.displayfloor && (
                          <Carousel
                            infiniteLoop={true}
                            showStatus={false}
                            showIndicators={false}
                            autoPlay={false}
                            showThumbs={false}
                          >
                            {allcaroselimage2}
                          </Carousel>
                        )}

                      {this.state.carouseldisplay.length > 0 &&
                        !this.state.displayall &&
                        !this.state.displaymanagement &&
                        !this.state.displayuser &&
                        this.state.displayfloor && (
                          <Carousel
                            infiniteLoop={true}
                            showStatus={false}
                            showIndicators={false}
                            autoPlay={false}
                            showThumbs={false}
                          >
                            {allcaroselimage3}
                          </Carousel>
                        )}

                      {!this.state.carouseldisplay.length > 0 && (
                        <Carousel
                          infiniteLoop={true}
                          showStatus={false}
                          showIndicators={false}
                          autoPlay={false}
                          showThumbs={false}
                        >
                          {allcaroselimageno}
                        </Carousel>
                      )}
                    </div>
                  </div>

                  <div className="col-4 otherimages-custompadding-mobile">
                    <div className="row">
                      <div className="col-xl-12">
                        {/* onClick={() => this.setState({ isOpen1: true })}  */}
                        <div
                          className="container1"
                          onClick={this.managementmediafetch}
                        >
                          <img
                            className="otherimages"
                            src={managementphoto}
                            alt="Snow"
                            style={{ width: "100%" }}
                          />
                          <div className="centered">Management Photos</div>
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
                            className="otherimages"
                            src={userphoto}
                            alt="Snow"
                            style={{ width: "100%" }}
                          />
                          <div className="centered">User Photos</div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <div
                          className="container1"
                          onClick={this.floormediafetch}
                        >
                          <img
                            className="otherimages"
                            src={floorphoto}
                            alt="Snow"
                            style={{ width: "100%" }}
                          />
                          <div className="centered">Floor Plan</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row reviewrow custommargin">
                  <div className="col-12">
                    {this.state.projectdetails && (
                      <p className="projectline3">
                        {" "}
                        {this.state.projectdetails[0].brief_dics}
                      </p>
                    )}
                  </div>
                </div>
              </div>
         
         
            </div>






            <div className="navbarrow">
              <div className="mainContainer">
                <div className="container-fluid">
                  <div className="row reviewrow">
                    <div className="col-lg-9">

                      <div className="main-navmenu">
                      <NavBarMenu sectionRefs={this.sectionRefs} />
                      </div>
                     

                     <div className="mob-navmenu" id="mob-navmenu">
                       <MobileNav isHide={this.state.hide} sectionRefsMob={this.sectionRefsMob}/>
                       
                     </div>
                     
                    </div>

                    <div className="col-lg-3 reviewbar1">
                      <div style={{ float: "right" }}>
                        <button
                          className="btn custombuttonstylingproject"
                          onClick={this.showshareviewoptions}
                        >
                          <img className="addimagestylep1" src={addimage} />
                          <span className="ShareView">SHARE VIEWS</span>
                        </button>

                        {this.state.shareviewdisplayoption && (
                          <ul
                            ref={this.setWrapperRef}
                            style={{
                              display: "block",
                              background: "white",
                              position: "fixed",
                              width: "225px",
                              marginTop: "66px",
                              border: "1px solid red",
                            }}
                          >
                            <li style={{ height: "45px" }}>
                              <h6
                                onClick={this.AddReview}
                                style={{ marginTop: ".5rem" }}
                              >
                                {" "}
                                <div
                                  style={{
                                    cursor: "pointer",
                                    placeContent: "center",
                                    display: "flex",
                                    fontFamily: "Catamaran-Semibold",
                                    color: "#ef403c",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  <img width="30px" src={menu1icon} />
                                  <div
                                    style={{
                                      marginTop: "6px",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    Add Review
                                  </div>
                                </div>
                              </h6>
                            </li>
                            <li style={{ height: "45px" }}>
                              <h6
                                onClick={this.AddPicture}
                                style={{ marginTop: ".5rem" }}
                              >
                                <div
                                  style={{
                                    cursor: "pointer",
                                    placeContent: "center",
                                    display: "flex",
                                    fontFamily: "Catamaran-Semibold",
                                    color: "#ef403c",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  <img width="30px" src={menu2icon} />
                                  <div
                                    style={{
                                      marginTop: "6px",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    Post a Picture
                                  </div>
                                </div>
                              </h6>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>




            {/* alpesh */}
            {/* <div className="navbarrow-mobile">
              <div className="reviewrow">
                <div className="mobile-navmenu">
                  <div
                    className="col-3 centeralign customnavpadding veticallyalign"
                    style={{
                      backgroundColor: this.state.menu1,
                      color: this.state.menutext1,
                    }}
                  >
                    <a
                      className="navbar-brand-mobile"
                      href="#ratingdivmobile"
                      style={{ color: this.state.menutext1 }}
                      onClick={(e) => this.colorchangemobile(1, e)}
                    >
                      RATINGS
                    </a>
                  </div>
                  <div
                    className="col-3 centeralign customnavpadding veticallyalign"
                    style={{
                      backgroundColor: this.state.menu2,
                      color: this.state.menutext2,
                    }}
                  >
                    <a
                      className="navbar-brand-mobile"
                      href="#reviewdivmobile"
                      style={{ color: this.state.menutext2 }}
                      onClick={(e) => this.colorchangemobile(2, e)}
                    >
                      REVIEWS
                    </a>
                  </div>
                  <div
                    className="col-3 centeralign customnavpadding veticallyalign"
                    style={{
                      backgroundColor: this.state.menu3,
                      color: this.state.menutext3,
                    }}
                  >
                    <a
                      className="navbar-brand-mobile"
                      href="#recenttransactiondivmobile"
                      style={{ color: this.state.menutext3 }}
                      onClick={(e) => this.colorchangemobile(3, e)}
                    >
                      RECENT TRANSACTIONS
                    </a>
                  </div>
                  <div
                    className="col-3 centeralign customnavpadding veticallyalign"
                    style={{
                      backgroundColor: this.state.menu4,
                      color: this.state.menutext4,
                    }}
                  >
                    <a
                      className="navbar-brand-mobile"
                      href="#projectinfodivmobile"
                      style={{ color: this.state.menutext4 }}
                      onClick={(e) => this.colorchangemobile(4, e)}
                    >
                      PROJECT INFO
                    </a>
                  </div>
                </div>
              </div>
            </div> */}










            <div className="mobileContainer mobile-view-row-design">
              <div className="container-fluid">
                <div className="ratingrow-mobile" id="ratingdivmobile" ref={this.ratingRefMob}>
                  <div className="row centerClass">
                    <div className="col-12">
                      {this.state.projectdetails && (
                        <div>
                          <div className="main-star-web">
                            <StarRatings
                              rating={Math.round(overall_rating * 100) / 100}
                              starRatedColor="rgb(251, 200, 0)"
                              changeRating={this.changeRating}
                              starDimension="40px"
                              numberOfStars={5}
                              name="rating"
                              starSpacing="0px"
                            />
                          </div>
                          <div className="main-star-mobile">
                            <StarRatings
                              rating={Math.round(overall_rating * 100) / 100}
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
                      {this.state.projectdetails && (
                        <div className="starratingtext">
                          {Math.round(overall_rating * 100) / 100} (
                          {this.state.projectdetails[0].total_review} Ratings)
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row centerClass">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3">
                          <div className="side">
                            <div>5 Star</div>
                          </div>
                        </div>
                        <div className="col-7 removepadding">
                          <div className="middle">
                            <div className="bar-container">
                              <div
                                className="bar-5p"
                                style={{
                                  width:
                                    (this.state.projectdetails
                                      ? (this.state.projectdetails[0]
                                          .rating5_count /
                                          this.state.projectdetails[0]
                                            .total_review) *
                                        100
                                      : "") + "%",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="right">
                            {this.state.projectdetails && (
                              <div>
                                {this.state.projectdetails[0].rating5_count}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-3">
                          <div className="side">
                            <div>4 Star</div>
                          </div>
                        </div>
                        <div className="col-7 removepadding">
                          <div className="middle">
                            <div className="bar-container">
                              <div
                                className="bar-4p"
                                style={{
                                  width:
                                    (this.state.projectdetails
                                      ? (this.state.projectdetails[0]
                                          .rating4_count /
                                          this.state.projectdetails[0]
                                            .total_review) *
                                        100
                                      : "") + "%",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="right">
                            {this.state.projectdetails && (
                              <div>
                                {this.state.projectdetails[0].rating4_count}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-3">
                          <div className="side">
                            <div>3 Star</div>
                          </div>
                        </div>
                        <div className="col-7 removepadding">
                          <div className="middle">
                            <div className="bar-container">
                              <div
                                className="bar-3p"
                                style={{
                                  width:
                                    (this.state.projectdetails
                                      ? (this.state.projectdetails[0]
                                          .rating3_count /
                                          this.state.projectdetails[0]
                                            .total_review) *
                                        100
                                      : "") + "%",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="right">
                            {this.state.projectdetails && (
                              <div>
                                {this.state.projectdetails[0].rating3_count}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-3">
                          <div className="side">
                            <div>2 Star</div>
                          </div>
                        </div>
                        <div className="col-7 removepadding">
                          <div className="middle">
                            <div className="bar-container">
                              <div
                                className="bar-2p"
                                style={{
                                  width:
                                    (this.state.projectdetails
                                      ? (this.state.projectdetails[0]
                                          .rating2_count /
                                          this.state.projectdetails[0]
                                            .total_review) *
                                        100
                                      : "") + "%",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="right">
                            {this.state.projectdetails && (
                              <div>
                                {this.state.projectdetails[0].rating2_count}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">
                          <div className="side">
                            <div>1 Star</div>
                          </div>
                        </div>
                        <div className="col-7 removepadding">
                          <div className="middle">
                            <div className="bar-container">
                              <div
                                className="bar-1p"
                                style={{
                                  width:
                                    (this.state.projectdetails
                                      ? (this.state.projectdetails[0]
                                          .rating1_count /
                                          this.state.projectdetails[0]
                                            .total_review) *
                                        100
                                      : "") + "%",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="right">
                            {this.state.projectdetails && (
                              <div>
                                {this.state.projectdetails[0].rating1_count}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row ratingsection">
                    {this.state.projectdetails && (
                      <ProjectRatings
                        location_points={
                          this.state.projectdetails[0].location_points
                            ? this.state.projectdetails[0].location_points
                            : 0
                        }
                        amenity_points={
                          this.state.projectdetails[0].amenity_points
                            ? this.state.projectdetails[0].amenity_points
                            : 0
                        }
                        layout_rating={
                          this.state.projectdetails[0].layout_rating
                            ? this.state.projectdetails[0].layout_rating
                            : 0
                        }
                        customer_rating={
                          this.state.projectdetails[0].customer_rating
                            ? this.state.projectdetails[0].customer_rating
                            : 0
                        }
                        valueformoney_rating={
                          this.state.projectdetails[0].valueformoney_rating
                            ? this.state.projectdetails[0].valueformoney_rating
                            : 0
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>



            {/* new change */}

            <div className="mobileContainer mobile-view-row-design" style={{paddingBottom: '10px'}}>
          <div className="container-fluid">
          
          
            
            <div className="recenttransaction-row-mobile" id="">
            <div className="reviewrowtitle ProjectInfoHeading"> 
              <div className="redbox11"></div><h3  className="newtransactionrowtitletext">&nbsp;Ads&nbsp;</h3><div className="redbox6"></div>
          </div>
          <img width="100%" src={projectpageadm}/>
             
            </div>



          </div>
        </div>
            {/* new change end */}






            <div className="mobileContainer mobile-view-row-design">
              <div className="container-fluid">
                <div className="reviewrow-mobile">
                  <div
                    className="reviewrowtitle ReviewHeading"
                    id="reviewdivmobile"
                    ref={this.reviewdivRefMob}
                  >
                    <div className="redbox11"></div>
                    <h3 className="reviewrowtitletext">&nbsp;REVIEWS&nbsp;</h3>
                    <div className="redbox22"></div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="sortbutton">
                        {/* {this.state.reviewdetails.length > 0 ? <h6 onClick={this.togglesort}>Most Recent <img src={this.state.sort ? uparrow : downarrow}/></h6>: ""} */}
                        {/* <select style={{border: 'none', background: 'transparent'}} onChange={(event) => this.togglesort(event.target.value)}>
                <option value="most_recent">Most recent</option>
                <option value="most_useful">Most useful</option>
                <option value="highest_rating">Highest rating</option>
                <option value="lowest_rating">Lowest rating</option>
              </select> */}

                        {this.state.reviewdetails.length > 0 && (
                          <p
                            onClick={this.showfilterptions2}
                            style={{ marginBottom: "0px" }}
                          >
                            {this.state.sorttype} &nbsp;{" "}
                            <img
                              style={{
                                filter: "brightness(0)",
                                marginTop: "-2px",
                              }}
                              src={location_dropdownIcon}
                            />
                          </p>
                        )}

                        {this.state.filteroptiondisplay2 && (
                          <ul
                            ref={this.setWrapperRef1}
                            style={{
                              display: "block",
                              background: "white",
                              position: "absolute",
                              width: "120px",
                              marginTop: "0px",
                              border: "1px solid red",
                              zIndex: "2",
                            }}
                          >
                            <li style={{}}>
                              <h6
                                onClick={() => this.togglesort("Most recent")}
                                style={{ marginTop: ".5rem" }}
                              >
                                {" "}
                                <div
                                  style={{
                                    cursor: "pointer",
                                    placeContent: "center",
                                    display: "flex",
                                    fontFamily: "Catamaran-Semibold",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginTop: "0px",
                                      marginLeft: "0px",
                                    }}
                                  >
                                    Most recent
                                  </div>
                                </div>
                              </h6>
                            </li>
                            <li style={{}}>
                              <h6
                                onClick={() => this.togglesort("Most useful")}
                                style={{ marginTop: ".5rem" }}
                              >
                                <div
                                  style={{
                                    cursor: "pointer",
                                    placeContent: "center",
                                    display: "flex",
                                    fontFamily: "Catamaran-Semibold",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginTop: "0px",
                                      marginLeft: "0px",
                                    }}
                                  >
                                    Most useful
                                  </div>
                                </div>
                              </h6>
                            </li>
                            <li style={{}}>
                              <h6
                                onClick={() =>
                                  this.togglesort("Highest rating")
                                }
                                style={{ marginTop: ".5rem" }}
                              >
                                <div
                                  style={{
                                    cursor: "pointer",
                                    placeContent: "center",
                                    display: "flex",
                                    fontFamily: "Catamaran-Semibold",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginTop: "0px",
                                      marginLeft: "0px",
                                    }}
                                  >
                                    Highest rating
                                  </div>
                                </div>
                              </h6>
                            </li>
                            <li style={{}}>
                              <h6
                                onClick={() => this.togglesort("Lowest rating")}
                              >
                                <div
                                  style={{
                                    cursor: "pointer",
                                    placeContent: "center",
                                    display: "flex",
                                    fontFamily: "Catamaran-Semibold",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginTop: "0px",
                                      marginLeft: "0px",
                                    }}
                                  >
                                    Lowest rating
                                  </div>
                                </div>
                              </h6>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  {this.state.reviewdetails.length > 0
                    ? allreviews_mobile
                    : "No Reviews Data Available"}

                  <div className="row">
                    <div className="col-xl-12">
                      <div className="morebutton">
                        {this.state.reviewdetails.length > 0 ? (
                          <h6
                            className="moreclickstyle"
                            onClick={this.showMore}
                          >
                            {this.state.expanded ? "See Less" : "See More"}
                          </h6>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mobileContainer mobile-view-row-design">
              <div className="container-fluid">
                <div
                  className="recenttransaction-row-mobile"
                  id="recenttransactiondivmobile"
                  ref={this.recenttransactiondivRefMob}
                >
                  <div className="reviewrowtitle ProjectInfoHeading">
                    <div className="redbox5"></div>
                    <h3 className="newtransactionrowtitletext">
                      &nbsp;RECENT
                      <span style={{ color: "transparent" }}>s</span>
                      TRANSACTION&nbsp;
                    </h3>
                    <div className="redbox6"></div>
                  </div>
                  {this.state.newprojecttransaction.length > 0 ? (
                    <table className="rtable rtable--flip">
                      <thead>
                        <tr>
                          <th>MM/YY</th>
                          <th>Transaction Type</th>
                          <th>Unit Type</th>
                          <th>Floor</th>
                          <th>Total Area</th>
                          <th>Rent Amount</th>
                        </tr>
                      </thead>
                      <tbody>{mobiletransactionview}</tbody>
                    </table>
                  ) : (
                    "No Transaction Data Available"
                  )}
                </div>
              </div>
            </div>

            <div className="mobileContainer mobile-view-row-design">
              <div className="container-fluid">
                <div
                  className="projectinfo-row-mobile"
                  id="projectinfodivmobile"
                  ref={this.projectinfodivRefMob}
                >
                  <div className="reviewrowtitle ProjectInfoHeading">
                    <div className="redbox7"></div>
                    <h3 className="newprojectinforowtitletext">
                      &nbsp;PROJECT
                      <span style={{ color: "transparent" }}>s</span>INFO&nbsp;
                    </h3>
                    <div className="redbox8"></div>
                  </div>

                  {this.state.projectinfo.length > 0 ? (
                    <table class="rtable2 custommargintop">
                      <thead>
                        <tr>
                          <th>Phase</th>
                          <th>Configuration</th>
                          <th>Price Range</th>
                          <th>Possession</th>
                        </tr>
                      </thead>
                      <tbody>{projectinfomobile}</tbody>
                    </table>
                  ) : (
                    "No Project Info Data Available"
                  )}
                </div>
              </div>
            </div>

            <div className="mobileContainer mobile-view-row-design">
              <div className="container-fluid">
                <div className="rera-row-mobile">
                  <h5 className="separator semibold">
                    &nbsp;&nbsp;RERA&nbsp;&nbsp;
                  </h5>

                  {this.state.projectdetails.length > 0 ? (
                    <table
                      class="rtable custommargintop"
                      style={{ tableLayout: "fixed", width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>RERA No</th>
                          <th>RERA Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {this.state.projectdetails && (
                              <p className="medium">
                                {this.state.projectdetails[0].rera_no
                                  ? this.state.projectdetails[0].rera_no
                                  : "N/A"}
                              </p>
                            )}
                          </td>

                          <td>
                            {this.state.projectdetails && (
                              <p className="medium">
                                <a
                                  target="_blank"
                                  href={
                                    this.state.projectdetails[0].rera_link
                                      ? this.state.projectdetails[0].rera_link
                                      : "N/A"
                                  }
                                  className="reraclickstyle medium"
                                >
                                  Click Here
                                </a>
                              </p>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    "No Project Info Data Available"
                  )}
                </div>
              </div>
            </div>

            <div className="mobileContainer mobile-view-row-design">
              <div className="container-fluid">
                <div className="amenitites-row-mobile">
                  <h5 className="separator semibold">
                    &nbsp;&nbsp;FACILITIES&nbsp;&nbsp;
                  </h5>

                  {this.state.projectamenities.length > 0 ? (
                    <div className="amenitiescard">
                      <div className="row amenitiesrow1">
                        <div className="col-4 centerClass">
                          {amenitiesimage0}
                        </div>
                        <div className="col-4 centerClass">
                          {amenitiesimage1}
                        </div>
                        <div className="col-4 centerClass">
                          {amenitiesimage2}
                        </div>
                      </div>
                      <div className="row amenitiesrow2">
                        <div className="col-4 centerClass">
                          {amenitiesimage3}
                        </div>
                        <div className="col-4 centerClass">
                          {amenitiesimage4}
                        </div>
                        <div className="col-4 centerClass">
                          {amenitiesimage5}
                        </div>
                      </div>
                    </div>
                  ) : (
                    "No Amenities Data"
                  )}
                </div>
              </div>
            </div>

            <div className="mobileContainer mobile-view-row-design">
              <div className="container-fluid">
                <div className="location-row-mobile">
                  <h5 className="separator semibold">
                    &nbsp;&nbsp;LOCATION&nbsp;&nbsp;
                  </h5>
                </div>
              </div>
            </div>

            <div
              className="mobileContainer mobile-view-row-design"
              style={{
                marginLeft: "0px !important",
                marginRight: "0px !important",
              }}
            >
              <div className="">
                <div className="rera-row-mobile">
                  <div className="amenitiescard">
                    <div className="row">
                      <div className="col-md-12 centerClass">
                        {this.state.projectdetails &&
                        this.state.projectdetails[0].google_map_link ? (
                          <iframe
                            src={
                              this.state.projectdetails[0].google_map_link
                                ? this.state.projectdetails[0].google_map_link
                                : ""
                            }
                            className="mapstylemapp-mobile"
                          ></iframe>
                        ) : (
                          "No Map Data Available"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mobileContainer mobile-view-row-design">
              <div className="container-fluid">
                <div className="rera-row-mobile">
                  <h5 className="separator semibold">
                    &nbsp;&nbsp;DEVELOPER&nbsp;&nbsp;
                  </h5>

                  {this.state.projectinfo.length > 0 ? (
                    <table
                      class="rtable custommargintop"
                      style={{ tableLayout: "fixed", width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Brand Name</th>
                          <th>Entity Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {this.state.developerinfo && (
                              <h5 className="regular fieldmargin">
                                {this.state.developerinfo[0].brand}
                              </h5>
                            )}
                          </td>

                          <td>
                            {this.state.developerinfo && (
                              <h5 className="regular fieldmargin">
                                {this.state.developerinfo[0].developer_entity}
                              </h5>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    "No Developer Data Available"
                  )}
                </div>
              </div>
            </div>


          </div>

          <div className="rollingcontent dont-show-on-mobile">
            <div className="mainContainer2">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-9">
                    <div className="row dont-show-on-mobile">
                      <div className="col-lg-8">
                        <div className="carousel-wrapper">
                          {this.state.displayall &&
                            !this.state.displaymanagement &&
                            !this.state.displayuser &&
                            !this.state.displayfloor && (
                              <Carousel
                                infiniteLoop={true}
                                showStatus={false}
                                showIndicators={false}
                                autoPlay={false}
                                showThumbs={true}
                              >
                                {allcaroselimage0}
                              </Carousel>
                            )}
                          {this.state.carouseldisplay.length > 0 &&
                            !this.state.displayall &&
                            this.state.displaymanagement &&
                            !this.state.displayuser &&
                            !this.state.displayfloor && (
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

                          {this.state.carouseldisplay.length > 0 &&
                            !this.state.displayall &&
                            !this.state.displaymanagement &&
                            this.state.displayuser &&
                            !this.state.displayfloor && (
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

                          {this.state.carouseldisplay.length > 0 &&
                            !this.state.displayall &&
                            !this.state.displaymanagement &&
                            !this.state.displayuser &&
                            this.state.displayfloor && (
                              <Carousel
                                infiniteLoop={true}
                                showStatus={false}
                                showIndicators={false}
                                autoPlay={false}
                                showThumbs={true}
                              >
                                {/* changes are going here */}
                                {allcaroselimage3}
                              </Carousel>
                            )}

                          {!this.state.carouseldisplay.length > 0 && (
                            <Carousel
                              infiniteLoop={true}
                              showStatus={false}
                              showIndicators={false}
                              autoPlay={false}
                              showThumbs={true}
                            >
                              {allcaroselimageno}
                            </Carousel>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4 custompaddingleft">
                        <div className="row">
                          <div className="col-xl-12">
                            {/* onClick={() => this.setState({ isOpen1: true })} */}
                            <div
                              className="container1"
                              onClick={this.managementmediafetch}
                            >
                              <img
                                className="otherimages"
                                src={managementphoto}
                                alt="Snow"
                                style={{ width: "100%" }}
                              />
                              <div className="centered">Management Photos</div>
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
                                className="otherimages"
                                src={userphoto}
                                alt="Snow"
                                style={{ width: "100%" }}
                              />
                              <div className="centered">User Photos</div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12">
                            <div
                              className="container1"
                              onClick={this.floormediafetch}
                            >
                              <img
                                className="otherimages"
                                src={floorphoto}
                                alt="Snow"
                                style={{ width: "100%" }}
                              />
                              <div className="centered">Floor Plan</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row projectdetailsrow dont-show-on-mobile">
                      <div className="col-lg-7">
                        <div className="row">
                          <div className="col-md-7">
                            {this.state.projectdetails && (
                              <h2 className="projectname">
                                {this.state.projectdetails[0].project_name}
                              </h2>
                            )}
                            {this.state.projectdetails && (
                              <h5 className="projectline2">
                                <a
                                  href={
                                    "/LocationDetails/" +
                                    this.state.projectdetails[0].location_id
                                  }
                                  target="_blank"
                                  className="locationanchorstyle"
                                >
                                  {this.state.projectdetails[0].area}
                                </a>
                                {/* ,  */}
                                {/* {this.state.projectdetails[0].city} */}
                              </h5>
                            )}
                          </div>
                          <div
                            className="col-md-5"
                            style={{ textAlign: "end" }}
                          >
                            {this.state.projectdetails &&
                              this.state.projectdetails[0]
                                .construction_status != "Ready Possession" && (
                                <img
                                  style={{ width: "50px", height: "50px" }}
                                  src={underconstruction}
                                />
                              )}{" "}
                            &nbsp;{" "}
                            {this.state.marked_favourite === true ? (
                              <img
                                style={{ width: "50px", height: "50px" }}
                                src={favourite}
                                onClick={(e) => this.removeFavourite(e)}
                              />
                            ) : (
                              <img
                                style={{ width: "50px", height: "50px" }}
                                src={followup}
                                style={{ cursor: "pointer" }}
                                onClick={(e) => this.addFavourite(e)}
                              />
                            )}
                          </div>
                        </div>
                        {this.state.projectdetails && (
                          <p className="projectline3">
                            {" "}
                            {this.state.projectdetails[0].brief_dics}
                          </p>
                        )}
                      </div>
                      <div
                        className="col-lg-5 centeralign"
                        id="ratingdiv"
                        ref={this.ratingRef}
                      >
                        <div className="ratingdiv">
                          <div className="row">
                            <div className="col-md-12 col-lg-12 rightalign">
                              {this.state.projectdetails && (
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
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 col-lg-12 rightalign">
                              {this.state.projectdetails && (
                                <div className="starratingtext">
                                  {Math.round(overall_rating * 100) / 100} (
                                  {this.state.projectdetails[0].total_review}{" "}
                                  Ratings)
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3">
                              <div className="side">
                                <div>5 Star</div>
                              </div>
                            </div>
                            <div className="col-lg-7 removepadding">
                              <div className="middle">
                                <div className="bar-container">
                                  <div
                                    className="bar-5p"
                                    style={{
                                      width:
                                        (this.state.projectdetails
                                          ? (this.state.projectdetails[0]
                                              .rating5_count /
                                              this.state.projectdetails[0]
                                                .total_review) *
                                            100
                                          : "") + "%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="right">
                                {this.state.projectdetails && (
                                  <div>
                                    {this.state.projectdetails[0].rating5_count}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3">
                              <div className="side">
                                <div>4 Star</div>
                              </div>
                            </div>
                            <div className="col-lg-7 removepadding">
                              <div className="middle">
                                <div className="bar-container">
                                  <div
                                    className="bar-4p"
                                    style={{
                                      width:
                                        (this.state.projectdetails
                                          ? (this.state.projectdetails[0]
                                              .rating4_count /
                                              this.state.projectdetails[0]
                                                .total_review) *
                                            100
                                          : "") + "%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="right">
                                {this.state.projectdetails && (
                                  <div>
                                    {this.state.projectdetails[0].rating4_count}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3">
                              <div className="side">
                                <div>3 Star</div>
                              </div>
                            </div>
                            <div className="col-lg-7 removepadding">
                              <div className="middle">
                                <div className="bar-container">
                                  <div
                                    className="bar-3p"
                                    style={{
                                      width:
                                        (this.state.projectdetails
                                          ? (this.state.projectdetails[0]
                                              .rating3_count /
                                              this.state.projectdetails[0]
                                                .total_review) *
                                            100
                                          : "") + "%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="right">
                                {this.state.projectdetails && (
                                  <div>
                                    {this.state.projectdetails[0].rating3_count}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3">
                              <div className="side">
                                <div>2 Star</div>
                              </div>
                            </div>
                            <div className="col-lg-7 removepadding">
                              <div className="middle">
                                <div className="bar-container">
                                  <div
                                    className="bar-2p"
                                    style={{
                                      width:
                                        (this.state.projectdetails
                                          ? (this.state.projectdetails[0]
                                              .rating2_count /
                                              this.state.projectdetails[0]
                                                .total_review) *
                                            100
                                          : "") + "%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="right">
                                {this.state.projectdetails && (
                                  <div>
                                    {this.state.projectdetails[0].rating2_count}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-3">
                              <div className="side">
                                <div>1 Star</div>
                              </div>
                            </div>
                            <div className="col-lg-7 removepadding">
                              <div className="middle">
                                <div className="bar-container">
                                  <div
                                    className="bar-1p"
                                    style={{
                                      width:
                                        (this.state.projectdetails
                                          ? (this.state.projectdetails[0]
                                              .rating1_count /
                                              this.state.projectdetails[0]
                                                .total_review) *
                                            100
                                          : "") + "%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="right">
                                {this.state.projectdetails && (
                                  <div>
                                    {this.state.projectdetails[0].rating1_count}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row ratingsection">
                            {this.state.projectdetails && (
                              <ProjectRatings
                                location_points={
                                  this.state.projectdetails[0].location_points
                                    ? this.state.projectdetails[0]
                                        .location_points
                                    : 0
                                }
                                amenity_points={
                                  this.state.projectdetails[0].amenity_points
                                    ? this.state.projectdetails[0]
                                        .amenity_points
                                    : 0
                                }
                                layout_rating={
                                  this.state.projectdetails[0].layout_rating
                                    ? this.state.projectdetails[0].layout_rating
                                    : 0
                                }
                                customer_rating={
                                  this.state.projectdetails[0].customer_rating
                                    ? this.state.projectdetails[0]
                                        .customer_rating
                                    : 0
                                }
                                valueformoney_rating={
                                  this.state.projectdetails[0]
                                    .valueformoney_rating
                                    ? this.state.projectdetails[0]
                                        .valueformoney_rating
                                    : 0
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="reviewrow dont-show-on-mobile"
                      id="reviewdiv"
                      ref={this.reviewdivRef}
                    >
                      <div className="reviewrowtitle ReviewHeading">
                        <div className="redbox11"></div>
                        <h3 className="reviewrowtitletext">
                          {/* alpesh bookmark */}
                        REVIEWS                          &nbsp;&nbsp;
                        </h3>
                        <div className="redbox22"></div>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="sortbutton">
                            {/* {this.state.reviewdetails.length > 0 ? <h6 onClick={this.togglesort} style={{fontSize:"1.1rem", color:"#404041"}}>Most Recent <img src={this.state.sort ? uparrow : downarrow}/></h6>: ""} */}
                            {/* <select style={{border: 'none', background: 'transparent'}} onChange={(event) => this.togglesort(event.target.value)}>
                <option value="most_recent">Most recent</option>
                <option value="most_useful">Most useful</option>
                <option value="highest_rating">Highest rating</option>
                <option value="lowest_rating">Lowest rating</option>
              </select> */}
                            {this.state.reviewdetails.length > 0 && (
                              <p
                                onClick={this.showfilterptions}
                                style={{ marginBottom: "0px" }}
                              >
                                {this.state.sorttype} &nbsp;{" "}
                                <img
                                  style={{
                                    filter: "brightness(0)",
                                    marginTop: "-2px",
                                  }}
                                  src={location_dropdownIcon}
                                />
                              </p>
                            )}

                            {this.state.filteroptiondisplay && (
                              <ul
                                ref={this.setWrapperRef1}
                                style={{
                                  display: "block",
                                  background: "white",
                                  position: "absolute",
                                  width: "120px",
                                  marginTop: "0px",
                                  border: "1px solid red",
                                  zIndex: "2",
                                }}
                              >
                                <li style={{}}>
                                  <h6
                                    onClick={() =>
                                      this.togglesort("Most recent")
                                    }
                                    style={{ marginTop: ".5rem" }}
                                  >
                                    {" "}
                                    <div
                                      style={{
                                        cursor: "pointer",
                                        placeContent: "center",
                                        display: "flex",
                                        fontFamily: "Catamaran-Semibold",
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginTop: "0px",
                                          marginLeft: "0px",
                                        }}
                                      >
                                        Most recent
                                      </div>
                                    </div>
                                  </h6>
                                </li>
                                <li style={{}}>
                                  <h6
                                    onClick={() =>
                                      this.togglesort("Most useful")
                                    }
                                    style={{ marginTop: ".5rem" }}
                                  >
                                    <div
                                      style={{
                                        cursor: "pointer",
                                        placeContent: "center",
                                        display: "flex",
                                        fontFamily: "Catamaran-Semibold",
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginTop: "0px",
                                          marginLeft: "0px",
                                        }}
                                      >
                                        Most useful
                                      </div>
                                    </div>
                                  </h6>
                                </li>
                                <li style={{}}>
                                  <h6
                                    onClick={() =>
                                      this.togglesort("Highest rating")
                                    }
                                    style={{ marginTop: ".5rem" }}
                                  >
                                    <div
                                      style={{
                                        cursor: "pointer",
                                        placeContent: "center",
                                        display: "flex",
                                        fontFamily: "Catamaran-Semibold",
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginTop: "0px",
                                          marginLeft: "0px",
                                        }}
                                      >
                                        Highest rating
                                      </div>
                                    </div>
                                  </h6>
                                </li>
                                <li style={{}}>
                                  <h6
                                    onClick={() =>
                                      this.togglesort("Lowest rating")
                                    }
                                  >
                                    <div
                                      style={{
                                        cursor: "pointer",
                                        placeContent: "center",
                                        display: "flex",
                                        fontFamily: "Catamaran-Semibold",
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginTop: "0px",
                                          marginLeft: "0px",
                                        }}
                                      >
                                        Lowest rating
                                      </div>
                                    </div>
                                  </h6>
                                </li>
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>

                      {this.state.reviewdetails.length > 0
                        ? allreviews
                        : "No Reviews Data Available"}

                      <div className="row">
                        <div className="col-xl-12">
                          <div className="morebutton">
                            {this.state.reviewdetails.length > 0 ? (
                              <h6
                                className="moreclickstyle"
                                onClick={this.showMore}
                              >
                                {this.state.expanded ? "See Less" : "See More"}
                              </h6>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {isOpen && this.state.carouseldisplay.length > 0 && (
                      <Lightbox
                        mainSrc={
                          this.state.carouseldisplay[photoIndex].post_media
                        }
                        
                        imageCaption =
                        {
                        <div className="captions-container">
                          <h2>{this.state.carouseldisplay[photoIndex].given_by ? this.state.carouseldisplay[photoIndex].given_by : 'User' }</h2>
                          <p>{ 
                          this.state.carouseldisplay[photoIndex].created_at
                           ? (moment(this.state.carouseldisplay[photoIndex].created_at).format('ll'))
                            : 
                             (moment(new Date()).format('ll'))
                           }</p>
                          {
                            this.state.carouseldisplay[photoIndex].comment !== 'N/A' ?
                             this.state.carouseldisplay[photoIndex].comment !== null ? 
                              <p className="photo-comment">{this.state.carouseldisplay[photoIndex].comment}</p> : <></>: <></>

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
                            (photoIndex +
                              this.state.carouseldisplay.length -
                              1) %
                              this.state.carouseldisplay.length
                          ].post_media
                        }
                        onCloseRequest={() => {
                          this.setState({ isOpen: false }) 
                         this.setState({hide : false})
                                              }}
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

                    {isOpen1 && this.state.carouseldisplay.length > 0 && (
                      <Lightbox
                        mainSrc={
                          this.state.carouseldisplay[photoIndex1].media_link
                        }

                        imageCaption =  {
                        <div className="captions-container">
                        <h2>{this.state.carouseldisplay[photoIndex1].given_by}</h2>
                        <p>{ this.state.carouseldisplay[photoIndex1].created_at ? (moment(this.state.carouseldisplay[photoIndex1].created_at).format('ll')) : (moment(new Date()).format('ll'))}</p>
                          {
                            this.state.carouseldisplay[photoIndex1].comment !== 'N/A' ?
                             this.state.carouseldisplay[photoIndex1].comment ?
                               <p className="photo-comment">{this.state.carouseldisplay[photoIndex1].comment}</p>: <></>: <></>
                          }
                        </div>
                      }
                       
                        nextSrc={
                          this.state.carouseldisplay[
                            (photoIndex1 + 1) %
                              this.state.carouseldisplay.length
                          ].media_link
                        }
                        prevSrc={
                          this.state.carouseldisplay[
                            (photoIndex1 +
                              this.state.carouseldisplay.length -
                              1) %
                              this.state.carouseldisplay.length
                          ].media_link
                        }
                        onCloseRequest={() => {
                          this.setState({ isOpen1: false })
                          this.setState({hide : false})
                        }}
                        onMovePrevRequest={() =>
                          this.setState({
                            photoIndex1:
                              (photoIndex1 +
                                this.state.carouseldisplay.length -
                                1) %
                              this.state.carouseldisplay.length,
                          })
                        }
                        onMoveNextRequest={() =>
                          this.setState({
                            photoIndex1:
                              (photoIndex1 + 1) %
                              this.state.carouseldisplay.length,
                          })
                        }
                      />
                    )}

                    {isOpen0 && this.state.carouseldisplay.length > 0 && (
                      <Lightbox
                        mainSrc={
                          this.state.carouseldisplay[photoIndex0].media_link
                        }

                        imageCaption=  {<div className="captions-container">
                        <h2>{this.state.carouseldisplay[photoIndex0].given_by}</h2>
                        <p>{ this.state.carouseldisplay[photoIndex0].created_at ? (moment(this.state.carouseldisplay[photoIndex0].created_at).format('ll')) : (moment(new Date()).format('ll'))}</p>
                          {
                            this.state.carouseldisplay[photoIndex0].comment !== 'N/A' ?
                             this.state.carouseldisplay[photoIndex0].comment ?
                               <p className="photo-comment">{this.state.carouseldisplay[photoIndex0].comment}</p> : <></> : <></>
                          }
                        </div>
                      }

                        nextSrc={
                          this.state.carouseldisplay[
                            (photoIndex0 + 1) %
                              this.state.carouseldisplay.length
                          ].media_link
                        }
                        prevSrc={
                          this.state.carouseldisplay[
                            (photoIndex0 +
                              this.state.carouseldisplay.length -
                              1) %
                              this.state.carouseldisplay.length
                          ].media_link
                        }
                        onCloseRequest={() => {
                          this.setState({ isOpen0: false })
                          this.setState({hide : false})
                        }}
                        onMovePrevRequest={() =>
                          this.setState({
                            photoIndex0:
                              (photoIndex0 +
                                this.state.carouseldisplay.length -
                                1) %
                              this.state.carouseldisplay.length,
                          })
                        }
                        onMoveNextRequest={() =>
                          this.setState({
                            photoIndex0:
                              (photoIndex0 + 1) %
                              this.state.carouseldisplay.length,
                          })
                        }
                      />
                    )}
                    {isOpen2 && this.state.carouseldisplay.length > 0 && (
                      <Lightbox
                        mainSrc={
                          this.state.carouseldisplay[photoIndex2].media_link
                        }

                        imageCaption=  {<div className="captions-container">
                        <h2>{this.state.carouseldisplay[photoIndex2].given_by}</h2>
                        <p>{ this.state.carouseldisplay[photoIndex2].created_at ? (moment(this.state.carouseldisplay[photoIndex2].created_at).format('ll')) : (moment(new Date()).format('yyyy/mm/DD'))}</p>
                          {
                            this.state.carouseldisplay[photoIndex2].comment !== 'N/A' ?
                            this.state.carouseldisplay[photoIndex2].comment ? 
                             <p className="photo-comment">{this.state.carouseldisplay[photoIndex2].comment}</p> : <></> : <></>
                          }
                        </div>
                      }


                        nextSrc={
                          this.state.carouseldisplay[
                            (photoIndex2 + 1) %
                              this.state.carouseldisplay.length
                          ].media_link
                        }
                        prevSrc={
                          this.state.carouseldisplay[
                            (photoIndex2 +
                              this.state.carouseldisplay.length -
                              1) %
                              this.state.carouseldisplay.length
                          ].media_link
                        }
                        onCloseRequest={() => {
                          this.setState({ isOpen2: false })
                          this.setState({hide : false})
                        }}
                        onMovePrevRequest={() =>
                          this.setState({
                            photoIndex2:
                              (photoIndex2 +
                                this.state.carouseldisplay.length -
                                1) %
                              this.state.carouseldisplay.length,
                          })
                        }
                        onMoveNextRequest={() =>
                          this.setState({
                            photoIndex2:
                              (photoIndex2 + 1) %
                              this.state.carouseldisplay.length,
                          })
                        }
                      />
                    )}

                    {this.state.isOpenz && (
                      <Lightbox
                        mainSrc={
                          this.state.reviewimages[photoIndexz].media_link
                        }

                        imageCaption= {<div className="captions-container">
                        <h2>{this.state.carouseldisplay[photoIndexz].given_by}</h2>
                       
                          <p>{ this.state.carouseldisplay[photoIndexz].created_at ? moment(this.state.carouseldisplay[photoIndexz].created_at).format('ll') : moment(new Date()).format('ll')}</p>
                          {
                            this.state.carouseldisplay[photoIndexz].comment !== 'N/A' ? 
                             this.state.carouseldisplay[photoIndexz].comment ?
                              <p className="photo-comment">{this.state.carouseldisplay[photoIndexz].comment}</p> : <></> : <></>
                          }
                         
                        </div>
                      }
                        
                        nextSrc={
                          this.state.reviewimages[
                            (photoIndexz + 1) % this.state.reviewimages.length
                          ].media_link
                        }
                        prevSrc={
                          this.state.reviewimages[
                            (photoIndexz + this.state.reviewimages.length - 1) %
                              this.state.reviewimages.length
                          ].media_link
                        }
                        onCloseRequest={() => {
                          this.setState({ isOpenz: false})
                          this.setState({hide : false})
                        }}
                        onMovePrevRequest={() =>
                          this.setState({
                            photoIndexz:
                              (photoIndexz +
                                this.state.reviewimages.length -
                                1) %
                              this.state.reviewimages.length,
                          })
                        }
                        onMoveNextRequest={() =>
                          this.setState({
                            photoIndexz:
                              (photoIndexz + 1) %
                              this.state.reviewimages.length,
                          })
                        }
                      />
                    )}

                    <div
                      className="transactionrow dont-show-on-mobile"
                      id="recenttransactiondiv"
                      ref={this.recenttransactiondivRef}
                    >
                      <div className="reviewrowtitle ProjectInfoHeading">
                        <div className="redbox5"></div>
                        <h3 className="newtransactionrowtitletext">
                          &nbsp;RECENT
                          <span style={{ color: "transparent" }}>s</span>
                          TRANSACTION&nbsp;
                        </h3>
                        <div className="redbox6"></div>
                      </div>
                      {this.state.newprojecttransaction.length > 0 ? (
                        <div className="recenttransactioncard">
                          <div className="row">
                            <div className="col-lg-2 centerClass horizontal1 padding0 semibold">
                              <h5
                                style={{ fontSize: "1.3rem", color: "#404041" }}
                              >
                                MM/YY
                              </h5>
                              <p className="medium fieldmargin custom-font-size">
                                {transactiondate}
                              </p>
                            </div>
                            <div className="col-lg-2 centerClass horizontal1 padding0 semibold">
                              <h5
                                style={{ fontSize: "1.3rem", color: "#404041" }}
                              >
                                Transaction Type
                              </h5>
                              <p className="medium fieldmargin custom-font-size">
                                {transactiontype}
                              </p>
                            </div>
                            <div className="col-lg-2 centerClass horizontal1 padding0 semibold">
                              <h5
                                style={{ fontSize: "1.3rem", color: "#404041" }}
                              >
                                Unit Type
                              </h5>
                              <p className="medium fieldmargin custom-font-size">
                                {transactionunit}
                              </p>
                            </div>
                            <div className="col-lg-2 centerClass horizontal1 padding0 semibold">
                              <h5
                                style={{ fontSize: "1.3rem", color: "#404041" }}
                              >
                                Floor
                              </h5>
                              <p className="medium fieldmargin custom-font-size">
                                {transactionfloor}
                              </p>
                            </div>
                            <div className="col-lg-2 centerClass horizontal1 padding0 semibold">
                              <h5
                                style={{ fontSize: "1.3rem", color: "#404041" }}
                              >
                                Total Area (sq.mts)
                              </h5>
                              <p className="medium fieldmargin custom-font-size">
                                {transactionarea}
                              </p>
                            </div>
                            <div className="col-lg-2 centerClass padding0 semibold">
                              <h5
                                style={{ fontSize: "1.3rem", color: "#404041" }}
                              >
                                Rent Amount
                              </h5>
                              <p className="medium fieldmargin custom-font-size">
                                {transactionamount}
                              </p>
                            </div>
                          </div>
                          {/* 
                    <div className="row">
                      <div className="col-xl-2 centerClass horizontal1 padding0 medium">
                       
                        {this.state.projecttransaction &&
                            transactiondate}
                      </div>
                      <div className="col-xl-2 centerClass horizontal1 padding0 medium">
                    
                      {this.state.projecttransaction &&
                        <p className="fieldmargin">{this.state.projecttransaction[0]?this.state.projecttransaction[0].transaction_type:''}</p>}
                      </div>
                      <div className="col-xl-2 centerClass horizontal1 padding0 medium">
                       
                        {this.state.projecttransaction &&
                        <p className="fieldmargin">{this.state.projecttransaction[0]?this.state.projecttransaction[0].unit_type:''}</p>}
                      </div>
                      <div className="col-xl-2 centerClass horizontal1 padding0 medium">
                       
                        {this.state.projecttransaction &&
                        <p className="fieldmargin">{this.state.projecttransaction[0]?this.state.projecttransaction[0].unit_type:''}</p>}
                      </div>
                      <div className="col-xl-2 centerClass horizontal1 padding0 medium">
                       
                        {this.state.projecttransaction &&
                        <p className="fieldmargin">{this.state.projecttransaction[0]?this.state.projecttransaction[0].total_area:''}</p>}
                      </div>
                      <div className="col-xl-2 centerClass padding0 medium">
                       
                       
                        
                        
                       
                          <Button className="reraclickstyle" style={{width: '128px', height:'46px', fontSize:'0.5vm',float:'unset', background:'transparent', border:"transparent"}} variant='outline-light' size='sm' onClick={() => this.setState({paymentShow2: true})}>
                            Click Here
                          </Button>
                            {this.state.paymentShow2 && 
                              <Payment
                              show={this.state.paymentShow2}
                              onHide={this.paymentClose}
                              project_id={this.props.match.params.project_id}
                              />
                            }
                       
                       
                      </div>

              
                    </div> */}
                        </div>
                      ) : (
                        "No Transaction Data Available"
                      )}
                    </div>

                    <div
                      className="projectinforow dont-show-on-mobile"
                      id="projectinfodiv"
                      ref={this.projectinfodivRef}
                    >
                      <div className="reviewrowtitle ProjectInfoHeading">
                        <div className="redbox7"></div>
                        <h3 className="newprojectinforowtitletext">
                          &nbsp;PROJECT
                          <span style={{ color: "transparent" }}>s</span>
                          INFO&nbsp;
                        </h3>
                        <div className="redbox8"></div>
                      </div>
                      {this.state.projectinfo.length > 0 ? (
                        <div className="newprojectinfocard">
                          <div className="row">
                            <div className="col-md-3 centerClass horizontal">
                              <h5 className="semibold custom-font-size-1_3">
                                Phase
                              </h5>
                              <p className="medium fieldmargin custom-font-size">
                                {projectphase}
                              </p>
                            </div>
                            <div className="col-md-3 centerClass horizontal">
                              <h5 className="semibold custom-font-size-1_3">
                                Configuration
                              </h5>
                              <p className="medium fieldmargin custom-font-size">
                                {projectconfiguration}
                              </p>
                            </div>
                            <div className="col-md-3 centerClass horizontal">
                              <h5 className="semibold custom-font-size-1_3">
                                Price Range
                              </h5>
                              <p className="medium fieldmargin custom-font-size">
                                {pricerange}
                              </p>
                            </div>
                            <div className="col-md-3 centerClass">
                              <h5 className="semibold custom-font-size-1_3">
                                Possession
                              </h5>
                              <p className="medium fieldmargin custom-font-size">
                                {possession}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        "No Project Info Data Available"
                      )}
                    </div>

                    <div className="projectinforow dont-show-on-mobile">
                      <h5 className="separator semibold custom-font-size-1_3">
                        &nbsp;&nbsp;RERA&nbsp;&nbsp;
                      </h5>
                      <div className="projectinfocard">
                        <div className="row">
                          <div className="col-md-6 centerClass horizontal">
                            <h5 className="semibold custom-font-size-1_3">
                              RERA No
                            </h5>
                            {this.state.projectdetails && (
                              <p className="medium fieldmargin custom-font-size">
                                {this.state.projectdetails[0].rera_no
                                  ? this.state.projectdetails[0].rera_no
                                  : "N/A"}
                              </p>
                            )}
                          </div>
                          {/* <div className="col-md-4 centerClass horizontal">
                      <h4>RERA Certificate</h4>
                      {this.state.projectdetails &&
                        <p>{this.state.projectdetails[0].rera_certificate ? this.state.projectdetails[0].rera_certificate: 'N/A' }</p>
                      }
                      </div> */}
                          <div className="col-md-6 centerClass">
                            <h5 className="semibold custom-font-size-1_3">
                              RERA Link
                            </h5>
                            {this.state.projectdetails && (
                              <p className="medium fieldmargin custom-font-size">
                                <a
                                  target="_blank"
                                  href={
                                    this.state.projectdetails[0].rera_link
                                      ? this.state.projectdetails[0].rera_link
                                      : "N/A"
                                  }
                                  className="reraclickstyle"
                                >
                                  Click Here
                                </a>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row amenititesmaprow dont-show-on-mobile">
                      <div className="col-lg-6">
                        <div className="">
                          <h5 className="separator semibold custom-font-size-1_3">
                            &nbsp;&nbsp;FACILITIES&nbsp;&nbsp;
                          </h5>
                          {this.state.projectamenities.length > 0 ? (
                            <div className="amenitiescard">
                              <div className="row amenitiesrow1">
                                <div className="col-md-4 centerClass">
                                  {amenitiesimage0}
                                </div>
                                <div className="col-md-4 centerClass">
                                  {amenitiesimage1}
                                </div>
                                <div className="col-md-4 centerClass">
                                  {amenitiesimage2}
                                </div>
                              </div>
                              <div className="row amenitiesrow2">
                                <div className="col-md-4 centerClass">
                                  {amenitiesimage3}
                                </div>
                                <div className="col-md-4 centerClass">
                                  {amenitiesimage4}
                                </div>
                                <div className="col-md-4 centerClass">
                                  {amenitiesimage5}
                                </div>
                              </div>
                            </div>
                          ) : (
                            "No Amenities Data"
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="">
                          <h5 className="separator semibold custom-font-size-1_3">
                            &nbsp;&nbsp;LOCATION&nbsp;&nbsp;
                          </h5>
                          <div className="amenitiescard">
                            <div className="row">
                              <div className="col-md-12 centerClass">
                                {this.state.projectdetails &&
                                this.state.projectdetails[0].google_map_link ? (
                                  <iframe
                                    src={
                                      this.state.projectdetails[0]
                                        .google_map_link
                                        ? this.state.projectdetails[0]
                                            .google_map_link
                                        : ""
                                    }
                                    className="mapstylemapp"
                                  ></iframe>
                                ) : (
                                  "No Map Data Available"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="developerinforow dont-show-on-mobile">
                      <h5 className="separator semibold custom-font-size-1_3">
                        &nbsp;&nbsp;DEVELOPER&nbsp;&nbsp;
                      </h5>
                      {this.state.developerinfo.length > 0 ? (
                        <div className="projectinfocard">
                          <div className="row">
                            <div className="col-lg-6 centerClass horizontal">
                              {/* <img src={developer} className="mapstyle" alt="developer image"/> */}
                              <h5 className="semibold custom-font-size-1_3">
                                Brand Name
                              </h5>
                              {this.state.developerinfo && (
                                <h5 className="regular fieldmargin custom-font-size">
                                  {this.state.developerinfo[0].brand}
                                </h5>
                              )}
                            </div>

                            <div className="col-lg-6 centerClass">
                              {/* <button className="reviewbtn">Company Profile</button> */}
                              <h5 className="semibold custom-font-size-1_3">
                                Entity Name
                              </h5>
                              {this.state.developerinfo && (
                                <h5 className="regular fieldmargin custom-font-size">
                                  {this.state.developerinfo[0].developer_entity}
                                </h5>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        "No Developer Data Available"
                      )}
                    </div>
                  </div>
                  <div className="col-xl-3">

                  <img width="100%" src={projectpagead}/>
                    {/*e <SideProjects/> */}
                    {/* {suggestedprojectall} */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mobile-footer-menu"
            // onClick={(e) => this.colorchangemobile(5, e)}
          >
            <div
              className="col-3 centeralign custommobilefooterpadding veticallyalign"
              onClick={this.AddReview}
            >
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
              className="col-3 centeralign custommobilefooterpadding veticallyalign"
              onClick={this.AddPicture}
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

            <div className="col-3 centeralign custommobilefooterpadding veticallyalign">
              <span>
                <img
                  width="30px"
                  src={direction}
                  style={{ verticalAlign: "inherit" }}
                />
              </span>
              <a style={{zIndex: '999999999999', color: '#404041', textDecoration: 'none'}} href={'https://www.google.com/maps/dir/?api=1&destination=' + this.state.project_location} target='_blank'>DIRECTION</a>
              {/* <a style={{zIndex: '999999999999', color: '#404041', textDecoration: 'none'}} href={'https://maps.google.com?saddr=Current+Location&daddr=' + this.state.project_location}>DIRECTION</a> */}
              {/* <a style={{zIndex: '999999999999', color: '#404041', textDecoration: 'none'}} href={'https://www.google.com/maps/dir/Current+Location/' + this.state.project_location}>DIRECTION</a> */}
            </div>
            <div className="col-3 centeralign custommobilefooterpadding veticallyalign">
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
      </div>
    );
  }
}
export default Projects;



