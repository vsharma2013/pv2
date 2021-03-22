import React from 'react';
import './projectratings.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function ProjectRatings(props){
    return (
    
             <div className="circularratingrow">
            <div className="circularratings">
            <div className="row circularratingvalue">
            <CircularProgressbar value={props.location_points/5*100} text={`${parseFloat(props.location_points).toFixed(1)}`} 
            styles={buildStyles({
              
              // Text size
              textSize: '1.2rem',
           
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
            <p className="circularratingcaption">Location</p>
            </div>
            
            </div>
           
           
            <div className="circularratings">
            <div className="row circularratingvalue">
            <CircularProgressbar value={props.amenity_points/5*100} text={`${parseFloat(props.amenity_points).toFixed(1)}`} 
            styles={buildStyles({
              
              // Text size
              textSize: '1.2rem',
           
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
            <p className="circularratingcaption">Amenities</p>
            </div>
            
            </div>
            <div className="circularratings">
            <div className="row circularratingvalue">
            <CircularProgressbar value={props.layout_rating/5*100} text={`${parseFloat(props.layout_rating).toFixed(1)}`} 
            styles={buildStyles({
              
              // Text size
              textSize: '1.2rem',
           
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
            <p className="circularratingcaption">Layout Planning</p>
            </div>
            
            </div>


            <div className="circularratings">
            <div className="row circularratingvalue">
            <CircularProgressbar value={props.customer_rating/5*100} text={`${parseFloat(props.customer_rating).toFixed(1)}`} 
            styles={buildStyles({
              
              // Text size
              textSize: '1.2rem',
           
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
            <p className="circularratingcaption">Customer Service</p>
            </div>
            
            </div>



            <div className="circularratings">
            <div className="row circularratingvalue">
            <CircularProgressbar value={props.valueformoney_rating/5*100} text={`${parseFloat(props.valueformoney_rating).toFixed(1)}`} 
            styles={buildStyles({
              
              // Text size
              textSize: '1.2rem',
           
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
            <p className="circularratingcaption">Value for Money</p>
            </div>
            
            </div>
            
            </div>
   
)
    
}
export default ProjectRatings;