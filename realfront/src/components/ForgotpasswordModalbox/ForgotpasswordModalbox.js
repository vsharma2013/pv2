import React, { Component } from "react";

import "./ForgotpasswordModalbox.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoIcon from '../../assets/icons/logoonforgotpassword.png';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Redirect } from 'react-router'

import closebutton from '../../assets/icons/shareModalboxclose.svg';

class Modal2 extends Component {

  constructor(props){
    super(props);
    this.state={
                email:"",
                emailnotfound:false,
                redirecttoconfirm:false,
    }
  }


  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  handleSubmit= async (event) => {
    event.preventDefault();
    console.log("email entered",this.state.email);
    let resetpasswordresponse = await axios.post('https://www.propviewz.com/be/management/forget_password/', {
      email:this.state.email,
    });
    console.log("email exist?", resetpasswordresponse.data.Response);
    if (resetpasswordresponse.data.Response === "Success")
    {
        this.setState({redirecttoconfirm:true});
    }
    else{
        this.setState({emailnotfound:true});
    }
  }

  render() {
    
    const { redirecttoconfirm } = this.state;

     if (redirecttoconfirm) {
       return <Redirect to='/ForgotPasswordconfirm/'/>;
     }

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
       { this.state.emailnotfound && 
        <SweetAlert
        error
        show={this.state.emailnotfound}
        confirmBtnBsStyle={'secondary'}
        style={{ fontFamily:'Catamaran-Semibold',color: '#404041' }}
        // title="Please Login or Signup to mark the project as favourite."
        // text="SweetAlert in React"
        // showCancelButton
        onConfirm={() => {
          // console.log('confirm');
          this.setState({ emailnotfound: false });
        }}
        onCancel={() => {
          // console.log('cancel');
          this.setState({ emailnotfound: false });
        }}
        timeout={600000}
        onEscapeKey={() => this.setState({ emailnotfound: false })}
        onOutsideClick={() => this.setState({ emailnotfound: false })}
        // confirmBtnBsStyle={"danger"}
        
      >
        Email Id not Found. Please Register first or Please enter your registered Email Id.
      </SweetAlert>
      }
        <div id="login">
		      <div style={{textAlign:"center",margin: "0px 0px 25px 0px"}}>
          <h1><a href="https://www.propviewz.com/"><img className="websitelogo" src={LogoIcon}/></a> </h1>
	        </div>
          <p className="message">Please enter your email address. You will receive an email message with instructions on how to reset your password.</p>

          <form name="lostpasswordform" id="lostpasswordform" onSubmit={this.handleSubmit} method="post">
            <p>
              <label for="user_login">Email Address</label>
              <input type="email" name="email" id="email" className="input" placeholder="Enter Email" onChange={this.myChangeHandler} required value={this.state.email}/>
            </p>
                  <input type="hidden" name="redirect_to" value=""/>
            <p class="submit">
              <input type="submit" name="wp-submit" id="wp-submit" class="button button-primary button-large submitbutton" value="Submit"/>
            </p>
          </form>

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

export default Modal2;

