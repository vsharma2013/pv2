import React, { Component, useState } from "react";
import "./LocationPostAPic.css";
import ProjectSearch from '../ProjectSearch/projectsearch';
import Facebook from '../../assets/icons/fb1.png';
import Google from '../../assets/icons/google.png';
import Linkedin from '../../assets/icons/linkedin.png';
import axios from 'axios'
import closeIcon from '../../assets/icons/close.png';
import {Button,Modal}  from 'react-bootstrap';
import Login from '../../components/Login/login';
import { v4 as uuid } from "uuid";

import imageCompression from 'browser-image-compression';
class LocationPostAPic extends Component{

    constructor(props) {
        super(props);


        this.state = {
       
             name1:"",
             drag:[],
             selected_imagefile:[],
             photoText: "",
             email1:"",
            className: 'drop-zone-show1_det',
            submitted:false,
            projectmedia:"",
            locationdetails:"",
            reviewdetails:"",
            projectinfo:"",
            projecttransaction:"",
            suggestedproject:"",
            projectamenities:"",
            developerinfo:"",
            menu1:"red",
            menu2:"",
            menu3:"",
            sort:false,
            itemsToShow: 3,
            expanded: false,
            activeTab: 0,
            menutext1:"white",
            menutext2:"black",
            menutext3:"black",
          
            // loggedinuseremail:'',
        formdata:"",
            showPostPicture: true,




            passworderror:false,
            reviewsubmiterror:false,
            otperror:false,
            waitstatus:false,


            showpasswordfield:false,
            showemailnamefield:false,
            showotpfield:false,
            showphonenamefield:false,

            shownotifemail_phone:false,
            shownotifproject:false,
            shownotifpicture:false,
            shownotifpassword:false,
            shownotifotp:false,
            shownotifemailname:false,
            shownotifphonename:false,
  
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

          // this.onCloseb = this.onCloseb.bind(this);

    }
    downshiftOnChange(selectedProject) {
      console.log("!!!!!!")
      console.log(selectedProject)
    // alert(`your favourite project is ${selectedProject.project_id}`);
    // href={'/projects/'+project_id1}
    // if(selectedProject.project_id){
      console.log("!!!!ddddd!!")
      console.log(selectedProject)
      let id=selectedProject.project_id;
      this.setState({search_id: selectedProject.project_id,search_name:selectedProject.project_name})
    // window.location.href='/projects/'+id;
    // }
    // else{
    //   console.log("LOCATION PAGE")
    //   let id=selectedProject.Location;
    //   window.location.href='/Location/'+id;
    // }
    
  }
    componentDidMount() {
        window.addEventListener('mouseup', this._onDragLeave);
        window.addEventListener('dragenter', this._onDragEnter);
        window.addEventListener('dragover', this._onDragOver);
        // document.getElementById('dragbox_post').addEventListener('dragleave', this._onDragLeave);
        window.addEventListener('drop', this._onDrop);
        this.setState({
            loggedin:localStorage.getItem("loggedin"),
            loggedinuseremail:localStorage.getItem("loggedInUseremail"),
            loggedinusername:localStorage.getItem("loggedInUsername")})
      }
      
      componentWillUnmount() {
        window.removeEventListener('mouseup', this._onDragLeave);
        window.removeEventListener('dragenter', this._onDragEnter);
        window.addEventListener('dragover', this._onDragOver);
        // document.getElementById('dragbox_post').removeEventListener('dragleave', this._onDragLeave);
        window.removeEventListener('drop', this._onDrop);
      }
      
      _onDragEnter(e) {
        this.setState({ className: 'drop-zone-show1_det' });
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
        this.setState({className: 'drop-zone-show1_det'});
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
      
     async _onDrop(e) {
        e.preventDefault();
        let files = [...e.dataTransfer.files];
        console.log('Files dropped: ', files);
        // Upload files
        // if(files[0].size>1999999)
        // {
        //   alert("Image size too large, please upload images below 2MB")
        //   files=[];
        // }



        for (let i = 0; i < files.length; i++) {

           


          if(files[i].size > 1999999) {
    
    
            console.log(files[i].size)
            let compFile = {}
            files[i] = await this.imageCompressor(files[i])
            console.log(files)
    
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
          this.setState({ className: 'drop-zone-show1_det', drag: Object.values(files) });
        }


    
    
        console.clear()
        console.log(files)
        
        this.closenotif();
        console.log('drag => ', this.state.drag)
        return false;

      }

      myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
      
      myChangeHandlerArray = async (event) => {
        let selected_imagefile = event.target.name;
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
  
             
  
  
              if(randomarray2[i].size > 1999999) {
  
  
                console.log(randomarray2[i].size)
                let compFile = {}
                randomarray2[i] = await this.imageCompressor(randomarray2[i])
                console.log(randomarray2)
  
              }
              
            }
            randomarray2.map(img => {
              let iid = uuid()
              img.photoId = iid 
              img.photoText = this.state.photoText
              console.log('singeliiiiiimmmmmgg=> ', img)
            })   
  
  
        }

        if(this.state.selected_imagefile.length > 0){
          for(let i = 0; i < randomarray2.length; i++){
  
            this.state.selected_imagefile.push(randomarray2[i])
  
          }
  
  
        } else {
          this.setState({ selected_imagefile: Object.values(randomarray2) });
        }


        
        console.log('selected_imagefile => ', selected_imagefile)
      } catch (error) {
        console.error(error)
      }


      this.closenotif();
      }

