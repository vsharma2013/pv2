import React from 'react';
import 'regenerator-runtime/runtime';
import {Modal} from 'react-bootstrap';
import {props} from 'react';
import closeIcon from '../../assets/icons/close.png';
import '../Blogs/createblog.css';
import './EditDraft.css';


import axios from 'axios';

class EditDraft extends React.Component{
    constructor(props){
        super(props);
        this.state={
          projectmedia:"https://demopropadvisor.s3-eu-west-1.amazonaws.com/Project_Photos/Golden+Blessings/img1.jpg",
          match:"",
          create:false,
          draft:true,
          publish:false,

          // images:this.state.blogdetails?this.state.blogdetails[0].media_link:null,
          valuetitle: "",
          valuedescription:""


          

        };
       this.blogdetailsHandler= this.blogdetailsHandler.bind(this);
    }

    
    title_handleChange = (e) => {
      this.setState({valuetitle: e.target.value});
    }
  description_handleChange = (e) => {
      this.setState({valuedescription: e.target.value});
    }
  pic_handleChange =(e) =>{
      let image_file=e.target.name;
      let image_val=e.target.files;
      this.setState({[image_file]:image_val});
  }
  cancel_handleClick = () => {
      this.setState({valuetitle: '',valuedescription:'',bpic:''})
    }

  
  draft_handleClick =  async ()=> {

    if(!this.state.bpic){
      this.setState({
          handleResponse: {
            isSuccess: false,
            message: "",
          },
          // alert(message)
        })
        alert( "Please upload an image.");
        return false;
  }
          
      console.log("Drafts Blog 123");
      console.log(this.state);
      
      const fd= new FormData();
      fd.append("blog_id",this.state.blogdetails?this.state.blogdetails[0].blog_id:null);
      fd.append("blog_title", this.state.valuetitle?this.state.valuetitle:null);
      fd.append("blog", this.state.valuedescription?this.state.valuedescription:null);
      fd.append("bloger_email", this.state.loggedinuseremail?this.state.loggedinuseremail:null);
      fd.append("blog_type", "draft");
      
       if(this.state.bpic.length){
          for (let i = 0 ; i < this.state.bpic.length ; i++) {
            fd.append("blog_media", this.state.bpic[i]);}
          }
          console.log("Created blog details by user")
          console.log(fd)
          axios.post('https://www.propviewz.com/be/blog/edit_blog/',fd,{ 
           headers: { 
            'Content-Type': 'multipart/form-data' 
          }
        }
      //     );
      //     this.setState({saved_draft_title:this.state.valuetitle?this.state.valuetitle:'',
      //     saved_draft_description:this.state.valuedescription?this.state.valuedescription:'',
      //     saved_draft_images:this.state.bpic?this.state.bpic:''});

      //     alert("Your blog has been updated in draft!")
      //     await this.cancel_handleClick();


      // }
      ).then(response => {
        this.setState({saved_draft_title:this.state.valuetitle?this.state.valuetitle:'',
        saved_draft_description:this.state.valuedescription?this.state.valuedescription:'',
        saved_draft_images:this.state.bpic?this.state.bpic:'',
        handleResponse: {
            isSuccess: response.status === 200,
            message: response.data.message
          }})
        
              alert("Your blog has been updated in draft!")
         
        }
    )
    await this.cancel_handleClick();
  }

