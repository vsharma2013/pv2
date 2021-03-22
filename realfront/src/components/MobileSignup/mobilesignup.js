import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Registration from '../../components/Registration/registration';
import "./mobilesignup.css";
import fb1 from '../../assets/icons/facebook.png';
import google from '../../assets/icons/google.png';
import lin from '../../assets/icons/linkedin.png';
import axios from 'axios';
import LogoIcon from '../../assets/icons/logo.png';
import closeIcon from '../../assets/icons/close.png';
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import LinkedIn from "linkedin-login-for-react";
import {Button,Modal}  from 'react-bootstrap';

class mobilesignup extends Component{
    constructor(props){
        super(props);
        this.state={
          loginComponent:true,
          signupComponent:false,
          phone:"",
          otp:"",
          temploginphone:"",
          shownotif:false,
          mobilesignup:true,
          disablephone:false,
          otpstatus:false,
        }
    
        
    
    
        //this.signup = this.signup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.opennotif = this.opennotif.bind(this);
        this.closenotif = this.closenotif.bind(this);
        this.otpresend = this.otpresend.bind(this);
      }


      otpresend = async (event) => {
        event.preventDefault();
        let loginresponse = await axios.post('https://www.propviewz.com/be/login', {     
          id:this.state.phone,
         });
         console.log("otp resend response",loginresponse )

        if (loginresponse.data.Response === "Fail"){
          this.setState({otpstatus:true})
        }
      }

      handleSubmit= async (event) => {
        event.preventDefault();
        let loginresponse = await axios.post('https://www.propviewz.com/be/login/phone_login', {     
          phoneNum:this.state.phone,
          otp:this.state.otp
         });
         console.log("phone match RESPONSE",loginresponse);
         
         if (loginresponse.data.Response === "Success"){
            localStorage.setItem("tempphonereg",loginresponse.data.Validphone);
            window.location.href='/registration/';
         }

         else{
            //  alert("Please provide the correct OTP");
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

  closenotif(){
    this.setState({
      shownotif:false,otpstatus:false
    })
  }


    
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }    


    componentDidMount(){
        const tempphone = localStorage.getItem("temploginphone")
        this.setState({temploginphone:tempphone,phone:tempphone})
        // if ("temploginphone" in localStorage) {
        //   this.setState({disablephone:true});
        //   delete localStorage["temploginphone"];
    
        // }
        if (this.state.temploginphone)
        console.log("got phone", tempphone);
      }

      componentWillUnmount(){
        if ("temploginphone" in localStorage) {
          // this.setState({disablephone:true});
          delete localStorage["temploginphone"];
    
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
     
      let linkedinloginresponse = await axios.get('http://652befab4493.ngrok.io/login/login/linkedin', {     
         
        });
        console.log("linkedin login response" , linkedinloginresponse )
      
    };





    render(){
        return(

      //     <div className="cover1">
            
      //  <div className="container divh">
      <Modal show={this.state.mobilesignup} className="modal_review_mobsignup" style={{zIndex: '10000'}}>
          {this.state.shownotif &&
         <div class="alert alert-danger alert-dismissible custom-margin-top-otp" style={{position:'absolute',zIndex:'99',width:'100%',top:'15%'}}>
          <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer'}}>&times;</p>
            Incorrect <strong>OTP</strong> entered.
          </div>
         }

        {this.state.otpstatus &&
         <div class="alert alert-danger alert-dismissible custom-margin-top-otp" style={{position:'absolute',zIndex:'99',width:'100%',top:'15%'}}>
          <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer'}}>&times;</p>
            New <strong>OTP</strong> has been Sent.
          </div>
         }
           
           <form onSubmit={this.handleSubmit}>
           <img className="closebtnmsign" src={closeIcon} onClick={this.props.close}/>
           
           {/* <p className="logob2"> LOGO </p> */}
           <a href={'/'}><img className="logob2" src={LogoIcon}/></a> 
           <p className="hsignup1">Sign-Up</p>
           
           <div className="fb_mobilesignup">
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
           
           <div className="google_mobilesignup">
           <GoogleLogin
            clientId="776070248769-b4houskf848vu8t013f0pajvtf402hu4.apps.googleusercontent.com" //TO BE CREATED
            render={renderProps => (
              <div>
              <img src={google} alt= "google logo" className="g_img_msignup" onClick={renderProps.onClick} disabled={renderProps.disabled} />
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
           
           <a href="https://www.propviewz.com/be/ld/login/linkedin"><img src={lin} className="lin_mobilesignup"/></a>
           
           

           {/* <img src={fb1} className="fb3"/>
           <img src={google} className="google2"/>
           <img src={lin} className="lin2"/> */}
           
           
           
           
           <hr className="new7"></hr>
           <p className="or2">OR</p>
           <hr className="new8"></hr>
           <input type="text" className="mobile" placeholder="&nbsp; Enter your email id or mobile no." name="phone" required onChange={this.myChangeHandler} value={this.state.phone}/>
           <p className="mobile1"> &nbsp; EMAIL ID / MOBILE No. &nbsp; </p>
           <input type="number2" className="otp" placeholder="Enter OTP received on the above number" name="otp" required onChange={this.myChangeHandler} value={this.state.otp} onFocus={this.closenotif}/>
           <p className="eotp"> &nbsp; OTP &nbsp; </p> 
           <p className="resend" onClick={this.otpresend}>Resend ? </p>


           
           <button className="continue2"> Continue </button>
          
           <p className="foot2">Already a member of Propviewz ?</p>
           <a onClick={this.props.openlogin1}>
           <p className="plogin1">Login</p>
           </a>
           </form>
      {/* //  </div> */}
      {/* //  </div> */}
      </Modal>
            );
    }
}
export default mobilesignup;