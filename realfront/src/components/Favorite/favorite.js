import React from 'react';
import './favorite.css';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import StarRatings from 'react-star-ratings';
// import closepic from '../../assets/icons/close.png'
import closeIcon from '../../assets/icons/close.png';

class Favorite extends React.Component{
    constructor(props){
        super(props);
        this.state={
        projectmedia:"",
        match:"",
        more: false,
        show:true,
        };
        this.delete_draftHandler=this.delete_draftHandler.bind(this);
    }


    display_fav = async () =>{
      try{    
      const  email_id  = localStorage.getItem("loggedInUseremail")
         console.log(email_id,"EMAIL ID") 
          let display_fav = await axios.post(`https://www.propviewz.com/be/fetch_favorite_by_user/`,{     
              email:email_id,
              
             }); 
      console.log("display_fav DATA");
      console.log(display_fav.data);
      this.setState({display_fav:display_fav.data})
      }
      catch(e){
        console.log(e);
      }
    }



    delete_draftHandler = async (e) =>{
      try{    
        console.log("delete_fav DATA");
        console.log(e);
          let delete_draft = await axios.post(`https://www.propviewz.com/be/delete_favorite_by_user/`,{     
            email:localStorage.getItem("loggedInUseremail"),    
          project_id:e
              
             }); 
      
      console.log(delete_draft.data);
      this.setState({delete_draft:delete_draft.data})
    
      alert("Favorite project has been removed!")
      await this.display_fav();
      }
      catch(e){
        console.log(e);
      }
    
    }


    async componentWillMount(){

      await this.display_fav();
    
    }

    render(){
        console.log("Favvvv")
        console.log(this.state);
            console.log(this.props);
            let all_fav ;
            if(this.state.display_fav){ 
                  
             all_fav =(
              this.state.display_fav.map(draft =>(

                <div>
                   <div onClick={() => this.delete_draftHandler(draft.project_id)}>
                      <img className="closebtn_fav" src={closeIcon}/></div>
                <a href={'/projects/'+draft.project_id} className="anchorstyle">
                  <div className="fav_proj">
                  {this.state.display_fav &&
                      <div className="boxD_fav" >
                              <div className="imageframeD_fav">
                              <img className="imageboxD_fav"src={draft.cover_image}/>
                              <div className="paraplacestatus_fav">{ draft.construction_status}</div>
                              <div className="paraplaceD_fav">{draft.area}</div>
                              </div>
                              
                              <div className="contentframeD_fav">
                              <p className="paraheadingD_fav">{draft.project_name}</p>

                              {/* <div className="row">
                  <div className="parastarD_fav">
                  <StarRatings
                        rating={Math.round(draft.overall_rating*100)/100}
                        starRatedColor="#FFFFFF"
                        starEmptyColor="#202020"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        starDimension="1.2vw"
                        name='rating'
                        starSpacing='0.2vw'
                        margin-left='1.8vw'
                        margin-top= '-2%'
                      />
                      </div>
                      </div> */}
             

                              </div>
              
                      </div>
                      }
        
        
                  </div>
                  </a>
                  </div>
                
                )));
          }
    return (
      <div>
      <div className="grid-container_fav">
                      {this.state.display_fav? all_fav:<h2 className="no_fav">No Favorites</h2>}
                </div>
         
      </div>
)
            }
    
}
export default Favorite;