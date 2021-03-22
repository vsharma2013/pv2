import React from 'react';
import './locationratings.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function LocationRatings(props){
    return (
    
             <div className="circularratingrow">
            <div className="circularratings">
            <div className="row circularratingvalue">
            <CircularProgressbar value={props.location_points/5*100} text={`${props.location_points}`} 
            styles={buildStyles({
              
              // Text size
              textSize: '1.5rem',
           
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
           
              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',
           
              // Colors
              pathColor: `rgb(238, 65, 61)`,
              textColor: '#404041',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}/></div>


            <div className="row circularratingcaption">
            <p className="circularratingcaptionL" style={{fontSize:"0.9rem !important"}}>Social Appeal</p>
            </div>
            
            </div>
           
           
            <div className="circularratings">
            <div className="row circularratingvalue">
            <CircularProgressbar value={props.amenity_points/5*100} text={`${props.amenity_points}`} 
            styles={buildStyles({
              
              // Text size
              textSize: '1.5rem',
           
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
           
              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',
           
              // Colors
              pathColor: `rgb(238, 65, 61)`,
              textColor: '#404041',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}/></div>


            <div className="row circularratingcaption">
            <p className="circularratingcaptionL" style={{fontSize:"0.9rem !important"}}>Schools</p>
            </div>
            
            </div>
            <div className="circularratings">
            <div className="row circularratingvalue">
            <CircularProgressbar value={props.layout_rating/5*100} text={`${props.layout_rating}`} 
            styles={buildStyles({
              
              // Text size
              textSize: '1.5rem',
           
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
           
              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',
           
              // Colors
              pathColor: `rgb(238, 65, 61)`,
              textColor: '#404041',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}/></div>


            <div className="row circularratingcaption">
            <p className="circularratingcaptionL" style={{fontSize:"0.9rem !important"}}>Malls/ Restaurants</p>
            </div>
            
            </div>


            <div className="circularratings">
            <div className="row circularratingvalue">
            <CircularProgressbar value={props.customer_rating/5*100} text={`${props.customer_rating}`} 
            styles={buildStyles({
              
              // Text size
              textSize: '1.5rem',
           
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
           
              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',
           
              // Colors
              pathColor: `rgb(238, 65, 61)`,
              textColor: '#404041',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}/></div>


            <div className="row circularratingcaption">
            <p className="circularratingcaptionL" style={{fontSize:"0.9rem !important"}}>Medical Facilities</p>
            </div>
            
            </div>



            <div className="circularratings">
            <div className="row circularratingvalue">
            <CircularProgressbar value={props.valueformoney_rating/5*100} text={`${props.valueformoney_rating}`} 
            styles={buildStyles({
              
              // Text size
              textSize: '1.5rem',
           
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
           
              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',
           
              // Colors
              pathColor: `rgb(238, 65, 61)`,
              textColor: '#404041',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}/></div>


            <div className="row circularratingcaption">
            <p className="circularratingcaptionL" style={{fontSize:"0.9rem !important"}}>Public Transport</p>
            </div>
            
            </div>
            
            </div>
   
)
    
}
export default LocationRatings;