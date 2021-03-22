/* 
NotFoundPage JS 
*/
import React from 'react';
import error from '../assets/images/error.png'; 
import reading from '../assets/images/reading.png'; 
import './notfoundpage.css';
import ReactSearchBox from 'react-search-box';
import StackGrid from "react-stack-grid";

class NotFoundPage extends React.Component{
  constructor(props){
    super(props);
    this.state={apiResponse:""};
  }

render(){
  return (
    <div className="NotFoundPage">
      <div className="background2">   
        <img className="imagecycle2"src={error}/>
      </div>
      <h1 className="textread404">404 Page not Found</h1>
    </div>
  );
}
}
export default NotFoundPage;
