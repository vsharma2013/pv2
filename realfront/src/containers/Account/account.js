import React from 'react';
import './account.css';
import Search from '../../components/Search/search';
import user from './assets/user.png';
import Calendar from './assets/calendar.png';
import addimage from './assets/add.png';
import postimage from './assets/post.png';
import review from './assets/review.png';
import picture from './assets/camera.png';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import Footer from '../../components/footer';
import Profile from '../../components/Profile/profile';
import 'regenerator-runtime/runtime';
import PostAPicture from '../../components/PostAPicture/postApicture';
import WriteReview from '../../components/WriteReview/createreview';
import Favorite from '../../components/Favorite/favorite';
import searchIcon from '../../assets/icons/search.png';
import menu1icon from '../../assets/icons/menu1.png';
import menu2icon from '../../assets/icons/menu2.png';
import LogoIcon from '../../assets/icons/logo.png';
import LogoIconMobile from '../../assets/icons/logo_mobile.png'
import Activities from '../../components/Activities/activities';
import Blog from '../../components/Blogs/blogs';
import Blogs from '../../components/Blogs/blogs';
import PublicBlog from '../../components/PublicBlogs';
import axios from 'axios';

import SignUp from '../../components/SignUp/signup';
import Login from '../../components/Login/login';
import MobileSignup from '../../components/MobileSignup/mobilesignup';
import Registration from '../../components/Registration/registration';
// import LogoIconMobile from '../../assets/icons/logo_mobile.png'


let LoggedIn = '';
let LoggedInUserEmail = '';
class Account extends React.Component{
    constructor(props){
        super(props);
        this.state={
        shareViews: false,
        projectmedia:"",
        match:"",
        showComponent:false,
        showComponent1:false,
        profile:true,
        activities:false,
        transaction:false,
        blog:false,
        favorite:false,
        

        // accountdetails:'',
        loginComponent:false,
        signupComponent:false,
        mloginComponent:false,
        registerComponent:false,
        loggedin:false,
        loggedinuseremail:"",
        loggedinusername:"",
      

        };

        this.shareViews = this.shareViews.bind(this);
        this.closeViews = this.closeViews.bind(this);
        this.AddReview = this.AddReview.bind(this);
        this.AddPicture = this.AddPicture.bind(this);

        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.openlogin1 = this.openlogin1.bind(this);
        this.loginsuccess = this.loginsuccess.bind(this);
        this.mobilesignup = this.mobilesignup.bind(this);
        this.opennotif = this.opennotif.bind(this);
        this.close = this.close.bind(this);
        // this.favorite = this.favorite.bind(this);
    
    }

    AddReview(){
        console.log("Add review function")
        this.setState({
            showComponent: true, showComponent1: false
        });
        }

