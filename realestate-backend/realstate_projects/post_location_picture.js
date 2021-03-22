
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
      location_id = req.body.location_id;
      cb(null, "Location_Photos/Location_Management_Photos/location_id" + location_id + "/" + Date.now() + file.originalname)
    }
  })
})

// Post a picture from management
router.get('/', async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/post_location_pictures.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/post_location_pictures.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


router.get('/upload_location_photos/', async function (req, res) {
  // var location_id = req.query.locationid;

  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/upload_location_photos.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/upload_location_photos.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

// Post a picture from management
router.post('/location_gallery_upload', upload.fields([{ name: 'location_id' }, { name: 'blogimage', maxCount: 15 }]),
  async function (req, res) {
    //console.log("request data: ", req.body);
    var location_id = req.body.location_id;
    for (i = 0; i < req.files.blogimage.length; i++) {
      var media_link = req.files.blogimage[i].location;
      //console.log("Media Link: ",   media_link );
      //console.log("post title: ", req.body.location_gallery_text[i]);
      var query = "INSERT INTO project_location_media(location_id, uploaded_by, media_link, post_title)\
      VALUES ('"+ location_id + "', 'Management', '" + media_link + "','" + req.body.location_gallery_text[i] + "')";
      //console.log("Query: ",   query );
      await db.query(query);
    }

    res.redirect(backend_url + '/post_location_pictures/upload_location_photos?locationid=' + location_id + '&status=1');
  })


router.post('/fetch_location_management_media', async function (req, res) {
  console.log("request data: ", req.body.location_id);
  var location_id = req.body.location_id;
  var query = "select * from project_location_media where location_id = '" + location_id + "' and uploaded_by = 'Management'";
  var result = await db.query(query);
  res.json(result.rows);
})

router.post('/delete_location_photo_by_management', async function (req, res) {
  //console.log("request data: ", req.body );
  var location_id = req.body.location_id;
  var media_link = req.body.media_link;
  var Uploaded_by = req.body.Uploaded_by;
  var query = "DELETE FROM project_location_media WHERE location_id = '" + location_id + "' \
  AND media_link = '"+ media_link + "' AND uploaded_by = '" + Uploaded_by + "'";
  await db.query(query);
  res.redirect(backend_url + '/post_location_pictures/upload_location_photos?locationid=' + location_id + '&status=2');
})



var upload_loc_pic = multer({
  storage: multerS3({
    s3: s3,
    bucket: config_var.AWS_bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      location_id = req.body.location_id;
      cb(null, "Location_Photos/Location_User_Photos/location_id" + location_id + "/" + Date.now() + file.originalname)
    }
  })
})

// Post a picture from frontend
router.post('/post_user_location_picture', upload_loc_pic.fields([{ name: 'location_id' }, { name: 'location_name' },
{ name: 'post_media', maxCount: 15 }, { name: 'email_or_number' }]), async function (req, res) {
  console.log("request data: ",   req.body );
  console.log("request data: ",   req.files.post_media.length );
  var location_id = req.body.location_id;
  var location_name = req.body.location_name;
  var email = req.body.email_or_number;
  var query = "Select COALESCE( (select userid from visitor_user where email = '" + email + "'),NULL) as userid";
  const results = await db.query(query);

  if (results.rows[0].userid != null) {
    //console.log("User-Id Found: ",results.rows[0].userid );
    var userid = results.rows[0].userid;
    var files_length = req.files.post_media.length;
    var current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

    for (i = 0; i < files_length; i++) {
      var media_link = req.files.post_media[i].location;
      //console.log("gallery_link: ",media_link);
      var media_text = req.body.post_media_text[i];
      var query = "INSERT INTO public.project_post_location_pictures(\
      location_id, location_name, userid, post_media, status, post_time, post_title)\
      VALUES ('"+ location_id + "', '" + location_name + "', '" + userid + "', '" + media_link + "', 'unapproved', '" + current_time + "','" + media_text + "')";
      await db.query(query);
      console.log(" Post A Location Picture Uploaded Successfully With UserId: ", userid);
    }
  }

  res.json({ "Status": "Success" });
})


module.exports = router;