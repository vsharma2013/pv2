import React, { Component } from "react";
// import { response } from "express";
import axios from 'axios';

  
class linkedinredirect extends React.Component {
  constructor(props){
    super(props);
    this.state={
      
    }
 }


    linkedinresponse = async (id,name) => {
     
    let linkedinloginresponse = await axios.post('https://www.propviewz.com/be/ld/ld_login', {     
        id:name,
        name:id,
      });
      console.log("linkedin login response" , linkedinloginresponse )

    if(linkedinloginresponse){
        window.location.href='/';
    }  
    
  };



  async componentWillMount(){
    
    const { response_data } = this.props.match.params
    console.log('Linked in response data');
    var sentence = response_data

    var newsentence = sentence.split("+");
    console.log(newsentence);

   

    if(newsentence){
        localStorage.setItem("loggedin", true);
        localStorage.setItem("loggedInUseremail",newsentence[1]);
        localStorage.setItem("loggedInUsername",newsentence[0]);
        
    }
    await this.linkedinresponse(newsentence[0],newsentence[1]);
 }

 

    render() {
      
    return(
       <div>
           <p>Redirecting to Homepage..... Please Wait.</p>    
          
       </div>
      
            );
    }
}


export default linkedinredirect;