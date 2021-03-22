
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
      console.log("FOLDER NAME: ", req.body.location_id);
      folder_name = req.body.location_id;
      cb(null, "Location_Review_Media/location_id_" + folder_name + "/" + Date.now() + file.originalname)
    }
  })
})


/* Multiple Files Upload */

router.post('/', upload.fields([{ name: 'review_media', maxCount: 15 },
{ name: 'location_id' }, { name: 'location_name' }, { name: 'overall_rating' },
{ name: 'social_appeal' }, { name: 'schools' }, { name: 'malls' },
{ name: 'medical' }, { name: 'transport' }, { name: 'review_title' }, { name: 'review' },
{ name: 'reviewer_email' }]), async function (req, res) {
  console.log("request data: ", req.body);
  //console.log("request files: ", req.files.review_media);
  var location_id = req.body.location_id;
  var location_name = req.body.location_name;
  var overall_rating = req.body.overall_rating;
  var social_appeal = req.body.social_appeal;
  var schools = req.body.schools;
  var malls = req.body.malls;
  var medical = req.body.medical;
  var transport = req.body.transport;
  var review_title = req.body.review_title;
  var review = req.body.review;
  var reviewer_email = req.body.reviewer_email;
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
  if (social_appeal == 1) {
    count_of_rating1++;
  }
  else if (social_appeal == 2) {
    count_of_rating2++;
  }
  else if (social_appeal == 3) {
    count_of_rating3++;
  }
  else if (social_appeal == 4) {
    count_of_rating4++;
  }
  else if (social_appeal == 5) {
    count_of_rating5++;
  }
  //--------
  //-----------
  if (schools == 1) {
    count_of_rating1++;
  }
  else if (schools == 2) {
    count_of_rating2++;
  }
  else if (schools == 3) {
    count_of_rating3++;
  }
  else if (schools == 4) {
    count_of_rating4++;
  }
  else if (schools == 5) {
    count_of_rating5++;
  }
  //--------
  //-----------
  if (malls == 1) {
    count_of_rating1++;
  }
  else if (malls == 2) {
    count_of_rating2++;
  }
  else if (malls == 3) {
    count_of_rating3++;
  }
  else if (malls == 4) {
    count_of_rating4++;
  }
  else if (malls == 5) {
    count_of_rating5++;
  }
  //--------
  //-----------
  if (medical == 1) {
    count_of_rating1++;
  }
  else if (medical == 2) {
    count_of_rating2++;
  }
  else if (medical == 3) {
    count_of_rating3++;
  }
  else if (medical == 4) {
    count_of_rating4++;
  }
  else if (medical == 5) {
    count_of_rating5++;
  }
  //--------
  //-----------
  if (transport == 1) {
    count_of_rating1++;
  }
  else if (transport == 2) {
    count_of_rating2++;
  }
  else if (transport == 3) {
    count_of_rating3++;
  }
  else if (transport == 4) {
    count_of_rating4++;
  }
  else if (transport == 5) {
    count_of_rating5++;
  }

  //--------
  var sel_query1 = "select userid from visitor_user where email = '" + reviewer_email + "'";
  var result1 = await db.query(sel_query1);
  var userid = result1.rows[0].userid;

  var sel_query = "select location_review_id from project_location_review where location_id = '" + location_id + "' AND reviewer_id = '" + userid + "'";
  var result = await db.query(sel_query);

  if (result.rowCount != 0) {
    console.log("*****User Already Posted Review************");
    var location_review_id = result.rows[0].location_review_id;
    //console.log("location_review_id",location_review_id);
    var sel_query = "select * from project_location_review where location_id = '" + location_id + "' AND reviewer_id = '" + userid + "'";
    var result = await db.query(sel_query);
    //console.log("project_location_review: ",result.rows)

    var old_overall_rating = result.rows[0].overall_rating;
    var old_social_appeal = result.rows[0].social_appeal;
    var old_schools = result.rows[0].school;
    var old_malls = result.rows[0].mall_restaurent;
    var old_medical = result.rows[0].medical_facilities;
    var old_transport = result.rows[0].public_transport;

    var old_count_of_rating1 = 0;
    var old_count_of_rating2 = 0;
    var old_count_of_rating3 = 0;
    var old_count_of_rating4 = 0;
    var old_count_of_rating5 = 0;

    //-----------
    if (old_overall_rating == 1) {
      old_count_of_rating1++;
    }
    else if (old_overall_rating == 2) {
      old_count_of_rating2++;
    }
    else if (old_overall_rating == 3) {
      old_count_of_rating3++;
    }
    else if (old_overall_rating == 4) {
      old_count_of_rating4++;
    }
    else if (old_overall_rating == 5) {
      old_count_of_rating5++;
    }
    //--------
    //-----------
    if (old_social_appeal == 1) {
      old_count_of_rating1++;
    }
    else if (old_social_appeal == 2) {
      old_count_of_rating2++;
    }
    else if (old_social_appeal == 3) {
      old_count_of_rating3++;
    }
    else if (old_social_appeal == 4) {
      old_count_of_rating4++;
    }
    else if (old_social_appeal == 5) {
      old_count_of_rating5++;
    }
    //--------
    //-----------
    if (old_schools == 1) {
      old_count_of_rating1++;
    }
    else if (old_schools == 2) {
      old_count_of_rating2++;
    }
    else if (old_schools == 3) {
      old_count_of_rating3++;
    }
    else if (old_schools == 4) {
      old_count_of_rating4++;
    }
    else if (old_schools == 5) {
      old_count_of_rating5++;
    }
    //--------
    //-----------
    if (old_malls == 1) {
      old_count_of_rating1++;
    }
    else if (old_malls == 2) {
      old_count_of_rating2++;
    }
    else if (old_malls == 3) {
      old_count_of_rating3++;
    }
    else if (old_malls == 4) {
      old_count_of_rating4++;
    }
    else if (old_malls == 5) {
      old_count_of_rating5++;
    }
    //--------
    //-----------
    if (old_medical == 1) {
      old_count_of_rating1++;
    }
    else if (old_medical == 2) {
      old_count_of_rating2++;
    }
    else if (old_medical == 3) {
      old_count_of_rating3++;
    }
    else if (old_medical == 4) {
      old_count_of_rating4++;
    }
    else if (old_medical == 5) {
      old_count_of_rating5++;
    }
    //--------
    //-----------
    if (old_transport == 1) {
      old_count_of_rating1++;
    }
    else if (old_transport == 2) {
      old_count_of_rating2++;
    }
    else if (old_transport == 3) {
      old_count_of_rating3++;
    }
    else if (old_transport == 4) {
      old_count_of_rating4++;
    }
    else if (old_transport == 5) {
      old_count_of_rating5++;
    }

    // console.log("old_count_of_rating2: ",old_count_of_rating1);
    // console.log("old_count_of_rating2: ",old_count_of_rating2);
    // console.log("old_count_of_rating3: ",old_count_of_rating3);
    // console.log("old_count_of_rating4: ",old_count_of_rating4);
    // console.log("old_count_of_rating5: ",old_count_of_rating5);

    var sel_query = "select * from project_location_rating where location_id = '" + location_id + "' ";
    var result = await db.query(sel_query);
    //console.log("project_location_rating: ", result.rows[0])

    var new_rating1 = (result.rows[0].rating1_count - old_count_of_rating1) + count_of_rating1;
    var new_rating2 = (result.rows[0].rating2_count - old_count_of_rating2) + count_of_rating2;
    var new_rating3 = (result.rows[0].rating3_count - old_count_of_rating3) + count_of_rating3;
    var new_rating4 = (result.rows[0].rating4_count - old_count_of_rating4) + count_of_rating4;
    var new_rating5 = (result.rows[0].rating5_count - old_count_of_rating5) + count_of_rating5;
    var new_overall_rating = (new_rating1 * 1 + new_rating2 * 2 + new_rating3 * 3 + new_rating4 * 4 + new_rating5 * 5) /
      (new_rating1 + new_rating2 + new_rating3 + new_rating4 + new_rating5);

    // console.log("New RatingCount1: ",new_rating1);
    // console.log("New RatingCount2: ",new_rating2);
    // console.log("New RatingCount3: ",new_rating3);
    // console.log("New RatingCount4: ",new_rating4);
    // console.log("New RatingCount5: ",new_rating5);
    // console.log("New Overall Rating: ",new_overall_rating);

    var query = "UPDATE project_location_rating\
    SET rating1_count='"+ new_rating1 + "', rating2_count='" + new_rating2 + "', rating3_count='" + new_rating3 + "',\
    rating4_count='"+ new_rating4 + "', rating5_count='" + new_rating5 + "', overall_rating='" + new_overall_rating + "'\
    WHERE location_id='"+ location_id + "'";
    var result = await db.query(query);
    console.log("--------UPDATED PROJECT RATING --------- ");

    var query = "select userid, name from visitor_user where email='" + reviewer_email + "' LIMIT 1";
    var result = await db.query(query);
    var reviewer_id = result.rows[0].userid;
    var reviewer_name = result.rows[0].name;
    // console.log("reviewer_id: ", reviewer_id);
    // console.log("reviewer_name: ", reviewer_name);
    var current_date = new Date().toISOString().split('T')[0];
    //console.log("Current Date:", current_date);
    var current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

    var status = '';
    if (review_title == '' && review == '') {
      status = 'approved';
    }
    else {
      status = 'unapproved';
    }

    var update_record = "UPDATE public.project_location_review \
    SET location_id='"+ location_id + "', reviewer_id= '" + reviewer_id + "', reviewer_name= '" + reviewer_name + "', \
    reviewer_type='visitor', overall_rating= '" + overall_rating + "', social_appeal= '" + social_appeal + "', \
    school='"+ schools + "', mall_restaurent='" + malls + "', medical_facilities='" + medical + "',\
    public_transport= '" + transport + "', review_title='" + review_title + "', review='" + review + "', \
    review_date='" + current_date + "', status='" + status + "', review_time='" + current_time + "' \
    WHERE location_review_id = '"+ location_review_id + "' RETURNING location_review_id";
    var result_with_rewiewid = await db.query(update_record);

    var location_review_id = result_with_rewiewid.rows[0].location_review_id;
    console.log("result_with_rewiewid: ", location_review_id);

    try {
      var del_media = "delete from project_location_review_media where location_review_id = '" + location_review_id + "'";
      await db.query(del_media);
      var review_media_length = req.files.review_media.length;
      for (i = 0; i < review_media_length; i++) {
        var media_link = req.files.review_media[i].location;
        var media_text = req.body.review_media_text[i];
        //console.log("media_link: ", media_link);
        var query = "INSERT INTO public.project_location_review_media(location_review_id, media_link, post_title)\
        VALUES ('"+ location_review_id + "', '" + media_link + "', '" + media_text + "')";
        await db.query(query);
        var update_query = "UPDATE project_location_review SET status='unapproved' WHERE location_review_id='" + location_review_id + "'";
        await db.query(update_query);
      }
    }
    catch (e) {
      console.log("No media is given at the time of posting location review");
    }

    var del_query = "delete from project_location_review_comment where location_review_id = '" + location_review_id + "'"
    await db.query(del_query);

    var del_query1 = "delete from project_location_review_voters where location_review_id = '" + location_review_id + "'"
    await db.query(del_query1);

    var del_query2 = "delete from project_location_review_helpful where location_review_id = '" + location_review_id + "'"
    await db.query(del_query2);
    //--------------------------------------------------------------------------------------------------------
  }
  else {
    console.log("*****User Posted New Review***************");
    var overall_rating_cal = (count_of_rating1 * 1 + count_of_rating2 * 2 + count_of_rating3 * 3 + count_of_rating4 * 4 + count_of_rating5 * 5) /
      (count_of_rating1 + count_of_rating2 + count_of_rating3 + count_of_rating4 + count_of_rating5);

    var query = "select COALESCE((select location_id from project_location_rating where location_id='" + location_id + "'),null) as location_id";
    var result = await db.query(query);

    if (result.rows[0].location_id == null) {
      var query = "INSERT INTO project_location_rating(\
      location_id, rating1_count, rating2_count, rating3_count, rating4_count, rating5_count, overall_rating)\
      VALUES ('"+ location_id + "', '" + count_of_rating1 + "', '" + count_of_rating2 + "', '" + count_of_rating3 + "', \
      '"+ count_of_rating4 + "', '" + count_of_rating5 + "', '" + Math.round(overall_rating_cal) + "')";
      await db.query(query);
      console.log("--------- INSERTED PROJECT RATING ---------");
    }
    else {
      var query = "select * from project_location_rating where location_id ='" + location_id + "'";
      var result = await db.query(query);
      var new_rating1 = result.rows[0].rating1_count + count_of_rating1;
      var new_rating2 = result.rows[0].rating2_count + count_of_rating2;
      var new_rating3 = result.rows[0].rating3_count + count_of_rating3;
      var new_rating4 = result.rows[0].rating4_count + count_of_rating4;
      var new_rating5 = result.rows[0].rating5_count + count_of_rating5;
      var new_overall_rating = (new_rating1 * 1 + new_rating2 * 2 + new_rating3 * 3 + new_rating4 * 4 + new_rating5 * 5) /
        (new_rating1 + new_rating2 + new_rating3 + new_rating4 + new_rating5);

      var query = "UPDATE project_location_rating\
      SET rating1_count='"+ new_rating1 + "', rating2_count='" + new_rating2 + "', rating3_count='" + new_rating3 + "',\
      rating4_count='"+ new_rating4 + "', rating5_count='" + new_rating5 + "', overall_rating='" + new_overall_rating + "'\
      WHERE location_id='"+ location_id + "'";
      var result = await db.query(query);
      console.log("------ UPDATED PROJECT RATING --------");
    }

    var query = "select userid, name from visitor_user where email='" + reviewer_email + "' LIMIT 1";
    var result = await db.query(query);
    var reviewer_id = result.rows[0].userid;
    var reviewer_name = result.rows[0].name;
    // console.log("reviewer_id: ", reviewer_id);
    // console.log("reviewer_name: ", reviewer_name);
    var current_date = new Date().toISOString().split('T')[0];
    //console.log("Current Date:", current_date);
    var current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

    var status = '';
    if (review_title == '' && review == '') {
      status = 'approved';
    }
    else {
      status = 'unapproved';
    }

    var query = "INSERT INTO project_location_review(\
    location_id, reviewer_id, reviewer_name, reviewer_type, overall_rating, \
    social_appeal, school, mall_restaurent, medical_facilities, public_transport, review_title, review, review_date, status, review_time)\
    VALUES ('"+ location_id + "', '" + reviewer_id + "', '" + reviewer_name + "', 'visitor', '" + overall_rating + "', '" + social_appeal + "',\
    '"+ schools + "', '" + malls + "', '" + medical + "', '" + transport + "', '" + review_title + "', '" + review + "', '" + current_date + "','" + status + "', '" + current_time + "') \
    RETURNING location_review_id";

    //console.log("XXXXXX",query);

    var result_with_rewiewid = await db.query(query);
    var location_review_id = result_with_rewiewid.rows[0].location_review_id;
    console.log("result_with_rewiewid: ", location_review_id);

    try {
      var review_media_length = req.files.review_media.length;
      console.log("review_media_length", review_media_length);
      for (i = 0; i < review_media_length; i++) {
        var media_link = req.files.review_media[i].location;
        var media_text = req.body.review_media_text[i];
        console.log("media_link: ", media_link);
        var query = "INSERT INTO public.project_location_review_media(location_review_id, media_link, post_title)\
        VALUES ('"+ location_review_id + "', '" + media_link + "', '" + media_text + "')";
        await db.query(query);
        var update_query = "UPDATE project_location_review SET status='unapproved' WHERE location_review_id='" + location_review_id + "'";
        await db.query(update_query);
      }
    }
    catch (e) {
      console.log("No media is given at the time of posting location review");
    }
  }

  res.json({ "Status": "Success" });
})


module.exports = router;