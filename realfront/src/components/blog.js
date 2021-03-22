import React from 'react';
import './blog.css';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import StackGrid from "react-stack-grid";
import blog1 from '../assets/images/blog1.jpg'; 
import blog2 from '../assets/images/blog2.jpg';
import blog3 from '../assets/images/blog3.jpg';
import user2 from '../assets/images/user2.png'; 
import user3 from '../assets/images/user3.png'; 
import user4 from '../assets/images/user4.png'; 
import 'regenerator-runtime/runtime';

import PublicBlog from './PublicBlogs';

class Blog extends React.Component{
    constructor(props){
        super(props);
        this.state={
        projectmedia:"",
        more:false,
        match:""
        }

        this.seemoreHandler = this.seemoreHandler.bind(this);

    }
    projectmediafetch = async () =>{
        try{    
        // const { project_id } = this.props.match.params
        //dev
        // let projectdetails = await axios.get(`http://localhost:8081/projects`); 
        //aws
        let projectdetails = await axios.get(`https://www.propviewz.com/be/fetch_publish_blog/`); 
        console.log("DASHBOARD BLOG API DATA");
        console.log(projectdetails.data);
        this.setState({projectmedia:projectdetails.data})
        }
        catch(e){
          console.log(e);
        }
      }
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
        console.log("BLOGGGGGGG yeash")
        await this.projectmediafetch();
      }

      seemoreHandler(){
        console.log("CHECKING PUBLIC")
       console.log(this.state); 
       window.open('/Blogs', '_blank');
      }

      render(){
console.log("DATA BLOG")
console.log(this.state);
console.log(this.props);
let blog_id0=this.state.projectmedia?this.state.projectmedia[0].blog_id:77;
let blog_id1=this.state.projectmedia?this.state.projectmedia[2].blog_id:81;
let blog_id2=this.state.projectmedia?this.state.projectmedia[3].blog_id:82;
let blog_id3=this.state.projectmedia?this.state.projectmedia[4].blog_id:83;


    return (
        <div className="col-12 blog" style={{'marginTop':'-2%'}}>
        {/* <h3 className="heading4">&nbsp;</h3> */}
        <div className="responsive_blogs" >
          <div className="grid-containerB">
          {/* <a href={'/Blog/'+blog_id0} className="anchorstyle">
          <div className="boxB"> */}
                {/* <span className="circle">
                <img className="imagecircle"src={user1}/>
                </span> */}
                    {/* <div className="imageframe">
                    <p className="paraheading">{this.state.projectmedia?this.state.projectmedia[21].blog_title:null}</p>
                    <img className="imagebox3wide"src={this.state.projectmedia?this.state.projectmedia[21].media_link:null}/>
                    </div>
                    <div className="contentframe"> */}
                     
                        {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                    {/* </div>
                </div></a> */}


                <div className="grid-containerS">
                <a href={'/Blog/'+blog_id0} className="anchorstyle">
              <div className="box4">
              {/* <span className="circle">
              <img className="imagecircle"src={user2}/>
              </span> */}
                  <div className="imageframe">
                  <p className="paraheadingduo">{this.state.projectmedia?this.state.projectmedia[0].blog_title:null}</p>
                  <img className="imagebox3"src={this.state.projectmedia?this.state.projectmedia[0].media_link:null}/>
                  </div>
                    <div className="contentframe"> 
                      {/* <p className="paraheadingduo">Birla Appartments</p>  */}
                      {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                  </div>
              </div></a>
              <div> <a href={'/Blog/'+blog_id1} className="anchorstyle">
              <div className="box4">
              {/* <span className="circle">
              <img className="imagecircle"src={user3}/>
              </span> */}
                  <div className="imageframe">
                  <p className="paraheadingduo">{this.state.projectmedia?this.state.projectmedia[1].blog_title:null}</p>
                  <img className="imagebox3"src={this.state.projectmedia?this.state.projectmedia[1].media_link:null}/>
                  </div>
                  <div className="contentframe">
                      {/* <p className="paraheadingduo">Birla Appartments</p> */}
                      {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                  </div>
              </div></a> 
              </div>
              </div> 


                <div className="grid-containerS">
                <a href={'/Blog/'+blog_id2} className="anchorstyle">
              <div className="box4">
              {/* <span className="circle">
              <img className="imagecircle"src={user2}/>
              </span> */}
                  <div className="imageframe">
                  <p className="paraheadingduo">{this.state.projectmedia?this.state.projectmedia[2].blog_title:null}</p>
                  <img className="imagebox3"src={this.state.projectmedia?this.state.projectmedia[2].media_link:null}/>
                  </div>
                    <div className="contentframe"> 
                      {/* <p className="paraheadingduo">Birla Appartments</p>  */}
                      {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                  </div>
              </div></a>
              <div> <a href={'/Blog/'+blog_id3} className="anchorstyle">
              <div className="box4">
              {/* <span className="circle">
              <img className="imagecircle"src={user3}/>
              </span> */}
                  <div className="imageframe">
                  <p className="paraheadingduo">{this.state.projectmedia?this.state.projectmedia[3].blog_title:null}</p>
                  <img className="imagebox3"src={this.state.projectmedia?this.state.projectmedia[3].media_link:null}/>
                  </div>
                  <div className="contentframe">
                      {/* <p className="paraheadingduo">Birla Appartments</p> */}
                      {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                  </div>
              </div></a> 
              </div>
              </div>    
          </div>
          {!this.state.more &&
          <div className="col-6 seemore_web_blog" onClick={this.seemoreHandler}>See More</div>
          
          }
          {this.state.more &&
          <div style={{'marginTop':'-2%'}}>
          <div className="grid-containerB">
          <div className="boxB">
                {/* <span className="circle">
                <img className="imagecircle"src={user1}/>
                </span> */}
                    <div className="imageframe">
                    <p className="paraheading">Birla Appartments</p>
                    <img className="imagebox3wide"src={blog1}/>
                    </div>
                    <div className="contentframe">
                     
                        {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                    </div>
                </div>
                <div className="grid-containerS">
              <div className="box4">
              {/* <span className="circle">
              <img className="imagecircle"src={user2}/>
              </span> */}
                  <div className="imageframe">
                  <p className="paraheadingduo">Birla Appartments</p>
                  <img className="imagebox3"src={blog2}/>
                  </div>
                    <div className="contentframe"> 
                      {/* <p className="paraheadingduo">Birla Appartments</p>  */}
                      {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                  </div>
              </div>
              <div className="box4">
              {/* <span className="circle">
              <img className="imagecircle"src={user3}/>
              </span> */}
                  <div className="imageframe">
                  <p className="paraheadingduo">Birla Appartments</p>
                  <img className="imagebox3"src={blog3}/>
                  </div>
                  <div className="contentframe">
                      {/* <p className="paraheadingduo">Birla Appartments</p> */}
                      {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                  </div>
              </div> 
              </div>    
          </div>
          <div className="col-6 seemore_web_blog" onClick={() => this.setState({ more: false })}>See Less</div></div>
      }
        <div className=" grid4">
            
        <StackGrid className="container big" columnWidth={1165} gutterHeight={15} gutterWidth={55}>
            
                <div className="box4">
                {/* <span className="circle">
                <img className="imagecircle"src={user1}/>
                </span> */}
                    <div className="imageframe">
                    <p className="paraheading">Birla Appartments</p>
                    <img className="imagebox3wide"src={blog1}/>
                    </div>
                    <div className="contentframe">
                     
                        {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                    </div>
                </div>
                </StackGrid>
                <StackGrid className="container mid" columnWidth={575} gutterHeight={15}  gutterWidth={20}>
                <div className="box4">
                {/* <span className="circle">
                <img className="imagecircle"src={user2}/>
                </span> */}
                    <div className="imageframe">
                    <p className="paraheadingduo">Birla Appartments</p>
                    <img className="imagebox3"src={blog2}/>
                    </div>
                      <div className="contentframe"> 
                        {/* <p className="paraheadingduo">Birla Appartments</p>  */}
                        {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                    </div>
                </div>
                <div className="box4">
                {/* <span className="circle">
                <img className="imagecircle"src={user3}/>
                </span> */}
                    <div className="imageframe">
                    <p className="paraheadingduo">Birla Appartments</p>
                    <img className="imagebox3"src={blog3}/>
                    </div>
                    <div className="contentframe">
                        {/* <p className="paraheadingduo">Birla Appartments</p> */}
                        {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                    </div>
                </div>
 
                {/* <div className="box4"key="key2">Item 2</div>
                <div className="box4" key="key3">Item 3</div>
                <div className="box4"key="key4">Item 4</div> */}
                {/* <div className="box4"key="key5">Item 5</div>
                <div className="box4"key="key6">Item 6</div> */}
            </StackGrid>
            {!this.state.more &&
             <a href={'/Blog/'+blog_id0} className="anchorstyle">
            <div className="box4">
                {/* <span className="circle">
                <img className="imagecircle"src={user3}/>
                </span> */}
                    <div className="imageframe">
                    <p className="paraheadingduo">{this.state.projectmedia?this.state.projectmedia[0].blog_title:null}</p>
                    <img className="imagebox3"src={this.state.projectmedia?this.state.projectmedia[0].media_link:null}/>
                    </div>
                    <div className="contentframe">
                        {/* <p className="paraheadingduo">Birla Appartments</p> */}
                        {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                    </div>
                </div>
                </a>
              }
              
                {this.state.more &&
                 <a href={'/Blog/'+blog_id2} className="anchorstyle">
                <div className="box4">
                {/* <span className="circle">
                <img className="imagecircle"src={user3}/>
                </span> */}
                    <div className="imageframe">
                    <p className="paraheadingduo">{this.state.projectmedia?this.state.projectmedia[2].blog_title:null}</p>
                    <img className="imagebox3"src={this.state.projectmedia?this.state.projectmedia[2].media_link:null}/>
                    </div>
                    <div className="contentframe">
                        {/* <p className="paraheadingduo">Birla Appartments</p> */}
                        {/* <p className="col-12 detailblog">London Finance Manager and Mum Marsha was able to research, view and check into her new rental home remotely during lockdown, relying on HomeViews reviews, videos and Fizzy Living’s excellent reputation in order to make her decision.</p> */}
                    </div>
                </div>
                </a>}


          
            {!this.state.more &&
            <div className="seemore1" onClick={this.seemoreHandler}>See More</div>
            }
            {this.state.more &&
              <div className="seemore1" onClick={() => this.setState({ more: false })}>See Less</div>
            }
            </div>
            
            </div>
        </div>
)
            }
    
}
export default Blog;