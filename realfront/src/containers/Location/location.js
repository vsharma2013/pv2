import React from 'react';
import './location.css';
// import axios from 'axios';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import StackGrid from "react-stack-grid";
// import user1 from '../assets/images/user1.png'; 
// import user2 from '../assets/images/user2.png'; 
// import user3 from '../assets/images/user3.png'; 
// import user4 from '../assets/images/user4.png'; 
import 'regenerator-runtime/runtime';

class Location extends React.Component{
    constructor(props){
        super(props);
        this.state={
        projectmedia:"",
        match:""
        }
    }
   
      render(){
        console.log("location")

        console.log(this.state)
        console.log(this.props)
    return (
        <div className="col-12 ">
        <h1 className="heading5">LOCATION PAGE</h1>
<h3 className="heading5">{this.props.match.params.location}</h3>
        </div>
)
            }
    
}
export default Location;