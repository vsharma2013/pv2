/* 
Projects JS 
*/
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
// import logo from '../logo.svg';
import user from './assets/user.png'; 
import projectcoverphoto from './assets/projectcoverphoto.png';
// import sideprojectimages from './assets/sideprojectimages.png';
// import reading from './assets/reading.png'; 
import './locationreportreview.css';
import StarRatingComponent from 'react-star-rating-component';
import sideprojectimages from './assets/sideprojectimages.png';
import noimage from '../../assets/images/noimage.png'
import Footer from '../../components/footer';
import StarRatings from 'react-star-ratings';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'
import LogoIcon from '../../assets/icons/logo.png';




import SideProjects from '../../components/SideProjects/SideProjects';
import ProjectRatings from '../../components/ProjectRatings/ProjectRatings';


class ReportReview extends React.Component{
  constructor(props){
    super(props);
    this.state={
    
      reviewdetails:"",
      name:"",
      email_phone:"",
      issue:"",
      submitted:false,
      hideobject:"unset",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleSubmit(event) {
    event.preventDefault();
    console.log("report form");
    console.log(this.state);
    axios.post('https://www.propviewz.com/be/save_location_reported_review/', {     
      location_id:this.state.reviewdetails[0].location_id,
      location_review_id:this.state.reviewdetails[0].location_review_id,
      name:this.state.name,
      email:this.state.email_phone,
      issue:this.state.issue
     });
     console.log("i got called");
     this.setState({
      name: '',email_phone: '',issue:'',submitted:true, hideobject:"hidden"
    });
  }
  

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  reviewdetails = async () =>{
    try{    
    const { location_review_id } = this.props.match.params
    console.log("location id",location_review_id);
    let reviewdetails = await axios.get(`https://www.propviewz.com/be/location_review_info/`+location_review_id); 
    console.log("Review DATA");
    console.log(reviewdetails.data);
    this.setState({reviewdetails:reviewdetails.data})
    }
    catch(e){
      console.log(e);
    }
  }

  

  


  

  


  async componentWillMount(){
    
    const { review_id } = this.props.match.params
    console.log('ANKIT2');
    console.log(this.props)
    
   
    await this.reviewdetails();
    
  }

  async componentDidMount(){
    
    
  }


 


  // async componentWillReceiveProps(nextProps) {
    // await this.projectmediafetch();
    // await this.projectdetails();
    // await this.reviewdetails();
    // await this.projectinfo();
    // await this.projecttransaction();
    // await this.suggestedproject();
  // }

render(){
  let allreviews;
  console.log(this.state.submitted)

  if(this.state.reviewdetails){
    allreviews =(
      this.state.reviewdetails.map(review =>(
        <div className="reviewcard">
        <div className="row">
          <div className="col-xl-9">
            <div className="reviewcardfirstrow">
            <img src={sideprojectimages} alt="" className="reviewprofileimagestyle" alt="sideprojectcover"/>
              <div className="reviewcontainer">
                <h4 style={{marginBottom:'0px'}}>{review.reviewer_name}</h4>
                <div>{review.review_date}</div>
                
                <div className="bigstar">
                    <StarRatings
                      rating={review.overall_rating}
                      starRatedColor="#e1e168"
                      changeRating={this.changeRating}
                      starDimension="40px"
                      numberOfStars={5}
                      name='rating'
                      starSpacing='0px'
                    />
                </div>
                <div className="smallstar">
                    <StarRatings
                      rating={review.overall_rating}
                      starRatedColor="#e1e168"
                      changeRating={this.changeRating}
                      starDimension="30px"
                      numberOfStars={5}
                      name='rating'
                      starSpacing='0px'
                    />
                </div>
              </div>
            
            </div>

            <div>
              <h3>{review.review_title}</h3>
              <p>{review.review}</p>
            </div>
         
        </div>
        
        <div className="col-xl-3 centeralign">
          {/* <img src={noimage} alt="No Image Available" className="reviewimagestyle"/> */}
        </div>
        
        {/* <img src={sideprojectimages} alt="" className="sideprojectimagestyle"/> */}
        

        

  
        </div>
       
      </div>)));
  }


  
 
  return (
    <div>
    <div className="mainContainer">
    <div className="container-fluid">
     <div className="row reviewrow">
        <div className="col-xl-9">
          
        </div>

        <div className="col-xl-3 reviewbar">
          
          {/* <div className="row">
            <div className="col-md-9 reviewbar"> */}
            <button className="reviewbtn" style={{visibility:"hidden"}}>write a review</button>
            {/* </div> */}
            {/* <div className="col-md-3"> */}
            <img src={user} className="usericon" style={{visibility:"hidden"}} alt="usericon"/>
            {/* </div> */}
            {/* </div> */}
        
        
        </div>  
     </div>
    
    <div className="row">
    <a href={'/'}><img className="logob1report" src={LogoIcon}/></a> 
            <div className="col-xl-12">
            <h3 className="">Report a Review</h3>
            
            {this.state.submitted &&
               <div className="container"> 
                  <div class="alert alert-success alert-dismissible">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close"></a>
                    Thank you for your <strong>feeback</strong>. Your report has been sent successfully. The review you reported is under screening. We will take appropriate action as per our policy.
                  </div>
               </div>
            }
            </div>
    </div>
    

    
    <div className="row">
      <div className="col-xl-12">
      

        
        
        
        <div className="reviewrow" style={{visibility: this.state.hideobject}}>
          <h3 id="reviewdiv" className="ReviewHeading"></h3>
            
            <div className="container">
            {this.state.reviewdetails? allreviews:""}
            </div>
            
        </div>

        <div className="row reportform" style={{visibility: this.state.hideobject}}>
          <div className="col-xl-12">
            <form onSubmit={this.handleSubmit}>
              <div className="row formrow">
                <div className="col-lg-6"> 
                    <div class="form-group">
                      <label for="pwd">Your Name</label>
                      <input type="text" class="form-control" id="name" placeholder="e.g. John Doe" name="name" required onChange={this.myChangeHandler} value={this.state.name}/>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label for="email_phone">Email / Phone</label>
                      <input type="text" class="form-control" id="email_phone" placeholder="e.g. johndoe@example.com / +918123107440" name="email_phone" onChange={this.myChangeHandler} value={this.state.email_phone}/>
                    </div>
                  </div>
              </div>
              <div className="row formrow">
                <div className="col-lg-12"> 
                    <div class="form-group">
                      <label for="pwd">Issue with the Review</label>
                      <textarea class="form-control" rows="5" id="issue" name="issue" required onChange={this.myChangeHandler} value={this.state.issue}></textarea>
                    </div>
                </div>
              </div>
                
              <div className="row centeralign">
                <div className="col-lg-12">
                  <button type="submit" class="btn btn-primary" style={{float:"unset",backgroundColor:"#404041",color:"white"}}>Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        

           

           


           

            



      </div>
     
      </div>
   



    </div>
    </div>
    <Footer/>
              



    </div>
  );
}
}
export default ReportReview;
