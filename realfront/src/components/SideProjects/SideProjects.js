import React from 'react';
import './sideprojects.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import StarRatingComponent from 'react-star-rating-component';
import sideprojectimages from './assets/sideprojectimages.png';
import noimage from '../../assets/images/noimage.png';
import { Link } from 'react-router-dom';
function SideProjects(props){
    return (
      <div>
      {/* <Link to={'/projects/' + props.project_id}> */}
      <a href={'/projects/'+props.project_id} className="anchorstyle">
      <div className="card">
      <img src={props.media_link ? props.media_link : noimage} alt="" className="sideprojectimagestyle"/>
       <div className="container">
            <h3><b>{props.project_name}</b></h3>


       <StarRatingComponent
           name='projectrating' /* name of the radio input, it is required */
           value={Math.round(props.overall_rating*100)/100} /* number of selected icon (`0` - none, `1` - first) */
           starCount={5} /* number of icons in rating, default `5` */
           starColor='rgb(225, 225, 104)' /* color of selected icons, default `#ffb400` */
           emptyStarColor='lightgrey' /* color of non-selected icons, default `#333` */
           editing={false} /* is component available for editing, default `true` */
       />

    <h5 className="sideprojectreviewrow">{Math.round(props.overall_rating*100)/100} ({props.reviewcount}reviews)</h5>
    <h4><b>{props.location}, {props.city}</b></h4> 
        </div>
     </div>
     </a>
     {/* </Link> */}
     
     </div>
)
    
}
export default SideProjects;