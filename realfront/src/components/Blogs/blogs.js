import React from 'react';
import './blogs.css';
import 'regenerator-runtime/runtime';
import Publishedblog from './publishedblog';
import Draftblog from './draftblog';

import axios from 'axios';

class Blogs extends React.Component{
    constructor(props){
        super(props);
        this.state={
        projectmedia:"",
        match:"",
        create:true,
        draft:false,
        publish:false,
        valuetitle : '',
        valuedescription: '',
        loggedinuseremail:'',
        };
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

    draft_handleClick = () => {

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
        fd.append("blog_type", "draft");
        
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
            ).then(response => {
                this.setState({saved_draft_title:this.state.valuetitle?this.state.valuetitle:'',
                saved_draft_description:this.state.valuedescription?this.state.valuedescription:'',
                saved_draft_images:this.state.bpic?this.state.bpic:'',
                handleResponse: {
                    isSuccess: response.status === 200,
                    message: response.data.message
                  }})
                
                alert("Your blog has been saved in draft!")
                }
            )}
           

        

        // draft_handleClick = () => {
            
        //     console.log("Drafts Blog");
        //     console.log(this.state.valuetitle);
        //     console.log(this.state.valuedescription);
        //     console.log(this.state.bpic);
            
        //     const fd= new FormData();
             
        //     fd.append("blog_title", this.state.valuetitle?this.state.valuetitle:null);
        //     fd.append("blog", this.state.valuedescription?this.state.valuedescription:null);
        //     fd.append("bloger_email", this.state.loggedinuseremail?this.state.loggedinuseremail:null);
        //     fd.append("blog_type", "draft");
            
        //      if(this.state.bpic.length){
        //         for (let i = 0 ; i < this.state.bpic.length ; i++) {
        //           fd.append("blog_media", this.state.bpic[i]);}
        //         }
        //         console.log("Created blog details by user")
        //         console.log(fd)
        //         axios.post('https://www.propviewz.com/be/blog/save_blog/',fd,{ 
        //          headers: { 
        //           'Content-Type': 'multipart/form-data' 
        //         }
        //       }
        //         );
        //         this.setState({saved_draft_title:this.state.valuetitle?this.state.valuetitle:'',
        //         saved_draft_description:this.state.valuedescription?this.state.valuedescription:'',
        //         saved_draft_images:this.state.bpic?this.state.bpic:''});
        //     }



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
                    ).then(response => {
                      this.setState({saved_draft_title:this.state.valuetitle?this.state.valuetitle:'',
                      saved_draft_description:this.state.valuedescription?this.state.valuedescription:'',
                      saved_draft_images:this.state.bpic?this.state.bpic:'',
                      handleResponse: {
                          isSuccess: response.status === 200,
                          message: response.data.message
                        }})
                      
                      alert("Your blog has been published")
                      }
                  )}
//                     );
//                     this.setState({saved_draft_title:this.state.valuetitle?this.state.valuetitle:'',
//                     saved_draft_description:this.state.valuedescription?this.state.valuedescription:'',
//                     saved_draft_images:this.state.bpic?this.state.bpic:''});

// alert("Your blog is published!")

//                 }


    componentDidMount(){
    this.setState({
        loggedin:localStorage.getItem("loggedin"),
        loggedinuseremail:localStorage.getItem("loggedInUseremail"),
        loggedinusername:localStorage.getItem("loggedInUsername")})
    }   

    render(){
        console.log("blog")

        console.log(this.state)
        console.log(this.props)

        const { handleResponse } = this.state;
    return (
        <div className=" col-12 abc">
            <div className="container blog_collection">
            
                {this.state.create &&
                    <div className="row"> 
                        <div onClick={() => this.setState({ create: true, draft: false, publish: false})} >
                        <button className="create_blog_tab active">CREATE</button>
                        </div>
                        <div className="vl_1"></div>
                        <div onClick={() => this.setState({ create: false, draft: true, publish: false})} >
                        <button className="draft_blog_tab" >DRAFTS</button>
                        </div>
                        <div className="vl_2"></div>
                        <div onClick={() => this.setState({ create: false, draft: false, publish: true})} >
                        <button className="publish_blog_tab" >PUBLISHED</button>
                        </div>
                    
                    </div>
                }

                {this.state.draft &&
                     <div className="row"> 
                     <div onClick={() => this.setState({ create: true, draft: false, publish: false})} >
                     <button className="create_blog_tab">CREATE</button>
                     </div>
                     <div className="vl_1"></div>
                     <div onClick={() => this.setState({ create: false, draft: true, publish: false})} >
                     <button className="draft_blog_tab active" >DRAFTS</button>
                     </div>
                     <div className="vl_2"></div>
                     <div onClick={() => this.setState({ create: false, draft: false, publish: true})} >
                     <button className="publish_blog_tab" >PUBLISHED</button>
                     </div>
                 
                 </div>
                }

                {this.state.publish &&
                     <div className="row"> 
                     <div onClick={() => this.setState({ create: true, draft: false, publish: false})} >
                     <button className="create_blog_tab">CREATE</button>
                     </div>
                     <div className="vl_1"></div>
                     <div onClick={() => this.setState({ create: false, draft: true, publish: false})} >
                     <button className="draft_blog_tab" >DRAFTS</button>
                     </div>
                     <div className="vl_2"></div>
                     <div onClick={() => this.setState({ create: false, draft: false, publish: true})} >
                     <button className="publish_blog_tab active" >PUBLISHED</button>
                     </div>
                 
                 </div>
                }

                {this.state.create &&
                    <div className="container create_sec">
                        <div className="col-50">
                         <form>
                            <label className="label_name" for="btitle">Blog Title</label>
                            <input maxlength="25" type="text" className="input_blog_text" name="title" id="title" value = {this.state.valuetitle} onChange={this.title_handleChange}/>
                            <label className="label_name" for="bdescription">Write your thoughts here</label>
                            <textarea type="text" className="input_blog_description" name="description" id="description" value = {this.state.valuedescription} onChange={this.description_handleChange}/>
                            <label className="label_name" for="bpic">Post pictures</label>
                            <input type="file" accept="image/x-png,image/gif,image/jpeg" required className="input_blog_upload" name ="bpic" id ="bpic" value={this.state.images} onChange={this.pic_handleChange} multiple/>
                            <label className="label_upload">Please upload an image less than 1MB</label>
                            
                            <div className="row">
                                <div class="col-25 bbb">
                                <input type="button" value="SAVE IN DRAFTS" className="blog_btn" onClick={this.draft_handleClick}/>
                          
                                {handleResponse &&<p className={handleResponse.isSuccess ? "success" : "error"}>{handleResponse.message}</p>}
                                
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
    }


                {this.state.draft && 
                    <div className="blogsavdraft">
                        <Draftblog/>
                   </div>
                }

                {this.state.publish &&
                
                <div className="blogdisp">
                        <Publishedblog/>
                    </div>
                
                }
            </div>
        </div>
)
}
    
}
export default Blogs;