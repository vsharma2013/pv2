import React, { Component, useState } from "react";
import "./postApicture.css";
import ProjectSearch from "../ProjectSearch/projectsearch";
import Facebook from "../../assets/icons/fb1.png";
import Google from "../../assets/icons/google.png";
import Linkedin from "../../assets/icons/linkedin.png";
import axios from "axios";
import closeIcon from "../../assets/icons/close.png";
import Login from "../../components/Login/login";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Button, Modal } from "react-bootstrap";
import imageCompression from "browser-image-compression";
import { v4 as uuid } from "uuid";

class postApicture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name1: this.props.project_details
        ? this.props.project_details.project_name
        : "",
      search_id: this.props.project_id ? this.props.project_id.project_id : 0,
      search_name: this.props.project_details
        ? this.props.project_details.project_name
        : "",
      // search_id:0,
      // search_name:"",
      rating: 0,
      drag: [],
      selected_imagefile: [],
      photoText: "",
      email1: "",
      email_phone: "",
      password: "",
      username: "",
      otp: "",
      phonename: "",
      formdata: "",
      className: "drop-zone-show1",
      submitted: false,
      showComponent1: true,
      passworderror: false,
      reviewsubmiterror: false,
      otperror: false,
      waitstatus: false,
      showpasswordfield: false,
      showemailnamefield: false,
      showotpfield: false,
      showphonenamefield: false,

      shownotifemail_phone: false,
      shownotifproject: false,
      shownotifpicture: false,
      shownotifpassword: false,
      shownotifotp: false,
      shownotifemailname: false,
      shownotifphonename: false,
      socialloginerror: false,
      img_alias: null,
    };
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
  }

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
      .getElementById("dragbox1")
      .addEventListener("dragleave", this._onDragLeave);
    window.addEventListener("drop", this._onDrop);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this._onDragLeave);
    window.removeEventListener("dragenter", this._onDragEnter);
    window.addEventListener("dragover", this._onDragOver);
    document
      .getElementById("dragbox1")
      .removeEventListener("dragleave", this._onDragLeave);
    window.removeEventListener("drop", this._onDrop);
  }

  _onDragEnter(e) {
    this.setState({ className: "drop-zone-show1" });
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
    this.setState({ className: "drop-zone-show1" });
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  async _onDrop(e) {
    // debugger;
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
      this.setState({ className: "drop-zone-show1", drag: Object.values(files) });
    }

    console.clear();
    console.log(files);
    
    this.closenotif();
    console.log("drag => ", this.state.drag);
    return false;
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
    this.closenotif();
  };

  myChangeHandlerArray = async (event) => {

    let selected_imagefile = event.target.name;
    try {
      let randomarray2 = [...event.target.files];
      // let tempArray = randomarray2

      if (randomarray2) {
        // if (event.target.files[0].size > 1999999) {
        //   console.log("TOOO BIG")
        //   alert("Image size too large, please upload images below 2MB")
        //   randomarray2 = [];
        // }
        // debugger;

        for (let i = 0; i < randomarray2.length; i++) {
          if (randomarray2[i].size > 1999999) {
            console.log(randomarray2[i].size);
            let compFile = {};
            randomarray2[i] = await this.imageCompressor(randomarray2[i]);
            console.log(randomarray2);
          }
        }
      }
      // add unique id to each images

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

      console.log("selected_imagefile => ", selected_imagefile);
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

  clear(e) {
    console.log("clearing image");
    e.preventDefault();
    this.setState({ selected_imagefile: "", drag: "" });
    document.getElementById("file_post").value = "";
  }


  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.search_name == "" || this.state.search_id == "") {
      this.setState({ shownotifproject: true });
      // this.emailphoneInput.current.focus();
    } else if (this.state.selected_imagefile == "" && this.state.drag == "") {
      this.setState({ shownotifpicture: true });
    } else {
      this.setState({ waitstatus: true });
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
      if (this.state.drag.length) {
        for (let i = 0; i < this.state.drag.length; i++) {
          fd.append("post_media", this.state.drag[i]);
          fd.append("post_media_text", this.state.drag[i].photoText)

        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
        
          fd.append("post_media", this.state.selected_imagefile[i])
          fd.append("post_media_text", this.state.selected_imagefile[i].photoText)
        }
      }
      //enable below line to take email id value
      // fd.append("email_or_number",this.state.email1);
      fd.append(
        "email_or_number",
        this.props.loggedinuseremail
          ? this.props.loggedinuseremail
          : "mathew@comportement.in"
      );

      console.log("MATHEW POst pic");
      console.log(fd);
      let postresponse = await axios.post(
        "https://www.propviewz.com/be/post_picture/",

        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("i got called");
      console.log(postresponse);
      //  alert("Images have been submitted");
      //  console.log(this.state)
      //  console.log(this.state.experience)

      //  this.setState({
      //   name1: '',
      //   drag:[],
      //   selected_imagefile:[],
      //   email1:'',
      //   submitted:true
      // });
      if (postresponse.data.Status === "Success") {
        this.props.onClose();
        this.props.showpicturestatus();
      }
    }
  };

  closenotif() {
    this.setState({
      shownotifemail_phone: false,
      shownotifproject: false,
      shownotifpicture: false,
      shownotifpassword: false,
      passworderror: false,
      reviewsubmiterror: false,
      shownotifemailname: false,
      otperror: false,
      shownotifphonename: false,
      shownotifotp: false,
      socialloginerror: false,
    });
  }

  handleSubmit1 = async (event) => {
    event.preventDefault();
    console.log("first function");
    if (this.state.search_name == "" || this.state.search_id == "") {
      this.setState({ shownotifproject: true });
      // this.emailphoneInput.current.focus();
    } else if (this.state.selected_imagefile == "" && this.state.drag == "") {
      this.setState({ shownotifpicture: true });
    } else if (this.state.email_phone == "") {
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
        } else {
          this.setState({ showpasswordfield: true });
        }
      } else {
        if (isNaN(this.state.email_phone)) {
          this.setState({ showemailnamefield: true });
        } else {
          this.setState({ showotpfield: true });
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
        console.log("login success");
        this.setState({ waitstatus: true });
        const fd = new FormData();

        fd.append(
          "project_id",
          this.state.search_id
            ? this.state.search_id
            : this.props.project_id
            ? this.props.project_id.project_id
            : ""
        );
        fd.append(
          "project_name",
          this.state.search_name
            ? this.state.search_name
            : this.props.project_details
            ? this.props.project_details.project_name
            : "Sun Residency"
        );

        if (this.state.drag.length) {
          for (let i = 0; i < this.state.drag.length; i++) {
            fd.append("post_media", this.state.drag[i]);
            fd.append("post_media_text", this.state.drag[i].photoText)
          }
        } else {
          for (let i = 0; i < this.state.selected_imagefile.length; i++) {
            
         
          fd.append("post_media_text", this.state.selected_imagefile[i].photoText)

            fd.append("post_media", this.state.selected_imagefile[i]);
          }
        }

        fd.append("email_or_number", loginresponse.data.ValidEmail);

        let postpictureresponse = await axios.post(
          "https://www.propviewz.com/be/post_picture/",

          fd,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("post pircture response1", postpictureresponse);
        // if(postpictureresponse.data.Status === "Success"){
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
        this.props.showpicturestatus();

        // }
        // else{

        //   this.setState({reviewsubmiterror:true})
        // }
      } else {
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

      this.setState({ waitstatus: true });
      const fd = new FormData();

      fd.append(
        "project_id",
        this.state.search_id
          ? this.state.search_id
          : this.props.project_id
          ? this.props.project_id.project_id
          : ""
      );
      fd.append(
        "project_name",
        this.state.search_name
          ? this.state.search_name
          : this.props.project_details
          ? this.props.project_details.project_name
          : "Sun Residency"
      );

      if (this.state.drag.length) {
        for (let i = 0; i < this.state.drag.length; i++) {
          fd.append("post_media", this.state.drag[i]);
          fd.append("post_media_text", this.state.drag[i].photoText)

        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fd.append("post_media", this.state.selected_imagefile[i]);
          fd.append("post_media_text", this.state.selected_imagefile[i].photoText)
        }
      }

      fd.append("email_or_number", this.state.email_phone);

      fd.append("reviewer_name", this.state.username);

      let postpictureresponse = await axios.post(
        "https://www.propviewz.com/be/post_picture/post_picture_without_login/",
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("post picture email final response", postpictureresponse);
      if (postpictureresponse.data.Status === "Success") {
        this.props.onClose();
        this.props.showpicturestatus();
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

      this.setState({ waitstatus: true });
      const fd = new FormData();

      fd.append(
        "project_id",
        this.state.search_id
          ? this.state.search_id
          : this.props.project_id
          ? this.props.project_id.project_id
          : ""
      );
      fd.append(
        "project_name",
        this.state.search_name
          ? this.state.search_name
          : this.props.project_details
          ? this.props.project_details.project_name
          : "Sun Residency"
      );

      if (this.state.drag.length) {
        for (let i = 0; i < this.state.drag.length; i++) {
          fd.append("post_media", this.state.drag[i]);
          fd.append("post_media_text", this.state.drag[i].photoText)

        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fd.append("post_media", this.state.selected_imagefile[i]);
          fd.append("post_media_text", this.state.selected_imagefile[i].photoText)

        }
      }

      fd.append("email_or_number", this.state.email_phone);

      fd.append("reviewer_name", this.state.phonename);

      let postpictureresponse = await axios.post(
        "https://www.propviewz.com/be/post_picture/post_picture_without_login/",
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("post picture phone final response", postpictureresponse);
      if (postpictureresponse.data.Status === "Success") {
        this.props.onClose();
        this.props.showpicturestatus();
      }
    }
  };

  openlogin() {
    if (this.state.search_name == "" || this.state.search_id == "") {
      this.setState({ shownotifproject: true });
      // this.emailphoneInput.current.focus();
    } else if (this.state.selected_imagefile == "" && this.state.drag == "") {
      this.setState({ shownotifpicture: true });
    }
    // else if(this.state.email_phone == '')
    // {

    //   this.emailphoneInput.current.focus();
    //   this.setState({shownotifemail_phone:true});
    // }
    else {
      const fd = new FormData();

      fd.append(
        "project_id",
        this.state.search_id
          ? this.state.search_id
          : this.props.project_id
          ? this.props.project_id.project_id
          : ""
      );
      fd.append(
        "project_name",
        this.state.search_name
          ? this.state.search_name
          : this.props.project_details
          ? this.props.project_details.project_name
          : "Sun Residency"
      );

      if (this.state.drag.length) {
        for (let i = 0; i < this.state.drag.length; i++) {
          fd.append("post_media", this.state.drag[i]);
          fd.append("post_media_text", this.state.drag[i].photoText)

        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fd.append("post_media", this.state.selected_imagefile[i]);
          fd.append("post_media_text", this.state.selected_imagefile[i].photoText)

        }
      }

      // fd.append("email_or_number",loginresponse.data.ValidEmail);

      localStorage.setItem("formdataavailable1", true);
      this.setState({ formdata: fd, showlogin: true });
    }
  }

  closelogin() {
    this.setState({ showlogin: false });
  }

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
      const fd = new FormData();

      fd.append(
        "project_id",
        this.state.search_id
          ? this.state.search_id
          : this.props.project_id
          ? this.props.project_id.project_id
          : ""
      );
      fd.append(
        "project_name",
        this.state.search_name
          ? this.state.search_name
          : this.props.project_details
          ? this.props.project_details.project_name
          : "Sun Residency"
      );

      if (this.state.drag.length) {
        for (let i = 0; i < this.state.drag.length; i++) {
          fd.append("post_media", this.state.drag[i]);
          fd.append("post_media_text", this.state.drag[i].photoText)

        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fd.append("post_media", this.state.selected_imagefile[i]);
          fd.append("post_media_text", this.state.selected_imagefile[i].photoText)

        }
      }

      fd.append("email_or_number", facebookloginresponse.data.ValidEmail);

      let review_status = await axios.post(
        "https://www.propviewz.com/be/post_picture/",
        fd,
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
        this.props.showpicturestatus();
      } else {
        alert("Error submitting review. Try again");
      }
    } else {
      const fd = new FormData();

      fd.append(
        "project_id",
        this.state.search_id
          ? this.state.search_id
          : this.props.project_id
          ? this.props.project_id.project_id
          : ""
      );
      fd.append(
        "project_name",
        this.state.search_name
          ? this.state.search_name
          : this.props.project_details
          ? this.props.project_details.project_name
          : "Sun Residency"
      );

      if (this.state.drag.length) {
        for (let i = 0; i < this.state.drag.length; i++) {
          fd.append("post_media", this.state.drag[i]);
          fd.append("post_media_text", this.state.drag[i].photoText)

        }
      } else {
        for (let i = 0; i < this.state.selected_imagefile.length; i++) {
          fd.append("post_media", this.state.selected_imagefile[i]);
          fd.append("post_media_text", this.state.selected_imagefile[i].photoText)

        }
      }

      fd.append("email_or_number", facebookloginresponse.data.ValidEmail);

      let review_status = await axios.post(
        "https://www.propviewz.com/be/post_picture/",
        fd,
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
        this.props.showpicturestatus();
      } else {
        alert("Error submitting review. Try again");
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
        const fd = new FormData();

        fd.append(
          "project_id",
          this.state.search_id
            ? this.state.search_id
            : this.props.project_id
            ? this.props.project_id.project_id
            : ""
        );
        fd.append(
          "project_name",
          this.state.search_name
            ? this.state.search_name
            : this.props.project_details
            ? this.props.project_details.project_name
            : "Sun Residency"
        );

        if (this.state.drag.length) {
          for (let i = 0; i < this.state.drag.length; i++) {
            fd.append("post_media", this.state.drag[i]);
            fd.append("post_media_text", this.state.drag[i].photoText)

            
          }
        } else {
          for (let i = 0; i < this.state.selected_imagefile.length; i++) {
            fd.append("post_media", this.state.selected_imagefile[i]);
            fd.append("post_media_text", this.state.selected_imagefile[i].photoText)

          }
        }

        fd.append("email_or_number", googleloginresponse.data.ValidEmail);

        let review_status = await axios.post(
          "https://www.propviewz.com/be/post_picture/",
          fd,
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
          this.props.showpicturestatus();
        } else {
          alert("Error submitting review. Try again");
        }
      } else {
        const fd = new FormData();

        fd.append(
          "project_id",
          this.state.search_id
            ? this.state.search_id
            : this.props.project_id
            ? this.props.project_id.project_id
            : ""
        );
        fd.append(
          "project_name",
          this.state.search_name
            ? this.state.search_name
            : this.props.project_details
            ? this.props.project_details.project_name
            : "Sun Residency"
        );

        if (this.state.drag.length) {
          for (let i = 0; i < this.state.drag.length; i++) {
            fd.append("post_media", this.state.drag[i]);
            fd.append("post_media_text", this.state.drag[i].photoText)

          }
        } else {
          for (let i = 0; i < this.state.selected_imagefile.length; i++) {
            fd.append("post_media", this.state.selected_imagefile[i]);
            fd.append("post_media_text", this.state.selected_imagefile[i].photoText)

          }
        }

        fd.append("email_or_number", googleloginresponse.data.ValidEmail);

        let review_status = await axios.post(
          "https://www.propviewz.com/be/post_picture/",
          fd,
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
          this.props.showpicturestatus();
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

  socialloginerrorcheck = async (event) => {
    event.preventDefault();
    console.log("facebook function");
    if (this.state.search_name == "" || this.state.search_id == "") {
      this.setState({ socialloginerror: true });
      // this.emailphoneInput.current.focus();
    } else if (this.state.selected_imagefile == "" && this.state.drag == "") {
      this.setState({ socialloginerror: true });
    }
  };

  socialloginwait = async (event) => {
    event.preventDefault();

    this.setState({ waitstatus: true });
  };

  onImgRemove = (index, type = null) => {
    console.clear();
    console.log(index);
    console.log(type);
    console.log(this.state.selected_imagefile);

    this.setState({photoText: ""})

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



    console.log("ALL POSTPIC STATE");
    console.log(this.state);
    console.log(this.props);
    console.log(this.state.submitted);

    let filename = [];
    let allimagesnames = [];

   
    console.log("render images", this.state.selected_imagefile);
    console.log("drag => ", this.state.drag);


    if (this.state.selected_imagefile.length) {
      // for (let i = 0 ; i < this.state.selected_imagefile.length ; i++) {
      //   filename.push(this.state.selected_imagefile[i].name);}
      //   console.log("SEEEEEEEEE")
      //   console.log(filename)

   // alpesh

      let allimages = Object.values(this.state.selected_imagefile);
      allimagesnames = allimages.map((image, index) => {

        let filename = image.name.split(".");
        let finalname = "";
        let fileextension = filename[1];
        console.log('iiiiiiiiiiiiiiiialpesh => ', image.photoId )
        if (image.name.indexOf(".") > 15) {
          finalname = filename[0].substring(0, 15);
          return (
            <div className="selected-img">
            <li>
              {/* {finalname}{"... ."}{fileextension} */}
              <div className = 'postimg-container'>
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
              {/* {image.name} */}
              <div className = 'postimg-container'>
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
      // for (let i = 0 ; i < this.state.drag.length ; i++) {
      //   filename.push(this.state.drag[i].name);}
      //   console.log("SEEEEEEEEE drag")
      //   console.log(filename)
      let allimages = Object.values(this.state.drag);
      allimagesnames = allimages.map((image, index) => {

        console.log('allllllllllllllllllllllllllllllllllllllllllllllllllllllllll =>', image)
        let filename = image.name.split(".");
        let finalname = "";
        let fileextension = filename[1];
        if (image.name.indexOf(".") > 15) {
          finalname = filename[0].substring(0, 15);
          return (
            <div className="selected-img">
            <li>
              {/* {finalname}{"... ."}{fileextension} */}
              <div className = 'postimg-container'>
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
              {/* {image.name} */}
              <div className = 'postimg-container'>
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

    



    return (
      <Modal
        show={this.state.showComponent1}
        className="containerreview div2"
        style={this.props.loggedinuseremail ? { height: "100vh" } : null}
      >
        <div className="cover" id="topele">
          {/* <img className="closebtn1" src={closeIcon} onClick={this.props.onClose}/> */}
          {/* <div className="containerreview div2"> */}
          {/* <img
              className="closebtn1"
              src={closeIcon}
              onClick={this.props.onClose}
            /> */}

          <div className="popup-header">
            <img
              className="closebtn1"
              src={closeIcon}
              onClick={this.props.isLocationDetailPage ? this.props.onCloseb : this.props.onClose}
            />
          </div>

          <div className="popup-title">
            <h3>
              POST<span>A</span>PICTURE
            </h3>
          </div>

          {/* <p className="po">POST</p>
            <p className="api">A</p>
            <p className="pic"></p>
            <hr className="hr1"></hr>
            <hr className="hr2"></hr> */}
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
              Please Enter Email/Phone.
            </div>
          )}

          {this.state.shownotifproject && (
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
              Please Select a Project.
            </div>
          )}

          {this.state.socialloginerror && (
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
              Please fill all the fields.
            </div>
          )}

          {this.state.shownotifpicture && (
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
              Please Select an Image to Upload.
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

          {this.state.waitstatus && (
            <div
              class="alert alert-danger alert-dismissible"
              style={{
                position: "absolute",
                zIndex: "99",
                width: "100%",
                marginTop: "99%",
                padding: "10px",
              }}
            >
              <p class="close" data-dismiss="alert"></p>
              Uploading Photo. Please Wait...
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

          <form onSubmit={this.handleSubmit}>


           {
             this.props.isLocationDetailPage ? <div className='location_name'> <p className="pText1_det">Location</p>
         
             <input type="text" className="pField_det_post" id="name" name="name" required value={this.props.locationalllinksdetails} disabled/></div> :

             <div class="form-group">
             <div className="searchdiv hello">
               <label>Project</label>
               {!this.state.name1 && (
                 <ProjectSearch
                   downshiftOnChange={this.downshiftOnChange.bind(this)}
                 />
               )}
               {this.state.name1 && (
                 <input
                   type="text"
                   className="txtbox"
                   id="name1"
                   name="name1"
                   required
                   onChange={this.myChangeHandler}
                   value={this.state.name1}
                 />
               )}
             </div>
             {/* {this.state.selected_imagefile.length > 0 ||
             this.state.drag.length > 0 ? (
               <input
                 type="text"
                 value={this.state.img_alias}
                 className="img_name"
                 placeholder="Image Name"
                 onChange={(e) => {
                   this.setState({ img_alias: e.target.value });
                 }}
               />
             ) : null} */}
           </div>
           }


            {/* <p className="share1"></p> */}

            <div class="form-group ">
              <label>Share Photos</label>
              <div className="show-mobile">
                <div className="show-photo">
                  <input
                    type="file"
                    accept=".jpg, .png"
                    id="file_post"
                    name="file_post"
                    multiple
                    onChange={this.myChangeHandlerArray}
                    value={this.state.file_post}
                  />
                  <label for="file_post" className="take_post">
                    Take Photo{" "}
                  </label>
                </div>
                {/* myChangeHandlerArray */}
                {/* (event) => this.sizeChanger(event)*/}
                <div class="choose-file">
                  <div className="mobile-file">
                    <input
                      type="file"
                      accept=".jpg, .png"
                      id="file_post"
                      name="file_post"
                      multiple
                      onChange={this.myChangeHandlerArray}
                      value={this.state.file_post}
                    />
                    <label for="file_post" className="file_post">
                      Select Image{" "}
                    </label>
                  </div>
                  {this.props.children}
                  {!this.state.selected_imagefile.length &&
                    !this.state.drag.length && (
                      <div id="dragbox1" className={this.state.className}>
                        <p className="dragn">Drag & Drop</p>
                        <p className="orr">OR</p>
                      </div>
                    )}
                  {this.state.selected_imagefile.length > 0 &&
                    !this.state.drag.length > 0 && (
                      <div id="dragbox1" className={this.state.className}>
                        <ul
                          style={{
                            lineHeight: "1",
                            overflowWrap: "break-word",
                            flexWrap: "wrap !important",
                          }}
                        >
                          {/* <li className="dragn"></li> */}
                          {allimagesnames}
                        </ul>
                        {/* <div style={{ cursor: 'pointer', color: 'black', textDecoration: 'underline', marginTop: '34%', position: 'absolute' }} onClick={this.clear.bind(this)}>Remove</div> */}
                      </div>
                    )}
                  {this.state.drag.length > 0 && (
                    <div id="dragbox1" className={this.state.className}>
                      <ul
                        style={{
                          lineHeight: "1",
                          overflowWrap: "break-word",
                          flexWrap: "wrap !important",
                        }}
                      >
                        {/* <li className="dragn"></li> */}
                        {allimagesnames}
                      </ul>
                      {/* <div style={{ cursor: 'pointer', color: 'black', textDecoration: 'underline', marginTop: '34%', position: 'absolute' }} onClick={this.clear.bind(this)}>Remove</div> */}
                    </div>
                  )}
                  
                </div>
                
              </div>
{/* my code from here */}

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

{/* my code over  here */}



            </div>
            {this.props.loggedinuseremail ? null : (
              <div>
                <p className="sign1">SIGN UP</p>
                {/* <hr className="hr_1"></hr>
                  <hr className="hr_2"></hr> */}
                {/* <img src={Facebook} className="facebook"/> */}
                <div class="social-media">
                  {this.state.search_name == "" ||
                  this.state.search_id == "" ? (
                    <img
                      src={Facebook}
                      className="facebook"
                      onClick={this.socialloginerrorcheck.bind(this)}
                    />
                  ) : this.state.selected_imagefile == "" &&
                    this.state.drag == "" ? (
                    <img
                      src={Facebook}
                      className="facebook"
                      onClick={this.socialloginerrorcheck.bind(this)}
                    />
                  ) : (
                    <div
                      className="facebook"
                      onClick={this.socialloginwait.bind(this)}
                    >
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
                  )}

                  {/* <img src={Google} className="goog"/> */}

                  {this.state.search_name == "" ||
                  this.state.search_id == "" ? (
                    <img
                      src={Google}
                      className="goog"
                      style={{ left: "46%" }}
                      onClick={this.socialloginerrorcheck.bind(this)}
                    />
                  ) : this.state.selected_imagefile == "" &&
                    this.state.drag == "" ? (
                    <img
                      src={Google}
                      className="goog"
                      style={{ left: "46%" }}
                      onClick={this.socialloginerrorcheck.bind(this)}
                    />
                  ) : (
                    <div
                      className="goog"
                      style={{ left: "43% !important" }}
                      onClick={this.socialloginwait.bind(this)}
                    >
                      <GoogleLogin
                        clientId="776070248769-b4houskf848vu8t013f0pajvtf402hu4.apps.googleusercontent.com" //TO BE CREATED
                        render={(renderProps) => (
                          <div>
                            <img
                              src={Google}
                              alt="google logo"
                              className="goog"
                              style={{
                                marginTop: "0px",
                                left: "43% !important",
                              }}
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                            />
                          </div>
                        )}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                      />
                    </div>
                  )}
                  <img src={Linkedin} className="linkedin1" />
                </div>
                <p className="signor">OR</p>
                {/* <hr className="hr_3"></hr>
                  <hr className="hr_4"></hr> */}

                {!this.state.showpasswordfield && !this.state.showotpfield && (
                  <label className="emText">Email Id / Mobile No. </label>
                )}

                {!this.state.showpasswordfield &&
                  !this.state.showotpfield &&
                  !this.state.showemailnamefield && (
                    <input
                      type="text"
                      ref={this.emailphoneInput}
                      className="emailField"
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
                      className="cont1"
                      onClick={this.handleSubmit1.bind(this)}
                    >
                      Continue
                    </button>
                  )}

                {this.state.showpasswordfield && (
                  <p className="emText">Password</p>
                )}

                {this.state.showpasswordfield && (
                  <input
                    type="password"
                    ref={this.passwordInput}
                    className="emailField"
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
                    className="cont1"
                    onClick={this.loginsubmit1.bind(this)}
                  >
                    Login
                  </button>
                )}

                {this.state.showemailnamefield && (
                  <input
                    type="text"
                    ref={this.emailphoneInput}
                    className="emailField"
                    id="email_phone"
                    placeholder="Enter your Email ID or mobile no."
                    name="email_phone"
                    disabled
                    onChange={this.myChangeHandler}
                    value={this.state.email_phone}
                  />
                )}

                {this.state.showemailnamefield && (
                  <p className="emIdName1">Name</p>
                )}

                {this.state.showemailnamefield && (
                  <input
                    type="text"
                    ref={this.UsernameInput}
                    className="emailFieldName1"
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
                    className="contnamesubmit1"
                    onClick={this.emailreg.bind(this)}
                    style={{
                      pointerEvents: this.state.waitstatus ? "none" : "unset",
                    }}
                  >
                    {this.state.waitstatus ? "Uploading..." : "Submit Review"}
                  </button>
                )}

                {this.state.showotpfield && !this.state.showphonenamefield && (
                  <p className="emText">OTP</p>
                )}

                {this.state.showotpfield && !this.state.showphonenamefield && (
                  <input
                    type="text"
                    ref={this.otpInput}
                    className="emailField"
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
                    className="cont1"
                    onClick={this.otpverify.bind(this)}
                  >
                    Verify OTP
                  </button>
                )}

                {this.state.showphonenamefield && (
                  <p className="emText">Name</p>
                )}

                {this.state.showphonenamefield && (
                  <input
                    type="text"
                    ref={this.phonenameInput}
                    className="emailField"
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
                    className="contnamesubmit1"
                    onClick={this.phonereg.bind(this)}
                    style={{
                      pointerEvents: this.state.waitstatus ? "none" : "unset",
                    }}
                  >
                    {this.state.waitstatus ? "Uploading..." : "Submit Review"}
                  </button>
                )}

                <p className="alr">Already a member of Propviewz?</p>
                <p
                  className="login1"
                  onClick={this.openlogin.bind(this)}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </p>
              </div>
            )}

            {this.props.loggedinuseremail && (
              <button
                className="sub1"
                style={{
                  pointerEvents: this.state.waitstatus ? "none" : "unset",
                }}
              >
                {this.state.waitstatus ? "Uploading..." : "Submit"}
              </button>
            )}
          </form>

          {/* </div> */}
          {/* <div className="mobdiv2">
                <p className="po">POST</p>
                <p className="api">A</p>
                <p className="pic">PICTURE</p>
                <hr className="hr1"></hr>
                <hr className="hr2"></hr>
                <p className="pText1">Project</p>
                <form onSubmit={this.handleSubmit}>
                {!this.props.project_details &&
                <ProjectSearch downshiftOnChange = {this.downshiftOnChange.bind(this)}/>
                // <input type="text" className="pField1"  id="name1" name="name1" required onChange={this.myChangeHandler} value={this.state.name1}/>
                }
                {this.props.project_details &&
                <input type="text" className="pField1"  id="name1" name="name1" required onChange={this.myChangeHandler} value={this.props.project_details.project_name} disabled/>
                }
                <p className="share1">Share Photos</p>
                 

                <input type="file"  id="file_post" name="file_post" multiple onChange={this.myChangeHandlerArray} value={this.state.file_post}/>  
               <label  for="file_post" className="file_post">Select Image </label>
               {this.props.children}
        <div id="dragbox1" className={this.state.className}>
          <p className="dragn">Drag & Drop</p>
          <p className="orr">OR</p>
        </div>

             <p className="sign1">SIGN UP</p>
             <hr className="hr_1"></hr>
             <hr className="hr_2"></hr>
             <img src={Facebook} className="facebook"/>
             <img src={Google} className="goog"/>
             <img src={Linkedin} className="linkedin1"/>
             <p className="signor">OR</p>
             <hr className="hr_3"></hr>
             <hr className="hr_4"></hr>
             <p className="emText">Email Id / Mobile No. </p>
             <input type="text" className="emailField" placeholder="Enter your Email ID or mobile no." id="email1"  name="email1" required onChange={this.myChangeHandler} value={this.state.email1}/>
             <button className="cont1">Continue</button>
             <p className="alr">Already a member of Propviewz?</p>
             <a className="login1" href="#">Login</a>
             <button className="sub1">Submit</button>
             </form>
            </div> */}
        </div>
        {this.state.showlogin && (
          <Login
            onClose={this.props.onClose}
            close={this.closelogin.bind(this)}
            formdata1={this.state.formdata ? this.state.formdata : "nodata"}
            loginsuccess={this.props.loginsuccess}
            showpicturestatus={this.props.showpicturestatus}
          />
        )}
      </Modal>
    );
  }
}
export default postApicture;
