import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Registration from '../../components/Registration/registration';
import "./login.css";
import fb1 from '../../assets/icons/facebook.png';
import google from '../../assets/icons/google.png';
import lin from '../../assets/icons/linkedin.png';
import LogoIcon from '../../assets/icons/logo.png';
import SignUp from '../../components/SignUp/signup';
import axios from 'axios';
import closeIcon from '../../assets/icons/close.png';
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import LinkedIn from "linkedin-login-for-react";
import {Button,Modal}  from 'react-bootstrap';
// import { Router } from "react-router";
//import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom';   

  
class login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loginComponent:true,
      signupComponent:false,
      emailphone:"",
      password:"",
      temploginemail:"",
      shownotif:false,
      shownotif2:false,
      shownotif3:false,
      shownotif4:false,
      hidesignupbutton:false,
    }

    


    //this.signup = this.signup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.opennotif = this.opennotif.bind(this);
    this.opennotif2 = this.opennotif2.bind(this);
    this.opennotif3 = this.opennotif3.bind(this);
    this.opennotif4 = this.opennotif4.bind(this);
    this.closenotif = this.closenotif.bind(this);
  }


  componentDidMount(){
    const tempemail = localStorage.getItem("temploginemail")
    this.setState({temploginemail:tempemail,emailphone:tempemail})
    // if ("temploginemail" in localStorage) {
    //   delete localStorage["temploginemail"];

    // }
    if (this.state.temploginemail)
    console.log("got email", tempemail);

    const formdataavailable = localStorage.getItem("formdataavailable")
    if(formdataavailable == 'true')
    {
    this.setState({hidesignupbutton:true})
    }
    if ("formdataavailable" in localStorage) {
      delete localStorage["formdataavailable"];

    }
    
  }

  componentWillUnmount(){
    if ("temploginemail" in localStorage) {
      delete localStorage["temploginemail"];

    }
  }

  handleSubmit= async (event) => {
    event.preventDefault();
    let loginresponse = await axios.post('https://www.propviewz.com/be/login/email_login', {     
      id:this.state.emailphone,
      pass:this.state.password
     });
     console.log("LOGIN RESPONSE",loginresponse);
     
     if(loginresponse.data.Response === "Success")
    {

      if(this.props.formdata && this.props.formdata != "nodata")
      {
        console.log("if yeahhhhhhhhhh");
        
        let formdata = this.props.formdata;
          formdata.append("reviewer_email",loginresponse.data.ValidEmail);
          console.log("received form data");
          axios.post('https://www.propviewz.com/be/save_project_review/',formdata,{ 
                      headers: { 
                              'Content-Type': 'multipart/form-data' 
                              } 
                      });
          localStorage.setItem("loggedin", true);
          localStorage.setItem("loggedInUsername",loginresponse.data.Name); 
          localStorage.setItem("loggedInUseremail",loginresponse.data.ValidEmail);
          this.props.loginsuccess(true,loginresponse.data.ValidEmail,loginresponse.data.Name);
          this.props.close();
          this.props.onClose();
          if(this.props.reviewtype){
            this.props.showreviewstatus("review");
          }
          else{
            this.props.showreviewstatus("rating");
          }
      
      }

      else if(this.props.formdata1 && this.props.formdata1 != "nodata")
      {
        console.log("else if login success");
        
        let formdata1 = this.props.formdata1;
        formdata1.append("email_or_number",loginresponse.data.ValidEmail);
        console.log("received form data");
        axios.post('https://www.propviewz.com/be/post_picture/',formdata1,{ 
                    headers: { 
                            'Content-Type': 'multipart/form-data' 
                            } 
                    });
        localStorage.setItem("loggedin", true);
        localStorage.setItem("loggedInUsername",loginresponse.data.Name); 
        localStorage.setItem("loggedInUseremail",loginresponse.data.ValidEmail);
        this.props.loginsuccess(true,loginresponse.data.ValidEmail,loginresponse.data.Name);
        this.props.close();
        this.props.onClose();
        this.props.showpicturestatus();
      }

     else if(this.props.formdata3 && this.props.formdata3 != "nodata")
      {
        console.log("if yeahhhhhhhhhh");
        
        let formdata3 = this.props.formdata3;
          formdata3.append("reviewer_email",loginresponse.data.ValidEmail);
          console.log("received form data");
          axios.post('https://www.propviewz.com/be/save_location_review/',formdata3,{ 
                      headers: { 
                              'Content-Type': 'multipart/form-data' 
                              } 
                      });
          localStorage.setItem("loggedin", true);
          localStorage.setItem("loggedInUsername",loginresponse.data.Name); 
          localStorage.setItem("loggedInUseremail",loginresponse.data.ValidEmail);
          this.props.loginsuccess(true,loginresponse.data.ValidEmail,loginresponse.data.Name);
          this.props.close();
          this.props.onClose();
          if(this.props.reviewtype){
            this.props.showreviewstatus("review");
          }
          else{
            this.props.showreviewstatus("rating");
          }
          
      
      }

      else if(this.props.formdata4 && this.props.formdata4 != "nodata")
      {
        console.log("else if login success");
        
        let formdata4 = this.props.formdata4;
        formdata4.append("email_or_number",loginresponse.data.ValidEmail);
        console.log("received form data");
        axios.post('https://www.propviewz.com/be/post_picture/',formdata4,{ 
                    headers: { 
                            'Content-Type': 'multipart/form-data' 
                            } 
                    });
        localStorage.setItem("loggedin", true);
        localStorage.setItem("loggedInUsername",loginresponse.data.Name); 
        localStorage.setItem("loggedInUseremail",loginresponse.data.ValidEmail);
        this.props.loginsuccess(true,loginresponse.data.ValidEmail,loginresponse.data.Name);
        this.props.close();
        this.props.onClose();
        this.props.showpicturestatus();
      }

      else
      {
      console.log("else yeahhhhhhhhhh");
      localStorage.setItem("loggedin", true);
      localStorage.setItem("loggedInUsername",loginresponse.data.Name); 
      localStorage.setItem("loggedInUseremail",loginresponse.data.ValidEmail);
      this.props.loginsuccess(true,loginresponse.data.ValidEmail,loginresponse.data.Name);
      }
    }

    else if(loginresponse.data.Response === "unregistered_email"){
      // alert("Please Enter the Correct Email/Password");
      this.opennotif2();
    }
    else if(loginresponse.data.Response === "unregistered_phone"){
      // alert("Please Enter the Correct Email/Password");
      this.opennotif3();
    }

    else if(loginresponse.data.Response === "invalid_format"){
      // alert("Please Enter the Correct Email/Password");
      this.opennotif4();
    }
    
    else if(loginresponse.data.Response === "Fail"){
      // alert("Please Enter the Correct Email/Password");
      this.opennotif();
    }

    //  localStorage.setItem("loggedin", true);
    //  localStorage.setItem("loggedInUseremail",loginresponse.data.ValidEmail);
    //  this.props.loginsuccess(true,loginresponse.data.ValidEmail);
    //  console.log("HELLLLLL",localStorage.getItem("loggedInUseremail"),localStorage.getItem("loggedin"))
    //  this.setState({
    //   name: '',email: '',issue:'',submitted:true
    // });
  }

  opennotif(){
    this.setState({
      shownotif:true
    })
  }

  opennotif2(){
    this.setState({
      shownotif2:true
    })
  }

  opennotif3(){
    this.setState({
      shownotif3:true
    })
  }
  opennotif4(){
    this.setState({
      shownotif4:true
    })
  }

  closenotif(){
    this.setState({
      shownotif:false,shownotif2:false,shownotif3:false,shownotif4:false,
    })
  }


  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

    // login(){
    //   this.setState({
    //     loginComponent :false,
    //   });
    // }

    // signup(){
    //   this.setState({
    //     signupComponent : true,
    //   });
    // }

      registration(){
        this.setState({
          registerComponent :true,
        });
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
      

        let facebookloginresponse = await axios.post('https://www.propviewz.com/be/login/fb_login', {     
          id:response.email,
          name:response.name,
          login_type:"facebook",
          pic: response.picture.data.url,
        });
        console.log("facebook login" , facebookloginresponse )
        if (facebookloginresponse.data.Response === "Success"){

          if(this.props.formdata && this.props.formdata != "nodata")
          {
            
            let formdata = this.props.formdata;
            formdata.append("reviewer_email",facebookloginresponse.data.ValidEmail);
            console.log("received form data");
            axios.post('https://www.propviewz.com/be/save_project_review/',formdata,{ 
                      headers: { 
                              'Content-Type': 'multipart/form-data' 
                              } 
                      });
            localStorage.setItem("loggedin", true);
            localStorage.setItem("loggedInUsername",facebookloginresponse.data.Name); 
            localStorage.setItem("loggedInUseremail",facebookloginresponse.data.ValidEmail);
            this.props.loginsuccess(true,facebookloginresponse.data.ValidEmail,facebookloginresponse.data.Name);
            this.props.close();
            this.props.onClose();
            if(this.props.reviewtype){
              this.props.showreviewstatus("review");
            }
            else{
              this.props.showreviewstatus("rating");
            }
          
      
          }
          else if(this.props.formdata1 && this.props.formdata1 != "nodata")
          {
            console.log("else if login success");
            
            let formdata1 = this.props.formdata1;
            formdata1.append("email_or_number",facebookloginresponse.data.ValidEmail);
            console.log("received form data");
            axios.post('https://www.propviewz.com/be/post_picture/',formdata1,{ 
                        headers: { 
                                'Content-Type': 'multipart/form-data' 
                                } 
                        });
            localStorage.setItem("loggedin", true);
            localStorage.setItem("loggedInUsername",facebookloginresponse.data.Name); 
            localStorage.setItem("loggedInUseremail",facebookloginresponse.data.ValidEmail);
            this.props.loginsuccess(true,facebookloginresponse.data.ValidEmail,facebookloginresponse.data.Name);
            this.props.close();
            this.props.onClose();
            this.props.showpicturestatus();
          }

          else
          {
            localStorage.setItem("loggedin", true);
            localStorage.setItem("loggedInUsername",facebookloginresponse.data.Name); 
            localStorage.setItem("loggedInUseremail",facebookloginresponse.data.ValidEmail);
            this.props.loginsuccess(true,facebookloginresponse.data.ValidEmail,facebookloginresponse.data.Name);
          }
        }
        else{
          
          if(this.props.formdata && this.props.formdata != "nodata")
          {
            
            let formdata = this.props.formdata;
            formdata.append("reviewer_email",facebookloginresponse.data.ValidEmail);
            console.log("received form data");
            axios.post('https://www.propviewz.com/be/save_project_review/',formdata,{ 
                      headers: { 
                              'Content-Type': 'multipart/form-data' 
                              } 
                      });
            localStorage.setItem("loggedin", true);
            localStorage.setItem("loggedInUsername",facebookloginresponse.data.Name); 
            localStorage.setItem("loggedInUseremail",facebookloginresponse.data.ValidEmail);
            this.props.loginsuccess(true,facebookloginresponse.data.ValidEmail,facebookloginresponse.data.Name);
            this.props.close();
            this.props.onClose();
            if(this.props.reviewtype){
              this.props.showreviewstatus("review");
            }
            else{
              this.props.showreviewstatus("rating");
            }
          
      
          }
          else if(this.props.formdata1 && this.props.formdata1 != "nodata")
          {
            console.log("else if login success");
            
            let formdata1 = this.props.formdata1;
            formdata1.append("email_or_number",facebookloginresponse.data.ValidEmail);
            console.log("received form data");
            axios.post('https://www.propviewz.com/be/post_picture/',formdata1,{ 
                        headers: { 
                                'Content-Type': 'multipart/form-data' 
                                } 
                        });
            localStorage.setItem("loggedin", true);
            localStorage.setItem("loggedInUsername",facebookloginresponse.data.Name); 
            localStorage.setItem("loggedInUseremail",facebookloginresponse.data.ValidEmail);
            this.props.loginsuccess(true,facebookloginresponse.data.ValidEmail,facebookloginresponse.data.Name);
            this.props.close();
            this.props.onClose();
            this.props.showpicturestatus();
          }
          else
          {
            localStorage.setItem("loggedin", true);
            localStorage.setItem("loggedInUsername",facebookloginresponse.data.Name); 
            localStorage.setItem("loggedInUseremail",facebookloginresponse.data.ValidEmail);
            this.props.loginsuccess(true,facebookloginresponse.data.ValidEmail,facebookloginresponse.data.Name);
          }
        }
    };


    responseGoogle = async (response) => {
      // this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
      console.log("google login details",response);
      if(response.profileObj)
      {
      let googleloginresponse = await axios.post('https://www.propviewz.com/be/login/google_login', {     
          id:response.profileObj.email,
          name:response.profileObj.name,
          login_type:"google",
          pic: response.profileObj.imageUrl,
        });
        console.log("google login response" , googleloginresponse )
        if (googleloginresponse.data.Response === "Success"){

          if(this.props.formdata && this.props.formdata != "nodata")
          {
            console.log("yess you are wrong")
            let formdata = this.props.formdata;
            formdata.append("reviewer_email",googleloginresponse.data.ValidEmail);
            console.log("received form data");
            axios.post('https://www.propviewz.com/be/save_project_review/',formdata,{ 
                      headers: { 
                              'Content-Type': 'multipart/form-data' 
                              } 
                      });
            localStorage.setItem("loggedin", true);
            localStorage.setItem("loggedInUsername",googleloginresponse.data.Name); 
            localStorage.setItem("loggedInUseremail",googleloginresponse.data.ValidEmail);
            this.props.loginsuccess(true,googleloginresponse.data.ValidEmail,googleloginresponse.data.Name);
            this.props.close();
            this.props.onClose();
            if(this.props.reviewtype){
              this.props.showreviewstatus("review");
            }
            else{
              this.props.showreviewstatus("rating");
            }
          
      
          }
          else if(this.props.formdata1 && this.props.formdata1 != "nodata")
          {
            console.log("else if login success");
            
            let formdata1 = this.props.formdata1;
            formdata1.append("email_or_number",googleloginresponse.data.ValidEmail);
            console.log("received form data");
            axios.post('https://www.propviewz.com/be/post_picture/',formdata1,{ 
                        headers: { 
                                'Content-Type': 'multipart/form-data' 
                                } 
                        });
            localStorage.setItem("loggedin", true);
            localStorage.setItem("loggedInUsername",googleloginresponse.data.Name); 
            localStorage.setItem("loggedInUseremail",googleloginresponse.data.ValidEmail);
            this.props.loginsuccess(true,googleloginresponse.data.ValidEmail,googleloginresponse.data.Name);
            this.props.close();
            this.props.onClose();
            this.props.showpicturestatus();
          }
            else{  
              console.log("yess you are right")
              localStorage.setItem("loggedin", true);
              localStorage.setItem("loggedInUsername",googleloginresponse.data.Name); 
              localStorage.setItem("loggedInUseremail",googleloginresponse.data.ValidEmail);
              this.props.loginsuccess(true,googleloginresponse.data.ValidEmail,googleloginresponse.data.Name);
            }
        }
        else{
          if(this.props.formdata && this.props.formdata != "nodata")
          {
            
            let formdata = this.props.formdata;
            formdata.append("reviewer_email",facebookloginresponse.data.ValidEmail);
            console.log("received form data");
            axios.post('https://www.propviewz.com/be/save_project_review/',formdata,{ 
                      headers: { 
                              'Content-Type': 'multipart/form-data' 
                              } 
                      });
            localStorage.setItem("loggedin", true);
            localStorage.setItem("loggedInUsername",googleloginresponse.data.Name); 
            localStorage.setItem("loggedInUseremail",googleloginresponse.data.ValidEmail);
            this.props.loginsuccess(true,googleloginresponse.data.ValidEmail,googleloginresponse.data.Name);
            this.props.close();
            this.props.onClose();
            if(this.props.reviewtype){
              this.props.showreviewstatus("review");
            }
            else{
              this.props.showreviewstatus("rating");
            }
          
      
          }
          else if(this.props.formdata1 && this.props.formdata1 != "nodata")
          {
            console.log("else if login success");
            
            let formdata1 = this.props.formdata1;
            formdata1.append("email_or_number",googleloginresponse.data.ValidEmail);
            console.log("received form data");
            axios.post('https://www.propviewz.com/be/post_picture/',formdata1,{ 
                        headers: { 
                                'Content-Type': 'multipart/form-data' 
                                } 
                        });
            localStorage.setItem("loggedin", true);
            localStorage.setItem("loggedInUsername",googleloginresponse.data.Name); 
            localStorage.setItem("loggedInUseremail",googleloginresponse.data.ValidEmail);
            this.props.loginsuccess(true,googleloginresponse.data.ValidEmail,googleloginresponse.data.Name);
            this.props.close();
            this.props.onClose();
            this.props.showpicturestatus();
          }
            else{  
              console("you are correct")
              localStorage.setItem("loggedin", true);
              localStorage.setItem("loggedInUsername",googleloginresponse.data.Name); 
              localStorage.setItem("loggedInUseremail",googleloginresponse.data.ValidEmail);
              this.props.loginsuccess(true,googleloginresponse.data.ValidEmail,googleloginresponse.data.Name);
            }
        }
      }
      else{
        // if(response.error === "idpiframe_initialization_failed"){
        //   // this.setState({cookieerror: true})
        //   alert("Error occurred. Enable Cookies Please.")
        // }

      }
    };


    // callbackLinkedIn = (error, code, redirectUri) => {
    //   if (error) {
    //     // signin failed
    //   } else {
    //     // Obtain authorization token from linkedin api
    //     // see https://developer.linkedin.com/docs/oauth2 for more info
    //   }
    // };


    linkedinresponse = async () => {
     
      let linkedinloginresponse = await axios.get('http://652befab4493.ngrok.io/login/login/linkedin', {     
         
        });
        console.log("linkedin login response" , linkedinloginresponse )
      
    };




    render() {
      console.log("^^^^^^^")
      console.log(this.props)
      console.log(this.state)
        return(

      //     <div className="cover1">
      //  <div className="divhh">
  
        <Modal show={this.state.loginComponent} className="modal_review_login" style={{zIndex: '10000'}}>
         {this.state.shownotif &&
         <div class="alert alert-danger alert-dismissible_login" style={{position:'absolute',zIndex:'99',width:'100%',top:'15%'}}>
          <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer'}}>&times;</p>
            Incorrect <strong>Password</strong>
          </div>
         }

        {this.state.shownotif2 &&
         <div class="alert alert-danger alert-dismissible_login" style={{position:'absolute',zIndex:'99',width:'100%',top:'15%'}}>
          <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer'}}>&times;</p>
          Please Enter a <strong>registered Email Id.</strong>
          </div>
         }

        {this.state.shownotif3 &&
         <div class="alert alert-danger alert-dismissible_login" style={{position:'absolute',zIndex:'99',width:'100%',top:'15%'}}>
          <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer'}}>&times;</p>
          Please Enter a <strong>registered Phone number.</strong>
          </div>
         }
         {this.state.shownotif4 &&
         <div class="alert alert-danger alert-dismissible_login" style={{position:'absolute',zIndex:'99',width:'100%',top:'15%'}}>
          <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer'}}>&times;</p>
          Please Enter a valid <strong>Email</strong> or <strong>Phone number.</strong>
          </div>
         }

         {/* <Modal show={this.state.loginComponent} className="modal_review_login"> */}
           <form>
           <img className="closebtnlogin" src={closeIcon} onClick={this.props.close}/>
           {/* <p className="logob"> LOGO </p> */}
           <a href={'/'}><img className="logob" src={LogoIcon}/></a> 
           <p className="hlogin">Login</p>
           
           <div className="fb_login">
           <FacebookLogin
          appId="1168953490128944"
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          textButton={''}
          icon="fa-facebook"
        />
        </div>
           {/* <img src={fb1} className="fb2"/> */}
           
           <div className="google_login">
           <GoogleLogin
            clientId="776070248769-b4houskf848vu8t013f0pajvtf402hu4.apps.googleusercontent.com" //TO BE CREATED
            render={renderProps => (
              <div>
              <img src={google} alt= "google logo" className="g_img_login" onClick={renderProps.onClick} disabled={renderProps.disabled} />
              </div>
              // <button
              //   className="button"
              //   onClick={renderProps.onClick}
              //   disabled={renderProps.disabled}
              // >
              //   Google Login
              // </button>
            )}
            // autoLoad={false}
            // cookiePolicy={'single_host_origin'}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </div>
           
           
           {/* <img src={google} className="google1"/> */}
           
           {/* <div className="lin1">  */}
           {/* <LinkedIn
            clientId="86vz7olmlc7f9p"
            callback={"http://127.0.0.1:4040/auth/linkedin/callback"}
            text='LinkedIn' 
            scope={["r_liteprofile","r_emailaddress"]}
          /> */}
          {/* </div> */}
           
           <a href="https://www.propviewz.com/be/login/auth/linkedin"><img src={lin} className="lin_login"/></a>
           
           
           
           
           {/* <img src={fb1} className="fb1"/>
           <img src={google} className="google"/>
           <img src={lin} className="lin"/> */}
           
           
           <hr className="new3"></hr>
           <p className="or">OR</p>
           <hr className="new4"></hr>

           <form onSubmit={this.handleSubmit}>

           
          
           <input type="text" className="email" id="emailphone" placeholder="e.g. johndoe@example.com or 9876543210" name="emailphone" required onChange={this.myChangeHandler} value={this.state.emailphone} autocomplete="off" onFocus={this.closenotif}/>
  
           <p className="eemail"> &nbsp; EMAIL ID / MOBILE No. &nbsp; </p>
           <input type="password" className="pass" placeholder="Enter your password" id="password" name="password" required onChange={this.myChangeHandler} value={this.state.password} autocomplete="off" onFocus={this.closenotif}/>
           <p className="epass"> &nbsp; PASSWORD &nbsp; </p> 
           <a className="fpass" style={{color:'#585858'}} href="/ForgotPassword">Forgot Password ?</a>
           {/* <Link to="/registration"> */}
           <button type="submit" className="continue"> Continue </button>
           {/* </Link> */}
           
           
           </form>
           
           
           
           {!this.state.hidesignupbutton &&
           <p className="foot">Not a member of Propviewz ?</p>
           }

           {this.state.loginComponent && !this.state.hidesignupbutton &&
           <div>
           <a onClick={this.props.signupHandler}>
           <p className="psignup" style={{cursor:'pointer'}}>Sign-up</p>
           </a>
           </div>}

           
          {/* {this.state.loginComponent &&
           <div>
            <a onClick={() => this.setState({ signupComponent: true, loginComponent: true })}>
           <p className="plogin">Login</p>
           </a>
           </div>} */}

           

            {this.state.signupComponent &&
        <SignUp/>
      } 

{this.state.loginComponent &&
        <login/>
      } 


           </form>
     
        </Modal>
 
  
            );
    }
}


export default login;