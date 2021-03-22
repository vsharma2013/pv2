import React from 'react';
import './footer.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import StackGrid from "react-stack-grid";
import footerimg from '../assets/images/footer.jpg'
import insta from '../assets/icons/insta.png';
import fb from '../assets/icons/fb.png';
import twitter from '../assets/icons/twitter.png';
import pinterest from '../assets/icons/pinterest.png';
import linkedin from '../assets/icons/linkedin_white.png';
import ContactUs from '../components/ContactUs/contact';

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state={
        contactus: false,
        };
        this.contactClose = this.contactClose.bind(this);
    }
   
    contactClose (){
        this.setState({contactus: false});
    }

    render(){

        console.log("FOOTER")

        console.log(this.state)
        console.log(this.props)

    return (
        <div class="footer" style={{zIndex:'100'}}>
            {/* <img className="foot1" src={footerimg}/> */}
        <div className="container-fluid">
          <div className="row">
          <div className="col-xs-6 col-md-3">
              <div className="footercol1">
                <h4 className="footerbigtext">QUICK LINKS</h4>
                <h4 className="footersmalltext"><a href="/" style={{color:'white'}}>HOME</a></h4> 
                {/* <h4 className="footersmalltext"><a href="#" style={{color:'white'}}>MOST TRENDING</a></h4>
                <h4 className="footersmalltext"><a href="#" style={{color:'white'}}>TOP RATED</a></h4>
                <h4 className="footersmalltext"><a href="#" style={{color:'white'}}>RECENTLY LAUNCHED</a></h4> */}
                <h4 className="footersmalltext"><a href="/Blogs" style={{color:'white'}}>OUR BLOGS</a></h4>
                
                {/* <h4 className="footersmalltext dont-show-on-web">PROPERTY</h4> */}
              </div>     
            </div>
            {/* <div className="col-xs-6 col-md-3 dont-show-on-mobile1"> */}
            <div className="col-xs-6 col-md-3 propertyname">
                <a href="/Location/Mumbai" target="_blank"><h4 className="footersmalltext">Property in Mumbai</h4> </a>
                <a href="/Location/Ravet,PUNE" target="_blank"><h4 className="footersmalltext">Property in Ravet</h4></a>
                <a href="/Location/Pashan,PUNE" target="_blank"><h4 className="footersmalltext">Property in Pashan</h4></a>
                <a href="/Location/balewadi,PUNE" target="_blank"><h4 className="footersmalltext">Property in Balewadi</h4></a>
                <a href="/Location/Mulshi,PUNE" target="_blank"><h4 className="footersmalltext">Property in Mulshi</h4></a>
            </div>

            <div className="col-xs-6 col-md-3 propertyname">
            <a href="/Location/Wakad,PUNE" target="_blank"><h4 className="footersmalltext">Property in Wakad</h4> </a>
            <a href="/Location/PUNE" target="_blank"><h4 className="footersmalltext">Property in Pune</h4></a>
            <a href="/Location/Hinjawadi,PUNE" target="_blank"><h4 className="footersmalltext">Property in Hinjawadi</h4></a>
            <a href="/Location/Baner,PUNE" target="_blank"><h4 className="footersmalltext">Property in Baner</h4></a>
            <a href="/Location/Tathawade,PUNE" target="_blank"><h4 className="footersmalltext">Property in Tathawade</h4></a>
            </div>

            <div className="col-xs-6 col-md-3">
            <div className="footercol1">
            {/* <h4 className="footerbigtext" style={{visibility:"hidden"}}>QUICK LINKS</h4> */}
            <div>
                <h4 className="footerbigtextcontact" onClick={() => this.setState({contactus: true})}>CONTACT US</h4>
                {this.state.contactus && 
                    <ContactUs
                    show={this.state.contactus}
                    onHide={this.contactClose.bind(this)}
                                       />
                }
              </div> 
                <h4 className="footersmalltext"><a href="#" style={{color:'white',fontWeight:'500'}}>Privacy Policy</a></h4> 
                <h4 className="footersmalltext"><a href="#" style={{color:'white',fontWeight:'500'}}>Term &amp; conditions</a></h4> 
                <h4 className="footersmalltext"><a href="#" style={{color:'white',fontWeight:'500'}}>Sitemap</a></h4> 
              </div>  
            </div>
            <div className="col-xs-6 col-md-3">
            <div className="footercol1">
                <div className="footericons">
                <a href ="https://www.instagram.com/propviewz/">
                  <img className="footerimagestyle" src={insta}/> </a>
                  <a href ="https://www.facebook.com/propviewz/?modal=admin_todo_tour" >
                  <img className="footerimagestyle" src={fb}/></a>
                  <a href ="https://twitter.com/propviewz">
                  <img className="footerimagestyle" src={twitter}/></a>
                  <a href ="https://in.pinterest.com/PROPVIEWZ/">
                  <img className="footerimagestyle" src={pinterest}/>
                  </a>
                  <a href ="https://www.linkedin.com/company/68974999/">
                <img src={linkedin} className="footerimagestyle"/>
                    </a>
                </div>
                {/* <h4 className="footersmalltext">Property in Mumbai</h4> 
                <h4 className="footersmalltext">Property in Thane</h4>
                <h4 className="footersmalltext">Property in Pune</h4>
                <h4 className="footersmalltext">Property in Bellandur</h4>
                <h4 className="footersmalltext">Property in Noida</h4>
                <h4 className="footersmalltext">Property in Goa</h4> */}
              </div>  
            </div>
           


          </div>
          
          <div class="footer-copyright">
<div class="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
                             <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.6s" style={{'visibility': 'visible', 'animationDelay': '0.6s', 'animationName': 'fadeInLeft'}}>
                                 <ul className="list-unstyled f_list" >
                                 <li><label className="footersmalltextcopy">© Copyright 2020 Website by <a href="#" style={{color:'white',fontWeight:'500'}}>Comportement</a>. All Rights reserved.</label></li>
                                 {/* <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style={{color:'white',fontWeight:'500'}}>Privacy Policy</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
                                   <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#"style={{color:'white',fontWeight:'500'}}>Term &amp; conditions</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
                                   <li><a href="#"style={{color:'white',fontWeight:'500'}}>Sitemap</a></li> */}
                                </ul>
                            </div>
                        </div>
                        </div>
                        </div>
      
        </div>
    </div>

/* <footer className="new_footer_area bg_color">
            <div className="new_footer_top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s" style={{'visibility': 'visible', 'animationDelay': '0.2s', 'animationName': 'fadeInLeft'}}>
                                <h3 className="f-title f_600 t_color f_size_18">Get in Touch</h3>
                                <p>Don’t miss any updates of our new templates and extensions.!</p> */
                                /* <form action="#" className="f_subscribe_two mailchimp" method="post" noValidate={true} _lpchecked="1">
                                    <input type="text" name="EMAIL" className="form-control memail" placeholder="Email"/>
                                    <button className="btn btn_get btn_get_two" type="submit">Subscribe</button>
                                    <p className="mchimp-errmessage" style={{'display': 'none'}}></p>
                                    <p className="mchimp-sucmessage" style={{'display': 'none'}}></p>
                                </form> */
            //                 </div>
            //             </div>
            //             <div className="col-lg-3 col-md-6">
            //                 <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.4s" style={{'visibility': 'visible', 'animationDelay': '0.4s', 'animationName': 'fadeInLeft'}}>
            //                     <h3 className="f-title f_600 t_color f_size_18">Download</h3>
            //                     <ul className="list-unstyled f_list">
            //                         <li><a href="#">Company</a></li>
            //                         <li><a href="#">Android App</a></li>
            //                         <li><a href="#">ios App</a></li>
            //                         <li><a href="#">Desktop</a></li>
            //                         <li><a href="#">Projects</a></li>
            //                         <li><a href="#">My tasks</a></li>
            //                     </ul>
            //                 </div>
            //             </div>
            //             <div className="col-lg-3 col-md-6">
            //                 <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.6s" style={{'visibility': 'visible', 'animationDelay': '0.6s', 'animationName': 'fadeInLeft'}}>
            //                     <h3 className="f-title f_600 t_color f_size_18">Help</h3>
            //                     <ul className="list-unstyled f_list">
            //                         <li><a href="#">FAQ</a></li>
            //                         <li><a href="#">Term &amp; conditions</a></li>
            //                         <li><a href="#">Reporting</a></li>
            //                         <li><a href="#">Documentation</a></li>
            //                         <li><a href="#">Support Policy</a></li>
            //                         <li><a href="#">Privacy</a></li>
            //                     </ul>
            //                 </div>
            //             </div>
            //             <div className="col-lg-3 col-md-6">
            //                 <div className="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s" style={{'visibility': 'visible', 'animationDelay': '0.8s', 'animationName': 'fadeInLeft'}}>
            //                     <h3 className="f-title f_600 t_color f_size_18">Team Solutions</h3>
            //                     <div className="f_social_icon">
            //                         <a href="#" className="fab fa-facebook"></a>
            //                         <a href="#" className="fab fa-twitter"></a>
            //                         <a href="#" className="fab fa-linkedin"></a>
            //                         <a href="#" className="fab fa-pinterest"></a>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="footer_bg">
            //         <div className="footer_bg_one"></div>
            //         <div className="footer_bg_two"></div>
            //     </div>
            // </div>
            /* <div className="footer_bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-sm-7">
                            <p className="mb-0 f_400">© cakecounter Inc.. 2019 All rights reserved.</p>
                        </div>
                        <div className="col-lg-6 col-sm-5 text-right">
                            <p>Made with <i className="icon_heart"></i> in <a href="#">CakeCounter</a></p>
                        </div>
                    </div>
                </div>
            </div> */
        // </footer>
)
}  
}
export default Footer;