import React from 'react';
import './draftblog.css';
import editIcon from '../../assets/icons/edit.png'
import { render } from '@testing-library/react';
import closeIcon from '../../assets/icons/close.png';

import axios from 'axios';
import EditDraft from '../EditDraft/EditDraft';

class Draftblog extends React.Component{
    constructor(props){
        super(props);
        this.state={
        blogdisplay: false,
        projectmedia:"https://demopropadvisor.s3-eu-west-1.amazonaws.com/Project_Photos/Golden+Blessings/img1.jpg",
        match:"",
        create:false,
        draft:true,
        publish:false,
        valuetitle : 'add title',
        valuedescription: 'A boutique single building project of twenty five 1 & 2 bedroom apartments. Good intenal planning with some receation space on roof top. Good connectivit to Hinjawadi IT Park as well MIDC areas in PCMC',
        };
        this.delete_draftHandler=this.delete_draftHandler.bind(this);
        this.blogClose = this.blogClose.bind(this);
    }

    blogClose () {this.setState({blogdisplay: false});}

     display_draftblog = async () =>{
        try{    
        const  email_id  = localStorage.getItem("loggedInUseremail")
           console.log(email_id,"EMAIL IDddd") 
            let display_draftblog = await axios.post(`https://www.propviewz.com/be/blog/draft_blog/`,{     
                email:email_id,
                
               }); 
        console.log("display_draftblog DATA");
        console.log(display_draftblog.data);
        this.setState({display_draftblog:display_draftblog.data})
        }
        catch(e){
          console.log(e);
        }
      }

      delete_draftHandler = async (e) =>{
        try{    
          console.log("delete_draft DATA");
          console.log(e);
            let delete_draft = await axios.post(`https://www.propviewz.com/be/delete_blog_with_id/`,{     
      blog_id:e
                
               }); 
        
        console.log(delete_draft.data);
        this.setState({delete_draft:delete_draft.data})

        alert("Blog has been deleted!")
        await this.display_draftblog();
        }
        catch(e){
          console.log(e);
        }

      }


      async componentWillMount(){

        await this.display_draftblog();
    

      }
render(){
    console.log("DRAFT BLOG HERE")
    console.log(this.state);
    console.log(this.props);
    let all_draft ;
    if(this.state.display_draftblog){ 
          
     all_draft =(
      this.state.display_draftblog.map(draft =>(
       
          <div className="blog_proj">


          {this.state.display_draftblog &&
              
              <div className="boxD_draft" >
                      <div className="imageframeD_draft">
                        <div onClick={() => this.delete_draftHandler(draft.blog_id)}>
                      <img className="closebtn_draft" src={closeIcon} /></div>
                      <img className="imageboxD_draft"src={draft.media_link}/>
                      </div>
                      <div className="contentframeD_draft" onClick={() => this.setState({blogdisplay: true})}>
                      <p className="paraheadingD_draft">{draft.blog_title}</p>
                      <a target='_blank'  href={'/edit/'+draft.blog_id} className="anchorstyle">
                      <img className="editbtn" src={editIcon} />
                      </a>
                      {/* {this.state.blogdisplay && 
      <EditDraft
      show={this.state.blogdisplay}
      onHide={this.blogClose}
      pub_blog={draft}
      />
    } */}
                      </div>
              </div>}


          </div>
        
        )));
  }
return(
    <div>
        {/* <img src = {this.state.display_draftblog[0].media_link} class="image"/>
        <div className="head">
        <div className="draft_title">{this.state.display_draftblog[0].blog_title}</div>
        <img className="editbtn" src={editIcon} onClick={this.props.onEdit}/>
        </div> */}
                  <div className="grid-containerdraft">
                {this.state.display_draftblog? all_draft:<h2 className="no_drafts">no drafts</h2>}
          </div>
    </div>
    )
}
    
}
export default Draftblog;
