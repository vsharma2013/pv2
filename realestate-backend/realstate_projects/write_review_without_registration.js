
var express     = require('express');
var router      = express.Router();
var multer      = require('multer');
var multerS3    = require('multer-s3');
var aws         = require('aws-sdk');
// calling of database file
const db        = require("../config/db");
const config_var = require('../config/config_var');
const sgMail = require('@sendgrid/mail');

const s3 = new aws.S3({
    accessKeyId: config_var.AWS_accessKeyId,
    secretAccessKey: config_var.AWS_secretAccessKey
});


var folder_name = ""; 

var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: config_var.AWS_bucketName,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) { 
          console.log("FOLDER NAME: ",req.body.project_id );
          folder_name = req.body.project_id;
          cb(null, "Review_Given_Media/project_id_"+folder_name+"/"+Date.now()+ file.originalname)
      }
    })
  })


/* Multiple Files Upload */

router.post('/', upload.fields([{name:'review_media',maxCount:15},
{name:'project_id'}, {name:'project_name'}, {name:'reviewer_type'},
{name:'overall_rating'}, {name:'location'}, {name:'amenities'}, {name:'floor_plan'},
{name:'customer_service'}, {name:'vom'}, {name:'review_title'}, {name:'review'},
{name:'reviewer_email'}, {name:'reviewer_name'}]), async function(req, res) 
{  
  //console.log("request data: ",   req.body );
  var project_id            = req.body.project_id;
  var project_name          = req.body.project_name;
  var reviewer_type         = req.body.reviewer_type;
  var overall_rating        = req.body.overall_rating;
  var location              = req.body.location;
  var amenities             = req.body.amenities;
  var floor_plan            = req.body.floor_plan;
  var customer_service      = req.body.customer_service;
  var value_of_money        = req.body.vom;
  var review_title          = req.body.review_title;
  var review                = req.body.review;
  var reviewer_email        = req.body.reviewer_email;
  var reviewer_name         = req.body.reviewer_name;

  var query = "INSERT INTO public.visitor_user( name, email) VALUES ('"+reviewer_name+"', '"+reviewer_email+"')";
  var result = await db.query(query);

  var count_of_rating1 = 0;
  var count_of_rating2 = 0;
  var count_of_rating3 = 0;
  var count_of_rating4 = 0;
  var count_of_rating5 = 0;
  //-----------
  if(overall_rating == 1)
  {
    count_of_rating1++;
  }
  else if(overall_rating == 2){
    count_of_rating2++;
  }
  else if(overall_rating == 3){
    count_of_rating3++;
  }
  else if(overall_rating == 4){
    count_of_rating4++;
  }
  else if(overall_rating == 5){
    count_of_rating5++;
  }
  //--------
    //-----------
    if(location == 1)
    {
      count_of_rating1++;
    }
    else if(location == 2){
      count_of_rating2++;
    }
    else if(location == 3){
      count_of_rating3++;
    }
    else if(location == 4){
      count_of_rating4++;
    }
    else if(location == 5){
      count_of_rating5++;
    }
    //--------
      //-----------
  if(amenities == 1)
  {
    count_of_rating1++;
  }
  else if(amenities == 2){
    count_of_rating2++;
  }
  else if(amenities == 3){
    count_of_rating3++;
  }
  else if(amenities == 4){
    count_of_rating4++;
  }
  else if(amenities == 5){
    count_of_rating5++;
  }
  //--------
  //-----------
    if(floor_plan == 1)
    {
      count_of_rating1++;
    }
    else if(floor_plan == 2){
      count_of_rating2++;
    }
    else if(floor_plan == 3){
      count_of_rating3++;
    }
    else if(floor_plan == 4){
      count_of_rating4++;
    }
    else if(floor_plan == 5){
      count_of_rating5++;
    }
    //--------
    //-----------
  if(customer_service == 1)
  {
    count_of_rating1++;
  }
  else if(customer_service == 2){
    count_of_rating2++;
  }
  else if(customer_service == 3){
    count_of_rating3++;
  }
  else if(customer_service == 4){
    count_of_rating4++;
  }
  else if(customer_service == 5){
    count_of_rating5++;
  }
  //--------
    //-----------
    if(value_of_money == 1)
    {
      count_of_rating1++;
    }
    else if(value_of_money == 2){
      count_of_rating2++;
    }
    else if(value_of_money == 3){
      count_of_rating3++;
    }
    else if(value_of_money == 4){
      count_of_rating4++;
    }
    else if(value_of_money == 5){
      count_of_rating5++;
    }
    //--------
  var overall_rating_cal = (count_of_rating1*1+count_of_rating2*2+count_of_rating3*3+count_of_rating4*4+count_of_rating5*5)/
  (count_of_rating1+count_of_rating2+count_of_rating3+count_of_rating4+count_of_rating5);
  // console.log("RatingCount1: ",count_of_rating1);
  // console.log("RatingCount2: ",count_of_rating2);
  // console.log("RatingCount3: ",count_of_rating3);
  // console.log("RatingCount4: ",count_of_rating4);
  // console.log("RatingCount5: ",count_of_rating5);
  // console.log("OverallRating: ",overall_rating);  
  
  
  var query = "select COALESCE((select project_id from project_rating where project_id='"+project_id+"'),null) as project_id";
  var result = await db.query(query);
  if(result.rows[0].project_id == null)
  {
    var query = "INSERT INTO public.project_rating(\
      project_id, rating1_count, rating2_count, rating3_count, rating4_count, rating5_count, overall_rating)\
      VALUES ('"+project_id+"', '"+count_of_rating1+"', '"+count_of_rating2+"', '"+count_of_rating3+"', \
      '"+count_of_rating4+"', '"+count_of_rating5+"', '"+overall_rating_cal+"')";
    await db.query(query);
    console.log("INSERTED PROJECT RATING ");
  }
  else
  {
    var query = "select * from project_rating where project_id='"+project_id+"'";
    var result = await db.query(query);
    var new_rating1 = result.rows[0].rating1_count + count_of_rating1;
    var new_rating2 = result.rows[0].rating2_count + count_of_rating2;
    var new_rating3 = result.rows[0].rating3_count + count_of_rating3;
    var new_rating4 = result.rows[0].rating4_count + count_of_rating4;
    var new_rating5 = result.rows[0].rating5_count + count_of_rating5;
    var new_overall_rating = (new_rating1*1+new_rating2*2+new_rating3*3+new_rating4*4+new_rating5*5)/
    (new_rating1+new_rating2+new_rating3+new_rating4+new_rating5);
    // console.log("New RatingCount1: ",new_rating1);
    // console.log("New RatingCount2: ",new_rating2);
    // console.log("New RatingCount3: ",new_rating3);
    // console.log("New RatingCount4: ",new_rating4);
    // console.log("New RatingCount5: ",new_rating5);
    // console.log("New Overall Rating: ",new_overall_rating);
    var query = "UPDATE public.project_rating\
    SET rating1_count='"+new_rating1+"', rating2_count='"+new_rating2+"', rating3_count='"+new_rating3+"', rating4_count='"+new_rating4+"', \
    rating5_count='"+new_rating5+"', overall_rating='"+new_overall_rating+"' WHERE project_id='"+project_id+"'";
    var result = await db.query(query);
    console.log("UPDATED PROJECT RATING ");
  }

  var query = "select userid, name from visitor_user where email='"+reviewer_email+"' LIMIT 1";
  var result = await db.query(query);
  var reviewer_id     = result.rows[0].userid;
  var reviewer_name   = result.rows[0].name;
  //console.log("reviewer_id: ",   reviewer_id ); 
  //console.log("reviewer_name: ", reviewer_name);
  var current_date = new Date().toISOString().split('T')[0];
  //console.log("Current Date:",current_date);

  var query = "Insert Into project_review (project_id, reviewer_id, reviewer_name, reviewer_type, \
  location_rating, amenities_rating, layout_planning_rating, overall_rating, customer_service_rating, \
  vfm, review_title, review, review_date, status,email_varified) \
  Values('"+project_id+"','"+reviewer_id+"','"+reviewer_name+"', '"+reviewer_type+"','"+location+"','"+amenities+"',\
  '"+floor_plan+"','"+overall_rating+"','"+customer_service+"','"+value_of_money+"','"+review_title+"',\
  '"+review+"','"+current_date+"','unapproved','false') RETURNING review_id";

  var result_with_rewiewid = await db.query(query); 
  var review_id = result_with_rewiewid.rows[0].review_id;
  console.log("result_with_rewiewid: ", review_id);

try
  {
    var review_media_length   = req.files.review_media.length;
    for(i=0;i<review_media_length;i++)
    { 
    var media_link = req.files.review_media[i].location;
    //console.log("media_link: ",media_link);
    var query = "Insert Into project_review_media Values('"+review_id+"','"+media_link+"')";
    await db.query(query);  
    }
  }
  catch (e) {
    console.log("No media is given at the time of posting review");
  }


  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(reviewer_email))
  {
    sgMail.setApiKey(config_var.sendgrid_mail_key)
    const msg = {
      to: reviewer_email,
      from: 'propviewz@goldenabodes.com',
      subject: 'Propviewz Registration',
      text: 'Complete your Registration from here ...',
      html: '<html> <body>\
      <center>\
      <div style="background-color: #46423c;width: 400px;height: 307px;color: bisque;border-radius: 18px;padding-top: 52px;">\
      <p>Hi there! We are glad for showing your interest on Propviewz. we have taken your review with us, Please verify your Email. <p/>\
      <h4><a href="https://www.propviewz.com/be/verify_unregis_user/'+reviewer_email+'" style="color: yellowgreen;">Verify</a></h4>\
      <p>Also, We are glad that you showed interest in our Website. Kindly Click on the below link to Register yourself on Propviewz <p/>\
      <h4><a href="https://www.propviewz.com/registration/'+reviewer_email+'" style="color: yellowgreen;">Click Here</a></h4>\
      <div>\
      </center>\
      </body></html>'
    }
    sgMail.send(msg)  
  }
  
res.json({"Status":"Success"});
})


module.exports = router;