import React, { Component, useState } from "react";
import './location.css';
// import axios from 'axios';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import StackGrid from "react-stack-grid";
import user1 from '../../assets/icons/user1.png'; 
import user from '../../assets/icons/user1.png'; 
// import user1 from './assets/user.png'; 
import addimage from '../../assets/icons/add.png'; 
import down from '../../assets/icons/down.png'; 
// import user2 from '../assets/images/user2.png'; 
// import user3 from '../assets/images/user3.png'; 
// import user4 from '../assets/images/user4.png'; 
import 'regenerator-runtime/runtime';
import Footer from '../../components/footer';
import Search from '../../components/Search/search';
import { Tabs } from "@feuer/react-tabs";
import TopRated from '../../components/toprated';
import Sort from '../../assets/icons/sort.png';
import Filter from '../../assets/icons/filter.png';
import Share from '../../assets/icons/share.png';
import LogoIcon from '../../assets/icons/logo.png'
import LogoIconMobile from '../../assets/icons/logo_mobile.png'
import PostAPicture from '../../components/PostAPicture/postApicture';
import WriteReview from '../../components/WriteReview/createreview';
import MapLocations from '../../components/MapLocations/MapLocations';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import menu1icon from '../../assets/icons/menu1.png';
import StarRatings from 'react-star-ratings';
import menu2icon from '../../assets/icons/menu2.png';
import axios from 'axios';
import SignUp from '../../components/SignUp/signup';
import Login from '../../components/Login/login';
// import MobileSignup from '../components/MobileSignup/mobilesignup';
import MobileSignup from '../../components/MobileSignup/mobilesignup';
import Registration from '../../components/Registration/registration';
import ClipLoader from "react-spinners/PuffLoader";
import CancelButton from '../../assets/icons/cancel.png';
import SerachBannermob from '../../assets/images/bannermob.png';
import SerachBannerweb from '../../assets/images/bannerweb.png';

