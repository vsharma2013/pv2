import React, { Component } from "react";

import "./NewPassword.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoIcon from '../../assets/icons/logoonforgotpassword.png';
import hideicon from '../../assets/icons/hideicon.svg';
import showicon from '../../assets/icons/showicon.svg';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';



import closebutton from '../../assets/icons/shareModalboxclose.svg';
// let Resetemail;
// if ("Resetemail" in localStorage){
//   Resetemail = localStorage.getItem("Resetemail");
// }


class NewPassword extends Component {

  constructor(props){
    super(props);
    this.state={
                email:"",
                password:"",
                error:false,
                passwordchangesuccess:false,
                hidden:false,
                sessionExpired:false,
    }
    this.toggleShow = this.toggleShow.bind(this);
  }


  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  handleSubmit= async (event) => {
    event.preventDefault();
    try{
      let Resetemail;
      if ("Resetemail" in localStorage) {  
        Resetemail = localStorage.getItem("Resetemail");
      }
      console.log("data",Resetemail,this.state.password);

      if(Resetemail){
        let newpasswordresponse = await axios.post('https://www.propviewz.com/be/management/set_new_password', {
          email:Resetemail,
          password:this.state.password,
        });
        console.log("done?", newpasswordresponse.data.Response);
        if (newpasswordresponse.data.Response === "Success")
        {
          if ("Resetemail" in localStorage) {
            delete localStorage["Resetemail"];  
          }
          // window.location.href='/';
          this.setState({passwordchangesuccess:true});
        }
        else{
            this.setState({error:true});
        }
      }
      else{
          this.setState({sessionExpired:true});
      }
    }
    catch(e){
      console.log(e);
      this.setState({error:true});
    }
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }


  render() {
    // let Resetemail = localStorage.getItem("Resetemail");
    return (
     <div id="shady">
      <div className="content">

      { this.state.passwordchangesuccess && 
        <SweetAlert
        success
        show={this.state.passwordchangesuccess}
        confirmBtnBsStyle={'secondary'}
        style={{ fontFamily:'Catamaran-Semibold',color: '#404041' }}
        // title="Please Login or Signup to mark the project as favourite."
        // text="SweetAlert in React"
        // showCancelButton
        onConfirm={() => {
          // console.log('confirm');
          window.location.href='/';
        }}
        onCancel={() => {
          // console.log('cancel');
          window.location.href='/';
        }}
        timeout={600000}
        onEscapeKey={() => window.location.href='/'}
        onOutsideClick={() => window.location.href='/'}
        // confirmBtnBsStyle={"danger"}
        
      >
        Your password has been updated successfully. Please Login using your new Password.

      </SweetAlert>
      }


       { this.state.error && 
        <SweetAlert
        error
        show={this.state.error}
        confirmBtnBsStyle={'secondary'}
        style={{ fontFamily:'Catamaran-Semibold',color: '#404041' }}
        // title="Please Login or Signup to mark the project as favourite."
        // text="SweetAlert in React"
        // showCancelButton
        onConfirm={() => {
          // console.log('confirm');
          this.setState({ error: false });
        }}
        onCancel={() => {
          // console.log('cancel');
          this.setState({ error: false });
        }}
        timeout={600000}
        onEscapeKey={() => this.setState({ error: false })}
        onOutsideClick={() => this.setState({ error: false })}
        // confirmBtnBsStyle={"danger"}
        
      >
        Error occurred. Please Try Again.
      </SweetAlert>
      }

      { this.state.sessionExpired && 
        <SweetAlert
        error
        show={this.state.sessionExpired}
        confirmBtnBsStyle={'secondary'}
        style={{ fontFamily:'Catamaran-Semibold',color: '#404041' }}
        // title="Please Login or Signup to mark the project as favourite."
        // text="SweetAlert in React"
        // showCancelButton
        onConfirm={() => {
          // console.log('confirm');
          this.setState({ sessionExpired: false });
        }}
        onCancel={() => {
          // console.log('cancel');
          this.setState({ sessionExpired: false });
        }}
        timeout={600000}
        onEscapeKey={() => this.setState({ sessionExpired: false })}
        onOutsideClick={() => this.setState({ sessionExpired: false })}
        // confirmBtnBsStyle={"danger"}
        
      >
        Session has Expired. Please visit <a href="/ForgotPassword" style={{color:'rgb(212, 63, 58)',fontWeight:'bold'}}>Forgot password</a> page to get a new Password Reset Link.
      </SweetAlert>
      }
        <div id="login">
		      <div style={{textAlign:"center",margin: "0px 0px 25px 0px"}}>
          <h1><a href="https://www.propviewz.com/"><img className="websitelogo" src={LogoIcon}/></a> </h1>
	        </div>
          <p className="message" style={{textAlign:"center"}}>Enter a New Password below.</p>
        
          <form name="newpasswordform" id="newpasswordform" onSubmit={this.handleSubmit} method="post">
            <p>
              <label for="user_login">New Password</label>             
              
              <div className="inputContainer">                
              
                <input type= {this.state.hidden ? "password" : "text"} name="password" id="password" className="input" style={{width:'95%',border:'none'}} onChange={this.myChangeHandler} placeholder="Enter password" required 
                pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$" 
                title="Must contain at least one uppercase,one lowercase, a number, a special character & minimum 8 character long." value={this.state.password}/>
                {this.state.hidden ? <img src={showicon} onClick={this.toggleShow} style={{cursor:"pointer"}}/> : <img src={hideicon} onClick={this.toggleShow} style={{cursor:"pointer"}}/>}
              </div>


            </p>
              {/* <input type="hidden" name="email" id="email" value={Resetemail}/> */}

            <p>Hint: The password should be at least eight characters long. It must contain atleast one upper and lower case letter, a number, and a special character.</p>      
            <p className="submit">
              <input type="submit" name="wp-submit" id="wp-submit" className="button button-primary button-large submitbutton" value="Submit"/>
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

export default NewPassword;

