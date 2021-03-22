import React from 'react';
import './location_dropdown.css';
import 'regenerator-runtime/runtime';

class Location extends React.Component{
    constructor(props){
        super(props);
        this.state={
        projectmedia:"",
        match:""
        }
    }
   
      render(){
        console.log("location_drop")

        console.log(this.state)
        console.log(this.props)
    return (
        <div className="maindivbox">
        <div className="location_drop" >
        <div className="pick_location">Select Your City</div>
        {/* <div className="drop_locationoption" value="delhi">India</div>
        <div className="drop_locationoption" value="mumbai">Mumbai</div>
        <div className="drop_locationoption" value="bangalore">Bangalore</div>
        <div className="drop_locationoption" value="pune">Pune</div>
        <div className="drop_locationoption" value="thane">Thane</div> */}

        <section class="loc_drop cf">
                <input type="radio"  name="city" id="India" value="India" onChange={this.props.myChangeHandler}/>
                <label className="drop_locationoption" for="India">All India</label>
			    {/* <input type="radio"  name="city" id="Mumbai" value="Mumbai" onChange={this.props.myChangeHandler}  />
                <label className="drop_locationoption" for="Mumbai">Mumbai</label>
			    <input type="radio" name="city" id="Bangalore" value="Bangalore" onChange={this.props.myChangeHandler} />
               <label className="drop_locationoption" for="Bangalore">Bangalore</label> 
               <input type="radio"  name="city" id="Pune" value="Pune" onChange={this.props.myChangeHandler} />
               <label className="drop_locationoption" for="Pune">Pune</label> 
               <input type="radio"  name="city" id="Thane" value="Thane" onChange={this.props.myChangeHandler} />
               <label className="drop_locationoption" for="Thane">Thane</label>  */}

               </section>
            <section class="city_drop cf">
                {/* <input type="radio"  name="city" id="India" value="India" onChange={this.props.myChangeHandler}/>
                <label className="drop_locationoption" for="India">India</label> */}
                {/* <div className="pick_location">Popular Cities</div> */}
                {/* <input type="radio" name="city" id="Bangalore" value="Bangalore" onChange={this.props.myChangeHandler} />
               <label className="drop_locationoption" for="Bangalore">Bangalore</label>  */}
               {/* <input type="radio"  name="city" id="Goa" value="Goa" onChange={this.props.myChangeHandler} />
               <label className="drop_locationoption" for="Goa">Goa</label>  */}
			    <input type="radio"  name="city" id="Mumbai" value="Mumbai" onChange={this.props.myChangeHandler}  />
                <label className="drop_locationoption" for="Mumbai">Mumbai</label>
               <input type="radio"  name="city" id="Pune" value="Pune" onChange={this.props.myChangeHandler} />
               <label className="drop_locationoption" for="Pune">Pune</label> 
               {/* <input type="radio"  name="city" id="Thane" value="Thane" onChange={this.props.myChangeHandler} />
               <label className="drop_locationoption" for="Thane">Thane</label>  */}


               </section>
        </div>
        </div>
)
            }
    
}
export default Location;