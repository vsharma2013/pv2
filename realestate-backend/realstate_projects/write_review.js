
var express = require('express');
var router = express.Router();
var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
// calling of database file
const db = require("../config/db");
const config_var = require('../config/config_var');

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
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log("FOLDER NAME: ", req.body.project_id);
      folder_name = req.body.project_id;
      cb(null, "Review_Given_Media/project_id_" + folder_name + "/" + Date.now() + file.originalname)
    }
  })
})


/* Multiple Files Upload */
router.post('/', upload.fields([{ name: 'review_media', maxCount: 15 },
{ name: 'project_id' }, { name: 'project_name' }, { name: 'reviewer_type' },
{ name: 'overall_rating' }, { name: 'location' }, { name: 'amenities' }, { name: 'floor_plan' },
{ name: 'customer_service' }, { name: 'vom' }, { name: 'review_title' }, { name: 'review' },
{ name: 'reviewer_email' }]), async function (req, res) {
  console.log("request data: ",   req.body );
  var project_id = req.body.project_id;
  var project_name = req.body.project_name;
  var reviewer_type = req.body.reviewer_type;
  var overall_rating = req.body.overall_rating;
  var location = req.body.location;
  var amenities = req.body.amenities;
  var floor_plan = req.body.floor_plan;
  var customer_service = req.body.customer_service;
  var value_of_money = req.body.vom;
  var review_title = req.body.review_title;
  var review = req.body.review;
  var reviewer_email = req.body.reviewer_email;
  //var reviewer_email        = 'demo@gmail.com';
  var count_of_rating1 = 0;
  var count_of_rating2 = 0;
  var count_of_rating3 = 0;
  var count_of_rating4 = 0;
  var count_of_rating5 = 0;
  //-----------
  if (overall_rating == 1) {
    count_of_rating1++;
  }
  else if (overall_rating == 2) {
    count_of_rating2++;
  }
  else if (overall_rating == 3) {
    count_of_rating3++;
  }
  else if (overall_rating == 4) {
    count_of_rating4++;
  }
  else if (overall_rating == 5) {
    count_of_rating5++;
  }
  //--------
  //-----------
  if (location == 1) {
    count_of_rating1++;
  }
  else if (location == 2) {
    count_of_rating2++;
  }
  else if (location == 3) {
    count_of_rating3++;
  }
  else if (location == 4) {
    count_of_rating4++;
  }
  else if (location == 5) {
    count_of_rating5++;
  }
  //--------
  //-----------
  if (amenities == 1) {
    count_of_rating1++;
  }
  else if (amenities == 2) {
    count_of_rating2++;
  }
  else if (amenities == 3) {
    count_of_rating3++;
  }
  else if (amenities == 4) {
    count_of_rating4++;
  }
  else if (amenities == 5) {
    count_of_rating5++;
  }
  //--------
  //-----------
  if (floor_plan == 1) {
    count_of_rating1++;
  }
  else if (floor_plan == 2) {
    count_of_rating2++;
  }
  else if (floor_plan == 3) {
    count_of_rating3++;
  }
  else if (floor_plan == 4) {
    count_of_rating4++;
  }
  else if (floor_plan == 5) {
    count_of_rating5++;
  }
  //--------
  //-----------
  if (customer_service == 1) {
    count_of_rating1++;
  }
  else if (customer_service == 2) {
    count_of_rating2++;
  }
  else if (customer_service == 3) {
    count_of_rating3++;
  }
  else if (customer_service == 4) {
    count_of_rating4++;
  }
  else if (customer_service == 5) {
    count_of_rating5++;
  }
  //--------
  //-----------
  if (value_of_money == 1) {
    count_of_rating1++;
  }
  else if (value_of_money == 2) {
    count_of_rating2++;
  }
  else if (value_of_money == 3) {
    count_of_rating3++;
  }
  else if (value_of_money == 4) {
    count_of_rating4++;
  }
  else if (value_of_money == 5) {
    count_of_rating5++;
  }
  //--------
  var overall_rating_cal = (count_of_rating1 * 1 + count_of_rating2 * 2 + count_of_rating3 * 3 + count_of_rating4 * 4 + count_of_rating5 * 5) /
    (count_of_rating1 + count_of_rating2 + count_of_rating3 + count_of_rating4 + count_of_rating5);
  // console.log("RatingCount1: ", count_of_rating1);
  // console.log("RatingCount2: ", count_of_rating2);
  // console.log("RatingCount3: ", count_of_rating3);
  // console.log("RatingCount4: ", count_of_rating4);
  // console.log("RatingCount5: ", count_of_rating5);
  // console.log("OverallRating: ", overall_rating);

  // Fine if user Already reviewed the project or not
  var sel_qury = "select COALESCE( (select vu.userid from project_review pr Left Join visitor_user vu  ON pr.reviewer_id = vu.userid \
    where pr.project_id = '"+ project_id + "' And vu.email = '" + reviewer_email + "' LIMIT 1), null) as userid";
  var result = await db.query(sel_qury);

  if (result.rows[0].userid != null) {
    // User Already Reviewed This Project
    console.log("User Already Reviewed This Project");
    var reviewer_id = result.rows[0].userid;
    // console.log(reviewer_id);

    // Remove the old ratings given by user on the project 
    var query = "select review_id from project_review where project_id = '" + project_id + "' AND reviewer_id ='" + reviewer_id + "'";
    var result = await db.query(query);
    var review_id_found = result.rows[0].review_id;
    // console.log("review_id_found",review_id_found);

    var sel_query = "select * from project_review Where review_id = '" + review_id_found + "' ";
    var result = await db.query(sel_query);
    // console.log(result.rows);
    var old_count_of_rating1 = 0;
    var old_count_of_rating2 = 0;
    var old_count_of_rating3 = 0;
    var old_count_of_rating4 = 0;
    var old_count_of_rating5 = 0;
    //-----------
    if (result.rows[0].overall_rating == 1) {
      old_count_of_rating1++;
    }
    else if (result.rows[0].overall_rating == 2) {
      old_count_of_rating2++;
    }
    else if (result.rows[0].overall_rating == 3) {
      old_count_of_rating3++;
    }
    else if (result.rows[0].overall_rating == 4) {
      old_count_of_rating4++;
    }
    else if (result.rows[0].overall_rating == 5) {
      old_count_of_rating5++;
    }
    //--------
    //-----------
    if (result.rows[0].location_rating == 1) {
      old_count_of_rating1++;
    }
    else if (result.rows[0].location_rating == 2) {
      old_count_of_rating2++;
    }
    else if (result.rows[0].location_rating == 3) {
      old_count_of_rating3++;
    }
    else if (result.rows[0].location_rating == 4) {
      old_count_of_rating4++;
    }
    else if (result.rows[0].location_rating == 5) {
      old_count_of_rating5++;
    }
    //--------
    //-----------
    if (result.rows[0].amenities_rating == 1) {
      old_count_of_rating1++;
    }
    else if (result.rows[0].amenities_rating == 2) {
      old_count_of_rating2++;
    }
    else if (result.rows[0].amenities_rating == 3) {
      old_count_of_rating3++;
    }
    else if (result.rows[0].amenities_rating == 4) {
      old_count_of_rating4++;
    }
    else if (result.rows[0].amenities_rating == 5) {
      old_count_of_rating5++;
    }
    //--------
    //-----------
    if (result.rows[0].layout_planning_rating == 1) {
      old_count_of_rating1++;
    }
    else if (result.rows[0].layout_planning_rating == 2) {
      old_count_of_rating2++;
    }
    else if (result.rows[0].layout_planning_rating == 3) {
      old_count_of_rating3++;
    }
    else if (result.rows[0].layout_planning_rating == 4) {
      old_count_of_rating4++;
    }
    else if (result.rows[0].layout_planning_rating == 5) {
      old_count_of_rating5++;
    }
    //--------
    //-----------
    if (result.rows[0].customer_service_rating == 1) {
      old_count_of_rating1++;
    }
    else if (result.rows[0].customer_service_rating == 2) {
      old_count_of_rating2++;
    }
    else if (result.rows[0].customer_service_rating == 3) {
      old_count_of_rating3++;
    }
    else if (result.rows[0].customer_service_rating == 4) {
      old_count_of_rating4++;
    }
    else if (result.rows[0].customer_service_rating == 5) {
      old_count_of_rating5++;
    }
    //--------
    //-----------
    if (result.rows[0].vfm == 1) {
      old_count_of_rating1++;
    }
    else if (result.rows[0].vfm == 2) {
      old_count_of_rating2++;
    }
    else if (result.rows[0].vfm == 3) {
      old_count_of_rating3++;
    }
    else if (result.rows[0].vfm == 4) {
      old_count_of_rating4++;
    }
    else if (result.rows[0].vfm == 5) {
      old_count_of_rating5++;
    }
    // console.log("RatingCount1: ",  old_count_of_rating1);
    // console.log("RatingCount2: ",  old_count_of_rating2);
    // console.log("RatingCount3: ",  old_count_of_rating3);
    // console.log("RatingCount4: ",  old_count_of_rating4);
    // console.log("RatingCount5: ",  old_count_of_rating5);

    // Removing Old Rating and Adding new rating
    var query = "select * from project_rating where project_id='" + project_id + "'";
    var result = await db.query(query);
    var new_rating1 = (result.rows[0].rating1_count - old_count_of_rating1) + count_of_rating1;
    var new_rating2 = (result.rows[0].rating2_count - old_count_of_rating2) + count_of_rating2;
    var new_rating3 = (result.rows[0].rating3_count - old_count_of_rating3) + count_of_rating3;
    var new_rating4 = (result.rows[0].rating4_count - old_count_of_rating4) + count_of_rating4;
    var new_rating5 = (result.rows[0].rating5_count - old_count_of_rating5) + count_of_rating5;
    var new_overall_rating = (new_rating1 * 1 + new_rating2 * 2 + new_rating3 * 3 + new_rating4 * 4 + new_rating5 * 5) /
      (new_rating1 + new_rating2 + new_rating3 + new_rating4 + new_rating5);

    var query = "UPDATE public.project_rating\
    SET rating1_count='"+ new_rating1 + "', rating2_count='" + new_rating2 + "', rating3_count='" + new_rating3 + "', rating4_count='" + new_rating4 + "', \
    rating5_count='"+ new_rating5 + "', overall_rating='" + new_overall_rating + "' WHERE project_id='" + project_id + "'";
    var result = await db.query(query);

    // console.log("New RatingCount1: ", new_rating1);
    // console.log("New RatingCount2: ", new_rating2);
    // console.log("New RatingCount3: ", new_rating3);
    // console.log("New RatingCount4: ", new_rating4);
    // console.log("New RatingCount5: ", new_rating5);
    // console.log("New Overall Rating: ", new_overall_rating);

    // Updating the User Project Review with new Information.

    var current_date = new Date().toISOString().split('T')[0];
    var current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var status = '';
    if (review_title == '' && review == '') {
      status = 'approved';
    }
    else {
      status = 'unapproved';
    }

    var update_helpful_query = "UPDATE review_helpful SET helpful_count='0' WHERE review_id='" + review_id_found + "'";
    await db.query(update_helpful_query);

    var delete_helpful_voters = "Delete from review_voters WHERE review_id='" + review_id_found + "'";
    await db.query(delete_helpful_voters);

    var delete_old_comments = "Delete from project_review_comment WHERE review_id='" + review_id_found + "'";
    await db.query(delete_old_comments);

    var query = "UPDATE project_review SET reviewer_type = '" + reviewer_type + "', location_rating='" + location + "',  \
    amenities_rating='" + amenities + "', layout_planning_rating='" + floor_plan + "', \
    overall_rating='" + overall_rating + "', customer_service_rating='" + customer_service + "',  \
    vfm='" + value_of_money + "', review_title='" + review_title + "', review='" + review + "',  \
    review_date='" + current_date + "', status='" + status + "', review_time= '" + current_time + "' \
    WHERE project_id='"+ project_id + "' AND reviewer_id= '" + reviewer_id + "' RETURNING review_id";

    var result_with_rewiewid = await db.query(query);
    var review_id = result_with_rewiewid.rows[0].review_id;
    console.log("result_with_rewiewid: ", review_id);

    try {
      var del_query = "delete from project_review_media where review_id = '" + review_id + "' ";
      await db.query(del_query);
      var review_media_length = req.files.review_media.length;
      for (i = 0; i < review_media_length; i++) {
        var media_link = req.files.review_media[i].location;
        var media_text = req.body.review_media_text[i];
        console.log("media_link: ", media_link);
        var query = "Insert Into project_review_media Values('" + review_id + "','" + media_link + "','" + media_text + "')";
        await db.query(query);
        var update_query = "UPDATE project_review SET status='unapproved' WHERE review_id='" + review_id + "'";
        await db.query(update_query);
      }
    }
    catch (e) {
      console.log("No media is given at the time of posting review");
    }

  }
  else {
    //User First Time Reviewed This Project
    console.log("User First Time Reviewed This Project");
    var query = "select COALESCE((select project_id from project_rating where project_id='" + project_id + "'),null) as project_id";
    var result = await db.query(query);
    if (result.rows[0].project_id == null) {
      var query = "INSERT INTO public.project_rating(\
      project_id, rating1_count, rating2_count, rating3_count, rating4_count, rating5_count, overall_rating)\
      VALUES ('"+ project_id + "', '" + count_of_rating1 + "', '" + count_of_rating2 + "', '" + count_of_rating3 + "', \
      '"+ count_of_rating4 + "', '" + count_of_rating5 + "', '" + overall_rating_cal + "')";
      await db.query(query);
      console.log("INSERTED PROJECT RATING ");
    }
    else {
      var query = "select * from project_rating where project_id='" + project_id + "'";
      var result = await db.query(query);
      var new_rating1 = result.rows[0].rating1_count + count_of_rating1;
      var new_rating2 = result.rows[0].rating2_count + count_of_rating2;
      var new_rating3 = result.rows[0].rating3_count + count_of_rating3;
      var new_rating4 = result.rows[0].rating4_count + count_of_rating4;
      var new_rating5 = result.rows[0].rating5_count + count_of_rating5;
      var new_overall_rating = (new_rating1 * 1 + new_rating2 * 2 + new_rating3 * 3 + new_rating4 * 4 + new_rating5 * 5) /
        (new_rating1 + new_rating2 + new_rating3 + new_rating4 + new_rating5);
      // console.log("New RatingCount1: ",new_rating1);
      // console.log("New RatingCount2: ",new_rating2);
      // console.log("New RatingCount3: ",new_rating3);
      // console.log("New RatingCount4: ",new_rating4);
      // console.log("New RatingCount5: ",new_rating5);
      // console.log("New Overall Rating: ",new_overall_rating);
      var query = "UPDATE public.project_rating\
      SET rating1_count='"+ new_rating1 + "', rating2_count='" + new_rating2 + "', rating3_count='" + new_rating3 + "', rating4_count='" + new_rating4 + "', \
      rating5_count='"+ new_rating5 + "', overall_rating='" + new_overall_rating + "' WHERE project_id='" + project_id + "'";
      var result = await db.query(query);
      console.log("UPDATED PROJECT RATING ");
    }

    var query = "select userid, name from visitor_user where email='" + reviewer_email + "' LIMIT 1";
    var result = await db.query(query);
    var reviewer_id = result.rows[0].userid;
    var reviewer_name = result.rows[0].name;
    //console.log("reviewer_id: ",   reviewer_id ); 
    //console.log("reviewer_name: ", reviewer_name);
    var current_date = new Date().toISOString().split('T')[0];
    var current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    //console.log("Current Date:",current_date);

    var status = '';
    if (review_title == '' && review == '') {
      status = 'approved';
    }
    else {
      status = 'unapproved';
    }
    //console.log("status:",status);


    var query = "Insert Into project_review (project_id, reviewer_id, reviewer_name, reviewer_type, \
    location_rating, amenities_rating, layout_planning_rating, overall_rating, customer_service_rating, \
    vfm, review_title, review, review_date, status, email_varified, review_time) \
    Values('"+ project_id + "','" + reviewer_id + "','" + reviewer_name + "', '" + reviewer_type + "','" + location + "','" + amenities + "',\
    '"+ floor_plan + "','" + overall_rating + "','" + customer_service + "','" + value_of_money + "','" + review_title + "',\
    '"+ review + "','" + current_date + "', '" + status + "','true', '" + current_time + "') RETURNING review_id";

    var result_with_rewiewid = await db.query(query);
    var review_id = result_with_rewiewid.rows[0].review_id;
    //console.log("result_with_rewiewid: ", review_id);

    try {
      var review_media_length = req.files.review_media.length;
      for (i = 0; i < review_media_length; i++) {
        var media_link = req.files.review_media[i].location;
        var media_text = req.body.review_media_text[i];
        console.log("media_link: ", media_link);
        var query = "Insert Into project_review_media Values('" + review_id + "','" + media_link + "','" + media_text + "')";
        await db.query(query);
        var update_query = "UPDATE project_review SET status='unapproved' WHERE review_id='" + review_id + "'";
        await db.query(update_query);
      }
    }
    catch (e) {
      console.log("No media is given at the time of posting review");
    }
  }

  res.json({ "Status": "Success" });
})



module.exports = router;