      imageCompressor = async (file) => {

        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
    
        console.log('in compressor')
        
          const compressedFile = await imageCompression(file, options);
    
          console.log(file)
          console.log(compressedFile.size)
    
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); 
    
          console.log(compressedFile)
    
          return(compressedFile)
    
    
      }
      // onCloseb(){
      //   this.setState({
          
      //     showPostPicture:false
      //   });
      // }

      handleSubmit(event) {
        event.preventDefault();
        const fd= new FormData();
        // fd.append('image[0]',this.state.drag, this.state.drag.name)
          fd.append("location_id",this.state.search_id?this.state.search_id:this.props.location_id?this.props.location_id:"2");
          // project_name:this.state.name,
          fd.append("location_name",this.state.search_name?this.state.search_name:this.props.locationalllinksdetails?this.props.locationalllinksdetails:"Sun Residency");
          if(this.state.drag.length){
          for (let i = 0 ; i < this.state.drag.length ; i++) {

            fd.append("post_media", this.state.drag[i]);
            fd.append("post_media_text", this.state.drag[i].photoText)

          }
          }
          else {
          for (let i = 0 ; i < this.state.selected_imagefile.length ; i++) {
            fd.append("post_media", this.state.selected_imagefile[i]);
            fd.append("post_media_text", this.state.selected_imagefile[i].photoText)

          }
          }
          //enable below line to take email id value
          // fd.append("email_or_number",this.state.email1);
          fd.append("email_or_number",this.props.loggedinuseremail?this.props.loggedinuseremail:"mathew@comportement.in");
      
      console.log('MATHEW POst pic')
      console.log(fd)
        axios.post(
          'https://www.propviewz.com/be/post_location_pictures/post_user_location_picture/'
          ,fd,
          { 
         headers: { 
          'Content-Type': 'multipart/form-data' 
        }
      }       
         );
         console.log("i got called");
         alert("Images have been submitted");
         console.log(this.state)
         console.log(this.state.experience)
         
         this.setState({
          name1: '',
          drag:[],
          selected_imagefile:[],
          email1:'',
          submitted:true
        });
      }



      closenotif(){
        this.setState({
          shownotifemail_phone:false,shownotifproject:false,shownotifpicture:false,shownotifpassword:false, passworderror:false,reviewsubmiterror:false,shownotifemailname:false,otperror:false,shownotifphonename:false,shownotifotp:false,
        })
      } 


      handleSubmit1= async (event) => {
        event.preventDefault();
        console.log("first function");
        if(this.state.search_name == "" || this.state.search_id == "" )
      {
        
        this.setState({shownotifproject:true});
        // this.emailphoneInput.current.focus();
      }
      
      else if(this.state.selected_imagefile == '' && this.state.drag == '' )
      {
       
        this.setState({shownotifpicture:true});
      }
      else if(this.state.email_phone == '')
      {
       
        this.emailphoneInput.current.focus();
        this.setState({shownotifemail_phone:true});
      }
      else
      {
        let loginresponse = await axios.post('https://www.propviewz.com/be/login/login_with_review/', {     
        id:this.state.email_phone,
        });
        console.log("review loginresponse",loginresponse )

        if (loginresponse.data.Response === "Success"){

          if (isNaN(this.state.email_phone)) {
            this.setState({showpasswordfield:true});
            
            
          }
          else{
            this.setState({showpasswordfield:true});
          } 
         }
         else {
             
          if (isNaN(this.state.email_phone)) {
            this.setState({showemailnamefield:true});
            
          }
          else{
            this.setState({showotpfield:true})
              
          } 
  
         }
      }
      



      }


      loginsubmit1= async (event) => {

        if(this.state.password == '')
        {
          // alert("Enter Password Please");
          this.passwordInput.current.focus();
          this.setState({shownotifpassword:true});
        }
        
        else {
            console.log("login submit");
            let loginresponse = await axios.post('https://www.propviewz.com/be/login/email_login', {     
            id:this.state.email_phone,
            pass:this.state.password
         });
         console.log("FINAL LOGIN RESPONSE",loginresponse);
         
          if(loginresponse.data.Response === "Success"){
            console.log("login success")
            this.setState({waitstatus:true});
            const fd= new FormData();
       
            fd.append("project_id",this.state.search_id?this.state.search_id:this.props.project_id?this.props.project_id.project_id:"");
            fd.append("project_name",this.state.search_name?this.state.search_name:this.props.project_details?this.props.project_details.project_name:"Sun Residency");
            
            if(this.state.drag.length){
              for (let i = 0 ; i < this.state.drag.length ; i++) {
                fd.append("post_media", this.state.drag[i]);
                fd.append("post_media_text", this.state.drag[i].photoText)

              }
            }
            else {
              for (let i = 0 ; i < this.state.selected_imagefile.length ; i++) {
                fd.append("post_media", this.state.selected_imagefile[i]);
                fd.append("post_media_text", this.state.selected_imagefile[i].photoText)
              }
            }
          
            fd.append("email_or_number",loginresponse.data.ValidEmail);
            
            let postpictureresponse = await axios.post(
              'https://www.propviewz.com/be/post_picture/',
              fd,{ 
              headers: { 
                'Content-Type': 'multipart/form-data' 
                      }
              }       
            );
            console.log("post pircture response1",postpictureresponse);
            // if(postpictureresponse.data.Status === "Success"){
              localStorage.setItem("loggedin", true);
              localStorage.setItem("loggedInUsername",loginresponse.data.Name); 
              localStorage.setItem("loggedInUseremail",loginresponse.data.ValidEmail);
              this.props.loginsuccess(true,loginresponse.data.ValidEmail,loginresponse.data.Name);
              this.props.onClose();
              this.props.showpicturestatus();

            // }
            // else{
             
            //   this.setState({reviewsubmiterror:true})
            // }

          }
          else{
          
            this.passwordInput.current.focus();
            this.setState({passworderror:true});
          }
      }
    
      }


      emailreg= async (event) => {
        if(this.state.username == '')
        {
          // alert("Enter Name Please");
          this.UsernameInput.current.focus();
          this.setState({shownotifemailname:true})
        }
        else{
          console.log("Link Sending and submit review method");
          
          this.setState({waitstatus:true});
          const fd= new FormData();
     
          fd.append("project_id",this.state.search_id?this.state.search_id:this.props.project_id?this.props.project_id.project_id:"");
          fd.append("project_name",this.state.search_name?this.state.search_name:this.props.project_details?this.props.project_details.project_name:"Sun Residency");
          
          if(this.state.drag.length){
            for (let i = 0 ; i < this.state.drag.length ; i++) {
              fd.append("post_media", this.state.drag[i]);
              fd.append("post_media_text", this.state.drag[i].photoText)

            }
          }
          else {
            for (let i = 0 ; i < this.state.selected_imagefile.length ; i++) {
              fd.append("post_media", this.state.selected_imagefile[i]);
              fd.append("post_media_text", this.state.selected_imagefile[i].photoText)

            }
          }
        
          fd.append("email_or_number",this.state.email_phone);

          fd.append("reviewer_name",this.state.username);
          
          let postpictureresponse = await axios.post(
            'https://www.propviewz.com/be/post_picture/post_picture_without_login/'
            ,fd,{ 
            headers: { 
              'Content-Type': 'multipart/form-data' 
                    }
            }       
          );
          console.log("post picture email final response",postpictureresponse);
          if(postpictureresponse.data.Status === "Success"){
   
            this.props.onClose();
            this.props.showpicturestatus();
          
            }
          }
    
        }


        otpverify= async (event) => {

          if(this.state.otp == '')
          {
            // alert("Enter OTP Please");
            this.otpInput.current.focus();
            this.setState({shownotifotp:true});
          }
          else
          {
            console.log("otp verify function");
            let otpverifyresponse = await axios.post('https://www.propviewz.com/be/login/phone_login', {     
              phoneNum:this.state.email_phone,
              otp:this.state.otp
             });
             console.log("otp match RESPONSE",otpverifyresponse);
             
             if (otpverifyresponse.data.Response === "Success"){
                this.setState({showphonenamefield:true})
             }
             else{
              //  alert("Wrong OTP entered. Try Again");
              this.setState({otperror:true});
             }
    
          }
        }


        phonereg= async (event) => {
          if(this.state.phonename == '')
          {
            // alert("Enter Name Please");
            this.phonenameInput.current.focus();
            this.setState({shownotifphonename:true});
          }
          else
          {
            console.log("new phone review method");
    
            this.setState({waitstatus:true});
            const fd= new FormData();
       
            fd.append("project_id",this.state.search_id?this.state.search_id:this.props.project_id?this.props.project_id.project_id:"");
            fd.append("project_name",this.state.search_name?this.state.search_name:this.props.project_details?this.props.project_details.project_name:"Sun Residency");
            
            if(this.state.drag.length){
              for (let i = 0 ; i < this.state.drag.length ; i++) {
                fd.append("post_media", this.state.drag[i]);
                fd.append("post_media_text", this.state.drag[i].photoText)

              }
            }
            else {
              for (let i = 0 ; i < this.state.selected_imagefile.length ; i++) {
                fd.append("post_media", this.state.selected_imagefile[i]);
                fd.append("post_media_text", this.state.selected_imagefile[i].photoText)

              }
            }
          
            fd.append("email_or_number",this.state.email_phone);
  
            fd.append("reviewer_name",this.state.phonename);
            
            let postpictureresponse = await axios.post(
              'https://www.propviewz.com/be/post_picture/post_picture_without_login/'
              ,fd,{ 
              headers: { 
                'Content-Type': 'multipart/form-data' 
                      }
              }       
            );
            console.log("post picture phone final response",postpictureresponse);
            if(postpictureresponse.data.Status === "Success"){
     
              this.props.onClose();
              this.props.showpicturestatus();
            
            }
    
    
          }
        }
        
        openlogin(){
          if(this.state.search_name == "" || this.state.search_id == "" )
          {
            
            this.setState({shownotifproject:true});
            // this.emailphoneInput.current.focus();
          }
          
          else if(this.state.selected_imagefile == '' && this.state.drag == '' )
          {
           
            this.setState({shownotifpicture:true});
          }
          // else if(this.state.email_phone == '')
          // {
           
          //   this.emailphoneInput.current.focus();
          //   this.setState({shownotifemail_phone:true});
          // }
          else
          {

              const fd= new FormData();
        
              fd.append("project_id",this.state.search_id?this.state.search_id:this.props.project_id?this.props.project_id.project_id:"");
              fd.append("project_name",this.state.search_name?this.state.search_name:this.props.project_details?this.props.project_details.project_name:"Sun Residency");
              
              if(this.state.drag.length){
                for (let i = 0 ; i < this.state.drag.length ; i++) {
                  fd.append("post_media", this.state.drag[i]);
                  fd.append("post_media_text", this.state.drag[i].photoText)

                }
              }
              else {
                for (let i = 0 ; i < this.state.selected_imagefile.length ; i++) {
                  fd.append("post_media", this.state.selected_imagefile[i]);
                  fd.append("post_media_text", this.state.selected_imagefile[i].photoText)

                }
              }
            
              // fd.append("email_or_number",loginresponse.data.ValidEmail);

              
              localStorage.setItem("formdataavailable1", true);
              this.setState({formdata: fd,showlogin:true})
          }
         }
         
         
         
         
         closelogin(){
          this.setState({showlogin:false})
        }


        onImgRemove = (index, type = null) => {
          console.clear();
          console.log(index);
          console.log(type)
          this.setState({photoText: ""})
          console.log(this.state.selected_imagefile);
          let files = type === "drag" ? this.state.drag : this.state.selected_imagefile;
          let removeFile = type === "drag" ? this.state.drag[index] : this.state.selected_imagefile[index];
          console.log("files", files, "removeFile", removeFile);
          files = Object.values(files).filter(img => {
            if (img.name) {
              return img.name !== removeFile.name
            }
          })
          type === "drag" ? this.setState({ drag: files }) : this.setState({ selected_imagefile: files });
        }

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


    render(){
        console.log("LOCATION POSTPIC STATE")
        console.log(this.state)
        console.log(this.props)
        console.log(this.state.submitted)

       
   

        // let filename=[]
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



        let allimagesnames1 = [];
        console.log("render images", this.state.selected_imagefile)
    
        if (this.state.selected_imagefile.length) {

          let allimages = Object.values(this.state.selected_imagefile);
          allimagesnames1 = (
            allimages.map((image, index) => {
    
              let filename = image.name.split(".");
              let finalname = '';
              let fileextension = filename[1];
              if (image.name.indexOf('.') > 15) {
                finalname = filename[0].substring(0, 15);
                return (
                  <div className="selected-img">
                  <li>
                    {/* {finalname}{"... ."}{fileextension} */}
                    <div className='postimg-container'>
                    <img src={URL.createObjectURL(image)} style={{ height: "100px", width: "100px" }} />
                    <div className="remove-btn" onClick={() => this.onImgRemove(index)}>
                      <span> {(this.state.img_alias ? this.state.img_alias : "") + "_img" + (index + 1) + "." + fileextension}</span>
                    Remove
                    </div>
                    </div>
                  </li>
                  <div className='addimg-title'>
                  <input type="text" value={image.photoText} onChange={(e) => this.changeImageTitle(image, e)} placeholder="add title" />
              </div>
                  </div>
                )
              }
              else {
                // finalname = filename[0];
                return (
                  <div className="selected-img">

                <li>
                  {/* {image.name} */}
                  <div className='postimg-container'>
                  <img src={URL.createObjectURL(image)} style={{ height: "100px", width: "100px" }} />
                  <div className="remove-btn" onClick={() => this.onImgRemove(index)}>
                    <span> {(this.state.img_alias ? this.state.img_alias : "") + "_img" + (index + 1) + "." + fileextension}</span>
                  Remove</div>
                  </div>
                </li>
                <div className='addimg-title'>
                <input type="text" value={image.photoText} onChange={(e) => this.changeImageTitle(image, e)} placeholder="add title" />
                </div>
                </div>
    
                )
              }
              // console.log("filename",filename,finalname,fileextension)
    
    
            }
            )
          );
        }
        if (this.state.drag.length) {

          let allimages = Object.values(this.state.drag);
          allimagesnames1 = (
            allimages.map((image, index) => {
    
              let filename = image.name.split(".");
              let finalname = '';
              let fileextension = filename[1];
              if (image.name.indexOf('.') > 15) {
                finalname = filename[0].substring(0, 15);
                return (
                  <div className="selected-img">
                    <li>
                  {/* {finalname}{"... ."}{fileextension} */}
                  <div className='postimg-container'>
                  <img src={URL.createObjectURL(image)} style={{ height: "100px", width: "100px" }} />
                  <div className="remove-btn" onClick={() => this.onImgRemove(index, "drag")}>
                    <span> {(this.state.img_alias ? this.state.img_alias : "") + "_img" + (index + 1) + "." + fileextension}</span>
                  Remove</div>
                  </div>
                </li>
                <div className='addimg-title'>
                <input type="text" value={image.photoText} onChange={(e) => this.changeImageTitle(image, e)} placeholder="add title" />
                </div>
                </div>
                )
              }
              else {
                return (
                
                  <div className="selected-img">
                    <li>
                  {/* {image.name} */}
                  <div className='postimg-container'>
                  <img src={URL.createObjectURL(image)} style={{ height: "100px", width: "100px" }} />
                  <div className="remove-btn" onClick={() => this.onImgRemove(index, "drag")}>
                    <span> {(this.state.img_alias ? this.state.img_alias : "") + "_img" + (index + 1) + "." + fileextension}</span>Remove</div>
                    </div>
                </li>
                <div className='addimg-title'>
                <input type="text" value={image.photoText} onChange={(e) => this.changeImageTitle(image, e)} placeholder="add title" />
                </div>
                </div>
                )
              }
              // console.log("filename",filename,finalname,fileextension)
    
    
            }
            )
          );
        }





        return(
     

 <Modal show={this.state.showPostPicture} className="modal_review_post">
    <img className="closebtn_det_post" src={closeIcon} onClick={this.props.onCloseb}/>
   <div className="modal-content-post" id="topele">
           <p className="po_det">POST</p>
           <p className="api_det">A</p>
           <p className="pic_det">PICTURE</p>
           <hr className="hr1_det"></hr>
           <hr className="hr2_det"></hr>

           {this.state.shownotifemail_phone &&
                  <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',top:'69.5%',padding:'10px'}}>
                    <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif.bind(this)} style={{cursor:'pointer'}}>&times;</p>
                      Please Enter Email/Phone.
                    </div>}

                    {this.state.shownotifproject &&
                      <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',top:'2%',padding:'10px'}}>
                        <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif.bind(this)} style={{cursor:'pointer'}}>&times;</p>
                          Please Select a Project.
                        </div>
                      }

                    {this.state.shownotifpicture &&
                      <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',top:'2%',padding:'10px'}}>
                        <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif.bind(this)} style={{cursor:'pointer'}}>&times;</p>
                          Please Select an Image to Upload.
                        </div>
                      }

              {this.state.shownotifpassword &&
                      <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',top:'69.5%',padding:'10px'}}>
                        <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif.bind(this)} style={{cursor:'pointer'}}>&times;</p>
                          Please Enter Password.
                        </div>
                      }

                    {this.state.passworderror &&
                    <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',top:'69.5%',padding:'10px'}}>
                      <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif.bind(this)} style={{cursor:'pointer'}}>&times;</p>
                        Please Enter correct Password. 
                      </div>
                    }

                  {this.state.reviewsubmiterror &&
                  <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',top:'69.5%',padding:'10px'}}>
                    <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif.bind(this)} style={{cursor:'pointer'}}>&times;</p>
                      Error Occurrred. Try Again 
                    </div>
                  }

                  {this.state.waitstatus &&
                  <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',marginTop:'99%',padding:'10px'}}>
                    <p class="close" data-dismiss="alert" ></p>
                      Uploading Photo. Please Wait...  
                    </div>
                  }

                  {this.state.shownotifemailname &&
                  <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',top:'69.5%',padding:'10px'}}>
                    <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif.bind(this)} style={{cursor:'pointer'}}>&times;</p>
                      Please Enter Your Name.
                    </div>
                  }

                {this.state.otperror &&
                <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',top:'69.5%',padding:'10px'}}>
                  <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif.bind(this)} style={{cursor:'pointer'}}>&times;</p>
                    Please enter correct OTP
                  </div>
                }

                {this.state.shownotifphonename &&
                <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',top:'69.5%',padding:'10px'}}>
                  <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif.bind(this)} style={{cursor:'pointer'}}>&times;</p>
                    Please Enter Your Name.
                  </div>
                }

                {this.state.shownotifotp &&
                <div class="alert alert-danger alert-dismissible" style={{position:'absolute',zIndex:'99',width:'100%',top:'69.5%',padding:'10px'}}>
                  <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif.bind(this)} style={{cursor:'pointer'}}>&times;</p>
                    Please Enter OTP.
                  </div>
                }













           <form onSubmit={this.handleSubmit}>
           <p className="pText1_det">Location</p>
         
           <input type="text" className="pField_det_post" id="name" name="name" required value={this.props.locationalllinksdetails} disabled/>
            <div>{}</div>
           {/* <input type="text" className="pField1_det"  id="name1" name="name1" required disabled/> */}
           <p className="share1_det">Share Photos</p>
            

                <div className="testt1">



                  {this.props.children}

                  {!this.state.selected_imagefile.length && !this.state.drag.length &&
                    <div id="dragbox_post" className="drop-zone-show1_det">
                      <p className="dragn_det">Drag & Drop</p>
                      <p className="orr_det">OR</p>
                    </div>
                  }



                  {/* old id="dragbox_post" new id="dragbox" */}
                  {this.state.selected_imagefile.length > 0 && !this.state.drag.length > 0 &&
                    <div id="dragbox" className={this.state.className}>
                      <ul style={{ lineHeight: "1", overflowWrap: "break-word" }}>
                        {/* <li className="dragn_det">{filename}</li> */}
                        {allimagesnames1}
                      </ul>
                    </div>
                  }
                  {this.state.drag.length > 0 &&
                    <div id="dragbox" className={this.state.className}>
                      <ul style={{ lineHeight: "1", overflowWrap: "break-word" }}>
                        {/* <li className="dragn_det">{filename}</li> */}
                        {allimagesnames1}
                      </ul>
                    </div>
                  }


                  <div className="change">
                    <input type="file" accept="image/x-png,image/gif,image/jpeg" id="file_post" name="file_post" onChange={this.myChangeHandlerArray} value={this.state.file} multiple />
                    <label for="file_post" className="file_post_det">Select Image </label>



                    <input type="file" accept="image/x-png,image/gif,image/jpeg" id="file_post" name="file_post" multiple onChange={this.myChangeHandlerArray} value={this.state.file} />
                    <label for="file_post" className="take_post_det">Take Photo </label>
                  </div>
                  {/* my code from here */}

                  {this.state.selected_imagefile.length > 0 &&

                    <div id="dragbox123" className={this.state.className}>
                      <ul
                        style={{
                          lineHeight: "1",
                          overflowWrap: "break-word",
                          flexWrap: "wrap !important",
                        }}
                      >
                        {allimagesnames1}
                      </ul>
                    </div>
                  }

                  {/* my code over  here */}

                </div>
           
           {/* {this.state.selected_imagefile.length>0 && !this.state.drag.length>0 &&
           // <div id="dragbox1" className={this.state.className}>
             <ul>
           <li className="dragn_det">{filename}</li>
           </ul>
         // </div>
           } */}

