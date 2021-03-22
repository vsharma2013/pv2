
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
      console.log("FOLDER NAME: ",req.body.bloger_email );
      folder_name = req.body.bloger_email.replace("@", '_');
      cb(null, "Blog_media/user_" + folder_name + "/" + Date.now() + file.originalname)
    }
  })
})



router.post('/save_blog', upload.fields([{ name: 'blog_title' },
{ name: 'blog' }, { name: 'bloger_email' }, { name: 'blog_type' }, { name: 'blog_media', maxCount: 15 }]), async function (req, res) {
  //console.log("request data: ",   req.body );
  var blog_title = req.body.blog_title;
  var blog = req.body.blog;
  blog = blog.replace(/'/g, "''");
  var bloger_email = req.body.bloger_email;
  var blog_type = req.body.blog_type;

  var query = "select userid, name from visitor_user where email='" + bloger_email + "' LIMIT 1";
  var result = await db.query(query);
  var bloger_id = result.rows[0].userid;
  //console.log("bloger_id: ",   bloger_id ); 

  var query = "INSERT INTO public.user_blogs(\
    blog_title, blog, status, user_id, email, blog_type)\
    VALUES ('"+ blog_title + "', '" + blog + "', 'unapproved', '" + bloger_id + "', '" + bloger_email + "','" + blog_type + "') RETURNING blog_id";
  var result_with_blog_id = await db.query(query);
  var blog_id = result_with_blog_id.rows[0].blog_id;
  //console.log("result_with_blog_id: ", blog_id);

  try {
    var blog_media_length = req.files.blog_media.length;
    for (i = 0; i < blog_media_length; i++) {
      var media_link = req.files.blog_media[i].location;
      //console.log("media_link: ",media_link);
      var query = "INSERT INTO public.user_blogs_media(blog_id, media_link) \
    VALUES ('"+ blog_id + "', '" + media_link + "')";
      await db.query(query);
    }
  }
  catch (e) {
    console.log("No media is given at the time of posting review");
  }

  res.json({ "Status": "Success" });
})


router.post("/draft_blog", async function (req, res) {
  //console.log("XXXXXXXXXXXX",req.body.email);
  var id = req.body.email;
  var query = "select ub.blog_id, ub.blog_title, ub.blog, ub.created_at, ub.user_id, ub.email, ub.blog_type, ubm.media_link \
  from user_blogs ub INNER JOIN user_blogs_media ubm ON ubm.blog_id = ub.blog_id  \
  where lower(ub.blog_type) = lower('draft') AND ub.email='"+ id + "'";
  const results = await db.query(query);
  //console.log(results.rows);
  if (results.rows.length >= 1) {
    return res.json(results.rows);
  }
  else {
    return res.json(results.rows);
  }
});

router.post("/user_public_blog", async function (req, res) {
  //console.log("XXXXXXXXXXXX",req.body.email);
  var id = req.body.email;
  var query = "select ub.blog_id, ub.blog_title, ub.blog, ub.created_at, ub.user_id, ub.email, ub.blog_type, ubm.media_link \
  from user_blogs ub INNER JOIN user_blogs_media ubm ON ubm.blog_id = ub.blog_id  \
  where lower(ub.blog_type) = lower('publish') AND ub.email='"+ id + "'";
  const results = await db.query(query);
  //console.log(results.rows);
  if (results.rows.length >= 1) {
    return res.json(results.rows);
  }
  else {
    return res.json(results.rows);
  }
});


router.post('/edit_blog', upload.fields([{ name: 'blog_id' },{ name: 'blog_title' },
{ name: 'blog' }, { name: 'bloger_email' }, { name: 'blog_type' }, { name: 'blog_media', maxCount: 15 }]), async function (req, res) {
  //console.log("request data: ",   req.body );
  var blog_title = req.body.blog_title;
  var blog_id = req.body.blog_id;
  var blog = req.body.blog;
  blog = blog.replace(/'/g, "''");
  var bloger_email = req.body.bloger_email;
  var blog_type = req.body.blog_type;

  var update_query = "UPDATE public.user_blogs SET blog_title='"+ blog_title + "', blog='" + blog + "', blog_type='" + blog_type + "'\
	WHERE blog_id='"+blog_id+"' RETURNING blog_id";
    
  var result_with_blog_id = await db.query(update_query);
  var blog_id = result_with_blog_id.rows[0].blog_id;
  console.log("result_with_blog_id: ", blog_id);

  try {
    var blog_media_length = req.files.blog_media.length;
    for (i = 0; i < blog_media_length; i++) {
      var media_link = req.files.blog_media[i].location;
      //console.log("media_link: ",media_link);
      var query = "UPDATE public.user_blogs_media SET media_link='" + media_link + "' WHERE blog_id='"+ blog_id + "' ";
      await db.query(query);
    }
  }
  catch (e) {
    console.log("No media is given at the time of posting review");
  }

  res.json({ "Status": "Success" });
})

module.exports = router;