    AddPicture(){
        console.log("Add Picture function");
        this.setState({
            showComponent1: true, showComponent: false
        });
        }
        onClose(){
            this.setState({
              showComponent1: false,showComponent: false,
            });
        
            
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
          

          
    
    shareViews(event) {
        event.preventDefault();
        
        this.setState({ shareViews: true }, () => {
          document.addEventListener('click', this.closeViews);
        });
      }
   
      closeViews() {
        this.setState({ shareViews: false }, () => {
          document.removeEventListener('click', this.closeViews);
        });
      }



      accountdetails = async () =>{
        try{    
        const  email_id  = localStorage.getItem("loggedInUseremail")
           console.log(email_id,"EMAIL IDddd") 
            let accountdetails = await axios.post(`https://www.propviewz.com/be/login/get_profile`,{     
                id:email_id,
                
               }); 
        console.log("accountdetails DATA");
        console.log(accountdetails.data);
        this.setState({accountdetails:accountdetails.data})
        }
        catch(e){
          console.log(e);
        }
      }


      async componentWillMount(){

        await this.accountdetails();

      }



      async componentDidMount(){
       
        this.setState({loggedin:localStorage.getItem("loggedin"), loggedinuseremail:localStorage.getItem("loggedInUseremail"),loggedinusername:localStorage.getItem("loggedInUsername"),city:localStorage.getItem("city")})
        
        
        
      }

      



    render(){
        console.log("accountRender")

        console.log(this.state)
        console.log(this.props)
        let login_status;
        // if(this.state.loggedin === true | this.state.loggedin === 'true'){
        //     login_status = (
           
        //         <div className="">
        //         <p style={{marginBottom:"0px"}} >Logged In as: {this.state.loggedinusername}</p>
        //           {/* <p onClick={this.logout}>Logout</p> */}
        //         </div>
           
        //     );
        //   }

        if(this.state.loggedin === true | this.state.loggedin === 'true'){
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


        let menu = (
            <Menu>
              
              <MenuItem><h6> <div onClick={this.AddReview} style={{placeContent:"center",display:"flex",fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}>
                   <img width="30px" src={menu1icon}/>
                    <div style={{marginTop: "6px", marginLeft: "5px"}}>Add Review</div>
                </div></h6></MenuItem>
              
              {/* <MenuItem><h6><span onClick={this.AddReview} style={{fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}><span style={{verticalAlign: "bottom"}}> <img width="30px" src={menu1icon}/></span>&nbsp; Add Review</span></h6></MenuItem> */}
              <Divider />
        
              <MenuItem><h6><div onClick={this.AddPicture} style={{placeContent:"center",display:"flex",fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}>
                   <img width="30px" src={menu2icon}/>
                    <div style={{marginTop: "6px", marginLeft: "5px"}}>Post a Picture</div>
                </div></h6>
              </MenuItem>
              {/* <MenuItem><h6><span onClick={this.AddPicture} style={{fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}><span style={{verticalAlign: "bottom"}}> <img width="30px" src={menu2icon}/></span>&nbsp; Post a Picture</span></h6></MenuItem> */}
            </Menu>
          );


    return (
        <div >
        <div className="oneweb" style={{'overflowX':'hidden'}}>
                        {this.state.showComponent &&
           < WriteReview onClose = {this.onClose.bind(this)}/>
          
            }
                    {this.state.showComponent1 &&
           < PostAPicture onClose = {this.onClose.bind(this)}/>
          
            }
            <div className="staticmenu_account">
               
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
                    
              
                
                <div className="navbox"> 
                    <div className="mainContainer_v2">
                        <div className="container-fluid">
                            <div className="row reviewrow_v2">
                                <div className="col-xl-9">
                                    {this.state.profile &&
                                    <div className="row"> 
                                        <div onClick={() => this.setState({ profile: true, favorite: false, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2 active">MY PROFILE</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: true, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY FAVOURITES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: true, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY ACTIVITIES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: true, blog: false})} className=" centeralign_v2">
                                            <button className="navbar-brand_v2">MY TRANSACTIONS</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: false, blog: true})} className="centeralign_v2">
                                            <button className="navbar-brand_v2">MY BLOGS</button>
                                        </div>
                    
                                    </div>
                                    }
                                    {this.state.favorite &&
                                    <div className="row"> 
                                        <div onClick={() => this.setState({ profile: true, favorite: false, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2">MY PROFILE</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: true, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2 active" >MY FAVOURITES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: true, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY ACTIVITIES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: true, blog: false})} className=" centeralign_v2">
                                            <button className="navbar-brand_v2">MY TRANSACTIONS</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: false, blog: true})} className="centeralign_v2">
                                            <button className="navbar-brand_v2">MY BLOGS</button>
                                        </div>
                    
                                    </div>
                                    }

                                    {this.state.activities &&
                                    <div className="row"> 
                                        <div onClick={() => this.setState({ profile: true, favorite: false, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2">MY PROFILE</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: true, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY FAVOURITES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: true, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2 active" >MY ACTIVITIES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: true, blog: false})} className=" centeralign_v2">
                                            <button className="navbar-brand_v2">MY TRANSACTIONS</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: false, blog: true})} className="centeralign_v2">
                                            <button className="navbar-brand_v2">MY BLOGS</button>
                                        </div>
                    
                                    </div>
                                    }

                                    {this.state.transaction &&
                                    <div className="row"> 
                                        <div onClick={() => this.setState({ profile: true, favorite: false, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2">MY PROFILE</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: true, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY FAVOURITES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: true, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY ACTIVITIES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: true, blog: false})} className=" centeralign_v2">
                                            <button className="navbar-brand_v2 active">MY TRANSACTIONS</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: false, blog: true})} className="centeralign_v2">
                                            <button className="navbar-brand_v2">MY BLOGS</button>
                                        </div>
                    
                                    </div>
                                    }

                                    {this.state.blog &&
                                    <div className="row"> 
                                        <div onClick={() => this.setState({ profile: true, favorite: false, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2">MY PROFILE</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: true, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY FAVOURITES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: true, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY ACTIVITIES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: true, blog: false})} className=" centeralign_v2">
                                            <button className="navbar-brand_v2">MY TRANSACTIONS</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: false, blog: true})} className="centeralign_v2">
                                            <button className="navbar-brand_v2 active">MY BLOGS</button>
                                        </div>
                    
                                    </div>
                                    }

                                </div>

                                <div className="col-xl-3 reviewbar1">
        <Dropdown
        trigger={['click']}
        overlay={menu}
        animation="slide-up"

      >
        <button className="btn_v2"><img className="addimagestylep1" src={addimage}/><span className="ShareView">SHARE VIEWS</span></button>
        </Dropdown>
        
        </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div className="staticmenu_account_mobile">
               
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

