import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from '../../components/Login/login';
import MobileSignup from '../../components/MobileSignup/mobilesignup';
import "./signup.css";
// import registration from '../../components/Registration/registration';
import fb1 from '../../assets/icons/facebook.png';
import google from '../../assets/icons/google.png';
import lin from '../../assets/icons/linkedin.png';
import LogoIcon from '../../assets/icons/logo.png';
import login from "../../components/Login/login";
import Registration from "../../components/Registration/registration";
import axios from 'axios';
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import LinkedIn from "linkedin-login-for-react";
import closeIcon from '../../assets/icons/close.png';
import {Button,Modal}  from 'react-bootstrap';

// import { Router } from "react-router";
class signup extends Component{

  constructor(props) {
    super(props);
    this.state = {
      signupComponent: true,
      loginComponent: false,
      registerComponent: false,
      mobsignComponent: false,
      value: '',
      // input: {},
      errors: {},
      error:false,
      emailphone:"",
      entereddataexist: false,
      cookieerror:false,
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);

   
  }



  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let loginresponse = await axios.post('https://www.propviewz.com/be/login', {     
      id:this.state.emailphone,
     });
     console.log("1st login",loginresponse )
   
    
    
    if (loginresponse.data.Response === "Success"){

      if (isNaN(this.state.emailphone)) {
        localStorage.setItem("temploginemail",loginresponse.data.ValidEmail);
        // this.setState({register_show:false, signupComponent:false, loginComponent:false, value: event.target.value})
        this.props.loginHandler();
      }
      else{
        localStorage.setItem("temploginemail",loginresponse.data.ValidNumber);
        this.props.loginHandler();
        // localStorage.setItem("temploginphone",loginresponse.data.ValidNumber);
        // this.setState({mobsignComponent:true, signupComponent:false, loginComponent: false})
      }



      
      // console.log(localStorage.getItem("temploginemail"));
     
    }
    else {

      if (isNaN(this.state.emailphone)) {
        // alert('A registration Link has been sent to your Email ID.');
        // this.setState({register_show:false, signupComponent:false, loginComponent:false, value: event.target.value})
        this.props.opennotif();
        this.props.loginsuccess();
      }

      else{
        localStorage.setItem("temploginphone",this.state.emailphone);
        console.log("mobile response",loginresponse, localStorage.getItem("temploginphone"));
        this.props.mobilesignup();
      }
      
      // this.checkinput();
    }
  }

  validate(){
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input["email"] !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address. or mobile no";
      }
    }



  }

 
  
 

      //   registration(){
      //    this.setState({
      //      registerComponent :true,
      //    });
      //  }

      //  mobilesignup(){
      //    this.setState({
      //      mobsignComponent :true,
      //    });
      //  }



  checkinput = () =>{
  console.log("STATE in check input")
  console.log(this.state)
  if(this.state.emailphone!=''){
  if (isNaN(this.state.emailphone)) {
    
    alert('A registration Link has been sent to your Email ID abcd.');
    this.setState({register_show:false, signupComponent:false, loginComponent:false, value: event.target.value})
    // this.setState({value: event.target.value});
    // window.location.href='/registration/';
  }
  else {
    //alert('It is a Number');
    this.setState({mobsignComponent:true, signupComponent:false, loginComponent: false})
}}
else{
  alert('please fill the required field');
}
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

          localStorage.setItem("loggedin", true);
          localStorage.setItem("loggedInUsername",facebookloginresponse.data.Name); 
          localStorage.setItem("loggedInUseremail",facebookloginresponse.data.ValidEmail);
          this.props.loginsuccess(true,facebookloginresponse.data.ValidEmail,facebookloginresponse.data.Name);
        }
        else{
          // this.setState({error: true});
          localStorage.setItem("loggedin", true);
          localStorage.setItem("loggedInUsername",facebookloginresponse.data.Name); 
          localStorage.setItem("loggedInUseremail",facebookloginresponse.data.ValidEmail);
          this.props.loginsuccess(true,facebookloginresponse.data.ValidEmail,facebookloginresponse.data.Name);
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

          localStorage.setItem("loggedin", true);
          localStorage.setItem("loggedInUsername",googleloginresponse.data.Name); 
          localStorage.setItem("loggedInUseremail",googleloginresponse.data.ValidEmail);
          this.props.loginsuccess(true,googleloginresponse.data.ValidEmail,googleloginresponse.data.Name);
        }
        else{
          // this.setState({error: true});
          localStorage.setItem("loggedin", true);
          localStorage.setItem("loggedInUsername",googleloginresponse.data.Name); 
          localStorage.setItem("loggedInUseremail",googleloginresponse.data.ValidEmail);
          this.props.loginsuccess(true,googleloginresponse.data.ValidEmail,googleloginresponse.data.Name);
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
     
      let linkedinloginresponse = await axios.get('https://www.propviewz.com/be/login/auth/linkedin/callback', {     
         
        });
        console.log("linkedin login response" , linkedinloginresponse )
      
    };


    render(){   
    console.log("STATE")
    console.log(this.state)

        return(
        
      <Modal show={this.state.signupComponent} className="modal_review_signup" style={{zIndex: '10000'}}>
      {/* {this.state.signupComponent && */}
       {/* <div className="container divh2"> */}

           <form onSubmit={this.handleSubmit}>
           <img className="closebtnsu" src={closeIcon} onClick={this.props.close}/>
           {/* <p className="logob1"> LOGO </p> */}
           <a href={'/'}><img className="logob1" src={LogoIcon}/></a> 
           <p className="hsignup">Sign-Up</p>
           
           
           <div className="fb2">
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
           
           <div className="google1">
           <GoogleLogin
            clientId="776070248769-b4houskf848vu8t013f0pajvtf402hu4.apps.googleusercontent.com" //TO BE CREATED
            render={renderProps => (
              <div>
              <img src={google} alt= "google logo" className="google_img_sign"  onClick={renderProps.onClick} disabled={renderProps.disabled} />
              {/* style={{width:"40px",marginTop:"0px"}} */}
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
           
           <a href="https://www.propviewz.com/be/ld/auth/linkedin/callback"><img src={lin} className="lin1"/></a>
           
           <hr className="new6"></hr>
           <p className="or1">OR</p>
           <hr className="new5"></hr>

           <input
              type="text"
              // name="email"
              name="emailphone"
              
              // value={this.state.input.email}
              // onChange={this.handleChange}
              class="email1"
              // value={this.state.value} 
              // onChange={this.handleChange}
              placeholder="&nbsp; Enter your email id or mobile no."
              id="emailphone"
              onChange={this.myChangeHandler} 
              value={this.state.emailphone} 
              required/>

           {/* <input type="email" id="email" name="email1" value={this.state.email}
           onChange={(event)=>{this.setState({email:event.target.value})}} className="email1" placeholder="&nbsp; Enter your email id or mobile no." required/> */}

            <p className="eemail1"> &nbsp; EMAIL ID / MOBILE No. &nbsp; </p>

            <button type="submit" value="Continue" class="continue1" >Continue</button>
           {/* { this.state.error && 
           <div>{this.state.errors.email}</div>
           } */}
{/* 
           {this.state.cookieerror &&
           <div> Third party Cookies are not enabled.</div>
           } */}
           <p className="foot1">Already a member of Propviewz ?</p>

          

           {this.state.signupComponent &&
           <div>
            <a onClick={this.props.loginHandler}>
           <p className="plogin" style={{cursor:'pointer'}}>Login</p>
           </a>
           </div>}


           {/* {this.state.loginComponent &&
           <div>
            <a onClick={() => this.setState({ signupComponent: true, loginComponent: true })}>
           <p className="plogin">Login</p>
           </a>
           </div>} */}

{/* {this.state.registerComponent &&
        <Registration/>
           }  */}




            {this.state.loginComponent &&
        <Login/>
           } 

{this.state.signupComponent &&
        <signup/>
           } 

           
           </form>
</Modal>
            );
    }
}
export default signup;