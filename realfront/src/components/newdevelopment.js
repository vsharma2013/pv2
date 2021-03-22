import React from 'react';
import './newdevelopment.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import StackGrid from "react-stack-grid";
import axios from 'axios';
// import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import Projects from "../containers/Projects/projects";
import StarRatings from 'react-star-ratings';
import 'regenerator-runtime/runtime';
// function NewDevelopment(){
class NewDevelopment extends React.Component{
    constructor(props){
        super(props);
        this.state={
        projectmedia:"",
        more:false,
        match:""
        }
        this.seeMoreHandler = this.seeMoreHandler.bind(this);
    }
  // projectmediafetch = async () =>{
  //     try{    
  //     // const { project_id } = this.props.match.params
  //     //dev
  //     // let projectdetails = await axios.get(`http://localhost:8081/projects`); 
  //     //aws
  //    let city = localStorage.getItem("city");
  //    console.log("new CITY DATA");
  //    console.log(city);
  //     if ("city" in localStorage)
  //     {
  //       // city = localStorage.getItem("city");
  //     let projectdetails = await axios.get(`https://www.propviewz.com/be/recent_launched_geo_location_projects/`+city); 
  //     console.log("TOP CITY DATA");
  //     console.log(projectdetails.data);
  //     this.setState({projectmedia:projectdetails.data})
  //     }
  //     else{
  //       console.log("INDIA DATA");
  //       let projectdetails = await axios.get(`https://www.propviewz.com/be/recent_launched_geo_location_projects/India`); 
  //       this.setState({projectmedia:projectdetails.data})
  //     }
  //     }
  //     catch(e){
  //       console.log(e);
  //     }
  //   }
      project_function = async (res) =>{
        try{    
        // const { project_id } = this.props.match.params
        // let projectdetails = await axios.get(`http://localhost:8081/projects`); 
        console.log("API DATAAAAAAAAA");
        console.log(res)
        let params=res.project_id
        
        // this.setState({
        //     match: this.state.match.concat(params)
        //   })
          this.setState({ match: {params} })
        // console.log(projectdetails.data);
        // this.setState({projectmedia:projectdetails.data})
        }
        catch(e){
          console.log(e);
        }
      }
    
    
    //   componentWillMount(){
        
    //     const { project_id } = this.props.match.params
    //     console.log('***************************************');
    //     console.log(project_id)
    //   }
    
      async componentDidMount(){
        console.log("yeash")
        // await this.projectmediafetch();
      }
      seeMoreHandler(event){
        console.log("LOCATION SEARCH PAGE")
        console.log(this.props)
        let id=this.props.city?this.props.city:this.props.geostate?this.state.geostate:"India";
        window.open('/RecentLaunched/Location/'+id, '_blank');
      }
      
