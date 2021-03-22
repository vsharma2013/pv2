import React, { Component } from "react";

import "./shareModalbox.css";
import {
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,

} from "react-share";

import closebutton from '../../assets/icons/shareModalboxclose.svg';

class Modal extends Component {
  render() {
    const shareUrl = String(this.props.copiedlink);
    const title = 'Reviewer Name: '+this.props.name + '\n\n' + 'Review: ' + this.props.review + '\n\n';
    // console.log(this.props,"from modal");
    // console.log(shareUrl);
    return (
      <React.Fragment>
        {this.props.show && (
          <div className="parent">
            <div className="overlay"></div>
          <div className="modalshare">
            <h3 style={{fontSize:'24px'}}>Share via:</h3>
            {/* <h2>{this.props.copiedlink}</h2> */}
            
            <div style={{padding:'20px'}}>
            <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
            onClick={this.props.onHide}
            >
            <FacebookIcon size={35} round />
            <span style={{marginLeft:'10px',fontSize: '24px', verticalAlign: 'middle'}}>Facebook</span>
            </FacebookShareButton>
            <br></br>
            <br></br>

            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator="  "
              className="Demo__some-network__share-button"
              onClick={this.props.onHide}
            >
              <WhatsappIcon size={35} round />
              <span style={{marginLeft:'10px',fontSize: '24px', verticalAlign: 'middle'}}>Whatsapp</span>
            </WhatsappShareButton>
            </div>

          {/* <LinkedinShareButton url={shareUrl} title={'hello'} summary={'summary'} source={'source tag'} className="Demo__some-network__share-button">
            <LinkedinIcon size={35} round />
          </LinkedinShareButton> */}

            {/* <button onClick={this.props.onHide}>Close Modal</button> */}
            <img src={closebutton} style={{top: '5px', right: '5px', position: 'absolute',width:'13px',cursor: 'pointer'}} onClick={this.props.onHide}/>
          </div> </div>
        )}
       
      </React.Fragment>
    );
  }
}

export default Modal;