            <div className="navbox-mobile"> 
                    <div className="mainContainer_v2">
                        <div className="container-fluid">
                            <div className="row reviewrow_v2">
                                <div className="col-xl-12">
                                    {this.state.profile &&
                                    <div className="row"> 
                                        <div onClick={() => this.setState({ profile: true, favorite: false, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2 active">MY PROFILE</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: true, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY FAVOURITES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: true, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY ACTIVITIES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: true, blog: false})} className=" centeralign_v2">
                                            <button className="navbar-brand_vt">MY TRANSACTIONS</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: false, blog: true})} className="centeralign_v2">
                                            <button className="navbar-brand_vb">MY BLOGS</button>
                                        </div>
                    
                                    </div>
                                    }
                                    {this.state.favorite &&
                                    <div className="row"> 
                                        <div onClick={() => this.setState({ profile: true, favorite: false, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2">MY PROFILE</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: true, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2 active" >MY FAVOURITES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: true, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY ACTIVITIES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: true, blog: false})} className=" centeralign_v2">
                                            <button className="navbar-brand_vt">MY TRANSACTIONS</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: false, blog: true})} className="centeralign_v2">
                                            <button className="navbar-brand_vb">MY BLOGS</button>
                                        </div>
                    
                                    </div>
                                    }

                                    {this.state.activities &&
                                    <div className="row"> 
                                        <div onClick={() => this.setState({ profile: true, favorite: false, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2">MY PROFILE</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: true, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY FAVOURITES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: true, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2 active" >MY ACTIVITIES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: true, blog: false})} className=" centeralign_v2">
                                            <button className="navbar-brand_vt">MY TRANSACTIONS</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: false, blog: true})} className="centeralign_v2">
                                            <button className="navbar-brand_vb">MY BLOGS</button>
                                        </div>
                    
                                    </div>
                                    }

                                    {this.state.transaction &&
                                    <div className="row"> 
                                        <div onClick={() => this.setState({ profile: true, favorite: false, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2">MY PROFILE</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: true, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY FAVOURITES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: true, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY ACTIVITIES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: true, blog: false})} className=" centeralign_v2">
                                            <button className="navbar-brand_vt active">MY TRANSACTIONS</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: false, blog: true})} className="centeralign_v2">
                                            <button className="navbar-brand_vb">MY BLOGS</button>
                                        </div>
                    
                                    </div>
                                    }

                                    {this.state.blog &&
                                    <div className="row"> 
                                        <div onClick={() => this.setState({ profile: true, favorite: false, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2">MY PROFILE</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: true, activities: false, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY FAVOURITES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: true, transaction: false, blog: false})} className="centeralign_v2">
                                            <button className="navbar-brand_v2" >MY ACTIVITIES</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: true, blog: false})} className=" centeralign_v2">
                                            <button className="navbar-brand_vt">MY TRANSACTIONS</button>
                                        </div>
                                        <div onClick={() => this.setState({ profile: false, favorite: false, activities: false, transaction: false, blog: true})} className="centeralign_v2">
                                            <button className="navbar-brand_vb active">MY BLOGS</button>
                                        </div>
                    
                                    </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

{/* aDD REVIEW WALA
                <div className="account-footer-mobile">       
                        <div className="col-6 centeralign_account account_padding account_align" onClick={this.AddReview} >
                        <span ><img width="30px" src={menu1icon} style={{verticalAlign: "inherit"}}/></span>ADD REVIEW
                        </div>
                        <div className="col-6 centeralign_account account_padding account_align" onClick={this.AddPicture}>
                        <span ><img width="30px" src={menu2icon} style={{verticalAlign: "inherit"}}/></span>POST A PICTURE
                        </div>
            </div>  */}



                </div>






            {/* <div className="tab">
            <button className="active" onclick="openCity(event, 'profile')">My Profile</button>
            <button className="tablinks" onclick="openCity(event, 'fav')">My Favourites</button>
            <button className="tablinks" onclick="openCity(event, 'activities')">My Activities</button>
            <button className="tablinks" onclick="openCity(event, 'transaction')">My Transaction</button>
          
            <button className="btn_v2"><img className="addimagestyle_v2" src={addimage}/> POST</button>
          

            </div> */}
        {this.state.profile && this.state.accountdetails &&
        <div className="profilesec">
            <Profile accountdetails={this.state.accountdetails}/>
        </div>
        }

        {this.state.favorite &&
        <div className="favsec">
            <Favorite/>
        </div>
        }

        {this.state.activities &&
        <div className="activitysec">
            <Activities/>
        </div>
        }

        {this.state.transaction &&
        <div className="transactionsec">
           <h1>No Recent Transcations made</h1>
        </div>
        }

        {this.state.blog &&
        <div className="blogsec">
        <Blogs/>
        </div>
        }

<div className="mobile_acc_views">

<div className="account-footer-mobile">       
                        <div className="col-6 centeralign_account account_padding account_align"
                          onClick={this.AddReview} 
                         >
                        <span ><img width="30px" src={menu1icon} style={{verticalAlign: "inherit"}}/></span>ADD REVIEW
                        </div>
                        <div className="col-6 centeralign_account account_padding account_align" 
                         onClick={this.AddPicture}
                        >
                        <span ><img width="30px" src={menu2icon} style={{verticalAlign: "inherit"}}/></span>POST A PICTURE
                        </div>
            </div> 

</div>


      
         <Footer/>

        </div>
        </div>
)
            }
    
}
export default Account;