    render(){
        console.log("STate");
        console.log(this.state)
        let project_id;
        let project_id1;
        let project_id2;let project_id3;let project_id4;let project_id5;
        let overall, overall1, overall2, overall3,overall4, overall5;
        if(this.props.projectmedia){
          project_id=this.props.projectmedia[0].project_id;
          overall=this.props.projectmedia[0].overall_rating;
          project_id1=this.props.projectmedia[1].project_id;
          overall1=this.props.projectmedia[1].overall_rating;
          project_id2=this.props.projectmedia[2].project_id;
          overall2=this.props.projectmedia[2].overall_rating;
          project_id3=this.props.projectmedia[3].project_id;
          overall3=this.props.projectmedia[3].overall_rating;
          project_id4=this.props.projectmedia[4].project_id;
          overall4=this.props.projectmedia[4].overall_rating;
          project_id5=this.props.projectmedia[5].project_id;
          overall5=this.props.projectmedia[5].overall_rating;
        }
    return (
      <div className="col-12 new" style={{'marginTop':'-2%'}}>
      {/* <h3 className="heading3">&nbsp;</h3> */}
      <div className="responsive_grids"  >
        <div className="grid-container2">
        {this.props.projectmedia &&
              
              <a className="anchorstyle">
  <div className="box3" >
                  <div className="imageframe1">
                  <img className="imagebox2"src={this.props.projectmedia?this.props.projectmedia[0].media_link:null}/>
                  <div className="paraplacestatus_rec">{ this.props.projectmedia?this.props.projectmedia[0].construction_status == "Ready Possession"?"READY":this.props.projectmedia[0].construction_status.toUpperCase():this.props.projectmedia[0].construction_status.toUpperCase()}</div>
                  <div className="paraplaceD">{this.props.projectmedia?this.props.projectmedia[0].area:null}</div>
                  </div>
                  <div className="contentframe1">
                  <p className="paraheading1">{this.props.projectmedia?this.props.projectmedia[0].project_name:null}</p>
                  <div className="row">
                <div className="parastarD">
                <StarRatings
                    rating={Math.round(overall*100)/100}
                    starRatedColor="#FFFFFF"
                    starEmptyColor="#202020"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    starDimension="1.2vw"
                    name='rating'
                    starSpacing='0.2vw'
                    />
                    </div>
           </div>
                      <div className="parasubD">{Math.round(overall*100)/100}({this.props.projectmedia?this.props.projectmedia[0].reviews:null} Reviews)</div>
                      {/* <div className="parasubD">{this.props.projectmedia?this.props.projectmedia[0].location:null},{this.props.projectmedia?this.props.projectmedia[0].city:null}</div> */}
                  </div>
          </div></a>}
          {this.props.projectmedia &&
              
              <a href={'/projects/'+project_id1} className="anchorstyle">
          <div className="box3">
                  <div className="imageframe1">
                  <img className="imagebox2"src={this.props.projectmedia?this.props.projectmedia[1].media_link:null}/>
                  <div className="paraplacestatus_rec">{ this.props.projectmedia?this.props.projectmedia[1].construction_status == "Ready Possession"?"READY":this.props.projectmedia[1].construction_status.toUpperCase():this.props.projectmedia[1].construction_status.toUpperCase()}</div>
                  <div className="paraplaceD">{this.props.projectmedia?this.props.projectmedia[1].area:null}</div>
                  </div>
                  <div className="contentframe1">
                  <p className="paraheading1">{this.props.projectmedia?this.props.projectmedia[1].project_name:null}</p>
                  <div className="row">
                <div className="parastarD">
                <StarRatings
                    rating={Math.round(overall1*100)/100}
                    starRatedColor="#FFFFFF"
                    starEmptyColor="#202020"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    starDimension="1.2vw"
                    name='rating'
                    starSpacing='0.2vw'
                    />
                    </div>
           </div>
                      <div className="parasubD">{Math.round(overall1*100)/100}({this.props.projectmedia?this.props.projectmedia[1].reviews:null} Reviews)</div>
                      {/* <div className="parasubD">{this.props.projectmedia?this.props.projectmedia[1].location:null},{this.props.projectmedia?this.props.projectmedia[1].city:null}</div> */}
                  </div>
          </div></a>}
          {this.props.projectmedia &&
              
              <a href={'/projects/'+project_id2} className="anchorstyle">
          <div className="box3" >
                  <div className="imageframe1">
                  <img className="imagebox2"src={this.props.projectmedia?this.props.projectmedia[2].media_link:null}/>
                  <div className="paraplacestatus_rec">{ this.props.projectmedia?this.props.projectmedia[2].construction_status == "Ready Possession"?"READY":this.props.projectmedia[2].construction_status.toUpperCase():this.props.projectmedia[2].construction_status.toUpperCase()}</div>
                  <div className="paraplaceD">{this.props.projectmedia?this.props.projectmedia[2].area:null}</div>
                  </div>
                  <div className="contentframe1">
                  <p className="paraheading1">{this.props.projectmedia?this.props.projectmedia[2].project_name:null}</p>
                  <div className="row">
                <div className="parastarD">
                <StarRatings
                        rating={Math.round(overall2*100)/100}
                        starRatedColor="#FFFFFF"
                        starEmptyColor="#202020"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        starDimension="1.2vw"
                        name='rating'
                        starSpacing='0.2vw'
                    />
                    </div>
           </div>
                      <div className="parasubD">{Math.round(overall2*100)/100}({this.props.projectmedia?this.props.projectmedia[2].reviews:null} Reviews)</div>
                      {/* <div className="parasubD">{this.props.projectmedia?this.props.projectmedia[2].location:null},{this.props.projectmedia?this.props.projectmedia[2].city:null}</div> */}
                  </div>
          </div></a>}
          {this.props.projectmedia &&
              
              <a href={'/projects/'+project_id3} className="anchorstyle">
          <div className="box3" >
                  <div className="imageframe1">
                  <img className="imagebox2"src={this.props.projectmedia?this.props.projectmedia[3].media_link:null}/>
                  <div className="paraplacestatus_rec">{ this.props.projectmedia?this.props.projectmedia[3].construction_status == "Ready Possession"?"READY":this.props.projectmedia[3].construction_status.toUpperCase():this.props.projectmedia[3].construction_status.toUpperCase()}</div>
                  <div className="paraplaceD">{this.props.projectmedia?this.props.projectmedia[3].area:null}</div>
                  </div>
                  <div className="contentframe1">
                  <p className="paraheading1">{this.props.projectmedia?this.props.projectmedia[3].project_name:null}</p>
                  <div className="row">
                <div className="parastarD">
                <StarRatings
                        rating={Math.round(overall3*100)/100}
                        starRatedColor="#FFFFFF"
                        starEmptyColor="#202020"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        starDimension="1.2vw"
                        name='rating'
                        starSpacing='0.2vw'
                    />
                    </div>
           </div>
                      <div className="parasubD">{Math.round(overall3*100)/100}({this.props.projectmedia?this.props.projectmedia[3].reviews:null} Reviews)</div>
                      {/* <div className="parasubD">{this.props.projectmedia?this.props.projectmedia[3].location:null},{this.props.projectmedia?this.props.projectmedia[3].city:null}</div> */}
                  </div>
          </div></a>}
          {this.props.projectmedia &&
              
              <a href={'/projects/'+project_id4} className="anchorstyle">
          <div className="box3" >
                  <div className="imageframe1">
                  <img className="imagebox2"src={this.props.projectmedia?this.props.projectmedia[4].media_link:null}/>
                  <div className="paraplacestatus_rec">{ this.props.projectmedia?this.props.projectmedia[4].construction_status == "Ready Possession"?"READY":this.props.projectmedia[4].construction_status.toUpperCase():this.props.projectmedia[4].construction_status.toUpperCase()}</div>
                  <div className="paraplaceD">{this.props.projectmedia?this.props.projectmedia[4].area:null}</div>
                  </div>
                  <div className="contentframe1">
                  <p className="paraheading1">{this.props.projectmedia?this.props.projectmedia[4].project_name:null}</p>
                  <div className="row">
                <div className="parastarD">
                <StarRatings
                        rating={Math.round(overall4*100)/100}
                        starRatedColor="#FFFFFF"
                        starEmptyColor="#202020"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        starDimension="1.2vw"
                        name='rating'
                        starSpacing='0.2vw'
                    />
                    </div>
           </div>
                      <div className="parasubD">{Math.round(overall4*100)/100}({this.props.projectmedia?this.props.projectmedia[4].reviews:null} Reviews)</div>
                      {/* <div className="parasubD">{this.props.projectmedia?this.props.projectmedia[4].location:null},{this.props.projectmedia?this.props.projectmedia[4].city:null}</div> */}
                  </div>
          </div></a>}
          {this.props.projectmedia &&
              
              <a href={'/projects/'+project_id5} className="anchorstyle">
          <div className="box3" >
                  <div className="imageframe1">
                  <img className="imagebox2"src={this.props.projectmedia?this.props.projectmedia[5].media_link:null}/>
                  <div className="paraplacestatus_rec">{ this.props.projectmedia?this.props.projectmedia[5].construction_status == "Ready Possession"?"READY":this.props.projectmedia[5].construction_status.toUpperCase():this.props.projectmedia[5].construction_status.toUpperCase()}</div>
                  <div className="paraplaceD">{this.props.projectmedia?this.props.projectmedia[5].area:null}</div>
                  </div>
                  <div className="contentframe1">
                  <p className="paraheading1">{this.props.projectmedia?this.props.projectmedia[5].project_name:null}</p>
                  <div className="row">
                <div className="parastarD">
                <StarRatings
                        rating={Math.round(overall5*100)/100}
                        starRatedColor="#FFFFFF"
                        starEmptyColor="#202020"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        starDimension="1.2vw"
                        name='rating'
                        starSpacing='0.2vw'
                    />
                    </div>
           </div>
                      <div className="parasubD">{Math.round(overall5*100)/100}({this.props.projectmedia?this.props.projectmedia[5].reviews:null} Reviews)</div>
                      {/* <div className="parasubD">{this.props.projectmedia?this.props.projectmedia[5].location:null},{this.props.projectmedia?this.props.projectmedia[5].city:null}</div> */}
                  </div>
          </div></a>}
        </div>
   
          <div className="col-10 seemore_web" onClick={this.seeMoreHandler}>See More</div>
          

      <div className=" grid3">
      {/* {this.state.match &&
      
          <Projects match ={this.state.match} />
          // <Router>
          // <Route exact path="/Projects/:{this.state.match}" component={Projects}/>
          // </Router>
      } */}
          
          {this.props.projectmedia &&
              
              <a className="anchorstyle">
  <div className="boxD_trend" >
                  <div className="imageframeD_trend">
                  <img className="imageboxD_trend"src={this.props.projectmedia?this.props.projectmedia[0].media_link:null}/>
                  <div className="paraplacestatus_rec">{ this.props.projectmedia?this.props.projectmedia[0].construction_status == "Ready Possession"?"READY":this.props.projectmedia[0].construction_status.toUpperCase():this.props.projectmedia[0].construction_status.toUpperCase()}</div>
                  <div className="paraplaceD_trend">{this.props.projectmedia?this.props.projectmedia[0].area:null}</div>
                  </div>
                  <div className="contentframeD_trend">
                  <p className="paraheadingDash_trend">{this.props.projectmedia?this.props.projectmedia[0].project_name:null}</p>
                  <div className="row">
                <div className="parastarD_trend">
                <StarRatings
                    rating={Math.round(overall*100)/100}
                    starRatedColor="#FFFFFF"
                    starEmptyColor="#202020"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    starDimension="25px"
                    name='rating'
                    starSpacing='2px'
                    />
                    </div>
           </div>
                      <div className="parasubD_trend">{Math.round(overall*100)/100}({this.props.projectmedia?this.props.projectmedia[0].reviews:null} Reviews)</div>
                      {/* <div className="parasubD">{this.props.projectmedia?this.props.projectmedia[0].location:null},{this.props.projectmedia?this.props.projectmedia[0].city:null}</div> */}
                  </div>
          </div></a>}
          {this.props.projectmedia &&
              
              <a href={'/projects/'+project_id1} className="anchorstyle">
          <div className="boxD_trend">
                  <div className="imageframeD_trend">
                  <img className="imageboxD_trend"src={this.props.projectmedia?this.props.projectmedia[1].media_link:null}/>
                  <div className="paraplacestatus_rec">{ this.props.projectmedia?this.props.projectmedia[1].construction_status == "Ready Possession"?"READY":this.props.projectmedia[1].construction_status.toUpperCase():this.props.projectmedia[1].construction_status.toUpperCase()}</div>
                  <div className="paraplaceD_trend">{this.props.projectmedia?this.props.projectmedia[1].area:null}</div>
                  </div>
                  <div className="contentframeD_trend">
                  <p className="paraheadingDash_trend">{this.props.projectmedia?this.props.projectmedia[1].project_name:null}</p>
                  <div className="row">
                <div className="parastarD_trend">
                <StarRatings
                    rating={Math.round(overall1*100)/100}
                    starRatedColor="#FFFFFF"
                    starEmptyColor="#202020"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    starDimension="25px"
                    name='rating'
                    starSpacing='2px'
                    />
                    </div>
           </div>
                      <div className="parasubD_trend">{Math.round(overall1*100)/100}({this.props.projectmedia?this.props.projectmedia[1].reviews:null} Reviews)</div>
                      {/* <div className="parasubD">{this.props.projectmedia?this.props.projectmedia[1].location:null},{this.props.projectmedia?this.props.projectmedia[1].city:null}</div> */}
                  </div>
          </div></a>}
          {this.props.projectmedia &&
              
              <a href={'/projects/'+project_id2} className="anchorstyle">
          <div className="boxD_trend" >
                  <div className="imageframeD_trend">
                  <img className="imageboxD_trend"src={this.props.projectmedia?this.props.projectmedia[2].media_link:null}/>
                  <div className="paraplacestatus_rec">{ this.props.projectmedia?this.props.projectmedia[2].construction_status == "Ready Possession"?"READY":this.props.projectmedia[2].construction_status.toUpperCase():this.props.projectmedia[2].construction_status.toUpperCase()}</div>
                  <div className="paraplaceD_trend">{this.props.projectmedia?this.props.projectmedia[2].area:null}</div>
                  </div>
                  <div className="contentframeD_trend">
                  <p className="paraheadingDash_trend">{this.props.projectmedia?this.props.projectmedia[2].project_name:null}</p>
                  <div className="row">
                <div className="parastarD_trend">
                <StarRatings
                        rating={Math.round(overall2*100)/100}
                        starRatedColor="#FFFFFF"
                        starEmptyColor="#202020"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        starDimension="25px"
                        name='rating'
                        starSpacing='2px'   
                    />
                    </div>
           </div>
                      <div className="parasubD_trend">{Math.round(overall2*100)/100}({this.props.projectmedia?this.props.projectmedia[2].reviews:null} Reviews)</div>
                      {/* <div className="parasubD">{this.props.projectmedia?this.props.projectmedia[2].location:null},{this.props.projectmedia?this.props.projectmedia[2].city:null}</div> */}
                  </div>
          </div></a>}

         
          
            <div className="seemore"onClick={this.seeMoreHandler}>See More</div>
            

          </div>
          </div>
      </div>
)
    } 
}
export default NewDevelopment;