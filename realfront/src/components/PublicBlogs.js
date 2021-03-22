import React, { Component } from "react";
import { render } from '@testing-library/react';

import Footer from './footer';
import './PublicBlog.css';

import axios from 'axios';

import user from '../assets/icons/usera.png';
import LogoIcon from '../assets/icons/logo.png';
import searchIcon from '../assets/icons/search.png';
import Search from '../components/Search/search';

import SignUp from '../components/SignUp/signup';
import Login from '../components/Login/login';
import MobileSignup from '../components/MobileSignup/mobilesignup';
import Registration from '../components/Registration/registration';
import LogoIconMobile from '../assets/icons/logo_mobile.png'


class PublicBlogs extends React.Component {
  constructor(props){
    super(props);
    this.state={
    blogdisplay: false,
    projectmedia:"https://demopropadvisor.s3-eu-west-1.amazonaws.com/Project_Photos/Golden+Blessings/img1.jpg",
    match:"",
    valuetitle : 'add whatever title u need here',
    valuedescription: 'A boutique single building project of twenty five 1 & 2 bedroom apartments. Good intenal planning with some receation space on roof top. Good connectivit to Hinjawadi IT Park as well MIDC areas in PCMC',
    
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

public_blog = async () =>{
  try{  

    let publicblogdetails = await axios.get(`https://www.propviewz.com/be/fetch_publish_blog/`); 
    console.log("PUBLIC BLOG API DATA");
    console.log(publicblogdetails.data);
    this.setState({publicblogdetails:publicblogdetails.data});
         
  }
  catch(e){
    console.log(e);
  }
}


async componentWillMount(){

  await this.public_blog();

}

async componentDidMount(){
       
    this.setState({loggedin:localStorage.getItem("loggedin"), loggedinuseremail:localStorage.getItem("loggedInUseremail"),loggedinusername:localStorage.getItem("loggedInUsername"),city:localStorage.getItem("city")})
    
    
    
  }




render(){
console.log("PUBLISHED BLOG HERE")
console.log(this.state);
    console.log(this.props);
    let all_draft ;
    if(this.state.publicblogdetails){ 
          
     all_draft =(
      this.state.publicblogdetails.map(draft =>(
          <div className="blogpublic_proj">


          {this.state.publicblogdetails &&
              <a href={'/Blog/'+draft.blog_id} className="anchorstyle">
              <div className="boxD_public">
                      <div className="imageframeD_public">
                      <img className="imageboxD_public"src={draft.media_link}/>
                      </div>
          
                      <div className="contentframeD_public">
                      <p className="paraheadingD_public">{draft.blog_title}</p>
                      </div>
      
              </div></a>}


          </div>
        
        )));
  }

  let login_status;
if(this.state.loggedin === true | this.state.loggedin === 'true'){
    login_status = (
    // <div  style={{color: "white", position: "absolute"}}>
        <div>
        <div className="logout_btn1">
        <a className="username_account" href="/account/">{this.state.loggedinusername.length > 10 ? this.state.loggedinusername.substring(0, 7) + "..." : this.state.loggedinusername}</a>
          
        </div>
        <div className="logout_btn2">
        <a href={'/'}><p className="logout_account" onClick={this.logout}>Logout</p></a>
       </div>
        </div>
    // </div>
    );
  }



return(
<div>

<div className="staticmenu_account">
               
               <div className="container-fluid">
                   <div className="row reviewrow_v2 custommargin_v2">
                       <div className="col-lg-9 flexstyle_v2">
                           {/* <h3 className="sitelogo">LOGO</h3>  */}
                           <a href={'/'}><img className="sitelogo" src={LogoIcon}/></a> 
                           <div className="searchbox">
                               <Search/>
                           </div>
                           <img className="searchbox_icon_blog" src={searchIcon}/>
                       </div>

                       {/* <div className="col-lg-3 reviewbar_v2"> */}
     
                       {/* <div className="row">
                       <div className="col-md-9 reviewbar"> */}
                       <span className="currentlocation">{this.state.city}</span>
                       {/* </div> */}
                       {/* <div className="col-md-3"> */}
                       { this.state.loggedin ? 
   
   <img src={user} className="userlogo" alt="usericon"/>
   :
     
   <a onClick={this.signup}>
     {/* <img src={user} className="usericon1"/> */}
     <img src={user} className="userlogo" alt="usericon"/>
     </a>
   }
        
         {/* </div> */}
         {/* </div> */}
         {login_status}

{this.state.signupComponent &&
<SignUp loginHandler= {this.loginHandler.bind(this)} loginsuccess={this.loginsuccess} close={this.close} mobilesignup={this.mobilesignup} opennotif={this.opennotif}/>
//<Login/>
// <MobileSignup/>
}
{this.state.loginComponent &&
<Login signupHandler={this.signupHandler.bind(this)} loginsuccess={this.loginsuccess} close={this.close}/>
} 

{this.state.mloginComponent &&
<MobileSignup openlogin1={this.openlogin1} loginsuccess={this.loginsuccess} close={this.close}/>
}


{this.state.registerComponent &&
<Registration registerHandler={this.registerHandler.bind(this)}/>
} 
                         {/* {login_status} */}
                         {/* </div> */}
                         {/* </div> */}
     
     
                         {/* </div>  */}
   
                   </div>  
               </div>
<br></br>
               </div>
               <div className="col-sm-8 Blogsideheadings">
        <div className="Blogsidetitle BlogSidemainHeading" > 
            <div className="Bloggreybox1"></div><h3 className="Blognavrowtitletextblog">&nbsp;OUR BLOGS&nbsp;</h3><div className="Bloggreybox2blog"></div>
          </div>
          </div>

               <div className="staticmenu_account_mobile">
               
               <div className="container-fluid">
                   <div className="row reviewrow_v2 custommargin_v2">
                       <div className="col-lg-9 flexstyle_v2">
                           {/* <h3 className="sitelogo">LOGO</h3>  */}
                           <a href={'/'}><img className="sitelogo" src={LogoIcon}/></a> 
                           <a href={'/'}><img className="moblogoblog" src={LogoIconMobile}/></a> 
                           <div className="searchbox-mobile"> 
                           <div>
        {/* <div style={{margin: "-22px",width: "42%", marginBottom:"0px",marginLeft:"-81px"}}> */}
        <Search/>
        </div>
        </div>
                       </div>
                       <div className="col-3 profilebar-mobile">
                
                <div className="currentlocationiconmobile">
                <span className="currentlocation_mobile">{this.state.city}</span>
              
                {/* <img src={user} className="userlogo_mobile" alt="usericon"/> */}
                { this.state.loggedin ? 
        
        <img src={user} className="userlogo_mobile" alt="usericon"/>
    
        :
     
      <a onClick={this.signup}>
        {/* <img src={user} className="usericon1"/> */}
        <img src={user} className="userlogo_mobile" alt="usericon"/>
        </a>
      }
           
            {/* </div> */}
            {/* </div> */}
            {login_status}

{this.state.signupComponent &&
<SignUp loginHandler= {this.loginHandler.bind(this)} loginsuccess={this.loginsuccess} close={this.close} mobilesignup={this.mobilesignup} opennotif={this.opennotif}/>
 //<Login/>
// <MobileSignup/>
}
 {this.state.loginComponent &&
<Login signupHandler={this.signupHandler.bind(this)} loginsuccess={this.loginsuccess} close={this.close}/>
   } 

{this.state.mloginComponent &&
<MobileSignup openlogin1={this.openlogin1} loginsuccess={this.loginsuccess} close={this.close}/>
   }


{this.state.registerComponent &&
<Registration registerHandler={this.registerHandler.bind(this)}/>
   } 
                
                </div>       
                </div> 

                       {/* <div className="col-lg-3 reviewbar_v2"> */}
     
                       {/* <div className="row">
                       <div className="col-md-9 reviewbar"> */}
                       {/* <span className="currentlocation">MUMBAI</span> */}
                       {/* </div> */}
                       {/* <div className="col-md-3"> */}
                       {/* <img src={user} className="userlogo" alt="userlogo"/> */}
                       {/* {login_status} */}
                       {/* </div> */}
                       {/* </div> */}
   
   
                       {/* </div>  */}
   
                   </div>  
               </div>
               </div>

<div className="grid-containerpublic">
                {this.state.publicblogdetails? all_draft:<h2 className="no_public">No blog has been published</h2>}
          </div>

          <Footer/>

</div>
    );
  }
}

export default PublicBlogs;
