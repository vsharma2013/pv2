import React from 'react';
import './newsletter.css';
import axios from 'axios';
import newsletterbg from '../assets/images/news.jpg'; 
import SweetAlert from 'react-bootstrap-sweetalert';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import StackGrid from "react-stack-grid";

class NewsLetter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loggedinuseremail:'',
            subscribed:false,
            subscribe:true,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.setState({
            // loggedin:localStorage.getItem("loggedin"),
            loggedinuseremail:localStorage.getItem("loggedInUseremail")
            // loggedinusername:localStorage.getItem("loggedInUsername")
        })
        } 
        myChangeHandler = (event) => {
            let nam = event.target.name;
            let val = event.target.value;
            this.setState({loggedinuseremail: val, subscribedbtn:false, subscribed:false, subscribe:true});
          }
        
        handleSubmit = async () => {
            // event.preventDefault();  
            // if(this.state.loggedinuseremail){  
          console.log('NEWSLETTER')
          axios.post('https://www.propviewz.com/be/save_user_subscribe/',{ 
              email:this.state.loggedinuseremail?this.state.loggedinuseremail:this.state.email?this.state.email:null
          }       
             );
             this.setState({
                alreadySubscribed:true, subscribed:true, subscribe:false, subscribedbtn:false
            })
         
        // }
          }

    render(){
        console.log("newsletter")
        console.log(this.state)
    return (
        <div className="news">
            <div  style={{'marginTop': '2%'}} >

                <div >

            <form >
                <div  className="newsemail">
                <p className="newsletter">NEWSLETTER</p>
                <p className="subs">Don't miss to subscribe to our news feeds</p>
                    <input className="inputnews"  type="email" name="email" value={this.state.loggedinuseremail?this.state.loggedinuseremail:this.state.email?this.state.email:''} onChange={this.myChangeHandler}  placeholder="Enter Email ID"/>
                {this.state.subscribe &&
                <button className="inputbtn"  type="button" onClick={this.handleSubmit}>SUBSCRIBE </button>
                }
                {this.state.subscribed &&
                
                        <SweetAlert
        success
        show={this.state.subscribed}
        confirmBtnBsStyle={'secondary'}
        style={{ fontFamily:'Catamaran-Semibold',color: '#404041' }}
        // title="Please Login or Signup to mark the project as favourite."
        // text="SweetAlert in React"
        // showCancelButton
        onConfirm={() => {
          // console.log('confirm');
          this.setState({ subscribe: false ,subscribed: false ,subscribedbtn: true });
        }}
        onCancel={() => {
          // console.log('cancel');
          this.setState({subscribe: false ,subscribed: false ,subscribedbtn: true});
        }}
        timeout={600000}
        onEscapeKey={() => this.setState({ subscribe: false ,subscribed: false ,subscribedbtn: true})}
        onOutsideClick={() => this.setState({ subscribe: false ,subscribed: false,subscribedbtn: true })}
        // confirmBtnBsStyle={"danger"}
        
      >
       Thankyou for Subscribing to our News Feeds.
      </SweetAlert>
               
               
                }
                {this.state.subscribedbtn &&
                     <button className="inputbtn"  type="button" disabled>SUBSCRIBED </button>
                }
                </div>
                
          
            </form>
        </div>
    {/* </div> */}

            </div>
        {/* <img className="imagenews"src={newsletterbg}/> */}

        </div>
)
  }  
}
export default NewsLetter;