let LoggedIn = '';
let LoggedInUserEmail = '';
class RecentLocationSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
        projectmedia:"",
        MapisOpen:false,
        ListisOpen: true,
        match:"",
        showComponent_rating:false,
        showComponent_property:false,
        showComponent_budget:false,
        showComponent_amenities:false,
        showComponent_possession:false,
        showComponent_sort:false,
        
        showComponent:false,
        showComponent1:false,
        onDone:false,
        min:true,
        max:false,
        locationdetails:'',
        myData:'',
        rating:'',
        property:'',
        // min_amount:'',
        // max_amount:'',
        budget_amount:'',
        amenities:'',
        possession:'',
        sort:["New projects"],
        min1:'',
       btn1:'',
       btn2:'',
       btn3:'',
       btn4:'',
       btn5:'',
       btn6:'',
       font_color1:'black',
       font_color2:'black',
       font_color3:'black',
       font_color4:'black',
       font_color5:'black',
       font_color6:'black',
        searched_location:[this.props.match.params.location],
        mob_main_component : false,
        mob_property_component:true,
        mob_rating_component:false,
        mob_amenities_component:false,
        mob_possession_component:false,
        mob_budget_component: false,
        mob_prop_color:'',
        mob_prop_border:'',
        mob_amen_color:'',
        mob_amen_border:'',
        mob_poss_color:'',
        mob_poss_border:'',
        mob_bud_color:'',
        mob_bud_border:'',
        mob_min_list:true,
        mob_max_list:false,
        mob_rating_values:'',
        mob_prop_values:'',
        mob_amen_values:'',
        mob_poss_values:'',
        min_text_val:'',
        mob_budget_values:'',
        min_text:'Min',
        loading:true,

        loginComponent:false,
        signupComponent:false,
        mloginComponent:false,
        registerComponent:false,
        loggedin:false,
    loggedinuseremail:"",
    loggedinusername:"",
       
        }
        
        this.inputRef = React.createRef()
        this.inputRef_mob = React.createRef()
        this.onButtonClick_rating = this.onButtonClick_rating.bind(this);
        this.onButtonClick_property= this.onButtonClick_property.bind(this);
        this.onButtonClick_budget= this.onButtonClick_budget.bind(this);
        this.onButtonClick_amenities= this.onButtonClick_amenities.bind(this);
        this.onButtonClick_possession= this.onButtonClick_possession.bind(this);
        this.onButtonClick_sort= this.onButtonClick_sort.bind(this);
        this.onBudget_min= this.onBudget_min.bind(this);
        this.onBudget_max= this.onBudget_max.bind(this);
        this.onDone=this.onDone.bind(this);
        this.ratingText=this.ratingText.bind(this);
        this.amenitiesText=this.amenitiesText.bind(this);
        this.propertyText=this.propertyText.bind(this);
        this.possessionText=this.possessionText.bind(this);
        this.sortText=this.sortText.bind(this);
        // this.min_list=this.min_list.bind(this);
         this.display_min=this.display_min.bind(this);
         this.display_max=this.display_max.bind(this);
         this.budgetText=this.budgetText.bind(this);
        //  this.checkBoxCheck1=this.checkBoxCheck1.bind(this); 
        //  this.checkBoxCheck2=this.checkBoxCheck2.bind(this); 
        //  this.checkBoxCheck3=this.checkBoxCheck3.bind(this); 
        //  this.checkBoxCheck4=this.checkBoxCheck4.bind(this); 
        //  this.checkBoxCheck5=this.checkBoxCheck5.bind(this); 
         this.AddReview = this.AddReview.bind(this);
    this.AddPicture = this.AddPicture.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.mobMainComponent= this.mobMainComponent.bind(this);
    this.mob_property= this.mob_property.bind(this);
    this.mob_rating= this.mob_rating.bind(this);
    this.mob_amen= this.mob_amen.bind(this);
    this.mob_poss= this.mob_poss.bind(this);
    this.mob_budget= this.mob_budget.bind(this);
    this.mob_component_close= this.mob_component_close.bind(this);  
    
    this.on_mob_budget_min=this.on_mob_budget_min.bind(this);
    this.on_mob_budget_max = this.on_mob_budget_max.bind(this);
    this.mob_display_min=this.mob_display_min.bind(this);
    this.mob_display_max=this.mob_display_max.bind(this);
    // this.on_mob_rating_done = this.on_mob_rating_done.bind(this);
    // this.on_mob_property_done = this.on_mob_property_done.bind(this);
    this.on_rating_done= this.on_rating_done.bind(this);
    this.on_prop_done= this.on_prop_done.bind(this);
    this.on_amen_done = this.on_amen_done.bind(this);
    this.on_poss_done = this.on_poss_done.bind(this);
    // this.rating_state= this.rating_state.bind(this);
    this.mob_clearAll = this.mob_clearAll.bind(this);
    this.bud_clearAll = this.bud_clearAll.bind(this);
    this.on_mob_done = this.on_mob_done.bind(this);
    this.on_budget_done = this.on_budget_done.bind(this);
    // this.prop_clear = this.prop_clear.bind(this);
    // this.rating_clear = this.rating_clear.bind(this);
    // this.amen_clear = this.amen_clear.bind(this);
    // this.poss_clear = this.poss_clear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signup = this.signup.bind(this);
  
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.openlogin1 = this.openlogin1.bind(this);
    this.loginsuccess = this.loginsuccess.bind(this);
    this.mobilesignup = this.mobilesignup.bind(this);
    this.opennotif = this.opennotif.bind(this);
    this.close = this.close.bind(this);

    this.closenotif = this.closenotif.bind(this);
    // this.proj_len = this.proj_len.bind(this);
    }

    componentDidMount() {
       this.handleSubmit();
      document.addEventListener('mousedown', this.handleClickOutside);
      this.setState({loggedin:localStorage.getItem("loggedin"), loggedinuseremail:localStorage.getItem("loggedInUseremail"),loggedinusername:localStorage.getItem("loggedInUsername"),city:localStorage.getItem("city")})
      setTimeout(()=>{this.setState({loading: false})}, 5000)
    }
  
    async componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
      // setTimeout(()=>{this.setState({loading: false})}, 5000)
    }
    setWrapperRef(node) {
      this.wrapperRef = node;
    }

    handleSubmit = async () => {
      // event.preventDefault();    
      if(this.state.sort.includes('Recently Launched')){
        if(this.state.sort.length==2){
          console.log(this.state.sort.length)
        this.state.sort.splice(1, this.state.sort.length, 'New projects'); }
        else if(this.state.sort.length==3){
          console.log(this.state.sort.length)
        this.state.sort=['Top trending','Top Rated', 'New projects']; 
        }
        else{
          this.state.sort=['New projects']; 
        }
        console.log('MATHEW LOCATION SEARCH')
        console.log(this.state)
      }
    let filtered_projectdetails = await axios.post('https://www.propviewz.com/be/location_page_filter/',{ 
        searched_location:this.state.searched_location?this.state.searched_location:null,
        overall_rating:(this.state.rating)?this.state.rating:(this.state.mob_rating_values)?this.state.mob_rating_values:null,
        property_type:(this.state.property)?this.state.property:(this.state.mob_prop_values)?this.state.mob_prop_values:null,
        budget:(this.state.budget_amount)?this.state.budget_amount:(this.state.mob_budget_values)?this.state.mob_budget_values:null,
        amenities:(this.state.amenities)?this.state.amenities:(this.state.mob_amen_values)?this.state.mob_amen_values:null,
        possession_status:(this.state.possession)?this.state.possession:(this.state.mob_poss_values)?this.state.mob_poss_values:null,
        sort_by:this.state.sort?this.state.sort:null,
    }
              
       );
    console.log("FILTERED PROJECT")
    console.log(filtered_projectdetails.data)
    if(filtered_projectdetails.data.Response!="N/A"){
      console.log("FILTERED PROJECTsssssssss")
      
      this.setState({filtered_projectdetails:filtered_projectdetails.data, locationalllinksdetails:filtered_projectdetails.data})

    }
    else{
      console.log("sssssssss")
      this.setState({filtered_projectdetails: false, locationalllinksdetails:false})
    }
  
    }
    getPositionlongitude(s) {
      // var maplink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7777.678540293056!2d77.6153493503024!3d12.918049989780634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14559a0550cb%3A0xd34d84a4d288974e!2sSpurthy%20Hospital!5e0!3m2!1sen!2sin!4v1596102074029!5m2!1sen!2sin";
      var a1 ="2d";
      var b1 ="!";
      var p1 = s.indexOf(a1) + a1.length;
      var longitude = s.substring(p1, s.indexOf(b1, p1));
      return longitude;
      
    }
  
    getPositionlatitude(s) {
      // var maplink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7777.678540293056!2d77.6153493503024!3d12.918049989780634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14559a0550cb%3A0xd34d84a4d288974e!2sSpurthy%20Hospital!5e0!3m2!1sen!2sin!4v1596102074029!5m2!1sen!2sin";
    var a ="3d";
    var b ="!";
    var p = s.indexOf(a) + a.length;
    var latitude = s.substring(p, s.indexOf(b, p));
    return latitude;
    }
  
    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.setState({
        
          showComponent_rating: false,
          showComponent_budget: false,
          showComponent_amenities: false,
          showComponent_possession: false,
          showComponent_sort: false,
          showComponent_property: false,
          
        });
      }
    }
    AddReview(){
      console.log("Add review function")
      this.setState({
        showComponent: true, showComponent1: false
      });
    }
  
    AddPicture(){
      console.log("Add Picture function");
      this.setState({
        showComponent1: true, showComponent: false
      });
    }
    onClose(){
      this.setState({
        showComponent1: false,showComponent: false,
      });
    }
   
    removeLocation = i => {
        const searched_location = this.state.searched_location
        searched_location.splice(i, 1)
        this.setState({
            searched_location: searched_location
        })
        this.handleSubmit();
    }

    addLocation = e => {
        const searched_location = this.state.searched_location
        const value = e.target.value
      // console.log(value)
        if(e.key === "Enter" && value){
          // var lenss = searched_location.length;
          // console.log("lens")
          // console.log(searched_location[0])
        //  var a= searched_location[0].length;
        //   console.log(a)
        //   var str1="...."
        //   if(a>15)
        //   {
        //     var ss=searched_location[0].concat(str1)
        //     console.log(s);
        //   }
          // les=a.length
          // console.log(les)
          // console.log(lenss)
            // check if duplicate entry
            if(searched_location.find(searched_location => searched_location.toLowerCase() === value.toLowerCase())){
                return alert("No duplicate value allowed")
            }
            // else add entry to searched_location array
            searched_location.push(value)
            // set new state
            this.setState({
                searched_location
            })
            this.handleSubmit();
            console.log("loccc",this.state.searched_location)
            // when submit entry, set current input filed null
            this.inputRef.current.value = null
            this.inputRef_mob.current.value = null
        } else if(e.key === "Backspace" && !value){
            // if no value and hit backspace we will remove previous entry
            this.removeLocation(searched_location.length - 1)
        }
    }
    

    



    onButtonClick_rating(){
      this.setState({
        btn1:"#ef403c",btn2:"white",btn3:"white",btn4:"white",btn5:"white",btn6:"white",
        font_color1:"white",font_color2:'black',font_color3:'black',font_color4:'black',font_color5:'black',font_color6:'black',
        showComponent_rating: true,
        showComponent_budget: false,
        showComponent_amenities: false,
        showComponent_possession: false,
        showComponent_sort: false,
        showComponent_property: false,})
        
    }
    onButtonClick_property(){
      this.setState({
        btn1:"white",btn2:"#ef403c",btn3:"white",btn4:"white",btn5:"white",btn6:"white",
        font_color1:"black",font_color2:'white',font_color3:'black',font_color4:'black',font_color5:'black',font_color6:'black',
        showComponent_property: true,
        showComponent_rating: false,
        showComponent_budget: false,
        showComponent_amenities: false,
        showComponent_possession: false,
        showComponent_sort: false,
        showComponent_property: true,
       
      });
    }

    onButtonClick_budget(){
      this.setState({
        btn1:"white",btn2:"white",btn3:"#ef403c",btn4:"white",btn5:"white",btn6:"white",
        font_color1:"black",font_color2:'black',font_color3:'white',font_color4:'black',font_color5:'black',font_color6:'black',
        showComponent_budget: true,
        showComponent_amenities: false,
        showComponent_possession: false,
        showComponent_sort: false,
        showComponent_property: false,
        showComponent_rating: false,
      });
    }
    onButtonClick_amenities(){
      this.setState({
        btn1:"white",btn2:"white",btn3:"white",btn4:"#ef403c",btn5:"white",btn6:"white",
        font_color1:"black",font_color2:'black',font_color3:'black',font_color4:'white',font_color5:'black',font_color6:'black',
        showComponent_amenities: true,
        showComponent_budget: false,
        // showComponent_amenities: false,
        showComponent_possession: false,
        showComponent_sort: false,
        showComponent_property: false,
        showComponent_rating: false,
      });
    }

    onButtonClick_possession(){
      this.setState({
        btn1:"white",btn2:"white",btn3:"white",btn4:"white",btn5:"#ef403c",btn6:"white",
        font_color1:"black",font_color2:'black',font_color3:'black',font_color4:'black',font_color5:"white",font_color6:'black',
        showComponent_possession: true,
        showComponent_budget: false,
        showComponent_amenities: false,
        // showComponent_possession: false,
        showComponent_sort: false,
        showComponent_property: false,
        showComponent_rating: false,
      });
    }
    onButtonClick_sort(){
      this.setState({
        btn1:"white",btn2:"white",btn3:"white",btn4:"white",btn5:"white",btn6:"#ef403c",
        font_color1:"black",font_color2:'black',font_color3:'black',font_color4:'black',font_color5:'black',font_color6:'white',
        showComponent_sort: true,
        showComponent_budget: false,
        showComponent_amenities: false,
        showComponent_possession: false,
        // showComponent_sort: false,
        showComponent_property: false,
        showComponent_rating: false,
      
      });
    }
    onDone(){
      this.setState({
        showComponent_sort: false,
        showComponent_budget: false,
        showComponent_amenities: false,
        showComponent_possession: false,
        // showComponent_sort: false,
        showComponent_property: false,
        showComponent_rating: false,
      });

    
    }
    
    onBudget_min(){
      this.setState({
        min: true,
        max:false
      });

    }
    onBudget_max(){
      this.setState({
        max: true,
        min:false
      });

    }
    // proj_len(){
    //   var a= this.state.filtered_projectdetails.length;
    //   console.log("aaaaaa",a)
    //   return(a)
    
    // }
    
    // checkBoxCheck1 = () => {
    //   this.setState(
    //     {
    //    isChecked1: !isChecked1,
    //     isChecked2: !isChecked2,
    //     isChecked3: !isChecked3,
    //     isChecked4: !isChecked4,
    //     isChecked5: !isChecked5,
       
    //     });
      
    //   }
      // checkBoxCheck2 = () => {
      //   this.setState(({ isChecked2}) => (
      //     {
      //     isChecked2: !isChecked2,
         
      //     }
      //   ));
      //   }
      //   checkBoxCheck3 = () => {
      //     this.setState(({ isChecked3}) => (
      //       {
      //       isChecked3: !isChecked3,
           
      //       }
      //     ));
      //     }
      //     checkBoxCheck4 = () => {
      //       this.setState(({ isChecked4}) => (
      //         {
      //         isChecked4: !isChecked4,
             
      //         }
      //       ));
      //       }
      //       checkBoxCheck5 = () => {
      //         this.setState(({ isChecked5}) => (
      //           {
      //           isChecked5: !isChecked5,
               
      //           }
      //         ));
      //         }
        
      
      // this.setState({
      //     isChecked1: !isChecked1,
      //         isChecked2: !isChecked2,
      //     isChecked3: !isChecked3,
      //     isChecked4: !isChecked4,
      //     isChecked5: !isChecked5,
      // });
    
    ratingText(){
     

      // this.setState({
      //   showComponent_rating: false,
      // });
        var j=0;
        var z=0;
        // var innhtml=document.getElementById();
        var items=document.getElementsByName('rating');
        console.log(items)
        var selectedItems=[];
        var i;
        for(i=0; i<items.length; i++)
        {
            if(items[i].type=='checkbox' && items[i].checked==true)
            {
            selectedItems.push(items[i].value);
            z = z + 1;
           }
           
         }
         var m=document.getElementById('r1').value;
         console.log("RATTT")
         console.log(m)
          console.log(z);
         console.log(selectedItems[0]);
        //  if(selectedItems == '')
        //  {
        //   this.state.rating = null;
        //   console.log("emptyyyyy")
        //  }
        //  else{
        //  this.state.rating = selectedItems;
        //  console.log("value isssssssssssssssssssssss")
        //  console.log(selectedItems)
        //  }
        this.state.rating=(selectedItems == '')?null:selectedItems
  
        var add="  +";
        if(z>1)
        {
          (document.getElementById('r1').innerHTML=selectedItems[0].concat(add).concat(z-1));
        }
        else if(z==0)
        {
          document.getElementById('r1').innerHTML="Ratings";
        }
        else{
          document.getElementById('r1').innerHTML=selectedItems;
        }
        this.setState({ showComponent_rating: false});
        // this.state.rating = selectedItems;
        // console.log("CHECK THIS VALUE")
        console.log(this.state)
        this.handleSubmit();

  }
  propertyText(){
     

    this.setState({
      showComponent_property: false,
    });
    var j=0;
    var z=0;
    var items=document.getElementsByName('property');
    console.log(items)
    var selectedItems=[];
    var i;
    for(i=0; i<items.length; i++)
    {
        if(items[i].type=='checkbox' && items[i].checked==true)
        {
        selectedItems.push(items[i].value);
        z = z + 1;
       }
       
     }
    //  var m=document.getElementById('p1').value;
    //  console.log(m)
      console.log(z);
     console.log(selectedItems[0]);
    //  this.setState({property:selectedItems});
    // this.state.property=selectedItems;
    this.state.property=(selectedItems == '')?null:selectedItems
     console.log(this.state)
    // m= document.getElementById('a1').value;
    // console.log(m)
    var add="  +";
    if(z>1)
    {
      (document.getElementById('p1').innerHTML=selectedItems[0].concat(add).concat(z-1));
    }
    else if(z==0)
    {
      document.getElementById('p1').innerHTML="Property Type";
    }
    else{
      document.getElementById('p1').innerHTML=selectedItems;
    }
    this.handleSubmit();

}
  amenitiesText(){

        
        var j=0;
        var z=0;
        var items=document.getElementsByName('amenities');
        console.log(items)
        var selectedItems=[];
        var i;
        for(i=0; i<items.length; i++)
        {
            if(items[i].type=='checkbox' && items[i].checked==true)
            {
            selectedItems.push(items[i].value);
            z = z + 1;
           }
           
         }
        //  console.log(selectedItems)
        //   var mww = document.getElementsByClassName('btnamen').value;
        // console.log(mww)
        console.log(selectedItems)
        // this.setState({amenities:selectedItems});
        // this.state.amenities=selectedItems;
        this.state.amenities=(selectedItems == '')?null:selectedItems
        this.handleSubmit();
        // console.log("bbbbbbbbb")
        console.log(this.state)
        var add="  +";
        if(z>1)
        {
          (document.getElementById('b1').innerHTML=selectedItems[0].concat(add).concat(z-1));
        }
        else if(z==0)
        {
          document.getElementById('b1').innerHTML="Amenities";
        }
        else{
          document.getElementById('b1').innerHTML=selectedItems;
        }
        this.setState({
          showComponent_amenities: false,
        });
        console.log("mmmmmm")
        console.log(this.state)
     this.handleSubmit();  
  }
  possessionText(){

    this.setState({
      showComponent_possession: false,
    });
        var j=0;
        var z=0;
        var items=document.getElementsByName('possession');
        console.log(items)
        var selectedItems=[];
        var i;
        for(i=0; i<items.length; i++)
        {
            if(items[i].type=='checkbox' && items[i].checked==true)
            {
            selectedItems.push(items[i].value);
            z = z + 1;
           }
           
         }
        //  console.log(selectedItems)
        //   var mww = document.getElementsByClassName('btnamen').value;
        // console.log(mww)
        // this.setState({possession:selectedItems});
        // this.state.possession = selectedItems;
        this.state.possession=(selectedItems == '')?null:selectedItems
        console.log(this.state)
        console.log(selectedItems)
        var add="  +";
        if(z>1)
        {
          (document.getElementById('poss').innerHTML=selectedItems[0].concat(add).concat(z-1));
        }
        else if(z==0)
        {
          (document.getElementById('poss').innerHTML="Possession Status")
          
        }
        else{
          document.getElementById('poss').innerHTML=selectedItems;
        }
        this.handleSubmit();
       
  }
  sortText(){

    this.setState({
      showComponent_sort: false,
    });
        var j=0;
        var z=0;
        // var innhtml=document.getElementById('sort');
        var items=document.getElementsByName('sort');
        console.log("ZZZZZZZ")
        console.log(items)
        var selectedItems=[];
        var i;
        for(i=0; i<items.length; i++)
        {
            if(items[i].type=='checkbox' && items[i].checked==true)
            {
            selectedItems.push(items[i].value);
            z = z + 1;
           }
           
         }
        //  console.log(selectedItems)
        //   var mww = document.getElementsByClassName('btnamen').value;
        // console.log(mww)
        // this.setState({sort:selectedItems});
        // this.state.sort= selectedItems;
        this.state.sort=(selectedItems == '')?null:selectedItems
        console.log(this.state)
        console.log(selectedItems)
        var add="  + ";
        if(z>1)
        {
          (document.getElementById('sort').innerHTML=selectedItems[0].concat(add).concat(z-1));
        }
        else if(z==0)
        {
          document.getElementById('sort').innerHTML="Sort By";
        }
        else{
          document.getElementById('sort').innerHTML=selectedItems;
        }
        this.handleSubmit();
       
       
  }

  display_min = (val) => {
  this.setState({
    max: true,
    min:false,
    // min1:this.state.min1
  });
  
  // console.log(this.state.min1)
  // document.getElementById('min_amount').value= val;
  this.state.minTextField = val;

  // console.log(val);
  
}
  display_max = (val) => {
  this.setState({
    max: true,
    min:false
  });
  // this.setState({myData : val});
  // console.log(myData);
  // document.getElementById('max_amount').value= val;
  this.state.maxTextField = val;
  console.log(this.state.maxTextField)
  // console.log(am)
  // console.log(val);
  
}
budgetText(){
  this.setState({
    showComponent_budget: false,
    cancel:true,
  });
  var inneh= document.getElementById('budget_button').innerHTML;
  var min=document.getElementById('min_amount').value;
  var max=document.getElementById('max_amount').value;
  console.log(min)
  console.log(max)
  min =this.state.minTextField?this.state.minTextField:'';
  max=this.state.maxTextField?this.state.maxTextField:'';
  let bud_val= min.concat("-".concat(max));
  //  this.setState({min_amount:min,max_amount:max});  
  // this.setState({budget_amount:bud_val});
  // this.state.budget_amount = bud_val;
  this.state.budget_amount=(bud_val == '')?null:bud_val 
   console.log(this.state)
   var sign=" - ";
 
  if(min != '' || max != '')
  {
    (document.getElementById('budget_button').innerHTML=min.concat(sign.concat(max)));
  }
  else if(min == '' && max == ''){
    document.getElementById('budget_button').innerHTML=inneh;
  }
  else{
    (document.getElementById('budget_button').innerHTML=min.concat(sign.concat(max)));
  }

  this.handleSubmit();

}

