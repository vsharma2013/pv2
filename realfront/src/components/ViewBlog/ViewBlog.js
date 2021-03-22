import React, { Component } from "react";
import { render } from '@testing-library/react';
import axios from 'axios';
import './ViewBlog.css';

import user from '../../assets/icons/usera.png';
import LogoIcon from '../../assets/icons/logo.png';
import searchIcon from '../../assets/icons/search.png';
import Search from '../../components/Search/search';

import Footer from '../footer';

import SignUp from '../../components/SignUp/signup';
import Login from '../../components/Login/login';
import MobileSignup from '../../components/MobileSignup/mobilesignup';
import Registration from '../../components/Registration/registration';
import usericon from '../../assets/icons/usericon.png';
import LogoIconMobile from '../../assets/icons/logo_mobile.png'

import Moment from 'moment';


class ViewBlog extends React.Component {
  constructor(props){
    super(props);
    this.state={
    blogdisplay: false,
    projectmedia:"https://demopropadvisor.s3-eu-west-1.amazonaws.com/Project_Photos/Golden+Blessings/img1.jpg",
    match:"",
    valuetitle : 'blog title here',
    valuedescription: 'A boutique single building project of twenty five 1 & 2 bedroom apartments. Good intenal planning with some receation space on roof top. Good connectivit to Hinjawadi IT Park as well MIDC areas in PCMC',
    currentUsername: 'Angel Rose Mathew' ,

    loginComponent:false,
    signupComponent:false,
    mloginComponent:false,
    registerComponent:false,
    loggedin:false,
    loggedinuseremail:"",
    loggedinusername:"",
};
    
this.signup = this.signup.bind(this);
this.login = this.login.bind(this);
this.logout = this.logout.bind(this);
this.openlogin1 = this.openlogin1.bind(this);
this.loginsuccess = this.loginsuccess.bind(this);
this.mobilesignup = this.mobilesignup.bind(this);
this.opennotif = this.opennotif.bind(this);
this.close = this.close.bind(this);
this.blogdetailsHandler = this.blogdetailsHandler.bind(this);


}

loginsuccess(loggedin,loggedinuseremail,loggedinusername){
    this.setState({
      loginComponent :false,  signupComponent :false, mloginComponent :false, registerComponent :false, loggedin:loggedin,loggedinuseremail:loggedinuseremail,loggedinusername:loggedinusername
    });
  
  }
  
  logout(){
    
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
      loggedin:false,loggedinusername:"",loggedinuseremail:""
    });
  }
  signup(){
    console.log("hello");
    this.setState({
      signupComponent :true, loginComponent :false, mloginComponent :false, registerComponent :false
    });
  }

  login(){
    this.setState({
      loginComponent :true,  signupComponent :false, mloginComponent :false, registerComponent :false
    });
  }
  
  mobilesignup(){
    this.setState({
      mloginComponent :true,  signupComponent :false, loginComponent :false, registerComponent :false
    });
  }
  
  registration(){
    this.setState({
      registerComponent :true,  signupComponent :false, loginComponent :false, mloginComponent :false
    });
  }
  
  openlogin1(){
    this.setState({
      loginComponent: true, mloginComponent: false,
    });
  }
  
  loginHandler(){
    console.log("hello1");
    this.setState({ signupComponent: false, loginComponent: true });
  }
  signupHandler(){
    console.log("hello2");
    this.setState({ signupComponent: true, loginComponent: false });
  }
  
  registerHandler(){
    this.setState({ signupComponent: false, registerComponent: true });
  }

  opennotif(){
    this.setState({
      notification:true
    })
  }
  close(){
    this.setState({
      loginComponent :false,  signupComponent :false, mloginComponent :false, registerComponent :false
    });
  }
  

  blogdetailsHandler = async () =>{
    try{    
    const { blog_id } = this.props.match.params
    
        let blogdetails = await axios.post(`https://www.propviewz.com/be/fetch_blog_with_id/`,{
          blog_id:blog_id
        }); 
    console.log("BLOG DATA");
    console.log(blogdetails.data);
    
    // if (blogdetails.data.length >0 ){
      this.state.blogdetails=blogdetails.data
    // }
    // else{
    //   window.location.replace("/404");
    // }

 let dt = this.state.blogdetails[0].created_at;
 let vardate=Moment(this.state.blogdetails[0].created_at).format("DD-MM-YYYY");
 console.log("NEW DATE")
 console.log(vardate)

    }
    catch(e){
      console.log(e);
    }
    
  }

  async componentWillMount(){
    await this.blogdetailsHandler();
console.log("ANGEL")
  
  
  }

  async componentDidMount(){
    await this.blogdetailsHandler();
    this.setState({loggedin:localStorage.getItem("loggedin"), loggedinuseremail:localStorage.getItem("loggedInUseremail"),loggedinusername:localStorage.getItem("loggedInUsername"),city:localStorage.getItem("city")})

    
  }


render(){
console.log("VIEW BLOG")
console.log(this.state)
console.log(this.props)

let login_status;
if(this.state.loggedin === true | this.state.loggedin === 'true'){
  let name = this.state.loggedinusername;
  let username = name;
    login_status = (
    // <div  style={{color: "white", position: "absolute"}}>
      //   <div>
      //   <div className="logout_btn1">
      //   <a className="username_account" href="/account/">{this.state.loggedinusername.length > 10 ? this.state.loggedinusername.substring(0, 7) + "..." : this.state.loggedinusername}</a>
          
      //   </div>
      //   <div className="logout_btn2">
      //   <a href={'/'}><p className="logout_account" onClick={this.logout}>Logout</p></a>
      //  </div>
      //   </div>
    // </div>
      <div className="logout_options">
        <a className="username_project_new" href="/account/">
          {username}
        </a>

        <p className="logout_project_new" onClick={this.logout}>
          Logout
    </p>
      </div>

    );
  }


return(
<div>

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
     
   

               <div className="mobileContainer mobile-view-row-design">
                                
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




                               
                               
                               
                               
                                </div>
                                </div>
                                </div>

               <div className="container blog_con">
                   <div className="col-50 decpblg">
                   <p className="bloghead"> {this.state.blogdetails?this.state.blogdetails[0].blog_title:null}</p>
                                    <img src = {this.state.blogdetails?this.state.blogdetails[0].media_link:null} class="blog_image"/>
                                    <div className="blogrow">
                                    <img src={usericon} className="blogprofile"/>
                                    <div className="blopprocontainer">
                                    <h5 className="bloggernam"> {this.state.blogdetails?this.state.blogdetails[0].name:null}</h5>
                                    <h5 className="bloggerdat">{Moment(this.state.blogdetails?this.state.blogdetails[0].created_at:null).format("DD-MM-YYYY")}</h5>
                                    </div>
                                    </div>
                                    <div >
                                    <label className="blogdescription">{this.state.blogdetails?this.state.blogdetails[0].blog:null}</label>
                                    </div>
                    </div>
                </div>

          <Footer/>

</div>
    );
  }
}

export default ViewBlog;