      publish_handleClick = () => {

        if(!this.state.bpic){
          this.setState({
              handleResponse: {
                isSuccess: false,
                message: "",
              },
              // alert(message)
            })
            alert( "Please upload an image.");
            return false;
      }
            
        console.log("Drafts Blog");
        console.log(this.state.valuetitle);
        console.log(this.state.valuedescription);
        console.log(this.state.bpic);
        
        const fd= new FormData();
         
        fd.append("blog_title", this.state.valuetitle?this.state.valuetitle:null);
        fd.append("blog", this.state.valuedescription?this.state.valuedescription:null);
        fd.append("bloger_email", this.state.loggedinuseremail?this.state.loggedinuseremail:null);
        fd.append("blog_type", "publish");
        
         if(this.state.bpic.length){
            for (let i = 0 ; i < this.state.bpic.length ; i++) {
              fd.append("blog_media", this.state.bpic[i]);}
            }
            console.log("Created blog details by user")
            console.log(fd)
            axios.post('https://www.propviewz.com/be/blog/save_blog/',fd,{ 
             headers: { 
              'Content-Type': 'multipart/form-data' 
            }
          }
        //     );
        //     this.setState({saved_draft_title:this.state.valuetitle?this.state.valuetitle:'',
        //     saved_draft_description:this.state.valuedescription?this.state.valuedescription:'',
        //     saved_draft_images:this.state.bpic?this.state.bpic:''});

        //     alert("Your blog is published!")
        //     this.setState({valuetitle: '',valuedescription:'',bpic:''})

        // }
        ).then(response => {
          this.setState({saved_draft_title:this.state.valuetitle?this.state.valuetitle:'',
          saved_draft_description:this.state.valuedescription?this.state.valuedescription:'',
          saved_draft_images:this.state.bpic?this.state.bpic:'',
          handleResponse: {
              isSuccess: response.status === 200,
              message: response.data.message
            }})
          
            alert("Your blog is published!")
            this.setState({valuetitle: '',valuedescription:'',bpic:''})
          }
      )}

    
    blogdetailsHandler = async () =>{
        try{    
        const { blog_id } = this.props.match.params
        console.log("BLOGID");
        console.log(blog_id);
            let blogdetails = await axios.post(`https://www.propviewz.com/be/fetch_blog_with_id/`,{
              blog_id:blog_id
            }); 
        console.log("BLOG DATA");
        console.log(blogdetails.data);
        
        // if (blogdetails.data.length >0 ){
          this.setState({blogdetails:blogdetails.data,
            valuetitle: this.state.blogdetails?this.state.blogdetails[0].blog_title:null,
            valuedescription: this.state.blogdetails?this.state.blogdetails[0].blog:null,
          })
        // }
        // else{
        //   window.location.replace("/404");
        // }
        }
        catch(e){
          console.log(e);
        }
        
      }
    async componentDidMount(){
      await this.blogdetailsHandler();
      this.setState({
        loggedin:localStorage.getItem("loggedin"),
        loggedinuseremail:localStorage.getItem("loggedInUseremail"),
        loggedinusername:localStorage.getItem("loggedInUsername")})
    
    }

    async componentWillMount(){
      await this.blogdetailsHandler();
    }

    render(){
        console.log("blogpopup")

        console.log(this.state)
        console.log(this.props)

        const { handleResponse } = this.state;


    return (
    //   <Modal show={true} {...props} animation="true" dialogClassName="blog-modal">
    //   <Modal.Header className="headtitle">BLOG TITLE </Modal.Header>
    //   <img className="blogclosebtn" src={closeIcon} onClick={this.props.onHide}/> 
    //   <Modal.Body> 
    //  <div className="disp_blog">
    //  <div className="draft_headin">{this.state.blogdetails?this.state.blogdetails[0].blog_title:null}</div>
    //  <img src = {this.state.blogdetails?this.state.blogdetails[0].media_link:null} class="blog_image"/>
    //  <div className="draft_desc">{this.state.blogdetails?this.state.blogdetails[0].blog:null}</div>
    //  <hr class="border_line"></hr>
    //  {/* <label className="created">Created by {this.state.currentUsername}  on  { this.state.currentDate }</label> */}
    //  </div>

    //   </Modal.Body>
    //   </Modal>


<div className="container create_sec">
<div className="col-50">
 <form>
   <label style={{fontFamily:'Catamaran-Bold',fontSize: 'xx-large',textDecoration: 'underline' }}>Edit Blog</label>
 {/* <img src = {this.state.blogdetails?this.state.blogdetails[0].media_link:null} class="blog_image"/> */}
    <label className="label_name" for="btitle">Blog Title</label>
    <input maxlength="25" type="text" className="input_blog_text" name="title" id="title" value = {this.state.valuetitle} onChange={this.title_handleChange}/>
    <label className="label_name" for="bdescription">Write your thoughts here</label>
    <textarea type="text" className="input_blog_description" name="description" id="description" value = {this.state.valuedescription} onChange={this.description_handleChange}/>
    <label className="label_name" for="bpic">Post pictures</label>
    <input type="file" accept="image/x-png,image/gif,image/jpeg" className="input_blog_upload" name ="bpic" id ="bpic" value={this.state.images} onChange={this.pic_handleChange} multiple/>
    <label className="label_upload">Please upload an image less than 1MB</label>
    
    <div className="row">
        <div class="col-25 bbb">
        <input type="button" value="UPDATE" className="blog_btn" onClick={this.draft_handleClick}/>
        </div> 

        <div className="col-25 bbb">
        <input type="button" value="PUBLISH" className="blog_btn" onClick={this.publish_handleClick}/>
        {handleResponse &&<p className={handleResponse.isSuccess ? "success" : "error"}>{handleResponse.message}</p>}
        </div>

        <div className="col-25 bbb">
        <input type="reset" value="CLEAR" className="blog_btn" onClick={this.cancel_handleClick}/>
        </div>
    </div>
    </form>
</div>
</div>
 
)
}
    
}
export default EditDraft;