onClose(){
  this.setState({
    showComponent1: false,showComponent: false,
  });
}
mobMainComponent(){

  this.setState({
    mob_main_component : true,
    mob_property_component: true,
    mob_prop_color:"#D3D3D3",
    mob_prop_border:".1vw solid black"

  });
}
mob_property(){
  this.setState({
    mob_property_component: true,
    mob_rating_component:false,
    mob_amenities_component:false,
    mob_possession_component:false,
    mob_budget_component: false,
    mob_prop_color:"#D3D3D3",mob_rat_color:"white",mob_amen_color:"white",mob_poss_color:"white",mob_bud_color:"white",
    mob_prop_border:".1vw solid black",mob_rat_border:"none",mob_amen_border:"none",mob_poss_border:"none",mob_bud_border:"none",
  });
}
mob_rating(){
  this.setState({
    mob_rating_component:true,
    mob_property_component: false,
    mob_amenities_component:false,
    mob_possession_component: false,
    mob_budget_component: false,
    mob_rat_color:"#D3D3D3",mob_prop_color:"white",mob_amen_color:"white",mob_poss_color:"white",mob_bud_color:"white",
    mob_rat_border:".1vw solid black",mob_prop_border:"none",mob_amen_border:"none",mob_poss_border:"none",mob_bud_border:"none",
  });
}
mob_amen(){
  this.setState({
    mob_rating_component:false,
    mob_property_component: false,
    mob_amenities_component:true,
    mob_possession_component:false,
    mob_budget_component: false,
    mob_amen_color:"#D3D3D3",mob_rat_color:"white",mob_prop_color:"white",mob_poss_color:"white",mob_bud_color:"white",
    mob_amen_border:".1vw solid black",mob_rat_border:"none",mob_prop_border:"none",mob_poss_border:"none",mob_bud_border:"none",
  });
}
mob_poss(){
  this.setState({
    mob_rating_component:false,
    mob_property_component: false,
    mob_amenities_component:false,
    mob_possession_component: true,
    mob_budget_component: false,
    mob_amen_color:"white",mob_rat_color:"white",mob_prop_color:"white",mob_poss_color:"#D3D3D3",mob_bud_color:"white",
    mob_amen_border:"none",mob_rat_border:"none",mob_prop_border:"none", mob_poss_border:".1vw solid black",mob_bud_border:"none",
  });
}
mob_budget(){
  this.setState({
   
    mob_rating_component:false,
    mob_property_component: false,
    mob_amenities_component:false,
    mob_possession_component: false,
    mob_budget_component: true,
    mob_amen_color:"white",mob_rat_color:"white",mob_prop_color:"white",mob_poss_color:"white",mob_bud_color:"#D3D3D3",
    mob_amen_border:"none",mob_rat_border:"none",mob_prop_border:"none", mob_poss_border:"none",mob_bud_border:".1vw solid black",
  });

}
mob_component_close(){
  this.setState({
    mob_main_component: false,
    mob_rating_component:false,
    mob_property_component: false,
    mob_amenities_component:false,
    mob_possession_component:false,
    mob_budget_component: false,
    mob_rat_color:"white",mob_prop_color:"white",mob_amen_color:"white",mob_poss_color:"white",mob_bud_color:"white",
    mob_rat_border:"none",mob_prop_border:"none",mob_amen_border:"none",mob_poss_border:"none",mob_bud_border:"none",
  });
}
on_mob_done(){
  this.setState({
    mob_main_component: false,
    mob_rating_component:false,
    mob_property_component: false,
    mob_amenities_component:false,
    mob_possession_component:false,
    mob_budget_component: false,
    mob_rat_color:"white",mob_prop_color:"white",mob_amen_color:"white",mob_poss_color:"white",mob_bud_color:"white",
    mob_rat_border:"none",mob_prop_border:"none",mob_amen_border:"none",mob_poss_border:"none",mob_bud_border:"none",
  });
}
on_mob_budget_min(){
  this.setState({
   mob_min_list: true,
    mob_max_list:false
  });

}
on_mob_budget_max(){
  this.setState({
    mob_min_list: false,
    mob_max_list:true
  });

}
mob_display_min = (val) => {
  this.setState({
    mob_min_list: false,
    mob_max_list:true,
    // min_text_val: event.target.val
    //  min1:this.state.min1
  });
 
  // console.log(this.state.min1)
  //  document.getElementById('mob_min_amount').value= val;
  this.state.mob_minTextField = val;
//  console.log(this.state.mob_minTextField)
  // console.log(val);

  
}
  mob_display_max = (val) => {
  this.setState({
    mob_min_list: false,
    mob_max_list:true,
  });
  
  // document.getElementById('mob_max_amount').value= val;
   this.state.mob_maxTextField = val;
  // console.log(this.state.mob_maxTextField)
 
  // console.log(val);
//  this.on_budget_done();
  
}
// rating_state(){
//   console.log("stateeeee")
//    this.setState({mob_rating5_checked: !mob_rating5_checked });
// }
on_rating_done(){


  var rating_items = document.getElementsByName('mob_rating');
  var rat_selectedItems=[];
   var i;
    for(i=0; i<rating_items.length; i++)
        {
            if(rating_items[i].type=='checkbox' && rating_items[i].checked==true)
            {
            rat_selectedItems.push(rating_items[i].value);
          
          }
          
          }
          console.log(rat_selectedItems);
          // this.setState({mob_rating_values:rat_selectedItems});
          // this.state.mob_rating_values = rat_selectedItems;
             this.state.mob_rating_values = (rat_selectedItems == '')?null:rat_selectedItems
      
          console.log(this.state);
          this.handleSubmit();
  }
   
  on_prop_done(){
     
          var prop_items=document.getElementsByName('mob_prop');
          var prop_selectedItems=[];
          
          for(var i = 0; i<prop_items.length; i++)
            {
                if(prop_items[i].type=='checkbox' && prop_items[i].checked==true)
                {
                prop_selectedItems.push(prop_items[i].value);
              
              }
              
            }
            
            console.log(prop_selectedItems);
            // this.setState({mob_prop_values:prop_selectedItems});
            this.state.mob_prop_values=(prop_selectedItems == '')?null:prop_selectedItems;
          
            console.log(this.state);
            this.handleSubmit();

 }
 on_amen_done(){
  var amen_items=document.getElementsByName('mob_amenities');
  var amen_selectedItems=[];
  
  for(var i = 0; i<amen_items.length; i++)
    {
        if(amen_items[i].type=='checkbox' && amen_items[i].checked==true)
        {
        amen_selectedItems.push(amen_items[i].value);
      
      }
      
    }
    
    
    // this.setState({mob_amen_values:amen_selectedItems});
    // this.state.mob_amen_values = amen_selectedItems;
     this.state.mob_amen_values =(amen_selectedItems == '')?null:amen_selectedItems;
    // this.handleSubmit();
    console.log("DDDDDDDD")
    console.log(this.state);
    this.handleSubmit();
 }
 on_poss_done(){
  var poss_items=document.getElementsByName('mob_possession');
 
  var poss_selectedItems=[];
  var i;
  for(i=0; i<poss_items.length; i++)
  {
      if(poss_items[i].type=='checkbox' && poss_items[i].checked==true)
      {
      poss_selectedItems.push(poss_items[i].value);
     
     }
     
   }
   
  //  this.setState({mob_poss_values:poss_selectedItems});
  // this.state.mob_poss_values = poss_selectedItems;
   this.state.mob_poss_values =(poss_selectedItems == '')?null:poss_selectedItems;
   console.log(this.state);
   this.handleSubmit();
 }
on_budget_done(){
  // console.log("budgetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
  // var min=document.getElementById('mob_min_amount').value;
  // var max=document.getElementById('mob_max_amount').value;
  var sign = "-"
  let mob_bud_val= (this.state.mob_minTextField?this.state.mob_minTextField:'').concat("-".concat(this.state.mob_maxTextField?this.state.mob_maxTextField:''));
  console.log(mob_bud_val)
  // console.log(min)
  // console.log(max)
  // this.setState({mob_budget_values:mob_bud_val});
  // this.state.mob_budget_values = mob_bud_val;
  this.state.mob_budget_values =(mob_bud_val == '')?null:mob_bud_val;
  
  // console.log(this.state)
  this.handleSubmit();
}
bud_clearAll(){

  this.setState({
    cancel:false,

    btn3:"white",
    font_color3:"black",
  })
  this.state.budget_amount = '',
  this.state.minTextField='',
  this.state.maxTextField = '',
  document.getElementById('budget_button').innerHTML="Budget";
  this.handleSubmit();
}

 mob_clearAll(){

  
      
            this.state.mob_rating_values='';
            this.state.mob_rating3_checked =false;
            this.state.mob_rating4_checked =false;
            this.state.mob_rating5_checked =false;
            this.state.mob_rating1_checked =false;
            this.state.mob_rating2_checked =false;
            this.state.mob_prop_values='';
            this.state.mob_propertyStudio_checked= false;
            this.state.mob_property1_checked=false;
            this.state.mob_property2_checked=false;
            this.state.mob_property3_checked=false;
            this.state.mob_property4_checked=false;
            this.state.mob_property5_checked=false;
            this.state.mob_propertyOffice_checked=false;
            this.state.mob_propertyShop_checked=false;
            this.state.mob_propertyShowroom_checked=false;
            this.state.mob_amen_values='';
            this.state.mob_amenities1_checked = false;
            this.state.mob_amenities2_checked = false;
            this.state.mob_amenities3_checked = false;
            this.state.mob_amenities4_checked = false;
            this.state.mob_amenities5_checked = false;
            this.state.mob_amenities6_checked = false;
            this.state.mob_amenities7_checked = false;
            this.state.mob_poss_values='';
            this.state.mob_poss1_checked  = false;
            this.state.mob_poss2_checked = false;
            this.state.mob_poss3_checked = false; 
            this.state.mob_poss4_checked = false;
            this.state.mob_poss5_checked = false;
            this.state.mob_poss6_checked = false; 
            this.state.mob_minTextField = '';
            this.state.mob_maxTextField = '';
            this.state.mob_budget_values = '';
            this.setState({Cleared_all:true})   
          
         
         
 }

 budget_clear(){
  // document.getElementById('mob_min_amount').value="";
  // document.getElementById('mob_max_amount').value="";
  // // this.setState({mob_budget_values:mob_bud_val});
  // this.state.mob_budget_values='';
  
 }
// on_mob_rating_done(){
//   console.log("noooo")
// var rating_items = document.getElementsByName('mob_rating');
// var rat_selectedItems=[];

// // console.log(rating_items);
// var i;
// for(i=0; i<rating_items.length; i++)
//     {
//         if(rating_items[i].type=='checkbox' && rating_items[i].checked==true)
//         {
//         rat_selectedItems.push(rating_items[i].value);
       
//        }
       
//       }
//       console.log(rat_selectedItems);
//       this.setState({mob_rating_values:rat_selectedItems});
//       console.log(this.state);
//     }
//     on_mob_property_done(){

//  var prop_items=document.getElementsByName('mob_prop');
//  var prop_selectedItems=[];
 
//  for(var i = 0; i<prop_items.length; i++)
//   {
//       if(prop_items[i].type=='checkbox' && prop_items[i].checked==true)
//       {
//       prop_selectedItems.push(prop_items[i].value);
     
//      }
     
//    }
   
//    console.log(prop_selectedItems);
//    this.setState({mob_prop_values:prop_selectedItems});
//    console.log(this.state);

// }
loginsuccess(loggedin,loggedinuseremail,loggedinusername){
  this.setState({
    loginComponent :false,  signupComponent :false, mloginComponent :false, registerComponent :false, loggedin:loggedin,loggedinuseremail:loggedinuseremail,loggedinusername:loggedinusername
  });

}

logout(){
  
  if ("loggedin" in localStorage) {
    delete localStorage["loggedin"];
  }
  if ("loggedInUseremail" in localStorage) {
    delete localStorage["loggedInUseremail"];
  }
  if ("loggedInUsername" in localStorage) {
    delete localStorage["loggedInUsername"];
  }
  this.setState({
    loggedin:false,loggedinusername:"",loggedinuseremail:""
  });
}
signup(){
  this.setState({
    signupComponent :true, loginComponent :false, mloginComponent :false, registerComponent :false
  });
}

login(){
  this.setState({
    loginComponent :true,  signupComponent :false, mloginComponent :false, registerComponent :false
  });
}

mobilesignup(){
  this.setState({
    mloginComponent :true,  signupComponent :false, loginComponent :false, registerComponent :false
  });
}

registration(){
  this.setState({
    registerComponent :true,  signupComponent :false, loginComponent :false, mloginComponent :false
  });
}

