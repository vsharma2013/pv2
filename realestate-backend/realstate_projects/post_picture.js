
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
      folder_name = req.body.project_id;
      cb(null, "Posted_user_pictures/project_id_" + folder_name + "/" + Date.now() + file.originalname)
    }
  })
})


/* Multiple Files Upload */

router.post('/', upload.fields([{ name: 'project_id' }, { name: 'project_name' },
{ name: 'post_media', maxCount: 15 }, { name: 'email_or_number' }]), async function (req, res) {
  console.log("request data: ", req.body);
  console.log("request files: ", req.files.post_media.length);
  //console.log("request files: ", req.files);
  var project_id = req.body.project_id;
  var project_name = req.body.project_name;
  var email = req.body.email_or_number;
  var current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var query = "Select COALESCE( (select userid from visitor_user where email = '" + email + "'),NULL) as userid";
  const results = await db.query(query);

  if (results.rows[0].userid != null) {
    //console.log("User-Id Found: ",results.rows[0].userid );
    var userid = results.rows[0].userid;
    var files_length = req.files.post_media.length;
    for (i = 0; i < files_length; i++) {
      var media_link = req.files.post_media[i].location;
      var media_text = req.body.post_media_text[i];
      console.log("gallery_link: ", media_link);
      console.log("gallery_text: ", media_text);
      var query = "INSERT INTO project_post_pictures( \
        project_id, project_name, userid, post_media, status, created_at, comment) \
        VALUES ('"+ project_id + "','" + project_name + "','" + userid + "','" + media_link + "','unapproved', '" + current_time + "','" + media_text + "')";
      await db.query(query);
      //console.log(query);
      console.log(" Post A Picture Uploaded Successfully With UserId: ", userid);
    }
  }
  res.json({ "Status": "Success" });
})


router.post('/post_picture_without_login', upload.fields([{ name: 'project_id' }, { name: 'project_name' },
{ name: 'post_media', maxCount: 15 }, { name: 'email_or_number' }, { name: 'reviewer_name' }]), async function (req, res) {
  // console.log("request data: ",   req.body );
  // console.log("request data: ",   req.files.post_media.length );
  var project_id = req.body.project_id;
  var project_name = req.body.project_name;
  var email_or_number = req.body.email_or_number;
  var reviewer_name = req.body.reviewer_name;
  var current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

  var query = "INSERT INTO visitor_user( name, email) VALUES ('" + reviewer_name + "', '" + email_or_number + "')";
  await db.query(query);

  var query = "Select COALESCE( (select userid from visitor_user where email = '" + email_or_number + "' LIMIT 1),NULL) as userid";
  const results = await db.query(query);

  if (results.rows[0].userid != null) {
    //console.log("User-Id Found: ",results.rows[0].userid );
    var userid = results.rows[0].userid;
    var files_length = req.files.post_media.length;
    for (i = 0; i < files_length; i++) {
      var media_link = req.files.post_media[i].location;
      var media_text = req.body.post_media_text[i];
      var query = "INSERT INTO project_post_pictures( \
      project_id, project_name, userid, post_media, status, created_at, comment) \
      VALUES ('"+ project_id + "','" + project_name + "','" + userid + "','" + media_link + "','unapproved','" + current_time + "','" + media_text + "')";
      await db.query(query);
      console.log(" Post A Picture Uploaded Successfully With UserId: ", userid);
    }
  }
  res.json({ "Status": "Success" });
})

module.exports = router;