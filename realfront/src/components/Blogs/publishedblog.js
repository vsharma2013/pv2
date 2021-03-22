import React, { Component } from "react";
import './blogs.css';
import { render } from '@testing-library/react';
import closeIcon from '../../assets/icons/close.png';
import './publishedblog.css';

import axios from 'axios';

class PublishedBlog extends Component {
  constructor(props){
    super(props);
    this.state={
    blogdisplay: false,
    projectmedia:"https://demopropadvisor.s3-eu-west-1.amazonaws.com/Project_Photos/Golden+Blessings/img1.jpg",
    match:"",
    create:false,
    draft:false,
    publish:true,
    valuetitle : 'add whatever title u need here',
    valuedescription: 'A boutique single building project of twenty five 1 & 2 bedroom apartments. Good intenal planning with some receation space on roof top. Good connectivit to Hinjawadi IT Park as well MIDC areas in PCMC',
    };
    this.delete_draftHandler=this.delete_draftHandler.bind(this);
    this.blogClose = this.blogClose.bind(this);
}

blogClose () {this.setState({blogdisplay: false});}

display_pubblog = async () =>{
  try{    
  const  email_id  = localStorage.getItem("loggedInUseremail")
     console.log(email_id,"EMAIL ID") 
      let display_pubblog = await axios.post(`https://www.propviewz.com/be/blog/user_public_blog/`,{     
          email:email_id,
          
         }); 
  console.log("display_pubblog DATA");
  console.log(display_pubblog.data);
  this.setState({display_pubblog:display_pubblog.data})
  }
  catch(e){
    console.log(e);
  }
}

delete_draftHandler = async (e) =>{
  try{    
    console.log("delete_pub DATA");
    console.log(e);
      let delete_draft = await axios.post(`https://www.propviewz.com/be/delete_blog_with_id/`,{     
blog_id:e
          
         }); 
  
  console.log(delete_draft.data);
  this.setState({delete_draft:delete_draft.data})

  alert("Blog has been deleted!")
  await this.display_pubblog();
  }
  catch(e){
    console.log(e);
  }

}

async componentWillMount(){

  await this.display_pubblog();

}

render(){
console.log("PUBLISHED BLOG HERE")
console.log(this.state);
    console.log(this.props);
    let all_draft ;
    if(this.state.display_pubblog){ 
          
     all_draft =(
      this.state.display_pubblog.map(draft =>(
          <div className="blogpub_proj">


          {this.state.display_pubblog &&
          <div>
              
                 <div onClick={() => this.delete_draftHandler(draft.blog_id)}>
                      <img className="closebtn_pub" src={closeIcon}/></div>
                      <a href={'/Blog/'+draft.blog_id} className="anchorstyle">
              <div className="boxD_pub" onClick={() => this.setState({blogdisplay: true})}>
                      <div className="imageframeD_pub">
                      
                      <img className="imageboxD_pub"src={draft.media_link}/>
                      </div>
          
                      <div className="contentframeD_pub">
                      <p className="paraheadingD_pub">{draft.blog_title}</p>
                      </div>
                      {/* {this.state.blogdisplay && 
      <ShowPublishBlog
      show={this.state.blogdisplay}
      onHide={this.blogClose}
      pub_blog={draft}
      />
    } */}
              </div>
              </a>
              </div>}


          </div>
        
        )));
  }




return(
<div>
<div className="grid-containerpub">
                {this.state.display_pubblog? all_draft:<h2 className="no_pub">No blog has been published</h2>}
          </div>
   
</div>
    );
  }
}

export default PublishedBlog;