openlogin1(){
  this.setState({
    loginComponent: true, mloginComponent: false,
  });
}

loginHandler(){
  this.setState({ signupComponent: false, loginComponent: true });
}
signupHandler(){
  this.setState({ signupComponent: true, loginComponent: false });
}

registerHandler(){
  this.setState({ signupComponent: false, registerComponent: true });
}
opennotif(){
  this.setState({
    notification:true
  })
}
closenotif(){
  this.setState({
    notification:false
  })
}
close(){
  this.setState({
    loginComponent :false,  signupComponent :false, mloginComponent :false, registerComponent :false
  });


}

showreviewstatus(){
  this.setState({review_status:true});
}
showpicturestatus(){
  this.setState({picture_status:true});
}
      render(){
        let all_project;
        console.log("location search")

        console.log(this.state)
        console.log(this.props)
        const {searched_location} = this.state
        const {rating5_checked,rating4_checked,rating3_checked,rating2_checked,rating1_checked}= this.state;
        const {property1_checked,property2_checked,property3_checked,property4_checked,property5_checked,propertyOffice_checked,propertyShop_checked,propertyShowroom_checked,propertyStudio_checked}= this.state;
        const {amenities1_checked,amenities2_checked,amenities3_checked,amenities4_checked,amenities5_checked,amenities6_checked,amenities7_checked}= this.state;
        const {poss1_checked,poss2_checked,poss3_checked,poss4_checked,poss5_checked,poss6_checked} = this.state;
        const{sort1_checked,sort2_checked,sort3_checked} = this.state;
        const {mob_propertyStudio_checked,mob_property1_checked,mob_property2_checked,mob_property3_checked,mob_property4_checked,mob_property5_checked,mob_propertyOffice_checked,mob_propertyShop_checked,mob_propertyShowroom_checked} = this.state;
        const {mob_rating1_checked,mob_rating2_checked,mob_rating3_checked,mob_rating4_checked,mob_rating5_checked} = this.state;
        const {mob_amenities1_checked,mob_amenities2_checked,mob_amenities3_checked,mob_amenities4_checked,mob_amenities5_checked,mob_amenities6_checked,mob_amenities7_checked} = this.state;
        const {mob_poss1_checked,mob_poss2_checked,mob_poss3_checked,mob_poss4_checked,mob_poss5_checked,mob_poss6_checked} = this.state;
        // const {amenities7_checked}= this.state;
        const {min1}= this.state;
        // var proj_count = (this.state.filtered_projectdetails.length);
        // console.log("length is",proj_count)
        
        let menu = (
          <Menu>
            
            <MenuItem><h6> <div onClick={this.AddReview} style={{placeContent:"center",display:"flex",fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}>
                 <img width="30px" src={menu1icon}/>
                  <div style={{marginTop: "6px", marginLeft: "5px"}}>Add Review</div>
              </div></h6></MenuItem>
            
            {/* <MenuItem><h6><span onClick={this.AddReview} style={{fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}><span style={{verticalAlign: "bottom"}}> <img width="30px" src={menu1icon}/></span>&nbsp; Add Review</span></h6></MenuItem> */}
            <Divider />
      
            <MenuItem><h6><div onClick={this.AddPicture} style={{placeContent:"center",display:"flex",fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}>
                 <img width="30px" src={menu2icon}/>
                  <div style={{marginTop: "6px", marginLeft: "5px"}}>Post a Picture</div>
              </div></h6>
            </MenuItem>
            {/* <MenuItem><h6><span onClick={this.AddPicture} style={{fontFamily:"Catamaran-Semibold",color:"#ef403c",fontSize: "1.2rem"}}><span style={{verticalAlign: "bottom"}}> <img width="30px" src={menu2icon}/></span>&nbsp; Post a Picture</span></h6></MenuItem> */}
          </Menu>
        );
        if(this.state.filtered_projectdetails){ 
         
            all_project =(
            this.state.filtered_projectdetails.map(project =>(
                <div className="loc_proj">
      
      
                {this.state.filtered_projectdetails &&
                    
                    <a href={'/projects/'+project.project_id} className="anchorstyle">
                    <div className="boxD_loc" >
                            <div className="imageframeD_loc">
                            <img className="imageboxD_loc"src={project.cover_image}/>
                            <div className="paraplacestatus_search">{ project.construction_status?project.construction_status == "Ready Possession"?"READY":project.construction_status.toUpperCase():project.construction_status.toUpperCase()}</div>
                   
                            <div className="paraplaceD_loc">{project.area}</div>
                            </div>
                            <div className="contentframeD_loc">
                              
                            <p className="paraheadingD_loc">{project.project_name}</p>
                            <div className="row">
                          <div className="parastarD_loc">
                          <StarRatings 
                                rating={Math.round(project.overall_rating*100)/100}
                                starRatedColor="#FFFFFF"
                                starEmptyColor="#202020"
                                // changeRating={this.changeRating}
                                numberOfStars={5}
                                starDimension="2.5vh"
                                name='rating'
                                starSpacing='0.3vh'
                              />
                              </div>
                     </div>
                                <div className="parasubD_loc">{Math.round(project.overall_rating*100)/100}({project.review_count} Reviews)</div>
                                
                            </div>
                    </div></a>}
      
      
                </div>
              
              )));
//               {this.state.filtered_projectdetails.length > 0 &&
//                 <p className="web1234">{this.state.filtered_projectdetails.length?this.state.filtered_projectdetails.length:"0"}</p>
// }
        }

        let locationsData1 = [];
  if(this.state.locationalllinksdetails){ 
    let k = 0;
    let alllocalprojectdata;
    let id;
    let lat;
    let lng;
    let title;
    let pimage;
   
    for(let i=0;i<this.state.locationalllinksdetails.length;i++){
      alllocalprojectdata = {
                                  id:this.state.locationalllinksdetails[i].project_id,
                                  lat:parseFloat(this.getPositionlatitude(this.state.locationalllinksdetails[i].google_map_link)),
                                  lng:parseFloat(this.getPositionlongitude(this.state.locationalllinksdetails[i].google_map_link)),
                                  zoomlevel:14,
                                  area:this.state.locationalllinksdetails[i].area,
                                  overallrating:parseFloat(this.state.locationalllinksdetails[i].overall_rating),
                                  no_of_review:parseInt(this.state.locationalllinksdetails[i].review_count),
                                  image:this.state.locationalllinksdetails[i].cover_image,
                                  project_name:this.state.locationalllinksdetails[i].project_name,
                                  status:this.state.locationalllinksdetails[i].construction_status
                                  }
      locationsData1[k] = alllocalprojectdata;
      k++;
    }
    
    console.log("all map link", locationsData1);



    
  }
//   let locationsData1=[{
    
//     lat:23.44332143,
//     lng:23.45234553,
//     zoomlevel:'',
//     area:"pune",
//     id:1,
//     overallrating:3.4,
//     no_of_review:12,
//     image:"https://dummyimage.com/600x400/000/fff",
//     project_name:"yo yo",
//     status:"Ready"
// }]
let login_status;
if(this.state.loggedin === true | this.state.loggedin === 'true'){
  login_status = (
  // <div  style={{color: "white", position: "absolute"}}>
      <div>
      <div className="logout_btn1_search1">
      <a className="logout_search_name" href="/account/">{this.state.loggedinusername.length > 10 ? this.state.loggedinusername.substring(0, 7) + "..." : this.state.loggedinusername}</a>
        
      </div>
      <div className="logout_btn2_search2">
      <p onClick={this.logout}>Logout</p>
     </div>
      </div>
  // </div>
  );
}


    return (

      <div>

{ this.state.notification && 
    <div class="alert alert-success alert-dismissible_projSearch" style={{position:'absolute',zIndex:'107',width:'100%'}}>
      <p class="close" data-dismiss="alert" aria-label="close" onClick={this.closenotif} style={{cursor:'pointer'}}>&times;</p>
      A  <strong>registration Link</strong> has been sent to your Email ID.
    </div>
    }
      
      {this.state.showComponent &&
     
     < WriteReview showreviewstatus = {this.showreviewstatus.bind(this)} onClose = {this.onClose.bind(this)} loggedinuseremail={this.state.loggedinuseremail} loginHandler= {this.loginHandler.bind(this)} loginsuccess={this.loginsuccess}/>
          
      }
              {this.state.showComponent1 &&
 
     < PostAPicture onClose = {this.onClose.bind(this)} loggedinuseremail={this.state.loggedinuseremail} loginsuccess={this.loginsuccess} showpicturestatus = {this.showpicturestatus.bind(this)}/>
          
      }
   
        
       
        
 
          {/* <Search/> */}
          {/* <h2> Add Your Location </h2> */}
      
      
      <div className="webview_locationsearch">
      {/* <p className="logotop">LOGO</p> */}
      <div className="col-12 static_detailsloc">
      <a href={'/'}><img className="logotop" src={LogoIcon}/></a> 
    <h3 className="mumbaitop">{this.state.city}</h3>
      {/* <img className="mumbai_arrow" src={down}/> */}

     
     
      { this.state.loggedin ? 
        
        <img src={user1} className="usericon_loc" alt="usericon"/>
    
        :
     
      <a onClick={this.signup}>
        {/* <img src={user} className="usericon1"/> */}
        <img src={user1} className="usericon_loc" alt="usericon"/>
        </a>
      }

        {login_status}

        {this.state.signupComponent &&
        <SignUp loginHandler= {this.loginHandler.bind(this)} loginsuccess={this.loginsuccess} close={this.close} mobilesignup={this.mobilesignup} opennotif={this.opennotif}/>
         //<Login/>
        // <MobileSignup/>
        }
         {this.state.loginComponent &&
        <Login signupHandler={this.signupHandler.bind(this)} loginsuccess={this.loginsuccess} close={this.close}/>
           } 

    {this.state.mloginComponent &&
        <MobileSignup openlogin1={this.openlogin1} loginsuccess={this.loginsuccess} close={this.close}/>
           }


{this.state.registerComponent &&
        <Registration registerHandler={this.registerHandler.bind(this)}/>
           } 

      {/* <img src={user1} className="usericon_loc" alt="usericon"/> */}
      
      
      </div>
      
      
      
      
      
      
      
      <div className="menubar_loc">
      <div className="searched_location">
           <ul className="filter_ul">
         
               { searched_location.map((searched_location, i) => {
                
                   return (
                   
                       <li className="filter_li" key={i}> {searched_location.length>15 ? searched_location.substring(0,15).concat("....."):searched_location} <button className="filter_btn" onClick={() => this.removeLocation(i)}>+</button> </li>
                   )
               }) }
               <li className="input-location">
                   <input onKeyDown={this.addLocation} type="text" size="4" ref={this.inputRef} />
               </li>
           </ul>
       </div>  
      


 
   <div ref={this.setWrapperRef}> 
   {/* <form enctype="application/x-www-form-urlencoded" onSubmit={this.handleSubmit}> */}
   {this.props.children}
   
                       <div className="col-xl-2 divrating" >
                       
                         <button className="btnrating" style={{backgroundColor:this.state.btn1, color:this.state.font_color1}} name="ratingButton" value="Ratings" id="r1" onClick={this.onButtonClick_rating}> Ratings <img className="buttonarrow" src={down} /></button>
                         {this.state.showComponent_rating &&

                                  <div className="container_rat">
                                      <section class="rating_check">
                                      <input className="input_checkbox" type="checkbox" id="five" name="rating"  value="5+"  checked={this.state.rating5_checked} onClick={() => this.setState({rating5_checked: !rating5_checked })}/>
                                      <label className="col11 five" for="five" >5</label>
                                      <input className="input_checkbox" type="checkbox" id="four" name="rating" value="4+"  checked={this.state.rating4_checked} onClick={() => this.setState({rating4_checked: !rating4_checked })}/>
                                      <label className="col11 four_above" for="four">4 & Above</label>
                                      <input className="input_checkbox" type="checkbox" id="three" name="rating" value="3+" checked={this.state.rating3_checked}  onClick={() => this.setState({rating3_checked: !rating3_checked })}/>
                                      <label className="col11 three" for="three">3 & Above</label>
                                      <input className="input_checkbox" type="checkbox" id="two" name="rating" value="2+" checked={this.state.rating2_checked}  onClick={() => this.setState({rating2_checked: !rating2_checked })}/>
                                      <label className="col11 two" for="two">2 & Above</label>
                                      <input className="input_checkbox" type="checkbox" id="one" name="rating" value="1+" checked={this.state.rating1_checked}   onClick={() => this.setState({rating1_checked: !rating1_checked })}/>
                                      <label className="col11 one" for="one">1 & Above</label>
                                      <p className= "done_rating" onClick= {this.ratingText.bind(this)} >DONE</p>
                               
                               
                                  </section>
                                 </div>
                              
                          }  
                           
                         </div> 
                         <div className="col-xl-2">
                         <button className="btnprop" name="propertyButton" value="Property Type" id="p1"  style={{backgroundColor:this.state.btn2, color:this.state.font_color2}} onClick={this.onButtonClick_property}> Property Type <img className="buttonarrow" src={down}/></button>
                          {this.state.showComponent_property &&

                                  <div className="container_prop">
                                      <p className="res">Residential</p>
                                      <section class="prop_check">
                                      <input className="input_checkbox" type="checkbox" id="studio" name="property" value="Studio Room" checked={this.state.propertyStudio_checked}   onClick={() => this.setState({propertyStudio_checked: !propertyStudio_checked })}/>
                                      <label className="col11 studio" for="studio">Studio Room</label>
                                      <input className="input_checkbox" type="checkbox" id="1bhk" name="property" value="1 BHK" checked={this.state.property1_checked}   onClick={() => this.setState({property1_checked: !property1_checked })}/>
                                      <label className="col11 bhk1" for="1bhk">1 BHK</label>
                                      <input className="input_checkbox" type="checkbox" id="2bhk" name="property" value="2 BHK" checked={this.state.property2_checked}   onClick={() => this.setState({property2_checked: !property2_checked })}/>
                                      <label className="col11 bhk2" for="2bhk">2 BHK</label>
                                      <input className="input_checkbox" type="checkbox" id="3bhk" name="property" value="3 BHK" checked={this.state.property3_checked}   onClick={() => this.setState({property3_checked: !property3_checked })}/>
                                      <label className="col11 bhk3" for="3bhk">3 BHK</label>
                                      <input className="input_checkbox" type="checkbox" id="4bhk" name="property" value="4 BHK" checked={this.state.property4_checked}   onClick={() => this.setState({property4_checked: !property4_checked })}/>
                                      <label className="col11 bhk4" for="4bhk">4 BHK</label>
                                      <input className="input_checkbox" type="checkbox" id="more" name="property" value="More Bhk" checked={this.state.property5_checked}   onClick={() => this.setState({property5_checked: !property5_checked })}/>
                                      <label className="col11 more_bhk" for="more">More Bhk</label>

                                      <p className="com">Commercial</p>
                                      <input className="input_checkbox" type="checkbox" id="showroom" name="property" value="Showroom" checked={this.state.propertyShowroom_checked}   onClick={() => this.setState({propertyShowroom_checked: !propertyShowroom_checked })}/>
                                      <label className="col11 showroom" for="showroom">Showroom</label>
                                      <input className="input_checkbox" type="checkbox" id="shop" name="property" value="Shop" checked={this.state.propertyShop_checked}   onClick={() => this.setState({propertyShop_checked: !propertyShop_checked })}/>
                                      <label className="col11 shop" for="shop">Shop</label>
                                      <input className="input_checkbox" type="checkbox" id="office" name="property" value="Office" checked={this.state.propertyOffice_checked}   onClick={() => this.setState({propertyOffice_checked: !propertyOffice_checked })}/>
                                      <label className="col11 office" for="office">Office</label>




                                      <p className= "done_property" onClick={this.propertyText.bind(this)}>DONE</p>
                               
                               
                                  </section>
                                 </div>
                              
                          }   
                         </div>
                         <div className="col-xl-2">
                         <button className="btnbudget" id="budget_button"  style={{backgroundColor:this.state.btn3, color:this.state.font_color3}} onClick={this.onButtonClick_budget}> Budget </button>
                         {this.state.showComponent_budget &&

                                              <div className="container_budget">
                                                  <input type="text" className="budget_text1" id="min_amount"  value={this.state.minTextField} placeholder="Min" onClick={this.onBudget_min} readonly="readonly"/>
                                                  {this.state.min &&
                                                  <ul className="min_budget" id="min_bud" >
                                                    <li  onClick={this.display_min.bind(this,'Min')}>Min</li>
                                                    <li id="min_5" name="min1" value={this.state.min1} onClick={this.display_min.bind(this,'500000')}>₹ 5 Lac</li>
                                                    <li id="min_10"  value="5 Lac" onClick={this.display_min.bind(this,'1000000')}>₹ 10 Lac</li>
                                                    <li id="min_15"   onClick={this.display_min.bind(this,'1500000')}>₹ 15 Lac</li>
                                                    <li id="min_20"  onClick={this.display_min.bind(this,'2000000')}>₹ 20 Lac</li>
                                                    <li id="min_25"  onClick={this.display_min.bind(this,'2500000')}>₹ 25 Lac</li>
                                                    <li id="min_30" onClick={this.display_min.bind(this,'3000000')}>₹ 30 Lac</li>
                                                    <li id="min_35" onClick={this.display_min.bind(this,'3500000')}>₹ 35 Lac</li>
                                                    <li id="min_40"  onClick={this.display_min.bind(this,'4000000')}>₹ 40 Lac</li>
                                                    <li id="min_45"  onClick={this.display_min.bind(this,'4500000')}>₹ 45 Lac</li>
                                                    <li id="min_50"  onClick={this.display_min.bind(this,'5000000')}>₹ 50 Lac</li>
                                                    <li id="min_60"  onClick={this.display_min.bind(this,'6000000')}>₹ 60 Lac</li>
                                                    <li id="min_70"  onClick={this.display_min.bind(this,'7000000')}>₹ 70 Lac</li>
                                                    <li id="min_80"  onClick={this.display_min.bind(this,'8000000')}> ₹ 80 Lac</li>
                                                    <li id="min_90" onClick={this.display_min.bind(this,'9000000')}>₹ 90 Lac</li>
                                                    <li id="min_1"  onClick={this.display_min.bind(this,'10000000')}>₹ 1 Cr</li>
                                                    <li id="min_1.2"  onClick={this.display_min.bind(this,'12000000')}>₹ 1.2 Cr</li>
                                                    <li id="min_1.4"  onClick={this.display_min.bind(this,'14000000')}>₹ 1.4 Cr</li>
                                                    <li id="min_1.6"  onClick={this.display_min.bind(this,'16000000')}>₹ 1.6 Cr</li>
                                                    <li id="min_1.8"  onClick={this.display_min.bind(this,'18000000')}>₹ 1.8 Cr</li>
                                                    <li id="min_2.0"  onClick={this.display_min.bind(this,'20000000')}>₹ 2.0 Cr</li>
                                                    <li id="min_2.3"  onClick={this.display_min.bind(this,'23000000')}>₹ 2.3 Cr</li>
                                                    <li id="min_2.6"  onClick={this.display_min.bind(this,'26000000')}>₹ 2.6 Cr</li>
                                                    <li id="min_3"  onClick={this.display_min.bind(this,'30000000')}>₹ 3 Cr</li>
                                                    <li id="min_3.5"  onClick={this.display_min.bind(this,'35000000')}>₹ 3.5 Cr</li>
                                                    <li id="min_4"  onClick={this.display_min.bind(this,'40000000')}>₹ 4 Cr</li>
                                                    <li id="min_4.5"  onClick={this.display_min.bind(this,'45000000')}>₹ 4.5 Cr</li>
                                                    <li id="min_5c"  onClick={this.display_min.bind(this,'50000000')}>₹ 5 Cr</li>
                                                    <li id="min_10c" onClick={this.display_min.bind(this,'100000000')}>₹ 10 Cr</li>
                                                    <li id="min_20c"  onClick={this.display_min.bind(this,'200000000')}>₹ 20 Cr</li>

                                                    

                                                  </ul> 
                                                  
                                                  } 
                                                  <input type="text" className="budget_text2" value={this.state.maxTextField} id="max_amount" placeholder="Max" onClick={this.onBudget_max} readonly="readonly"/>
                                                  {this.state.max &&
                                                  <ul className="max_budget"onClick={this.budgetText}>
                                                  
                                                    
                                                  <li id="max_10"  onClick={this.display_max.bind(this,'1000000')}>₹ 10 Lac</li>
                                                    <li id="max_15"   onClick={this.display_max.bind(this,'1500000')}>₹ 15 Lac</li>
                                                    <li id="max_20"  onClick={this.display_max.bind(this,'2000000')}>₹ 20 Lac</li>
                                                    <li id="max_25"  onClick={this.display_max.bind(this,'2500000')}>₹ 25 Lac</li>
                                                    <li id="max_30" onClick={this.display_max.bind(this,'3000000')}>₹ 30 Lac</li>
                                                    <li id="max_35" onClick={this.display_max.bind(this,'3500000')}>₹ 35 Lac</li>
                                                    <li id="max_40"  onClick={this.display_max.bind(this,'4000000')}>₹ 40 Lac</li>
                                                    <li id="max_45"  onClick={this.display_max.bind(this,'4500000')}>₹ 45 Lac</li>
                                                    <li id="max_50"  onClick={this.display_max.bind(this,'5000000')}>₹ 50 Lac</li>
                                                    <li id="max_60"  onClick={this.display_max.bind(this,'6000000')}>₹ 60 Lac</li>
                                                    <li id="max_70"  onClick={this.display_max.bind(this,'7000000')}>₹ 70 Lac</li>
                                                    <li id="max_80"  onClick={this.display_max.bind(this,'8000000')}> ₹ 80 Lac</li>
                                                    <li id="max_90" onClick={this.display_max.bind(this,'9000000')}>₹ 90 Lac</li>
                                                    <li id="max_1"  onClick={this.display_max.bind(this,'10000000')}>₹ 1 Cr</li>
                                                    <li id="max_1.2"  onClick={this.display_max.bind(this,'12000000')}>₹ 1.2 Cr</li>
                                                    <li id="max_1.4"  onClick={this.display_max.bind(this,'14000000')}>₹ 1.4 Cr</li>
                                                    <li id="max_1.6"  onClick={this.display_max.bind(this,'16000000')}>₹ 1.6 Cr</li>
                                                    <li id="max_1.8"  onClick={this.display_max.bind(this,'18000000')}>₹ 1.8 Cr</li>
                                                    <li id="max_2.0"  onClick={this.display_max.bind(this,'20000000')}>₹ 2.0 Cr</li>
                                                    <li id="max_2.3"  onClick={this.display_max.bind(this,'23000000')}>₹ 2.3 Cr</li>
                                                    <li id="max_2.6"  onClick={this.display_max.bind(this,'26000000')}>₹ 2.6 Cr</li>
                                                    <li id="max_3"  onClick={this.display_max.bind(this,'30000000')}>₹ 3 Cr</li>
                                                    <li id="max_3.5"  onClick={this.display_max.bind(this,'35000000')}>₹ 3.5 Cr</li>
                                                    <li id="max_4"  onClick={this.display_max.bind(this,'40000000')}>₹ 4 Cr</li>
                                                    <li id="max_4.5"  onClick={this.display_max.bind(this,'45000000')}>₹ 4.5 Cr</li>
                                                    <li id="max_5c"  onClick={this.display_max.bind(this,'50000000')}>₹ 5 Cr</li>
                                                    <li id="max_10c" onClick={this.display_max.bind(this,'100000000')}>₹ 10 Cr</li>
                                                    <li id="max_20c"  onClick={this.display_max.bind(this,'200000000')}>₹ 20 Cr</li>
                                                  <li onClick={this.display_max.bind(this,'Max')}>Max</li>

                                                  

                                                </ul> 
                                                 
                                              } 

                                            
                                            {/* <p className= "done_budget" onClick={this.budgetText.bind(this)}>DONE</p> */}
                                            </div>     
                         }
                         </div>
                         {this.state.cancel &&
                           <div >
                             <img className="cancel-button" onClick={this.bud_clearAll.bind(this)} src={CancelButton}/>
                           </div>
                         }
                         {!this.state.cancel &&
                         <img className="cancel-button" src={down}/>
                         }
                         <div className="col-xl-2">
                         <button className="btnamen" name="amenitiesButton" id="b1"  style={{backgroundColor:this.state.btn4, color:this.state.font_color4}} onClick={this.onButtonClick_amenities} value="Amenities"> Amenities <img className="buttonarrow" src={down}/></button>
                         {this.state.showComponent_amenities &&

                                  <div className="container_amen">
                                      
                                      <section class="amen_check">
                                      <input className="input_checkbox" type="checkbox" id="swimming" name="amenities" value="Swimming pool" checked={this.state.amenities1_checked}   onClick={() => this.setState({amenities1_checked: !amenities1_checked })}/>
                                      <label className="col11 swimming" for="swimming">Swimming pool</label>
                                      <input className="input_checkbox" type="checkbox" id="kids" name="amenities" value="Kids play area" checked={this.state.amenities2_checked}   onClick={() => this.setState({amenities2_checked: !amenities2_checked })}/>
                                      <label className="col11 kids" for="kids">Kids play area</label>
                                      <input className="input_checkbox" type="checkbox" id="gym" name="amenities" value="Gym" checked={this.state.amenities3_checked}   onClick={() => this.setState({amenities3_checked: !amenities3_checked })}/>
                                      <label className="col11 gym" for="gym">Gym</label>
                                      <input className="input_checkbox" type="checkbox" id="indoor" name="amenities" value="Indoor Games" checked={this.state.amenities4_checked}   onClick={() => this.setState({amenities4_checked: !amenities4_checked })}/>
                                      <label className="col11 indoor" for="indoor">Indoor Games</label>
                                      <input className="input_checkbox" type="checkbox" id="outdoor" name="amenities" value="Outdoor Games" checked={this.state.amenities5_checked}   onClick={() => this.setState({amenities5_checked: !amenities5_checked })}/>
                                      <label className="col11 outdoor" for="outdoor">Outdoor Games</label>
                                      <input  className="input_checkbox" type="checkbox" id="garden" name="amenities" value="Garden" checked={this.state.amenities6_checked}   onClick={() => this.setState({amenities6_checked: !amenities6_checked })}/>
                                      <label className="col11 garden" for="garden">Garden</label>
                                      <input className="input_checkbox" type="checkbox" id="more" name="amenities" value="More" checked={this.state.amenities7_checked}   onClick={() => this.setState({amenities7_checked: !amenities7_checked })}/>
                                      <label className="col11 more" for="more">More</label>

                                   




                                      <p className= "done_amen" onClick={this.amenitiesText.bind(this)}>DONE</p>
                               
                               
                                  </section>
                                 </div>
                              
                          }
                         </div>
                         <div className="col-xl-2">
                         <button className="btnposs" name="possessioButton" id="poss" value="Possession Status"  style={{backgroundColor:this.state.btn5, color:this.state.font_color5}} onClick={this.onButtonClick_possession}> Possession Status<img className="buttonarrow" src={down}/></button>
                          {this.state.showComponent_possession &&

                                  <div className="container_poss">
                                      
                                      <section class="poss_check ">
                                      <input className="input_checkbox" type="checkbox" id="ready" name="possession" value="Ready"  checked={this.state.poss1_checked}   onClick={() => this.setState({poss1_checked: !poss1_checked })}/>
                                      <label className="col11 ready" for="ready">Ready</label>
                                      <input className="input_checkbox" type="checkbox" id="months6" name="possession" value="0-6 months" checked={this.state.poss2_checked}   onClick={() => this.setState({poss2_checked: !poss2_checked })}/>
                                      <label className="col11 months6" for="months6">0-6 months</label>
                                      <input className="input_checkbox" type="checkbox" id="months12" name="possession" value="6-12 months" checked={this.state.poss6_checked}   onClick={() => this.setState({poss6_checked: !poss6_checked })}/>
                                      <label className="col11 months12" for="months12">6-12 months</label>
                                      <input className="input_checkbox" type="checkbox" id="years1" name="possession" value="1-2 years" checked={this.state.poss3_checked}   onClick={() => this.setState({poss3_checked: !poss3_checked })}/>
                                      <label className="col11 years1" for="years1">1-2 years</label>
                                      <input className="input_checkbox" type="checkbox" id="years2" name="possession" value="2+ years" checked={this.state.poss4_checked}   onClick={() => this.setState({poss4_checked: !poss4_checked })}/>
                                      <label className="col11 years2" for="years2">2+ years</label>
                                      {/* <input className="input_checkbox" type="checkbox" id="garden2" name="possession" value="Garden" checked={this.state.poss5_checked}   onClick={() => this.setState({poss5_checked: !poss5_checked })}/>
                                      <label className="col11 garden2" for="garden2">Garden</label> */}
                                     

                                   




                                      <p className= "done_poss" onClick={this.possessionText.bind(this)}>DONE</p>
                               
                               
                                  </section>
                                 </div>
                              
                          }
                         </div>
                         <div className="col-xl-2">
                         <button className="btnsortby"  name="sortButton" id="sort" value="Sort By"  style={{backgroundColor:this.state.btn6, color:this.state.font_color6}} onClick={this.onButtonClick_sort}> Sort By <img className="buttonarrow" src={down}/></button>
                        {this.state.showComponent_sort &&

                                  <div className="container_sort ">
                                      
                                      <section class="sort_check">
                                      <input className="input_checkbox" type="checkbox" id="trend" name="sort" value="Top trending" checked={this.state.sort1_checked}   onClick={() => this.setState({sort1_checked: !sort1_checked })}/>
                                      <label className="col11 trend" for="trend">Most Trending</label>
                                      <input className="input_checkbox" type="checkbox" id="rated" name="sort" value="Top Rated" checked={this.state.sort2_checked}   onClick={() => this.setState({sort2_checked: !sort2_checked })}/>
                                      <label className="col11 rated" for="rated">Top Rated</label>
                                      <input className="input_checkbox" type="checkbox" id="new_proj" name="sort" value="Recently Launched" checked={this.state.sort3_checked}   onClick={() => this.setState({sort3_checked: !sort3_checked })}/>
                                      <label className="col11 new_proj" for="new_proj">Recently Launched</label>
                                      
                                     

                                   




                                      <p className= "done_sort" onClick={this.sortText.bind(this)}>DONE</p>
                               
                               
                                  </section>  
                                 </div>
                              
                          }
                         </div>
                         <div className="col-xl-2">
                         <Dropdown
        trigger={['click']}
        overlay={menu}
        animation="slide-up"

      >
                         <button className="btnshare"><img className="buttonadd" src={addimage}/> Share Views</button>
                         </Dropdown>
                          </div>
                          {/* </form> */}
                   </div>
                 
                 
</div>

        <hr className="web_hr1"></hr>
        <p className="webfound">FOUND</p>
        
        
        {this.state.filtered_projectdetails &&
                        <p className="web1234">{this.state.filtered_projectdetails.length>0?this.state.filtered_projectdetails.length:""}</p>
        }


        <hr className="web_hr2"></hr>
        
{this.state.ListisOpen &&

        <div className="location_search_web">
         <a className="list_loc active" href="#" onClick={() => this.setState({ MapisOpen: false, ListisOpen: true })}>LIST</a> <div className="list_box"></div>
        <a href="#" className="map_loc" onClick={() => this.setState({ MapisOpen: true, ListisOpen: false })}>MAP</a>
  </div>}
  {this.state.sort[0]==["Top trending"]&&
  <div className="col-8 Mostsideheadings">
        <div className="Mostsidetitle MostSidemainHeading" > 
            <div className="Mostgreybox1"></div><h3 className="Mostnavrowtitletextmosttrend">&nbsp;MOST TRENDING&nbsp;</h3><div className="Mostgreybox2mosttrend"></div>
          </div>
          </div>}
{this.state.sort[0]==["Top Rated"]&&
  <div className="col-8 Mostsideheadings">
        <div className="Mostsidetitle MostSidemainHeading" > 
            <div className="Mostgreybox1"></div><h3 className="Topnavrowtitletexttop">&nbsp;TOP RATED&nbsp;</h3><div className="Topgreybox2top"></div>
          </div>
          </div>}
{this.state.sort[0]==["New projects"]&&
  <div className="col-8 Mostsideheadings">
        <div className="Mostsidetitle MostSidemainHeading" > 
            <div className="Mostgreybox1"></div><h3 className="Newnavrowtitletextnew">&nbsp;RECENTLY LAUNCHED&nbsp;</h3><div className="Newgreybox2new"></div>
          </div>
          </div>}
  {this.state.MapisOpen &&
  <div className="location_search_web">
         <a  href="#" className="list_loc" onClick={() => this.setState({ MapisOpen: false, ListisOpen: true })}>LIST</a> <div className="list_box"></div>
        <a className ="map_loc active" href="#" onClick={() => this.setState({ MapisOpen: true, ListisOpen: false })}>MAP</a>
  </div>}
  
  {this.state.MapisOpen &&
        <div className="centerClass_web">
                                {/* { this.state.projectdetails && */}
                                  {/* this.state.projectdetails[0].google_map_link?  */}

                                  { this.state.locationalllinksdetails? this.state.locationalllinksdetails  &&
                                  
                                       <div>
                                  {/* <h2>MAP COMES HERE</h2> */}
                                      <div className="row">

                                            <div style={{'marginTop':'4%', 'marginBottom':'6%', 'paddingLeft':'5%'}} className="col-md-8">
                                                
                                                  <MapLocations locations = {locationsData1}/> 
                                                  
                                                  
                                              
                                              </div>
                                              <div className="col-md-3">
                                              <img width="100%" style={{marginTop:'17%'}} src={SerachBannerweb}/>
                                              </div>
                                            </div>
                                            </div> :this.state.loading?<div className="grid-container31_search"><div className="sweet-loading">
        <ClipLoader
        
          size={150}
          color={" #EF403C"}
          loading={this.state.loading}
        />
      </div></div>:<div className="grid-container31_search"><h2 className="no_projects">no projects</h2></div>
                                                            }
                                  {/* "No Map Data Available" */}
                                {/* } */}
                            </div>
       }

      
             {this.state.ListisOpen &&
             <div className="row">
       <div className="list_isopen_projects">
                    <div className="col-8 responsive_grids1">
          <div className="grid-container31_search">
                {this.state.filtered_projectdetails? all_project:this.state.loading?<div className="sweet-loading">
        <ClipLoader
        
          size={150}
          color={" #EF403C"}
          loading={this.state.loading}
        />
      </div>:<div className="grid-container31_search"><h2 className="no_projects">no projects</h2></div>}
          </div>
        </div>
            </div>
            <div className="col-3 WebSearchBanner"> <img width="100%" src={SerachBannerweb}/></div>
            </div>
                            
      }







 {/* <div className="list_map">
    <Tabs
        tabsProps={{
          style: {
            textAlign: "left",
          }
        }}
        
        activeTab={{
          id: "tab1"
        }}
      >
        <div> 
        <Tabs.Tab id="tab1" title="LIST" >
          <div style={{ padding: 10 }}><TopRated/></div>
        </Tabs.Tab></div>
        <Tabs.Tab id="tab2" title="MAP" className="tab2">
          <div style={{ padding: 10, }}>This is Map</div>
        </Tabs.Tab>
      </Tabs>
    </div> */}
    <div className="footer_web">
    < Footer /></div>
    </div>


     {/* <div className="searched_location">
           <ul className="filter_ul">
         
               { searched_location.map((searched_location, i) => {
                
                   return (
                   
                       <li className="filter_li" key={i}> {searched_location.length>15 ? searched_location.substring(0,15).concat("....."):searched_location} <button className="filter_btn" onClick={() => this.removeLocation(i)}>+</button> </li>
                   )
               }) }
               <li className="input-location">
                   <input onKeyDown={this.addLocation} type="text" size="4" ref={this.inputRef} />
               </li>
           </ul>
       </div>  */}



    <div className="containermob">
      {/* <p className="moblogo">LOGO</p>
      <p className="mobicon">Icon</p> */}
      <div className="col-12 static_mob_detailsfil">
      <a href={'/'}><img className="moblogo" src={LogoIconMobile}/></a> 
      {/* <div className="mobsearchbarstylelocation_search">
      
      </div> */}
      {/* <input className="mobsearchbarstylelocation_search" type="text" placeholder="Search Property, Location..."/> */}
      <span className="moblocationstyle">{this.state.city}</span>




  
      { this.state.loggedin ? 
        
        // <img src={user1} className="usericon_loc" alt="usericon"/>
        <img src={user} className="mobusericon-mobile" alt="usericon"/>
        :
     
      <a onClick={this.signup}>
        {/* <img src={user} className="usericon1"/> */}
        {/* <img src={user1} className="usericon_loc" alt="usericon"/> */}
        <img src={user} className="mobusericon-mobile" alt="usericon"/>
        </a>
      }

        {login_status}

        {this.state.signupComponent &&
        <SignUp loginHandler= {this.loginHandler.bind(this)} loginsuccess={this.loginsuccess} close={this.close} mobilesignup={this.mobilesignup} opennotif={this.opennotif}/>
         //<Login/>
        // <MobileSignup/>
        }
         {this.state.loginComponent &&
        <Login signupHandler={this.signupHandler.bind(this)} loginsuccess={this.loginsuccess} close={this.close}/>
           } 

    {this.state.mloginComponent &&
        <MobileSignup openlogin1={this.openlogin1} loginsuccess={this.loginsuccess} close={this.close}/>
           }


{this.state.registerComponent &&
        <Registration registerHandler={this.registerHandler.bind(this)}/>
           } 


















      


         <div className="searched_location">
           <ul className="filter_ul">
         
               { searched_location.map((searched_location, i) => {
                
                   return (
                   
                       <li className="filter_li" key={i}> {searched_location.length>15 ? searched_location.substring(0,15).concat("....."):searched_location} <button className="filter_btn" onClick={() => this.removeLocation(i)}>+</button> </li>
                   )
               }) }
               <li className="input-location_mob">
                   <input onKeyDown={this.addLocation} type="text" size="4" ref={this.inputRef_mob} />
               </li>
           </ul>
       </div> 
</div>

        {this.state.ListisOpen &&
        <div className="navbar_location_search">
         <a className="active" href="#" onClick={() => this.setState({ MapisOpen: false, ListisOpen: true })}>LIST</a> 
        <a class="active1" href="#"onClick={() => this.setState({ MapisOpen: true, ListisOpen: false })}>MAP</a>
  </div>}
  {this.state.MapisOpen &&
  <div className="navbar_location_search">
         <a className="active1" href="#" onClick={() => this.setState({ MapisOpen: false, ListisOpen: true })}>LIST</a> 
        <a class="active" href="#"onClick={() => this.setState({ MapisOpen: true, ListisOpen: false })}>MAP</a>
  </div>}
 {this.state.sort[0]==["Top trending"]&&
  <div className="  mostsideheadings">
        <div className="mostsidetitle mostSidemainHeading" > 
            <div className="mostgreybox1"></div><h3 className="mostnavrowtitletextblog">&nbsp;MOST TRENDING&nbsp;</h3><div className="mostgreybox2blog"></div>
          </div>
          </div>}

  {this.state.sort[0]==["Top Rated"]&&
  <div className="  topsideheadings">
        <div className="topsidetitle topSidemainHeading" > 
            <div className="topgreybox1"></div><h3 className="topnavrowtitletextblog">&nbsp;TOP RATED&nbsp;</h3><div className="topgreybox2blog"></div>
          </div>
          </div>}

{this.state.sort[0]==["New projects"]&&
  <div className="  newsideheadings">
        <div className="newsidetitle newSidemainHeading" > 
            <div className="newgreybox1"></div><h3 className="newnavrowtitletextblog">&nbsp;RECENTLY LAUNCHED&nbsp;</h3><div className="newgreybox2blog"></div>
          </div>
          </div>}
   





  {this.state.ListisOpen &&
       <div className="list_isopen_projects_mob">
                    <div className="responsive_grids1_mob">
          <div className="grid-container31_mob">
                {this.state.filtered_projectdetails? all_project:this.state.loading?<div className="sweet-loading">
        <ClipLoader
        
          size={150}
          color={" #EF403C"}
          loading={this.state.loading}
        />
      </div>:<div className="grid-container31_mob"><h2 className="no_projects">no projects</h2></div>}
          </div>
        </div>
            </div>
                            
      }

{this.state.MapisOpen &&
        <div className="col-md-12 centerClass_mob">
                                {/* { this.state.projectdetails && */}
                                  {/* this.state.projectdetails[0].google_map_link?  */}

                                  { this.state.locationalllinksdetails? this.state.locationalllinksdetails &&
                                  
                                  <div>
                                  {/* <h2>MAP COMES HERE</h2> */}
                                  <div className="row">

<div style={{'marginTop':'4%', 'marginBottom':'6%', 'paddingLeft':'4%'}} className="col-md-12 ">
    
     <MapLocations locations = {locationsData1}/>
   
  </div>
</div>
</div>:this.state.loading?<div className="grid-container31_mob"><div className="sweet-loading">
        <ClipLoader
        
          size={150}
          color={" #EF403C"}
          loading={this.state.loading}
        />
      </div></div>:<div className="grid-container31_mob"><h2 className="no_projects">no projects</h2></div>
                }
                                  {/* "No Map Data Available" */}
                                {/* } */}
                                <div className="adsrow">
         <div className="reviewrowtitle ReviewHeading"> 
            <div className="redbox1"></div><h3  className="reviewrowtitletext_det">&nbsp;Ads&nbsp;</h3><div className="redbox2"></div>
          </div>
          <img width="100%" style={{marginTop:"5%", marginBottom:"5%"}} src={SerachBannermob}/>
        </div>
                            </div>
       }



        <hr className="mobhr1"></hr>
        <p className="mobfound">FOUND</p>

        {this.state.filtered_projectdetails &&
                        <p className="mobnumber">{this.state.filtered_projectdetails.length>0?this.state.filtered_projectdetails.length:""}</p>
        }
        {/* <p className="mobnumber">1321+</p> */}
        <p className="mobmatching">MATCHING PROJECT</p>
        <hr className="mobhr2"></hr>
       {/* {this.state.MapisOpen &&
        <div className="col-md-12 centerClass"> */}
                                {/* { this.state.projectdetails && */}
                                  {/* this.state.projectdetails[0].google_map_link?  */}
                                  {/* "No Map Data Available" */}
                                {/* } */}
                                  {/* <iframe src={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15124.87367642802!2d73.7615123!3d18.6092431!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa4dc7ad3f6cd879a!2sGolden%20Blessings!5e0!3m2!1sen!2sin!4v1592976409745!5m2!1sen!2sin"} 
                                  className="mapstylemap"></iframe> */}
{/*                                   
                            </div>
      } */}
             {/* {this.state.ListisOpen &&
       
            <TopRated/>
                            
      } */}
          
    <div className="mobile-footer-menuLS">       
                        <div className="col-3 centeralignLS custommobilefooterpaddingLS veticallyalignLS" >
                        <a onClick={this.mobMainComponent}><span ><img width="30px" src={Filter} style={{verticalAlign: "inherit"}}/></span><p className="filter_text_mob">Filter</p> </a>
                        {this.state.mob_main_component &&

                              <div className="mob_main_component">
                                    <p className="mob_filter_head">Filters</p>
                                    <p className="mob_clear" onClick={this.mob_clearAll}>Clear All</p>
                                    <hr className="mob_hrFilter"/>
                                    <div className="mob_buttons_part">
                                           <button className="mob_rating_btn" onClick={this.mob_rating} style={{backgroundColor:this.state.mob_rat_color, border:this.state.mob_rat_border}} >Ratings</button>
                                            {this.state.mob_rating_component &&

                                                        <div className="mob_container_rat">
                                                            <section class="mob_rating_check" onChange={this.on_rating_done} >
                                                            <input className="input_checkbox_mob" type="checkbox" id="mob_five" name="mob_rating"  value="5+"  checked={this.state.mob_rating5_checked} onClick={() => this.setState({mob_rating5_checked: !mob_rating5_checked })}/>
                                                            <label className="mob_all five" for="mob_five" >5</label>
                                                            <input className="input_checkbox_mob" type="checkbox" id="mob_four" name="mob_rating" value="4+"  checked={this.state.mob_rating4_checked} onClick={() => this.setState({mob_rating4_checked: !mob_rating4_checked })}/>
                                                            <label className="mob_all four_above" for="mob_four">4 & Above</label>
                                                            <input className="input_checkbox_mob" type="checkbox" id="mob_three" name="mob_rating" value="3+" checked={this.state.mob_rating3_checked}  onClick={() => this.setState({mob_rating3_checked: !mob_rating3_checked })}/>
                                                            <label className="mob_all three" for="mob_three">3 & Above</label>
                                                            <input className="input_checkbox_mob" type="checkbox" id="mob_two" name="mob_rating" value="2+" checked={this.state.mob_rating2_checked}  onClick={() => this.setState({mob_rating2_checked: !mob_rating2_checked })}/>
                                                            <label className="mob_all two" for="mob_two">2 & Above</label>
                                                            <input className="input_checkbox_mob" type="checkbox" id="mob_one" name="mob_rating" value="1+" checked={this.state.mob_rating1_checked}   onClick={() => this.setState({mob_rating1_checked: !mob_rating1_checked })}/>
                                                            <label className="mob_all one" for="mob_one">1 & Above</label>
                                                            {/* <p className= "done_rating" onClick= {this.ratingText.bind(this)} >DONE</p> */}
                                                    
                                                    
                                                        </section>
                                                      </div>
                              
                                             }  
                                          
                                           <button onClick={this.mob_property} className="mob_prop_btn" style={{backgroundColor:this.state.mob_prop_color,border:this.state.mob_prop_border}}>Property Type</button> 
                                           {this.state.mob_property_component &&
                                            
                                            
                                            <div className="mob_container_prop">
                                                 <p className="res">Residential</p>
                                                 <section class="mob_prop_check" onChange={this.on_prop_done}>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_studio" name="mob_prop" value="Studio Room" checked={this.state.mob_propertyStudio_checked}   onClick={() => this.setState({mob_propertyStudio_checked: !mob_propertyStudio_checked })}/>
                                                        <label className="mob_all studio" for="mob_studio">Studio Room</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_1bhk" name="mob_prop" value="1 BHK" checked={this.state.mob_property1_checked}   onClick={() => this.setState({mob_property1_checked: !mob_property1_checked })}/>
                                                        <label className="mob_all bhk1" for="mob_1bhk">1 BHK</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_2bhk" name="mob_prop" value="2 BHK" checked={this.state.mob_property2_checked}   onClick={() => this.setState({mob_property2_checked: !mob_property2_checked })}/>
                                                        <label className="mob_all bhk2" for="mob_2bhk">2 BHK</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_3bhk" name="mob_prop" value="3 BHK" checked={this.state.mob_property3_checked}   onClick={() => this.setState({mob_property3_checked: !mob_property3_checked })}/>
                                                        <label className="mob_all bhk3" for="mob_3bhk">3 BHK</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_4bhk" name="mob_prop" value="4 BHK" checked={this.state.mob_property4_checked}   onClick={() => this.setState({mob_property4_checked: !mob_property4_checked })}/>
                                                        <label className="mob_all bhk4" for="mob_4bhk">4 BHK</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_more" name="mob_prop" value="More Bhk" checked={this.state.mob_property5_checked}   onClick={() => this.setState({mob_property5_checked: !mob_property5_checked })}/>
                                                        <label className="mob_all more_bhk" for="mob_more">More Bhk</label>

                                                        <p className="com">Commercial</p>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_showroom" name="mob_prop" value="Showroom" checked={this.state.mob_propertyShowroom_checked}   onClick={() => this.setState({mob_propertyShowroom_checked: !mob_propertyShowroom_checked })}/>
                                                        <label className="mob_all showroom" for="mob_showroom">Showroom</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_shop" name="mob_prop" value="Shop" checked={this.state.mob_propertyShop_checked}   onClick={() => this.setState({mob_propertyShop_checked: !mob_propertyShop_checked })}/>
                                                        <label className="mob_all shop" for="mob_shop">Shop</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_office" name="mob_prop" value="Office" checked={this.state.mob_propertyOffice_checked}   onClick={() => this.setState({mob_propertyOffice_checked: !mob_propertyOffice_checked })}/>
                                                        <label className="mob_all office" for="mob_office">Office</label>




                                      
                                
                                            
                                                </section>
                                              </div>
                                          }
                                           <button  className="mob_budget_btn" onClick={this.mob_budget} style={{backgroundColor:this.state.mob_bud_color, border:this.state.mob_bud_border}}>Budget</button>
                                           {this.state.mob_budget_component &&

                                                          <div className="mob_container_budget">
                                                              <input type="text" className="budget_text1" value={this.state.mob_minTextField} id="mob_min_amount" placeholder={this.state.min_text?this.state.min_text:"Min"}  onClick={this.on_mob_budget_min} readonly="readonly"/>
                                                              {this.state.mob_min_list &&
                                                              <ul className="min_budget" id="mob_min_bud" onClick={this.on_budget_done}>
                                                                <li  onClick={this.mob_display_min.bind(this,'Min')}>Min</li>
                                                                <li id="min_5" name="min1" value={this.state.min1} onClick={this.mob_display_min.bind(this,'500000')}>₹ 5 Lac</li>
                                                                <li id="min_10"  onClick={this.mob_display_min.bind(this,'1000000')}  value="5 Lac">₹ 10 Lac</li> 
                                                                <li id="min_15"   onClick={this.mob_display_min.bind(this,'1500000')}>₹ 15 Lac</li>
                                                                <li id="min_20"  onClick={this.mob_display_min.bind(this,'2000000')}>₹ 20 Lac</li>
                                                                <li id="min_25"  onClick={this.mob_display_min.bind(this,'2500000')}>₹ 25 Lac</li>
                                                                <li id="min_30" onClick={this.mob_display_min.bind(this,'3000000')}>₹ 30 Lac</li>
                                                                <li id="min_35" onClick={this.mob_display_min.bind(this,'3500000')}>₹ 35 Lac</li>
                                                                <li id="min_40"  onClick={this.mob_display_min.bind(this,'4000000')}>₹ 40 Lac</li>
                                                                <li id="min_45"  onClick={this.mob_display_min.bind(this,'4500000')}>₹ 45 Lac</li>
                                                                <li id="min_50"  onClick={this.mob_display_min.bind(this,'5000000')}>₹ 50 Lac</li>
                                                                <li id="min_60"  onClick={this.mob_display_min.bind(this,'6000000')}>₹ 60 Lac</li>
                                                                <li id="min_70"  onClick={this.mob_display_min.bind(this,'7000000')}>₹ 70 Lac</li>
                                                                <li id="min_80"  onClick={this.mob_display_min.bind(this,'8000000')}> ₹ 80 Lac</li>
                                                                <li id="min_90" onClick={this.mob_display_min.bind(this,'9000000')}>₹ 90 Lac</li>
                                                                <li id="min_1"  onClick={this.mob_display_min.bind(this,'10000000')}>₹ 1 Cr</li>
                                                                <li id="min_1.2"  onClick={this.mob_display_min.bind(this,'12000000')}>₹ 1.2 Cr</li>
                                                                <li id="min_1.4"  onClick={this.mob_display_min.bind(this,'14000000')}>₹ 1.4 Cr</li>
                                                                <li id="min_1.6"  onClick={this.mob_display_min.bind(this,'16000000')}>₹ 1.6 Cr</li>
                                                                <li id="min_1.8"  onClick={this.mob_display_min.bind(this,'18000000')}>₹ 1.8 Cr</li>
                                                                <li id="min_2.0"  onClick={this.mob_display_min.bind(this,'20000000')}>₹ 2.0 Cr</li>
                                                                <li id="min_2.3"  onClick={this.mob_display_min.bind(this,'23000000')}>₹ 2.3 Cr</li>
                                                                <li id="min_2.6"  onClick={this.mob_display_min.bind(this,'26000000')}>₹ 2.6 Cr</li>
                                                                <li id="min_3"  onClick={this.mob_display_min.bind(this,'30000000')}>₹ 3 Cr</li>
                                                                <li id="min_3.5"  onClick={this.mob_display_min.bind(this,'35000000')}>₹ 3.5 Cr</li>
                                                                <li id="min_4"  onClick={this.mob_display_min.bind(this,'40000000')}>₹ 4 Cr</li>
                                                                <li id="min_4.5"  onClick={this.mob_display_min.bind(this,'45000000')}>₹ 4.5 Cr</li>
                                                                <li id="min_5c"  onClick={this.mob_display_min.bind(this,'50000000')}>₹ 5 Cr</li>
                                                                <li id="min_10c" onClick={this.mob_display_min.bind(this,'100000000')}>₹ 10 Cr</li>
                                                                <li id="min_20c"  onClick={this.mob_display_min.bind(this,'200000000')}>₹ 20 Cr</li>

                                                                

                                                              </ul> 
                                                              
                                                              } 
                                                              <input type="text" className="budget_text2" value={this.state.mob_maxTextField} id="mob_max_amount" placeholder="Max" onClick={this.on_mob_budget_max} readonly="readonly"/>
                                                              {this.state.mob_max_list &&
                                                              <ul className="max_budget" onClick={this.on_budget_done}>
                                                              
                                                                
                                                              <li id="max_10"  onClick={this.mob_display_max.bind(this,'1000000')}>₹ 10 Lac</li>
                                                                <li id="max_15"   onClick={this.mob_display_max.bind(this,'1500000')}>₹ 15 Lac</li>
                                                                <li id="max_20"  onClick={this.mob_display_max.bind(this,'2000000')}>₹ 20 Lac</li>
                                                                <li id="max_25"  onClick={this.mob_display_max.bind(this,'2500000')}>₹ 25 Lac</li>
                                                                <li id="max_30" onClick={this.mob_display_max.bind(this,'3000000')}>₹ 30 Lac</li>
                                                                <li id="max_35" onClick={this.mob_display_max.bind(this,'3500000')}>₹ 35 Lac</li>
                                                                <li id="max_40"  onClick={this.mob_display_max.bind(this,'4000000')}>₹ 40 Lac</li>
                                                                <li id="max_45"  onClick={this.mob_display_max.bind(this,'4500000')}>₹ 45 Lac</li>
                                                                <li id="max_50"  onClick={this.mob_display_max.bind(this,'5000000')}>₹ 50 Lac</li>
                                                                <li id="max_60"  onClick={this.mob_display_max.bind(this,'6000000')}>₹ 60 Lac</li>
                                                                <li id="max_70"  onClick={this.mob_display_max.bind(this,'7000000')}>₹ 70 Lac</li>
                                                                <li id="max_80"  onClick={this.mob_display_max.bind(this,'8000000')}> ₹ 80 Lac</li>
                                                                <li id="max_90" onClick={this.mob_display_max.bind(this,'9000000')}>₹ 90 Lac</li>
                                                                <li id="max_1"  onClick={this.mob_display_max.bind(this,'10000000')}>₹ 1 Cr</li>
                                                                <li id="max_1.2"  onClick={this.mob_display_max.bind(this,'12000000')}>₹ 1.2 Cr</li>
                                                                <li id="max_1.4"  onClick={this.mob_display_max.bind(this,'14000000')}>₹ 1.4 Cr</li>
                                                                <li id="max_1.6"  onClick={this.mob_display_max.bind(this,'16000000')}>₹ 1.6 Cr</li>
                                                                <li id="max_1.8"  onClick={this.mob_display_max.bind(this,'18000000')}>₹ 1.8 Cr</li>
                                                                <li id="max_2.0"  onClick={this.mob_display_max.bind(this,'20000000')}>₹ 2.0 Cr</li>
                                                                <li id="max_2.3"  onClick={this.mob_display_max.bind(this,'23000000')}>₹ 2.3 Cr</li>
                                                                <li id="max_2.6"  onClick={this.mob_display_max.bind(this,'26000000')}>₹ 2.6 Cr</li>
                                                                <li id="max_3"  onClick={this.mob_display_max.bind(this,'30000000')}>₹ 3 Cr</li>
                                                                <li id="max_3.5"  onClick={this.mob_display_max.bind(this,'35000000')}>₹ 3.5 Cr</li>
                                                                <li id="max_4"  onClick={this.mob_display_max.bind(this,'40000000')}>₹ 4 Cr</li>
                                                                <li id="max_4.5"  onClick={this.mob_display_max.bind(this,'45000000')}>₹ 4.5 Cr</li>
                                                                <li id="max_5c"  onClick={this.mob_display_max.bind(this,'50000000')}>₹ 5 Cr</li>
                                                                <li id="max_10c" onClick={this.mob_display_max.bind(this,'100000000')}>₹ 10 Cr</li>
                                                                <li id="max_20c"  onClick={this.mob_display_max.bind(this,'200000000')}>₹ 20 Cr</li>
                                                              <li onClick={this.mob_display_max.bind(this,'Max')}>Max</li>

                                                              

                                                            </ul> 
                                                            
                                                          } 


                                                          {/* <p className= "done_budget" onClick={this.budgetText.bind(this)}>DONE</p> */}
                                                          </div>     
                                                          }

                                           <button className="mob_amen_btn" onClick={this.mob_amen} style={{backgroundColor:this.state.mob_amen_color,border:this.state.mob_amen_border}}>Amenities</button>
                                           {this.state.mob_amenities_component &&

                                                    <div className="mob_container_amen" >
                                                        
                                                        <section class="mob_amen_check" onChange={this.on_amen_done}>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_swimming" name="mob_amenities" value="Swimming pool" checked={this.state.mob_amenities1_checked}   onClick={() => this.setState({mob_amenities1_checked: !mob_amenities1_checked })}/>
                                                        <label className="mob_all swimming" for="mob_swimming">Swimming pool</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_kids" name="mob_amenities" value="Kids play area" checked={this.state.mob_amenities2_checked}   onClick={() => this.setState({mob_amenities2_checked: !mob_amenities2_checked })}/>
                                                        <label className="mob_all kids" for="mob_kids">Kids play area</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_gym" name="mob_amenities" value="Gym" checked={this.state.mob_amenities3_checked}   onClick={() => this.setState({mob_amenities3_checked: !mob_amenities3_checked })}/>
                                                        <label className="mob_all gym" for="mob_gym">Gym</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_indoor" name="mob_amenities" value="Indoor Games" checked={this.state.mob_amenities4_checked}   onClick={() => this.setState({mob_amenities4_checked: !mob_amenities4_checked })}/>
                                                        <label className="mob_all indoor" for="mob_indoor">Indoor Games</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_outdoor" name="mob_amenities" value="Outdoor Games" checked={this.state.mob_amenities5_checked}   onClick={() => this.setState({mob_amenities5_checked: !mob_amenities5_checked })}/>
                                                        <label className="mob_all outdoor" for="mob_outdoor">Outdoor Games</label>
                                                        <input  className="input_checkbox_mob" type="checkbox" id="mob_garden" name="mob_amenities" value="Garden" checked={this.state.mob_amenities6_checked}   onClick={() => this.setState({mob_amenities6_checked: !mob_amenities6_checked })}/>
                                                        <label className="mob_all garden" for="mob_garden">Garden</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_more" name="mob_amenities" value="More" checked={this.state.mob_amenities7_checked}   onClick={() => this.setState({mob_amenities7_checked: !mob_amenities7_checked })}/>
                                                        <label className="mob_all more" for="mob_more">More</label>

                                                    




                                                        {/* <p className= "done_amen" onClick={this.amenitiesText.bind(this)}>DONE</p> */}


                                                    </section>
                                                    </div>

                                                    }

                                           <button className="mob_poss_btn" onClick={this.mob_poss} style={{backgroundColor:this.state.mob_poss_color,border:this.state.mob_poss_border}}>Possession</button> 
                                           {this.state.mob_possession_component &&

                                                    <div className="mob_container_poss">
                                                        
                                                        <section class="mob_poss_check " onChange={this.on_poss_done}>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_ready" name="mob_possession" value="Ready"  checked={this.state.mob_poss1_checked}   onClick={() => this.setState({mob_poss1_checked: !mob_poss1_checked })}/>
                                                        <label className="mob_all ready" for="mob_ready">Ready</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_months6" name="mob_possession" value="0-6 months" checked={this.state.mob_poss2_checked}   onClick={() => this.setState({mob_poss2_checked: !mob_poss2_checked })}/>
                                                        <label className="mob_all months6" for="mob_months6">0-6 months</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_months12" name="mob_possession" value="6-12 months" checked={this.state.mob_poss6_checked}   onClick={() => this.setState({mob_poss6_checked: !mob_poss6_checked })}/>
                                                        <label className="mob_all months12" for="mob_months12">6-12 months</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_years1" name="mob_possession" value="1-2 years" checked={this.state.mob_poss3_checked}   onClick={() => this.setState({mob_poss3_checked: !mob_poss3_checked })}/>
                                                        <label className="mob_all years1" for="mob_years1">1-2 years</label>
                                                        <input className="input_checkbox_mob" type="checkbox" id="mob_years2" name="mob_possession" value="2+ years" checked={this.state.mob_poss4_checked}   onClick={() => this.setState({mob_poss4_checked: !mob_poss4_checked })}/>
                                                        <label className="mob_all years2" for="mob_years2">2+ years</label>
                                                        {/* <input className="input_checkbox_mob" type="checkbox" id="mob_garden2" name="mob_possession" value="Garden" checked={this.state.mob_poss5_checked}   onClick={() => this.setState({mob_poss5_checked: !mob_poss5_checked })}/>
                                                        <label className="mob_all garden2" for="mob_garden2">Garden</label> */}
                                                      

                                                     




                                                        {/* <p className= "done_poss" onClick={this.possessionText.bind(this)}>DONE</p> */}


                                                     </section>
                                                    </div>

                                                    }
                                           <hr className="mob_hrFilter_2"/>
                                           <div className="mobVertical_line"></div>
                                           <p className="mob_filter_cancel" onClick={this.mob_component_close}>Cancel</p>
                                           
                                    </div>
                                    <p className="mob_filter_done" onClick={this.on_mob_done}>DONE</p>
                              </div>  
                        }
                        </div>
                        <div className="col-3 centeralignLS custommobilefooterpaddingLS veticallyalignLS" >
                        <span ><img width="30px" src={Sort} style={{verticalAlign: "inherit"}}/></span>Sort
                        </div>
                        {/* <div className="col-3 centeralign custommobilefooterpadding veticallyalign" >
                        <span><img width="30px" src={direction} style={{verticalAlign: "inherit"}}/></span>DIRECTION
                        </div> */}
                        <div className="col-3 centeralignLS custommobilefooterpaddingLS veticallyalignLS" >
                        <span><img width="30px" src={Share} style={{verticalAlign: "inherit"}}/></span>SHARE
                        </div>    
            </div>  
      

    <Footer/>
         </div>
       </div>
)
            }
    
}
export default RecentLocationSearch;
