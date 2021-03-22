import React, { Component } from "react";
import Footer from '../../components/footer';
import LogoIcon from '../../assets/icons/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./registration.css";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

var citiesByState = {
    'Andhra Pradesh':['Anantapur',
      'Chittoor',
      'East Godavari'
      ,'Guntur'
      ,'Kadapa'
      ,'Krishna'
      ,'Kurnool'
      ,'Prakasam'
      ,'Sri Potti Sriramulu Nellore'
      ,'Srikakulam'
      ,'Visakhapatnam'
      ,'Vizianagaram'
      ,'West Godavari'],
    'Arunachal Pradesh':['Anjaw'
      ,'Changlang'
      ,'East Kameng'
      ,'East Siang'
      ,'Kamle'
      ,'Kra Daadi'
      ,'Kurung Kumey'
      ,'Lepa Rada'
      ,'Lohit'
      ,'Longding'
      ,'Lower Dibang Valley'
      ,'Lower Siang'
      ,'Lower Subansiri'
      ,'Namsai'
      ,'Pakke-Kessang'
      ,'Papum Pare'
      ,'Shi Yomi'
      ,'Siang'
      ,'Tawang'
      ,'Tirap'
      ,'Upper Dibang Valley'
      ,'Upper Siang'
      ,'Upper Subansiri'
      ,'West Kameng'
      ,'West Siang'],
      'Assam':['Baksa'
        ,'Bajali'
        ,'Barpeta'
        ,'Bishwanath'
        ,'Bongaigaon'
        ,'Cachar'
        ,'Charaideo'
        ,'Chirang'
        ,'Darrang'
        ,'Dhemaji'
        ,'Dhubri'
        ,'Dibrugarh'
        ,'Dima Hasao'
        ,'Goalpara'
        ,'Golaghat'
        ,'Hailakandi'
        ,'Hojai'
        ,'Jorhat'
        ,'Kamrup'
        ,'Kamrup Metropolitan'
        ,'Karbi Anglong'
        ,'Karimganj'
        ,'Kokrajhar'
        ,'Lakhimpur'
        ,'Majuli'
        ,'Morigaon'
        ,'Nagaon'
        ,'Nalbari'
        ,'Sivasagar'
        ,'South Salmara'
        ,'Sonitpur'
        ,'Tinsukia'
        ,'Udalguri'
        ,'West Karbi Anglong'
      ], 
    'Karnataka':['Bangalore'],
    'Maharashtra':['Mumbai','Navi Mumbai','PMC, Pune','PCMC, Pune','Nashik','Nagpur','Thane','Aurangabad'],
    'Gujarat':['Surat','Ahmedabad','Baroda'],
    'New Delhi':['New Delhi','Gurgaon'],
    'Goa':['Goa'],
    'Uttar Pradesh':['Noida'],

    }
