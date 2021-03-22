import React, { Component } from "react";

import "./ForgotpasswordconfirmModalbox.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoIcon from '../../assets/icons/logoonforgotpassword.png';
import axios from 'axios';


import closebutton from '../../assets/icons/shareModalboxclose.svg';

class Modal3 extends Component {

  constructor(props){
    super(props);
    this.state={
                email:""
    }
  }


  // myChangeHandler = (event) => {
  //   let nam = event.target.name;
  //   let val = event.target.value;
  //   this.setState({[nam]: val});
  // }

  // handleSubmit= async (event) => {
  //   event.preventDefault();
  //   console.log("email entered",this.state.email);
  //   let resetpasswordresponse = await axios.post('https://www.propviewz.com/be/management/forget_password', {
  //     email:this.state.email,
  //   });
  //   console.log("email exist?", resetpasswordresponse);
  // }

  render() {
    
    return (
      // <React.Fragment>
      //   {this.props.show && (
      //     <div className="parent">
      //       <div className="overlay"></div>
      //       <div className="modalshare">
      //         <h3 style={{fontSize:'24px'}}>Please enter your username or email address.</h3>
      //         {/* <h2>{this.props.copiedlink}</h2> */}
      //         <img src={closebutton} style={{top: '5px', right: '5px', position: 'absolute',width:'13px',cursor: 'pointer'}} onClick={this.props.onHide}/>
      //       </div> 
      //     </div>
      //   )}
       
      // </React.Fragment>
      <div id="shady">
      <div className="content">
       
        <div id="login">
		      <div style={{textAlign:"center",margin: "0px 0px 25px 0px"}}>
          <h1><a href="https://www.propviewz.com/"><img className="websitelogo" src={LogoIcon}/></a> </h1>
	        </div>
          <p className="message">Check your email for the confirmation link, then visit the login page.</p>

          {/* <form name="lostpasswordform" id="lostpasswordform" onSubmit={this.handleSubmit} method="post">
            <p>
              <label for="user_login">Email Address</label>
              <input type="email" name="email" id="email" className="input" onChange={this.myChangeHandler} required value={this.state.email}/>
            </p>
                  <input type="hidden" name="redirect_to" value=""/>
            <p class="submit">
              <input type="submit" name="wp-submit" id="wp-submit" class="button button-primary button-large submitbutton" value="Submit"/>
            </p>
          </form> */}

		      {/* <p id="nav">
			      <a href="https://www.homeviews.com/wp-login.php">Log in</a>
					</p> */}
				  <p id="backtoblog" style={{textAlign:'center'}}>
            <a className="homelink" href="https://www.propviewz.com/">← Back to Propviewz</a>
          </p>
			  </div>
        
      </div>
      </div>
    );
  }
}

export default Modal3;

