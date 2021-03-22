import React from 'react';
import './profile.css';
import axios from 'axios';
import 'regenerator-runtime/runtime';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
        projectmedia:"",
        match:"",
        showMessage: false,
        input: {},
        name:this.props.accountdetails?this.props.accountdetails[0].name:'',
        gender:this.props.accountdetails?this.props.accountdetails[0].gender:null,
        password:'',
        confirm_password:'',
        dob:this.props.accountdetails?this.props.accountdetails[0].dob:'',
        marital:this.props.accountdetails?this.props.accountdetails[0].marital:null,
        mobile:this.props.accountdetails?this.props.accountdetails[0].phone:'',
        email:this.props.accountdetails?this.props.accountdetails[0].email:'',
        // email:'mathewuser@comportement.in',
        city:this.props.accountdetails?this.props.accountdetails[0].city:null,
        statename:this.props.accountdetails?this.props.accountdetails[0].state_:null,
        errors: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.gender_handleChange = this.gender_handleChange.bind(this);
        this.marital_handleChange = this.marital_handleChange.bind(this);
        this.city_handleChange = this.city_handleChange.bind(this);
        this.statename_handleChange = this.statename_handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

        // onButtonClickHandler = () => {
        //     this.setState({ showMessage: !this.state.showMessage });
        // };
        //  Assignaccount(){
        //   console.log("NEW FUNCTION")
        //   console.log(this.props)
        //   console.log(this.state) 
        //   this.state.name=this.state.name?this.state.name:this.props.accountdetails?this.props.accountdetails[0].name:''
          
        // }

        handleChange(event) {
          console.log("HANDLEEE")
            let nam = event.target.name;
            let val = event.target.value;
            console.log(nam)
            console.log(val)
            this.setState({[nam]: val});
          }


          mobileHandler = (event) => {
            const rx_live = /^[+-]?\d*(?:\d*)?$/;
            
            if (rx_live.test(event.target.value))
                {
                console.log(event.target.value);
                this.setState({ mobile : event.target.value });
                }
              }

          gender_handleChange(event) {
        //     let gender = this.state.gender;
        //     gender[event.target.name] = event.target.value;
        //   console.log("gender")
        //   this.setState({gender});
        console.log("gender")
        console.log(event.target.value)
        this.setState({
            gender: event.target.value
          })
           
          }

          marital_handleChange(event) {
        //     let marital = this.state.marital;
        //     marital[event.target.name] = event.target.value;
        //   console.log("marital")
        //   this.setState({marital});

        console.log("marital")
        console.log(event.target.value)
        this.setState({
            marital: event.target.value
          })
           
          }

          city_handleChange(event) {
        //     let city = this.state.city;
        //     city[event.target.name] = event.target.value;
        //   console.log("city")
        //   this.setState({city});
        console.log("city")
        this.setState({
            city: event.target.value
          })
           
          }

          statename_handleChange(event) {
        //     let statename = this.state.statename;
        //     statename[event.target.name] = event.target.value;
        //   console.log("state")
        //   this.setState({statename});
        console.log("state")
        this.setState({
            statename: event.target.value
          })
           
          }
             
          handleSubmit(event) {
            event.preventDefault();
            if(this.state.password==this.state.confirm_password){
              this.setState({password:this.state.password?this.state.password:null});
              }
              else{
                let errors = {}
                let isValid = false;
                errors["confirm_password"] = "Passwords don't match.";
                this.setState({
                  errors: errors
                });
            
                return isValid;
              }
  console.log("SUBMIT FUNCTION")
                console.log(this.state);

                axios.post('https://www.propviewz.com/be/update_user_profile/',{ 
                  name:this.state.name?this.state.name:null,
                  gender:this.state.gender?this.state.gender:null,
                  password:this.state.password?this.state.password:null,
                  date_of_birth:this.state.dob?this.state.dob:null,
                  martial_status:this.state.marital?this.state.marital:null,
                  phone_no:this.state.mobile?this.state.mobile:null,
                  email:this.state.email?this.state.email:null,
                  city:this.state.city?this.state.city:null,
                  state:this.state.statename?this.state.statename:null,
              }
                ).then(res => { // then print response status
                  console.log("222222")
                  console.log(res);
                  if (res.data.Response == "Success"){
                    window.location.reload();
                  }
                 
                  
              }).catch(res => {
                  console.log("333333")
                  console.log(res)
                 
              })

              alert('Your changes have been updated!');
              

              // window.location.reload();
          
        }
          
          validate(){
              let input = this.state.input;
              let errors = {};
              let isValid = true;
          
              if (!this.state.name) {
                isValid = false;
                errors["name"] = "Please enter your name.";
              }
          
              if (!input["email"]) {
                isValid = false;
                errors["email"] = "Please enter your email Address.";
              }
          
              if (typeof input["email"] !== "undefined") {
                  
                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                if (!pattern.test(input["email"])) {
                  isValid = false;
                  errors["email"] = "Please enter valid email address.";
                }
              }
          
              if (!this.state.password) {
                isValid = false;
                errors["password"] = "Please enter your password.";
              }
          
              if (!this.state.confirm_password) {
                isValid = false;
                errors["confirm_password"] = "Please enter your confirm password.";
              }
          
              if (typeof this.state.password !== "undefined" && typeof this.state.confirm_password !== "undefined") {
                  
                if (this.state.password != this.state.confirm_password) {
                  isValid = false;
                  errors["confirm_password"] = "Passwords don't match.";
                }
              } 
          
              this.setState({
                errors: errors
              });
          
              return isValid;
          }

    
   
    render(){
        console.log("profileRENDER")

        console.log(this.state)
        console.log(this.props)
        // if(!this.state.name && this.props.accountdetails.length>0){
        //   this.Assignaccount();
        // }
    return (
        <div>
          <div className="profile_web">
        <div className="col-12">


          {/* <div className="container  profile_form "> */}

            <form onSubmit={this.handleSubmit}>
            <div className="container profile_row_collection">
            
            <div className="row">

                <div className="column">
                <label for="name" className="formtextname">Name * </label>
                <input className="input_text" type='text'  placeholder="Enter your name" name="name" value={this.state.name} onChange={this.handleChange} id="name"  />
                <div className="text-danger">{this.state.errors.name}</div>
                </div>

                <div className="column rightsection">
                <label className="formtextrightgender">Gender </label>
                <select style={{'fontFamily':'Catamaran'}} className="selectgender" name="gender" value={this.state.gender}   onChange={this.gender_handleChange} id="gender" placeholder="Select">
                {/* <option value={this.props.accountdetails?this.props.accountdetails[0].gender:this.state.gender} >{this.props.accountdetails?this.props.accountdetails[0].gender:this.state.gender}</option> */}
                <option value= "" disabled>Select</option>
                <option value="Female" >Female</option>
                <option value="Male">Male</option>
                <option  value="Other">Others</option>
                </select>
                </div>
            </div>


            <div className="row">
                <div className="column">
                <label className="formtextpwd">Password * </label>
                <input className="input_text" type='password'  name="password" value={this.state.password} onChange={this.handleChange} id="password" placeholder="************" />
                <div className="text-danger">{this.state.errors.password}</div>
                </div>

                <div className="column rightsection">
                <label className="formtextrightconfirmpwd">Confirm Password *</label>
                <input className="input_text" type='password'  name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange}  id="confirm_password" placeholder="*********" />
                <div className="right_text-danger">{this.state.errors.confirm_password}</div>
                </div>
            </div>

            <div className="row">
                <div className="column">
                <label className="formtextdob">Date of Birth </label>
                <input className="input_date" type="date" name="dob" value={this.state.dob} onChange={this.handleChange} id="dob"/>
                {/* <img src={Calendar}></img> */}
                </div>

                <div className="column rightsection">
                <label className="formtextrightmarital">Marital Status </label>
                {/* <input className="input_text" type='text'   name="marital" value={this.props.accountdetails?this.props.accountdetails[0].marital:this.state.marital} onChange={this.handleChange}   id="marital" /> */}
               
                <select style={{'fontFamily':'Catamaran'}} className="selectstatus" name="marital" value={this.state.marital} onChange={this.marital_handleChange} id="marital" placeholder="Select">
                <option value= "">Select</option>
                <option value="Married" >Married</option>
                <option value="Single" >Single</option>
                </select>
                </div>
            </div>

            <div className="row">
                <div className="column">
                <label className="formtextmobile">Mobile No </label>
                <input className="input_text" type='tel' placeholder="Enter your mobile no." name="mobile" value={this.state.mobile} maxLength={10} title="Please Enter 10 digits (Ex- 9876543210)" autoComplete="off" pattern="[0-9]{10}" onChange={this.mobileHandler.bind(this)} onFocus={this.mobileHandler.bind(this)} id="mobile"/>
                </div>

                <div className="column rightsection">
                <label for="email" className="formtextrightemail">Email ID *</label>
                <input className="input_text" type='text' placeholder="Enter your email ID"  name="email" value={this.state.email} onChange={this.handleChange}   id="email" disabled/>
                {/* <div className="right_text-danger">{this.state.errors.email}</div> */}
                </div>
            </div>

            <div className="row">
                <div className="column">
                <label className="formtextcity">City </label>
                {/* <input className="input_text" type='text'   name="city" value={this.props.accountdetails?this.props.accountdetails[0].city:this.state.city} onChange={this.handleChange}   id="city" /> */}
                <select className="selectcity" name="city" value={this.state.city} onChange={this.city_handleChange} id="city" placeholder="Select">
                {/* <option value= { this.props.accountdetails?this.props.accountdetails[0].city:this.state.city}>{ this.props.accountdetails?this.props.accountdetails[0].city:this.state.city}</option> */}
                <option value= "">Select</option>
                {/* <option value="Bangalore" >Bangalore</option>
                <option value="Goa" >Goa</option>
                <option value="Mumbai" >Mumbai</option>
                <option value="Newdelhi" >New Delhi</option>
                <option value="Pune" >Pune</option>
                <option value="Thane" >Thane</option> */}
                <option value="Mumbai">Mumbai</option>
                <option value="Navi Mumbai">Navi Mumbai</option>
                <option value="PMC, Pune">PMC, Pune</option>
                <option value="PMC, Pune">PCMC, Pune</option>
                <option value="Nashik">Nashik</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Thane">Thane</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Goa">Goa</option>
                <option value="Bangalore">Bangalore</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Surat">Surat</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Baroda">Baroda</option>
                </select>
                </div>

                <div className="column rightsection">
                <label className="formtextrightstate">State </label>
                {/* <input className="input_text" type='text'   name="state" value={this.props.accountdetails?this.props.accountdetails[0].state_:this.state.city_state} onChange={this.handleChange}   id="city_state" /> */}
                <select style={{'fontFamily':'Catamaran'}} className="selectgender" name="statename" value={this.state.statename} onChange={this.statename_handleChange} id="city_state" placeholder="Select" >
                <option value= "">Select</option>
                {/* <option value="Delhi" >Delhi</option>
                <option value="Goa" >Goa</option>
                <option value="Karnataka" >Karnataka</option>
                <option value="Maharastra" >Maharastra</option> */}
                <option value="Karnataka">Karnataka</option>
                <option value="Maharastra">Maharastra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Maharastra">Maharastra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
                </div>
            </div>
            </div>

            <div>
                {/* {this.state.showMessage && <p className="message_update">Your changes have been Updated</p>} */}
                <input type="submit" value="UPDATE" className="updatebtn" onClick={this.onButtonClickHandler}></input>
            </div>
            </form>
          {/* </div> */}
        </div>
        </div>



<div className="profile_mobile">
<div className="col-12">


{/* <div className="container  profile_form "> */}

  <form onSubmit={this.handleSubmit}>
  <div className="profile_row_collection">
  
  <div >

      <div>
      <label for="name" className="formtextname">Name * </label>
      <input className="input_text" type='text'  placeholder="Enter your name" name="name" value={this.state.name} onChange={this.handleChange} id="name"  />
      <div className="text-danger">{this.state.errors.name}</div>
      </div>

      <div>
      <label className="formtextrightgender">Gender </label>
      <select style={{'fontFamily':'Catamaran'}} className="selectgender" name="gender" value={this.state.gender}   onChange={this.gender_handleChange} id="gender" placeholder="Select" >
      {/* <option value={this.props.accountdetails?this.props.accountdetails[0].gender:this.state.gender} >{this.props.accountdetails?this.props.accountdetails[0].gender:this.state.gender}</option> */}
      <option value= "">Select</option>
      <option value="Female" >Female</option>
      <option value="Male">Male</option>
      <option  value="Other">Others</option>
      </select>
      </div>
  


 
      <div>
      <label className="formtextpwd">Password * </label>
      <input className="input_text" type='password'  name="password" value={this.state.password} onChange={this.handleChange} id="password" placeholder="************"/>
      <div className="text-danger">{this.state.errors.password}</div>
      </div>

      <div>
      <label className="formtextrightconfirmpwd">Confirm Password *</label>
      <input className="input_text" type='password'  name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange}  id="confirm_password" placeholder="*********"/>
      <div className="right_text-danger">{this.state.errors.confirm_password}</div>
      </div>



      <div>
      <label className="formtextdob">Date of Birth </label>
      <input className="input_date" type="date" name="dob" value={this.state.dob} onChange={this.handleChange} id="dob"/>
      </div>

      <div>
      <label className="formtextrightmarital">Marital Status </label>
                {/* <input className="input_text" type='text'   name="marital" value={this.props.accountdetails?this.props.accountdetails[0].marital:this.state.marital} onChange={this.handleChange}   id="marital" /> */}
               
                <select style={{'fontFamily':'Catamaran'}} className="selectstatus" name="marital" value={this.state.marital} onChange={this.marital_handleChange} id="marital" placeholder="Select">
                <option value= "">Select</option>
                <option value="Married" >Married</option>
                <option value="Single" >Single</option>
                </select>
      </div>
  


      <div>
      <label className="formtextmobile">Mobile No </label>
                <input className="input_text" type='tel' placeholder="Enter your mobile no." name="mobile" value={this.state.mobile} onChange={this.handleChange} id="mobile"/>
                </div>

      <div>
      <label for="email" className="formtextrightemail">Email ID *</label>
                <input className="input_text" type='text' placeholder="Enter your email ID"  name="email" value={this.state.email} onChange={this.handleChange}   id="email" disabled/>
                {/* <div className="right_text-danger">{this.state.errors.email}</div> */}
      </div>



      <div>
      <label className="formtextcity">City </label>
                {/* <input className="input_text" type='text'   name="city" value={this.props.accountdetails?this.props.accountdetails[0].city:this.state.city} onChange={this.handleChange}   id="city" /> */}
                <select className="selectcity" name="city" value={this.state.city} onChange={this.city_handleChange} id="city" placeholder="Select">
                {/* <option value= { this.props.accountdetails?this.props.accountdetails[0].city:this.state.city}>{ this.props.accountdetails?this.props.accountdetails[0].city:this.state.city}</option> */}
                <option value= "">Select</option>
                {/* <option value="Bangalore" >Bangalore</option>
                <option value="Goa" >Goa</option>
                <option value="Mumbai" >Mumbai</option>
                <option value="Newdelhi" >New Delhi</option>
                <option value="Pune" >Pune</option>
                <option value="Thane" >Thane</option> */}
                <option value="Mumbai">Mumbai</option>
                <option value="Navi Mumbai">Navi Mumbai</option>
                <option value="PMC, Pune">PMC, Pune</option>
                <option value="PMC, Pune">PCMC, Pune</option>
                <option value="Nashik">Nashik</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Thane">Thane</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Goa">Goa</option>
                <option value="Bangalore">Bangalore</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Surat">Surat</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Baroda">Baroda</option>
                </select>
      </div>

      <div>
      <label className="formtextrightstate">State </label>
                {/* <input className="input_text" type='text'   name="state" value={this.props.accountdetails?this.props.accountdetails[0].state_:this.state.city_state} onChange={this.handleChange}   id="city_state" /> */}
               
                <select style={{'fontFamily':'Catamaran'}} className="selectgender" name="statename" value={this.state.statename} onChange={this.statename_handleChange} id="city_state" placeholder="Select">
                <option value= "">Select</option>
                {/* <option value="Delhi" >Delhi</option>
                <option value="Goa" >Goa</option>
                <option value="Karnataka" >Karnataka</option>
                <option value="Maharastra" >Maharastra</option> */}
                <option value="Karnataka">Karnataka</option>
                <option value="Maharastra">Maharastra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Maharastra">Maharastra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
      </div>
  </div>
 

  <div>
      {/* {this.state.showMessage && <p className="message_update">Your changes have been Updated</p>} */}
      <input type="submit" value="UPDATE" className="updatebtn" onClick={this.onButtonClickHandler}></input>
  </div>
  </div>
  </form>
{/* </div> */}
</div>
</div>
        </div>
)
            }
    
}
export default Profile;