{this.props.loggedinuseremail ? 
             
             <div> </div>:
             <div>




       <p className="sign1_det">SIGN UP</p>
        <hr className="hr_1_det"></hr>
        <hr className="hr_2_det"></hr>
        <img src={Facebook} className="facebook_det"/>
        <img src={Google} className="goog_det"/>
        <img src={Linkedin} className="linkedin1_det"/>
        <p className="signor_det">OR</p>
        <hr className="hr_3_det"></hr>
        <hr className="hr_4_det"></hr>


        { !this.state.showpasswordfield && !this.state.showotpfield && 
        <p className="emText_det">Email Id / Mobile No. </p>}

        { !this.state.showpasswordfield && !this.state.showotpfield && !this.state.showemailnamefield &&
        <input type="text" className="emailField_det" placeholder="Enter your Email ID or mobile no." id="email1"  name="email1" required onChange={this.myChangeHandler} value={this.state.email1} disabled/>
          }
        { !this.state.showpasswordfield && !this.state.showemailnamefield && !this.state.showotpfield &&
        <button className="cont1_det" onClick={this.handleSubmit1.bind(this)}>Continue</button>
        }


{ this.state.showpasswordfield && 
             <p className="emText">Password</p>}

             { this.state.showpasswordfield && 
             <input type="password" ref={this.passwordInput} className="emailField" id="password" placeholder="Enter your password." name="password" required onChange={this.myChangeHandler} value={this.state.password}/>}
             
             { this.state.showpasswordfield &&  
             <button type="button" className="cont1" onClick={this.loginsubmit1.bind(this)}>Login</button> }




            { this.state.showemailnamefield && 
            <input type="text" ref={this.emailphoneInput} className="emailField" id="email_phone" placeholder="Enter your Email ID or mobile no." name="email_phone" disabled onChange={this.myChangeHandler} value={this.state.email_phone}/>}
            
            { this.state.showemailnamefield &&
              <p className="emIdName1">Name</p>}
              
              { this.state.showemailnamefield &&
              <input type="text" ref={this.UsernameInput} className="emailFieldName1" id="username" placeholder="Ex - John Doe." name="username" required onChange={this.myChangeHandler} value={this.state.username}/>
              }
              { this.state.showemailnamefield &&
              <div className="grand-submit"><button type="button" className="contnamesubmit1" onClick={this.emailreg.bind(this)} style={{pointerEvents:this.state.waitstatus?'none':'unset'}}>{this.state.waitstatus?"Uploading...":"Submit Review"}</button> </div>
              }



            { this.state.showotpfield && !this.state.showphonenamefield &&
              <p className="emText">OTP</p>}
              
              { this.state.showotpfield && !this.state.showphonenamefield &&
              <input type="text" ref={this.otpInput} className="emailField" id="otp" placeholder="Enter the received otp." name="otp" required onChange={this.myChangeHandler} value={this.state.otp}/>
              }

            { this.state.showotpfield  && !this.state.showphonenamefield &&
              <button type="button" className="cont1" onClick={this.otpverify.bind(this)}>Verify OTP</button>}


            { this.state.showphonenamefield &&
            <p className="emText">Name</p>}
              
            { this.state.showphonenamefield &&
              <input type="text" ref={this.phonenameInput} className="emailField" id="phonename" placeholder="Enter - John Doe." name="phonename" required onChange={this.myChangeHandler} value={this.state.phonename}/>
            }

            { this.state.showphonenamefield &&
             <div className="grand-submit"> <button type="button" className="contnamesubmit1" onClick={this.phonereg.bind(this)} style={{pointerEvents:this.state.waitstatus?'none':'unset'}}>{this.state.waitstatus?"Uploading...":"Submit Review"}</button></div>}






        <p className="alr_det">Already a member of Propviewz?</p>
        <a className="login1_det"href="#" onClick={this.openlogin.bind(this)} style={{cursor:'pointer'}}>Login</a>


        </div>}

        {this.props.loggedinuseremail &&
       <div className="grand-submit"> <button className="sub1_det" style={{pointerEvents:this.state.waitstatus?'none':'unset'}}>{this.state.waitstatus?"Uploading...":"Submit"}</button></div>
        }

           </form>
         </div>
         {this.state.showlogin &&
              <Login onClose={this.props.onClose} close={this.closelogin.bind(this)} formdata4={this.state.formdata?this.state.formdata:"nodata"} loginsuccess={this.props.loginsuccess} showpicturestatus={this.props.showpicturestatus}/>
             }
 </Modal>

          
       
         );
    }
}
export default LocationPostAPic;