
import React from "react";
import { geolocated, geoPropTypes } from "../GeoLocation/index";

const myApiKey="AIzaSyAWuh3j8uE0OrhRkqenhQFP696-Xy0ecMQ ";

class Demo extends React.Component{
    constructor(props){
      super(props);
      this.state={
      
      }

    }

    async componentDidMount () {
        console.log("XXXXXXX")
        console.log(this.props)

        if(!this.props.coords==null){

            longitude=this.props.coords.longitude;
            latitude=this.props.coords.latitiude;
            this.props.New(latitude+','+longitude);
        } 
        else{
            this.setState({val1:true})
        }
    }
    New = async (LLvalue) =>{

        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + LLvalue+ '&key=AIzaSyAWuh3j8uE0OrhRkqenhQFP696-Xy0ecMQ')
       
       
               .then(response => response.json())
               .then(response => {
                   console.log("qwerty123")
                   // console.log(myLat)
                   // console.log(myLon)
                   console.log(LLvalue)
                   console.log(response)
                   let city_no = response.results.length;
                   let current_city =city_no-3;
                   this.state.geostate=(response.results[current_city].address_components[0].long_name)
               })
                
               // 
       //         .then((responseJson) => {
                 
       //             console.log(response)
       //             console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.jsonify(responseJson));
       // })
           }


    render(){
        console.log("RENDER")

        console.log(this.state)
        console.log(this.props)
        let longitude, latitude;
        if(this.props.coords!=null){
            console.log("RENDERtrue")
            longitude=this.props.coords.longitude;
            latitude=this.props.coords.latitude;
            this.props.New(latitude+','+longitude);
            return (
                <div >
                {this.state.geostate}
                </div>
        )
        } 
       else if(this.props.coords==null){
        console.log("RENDERfalse")

            return (
                <div>
                Select Location
                </div>
        )
        } 

            }


    }
Demo.propTypes = { ...Demo.propTypes, ...geoPropTypes };

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Demo);