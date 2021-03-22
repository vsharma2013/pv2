import React, { Component } from "react";
// import { response } from "express";

import { Redirect } from 'react-router'

  
class ResetRedirect extends React.Component {
  constructor(props){
    super(props);
    this.state={
      redirecttonewpassword:false,
      
    }
 }


  //   linkedinresponse = async (id,name) => {
     
  //   let linkedinloginresponse = await axios.post('https://www.propviewz.com/be/ld/ld_login', {     
  //       id:name,
  //       name:id,
  //     });
  //     console.log("linkedin login response" , linkedinloginresponse )

  //   if(linkedinloginresponse){
  //       window.location.href='/';
  //   }  
    
  // };



  componentDidMount(){
    
    const { response_data } = this.props.match.params
    console.log(response_data);
    if(response_data){
        localStorage.setItem("Resetemail",response_data);
        this.setState({redirecttonewpassword:true})      
    }
 }

    render() {
      
      const { redirecttonewpassword } = this.state;

     if (redirecttonewpassword) {
       return <Redirect to='/NewPassword/'/>;
     }


    return(
       <div>
           <p>Please Wait...</p>    
          
       </div>
      
            );
    }
}


export default ResetRedirect;