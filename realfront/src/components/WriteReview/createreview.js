import React, { Component, useState } from "react";
import "./createreview.css";
// import StarRatings from 'react-star-ratings';
import StarRatingComponent from "react-star-rating-component";
import Dropzone from "react-dropzone";
// const  [fileNames, setFileNames] = useState([]);
// const handleDrop = acceptedFiles => setFileNames(acceptedFiles.map(file => file.name));
import closeIcon from "../../assets/icons/close.png";
import ProjectSearch from "../ProjectSearch/projectsearch";
import Facebook from "../../assets/icons/fb1.png";
import Google from "../../assets/icons/google.png";
import Linkedin from "../../assets/icons/linkedin.png";
import axios from "axios";
import Login from "../../components/Login/login";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Button, Modal } from "react-bootstrap";
import { v4 as uuid } from "uuid";

import imageCompression from "browser-image-compression";
//import Search from '../components/Search/search';

//import ReactSearchBox from 'react-search-box';

class createreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search_id: this.props.project_id ? this.props.project_id.project_id : 0,
      search_name: this.props.project_details
        ? this.props.project_details.project_name
        : "",
      rating: 0,
      rating1: 0,
      rating2: 0,
      rating3: 0,
      rating4: 0,
      rating5: 0,
      name: this.props.project_details
        ? this.props.project_details.project_name
        : "",
      status: "",
      review: "",
      experience: "",
      drag: [],
      selected_imagefile: [],
      photoText: "",
      email_phone: "",
      showpasswordfield: false,
      showemailnamefield: false,
      showotpfield: false,
      showphonenamefield: false,
      password: "",
      username: "",
      otp: "",
      phonename: "",
      className: "drop-zone-show",
      submitted: false,
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
      showComponent: true,
      img_alias: "Review",
    };

    console.log('this.props.project_details => ', this.props.project_details)

    this.emailphoneInput = React.createRef();
    this.passwordInput = React.createRef();
    this.UsernameInput = React.createRef();
    this.otpInput = React.createRef();
    this.phonenameInput = React.createRef();

    this._onDragEnter = this._onDragEnter.bind(this);
    this._onDragLeave = this._onDragLeave.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeImageTitle = this.changeImageTitle.bind(this);

    //    this.state={
    //      bgColor: "white"
    //  };

    // this.changeColor = this.changeColor.bind(this);
    // this.state={
    //   color: "white"
    // };
    // this.butclick = this.setState={bgColor:"white"}
  }
  // butclick = (e) => {
  //   console.log("chnaged")
  // console.log(this.state1)
  //   this.setState({
  //     bgColor:"red",
  //     color: "white"
  //  })
  // }
  // onButtonClick=(e)=>{

  //   e.target.classList = "chg"
  // }

  // changeColor = () =>{

  //   this.setState({bgColor:"red"});
  //   console.log("changed")
  // }
  downshiftOnChange(selectedProject) {
    console.log("!!!!!!");
    console.log(selectedProject);
    // alert(`your favourite project is ${selectedProject.project_id}`);
    // href={'/projects/'+project_id1}
    // if(selectedProject.project_id){
    console.log("!!!!ddddd!!");
    console.log(selectedProject);
    let id = selectedProject.project_id;
    this.setState({
      search_id: selectedProject.project_id,
      search_name: selectedProject.project_name,
    });
    this.closenotif();
    // window.location.href='/projects/'+id;
    // }
    // else{
    //   console.log("LOCATION PAGE")
    //   let id=selectedProject.Location;
    //   window.location.href='/Location/'+id;
    // }
  }
  componentDidMount() {
    window.addEventListener("mouseup", this._onDragLeave);
    window.addEventListener("dragenter", this._onDragEnter);
    window.addEventListener("dragover", this._onDragOver);
    document
      .getElementById("dragbox")
      .addEventListener("dragleave", this._onDragLeave);
    window.addEventListener("drop", this._onDrop);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this._onDragLeave);
    window.removeEventListener("dragenter", this._onDragEnter);
    window.addEventListener("dragover", this._onDragOver);
    document
      .getElementById("dragbox")
      .removeEventListener("dragleave", this._onDragLeave);
    window.removeEventListener("drop", this._onDrop);
  }

  _onDragEnter(e) {
    this.setState({ className: "drop-zone-show" });
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
    this.setState({ className: "drop-zone-show" });
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  async _onDrop(e) {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    console.log("Files dropped: ", files);
    // Upload files

    // if (files[0].size > 1999999) {
    //   alert("Image size too large, please upload images below 2MB")
    //   files = [];
    // }

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


    if(this.state.drag.length > 0){
      for(let i = 0; i < files.length; i++){

        this.state.drag.push(files[i])

      }

      
    } else {
      this.setState({ className: "drop-zone-show", drag: Object.values(files) });
    }



    this.closenotif();
    
    return false;
  }

  handleSubmit(event) {
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
    } else {
      const fd = new FormData();
      // fd.append('image[0]',this.state.drag, this.state.drag.name)
      fd.append(
        "project_id",
        this.state.search_id
          ? this.state.search_id
          : this.props.project_id
          ? this.props.project_id.project_id
          : "2"
      );
      // project_name:this.state.name,
      fd.append(
        "project_name",
        this.state.search_name
          ? this.state.search_name
          : this.props.project_details
          ? this.props.project_details.project_name
          : "Sun Residency"
      );
      fd.append("reviewer_type", this.state.status);
      fd.append("overall_rating", this.state.rating);
      fd.append("location", this.state.rating1);
      fd.append("amenities", this.state.rating2);
      fd.append("floor_plan", this.state.rating3);
      fd.append("customer_service", this.state.rating4);
      fd.append("vom", this.state.rating5);
      fd.append("review_title", this.state.review);
      if (this.state.drag.length) {
        for (let i = 0; i < this.state.drag.length; i++) {
          fd.append("review_media", this.state.drag[i]);
          fd.append("review_media_text", this.state.drag[i].photoText)

        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fd.append("review_media", this.state.selected_imagefile[i]);
          fd.append("review_media_text", this.state.selected_imagefile[i].photoText)

        }
      }
      //enable below line to take email id
      // fd.append("reviewer_email",this.state.email);
      fd.append(
        "reviewer_email",
        this.props.loggedinuseremail
          ? this.props.loggedinuseremail
          : "demo@gmail.com"
      );
      fd.append("review", this.state.experience);

      console.log("MATHEW");
      console.log(fd);
      axios.post(
        "https://www.propviewz.com/be/save_project_review/",
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }

        // project_id:100,
        // // project_name:this.state.name,
        // project_name:"MAPLE TERRACES",
        // reviewer_type:this.state.status,
        // overall_rating:this.state.rating,
        // location:this.state.rating1,
        // amenities:this.state.rating2,
        // floor_plan:this.state.rating3,
        // customer_service:this.state.rating4,
        // vom:this.state.rating5,
        // review_title:this.state.review,
        // review:this.state.experience,
        // // review_media:this.state.drag,
        // reviewer_email:this.state.email
      );
      //  console.log("i got called");
      //  alert("Review has been submitted");
      //  console.log(this.state)
      //  console.log(this.state.experience)
      this.props.onClose();
      this.props.showreviewstatus();
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
        drag: [],
        selected_imagefile: [],
        email_phone: "",
        submitted: true,
      });
    }
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
        if (this.state.drag.length) {
          for (let i = 0; i < this.state.drag.length; i++) {
            fd2.append("review_media", this.state.drag[i]);
            fd2.append("review_media_text", this.state.drag[i].photoText)

          }
        } else {
          for (let i = 0; i < this.state.selected_imagefile.length; i++) {
            fd2.append("review_media", this.state.selected_imagefile[i]);
            fd2.append("review_media_text", this.state.selected_imagefile[i].photoText)

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
        this.props.loginsuccess(
          true,
          loginresponse.data.ValidEmail,
          loginresponse.data.Name
        );
        this.props.onClose();
        this.props.showreviewstatus();
      } else {
        // alert("Please Enter the correct Password");
        this.passwordInput.current.focus();
        this.setState({ passworderror: true });
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
      if (this.state.drag.length) {
        for (let i = 0; i < this.state.drag.length; i++) {
          fd3.append("review_media", this.state.drag[i]);
          fd3.append("review_media_text", this.state.drag[i].photoText)

        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fd3.append("review_media", this.state.selected_imagefile[i]);
          fd3.append("review_media_text", this.state.selected_imagefile[i].photoText)

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
        this.props.showreviewstatus();
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
      if (this.state.drag.length) {
        for (let i = 0; i < this.state.drag.length; i++) {
          fd4.append("review_media", this.state.drag[i]);
          fd4.append("review_media_text", this.state.drag[i].photoText)

        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fd4.append("review_media", this.state.selected_imagefile[i]);
          fd4.append("review_media_text", this.state.selected_imagefile[i].photoText)

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
        this.props.showreviewstatus();
      } else {
        // alert("Error submitting review. Please Try again.")
        this.setState({ reviewsubmiterror: true });
      }
    }
  };

  responseGoogle = async (response) => {
    // this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
    console.log("google login details", response);
    if (response.profileObj) {
      let googleloginresponse = await axios.post(
        "https://www.propviewz.com/be/login/google_login",
        {
          id: response.profileObj.email,
          name: response.profileObj.name,
          login_type: "google",
          pic: response.profileObj.imageUrl,
        }
      );
      console.log("google login response", googleloginresponse);
      if (googleloginresponse.data.Response === "Success") {
        const fdg = new FormData();
        // fd.append('image[0]',this.state.drag, this.state.drag.name)
        fdg.append(
          "project_id",
          this.state.search_id
            ? this.state.search_id
            : this.props.project_id
            ? this.props.project_id.project_id
            : ""
        );
        // project_name:this.state.name,
        fdg.append(
          "project_name",
          this.state.search_name
            ? this.state.search_name
            : this.props.project_details
            ? this.props.project_details.project_name
            : ""
        );
        fdg.append("reviewer_type", this.state.status);
        fdg.append("overall_rating", this.state.rating);
        fdg.append("location", this.state.rating1);
        fdg.append("amenities", this.state.rating2);
        fdg.append("floor_plan", this.state.rating3);
        fdg.append("customer_service", this.state.rating4);
        fdg.append("vom", this.state.rating5);
        fdg.append("review_title", this.state.review);
        if (this.state.drag.length) {
          for (let i = 0; i < this.state.drag.length; i++) {
            fdg.append("review_media", this.state.drag[i]);
            fdg.append("review_media_text", this.state.drag[i].photoText)

          }
        } else {
          for (let i = 0; i < this.state.selected_imagefile.length; i++) {
            fdg.append("review_media", this.state.selected_imagefile[i]);
            fdg.append("review_media_text", this.state.selected_imagefile[i].photoText)
          }
        }
        //enable below line to take email id

        // fd1.append("reviewer_email",this.props.loggedinuseremail?this.props.loggedinuseremail:"demo@gmail.com");
        fdg.append("review", this.state.experience);

        fdg.append("reviewer_name", this.state.username);

        fdg.append("reviewer_email", googleloginresponse.data.ValidEmail);

        let review_status = await axios.post(
          "https://www.propviewz.com/be/save_project_review/",
          fdg,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("review status", review_status);
        if (review_status.data.Status === "Success") {
          localStorage.setItem("loggedin", true);
          localStorage.setItem(
            "loggedInUsername",
            googleloginresponse.data.Name
          );
          localStorage.setItem(
            "loggedInUseremail",
            googleloginresponse.data.ValidEmail
          );
          this.props.loginsuccess(
            true,
            googleloginresponse.data.ValidEmail,
            googleloginresponse.data.Name
          );
          this.props.onClose();
          this.props.showreviewstatus();
        } else {
          alert("Error submitting review. Try again");
        }
      } else {
        const fdg = new FormData();
        // fd.append('image[0]',this.state.drag, this.state.drag.name)
        fdg.append(
          "project_id",
          this.state.search_id
            ? this.state.search_id
            : this.props.project_id
            ? this.props.project_id.project_id
            : ""
        );
        // project_name:this.state.name,
        fdg.append(
          "project_name",
          this.state.search_name
            ? this.state.search_name
            : this.props.project_details
            ? this.props.project_details.project_name
            : ""
        );
        fdg.append("reviewer_type", this.state.status);
        fdg.append("overall_rating", this.state.rating);
        fdg.append("location", this.state.rating1);
        fdg.append("amenities", this.state.rating2);
        fdg.append("floor_plan", this.state.rating3);
        fdg.append("customer_service", this.state.rating4);
        fdg.append("vom", this.state.rating5);
        fdg.append("review_title", this.state.review);
        if (this.state.drag.length) {
          for (let i = 0; i < this.state.drag.length; i++) {
            fdg.append("review_media", this.state.drag[i]);
            fdg.append("review_media_text", this.state.drag[i].photoText)

          }
        } else {
          for (let i = 0; i < this.state.selected_imagefile.length; i++) {
            fdg.append("review_media", this.state.selected_imagefile[i]);
            fdg.append("review_media_text", this.state.selected_imagefile[i].photoText)

          }
        }
        //enable below line to take email id

        // fd1.append("reviewer_email",this.props.loggedinuseremail?this.props.loggedinuseremail:"demo@gmail.com");
        fdg.append("review", this.state.experience);

        fdg.append("reviewer_name", this.state.username);

        fdg.append("reviewer_email", googleloginresponse.data.ValidEmail);

        let review_status = await axios.post(
          "https://www.propviewz.com/be/save_project_review/",
          fdg,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("review status", review_status);
        if (review_status.data.Status === "Success") {
          localStorage.setItem("loggedin", true);
          localStorage.setItem(
            "loggedInUsername",
            googleloginresponse.data.Name
          );
          localStorage.setItem(
            "loggedInUseremail",
            googleloginresponse.data.ValidEmail
          );
          this.props.loginsuccess(
            true,
            googleloginresponse.data.ValidEmail,
            googleloginresponse.data.Name
          );
          this.props.onClose();
          this.props.showreviewstatus();
        } else {
          alert("Error submitting review. Try again");
        }
      }
    } else {
      // if(response.error === "idpiframe_initialization_failed"){
      //   // this.setState({cookieerror: true})
      //   alert("Error occurred. Enable Cookies Please.")
      // }
    }
  };

  responseFacebook = async (response) => {
    console.log(response);

    // this.setState({
    //   isLoggedIn: true,
    //   userID: response.userID,
    //   name: response.name,
    //   email: response.email,
    //   picture: response.picture.data.url
    // });

    let facebookloginresponse = await axios.post(
      "https://www.propviewz.com/be/login/fb_login",
      {
        id: response.email,
        name: response.name,
        login_type: "facebook",
        pic: response.picture.data.url,
      }
    );
    console.log("facebook login", facebookloginresponse);
    if (facebookloginresponse.data.Response === "Success") {
      const fdg = new FormData();
      // fd.append('image[0]',this.state.drag, this.state.drag.name)
      fdg.append(
        "project_id",
        this.state.search_id
          ? this.state.search_id
          : this.props.project_id
          ? this.props.project_id.project_id
          : ""
      );
      // project_name:this.state.name,
      fdg.append(
        "project_name",
        this.state.search_name
          ? this.state.search_name
          : this.props.project_details
          ? this.props.project_details.project_name
          : ""
      );
      fdg.append("reviewer_type", this.state.status);
      fdg.append("overall_rating", this.state.rating);
      fdg.append("location", this.state.rating1);
      fdg.append("amenities", this.state.rating2);
      fdg.append("floor_plan", this.state.rating3);
      fdg.append("customer_service", this.state.rating4);
      fdg.append("vom", this.state.rating5);
      fdg.append("review_title", this.state.review);
      if (this.state.drag.length) {
        for (let i = 0; i < this.state.drag.length; i++) {
          fdg.append("review_media", this.state.drag[i]);
          fdg.append("review_media_text", this.state.drag[i].photoText)

        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fdg.append("review_media", this.state.selected_imagefile[i]);
         fdg.append("review_media_text", this.state.selected_imagefile[i].photoText)

        }
      }
      //enable below line to take email id

      // fd1.append("reviewer_email",this.props.loggedinuseremail?this.props.loggedinuseremail:"demo@gmail.com");
      fdg.append("review", this.state.experience);

      fdg.append("reviewer_name", this.state.username);

      fdg.append("reviewer_email", facebookloginresponse.data.ValidEmail);

      let review_status = await axios.post(
        "https://www.propviewz.com/be/save_project_review/",
        fdg,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (review_status.data.Status === "Success") {
        localStorage.setItem("loggedin", true);
        localStorage.setItem(
          "loggedInUsername",
          facebookloginresponse.data.Name
        );
        localStorage.setItem(
          "loggedInUseremail",
          facebookloginresponse.data.ValidEmail
        );
        this.props.loginsuccess(
          true,
          facebookloginresponse.data.ValidEmail,
          facebookloginresponse.data.Name
        );
        this.props.onClose();
        this.props.showreviewstatus();
      } else {
        alert("Error submitting review. Try again");
      }
    } else {
      const fdg = new FormData();
      // fd.append('image[0]',this.state.drag, this.state.drag.name)
      fdg.append(
        "project_id",
        this.state.search_id
          ? this.state.search_id
          : this.props.project_id
          ? this.props.project_id.project_id
          : ""
      );
      // project_name:this.state.name,
      fdg.append(
        "project_name",
        this.state.search_name
          ? this.state.search_name
          : this.props.project_details
          ? this.props.project_details.project_name
          : ""
      );
      fdg.append("reviewer_type", this.state.status);
      fdg.append("overall_rating", this.state.rating);
      fdg.append("location", this.state.rating1);
      fdg.append("amenities", this.state.rating2);
      fdg.append("floor_plan", this.state.rating3);
      fdg.append("customer_service", this.state.rating4);
      fdg.append("vom", this.state.rating5);
      fdg.append("review_title", this.state.review);
      if (this.state.drag.length) {
        for (let i = 0; i < this.state.drag.length; i++) {
          fdg.append("review_media", this.state.drag[i]);
          fdg.append("review_media_text", this.state.drag[i].photoText)

        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fdg.append("review_media", this.state.selected_imagefile[i]);
          fdg.append("review_media_text", this.state.selected_imagefile[i].photoText)

        }
      }
      //enable below line to take email id

      // fd1.append("reviewer_email",this.props.loggedinuseremail?this.props.loggedinuseremail:"demo@gmail.com");
      fdg.append("review", this.state.experience);

      fdg.append("reviewer_name", this.state.username);

      fdg.append("reviewer_email", facebookloginresponse.data.ValidEmail);

      let review_status = await axios.post(
        "https://www.propviewz.com/be/save_project_review/",
        fdg,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (review_status.data.Status === "Success") {
        localStorage.setItem("loggedin", true);
        localStorage.setItem(
          "loggedInUsername",
          facebookloginresponse.data.Name
        );
        localStorage.setItem(
          "loggedInUseremail",
          facebookloginresponse.data.ValidEmail
        );
        this.props.loginsuccess(
          true,
          facebookloginresponse.data.ValidEmail,
          facebookloginresponse.data.Name
        );
        this.props.onClose();
        this.props.showreviewstatus();
      } else {
        alert("Error submitting review. Try again");
      }
    }
  };

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
    this.closenotif();
  };

  myChangeHandlerArray = async (event) => {
    let selected_imagefile = event.target.name;
    console.log("QWERTY");
    console.log(event.target.files);
    try {
      let randomarray2 = [...event.target.files];
      if (event.target.files) {
        // if (event.target.files[0].size > 1999999) {
        //   console.log("TOOO BIG")
        //   alert("Image size too large, please upload images below 2MB")
        //   randomarray2 = [];
        // }

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

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
    this.closenotif();
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
      // fd.append('image[0]',this.state.drag, this.state.drag.name)
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
      if (this.state.drag.length) {
        for (let i = 0; i < this.state.drag.length; i++) {
          fd1.append("review_media", this.state.drag[i]);
          fd1.append("review_media_text", this.state.drag[i].photoText)

        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fd1.append("review_media", this.state.selected_imagefile[i]);
          fd1.append("review_media_text", this.state.selected_imagefile[i].photoText)

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
    console.clear();
    console.log(index);
    console.log(type);

    this.setState({photoText: ""})

    console.log(this.state.selected_imagefile);
    let files =
      type === "drag" ? this.state.drag : this.state.selected_imagefile;
    let removeFile =
      type === "drag"
        ? this.state.drag[index]
        : this.state.selected_imagefile[index];
    console.log("files", files, "removeFile", removeFile);
    files = Object.values(files).filter((img) => {
      if (img.name) {
        return img.name !== removeFile.name;
      }
    });
    type === "drag"
      ? this.setState({ drag: files })
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
  
    if (this.state.drag.length) {
  
      this.state.drag.map(img => {
        if(img.photoId == image.photoId){
          img.photoText = e.target.value
        }
      })
    }
    console.log('trenddddddddd => ',this.state.selected_imagefile)
    this.setState({photoText: e.target.value})
  }

  render() {
    console.log("render images", this.state.selected_imagefile);
    console.log("TEST1234 CODE");
    console.log(this.state);
    console.log(this.props);
    let filename = [];
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
    if (this.state.drag.length) {
      let allimages = Object.values(this.state.drag);
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
    const { rating } = this.state;
    const { rating1 } = this.state;
    const { rating2 } = this.state;
    const { rating3 } = this.state;
    const { rating4 } = this.state;
    const { rating5 } = this.state;

    console.log(this.state.submitted);
    return (
      <Modal show={this.state.showComponent} className="div1">
        <div className="cover r-container" id="topele">
          {/* <div className="container div1">  */}
          <div className="popup-header">
            <img
              className="closebtn"
              src={closeIcon}
              onClick={this.props.onClose}
            />
          </div>
          <div className="containeraddreview div_mobile">
            {this.state.shownotifproject && (
              <div
                className="alert alert-danger alert-dismissible"
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
                Please Select a Project.
              </div>
            )}

            {this.state.shownotifstatus && (
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
                Please Select Status.
              </div>
            )}

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
                  top: "57vw",
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

            <div class="popup-title">
              <p className="add">ADD REVIEW</p>
            </div>

            <hr className="h1"></hr>
            <hr className="h2"></hr>
            <form onSubmit={this.handleSubmit} id="addreviewform">
              <p className="pText">Project</p>
              <div className="search-wrapper-review">
           
                {!this.state.name.length > 0 && (
                  <ProjectSearch
                    downshiftOnChange={this.downshiftOnChange.bind(this)}
                  />
                )}

                {this.state.name.length > 0 && (
                  <input
                    type="text"
                    pl
                    className="pField"
                    id="name"
                    name="name"
                    required
                    onChange={this.myChangeHandler}
                    value={this.state.name}
                  />
                )}
              </div>
              <p className="pText2">
                Please confirm your status at your project
              </p>

              <section class="plan cf">
                <input
                  type="radio"
                  name="status"
                  id="visitor"
                  value="visitor"
                  onChange={this.myChangeHandler}
                />
                <label className="visitor-label four col aa" for="visitor">
                  Visitor
                </label>
                <input
                  type="radio"
                  name="status"
                  id="Agent"
                  value="Agent"
                  onChange={this.myChangeHandler}
                />
                <label className="enquiry-label four col bb" for="Agent">
                  Agent
                </label>
                <input
                  type="radio"
                  name="status"
                  id="owner"
                  value="owner"
                  onChange={this.myChangeHandler}
                />
                <label className="owner-label four col cc" for="owner">
                  Owner
                </label>
                <input
                  type="radio"
                  name="status"
                  id="Tenant"
                  value="Tenant"
                  onChange={this.myChangeHandler}
                />
                <label className="tenant-label four col dd" for="Tenant">
                  Tenant
                </label>
              </section>

              <p className="OverRating">Your overall rating of this property</p>
              <div className="star">
                <StarRatingComponent
                  className="starcss"
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
              <p className="pro">Property Ratings</p>
              <div className="rating-wrap">
                <p className="loc">Location</p>
                <div className="star1">
                  {
                    <StarRatingComponent
                      className="starSmall"
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
              <div className="rating-wrap">
                <p className="ame">Amenities</p>
                <div className="star2">
                  {
                    <StarRatingComponent
                      className="starSmall"
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
              <div className="rating-wrap">
                <p className="uni">Unit/ Floor Plan</p>
                <div className="star3">
                  {
                    <StarRatingComponent
                      className="starSmall"
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
              <div className="rating-wrap">
                <p className="cus">Customer Service</p>
                <div className="star4">
                  {
                    <StarRatingComponent
                      className="starSmall"
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
              <div className="rating-wrap">
                <p className="val">Value for Money</p>
                <div className="star5">
                  {
                    <StarRatingComponent
                      className="starSmall"
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
              <p className="revText">Review Title</p>
              <input
                type="text"
                name="review"
                className="revField"
                id="review"
                placeholder="e.g. Great property in a fantastic location"
                onChange={this.myChangeHandler}
                value={this.state.review}
              />
              <p className="your">Your Review</p>
              <textarea
                className="shareEx"
                id="exper"
                placeholder="Share your experience"
                name="experience"
                onChange={this.myChangeHandler}
                value={this.state.experience}
              ></textarea>

              <p className="share">
                Share photos of project to be published with review
              </p>

              {/* <div>
              <Dropzone onDrop={handleDrop}>
                 {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>Drag'n'drop files, or click to select files</p>
                    </div>
                 )}
               </Dropzone>
             <div>
               <ul>
               {fileNames.map(fileName => (
                 <li key={fileName}>{fileName}</li> 
               ))}
               </ul></div>
            </div> */}

              <div class="upload-file">
                <input
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  id="file"
                  name="file"
                  multiple
                  onChange={this.myChangeHandlerArray}
                  value={this.state.file}
                />
                <label for="file" className="file1">
                  Select Image{" "}
                </label>
                {this.props.children}
                {!this.state.selected_imagefile.length &&
                  !this.state.drag.length && (
                    <div id="dragbox" className={this.state.className}>
                      <p className="dr1">Drag & Drop</p>
                      <p className="dr2">OR</p>
                    </div>
                  )}
                {this.state.selected_imagefile.length > 0 &&
                  !this.state.drag.length > 0 && (
                    <div id="dragbox" className={this.state.className}>
                      <ul
                        style={{ lineHeight: "1", overflowWrap: "break-word" }}
                      >
                        {allimagesnames}
                      </ul>
                    </div>
                  )}
                {this.state.drag.length > 0 && (
                  <div id="dragbox" className={this.state.className}>
                    <ul style={{ lineHeight: "1", overflowWrap: "break-word" }}>
                      {allimagesnames}
                    </ul>
                  </div>
                )}

                <div className="take-container">
                  <input
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    id="file"
                    name="file"
                    multiple
                    onChange={this.myChangeHandlerArray}
                    value={this.state.file}
                  />
                  <label for="file" className="take">
                    Take Photo{" "}
                  </label>
                </div>
              </div>
              {this.state.selected_imagefile.length > 0 &&
                    
                    <div id="dragbox12" className={this.state.className}>
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

              <div id="mobileuploadbuttons">
                {
                  this.state.selected_imagefile.length > 0 &&
                    !this.state.drag.length > 0 && (
                      // <div id="dragbox1" className={this.state.className}>
                      <ul
                        style={{
                          display: "block",
                          lineHeight: "1",
                          overflowWrap: "break-word",
                        }}
                      >
                        {allimagesnames}
                      </ul>
                    )
                  // </div>
                }
              </div>
              <div id="mobileuploadbuttons">
                {
                  this.state.drag.length > 0 && (
                    // <div id="dragbox1" className={this.state.className}>
                    <ul
                      style={{
                        display: "block",
                        lineHeight: "1",
                        overflowWrap: "break-word",
                      }}
                    >
                      {allimagesnames}
                    </ul>
                  )
                  // </div>
                }
              </div>

              {this.props.loggedinuseremail ? (
                <div></div>
              ) : (
                <div>
                  <p className="sign">SIGN UP</p>
                  <hr className="hr3"></hr>
                  <hr className="hr4"></hr>
                  {/* <img src={Facebook} className="fbb"/> */}
                  <div className="social-wrapper">
                    <div className="fbb">
                      <FacebookLogin
                        appId="1168953490128944"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        textButton={""}
                        icon="fa-facebook"
                      />
                    </div>
                    {/* <img src={Google} className="googleplus"/> */}

                    {/* { this.state.search_name == "" || this.state.search_id == "" ? <img src={Google} className="googleplus"/> : this.state.status == "" ? <img src={Google} className="googleplus"/>: this.state.rating == '' ? <img src={Google} className="googleplus"/>: */}

                    <div className="googleplus">
                      <GoogleLogin
                        clientId="776070248769-b4houskf848vu8t013f0pajvtf402hu4.apps.googleusercontent.com" //TO BE CREATED
                        render={(renderProps) => (
                          <img
                            src={Google}
                            alt="google logo"
                            className="googleplus"
                            style={{ marginTop: "0px" }}
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                          />
                        )}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                      />
                    </div>
                    {/* } */}
                    <div className="linkedin">
                      <img src={Linkedin} />
                    </div>
                  </div>
                  <p className="oroption">OR</p>
                  <hr className="hr5"></hr>
                  <hr className="hr6"></hr>

                  {!this.state.showpasswordfield &&
                    !this.state.showotpfield && (
                      <p className="emId">Email Id / Mobile No. </p>
                    )}
                  {!this.state.showpasswordfield &&
                    !this.state.showotpfield &&
                    !this.state.showemailnamefield && (
                      <input
                        type="text"
                        ref={this.emailphoneInput}
                        className="emField"
                        id="email_phone"
                        placeholder="Enter your Email ID or mobile no."
                        name="email_phone"
                        required
                        onChange={this.myChangeHandler}
                        value={this.state.email_phone}
                      />
                    )}

                  {!this.state.showpasswordfield &&
                    !this.state.showemailnamefield &&
                    !this.state.showotpfield && (
                      <button
                        type="button"
                        className="cont"
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

                  <p className="already">Already a member of Propviewz?</p>
                  <p className="login" onClick={this.openlogin.bind(this)}>
                    Login
                  </p>
                </div>
              )}
              {this.props.loggedinuseremail && (
                <button className="sub">Submit</button>
              )}
              {/* <button className="sub">Submit</button> */}
            </form>
          </div>
        </div>

        {this.state.showlogin && (
          <Login
            onClose={this.props.onClose}
            close={this.closelogin.bind(this)}
            formdata={this.state.formdata ? this.state.formdata : "nodata"}
            loginsuccess={this.props.loginsuccess}
            showreviewstatus={this.props.showreviewstatus}
          />
        )}

        {/* </div> */}
      </Modal>
    );
  }
}
export default createreview;