class Registration extends React.Component {
    constructor(props){
        super(props);
        this.state={
         name:"",
         date:"",
         hidden: true,
         pass1:"",
         pass2:"",
         gender:"",
         marital:"",
         mobile:"",
         email:"",
         city:"",
         state:"",
         term1:"",
         term2:false,
         disablefield:false,
         disablefieldphone:false,
    
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }



    handleSubmit= async (event) => {
        event.preventDefault();
        if(this.state.pass1 === this.state.pass2){
        let loginresponse = await axios.post('https://www.propviewz.com/be/login/registration', {     
          name:this.state.name,
          dob:this.state.date,
          password: this.state.pass1,
          con_password: this.state.pass2,
          gender: this.state.gender,
          marital: this.state.marital,
          mobile: this.state.mobile,
          email: this.state.email,
          city: this.state.city,
          state: this.state.state,
          terms: true,
          newsletter: this.state.term2
         });
         console.log("registeration RESPONSE",loginresponse);
         if(loginresponse.data.Response === "Success"){
            localStorage.setItem("loggedin", true);
            localStorage.setItem("loggedInUseremail",loginresponse.data.ValidEmail);
            localStorage.setItem("loggedInUsername",loginresponse.data.Name);
            window.location.href='/';
         }
         else if(loginresponse.data.Response === "Fail"){
            alert("This Email id is already Registerered with us. !!! Please Login.");
         }
         else{
            alert("Registration Failed !!! Retry Please.");
         }
        }
        else{
            alert("password doesn't match");
        }
        //  localStorage.setItem("loggedin", true);
        //  localStorage.setItem("loggedInUseremail",loginresponse.data.ValidEmail);
        //  this.props.loginsuccess(true,loginresponse.data.ValidEmail);
       
      }

      myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
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

      myChangeHandlercitystate = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});

        if(val.length==0) document.getElementById("state").innerHTML = "<option></option>";
        else {
        var stateOptions = "";
        var i=0;
        var cityId;
        for(cityId in citiesByState) {
          for (i in citiesByState[cityId])
          {
            // console.log(citiesByState[cityId][i]);
            if (citiesByState[cityId][i] === val)
            {
              console.log(cityId);
              stateOptions+="<option>"+cityId+"</option>";
              document.getElementById("state").innerHTML = stateOptions;
              this.setState({state:cityId})
              break;
            }
          }
        }
      }
    }


      toggleShow() {
        this.setState({ hidden: !this.state.hidden });
      }
    

      checkinput(e){
        this.setState({term2:!this.state.term2})
      }

    async componentWillMount(){
    
        const { email_id } = this.props.match.params
        console.log('ANKIT2');
        console.log(email_id)
        if(email_id){
          this.setState({email:this.props.match.params.email_id,disablefield:true});
        }
        if ("tempphonereg" in localStorage) {
          const tempphone = localStorage.getItem("tempphonereg")
          this.setState({mobile:tempphone,disablefieldphone:true});
          delete localStorage["tempphonereg"];
    
        }
    }


    componentDidMount(){
    
    
    }

    render() {
        return(
            
        <div className="mainContainer">
            <div className="container-fluid custom-margintop-regpage">
            <div className="row">
              <div className="col-xl-12 nextlinestyle">
                <a href={'/'}><img src={LogoIcon} style={{width:'100%',maxWidth:'200px',minWidth:'200px'}}/></a> 
                <span className="custom-left-spacing">
                  <h6 className="" style={{fontSize:'15px',margin:'0px',padding:'0px'}}>Thank you for registering with Propviewz ! </h6>
                  <h6 className="" style={{fontSize:'15px',margin:'0px',padding:'0px'}}>To complete your registration process,please fill the below details and submit.</h6>
                </span>  
              </div>    
                {/* <div className="col-xl-10">
                  
                  <h6 className="" style={{fontSize:'15px',margin:'0px',padding:'0px'}}>Thank you for registering with Propviewz ! </h6>
                  <h6 className="" style={{fontSize:'15px',margin:'0px',padding:'0px'}}>To complete your registration process,please fill the below details and submit.</h6>
                 
                </div>   */}
               </div> 
              
              </div>
          
           
            <form onSubmit={this.handleSubmit}>
            <input type="text" className="name" name="name" id="name" autoComplete="off" placeholder="Enter your name" required onChange={this.myChangeHandler} value={this.state.name}/>
            <p className="ename"> &nbsp; Full Name<span style={{color:'red'}}> *</span> &nbsp; </p>
            
            <input type="date" className="date10" name="date" id="date" autoComplete="off" required onChange={this.myChangeHandler} value={this.state.date}/>
            <p className="edate"> &nbsp; Date Of Birth<span style={{color:'red'}}> *</span> &nbsp; </p>
            
        <input type={this.state.hidden ? "password" : "text"} className="pass1" name="pass1" id="pass1" autoComplete="off" placeholder="Enter password" required pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$" title="Must contain at least one uppercase,one lowercase, a number, a special character & minimum 8 character long." onChange={this.myChangeHandler} value={this.state.pass1}/><span><p onClick={this.toggleShow} style={{color:'black'}} className="pass1view">{this.state.hidden == false ? "Hide": "Show"}</p></span>
            <p className="epass1"> &nbsp; Password<span style={{color:'red'}}> *</span> &nbsp; </p> 
            
            <input type="text" className="cpass" name="pass2" id="pass2" autoComplete="off" placeholder="Re-Enter Your Password" required onChange={this.myChangeHandler} value={this.state.pass2}/>
            <p className="ecpass"> &nbsp; Confirm Password<span style={{color:'red'}}> *</span> &nbsp; </p>
            
            <select name="gender" className="gender" id="gender" onChange={this.myChangeHandler} value={this.state.gender} required>
                <option value="" disabled>Select</option>
                <option value="Male">&nbsp; Male &nbsp;</option>
                <option value="Female">&nbsp; Female &nbsp;</option>
                <option value="Others">&nbsp; Others &nbsp;</option>
            </select>
            <p className="egender"> &nbsp; Gender<span style={{color:'red'}}> *</span> &nbsp; </p>


            <select name="marital" className="marital" id="marital" onChange={this.myChangeHandler} value={this.state.marital} required> 
                <option value="" disabled>Select</option>
                <option value="Single">&nbsp; Single &nbsp;</option>
                <option value="Married">&nbsp; Married &nbsp;</option>
            </select>
            <p className="emarital"> &nbsp; Marital Status<span style={{color:'red'}}> *</span> &nbsp; </p>


            <input type="text" maxLength={10} className="mob1" name="mobile" id="mobile" placeholder="Enter 10 digit phone number" title="Please Enter 10 digits (Ex- 9876543210)" autoComplete="off" pattern="[0-9]{10}" required onChange={this.mobileHandler.bind(this)} onFocus={this.mobileHandler.bind(this)} value={this.state.mobile} disabled={this.state.disablefieldphone}/>
            <p className="emob1"> &nbsp; Mobile No.<span style={{color:'red'}}> *</span> &nbsp; </p>
            
            
            <input type="email" className="email3" name="email" id="email" autoComplete="off" required onChange={this.myChangeHandler} value={this.state.email} disabled={this.state.disablefield} autoComplete="off"/>
            <p className="eemail3"> &nbsp; Email ID<span style={{color:'red'}}> *</span> &nbsp; </p>
            
            
            <select name="city" className="city" id="city" required onChange={this.myChangeHandlercitystate} value={this.state.city}>
                <option value="" disabled>Select</option>
                <optgroup label="Andhra Pradesh">
                  <option value="Anantapur">&nbsp; Anantapur &nbsp;</option>
                  <option value="Chittoor">&nbsp; Chittoor &nbsp;</option>
                  <option value="East Godavari">&nbsp; East Godavari &nbsp;</option>
                  <option value="Guntur">&nbsp; Guntur &nbsp;</option>
                  <option value="Kadapa">&nbsp; Kadapa &nbsp;</option>
                  <option value="Krishna">&nbsp; Krishna &nbsp;</option>
                  <option value="Kurnool">&nbsp; Kurnool &nbsp;</option>
                  <option value="Prakasam">&nbsp; Prakasam &nbsp;</option>
                  <option value="Sri Potti Sriramulu Nellore">&nbsp; Sri Potti Sriramulu Nellore &nbsp;</option>
                  <option value="Srikakulam">&nbsp; Srikakulam &nbsp;</option>
                  <option value="Visakhapatnam">&nbsp; Visakhapatnam &nbsp;</option>
                  <option value="Vizianagaram">&nbsp; Vizianagaram &nbsp;</option>
                  <option value="West Godavari">&nbsp; West Godavari &nbsp;</option>
                </optgroup>

                <optgroup label="Arunachal Pradesh">
                  <option value="Anjaw">&nbsp; Anjaw &nbsp;</option>
                  <option value="Changlang">&nbsp; Changlang &nbsp;</option>
                  <option value="East Kameng">&nbsp; East Kameng &nbsp;</option>
                  <option value="East Siang">&nbsp; East Siang &nbsp;</option>
                  <option value="Kamle">&nbsp; Kamle &nbsp;</option>
                  <option value="Kra Daadi">&nbsp; Kra Daadi &nbsp;</option>
                  <option value="Kurung Kumey">&nbsp; Kurung Kumey &nbsp;</option>
                  <option value="Lepa Rada">&nbsp; Lepa Rada &nbsp;</option>
                  <option value="Lohit">&nbsp; Lohit &nbsp;</option>
                  <option value="Longding">&nbsp; Longding &nbsp;</option>
                  <option value="Lower Dibang Valley">&nbsp; Lower Dibang Valley &nbsp;</option>
                  <option value="Lower Siang">&nbsp; Lower Siang &nbsp;</option>
                  <option value="Lower Subansiri">&nbsp; Lower Subansiri &nbsp;</option>
                  <option value="Namsai">&nbsp; Namsai &nbsp;</option>
                  <option value="Pakke-Kessang">&nbsp; Pakke-Kessang &nbsp;</option>
                  <option value="Papum Pare">&nbsp; Papum Pare &nbsp;</option>
                  <option value="Shi Yomi">&nbsp; Shi Yomi &nbsp;</option>
                  <option value="Siang">&nbsp; Siang &nbsp;</option>
                  <option value="Tawang">&nbsp; Tawang &nbsp;</option>
                  <option value="Tirap">&nbsp; Tirap &nbsp;</option>
                  <option value="Upper Dibang Valley">&nbsp; Upper Dibang Valley &nbsp;</option>
                  <option value="Upper Siang">&nbsp; Upper Siang &nbsp;</option>
                  <option value="Upper Subansiri">&nbsp; Upper Subansiri &nbsp;</option>
                  <option value="West Kameng">&nbsp; West Kameng &nbsp;</option>
                  <option value="West Siang">&nbsp; West Siang &nbsp;</option>
                </optgroup>

                <optgroup label="Assam">
                  <option value="Baksa">&nbsp; Baksa &nbsp;</option>
                  <option value="Bajali">&nbsp; Bajali &nbsp;</option>
                  <option value="Barpeta">&nbsp; Barpeta &nbsp;</option>
                  <option value="Bishwanath">&nbsp; Bishwanath &nbsp;</option>
                  <option value="Bongaigaon">&nbsp; Bongaigaon &nbsp;</option>
                  <option value="Cachar">&nbsp; Cachar &nbsp;</option>
                  <option value="Charaideo">&nbsp; Charaideo &nbsp;</option>
                  <option value="Chirang">&nbsp; Chirang &nbsp;</option>
                  <option value="Darrang">&nbsp; Darrang &nbsp;</option>
                  <option value="Dhemaji">&nbsp; Dhemaji &nbsp;</option>
                  <option value="Dhubri">&nbsp; Dhubri &nbsp;</option>
                  <option value="Dibrugarh">&nbsp; Dibrugarh &nbsp;</option>
                  <option value="Dima Hasao">&nbsp; Dima Hasao &nbsp;</option>
                  <option value="Goalpara">&nbsp; Goalpara &nbsp;</option>
                  <option value="Golaghat">&nbsp; Golaghat &nbsp;</option>
                  <option value="Hailakandi">&nbsp; Hailakandi &nbsp;</option>
                  <option value="Hojai">&nbsp; Hojai &nbsp;</option>
                  <option value="Jorhat">&nbsp; Jorhat &nbsp;</option>
                  <option value="Kamrup">&nbsp; Kamrup &nbsp;</option>
                  <option value="Kamrup Metropolitan">&nbsp; Kamrup Metropolitan &nbsp;</option>
                  <option value="Karbi Anglong">&nbsp; Karbi Anglong &nbsp;</option>
                  <option value="Karimganj">&nbsp; Karimganj &nbsp;</option>
                  <option value="Kokrajhar">&nbsp; Kokrajhar &nbsp;</option>
                  <option value="Lakhimpur">&nbsp; Lakhimpur &nbsp;</option>
                  <option value="Majuli">&nbsp; Majuli &nbsp;</option>
                  <option value="Morigaon">&nbsp; Morigaon &nbsp;</option>
                  <option value="Nagaon">&nbsp; Nagaon &nbsp;</option>
                  <option value="Nalbari">&nbsp; Nalbari &nbsp;</option>
                  <option value="Sivasagar">&nbsp; Sivasagar &nbsp;</option>
                  <option value="South Salmara">&nbsp; South Salmara &nbsp;</option>
                  <option value="Sonitpur">&nbsp; Sonitpur &nbsp;</option>
                  <option value="Tinsukia">&nbsp; Tinsukia &nbsp;</option>
                  <option value="Udalguri">&nbsp; Udalguri &nbsp;</option>
                  <option value="West Karbi Anglong">&nbsp; West Karbi Anglong &nbsp;</option>
                </optgroup>

                <optgroup label="Bihar">
                  <option value="Araria">&nbsp; Araria &nbsp;</option>
                  <option value="Arwal">&nbsp; Arwal &nbsp;</option>
                  <option value="Aurangabad">&nbsp; Aurangabad &nbsp;</option>
                  <option value="Banka">&nbsp; Banka &nbsp;</option>
                  <option value="Begusarai">&nbsp; Begusarai &nbsp;</option>
                  <option value="Bhagalpur">&nbsp; Bhagalpur &nbsp;</option>
                  <option value="Bhojpur">&nbsp; Bhojpur &nbsp;</option>
                  <option value="Buxar">&nbsp; Buxar &nbsp;</option>
                  <option value="Darbhanga">&nbsp; Darbhanga &nbsp;</option>
                  <option value="East Champaran">&nbsp; East Champaran &nbsp;</option>
                  <option value="Gaya">&nbsp; Gaya &nbsp;</option>
                  <option value="Gopalganj">&nbsp; Gopalganj &nbsp;</option>
                  <option value="Jamui">&nbsp; Jamui &nbsp;</option>
                  <option value="Jehanabad">&nbsp; Jehanabad &nbsp;</option>
                  <option value="Kaimur">&nbsp; Kaimur &nbsp;</option>
                  <option value="Katihar">&nbsp; Katihar &nbsp;</option>
                  <option value="Khagaria">&nbsp; Khagaria &nbsp;</option>
                  <option value="Kishanganj">&nbsp; Kishanganj &nbsp;</option>
                  <option value="Lakhisarai">&nbsp; Lakhisarai &nbsp;</option>
                  <option value="Madhepura">&nbsp; Madhepura &nbsp;</option>
                  <option value="Madhubani">&nbsp; Madhubani &nbsp;</option>
                  <option value="Munger">&nbsp; Munger &nbsp;</option>
                  <option value="Muzaffarpur">&nbsp; Muzaffarpur &nbsp;</option>
                  <option value="Nalanda">&nbsp; Nalanda &nbsp;</option>
                  <option value="Nawada">&nbsp; Nawada &nbsp;</option>
                  <option value="Patna">&nbsp; Patna &nbsp;</option>
                  <option value="Purnia">&nbsp; Purnia &nbsp;</option>
                  <option value="Rohtas">&nbsp; Rohtas &nbsp;</option>
                  <option value="Saharsa">&nbsp; Saharsa &nbsp;</option>
                  <option value="Samastipur">&nbsp; Samastipur &nbsp;</option>
                  <option value="Saran">&nbsp; Saran &nbsp;</option>
                  <option value="Sheikhpura">&nbsp; Sheikhpura &nbsp;</option>
                  <option value="Sheohar">&nbsp; Sheohar &nbsp;</option>
                  <option value="Sitamarhi">&nbsp; Sitamarhi &nbsp;</option>
                  <option value="Siwan">&nbsp; Siwan &nbsp;</option>
                  <option value="Supaul">&nbsp; Supaul &nbsp;</option>
                  <option value="Vaishali">&nbsp; Vaishali &nbsp;</option>
                  <option value="West Champaran">&nbsp; West Champaran &nbsp;</option>
                </optgroup>
                

                <optgroup label="Chhattisgarh">
                  <option value="Balod">&nbsp; Balod &nbsp;</option>
                  <option value="Baloda Bazar">&nbsp; Baloda Bazar &nbsp;</option>
                  <option value="Balrampur">&nbsp; Balrampur &nbsp;</option>
                  <option value="Bastar">&nbsp; Bastar &nbsp;</option>
                  <option value="Bemetara">&nbsp; Bemetara &nbsp;</option>
                  <option value="Bijapur">&nbsp; Bijapur &nbsp;</option>
                  <option value="Bilaspur">&nbsp; Bilaspur &nbsp;</option>
                  <option value="Dantewada">&nbsp; Dantewada &nbsp;</option>
                  <option value="Dhamtari">&nbsp; Dhamtari &nbsp;</option>
                  <option value="Durg">&nbsp; Durg &nbsp;</option>
                  <option value="Gariaband">&nbsp; Gariaband &nbsp;</option>
                  <option value="Gaurella-Pendra-Marwahi">&nbsp; Gaurella-Pendra-Marwahi &nbsp;</option>
                  <option value="Janjgir-Champa">&nbsp; Janjgir-Champa &nbsp;</option>
                  <option value="Jashpur">&nbsp; Jashpur &nbsp;</option>
                  <option value="Kabirdham">&nbsp; Kabirdham &nbsp;</option>
                  <option value="Kanker">&nbsp; Kanker &nbsp;</option>
                  <option value="Kondagaon">&nbsp; Kondagaon &nbsp;</option>
                  <option value="Korba">&nbsp; Korba &nbsp;</option>
                  <option value="Koriya">&nbsp; Koriya &nbsp;</option>
                  <option value="Mahasamund">&nbsp; Mahasamund &nbsp;</option>
                  <option value="Mungeli">&nbsp; Mungeli &nbsp;</option>
                  <option value="Narayanpur">&nbsp; Narayanpur &nbsp;</option>
                  <option value="Raigarh">&nbsp; Raigarh &nbsp;</option>
                  <option value="Raipur">&nbsp; Raipur &nbsp;</option>
                  <option value="Rajnandgaon">&nbsp; Rajnandgaon &nbsp;</option>
                  <option value="Sukma">&nbsp; Sukma &nbsp;</option>
                  <option value="Surajpur">&nbsp; Surajpur &nbsp;</option>
                  <option value="Surguja">&nbsp; Surguja &nbsp;</option>
                </optgroup>

                <optgroup label="Goa">
                  <option value="North Goa">&nbsp; North Goa &nbsp;</option>
                  <option value="South Goa">&nbsp; South Goa &nbsp;</option>
                </optgroup>

                <optgroup label="Gujarat"> 
                  <option value="Ahmedabad">&nbsp; Ahmedabad &nbsp;</option>
                  <option value="Amreli">&nbsp; Amreli &nbsp;</option>
                  <option value="Anand">&nbsp; Anand &nbsp;</option>
                  <option value="Aravalli">&nbsp; Aravalli &nbsp;</option>
                  <option value="Banaskantha">&nbsp; Banaskantha &nbsp;</option>
                  <option value="Bharuch">&nbsp; Bharuch &nbsp;</option>
                  <option value="Bhavnagar">&nbsp; Bhavnagar &nbsp;</option>
                  <option value="Botad">&nbsp; Botad &nbsp;</option>
                  <option value="Chhota Udepur">&nbsp; Chhota Udepur &nbsp;</option>
                  <option value="Dahod">&nbsp; Dahod &nbsp;</option>
                  <option value="Dang">&nbsp; Dang &nbsp;</option>
                  <option value="Devbhoomi Dwarka">&nbsp; Devbhoomi Dwarka &nbsp;</option>
                  <option value="Gandhinagar">&nbsp; Gandhinagar &nbsp;</option>
                  <option value="Gir Somnath">&nbsp; Gir Somnath &nbsp;</option>
                  <option value="Jamnagar">&nbsp; Jamnagar &nbsp;</option>
                  <option value="Junagadh">&nbsp; Junagadh &nbsp;</option>
                  <option value="Kheda">&nbsp; Kheda &nbsp;</option>
                  <option value="Kutch">&nbsp; Kutch &nbsp;</option>
                  <option value="Mahisagar">&nbsp; Mahisagar &nbsp;</option>
                  <option value="Mehsana">&nbsp; Mehsana &nbsp;</option>
                  <option value="Morbi">&nbsp; Morbi &nbsp;</option>
                  <option value="Narmada">&nbsp; Narmada &nbsp;</option>
                  <option value="Navsari">&nbsp; Navsari &nbsp;</option>
                  <option value="Panchmahal">&nbsp; Panchmahal &nbsp;</option>
                  <option value="Patan">&nbsp; Patan &nbsp;</option>
                  <option value="Porbandar">&nbsp; Porbandar &nbsp;</option>
                  <option value="Rajkot">&nbsp; Rajkot &nbsp;</option>
                  <option value="Sabarkantha">&nbsp; Sabarkantha &nbsp;</option>
                  <option value="Surat">&nbsp; Surat &nbsp;</option>
                  <option value="Surendranagar">&nbsp; Surendranagar &nbsp;</option>
                  <option value="Tapi">&nbsp; Tapi &nbsp;</option>
                  <option value="Vadodara">&nbsp; Vadodara &nbsp;</option>
                  <option value="Valsad">&nbsp; Valsad &nbsp;</option>
                </optgroup>

                <optgroup label="Haryana">
                  <option value="Ambala">&nbsp; Ambala &nbsp;</option>
                  <option value="Bhiwani">&nbsp; Bhiwani &nbsp;</option>
                  <option value="Charkhi Dadri">&nbsp; Charkhi Dadri &nbsp;</option>
                  <option value="Faridabad">&nbsp; Faridabad &nbsp;</option>
                  <option value="Fatehabad">&nbsp; Fatehabad &nbsp;</option>
                  <option value="Gurgaon">&nbsp; Gurgaon &nbsp;</option>
                  <option value="Hissar">&nbsp; Hissar &nbsp;</option>
                  <option value="Jhajjar">&nbsp; Jhajjar &nbsp;</option>
                  <option value="Jind">&nbsp; Jind &nbsp;</option>
                  <option value="Kaithal">&nbsp; Kaithal &nbsp;</option>
                  <option value="Karnal">&nbsp; Karnal &nbsp;</option>
                  <option value="Kurukshetra">&nbsp; Kurukshetra &nbsp;</option>
                  <option value="Mahendragarh">&nbsp; Mahendragarh &nbsp;</option>
                  <option value="Nuh">&nbsp; Nuh &nbsp;</option>
                  <option value="Palwal">&nbsp; Palwal &nbsp;</option>
                  <option value="Panchkula">&nbsp; Panchkula &nbsp;</option>
                  <option value="Panipat">&nbsp; Panipat &nbsp;</option>
                  <option value="Rewari">&nbsp; Rewari &nbsp;</option>
                  <option value="Rohtak">&nbsp; Rohtak &nbsp;</option>
                  <option value="Sirsa">&nbsp; Sirsa &nbsp;</option>
                  <option value="Sonipat">&nbsp; Sonipat &nbsp;</option>
                  <option value="Yamuna Nagar">&nbsp; Yamuna Nagar &nbsp;</option>
                </optgroup>

                <optgroup label="Himachal Pradesh">
                  <option value="Bilaspur">&nbsp; Bilaspur &nbsp;</option>
                  <option value="Chamba">&nbsp; Chamba &nbsp;</option>
                  <option value="Hamirpur">&nbsp; Hamirpur &nbsp;</option>
                  <option value="Kangra">&nbsp; Kangra &nbsp;</option>
                  <option value="Kinnaur">&nbsp; Kinnaur &nbsp;</option>
                  <option value="Kullu">&nbsp; Kullu &nbsp;</option>
                  <option value="Lahaul and Spiti">&nbsp; Lahaul and Spiti &nbsp;</option>
                  <option value="Mandi">&nbsp; Mandi &nbsp;</option>
                  <option value="Shimla">&nbsp; Shimla &nbsp;</option>
                  <option value="Sirmaur">&nbsp; Sirmaur &nbsp;</option>
                  <option value="Solan">&nbsp; Solan &nbsp;</option>
                  <option value="Una">&nbsp; Una &nbsp;</option>
                </optgroup>

                <optgroup label="Jharkhand">
                  <option value="Bokaro">&nbsp; Bokaro &nbsp;</option>
                  <option value="Chatra">&nbsp; Chatra &nbsp;</option>
                  <option value="Deoghar">&nbsp; Deoghar &nbsp;</option>
                  <option value="Dhanbad">&nbsp; Dhanbad &nbsp;</option>
                  <option value="Dumka">&nbsp; Dumka &nbsp;</option>
                  <option value="East Singhbhum">&nbsp; East Singhbhum &nbsp;</option>
                  <option value="Garhwa">&nbsp; Garhwa &nbsp;</option>
                  <option value="Giridih">&nbsp; Giridih &nbsp;</option>
                  <option value="Godda">&nbsp; Godda &nbsp;</option>
                  <option value="Gumla">&nbsp; Gumla &nbsp;</option>
                  <option value="Hazaribag">&nbsp; Hazaribag &nbsp;</option>
                  <option value="Jamtara">&nbsp; Jamtara &nbsp;</option>
                  <option value="Khunti">&nbsp; Khunti &nbsp;</option>
                  <option value="Koderma">&nbsp; Koderma &nbsp;</option>
                  <option value="Latehar">&nbsp; Latehar &nbsp;</option>
                  <option value="Lohardaga">&nbsp; Lohardaga &nbsp;</option>
                  <option value="Pakur">&nbsp; Pakur &nbsp;</option>
                  <option value="Palamu">&nbsp; Palamu &nbsp;</option>
                  <option value="Ramgarh">&nbsp; Ramgarh &nbsp;</option>
                  <option value="Ranchi">&nbsp; Ranchi &nbsp;</option>
                  <option value="Sahibganj">&nbsp; Sahibganj &nbsp;</option>
                  <option value="Seraikela Kharsawan">&nbsp; Seraikela Kharsawan &nbsp;</option>
                  <option value="Simdega">&nbsp; Simdega &nbsp;</option>
                  <option value="West Singhbhum">&nbsp; West Singhbhum &nbsp;</option>
                </optgroup>

                <optgroup label="Karnataka">
                  <option value="Bagalkot">&nbsp; Bagalkot &nbsp;</option>
                  <option value="Ballari">&nbsp; Ballari &nbsp;</option>
                  <option value="Belgaum">&nbsp; Belgaum &nbsp;</option>
                  <option value="Bangalore Rural">&nbsp; Bangalore Rural &nbsp;</option>
                  <option value="Bangalore Urban">&nbsp; Bangalore Urban &nbsp;</option>
                  <option value="Bidar">&nbsp; Bidar &nbsp;</option>
                  <option value="Chamarajanagara">&nbsp; Chamarajanagara &nbsp;</option>
                  <option value="Chikkaballapura">&nbsp; Chikkaballapura &nbsp;</option>
                  <option value="Chikmagalur">&nbsp; Chikmagalur &nbsp;</option>
                  <option value="Chitradurga">&nbsp; Chitradurga &nbsp;</option>
                  <option value="Dakshina Kannada">&nbsp; Dakshina Kannada &nbsp;</option>
                  <option value="Davanagere">&nbsp; Davanagere &nbsp;</option>
                  <option value="Dharwad">&nbsp; Dharwad &nbsp;</option>
                  <option value="Gadag">&nbsp; Gadag &nbsp;</option>
                  <option value="Gulbarga">&nbsp; Gulbarga &nbsp;</option>
                  <option value="Hassan">&nbsp; Hassan &nbsp;</option>
                  <option value="Haveri">&nbsp; Haveri &nbsp;</option>
                  <option value="Kodagu">&nbsp; Kodagu &nbsp;</option>
                  <option value="Kolar">&nbsp; Kolar &nbsp;</option>
                  <option value="Koppal">&nbsp; Koppal &nbsp;</option>
                  <option value="Mandya">&nbsp; Mandya &nbsp;</option>
                  <option value="Mysore">&nbsp; Mysore &nbsp;</option>
                  <option value="Raichur">&nbsp; Raichur &nbsp;</option>
                  <option value="Ramanagara">&nbsp; Ramanagara &nbsp;</option>
                  <option value="Shimoga">&nbsp; Shimoga &nbsp;</option>
                  <option value="Tumakuru">&nbsp; Tumakuru &nbsp;</option>
                  <option value="Udupi">&nbsp; Udupi &nbsp;</option>
                  <option value="Uttara Kannada">&nbsp; Uttara Kannada &nbsp;</option>
                  <option value="Bijapur">&nbsp; Bijapur &nbsp;</option>
                  <option value="Yadgir">&nbsp; Yadgir &nbsp;</option>
                </optgroup>

                <optgroup label="Kerala">
                  <option value="Alappuzha">&nbsp; Alappuzha &nbsp;</option>
                  <option value="Ernakulam">&nbsp; Ernakulam &nbsp;</option>
                  <option value="Idukki">&nbsp; Idukki &nbsp;</option>
                  <option value="Kannur">&nbsp; Kannur &nbsp;</option>
                  <option value="Kasaragod">&nbsp; Kasaragod &nbsp;</option>
                  <option value="Kollam">&nbsp; Kollam &nbsp;</option>
                  <option value="Kottayam">&nbsp; Kottayam &nbsp;</option>
                  <option value="Kozhikode">&nbsp; Kozhikode &nbsp;</option>
                  <option value="Malappuram">&nbsp; Malappuram &nbsp;</option>
                  <option value="Palakkad">&nbsp; Palakkad &nbsp;</option>
                  <option value="Pathanamthitta">&nbsp; Pathanamthitta &nbsp;</option>
                  <option value="Thrissur">&nbsp; Thrissur &nbsp;</option>
                  <option value="Thiruvananthapuram">&nbsp; Thiruvananthapuram &nbsp;</option>
                  <option value="Wayanad">&nbsp; Wayanad &nbsp;</option>
                </optgroup>

                <optgroup label="Madhya Pradesh">
                  <option value="Agar Malwa">&nbsp; Agar Malwa &nbsp;</option>
                  <option value="Alirajpur">&nbsp; Alirajpur &nbsp;</option>
                  <option value="Anuppur">&nbsp; Anuppur &nbsp;</option>
                  <option value="Ashok Nagar">&nbsp; Ashok Nagar &nbsp;</option>
                  <option value="Balaghat">&nbsp; Balaghat &nbsp;</option>
                  <option value="Barwani">&nbsp; Barwani &nbsp;</option>
                  <option value="Betul">&nbsp; Betul &nbsp;</option>
                  <option value="Bhind">&nbsp; Bhind &nbsp;</option>
                  <option value="Bhopal">&nbsp; Bhopal &nbsp;</option>
                  <option value="Burhanpur">&nbsp; Burhanpur &nbsp;</option>
                  <option value="Chachaura-Binaganj">&nbsp; Chachaura-Binaganj &nbsp;</option>
                  <option value="Chhatarpur">&nbsp; Chhatarpur &nbsp;</option>
                  <option value="Chhindwara">&nbsp; Chhindwara &nbsp;</option>
                  <option value="Damoh">&nbsp; Damoh &nbsp;</option>
                  <option value="Datia">&nbsp; Datia &nbsp;</option>
                  <option value="Dewas">&nbsp; Dewas &nbsp;</option>
                  <option value="Dhar">&nbsp; Dhar &nbsp;</option>
                  <option value="Dindori">&nbsp; Dindori &nbsp;</option>
                  <option value="Guna">&nbsp; Guna &nbsp;</option>
                  <option value="Gwalior">&nbsp; Gwalior &nbsp;</option>
                  <option value="Harda">&nbsp; Harda &nbsp;</option>
                  <option value="Hoshangabad">&nbsp; Hoshangabad &nbsp;</option>
                  <option value="Indore">&nbsp; Indore &nbsp;</option>
                  <option value="Jabalpur">&nbsp; Jabalpur &nbsp;</option>
                  <option value="Jhabua">&nbsp; Jhabua &nbsp;</option>
                  <option value="Katni">&nbsp; Katni &nbsp;</option>
                  <option value="Khandwa (East Nimar)">&nbsp; Khandwa (East Nimar) &nbsp;</option>
                  <option value="Khargone (West Nimar)">&nbsp; Khargone (West Nimar) &nbsp;</option>
                  <option value="Maihar">&nbsp; Maihar &nbsp;</option>
                  <option value="Mandla">&nbsp; Mandla &nbsp;</option>
                  <option value="Mandsaur">&nbsp; Mandsaur &nbsp;</option>
                  <option value="Morena">&nbsp; Morena &nbsp;</option>
                  <option value="Narsinghpur">&nbsp; Narsinghpur &nbsp;</option>
                  <option value="Nagda">&nbsp; Nagda &nbsp;</option>
                  <option value="Neemuch">&nbsp; Neemuch &nbsp;</option>
                  <option value="Niwari">&nbsp; Niwari &nbsp;</option>
                  <option value="Panna">&nbsp; Panna &nbsp;</option>
                  <option value="Raisen">&nbsp; Raisen &nbsp;</option>
                  <option value="Rajgarh">&nbsp; Rajgarh &nbsp;</option>
                  <option value="Ratlam">&nbsp; Ratlam &nbsp;</option>
                  <option value="Rewa">&nbsp; Rewa &nbsp;</option>
                  <option value="Sagar">&nbsp; Sagar &nbsp;</option>
                  <option value="Satna">&nbsp; Satna &nbsp;</option>
                  <option value="Sehore">&nbsp; Sehore &nbsp;</option>
                  <option value="Seoni">&nbsp; Seoni &nbsp;</option>
                  <option value="Shahdol">&nbsp; Shahdol &nbsp;</option>
                  <option value="Shajapur">&nbsp; Shajapur &nbsp;</option>
                  <option value="Sheopur">&nbsp; Sheopur &nbsp;</option>
                  <option value="Shivpuri">&nbsp; Shivpuri &nbsp;</option>
                  <option value="Sidhi">&nbsp; Sidhi &nbsp;</option>
                  <option value="Singrauli">&nbsp; Singrauli &nbsp;</option>
                  <option value="Tikamgarh">&nbsp; Tikamgarh &nbsp;</option>
                  <option value="Ujjain">&nbsp; Ujjain &nbsp;</option>
                  <option value="Umaria">&nbsp; Umaria &nbsp;</option>
                  <option value="Vidisha">&nbsp; Vidisha &nbsp;</option>
                </optgroup>

                <optgroup label="Maharashtra">
                  <option value="Ahmednagar">&nbsp; Ahmednagar &nbsp;</option>
                  <option value="Akola">&nbsp; Akola &nbsp;</option>
                  <option value="Amravati">&nbsp; Amravati &nbsp;</option>
                  <option value="Aurangabad">&nbsp; Aurangabad &nbsp;</option>
                  <option value="Beed">&nbsp; Beed &nbsp;</option>
                  <option value="Bhandara">&nbsp; Bhandara &nbsp;</option>
                  <option value="Buldhana">&nbsp; Buldhana &nbsp;</option>
                  <option value="Chandrapur">&nbsp; Chandrapur &nbsp;</option>
                  <option value="Dhule">&nbsp; Dhule &nbsp;</option>
                  <option value="Gadchiroli">&nbsp; Gadchiroli &nbsp;</option>
                  <option value="Gondia">&nbsp; Gondia &nbsp;</option>
                  <option value="Hingoli">&nbsp; Hingoli &nbsp;</option>
                  <option value="Jalgaon">&nbsp; Jalgaon &nbsp;</option>
                  <option value="Jalna">&nbsp; Jalna &nbsp;</option>
                  <option value="Kolhapur">&nbsp; Kolhapur &nbsp;</option>
                  <option value="Latur">&nbsp; Latur &nbsp;</option>
                  <option value="Mumbai City">&nbsp; Mumbai City &nbsp;</option>
                  <option value="Mumbai suburban">&nbsp; Mumbai suburban &nbsp;</option>
                  <option value="Nanded">&nbsp; Nanded &nbsp;</option>
                  <option value="Nandurbar">&nbsp; Nandurbar &nbsp;</option>
                  <option value="Nagpur">&nbsp; Nagpur &nbsp;</option>
                  <option value="Nashik">&nbsp; Nashik &nbsp;</option>
                  <option value="Osmanabad">&nbsp; Osmanabad &nbsp;</option>
                  <option value="Palghar">&nbsp; Palghar &nbsp;</option>
                  <option value="Parbhani">&nbsp; Parbhani &nbsp;</option>
                  <option value="Pune">&nbsp; Pune &nbsp;</option>
                  <option value="Raigad">&nbsp; Raigad &nbsp;</option>
                  <option value="Ratnagiri">&nbsp; Ratnagiri &nbsp;</option>
                  <option value="Sangli">&nbsp; Sangli &nbsp;</option>
                  <option value="Satara">&nbsp; Satara &nbsp;</option>
                  <option value="Sindhudurg">&nbsp; Sindhudurg &nbsp;</option>
                  <option value="Solapur">&nbsp; Solapur &nbsp;</option>
                  <option value="Thane">&nbsp; Thane &nbsp;</option>
                  <option value="Wardha">&nbsp; Wardha &nbsp;</option>
                  <option value="Washim">&nbsp; Washim &nbsp;</option>
                  <option value="Yavatmal">&nbsp; Yavatmal &nbsp;</option>
                </optgroup>

                 <optgroup label="Manipur">
                  <option value="Bishnupur">&nbsp; Bishnupur &nbsp;</option>
                  <option value="Chandel">&nbsp; Chandel &nbsp;</option>
                  <option value="Churachandpur">&nbsp; Churachandpur &nbsp;</option>
                  <option value="Imphal East">&nbsp; Imphal East &nbsp;</option>
                  <option value="Imphal West">&nbsp; Imphal West &nbsp;</option>
                  <option value="Jiribam">&nbsp; Jiribam &nbsp;</option>
                  <option value="Kakching">&nbsp; Kakching &nbsp;</option>
                  <option value="Kamjong">&nbsp; Kamjong &nbsp;</option>
                  <option value="Kangpokpi">&nbsp; Kangpokpi &nbsp;</option>
                  <option value="Noney">&nbsp; Noney &nbsp;</option>
                  <option value="Pherzawl">&nbsp; Pherzawl &nbsp;</option>
                  <option value="Senapati">&nbsp; Senapati &nbsp;</option>
                  <option value="Tamenglong">&nbsp; Tamenglong &nbsp;</option>
                  <option value="Tengnoupal">&nbsp; Tengnoupal &nbsp;</option>
                  <option value="Thoubal">&nbsp; Thoubal &nbsp;</option>
                  <option value="Ukhrul">&nbsp; Ukhrul &nbsp;</option>
                </optgroup>

                <optgroup label="Meghalaya">
                  <option value="East Garo Hills">&nbsp; East Garo Hills &nbsp;</option>
                  <option value="East Khasi Hills">&nbsp; East Khasi Hills &nbsp;</option>
                  <option value="East Jaintia Hills">&nbsp; East Jaintia Hills &nbsp;</option>
                  <option value="North Garo Hills">&nbsp; North Garo Hills &nbsp;</option>
                  <option value="Ri Bhoi">&nbsp; Ri Bhoi &nbsp;</option>
                  <option value="South Garo Hills">&nbsp; South Garo Hills &nbsp;</option>
                  <option value="South West Garo Hills">&nbsp; South West Garo Hills &nbsp;</option>
                  <option value="South West Khasi Hills">&nbsp; South West Khasi Hills &nbsp;</option>
                  <option value="West Jaintia Hills">&nbsp; West Jaintia Hills &nbsp;</option>
                  <option value="West Garo Hills">&nbsp; West Garo Hills &nbsp;</option>
                  <option value="West Khasi Hills">&nbsp; West Khasi Hills &nbsp;</option>
                </optgroup>

                <optgroup label="Mizoram">
                  <option value="Aizawl">&nbsp; Aizawl &nbsp;</option>
                  <option value="Champhai">&nbsp; Champhai &nbsp;</option>
                  <option value="Hnahthial">&nbsp; Hnahthial &nbsp;</option>
                  <option value="Khawzawl">&nbsp; Khawzawl &nbsp;</option>
                  <option value="Kolasib">&nbsp; Kolasib &nbsp;</option>
                  <option value="Lawngtlai">&nbsp; Lawngtlai &nbsp;</option>
                  <option value="Lunglei">&nbsp; Lunglei &nbsp;</option>
                  <option value="Mamit">&nbsp; Mamit &nbsp;</option>
                  <option value="Saiha">&nbsp; Saiha &nbsp;</option>
                  <option value="Saitual">&nbsp; Saitual &nbsp;</option>
                  <option value="Serchhip">&nbsp; Serchhip &nbsp;</option>
                </optgroup>

                <optgroup label="Nagaland">
                  <option value="Dimapur">&nbsp; Dimapur &nbsp;</option>
                  <option value="Kiphire">&nbsp; Kiphire &nbsp;</option>
                  <option value="Kohima">&nbsp; Kohima &nbsp;</option>
                  <option value="Longleng">&nbsp; Longleng &nbsp;</option>
                  <option value="Mokokchung">&nbsp; Mokokchung &nbsp;</option>
                  <option value="Mon">&nbsp; Mon &nbsp;</option>
                  <option value="Noklak">&nbsp; Noklak &nbsp;</option>
                  <option value="Peren">&nbsp; Peren &nbsp;</option>
                  <option value="Phek">&nbsp; Phek &nbsp;</option>
                  <option value="Tuensang">&nbsp; Tuensang &nbsp;</option>
                  <option value="Wokha">&nbsp; Wokha &nbsp;</option>
                  <option value="Zunheboto">&nbsp; Zunheboto &nbsp;</option>
                </optgroup>  

                <optgroup label="Odisha">
                  <option value="Angul">&nbsp; Angul &nbsp;</option>
                  <option value="Boudh (Bauda)">&nbsp; Boudh (Bauda) &nbsp;</option>
                  <option value="Bhadrak">&nbsp; Bhadrak &nbsp;</option>
                  <option value="Balangir">&nbsp; Balangir &nbsp;</option>
                  <option value="Bargarh (Baragarh)">&nbsp; Bargarh (Baragarh) &nbsp;</option>
                  <option value="Balasore">&nbsp; Balasore &nbsp;</option>
                  <option value="Cuttack">&nbsp; Cuttack &nbsp;</option>
                  <option value="Debagarh (Deogarh)">&nbsp; Debagarh (Deogarh) &nbsp;</option>
                  <option value="Dhenkanal">&nbsp; Dhenkanal &nbsp;</option>
                  <option value="Ganjam">&nbsp; Ganjam &nbsp;</option>
                  <option value="Gajapati">&nbsp; Gajapati &nbsp;</option>
                  <option value="Jharsuguda">&nbsp; Jharsuguda &nbsp;</option>
                  <option value="Jajpur">&nbsp; Jajpur &nbsp;</option>
                  <option value="Jagatsinghpur">&nbsp; Jagatsinghpur &nbsp;</option>
                  <option value="Khordha">&nbsp; Khordha &nbsp;</option>
                  <option value="Kendujhar (Keonjhar)">&nbsp; Kendujhar (Keonjhar) &nbsp;</option>
                  <option value="Kalahandi">&nbsp; Kalahandi &nbsp;</option>
                  <option value="Kandhamal">&nbsp; Kandhamal &nbsp;</option>
                  <option value="Koraput">&nbsp; Koraput &nbsp;</option>
                  <option value="Kendrapara">&nbsp; Kendrapara &nbsp;</option>
                  <option value="Malkangiri">&nbsp; Malkangiri &nbsp;</option>
                  <option value="Mayurbhanj">&nbsp; Mayurbhanj &nbsp;</option>
                  <option value="Nabarangpur">&nbsp; Nabarangpur &nbsp;</option>
                  <option value="Nuapada">&nbsp; Nuapada &nbsp;</option>
                  <option value="Nayagarh">&nbsp; Nayagarh &nbsp;</option>
                  <option value="Puri">&nbsp; Puri &nbsp;</option>
                  <option value="Rayagada">&nbsp; Rayagada &nbsp;</option>
                  <option value="Sambalpur">&nbsp; Sambalpur &nbsp;</option>
                  <option value="Subarnapur (Sonepur)">&nbsp; Subarnapur (Sonepur) &nbsp;</option>
                  <option value="Sundargarh">&nbsp; Sundargarh &nbsp;</option>
                </optgroup>


                <optgroup label="Punjab">
                  <option value="Amritsar">&nbsp; Amritsar &nbsp;</option>
                  <option value="Barnala">&nbsp; Barnala &nbsp;</option>
                  <option value="Bathinda">&nbsp; Bathinda &nbsp;</option>
                  <option value="Firozpur">&nbsp; Firozpur &nbsp;</option>
                  <option value="Faridkot">&nbsp; Faridkot &nbsp;</option>
                  <option value="Fatehgarh Sahib">&nbsp; Fatehgarh Sahib &nbsp;</option>
                  <option value="Fazilka">&nbsp; Fazilka &nbsp;</option>
                  <option value="Gurdaspur">&nbsp; Gurdaspur &nbsp;</option>
                  <option value="Hoshiarpur">&nbsp; Hoshiarpur &nbsp;</option>
                  <option value="Jalandhar">&nbsp; Jalandhar &nbsp;</option>
                  <option value="Kapurthala">&nbsp; Kapurthala &nbsp;</option>
                  <option value="Ludhiana">&nbsp; Ludhiana &nbsp;</option>
                  <option value="Mansa">&nbsp; Mansa &nbsp;</option>
                  <option value="Moga">&nbsp; Moga &nbsp;</option>
                  <option value="Sri Muktsar Sahib">&nbsp; Sri Muktsar Sahib &nbsp;</option>
                  <option value="Pathankot">&nbsp; Pathankot &nbsp;</option>
                  <option value="Patiala">&nbsp; Patiala &nbsp;</option>
                  <option value="Rupnagar">&nbsp; Rupnagar &nbsp;</option>
                  <option value="Sahibzada Ajit Singh Nagar">&nbsp; Sahibzada Ajit Singh Nagar &nbsp;</option>
                  <option value="Sangrur">&nbsp; Sangrur &nbsp;</option>
                  <option value="Shahid Bhagat Singh Nagar">&nbsp; Shahid Bhagat Singh Nagar &nbsp;</option>
                  <option value="Tarn Taran">&nbsp; Tarn Taran &nbsp;</option>
                </optgroup>  

                <optgroup label="Rajasthan">
                  <option value="Ajmer">&nbsp; Ajmer &nbsp;</option>
                  <option value="Alwar">&nbsp; Alwar &nbsp;</option>
                  <option value="Bikaner">&nbsp; Bikaner &nbsp;</option>
                  <option value="Barmer">&nbsp; Barmer &nbsp;</option>
                  <option value="Banswara">&nbsp; Banswara &nbsp;</option>
                  <option value="Bharatpur">&nbsp; Bharatpur &nbsp;</option>
                  <option value="Baran">&nbsp; Baran &nbsp;</option>
                  <option value="Bundi">&nbsp; Bundi &nbsp;</option>
                  <option value="Bhilwara">&nbsp; Bhilwara &nbsp;</option>
                  <option value="Churu">&nbsp; Churu &nbsp;</option>
                  <option value="Chittorgarh">&nbsp; Chittorgarh &nbsp;</option>
                  <option value="Dausa">&nbsp; Dausa &nbsp;</option>
                  <option value="Dholpur">&nbsp; Dholpur &nbsp;</option>
                  <option value="Dungarpur">&nbsp; Dungarpur &nbsp;</option>
                  <option value="Ganganagar">&nbsp; Ganganagar &nbsp;</option>
                  <option value="Hanumangarh">&nbsp; Hanumangarh &nbsp;</option>
                  <option value="Jhunjhunu">&nbsp; Jhunjhunu &nbsp;</option>
                  <option value="Jalore">&nbsp; Jalore &nbsp;</option>
                  <option value="Jodhpur">&nbsp; Jodhpur &nbsp;</option>
                  <option value="Jaipur">&nbsp; Jaipur &nbsp;</option>
                  <option value="Jaisalmer">&nbsp; Jaisalmer &nbsp;</option>
                  <option value="Jhalawar">&nbsp; Jhalawar &nbsp;</option>
                  <option value="Karauli">&nbsp; Karauli &nbsp;</option>
                  <option value="Kota">&nbsp; Kota &nbsp;</option>
                  <option value="Nagaur">&nbsp; Nagaur &nbsp;</option>
                  <option value="Pali">&nbsp; Pali &nbsp;</option>
                  <option value="Pratapgarh">&nbsp; Pratapgarh &nbsp;</option>
                  <option value="Rajsamand">&nbsp; Rajsamand &nbsp;</option>
                  <option value="Sikar">&nbsp; Sikar &nbsp;</option>
                  <option value="Sawai Madhopur">&nbsp; Sawai Madhopur &nbsp;</option>
                  <option value="Sirohi">&nbsp; Sirohi &nbsp;</option>
                  <option value="Tonk">&nbsp; Tonk &nbsp;</option>
                  <option value="Udaipur">&nbsp; Udaipur &nbsp;</option>
                </optgroup>

                <optgroup label="Sikkim">
                  <option value="East Sikkim">&nbsp; East Sikkim &nbsp;</option>
                  <option value="North Sikkim">&nbsp; North Sikkim &nbsp;</option>
                  <option value="South Sikkim">&nbsp; South Sikkim &nbsp;</option>
                  <option value="West Sikkim">&nbsp; West Sikkim &nbsp;</option>
                </optgroup>

                <optgroup label="Tamil Nadu">
                  <option value="Ariyalur">&nbsp; Ariyalur &nbsp;</option>
                  <option value="Chengalpattu">&nbsp; Chengalpattu &nbsp;</option>
                  <option value="Chennai">&nbsp; Chennai &nbsp;</option>
                  <option value="Coimbatore">&nbsp; Coimbatore &nbsp;</option>
                  <option value="Cuddalore">&nbsp; Cuddalore &nbsp;</option>
                  <option value="Dharmapuri">&nbsp; Dharmapuri &nbsp;</option>
                  <option value="Dindigul">&nbsp; Dindigul &nbsp;</option>
                  <option value="Erode">&nbsp; Erode &nbsp;</option>
                  <option value="Kallakurichi">&nbsp; Kallakurichi &nbsp;</option>
                  <option value="Kanchipuram">&nbsp; Kanchipuram &nbsp;</option>
                  <option value="Kanyakumari">&nbsp; Kanyakumari &nbsp;</option>
                  <option value="Karur">&nbsp; Karur &nbsp;</option>
                  <option value="Krishnagiri">&nbsp; Krishnagiri &nbsp;</option>
                  <option value="Madurai">&nbsp; Madurai &nbsp;</option>
                  <option value="Mayiladuthurai">&nbsp; Mayiladuthurai &nbsp;</option>
                  <option value="Nagapattinam">&nbsp; Nagapattinam &nbsp;</option>
                  <option value="Nilgiris">&nbsp; Nilgiris &nbsp;</option>
                  <option value="Namakkal">&nbsp; Namakkal &nbsp;</option>
                  <option value="Perambalur">&nbsp; Perambalur &nbsp;</option>
                  <option value="Pudukkottai">&nbsp; Pudukkottai &nbsp;</option>
                  <option value="Ramanathapuram">&nbsp; Ramanathapuram &nbsp;</option>
                  <option value="Ranipet">&nbsp; Ranipet &nbsp;</option>
                  <option value="Salem">&nbsp; Salem &nbsp;</option>
                  <option value="Sivaganga">&nbsp; Sivaganga &nbsp;</option>
                  <option value="Tenkasi">&nbsp; Tenkasi &nbsp;</option>
                  <option value="Tirupur">&nbsp; Tirupur &nbsp;</option>
                  <option value="Tiruchirappalli">&nbsp; Tiruchirappalli &nbsp;</option>
                  <option value="Theni">&nbsp; Theni &nbsp;</option>
                  <option value="Tirunelveli">&nbsp; Tirunelveli &nbsp;</option>
                  <option value="Thanjavur">&nbsp; Thanjavur &nbsp;</option>
                  <option value="Thoothukudi">&nbsp; Thoothukudi &nbsp;</option>
                  <option value="Tirupattur">&nbsp; Tirupattur &nbsp;</option>
                  <option value="Tiruvallur">&nbsp; Tiruvallur &nbsp;</option>
                  <option value="Tiruvarur">&nbsp; Tiruvarur &nbsp;</option>
                  <option value="Tiruvannamalai">&nbsp; Tiruvannamalai &nbsp;</option>
                  <option value="Vellore">&nbsp; Vellore &nbsp;</option>
                  <option value="Viluppuram">&nbsp; Viluppuram &nbsp;</option>
                  <option value="Virudhunagar">&nbsp; Virudhunagar &nbsp;</option>
                </optgroup>

                <optgroup label="Telangana">
                  <option value="Adilabad">&nbsp; Adilabad &nbsp;</option>
                  <option value="Komaram Bheem">&nbsp; Komaram Bheem &nbsp;</option>
                  <option value="Bhadradri Kothagudem">&nbsp; Bhadradri Kothagudem &nbsp;</option>
                  <option value="Hyderabad">&nbsp; Hyderabad &nbsp;</option>
                  <option value="Jagtial">&nbsp; Jagtial &nbsp;</option>
                  <option value="Jangaon">&nbsp; Jangaon &nbsp;</option>
                  <option value="Jayashankar Bhupalpally">&nbsp; Jayashankar Bhupalpally &nbsp;</option>
                  <option value="Jogulamba Gadwal">&nbsp; Jogulamba Gadwal &nbsp;</option>
                  <option value="Kamareddy">&nbsp; Kamareddy &nbsp;</option>
                  <option value="Karimnagar">&nbsp; Karimnagar &nbsp;</option>
                  <option value="Khammam">&nbsp; Khammam &nbsp;</option>
                  <option value="Mahabubabad">&nbsp; Mahabubabad &nbsp;</option>
                  <option value="Mahbubnagar">&nbsp; Mahbubnagar &nbsp;</option>
                  <option value="Mancherial">&nbsp; Mancherial &nbsp;</option>
                  <option value="Medak">&nbsp; Medak &nbsp;</option>
                  <option value="Medchal-Malkajgiri">&nbsp; Medchal-Malkajgiri &nbsp;</option>
                  <option value="Mulugu">&nbsp; Mulugu &nbsp;</option>
                  <option value="Nalgonda">&nbsp; Nalgonda &nbsp;</option>
                  <option value="Narayanpet">&nbsp; Narayanpet &nbsp;</option>
                  <option value="Nagarkurnool">&nbsp; Nagarkurnool &nbsp;</option>
                  <option value="Nirmal">&nbsp; Nirmal &nbsp;</option>
                  <option value="Nizamabad">&nbsp; Nizamabad &nbsp;</option>
                  <option value="Peddapalli">&nbsp; Peddapalli &nbsp;</option>
                  <option value="Rajanna Sircilla">&nbsp; Rajanna Sircilla &nbsp;</option>
                  <option value="Ranga Reddy">&nbsp; Ranga Reddy &nbsp;</option>
                  <option value="Sangareddy">&nbsp; Sangareddy &nbsp;</option>
                  <option value="Siddipet">&nbsp; Siddipet &nbsp;</option>
                  <option value="Suryapet">&nbsp; Suryapet &nbsp;</option>
                  <option value="Vikarabad">&nbsp; Vikarabad &nbsp;</option>
                  <option value="Wanaparthy">&nbsp; Wanaparthy &nbsp;</option>
                  <option value="Warangal Urban">&nbsp; Warangal Urban &nbsp;</option>
                  <option value="Warangal Rural">&nbsp; Warangal Rural &nbsp;</option>
                  <option value="Yadadri Bhuvanagiri">&nbsp; Yadadri Bhuvanagiri &nbsp;</option>
                </optgroup>

                <optgroup label="Tripura">
                  <option value="Dhalai">&nbsp; Dhalai &nbsp;</option>
                  <option value="Gomati">&nbsp; Gomati &nbsp;</option>
                  <option value="Khowai">&nbsp; Khowai &nbsp;</option>
                  <option value="North Tripura">&nbsp; North Tripura &nbsp;</option>
                  <option value="Sepahijala">&nbsp; Sepahijala &nbsp;</option>
                  <option value="South Tripura">&nbsp; South Tripura &nbsp;</option>
                  <option value="Unokoti">&nbsp; Unokoti &nbsp;</option>
                  <option value="West Tripura">&nbsp; West Tripura &nbsp;</option>
                </optgroup>

                <optgroup label="Uttar Pradesh">
                  <option value="Agra">&nbsp; Agra &nbsp;</option>
                  <option value="Aligarh">&nbsp; Aligarh &nbsp;</option>
                  <option value="Allahabad">&nbsp; Allahabad &nbsp;</option>
                  <option value="Ambedkar Nagar">&nbsp; Ambedkar Nagar &nbsp;</option>
                  <option value="Amethi">&nbsp; Amethi &nbsp;</option>
                  <option value="Amroha">&nbsp; Amroha &nbsp;</option>
                  <option value="Auraiya">&nbsp; Auraiya &nbsp;</option>
                  <option value="Azamgarh">&nbsp; Azamgarh &nbsp;</option>
                  <option value="Bagpat">&nbsp; Bagpat &nbsp;</option>
                  <option value="Bahraich">&nbsp; Bahraich &nbsp;</option>
                  <option value="Ballia">&nbsp; Ballia &nbsp;</option>
                  <option value="Balrampur">&nbsp; Balrampur &nbsp;</option>
                  <option value="Banda">&nbsp; Banda &nbsp;</option>
                  <option value="Barabanki">&nbsp; Barabanki &nbsp;</option>
                  <option value="Bareilly">&nbsp; Bareilly &nbsp;</option>
                  <option value="Basti">&nbsp; Basti &nbsp;</option>
                  <option value="Bhadohi">&nbsp; Bhadohi &nbsp;</option>
                  <option value="Bijnor">&nbsp; Bijnor &nbsp;</option>
                  <option value="Budaun">&nbsp; Budaun &nbsp;</option>
                  <option value="Bulandshahr">&nbsp; Bulandshahr &nbsp;</option>
                  <option value="Chandauli">&nbsp; Chandauli &nbsp;</option>
                  <option value="Chitrakoot">&nbsp; Chitrakoot &nbsp;</option>
                  <option value="Deoria">&nbsp; Deoria &nbsp;</option>
                  <option value="Etah">&nbsp; Etah &nbsp;</option>
                  <option value="Etawah">&nbsp; Etawah &nbsp;</option>
                  <option value="Faizabad">&nbsp; Faizabad &nbsp;</option>
                  <option value="Farrukhabad">&nbsp; Farrukhabad &nbsp;</option>
                  <option value="Fatehpur">&nbsp; Fatehpur &nbsp;</option>
                  <option value="Firozabad">&nbsp; Firozabad &nbsp;</option>
                  <option value="Gautam Buddh Nagar">&nbsp; Gautam Buddh Nagar &nbsp;</option>
                  <option value="Ghaziabad">&nbsp; Ghaziabad &nbsp;</option>
                  <option value="Ghazipur">&nbsp; Ghazipur &nbsp;</option>
                  <option value="Gonda">&nbsp; Gonda &nbsp;</option>
                  <option value="Gorakhpur">&nbsp; Gorakhpur &nbsp;</option>
                  <option value="Hamirpur">&nbsp; Hamirpur &nbsp;</option>
                  <option value="Hapur">&nbsp; Hapur &nbsp;</option>
                  <option value="Hardoi">&nbsp; Hardoi &nbsp;</option>
                  <option value="Hathras">&nbsp; Hathras &nbsp;</option>
                  <option value="Jalaun">&nbsp; Jalaun &nbsp;</option>
                  <option value="Jaunpur">&nbsp; Jaunpur &nbsp;</option>
                  <option value="Jhansi">&nbsp; Jhansi &nbsp;</option>
                  <option value="Kannauj">&nbsp; Kannauj &nbsp;</option>
                  <option value="Kanpur Dehat">&nbsp; Kanpur Dehat &nbsp;</option>
                  <option value="Kanpur Nagar">&nbsp; Kanpur Nagar &nbsp;</option>
                  <option value="Kasganj">&nbsp; Kasganj &nbsp;</option>
                  <option value="Kaushambi">&nbsp; Kaushambi &nbsp;</option>
                  <option value="Kushinagar">&nbsp; Kushinagar &nbsp;</option>
                  <option value="Lakhimpur Kheri">&nbsp; Lakhimpur Kheri &nbsp;</option>
                  <option value="Lalitpur">&nbsp; Lalitpur &nbsp;</option>
                  <option value="Lucknow">&nbsp; Lucknow &nbsp;</option>
                  <option value="Maharajganj">&nbsp; Maharajganj &nbsp;</option>
                  <option value="Mahoba">&nbsp; Mahoba &nbsp;</option>
                  <option value="Mainpuri">&nbsp; Mainpuri &nbsp;</option>
                  <option value="Mathura">&nbsp; Mathura &nbsp;</option>
                  <option value="Mau">&nbsp; Mau &nbsp;</option>
                  <option value="Meerut">&nbsp; Meerut &nbsp;</option>
                  <option value="Mirzapur">&nbsp; Mirzapur &nbsp;</option>
                  <option value="Moradabad">&nbsp; Moradabad &nbsp;</option>
                  <option value="Muzaffarnagar">&nbsp; Muzaffarnagar &nbsp;</option>
                  <option value="Pilibhit">&nbsp; Pilibhit &nbsp;</option>
                  <option value="Pratapgarh">&nbsp; Pratapgarh &nbsp;</option>
                  <option value="Raebareli">&nbsp; Raebareli &nbsp;</option>
                  <option value="Rampur">&nbsp; Rampur &nbsp;</option>
                  <option value="Saharanpur">&nbsp; Saharanpur &nbsp;</option>
                  <option value="Sambhal">&nbsp; Sambhal &nbsp;</option>
                  <option value="Sant Kabir Nagar">&nbsp; Sant Kabir Nagar &nbsp;</option>
                  <option value="Shahjahanpur">&nbsp; Shahjahanpur &nbsp;</option>
                  <option value="Shamli">&nbsp; Shamli &nbsp;</option>
                  <option value="Shravasti">&nbsp; Shravasti &nbsp;</option>
                  <option value="Siddharthnagar">&nbsp; Siddharthnagar &nbsp;</option>
                  <option value="Sitapur">&nbsp; Sitapur &nbsp;</option>
                  <option value="Sonbhadra">&nbsp; Sonbhadra &nbsp;</option>
                  <option value="Sultanpur">&nbsp; Sultanpur &nbsp;</option>
                  <option value="Unnao">&nbsp; Unnao &nbsp;</option>
                  <option value="Varanasi">&nbsp; Varanasi &nbsp;</option>
                </optgroup>

                <optgroup label="Uttarakhand">
                  <option value="Almora">&nbsp; Almora &nbsp;</option>
                  <option value="Bageshwar">&nbsp; Bageshwar &nbsp;</option>
                  <option value="Chamoli">&nbsp; Chamoli &nbsp;</option>
                  <option value="Champawat">&nbsp; Champawat &nbsp;</option>
                  <option value="Dehradun">&nbsp; Dehradun &nbsp;</option>
                  <option value="Haridwar">&nbsp; Haridwar &nbsp;</option>
                  <option value="Nainital">&nbsp; Nainital &nbsp;</option>
                  <option value="Pauri Garhwal">&nbsp; Pauri Garhwal &nbsp;</option>
                  <option value="Pithoragarh">&nbsp; Pithoragarh &nbsp;</option>
                  <option value="Rudraprayag">&nbsp; Rudraprayag &nbsp;</option>
                  <option value="Tehri Garhwal">&nbsp; Tehri Garhwal &nbsp;</option>
                  <option value="Udham Singh Nagar">&nbsp; Udham Singh Nagar &nbsp;</option>
                  <option value="Uttarkashi">&nbsp; Uttarkashi &nbsp;</option>
                </optgroup>

                <optgroup label="West Bengal">
                  <option value="Alipurduar">&nbsp; Alipurduar &nbsp;</option>
                  <option value="Bankura">&nbsp; Bankura &nbsp;</option>
                  <option value="Paschim Bardhaman">&nbsp; Paschim Bardhaman &nbsp;</option>
                  <option value="Purba Bardhaman">&nbsp; Purba Bardhaman &nbsp;</option>
                  <option value="Birbhum">&nbsp; Birbhum &nbsp;</option>
                  <option value="Cooch Behar">&nbsp; Cooch Behar &nbsp;</option>
                  <option value="Dakshin Dinajpur">&nbsp; Dakshin Dinajpur &nbsp;</option>
                  <option value="Darjeeling">&nbsp; Darjeeling &nbsp;</option>
                  <option value="Hooghly">&nbsp; Hooghly &nbsp;</option>
                  <option value="Howrah">&nbsp; Howrah &nbsp;</option>
                  <option value="Jalpaiguri">&nbsp; Jalpaiguri &nbsp;</option>
                  <option value="Jhargram">&nbsp; Jhargram &nbsp;</option>
                  <option value="Kalimpong">&nbsp; Kalimpong &nbsp;</option>
                  <option value="Kolkata">&nbsp; Kolkata &nbsp;</option>
                  <option value="Maldah">&nbsp; Maldah &nbsp;</option>
                  <option value="Murshidabad">&nbsp; Murshidabad &nbsp;</option>
                  <option value="Nadia">&nbsp; Nadia &nbsp;</option>
                  <option value="North 24 Parganas">&nbsp; North 24 Parganas &nbsp;</option>
                  <option value="Paschim Medinipur">&nbsp; Paschim Medinipur &nbsp;</option>
                  <option value="Purba Medinipur">&nbsp; Purba Medinipur &nbsp;</option>
                  <option value="Purulia">&nbsp; Purulia &nbsp;</option>
                  <option value="South 24 Parganas">&nbsp; South 24 Parganas &nbsp;</option>
                  <option value="Uttar Dinajpur">&nbsp; Uttar Dinajpur &nbsp;</option>
                </optgroup>

                <optgroup label="Andaman and Nicobar Islands">
                  <option value="Nicobar">&nbsp; Nicobar &nbsp;</option>
                  <option value="North and Middle Andaman">&nbsp; North and Middle Andaman &nbsp;</option>
                  <option value="South Andaman">&nbsp; South Andaman &nbsp;</option>
                </optgroup>

                <optgroup label="Chandigarh">
                  <option value="Chandigarh">&nbsp; Chandigarh &nbsp;</option>
                </optgroup>

                <optgroup label="Dadra and Nagar Haveli and Daman and Diu">
                  <option value="Daman">&nbsp; Daman &nbsp;</option>
                  <option value="Diu">&nbsp; Diu &nbsp;</option>
                  <option value="Dadra and Nagar Haveli">&nbsp; Dadra and Nagar Haveli &nbsp;</option>
                </optgroup>

                <optgroup label="Jammu and Kashmir">
                  <option value="Anantnag">&nbsp; Anantnag &nbsp;</option>
                  <option value="Bandipora">&nbsp; Bandipora &nbsp;</option>
                  <option value="Baramulla">&nbsp; Baramulla &nbsp;</option>
                  <option value="Badgam">&nbsp; Badgam &nbsp;</option>
                  <option value="Doda">&nbsp; Doda &nbsp;</option>
                  <option value="Ganderbal">&nbsp; Ganderbal &nbsp;</option>
                  <option value="Jammu">&nbsp; Jammu &nbsp;</option>
                  <option value="Kathua">&nbsp; Kathua &nbsp;</option>
                  <option value="Kishtwar">&nbsp; Kishtwar &nbsp;</option>
                  <option value="Kulgam">&nbsp; Kulgam &nbsp;</option>
                  <option value="Kupwara">&nbsp; Kupwara &nbsp;</option>
                  <option value="Poonch">&nbsp; Poonch &nbsp;</option>
                  <option value="Pulwama">&nbsp; Pulwama &nbsp;</option>
                  <option value="Rajouri">&nbsp; Rajouri &nbsp;</option>
                  <option value="Ramban">&nbsp; Ramban &nbsp;</option>
                  <option value="Reasi">&nbsp; Reasi &nbsp;</option>
                  <option value="Samba">&nbsp; Samba &nbsp;</option>
                  <option value="Shopian">&nbsp; Shopian &nbsp;</option>
                  <option value="Srinagar">&nbsp; Srinagar &nbsp;</option>
                  <option value="Udhampur">&nbsp; Udhampur &nbsp;</option>
                </optgroup>

                <optgroup label="Ladakh">
                  <option value="Kargil">&nbsp; Kargil &nbsp;</option>
                  <option value="Leh">&nbsp; Leh &nbsp;</option>
                </optgroup>

                <optgroup label="Lakshadweep">
                  <option value="Lakshadweep">&nbsp; Lakshadweep &nbsp;</option>
                </optgroup>

                <optgroup label="Delhi">
                  <option value="Central Delhi">&nbsp; Central Delhi &nbsp;</option>
                  <option value="East Delhi">&nbsp; East Delhi &nbsp;</option>
                  <option value="New Delhi">&nbsp; New Delhi &nbsp;</option>
                  <option value="North Delhi">&nbsp; North Delhi &nbsp;</option>
                  <option value="North East Delhi">&nbsp; North East Delhi &nbsp;</option>
                  <option value="North West Delhi">&nbsp; North West Delhi &nbsp;</option>
                  <option value="Shahdara">&nbsp; Shahdara &nbsp;</option>
                  <option value="South Delhi">&nbsp; South Delhi &nbsp;</option>
                  <option value="South East Delhi">&nbsp; South East Delhi &nbsp;</option>
                  <option value="South West Delhi">&nbsp; South West Delhi &nbsp;</option>
                  <option value="West Delhi">&nbsp; West Delhi &nbsp;</option>
                </optgroup>


                <optgroup label="Puducherry ">
                  <option value="Karaikal">&nbsp; Karaikal &nbsp;</option>
                  <option value="Mahé">&nbsp; Mahé &nbsp;</option>
                  <option value="Puducherry">&nbsp; Puducherry &nbsp;</option>
                  <option value="Yanam">&nbsp; Yanam &nbsp;</option>
                </optgroup>




               
            </select>
            <p className="ecity"> &nbsp; City<span style={{color:'red'}}> *</span> &nbsp; </p>
            
            
            <select name="state" className="state" id="state" required onChange={this.myChangeHandler} value={this.state.state}>
                <option value="" disabled>Select</option>
                <optgroup label="State">
                <option value="Andhra Pradesh">&nbsp; Andhra Pradesh &nbsp;</option>
                <option value="Arunachal Pradesh">&nbsp; Arunachal Pradesh &nbsp;</option>
                <option value="Assam">&nbsp; Assam &nbsp;</option>
                <option value="Bihar">&nbsp; Bihar &nbsp;</option>
                <option value="Chhattisgarh">&nbsp; Chhattisgarh &nbsp;</option>
                <option value="Goa">&nbsp; Goa &nbsp;</option>
                <option value="Gujarat">&nbsp; Gujarat &nbsp;</option>
                <option value="Haryana">&nbsp; Haryana &nbsp;</option>
                <option value="Himachal Pradesh">&nbsp; Himachal Pradesh &nbsp;</option>
                <option value="Jharkhand">&nbsp; Jharkhand &nbsp;</option>
                <option value="Karnataka">&nbsp; Karnataka &nbsp;</option>
                <option value="Kerala">&nbsp; Kerala &nbsp;</option>
                <option value="Madhya Pradesh">&nbsp; Madhya Pradesh &nbsp;</option>
                <option value="Maharashtra">&nbsp; Maharashtra &nbsp;</option>
                <option value="Manipur">&nbsp; Manipur &nbsp;</option>
                <option value="Meghalaya">&nbsp; Meghalaya &nbsp;</option>
                <option value="Mizoram">&nbsp; Mizoram &nbsp;</option>
                <option value="Nagaland">&nbsp; Nagaland &nbsp;</option>
                <option value="Odisha">&nbsp; Odisha &nbsp;</option>
                <option value="Punjab">&nbsp; Punjab &nbsp;</option>
                <option value="Rajasthan">&nbsp; Rajasthan &nbsp;</option>
                <option value="Sikkim">&nbsp; Sikkim &nbsp;</option>
                <option value="Tamil Nadu">&nbsp; Tamil Nadu &nbsp;</option>
                <option value="Telangana">&nbsp; Telangana &nbsp;</option>
                <option value="Tripura">&nbsp; Tripura &nbsp;</option>
                <option value="Uttar Pradesh">&nbsp; Uttar Pradesh &nbsp;</option>
                <option value="Uttarakhand">&nbsp; Uttarakhand &nbsp;</option>
                <option value="West Bengal">&nbsp; West Bengal &nbsp;</option>
                </optgroup>
                <optgroup label="Union Territories">
                <option value="Andaman and Nicobar Islands">&nbsp; Andaman and Nicobar Islands &nbsp;</option>
                <option value="Chandigarh">&nbsp; Chandigarh &nbsp;</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">&nbsp; Dadra and Nagar Haveli and Daman and Diu &nbsp;</option>
                <option value="Jammu and Kashmir">&nbsp; Jammu and Kashmir &nbsp;</option>
                <option value="Ladakh">&nbsp; Ladakh &nbsp;</option>
                <option value="Lakshadweep">&nbsp; Lakshadweep &nbsp;</option>
                <option value="Delhi">&nbsp; Delhi &nbsp;</option>
                <option value="Puducherry">&nbsp; Puducherry &nbsp;</option>
                </optgroup>

                {/* <option value="Karnataka">&nbsp; Karnataka &nbsp;</option>
                <option value="Maharastra">&nbsp; Maharastra &nbsp;</option>
                <option value="Gujarat">&nbsp; Gujarat &nbsp;</option>
                <option value="New Delhi">&nbsp; New Delhi &nbsp;</option>
                <option value="Goa">&nbsp; Goa &nbsp;</option>
                <option value="Uttar Pradesh">&nbsp; Uttar Pradesh &nbsp;</option> */}
            </select>
            <p className="estate"> &nbsp; State<span style={{color:'red'}}> *</span> &nbsp; </p>


            <p className="terms"> &nbsp; Terms &amp; Conditions &nbsp; </p>
            
            
            <input type="checkbox" className="term1" name="term1" id="term1" required onChange={this.myChangeHandler} value={this.state.term1}></input>
            <p className="eterm1"> &nbsp; I agree to the T&amp;Cs<span style={{color:'red'}}> *</span> &nbsp; </p>
            
            <input type="checkbox" className="term2" name="term2" id="term2" onChange={(e) => this.checkinput(e)}></input>
            <p className="eterm2"> &nbsp; SignUp for our Newsletter &nbsp; </p>
            
            <button type="submit" class="rsubmit1">Submit</button>
            </form>
            <div className="footer1">
            <Footer/>
            </div>
        

        </div>
        
        
            
      
            );
    }
}
export default Registration;