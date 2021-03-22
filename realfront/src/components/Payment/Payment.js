import React from 'react';
import './Payment.css';
import {props} from 'react';
import ReactDOM from 'react-dom';

import {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import mastercard from './assets/mastercard.png';
import visacard from './assets/visacard.png';
import axios from 'axios';


import closeIcon from '../../assets/icons/close.png';
import { configConsumerProps } from 'antd/lib/config-provider';
import { getDefaultNormalizer } from '@testing-library/react';
import { useParams } from 'react-router';
import { Card } from 'antd';






 export class Payment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cname:"",
            cnum:"",
            expmonth:"",
            expyear:"",
            expdate:"",
            cvv:"",
            errormsg: "",
            errormsg2: "",
            errormsg3: "",
            errormsgcvv: "",
            errormsgexp:"",
            transaction:"",
            unit:"",
            floor:"",
            area:"",
            // currentDateTime: Date().toLocaleString(),
            // project_id:"5",
            Amount:"100",
            Cardholdername:"",
            loggedin:false,
            loggedinuseremail:"",
            loggedinusername:"",



        };
        this.handleSubmit = this.handleSubmit.bind(this);
      
    }

   


    handleSubmit = async (event) => {
       
        event.preventDefault();
        if(this.state.loggedinuseremail === ""){
            alert("Please Login First.")
        }
        else
        {
        let  Cardholdername = this.state.cname;
        let Email_ID = this.state.loggedinuseremail;
        let amt = this.state.Amount;
        let projid = this.props.project_id;
        console.log("card details");
        console.log(projid,amt,Email_ID,Cardholdername);

        let payment_status = await axios.post('https://www.propviewz.com/be/save_payment/', {     
                project_id:projid,
                name: Cardholdername,
                email: Email_ID,
                amount: amt
             });
        console.log("Payment Status");     
        console.log(payment_status);
        //  this.props.onHide();
        if(payment_status.data.Response === "Success"){
            this.props.onHide();
        }
        }
              
        
    }

    myHandlercname = (event) => {
        this.setState({ cname: event.target.value })
    }

    myHandlercnum = (event) => {
        let err='';
        let err2='';
        let err3='';
        let val = event.target.value;
        // let isvalid = true;
        var regexp = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
        var regexp2 = new RegExp("^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$");
        if(!Number(val)){
            err = <span className="alphaerr" style={{color: "#ef403c", fontFamily:"Catamaran"}}>Card Number cannot be in Alphabets!!!</span>
        }
        else{

        if ( !regexp.test(val) && !regexp2.test(val) ){
            err2 = <span className="invaliderr" style={{color: "#ef403c", fontFamily:"Catamaran"}}>Invalid Card, Enter a Valid Visa or Master Card!!!</span>
        }

        }
        
        this.setState({errormsg : err});
        this.setState({errormsg2: err2});
        this.setState({errormsg3: err3});
        this.setState({ cnum: event.target.value })
    }



    myHandlerexpdate = (event) => {
        let expval = event.target.value;
        let errexp = '';
        var regexpexp = new RegExp("^(0[1-9]|1[0-2]|[1-9])\/(1[4-9]|[2-9][0-9]|20[1-9][1-9])$");
        if(!regexpexp.test(expval)){
            errexp = <span className="dateerr" style={{color: "#ef403c", fontFamily:"Catamaran"}}>Enter a Valid Date!!!</span>
        }
        this.setState({errormsgexp: errexp})
        this.setState({ expdate: event.target.value })
    }

    myHandlercvv = (event) => {
        let errcvv='';
        let cvvval = event.target.value;
        var regexpcvv = new RegExp("^[0-9]{3}$");
        if(!regexpcvv.test(cvvval)){
            errcvv = <span className="cvverr" style={{color: "#ef403c", fontFamily:"Catamaran"}}>Enter a Valid CVV</span>
        }
        this.setState({errormsgcvv: errcvv})
        this.setState({ cvv: event.target.value })
    }

    myHandlertransaction = (event) => {
        this.setState({ transaction: event.target.value  })
    }

    myHandlerunit = (event) => {
        this.setState({unit: event.target.value  })
    }

    myHandlerfloor = (event) => {
        this.setState({ floor: event.target.value  })
    }

    myHandlerarea = (event) => {
        this.setState({ area: event.target.value  })
    }

    async componentWillMount(){

        console.log('PAYMENT DATA');
        // await this.transactiondetails();
    }

    transactiondetails = async () =>{
       
        // let  Cardholdername = this.state.cname;
        // let Email_ID = this.state.loggedinuseremail;
        // let amt = this.state.Amount;
        // let projid = this.props.project_id;
        // console.log("card details");
        // console.log(projid,amt,Email_ID,Cardholdername);
    //     await axios.post('https://www.propviewz.com/be/save_payment/', {     
    //     project_id:projid,
    //     name: Cardholdername,
    //     email: Email_ID,
    //     amount: amt
    //  });

    console.log('RESPONSE: SUCCESSFULL')
    // var axios = require('axios');
    // var data = JSON.stringify({"project_id":projid,"name":Cardholdername,"email":Email_ID,"amount":amt});
    
    // var config = {
    //   method: 'post',
    //   url: 'https://www.propviewz.com/be/save_payment/',
    //   data : data
    // };
    
    // axios(config)
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    }


    
    async componentDidMount(){
        console.log("Payment Console");
        this.setState({loggedin:localStorage.getItem("loggedin"), loggedinuseremail:localStorage.getItem("loggedInUseremail")?localStorage.getItem("loggedInUseremail"):"",loggedinusername:localStorage.getItem("loggedInUsername")})
        console.log("state values",this.state);
      }





      


    render(){
    

        console.log(this.state)
        console.log(this.props)
    
        console.log('Card Holder name is: ' + JSON.stringify(this.state.cname))
        console.log('Amount:' + JSON.stringify(this.state.Amount))

        console.log('Email_ID:' +JSON.stringify(this.state.loggedinuseremail))
        // console.log('Project_ID:' +JSON.stringify(projid))

        
        


      
        
        
        
    return (

        <Modal show={true}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation="true"
        >
            <Modal.Header className="headertxt">
                  </Modal.Header>
            <Modal.Body>
                
                <form onSubmit={this.handleSubmit}>
            <div className="paymentContainer divpyt">
            <img className="pytclosebtn" src={closeIcon} onClick={this.props.onHide}/>
                <div className="row paymentrow">
                <div class="col-75">
                 <div class="Pcontainer">

                 <div class="col-50">
                <h1 className="paymentheading1" style={{'text-align-last': 'center'}}>Make payment to see the Recent Transaction</h1>
                <h5 className="paymentheading5" style={{'text-align-last': 'center'}}>We accept the following payment methods</h5>
                
                <div class="icon-container">
                    
                    <i class="visa" style={{'color':'blue'}}>
                    <img src={visacard} alt="visacard" />
                    </i>

                    <i class="master" style={{'color':'navy'}}>
                    <img src={mastercard} alt="mastercard" />
                    </i>
                </div>
                <label className="Labelcname" for="cname">Name on Card</label>
                <input className="cname" type="text" id="cname" name="cname" placeholder="Ex. John M Doe" value={this.state.cname} required onChange={this.myHandlercname}  />
                
                {/* <label className="Labeldate" for="date">Current Date</label>
                <span style={{color: "#ef403c", fontFamily:"Catamaran",marginBottom: "30px",fontSize:"small"}}>{ this.state.currentDateTime } </span> */}


                <label className="Labelccnum" for="ccnum">Credit card number</label>
                <input className="ccnum" type="text" id="ccnum" name="ccnum" placeholder="0000 0000 0000 0000" value={this.state.cnum} required onChange={this.myHandlercnum}  />
                {this.state.errormsg}
                {this.state.errormsg2}
                {this.state.errormsg3}
                <br/>
                
        

                <div class="row paymentrow">

                    <div class="col-50">
                        <label className="Labelexpdate" for="expdate">Expiry Date</label>
                        <input className="expdate" type="text" id="expdate" name="expdate" placeholder="MM / YY" value={this.state.expdate} required onChange={this.myHandlerexpdate}/>
                        {this.state.errormsgexp}
                    </div> 
                    
  
                    <div class="col-50">
                        <label className="Labelcvv" for="cvv">CVV</label>
                        <input className="cvv" type="text" id="cvv" name="cvv" placeholder="000" value={this.state.cvv} required onChange={this.myHandlercvv}/>
                        {this.state.errormsgcvv}
                    </div>
                </div>
               
                <button className="Paymentbtn"  input type="submit" id="btn"><span className="btntxt"> Pay Securely</span> </button>
                
            </div> 
        </div>
    </div>
</div>

{/* Mobile view code starts here */}
<div className="Mobilepaymentcontainer Mobdivp">
                <img className="Mobilepytclosebtn" src={closeIcon} onClick={this.props.onHide}/>
                    <div className="row paymentrowmobile">
                        <div class="col-75">
                            <div class="PMobilecontainer">
                            <div class="col-50">
                                <h4 className="paymentheading4" style={{'text-align-last': 'center'}}>Make payment to see the Recent Transaction</h4>
                                <h6 className="paymentheading6" style={{'text-align-last': 'center'}}>We accept the following payment methods</h6>

                                    <div class="Mobileicon-container">
                    
                                    <i class="Mobilevisa" style={{'color':'blue'}}>
                                    <img src={visacard} alt="visacard"/>
                                    </i>

                                    <i class="Mobilemaster" style={{'color':'navy'}}>
                                    <img src={mastercard} alt="mastercard"/>
                                    </i>
                                    </div>

                                   
                                    <label className="Lcname" for="cname">Name on Card</label>
                                    <input className="Mobilecname" type="text" id="cname" name="cardname" placeholder="Ex. John M Doe" value={this.state.cname} required onChange={this.myHandlercname}/>

                                    {/* <label for="Ldate">Current Date</label>
                                    <span style={{color: "#ef403c", fontFamily:"Catamaran", fontSize: "15px"}}>{ this.state.currentDateTime } </span> */}

                                    {/* <label className="Lamount" for="Lamount">Amount</label>
                                    <span style={{color: "#ef403c", fontFamily:"Catamaran", fontSize: "15px"}}>{ this.state.rent_amount } </span> */}


                                    <label className="Lccnum"for="ccnum" >Credit card number</label>
                                    <input className="Mobileccnum" type="text" id="ccnum" name="cardnumber" placeholder="0000 0000 0000 0000" value={this.state.cnum}  required onChange={this.myHandlercnum}/>
                                    {this.state.errormsg}
                                    {this.state.errormsg2}
                                    {this.state.errormsg3}
                                    <div class="row paymentrowcol">
                                    <div class="col-50">
                                        <label className="Lexpdate" for="expdate">Expiry Date</label>
                                        <input className="Mobileexpdate" type="text" id="expdate" name="expdate" placeholder="MM / YYYY" value={this.state.expdate} required onChange={this.myHandlerexpdate}/>
                                        {this.state.errormsgexp}
                                        </div> 

                                        <div class="col-50">
                                        <label className="Lcvv" for="cvv">CVV</label>
                                        <input className="Mobilecvv" type="text" id="cvv" name="cvv" placeholder="000" value={this.state.cvv} required onChange={this.myHandlercvv}/>
                                        {this.state.errormsgcvv}
                                        </div>

                                    </div>


                                   
                                    <button className="Mobilebtn"  input type="submit" id="btn"><span className="Mobilebtntxt"> Pay Securely</span> </button>
                                    

                                    


                            </div>
                            
                            </div>
                            </div>
                        </div>
                    </div>

                    
</div>
</form>
       
        </Modal.Body>
        <Modal.Footer>

            </Modal.Footer>
        </Modal>
     
)
}  
}
export default Payment;