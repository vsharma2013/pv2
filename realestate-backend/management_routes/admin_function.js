
var express = require('express');
var router = express.Router();
var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
// calling of database file
const db = require("../config/db");
const config_var = require('../config/config_var');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const { review_info } = require('../realstate_projects/project_functions');

const s3 = new aws.S3({
  accessKeyId: config_var.AWS_accessKeyId,
  secretAccessKey: config_var.AWS_secretAccessKey
});


var folder_name = "";
var gallery_prefix = "";

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config_var.AWS_bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, "Project_Photos/ProjectId_" + folder_name + "/" + Date.now() + file.originalname)
    }
  })
})


router.get("/header/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/header.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/header.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/header.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.get("/show_dashboard/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/create_project.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/approve_project.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/create_project.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


// create project API
router.get("/create_project/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/create_project.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/create_project.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/create_project/", async function (req, res) {
  if (!req.session.admin) {
    res.redirect(backend_url + '/admin');
  }
  else {
    // console.log("xxxxxxxx",req.body);
    var pro_name = req.body.pro_name;
    var pro_country = req.body.pro_country;
    var pro_state = req.body.pro_state;
    var pro_city = req.body.pro_city;
    var pro_area = req.body.pro_area;
    var pro_sub_area = req.body.pro_sub_area;
    var property_type = req.body.property_type;
    var construction_status = req.body.construction_status;
    var posession_date_as_rera = req.body.posession_date_as_rera;
    var pro_add = req.body.pro_add.replace(/'/g, "''");
    var dev_email = req.body.dev_email;
    var dev_name = req.body.dev_name;
    var dev_mob_no = req.body.dev_mob_no;
    var developer_entity = req.body.developer_entity;
    var brand = req.body.brand;
    var map_link = req.body.map_link;
    var rera_no = req.body.rera_no;
    var rera_link = req.body.rera_link;
    var no_of_buildings = req.body.no_of_buildings;
    var Amenities = req.body.Amenities;
    var pro_phase = req.body.pro_phase;
    var pro_config = req.body.pro_config;
    var pro_price_start = req.body.pro_price_start.filter(Boolean);
    var pro_price_end = req.body.pro_price_end.filter(Boolean);
    var brief_desc = req.body.brief_desc.replace(/'/g, "''");;
    var posession_date = req.body.posession_date;
    var review_link = req.body.review_link;
    // console.log("pro_price_start",pro_price_start);
    // console.log("pro_price_end",pro_price_end);
    // console.log("pro_config",pro_config);
    // console.log("pro_phase",pro_phase);
    // console.log("construction_status",construction_status);
    // console.log("posession_date",posession_date);
    // console.log("brief_desc",brief_desc);


    var final_construction_status = '';
    if (construction_status.includes("Ready Possession")) {
      final_construction_status = "Ready Possession";
    }
    else {
      final_construction_status = "Under construction";
    }

    //console.log("final_construction_status",final_construction_status);

    if (posession_date_as_rera == "") {
      posession_date_as_rera = "N/A";
    }
    //find the location ID
    var query = "select location_id from project_location where lower(area)=lower('" + pro_area + "')";
    const results = await db.query(query);
    var location_id = "";

    if (results.rows.length == 1) {
      location_id = results.rows[0].location_id;
    }
    else {
      var query = "insert into project_location(area) Values ('" + pro_area + "') RETURNING location_id";
      const results = await db.query(query);
      location_id = results.rows[0].location_id;
      var query = "insert into project_location_rating Values ('" + location_id + "','0','0','0','0','0','0')";
      await db.query(query);
    }

    var query = "Insert Into project_details (project_name, country, state, city, area, sub_area, location_id, \
    property_type, construction_status, developer_email, developer_name, developer_phone_no, developer_entity, \
    brand, google_map_link, rera_no, rera_link, possession_date_as_rera, no_of_buildings, brief_dics, status, google_review_link ) \
    Values('"+ pro_name + "','" + pro_country + "','" + pro_state + "','" + pro_city + "','" + pro_area + "','" + pro_sub_area + "','" + location_id + "','" + property_type + "',  \
    '"+ final_construction_status + "','" + dev_email + "','" + dev_name + "','" + dev_mob_no + "','" + developer_entity + "',\
    '"+ brand + "','" + map_link + "','" + rera_no + "','" + rera_link + "','" + posession_date_as_rera + "','" + no_of_buildings + "','" + brief_desc + "', 'unapproved', '" + review_link + "') RETURNING project_id";

    var project_id = await db.query(query);
    var project_id = project_id.rows[0].project_id;
    folder_name = project_id;
    console.log("Project Id:", project_id);
    gallery_prefix = pro_name + "_" + pro_area;
    console.log("gallery_prefix: ", gallery_prefix);

    var query = "Insert Into project_address Values('" + project_id + "','" + pro_add + "')";
    //console.log(query)
    await db.query(query);

    for (phase in pro_phase) {
      for (conf in pro_config) {
        if (pro_config[conf].includes(pro_phase[phase])) {
          var conf_x = pro_config[conf].split(":");
          var index = pro_config.indexOf(pro_config[conf]);
          if (posession_date[phase] == "") {
            posession_date[phase] = new Date().toISOString().split("T")[0];
          }
          console.log(project_id + " --- " + pro_phase[phase] + " --- " + conf_x[1] + " --- " + pro_price_start[index] + "lakhs to " + pro_price_end[index] + "lakhs --- " + posession_date[phase] + "---" + construction_status[phase]);
          var project_price = pro_price_start[index] + " ₹ to " + pro_price_end[index] + " ₹";
          var query = "Insert Into project_configuration Values('" + project_id + "','" + pro_phase[phase] + "','" + conf_x[1] + "','" + project_price + "','" + posession_date[phase] + "','" + pro_price_start[index] + "','" + pro_price_end[index] + "','" + construction_status[phase] + "','')";
          await db.query(query);
        }
      }
    }

    for (Amenities_item in Amenities) {
      //console.log("Amenities_item: ",Amenities[Amenities_item]);
      var query = "Insert Into project_amenities Values('" + project_id + "','" + Amenities[Amenities_item] + "')";
      await db.query(query);
    }

    var query = "Insert Into project_rating Values('" + project_id + "','0','0','0','0','0','0')";
    await db.query(query);

    res.redirect(backend_url + '/management/create_project_transaction?prefix=' + gallery_prefix);
  }

});

router.get("/create_project_transaction/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/create_project_transaction.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/create_project_transaction.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/create_project_transaction/", async function (req, res) {
  if (req.session.admin) {
    //console.log("xxxxxxxx",req.body);
    var year = req.body.yearpicker;
    var District = req.body.District;
    var Tahsil = req.body.Tahsil;
    var Village = req.body.Village;
    var Property_No = req.body.Property_No;
    var prefix = req.body.prefix;
    var property_name_in_marathi = req.body.Marathi_Name;
    var rest_of_maharastra = req.body.rest_of_maharastra;
    var query = "Insert Into project_property_transaction Values('" + folder_name + "','" + year + "','" + District + "','" + Tahsil + "','" + Village + "','" + Property_No + "','" + property_name_in_marathi + "','" + rest_of_maharastra + "')";
    await db.query(query);
    res.redirect(backend_url + '/management/coverPic_upload?prefix=' + prefix);
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.get("/coverPic_upload/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/upload_cover_pic.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/upload_cover_pic.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post('/coverPic_upload', upload.fields([{ name: 'cover_pic' },
{ name: 'blogimage', maxCount: 15 }, { name: 'floorimage', maxCount: 15 }]),
  async function (req, res, next) {
    //var cover_img_length = req.files.cover_pic.length;
    var cover_img_location = req.files.cover_pic[0].location;
    // console.log("cover_img_length: ",cover_img_length);
    // console.log("cover_img_location: ",cover_img_location);
    // console.log("Cover Image Uploaded: ",folder_name); 
    var query = "Insert Into project_media Values('" + folder_name + "','" + cover_img_location + "','Management','cover image','N/A')";
    await db.query(query);

    var gallery_image_count = req.files.blogimage.length;
    //console.log("gallery_image_count: ",gallery_image_count);

    for (i = 0; i < gallery_image_count; i++) {
      var media_link = req.files.blogimage[i].location;
      // var gallery_text = req.body.gallery_text[i];
      // console.log("gallery_link: ",media_link);
      // console.log("gallery_text: ",gallery_text);
      var query = "Insert Into project_media Values('" + folder_name + "','" + media_link + "','Management','gallery image','N/A')";
      await db.query(query);
    }

    var floor_image_count = req.files.floorimage.length;
    //console.log("floor_image_count: ",floor_image_count);

    for (i = 0; i < floor_image_count; i++) {
      var media_link = req.files.floorimage[i].location;
      var query = "Insert Into project_media Values('" + folder_name + "','" + media_link + "','Management','floor image','N/A')";
      await db.query(query);
    }

    res.sendFile(__basedir + '/html_template/success.html');

  })


router.get("/edit_project/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/edit_project.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    console.log("access_denied");
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/edit_project.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/edit_project/", async function (req, res) {
  if (req.session.admin) {
    var project_name = req.body.pro_name.split(" - ")[0];
    var query = "select project_id from project_details where project_name='" + project_name + "'";
    const results = await db.query(query);
    var project_id = results.rows[0].project_id;
    console.log("Product Id Taken for Edit Project: ", project_id);
    res.redirect(backend_url + '/management/edit_project_phase2?project_id=' + project_id);
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.get("/edit_project_phase2/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/edit_project_phase2.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/edit_project_phase2.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


router.get("/approve_project/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/approve_project.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/approve_project.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/fetch_unapproved_projects/", async function (req, res) {
  var query = "select * from project_details where status='unapproved'";
  const results = await db.query(query);
  return res.json(results.rows);
});

router.get("/approve_project_id/:id", async function (req, res) {
  var project_id = req.params.id;
  try {
    var query = "UPDATE project_details SET status= 'approved' WHERE project_id='" + project_id + "'";
    await db.query(query);
    console.log("Project id", project_id, " is now approved");
  } catch (err) {
    console.log("ERROR", err);
  }
  res.redirect(backend_url + '/management/approve_project');
});

router.post("/unapproved_project_info/", async function (req, res) {
  var project_id = req.body.project_id;
  //console.log("xxxxxxx",project_id)
  try {
    var query = "select pd.project_id, pd.project_name, pd.city, pd.state, pd.area, \
    pd.sub_area, pd.property_type, pd.construction_status, pd.developer_email, \
    pd.developer_name, pd.developer_phone_no, pd.developer_entity, pd.brand, pd.google_map_link, \
    pd.rera_no, pd.possession_date_as_rera, pa.address, pd.no_of_buildings, \
    pd.brief_dics, pd.status from project_details pd  \
    LEFT JOIN project_address pa ON pd.project_id = pa.project_id \
    where pd.project_id = '"+ project_id + "'";
    var results = await db.query(query);
    return res.json(results.rows);
  }
  catch (err) {
    console.log("ERROR", err);
  }
});

router.post("/unapproved_project_amenities/", async function (req, res) {
  var project_id = req.body.project_id;
  //console.log("xxxxxxx",project_id)
  try {
    var query = "select pa.project_id, pa.amenities_type \
    from project_amenities pa where pa.project_id = '"+ project_id + "'";
    var results = await db.query(query);
    return res.json(results.rows);
  }
  catch (err) {
    console.log("ERROR", err);
  }
});

router.post("/unapproved_project_config/", async function (req, res) {
  var project_id = req.body.project_id;
  //console.log("xxxxxxx",project_id)
  try {
    var query = "select pc.project_id, pc.project_phase, pc.configuration, pc.price_range, \
    pc.possesion_date from project_configuration pc where pc.project_id = '"+ project_id + "'";
    var results = await db.query(query);
    return res.json(results.rows);
  }
  catch (err) {
    console.log("ERROR", err);
  }
});

router.post("/count_unapproved_project/", async function (req, res) {
  try {
    var query = "select count(project_id) from project_details where status != 'approved'";
    var results = await db.query(query);
    return res.json(results.rows);
  }
  catch (err) {
    console.log("ERROR", err);
  }
});

router.post("/count_unapproved_review/", async function (req, res) {
  try {
    var query = "select count(review_id) from project_review where status != 'approved' and status !='rejected'";
    var results = await db.query(query);
    return res.json(results.rows);
  }
  catch (err) {
    console.log("ERROR", err);
  }
});

router.post("/count_unapproved_location_review/", async function (req, res) {
  try {
    var query = "select count(location_review_id) from project_location_review where status != 'approved' and status !='rejected'";
    var results = await db.query(query);
    return res.json(results.rows);
  }
  catch (err) {
    console.log("ERROR", err);
  }
});

router.post("/count_reported_review/", async function (req, res) {
  try {
    var query = "select count(rr.project_id) from report_review rr \
    Inner Join project_details pd ON pd.project_id = rr.project_id \
    Inner Join project_review pr ON pr.review_id = rr.review_id  \
    where rr.status != 'solved'";
    var results = await db.query(query);
    return res.json(results.rows);
  }
  catch (err) {
    console.log("ERROR", err);
  }
});

router.get("/approve_review/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/approve_review.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/approve_review.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/fetch_unapproved_reviews", async function (req, res) {
  if (req.session.admin) {
    var json_string = '';
    var query = "select pd.project_name, vu.email as reviewer_email , pr.reviewer_name,  pr.email_varified, \
    pr.reviewer_type, pr.review_title, pr.review, pr.review_date, pr.review_time, pr.review_id \
    from project_review pr Inner join project_details pd  \
    ON pd.project_id = pr.project_id \
    Inner join visitor_user vu ON vu.userid = pr.reviewer_id  \
    where pr.status != 'approved' AND pr.status != 'rejected' Order by pr.review_time desc";
    var results = await db.query(query);
    for (items in results.rows) {
      //console.log("Record:", results.rows[items]);
      var record = JSON.stringify(results.rows[items]).replace("{", "").replace("}", "");
      var review_id = results.rows[items].review_id;
      var select_query = "select media_title, media_link from project_review_media where review_id = '" + review_id + "'"
      var sel_result = await db.query(select_query);
      //console.log("Record Media:", sel_result.rows);
      var media_record = JSON.stringify(sel_result.rows);
      if (json_string == '') {
        json_string = "{" + record + ', "media_files":' + media_record + "}";
      }
      else {
        json_string = json_string + "," + "{" + record + ', "media_files":' + media_record + "}";
      }
    }
    json_string = "[" + json_string + "]";
    //console.log("JSON:", json_string);
    return res.json(JSON.parse(json_string));
  }
  else {
    res.json({});
  }
});

router.get("/approve_review_id/:id", async function (req, res) {
  if (req.session.admin) {
    var review_id = req.params.id;
    try {
      var query = "select pd.project_name, vu.email, pr.review from visitor_user vu \
      LEFT Join project_review pr On vu.userid = pr.reviewer_id \
      Left Join project_details pd ON pd.project_id = pr.project_id \
      where pr.review_id = '"+ review_id + "' LIMIT 1";
      var result = await db.query(query);
      var reviewer_email = result.rows[0].email;
      var review = result.rows[0].review;
      var project_name = result.rows[0].project_name;

      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: reviewer_email,
        from: 'propviewz@goldenabodes.com',
        subject: 'Your Review Is Approved By Propviewz',
        html: "<br><p>Propviewz has approved review submitted by you for the `" + project_name + "`, \
        it is now visible on propviewz site. Keep posting your review of properties on propviewz.</p><br>\
        <img src='https://www.propviewz.com/static/media/logo_white.56d6648f.png' width='200px'><br>\
        'We help, you decide.'<br>\
        <p> Thanks, Propviewz team </p>",

      }
      sgMail.send(msg)

      var query = "UPDATE project_review SET status= 'approved' WHERE review_id='" + review_id + "'";
      await db.query(query);
      console.log("Review Id ", review_id, " is now approved.");
    } catch (err) {
      console.log("ERROR", err);
    }
    res.redirect(backend_url + '/management/approve_review');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.get("/reject_review/:id", async function (req, res) {
  if (req.session.admin) {
    var review_id = req.params.id;
    try {
      var query = "select vu.email, pr.review from visitor_user vu LEFT Join project_review pr On vu.userid = pr.reviewer_id\
      where pr.review_id = '"+ review_id + "' LIMIT 1";
      var result = await db.query(query);
      var reviewer_email = result.rows[0].email;
      var review = result.rows[0].review;
      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: reviewer_email,
        from: 'propviewz@goldenabodes.com',
        subject: 'Your Review Is Rejected By Propviewz',
        html: "<br><p>Propviewz team has rejected review ( '" + review + "' ) submitted by you because it is not appropriate as per our policy.</p><br>\
        <img src='https://www.propviewz.com/static/media/logo_white.56d6648f.png' width='200px'><br>\
        'We help, you decide.'<br>\
        <p> Thanks, Propviewz team </p>",
      }
      sgMail.send(msg)
      // var query = "delete from project_review_media where review_id = '"+review_id+"'";
      // await db.query(query);
      var query = "UPDATE project_review SET status = 'rejected' WHERE review_id='" + review_id + "'";
      await db.query(query);
      console.log("Review Id ", review_id, " is now Rejected.");
    } catch (err) {
      console.log("ERROR", err);
    }
    res.redirect(backend_url + '/management/approve_review');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.get("/approve_review_comment/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/approve_review_comment.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/approve_review_comment.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


router.post("/fetch_unapproved_reviews_comments/", async function (req, res) {
  var query = "select prc.comment, prc.email, prc.name, prc.review_id, prc.comment_id, prc.comment_date,\
  prc.comment_time, prc.status, pr.project_id, pd.project_name\
  from project_review_comment prc\
  Inner Join project_review pr ON pr.review_id = prc.review_id\
  Inner Join project_details pd ON pr.project_id = pd.project_id\
  where prc.status != 'approved' AND prc.status != 'rejected' ORDER BY prc.comment_time desc";
  var result = await db.query(query);
  res.json(result.rows);
});


router.get("/approve_Comment_id/:id", async function (req, res) {
  if (req.session.admin) {
    var comment_id = req.params.id;
    try {
      var query = "select email, review_id from project_review_comment where comment_id = '" + comment_id + "' LIMIT 1";
      var result = await db.query(query);
      var reviewer_email = result.rows[0].email;
      var review_id = result.rows[0].review_id;
      //console.log("review_id", review_id);

      var sel_query = "select pd.project_name from project_review pr \
      INNER JOIN project_details pd ON pr.project_id = pd.project_id  \
      where review_id = '"+ review_id + "' LIMIT 1";
      var sel_result = await db.query(sel_query);
      var project_name = sel_result.rows[0].project_name;
      //console.log("project_name", project_name);

      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: reviewer_email,
        from: 'propviewz@goldenabodes.com',
        subject: 'Your Comment Is Approved By Propviewz',
        html: "<br><p>Propviewz has approved comment submitted by you for the `" + project_name + "`, \
        it is now visible on propviewz site. Keep posting your review of properties on propviewz.</p><br>\
        <img src='https://www.propviewz.com/static/media/logo_white.56d6648f.png' width='200px'><br>\
        'We help, you decide.'<br>\
        <p> Thanks, Propviewz team </p>",

      }
      sgMail.send(msg)

      var query = "UPDATE project_review_comment SET status= 'approved' WHERE comment_id='" + comment_id + "'";
      await db.query(query);
      console.log("Comment Id ", comment_id, " is now approved.");
    } catch (err) {
      console.log("ERROR", err);
    }
    res.redirect(backend_url + '/management/approve_review_comment');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.get("/reject_Comment/:id", async function (req, res) {
  if (req.session.admin) {
    var comment_id = req.params.id;
    try {
      var query = "select email, comment from project_review_comment where comment_id = '" + comment_id + "' LIMIT 1";
      var result = await db.query(query);
      var reviewer_email = result.rows[0].email;
      var comment = result.rows[0].comment;

      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: reviewer_email,
        from: 'propviewz@goldenabodes.com',
        subject: 'Your Comment Is Rejected By Propviewz',
        html: "<br><p>Propviewz team has rejected Comment ( '" + comment + "' ) submitted by you because it is not appropriate as per our policy.</p><br>\
        <img src='https://www.propviewz.com/static/media/logo_white.56d6648f.png' width='200px'><br>\
        'We help, you decide.'<br>\
        <p> Thanks, Propviewz team </p>",
      }
      sgMail.send(msg)
      // var query = "delete from project_review_media where review_id = '"+review_id+"'";
      // await db.query(query);
      var query = "UPDATE project_review_comment SET status = 'rejected' WHERE comment_id='" + comment_id + "'";
      await db.query(query);
      console.log("Comment Id ", comment_id, " is now rejected.");
    } catch (err) {
      console.log("ERROR", err);
    }
    res.redirect(backend_url + '/management/approve_review_comment');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/fetch_unapproved_comments/", async function (req, res) {
  var query = "select Count(comment_id) from project_review_comment where status = 'unapproved'";
  var result = await db.query(query);
  res.json(result.rows);
});

router.post("/fetch_unapproved_project_user_photos/", async function (req, res) {
  var query = "select Count(project_id) from project_post_pictures where status = 'unapproved'";
  var result = await db.query(query);
  res.json(result.rows);
});

router.post("/fetch_unapproved_location_user_photos/", async function (req, res) {
  var query = "select Count(location_id) from project_post_location_pictures where status = 'unapproved'";
  var result = await db.query(query);
  res.json(result.rows);
});

router.post("/fetch_unapproved_location_review_comment/", async function (req, res) {
  var query = "select Count(comment_id) from project_location_review_comment where status = 'unapproved'";
  var result = await db.query(query);
  res.json(result.rows);
});

router.post("/fetch_unsolved_location_report/", async function (req, res) {
  var query = "select Count(report_id) from report_location_review where status = 'unsolved'";
  var result = await db.query(query);
  res.json(result.rows);
});

router.get("/create_role/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/create_role.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/create_role/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    // let hash = bcrypt.hashSync(password, 10);
    console.log(req.body);
    var email = req.body.email;
    var pass = req.body.pwd;
    var role = req.body.Role;
    var hash = bcrypt.hashSync(pass, 10);
    //console.log("XXXX:",hash);
    var query = "INSERT INTO public.management_login(email, password, role)\
    VALUES ('"+ email + "','" + hash + "','" + role + "')";
    await db.query(query);
    res.sendFile(__basedir + '/html_template/success.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


router.get("/approve_user_photo/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/approve_user_photo.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/approve_user_photo.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/fetch_unapproved_photos/", async function (req, res) {
  var query = "select ppp.project_id, ppp.comment, ppp.created_at, ppp.userid, vu.name, vu.email , ppp.post_media, ppp.post_id, ppp.project_name \
  from project_post_pictures ppp Left Join visitor_user vu ON vu.userid = ppp.userid  \
  where ppp.status != 'approved' ORDER BY post_id desc";
  var result = await db.query(query);
  res.json(result.rows);
});

router.post("/update_project_basic_info/", async function (req, res) {
  //console.log(req.body);
  var project_id = req.body.project_id;
  var disc = req.body.brief_dics.replace(/'/g, "''");
  var query = "UPDATE public.project_details SET project_name='" + req.body.project_name + "', \
  city='"+ req.body.project_city + "', area='" + req.body.project_area + "', sub_area='" + req.body.project_subarea + "', \
  property_type='"+ req.body.project_property_type + "', construction_status='" + req.body.project_construction_status + "', \
  developer_name='"+ req.body.project_developer_name + "', developer_phone_no='" + req.body.developer_phone_no + "', \
  brand='"+ req.body.Brand + "', google_map_link='" + req.body.google_map_link + "', rera_no='" + req.body.rera_no + "', rera_link='" + req.body.rera_link + "',\
  possession_date_as_rera='"+ req.body.possession_date_as_rera + "', brief_dics='" + disc + "', google_review_link='" + req.body.google_review_link + "' \
  WHERE project_id='"+ project_id + "'";
  await db.query(query);
  res.redirect(backend_url + '/management/edit_project_phase2?project_id=' + req.body.project_id + '&status=1');
});

router.get("/delete_amenities/", async function (req, res) {
  console.log("xxxxx", req.query);
  var project_id = req.query.project_id;
  var amenity = req.query.amenity;
  var query = "DELETE FROM project_amenities WHERE project_id ='" + project_id + "' \
  AND amenities_type ='"+ amenity + "'";
  await db.query(query);
  res.redirect(backend_url + '/management/edit_project_phase2?project_id=' + project_id + '&status=2');
});

router.post("/update_amenities/", async function (req, res) {
  console.log("xxxxx", req.body);
  var project_id = req.body.project_id;
  try {
    var amenity = req.body.Amenities;
    for (i = 0; i < amenity.length; i++) {
      //console.log(amenity[i]);
      var query = "SELECT * FROM project_amenities WHERE project_id='" + project_id + "' \
      And lower(amenities_type)=lower('"+ amenity[i] + "')";
      var result = await db.query(query);
      if (result.rows.length == 0) {
        var query = "INSERT INTO project_amenities(project_id, amenities_type)\
        VALUES ('"+ project_id + "', '" + amenity[i] + "')";
        await db.query(query);
      }
    }
  }
  catch (e) {
    console.log("Cannot read property 'length' of Amenityies");
  }
  res.redirect(backend_url + '/management/edit_project_phase2?project_id=' + project_id + '&status=3');

});

router.post("/delete_project_config/", async function (req, res) {
  console.log("xxxxx", req.body);
  var project_id = req.body.project_id;
  var project_phase = req.body.project_phase;
  var project_config = req.body.project_config;
  var query = "DELETE FROM project_configuration WHERE project_id ='" + project_id + "' \
  AND project_phase ='"+ project_phase + "' AND configuration ='" + project_config + "'";
  await db.query(query);
  res.redirect(backend_url + '/management/edit_project_phase2?project_id=' + project_id + '&status=4');
});

router.post("/update_project_config/", async function (req, res) {
  console.log("xxxxx", req.body);
  var project_id = req.body.project_id;
  var pro_phase = req.body.pro_phase;
  var pro_config = req.body.pro_config;
  var proj_start_price = req.body.pro_price_start.filter(Boolean);
  var construction_status = req.body.construction_status;
  console.log("dddddd", proj_start_price);
  var proj_end_price = req.body.pro_price_end.filter(Boolean)
  console.log("gggggg", proj_end_price);
  var posession_date = req.body.posession_date;
  if (posession_date == "") {
    posession_date = new Date().toISOString().split("T")[0];
  }

  for (conf in pro_config) {
    var conf_x = pro_config[conf];
    var index = pro_config.indexOf(pro_config[conf]);
    console.log(project_id + " --- " + pro_phase + " --- " + conf_x + " --- " + proj_start_price[index] + "lakhs to " + proj_end_price[index] + "lakhs --- " + posession_date + "---" + proj_start_price[index] + "----" + proj_end_price[index] + "---" + construction_status);
    var project_price = proj_start_price[index] + " ₹ to " + proj_end_price[index] + " ₹";
    var query = "Insert Into project_configuration Values('" + project_id + "','" + pro_phase + "','" + conf_x + "','" + project_price + "','" + posession_date + "','" + proj_start_price[index] + "','" + proj_end_price[index] + "','" + construction_status + "')";
    await db.query(query);
    res.redirect(backend_url + '/management/edit_project_phase2?project_id=' + project_id + '&status=5');
  }
});

router.get("/edit_project_transaction/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/edit_project_transaction.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/edit_project_transaction.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/edit_project_transaction/", async function (req, res) {
  //console.log(req.body);
  var project_id = req.body.project_id;
  res.redirect(backend_url + '/management/edit_project_transaction?project_id=' + project_id + '');
});

router.get("/delete_proj_transction/:id", async function (req, res) {
  //console.log(req.params.id);
  var project_id = req.params.id;
  var query = "delete from project_property_transaction where project_id='" + project_id + "'";
  await db.query(query);
  res.redirect(backend_url + '/management/edit_project_transaction?project_id=' + project_id + '');
});

router.post("/update_project_transaction/", async function (req, res) {
  if (req.session.admin) {
    //console.log("xxxxxxxx",req.body);
    var year = req.body.yearpicker;
    var District = req.body.District;
    var Tahsil = req.body.Tahsil;
    var Village = req.body.Village;
    var Property_No = req.body.Property_No;
    var property_name_in_marathi = req.body.Marathi_Name;
    var rest_of_maharastra = req.body.rest_of_maharastra;
    var project_id = req.body.Project_id;
    var query = "Insert Into project_property_transaction Values('" + project_id + "','" + year + "','" + District + "','" + Tahsil + "','" + Village + "','" + Property_No + "','" + property_name_in_marathi + "','" + rest_of_maharastra + "')";
    await db.query(query);
    res.redirect(backend_url + '/management/edit_project_phase2?project_id=' + project_id + '&status=6');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/edit_project_media/", async function (req, res) {
  //console.log(req.body);
  var project_id = req.body.project_id;
  res.redirect(backend_url + '/management/edit_project_media?project_id=' + project_id + '');
});

router.get("/edit_project_media/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/edit_project_media.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/edit_project_media.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.get("/get_project_cover_photo/:id", async function (req, res) {
  var project_id = req.params.id;
  var query = "select media_link from project_media where project_id ='" + project_id + "' And media_type = 'cover image'";
  var results = await db.query(query);
  return res.json(results.rows);
});

router.get("/get_project_gallery_photo/:id", async function (req, res) {
  var project_id = req.params.id;
  var query = "select media_link from project_media where project_id ='" + project_id + "' And media_type = 'gallery image'";
  var results = await db.query(query);
  return res.json(results.rows);
});

router.get("/get_project_floor_photo/:id", async function (req, res) {
  var project_id = req.params.id;
  var query = "select media_link from project_media where project_id ='" + project_id + "' And media_type = 'floor image'";
  var results = await db.query(query);
  return res.json(results.rows);
});

router.post("/delete_project_media/", async function (req, res) {
  var project_id = req.body.project_id;
  var media_link = req.body.media_link;
  var query = "delete from project_media where project_id ='" + project_id + "' And media_link = '" + media_link + "'";
  await db.query(query);
  res.redirect(backend_url + '/management/edit_project_media?project_id=' + project_id + '');
});

router.post('/Edit_cover_pic', upload.fields([{ name: 'cover_pic' }]), async function (req, res, next) {
  var project_id = req.body.project_id;
  var cover_img_location = req.files.cover_pic[0].location;
  var query = "Delete from project_media where project_id ='" + project_id + "' And media_type='cover image'";
  await db.query(query);
  var query = "Insert Into project_media Values('" + project_id + "','" + cover_img_location + "','Management','cover image','N/A')";
  await db.query(query);
  res.redirect(backend_url + '/management/edit_project_phase2?project_id=' + project_id + '&status=7');

})

router.post('/Edit_add_gallery_pic', upload.fields([{ name: 'blogimage', maxCount: 15 }]), async function (req, res, next) {
  // console.log("xxxxxxxxxxxxx",req.body);
  // console.log("yyyyyyyyyyyyy",req.files);
  var project_id = req.body.project_id;
  var gallery_image_count = req.files.blogimage.length;
  for (i = 0; i < gallery_image_count; i++) {
    var media_link = req.files.blogimage[i].location;
    var gallery_text = req.body.gallery_text[i];
    // console.log("gallery_link: ",media_link);
    // console.log("gallery_text: ",gallery_text);
    var query = "Insert Into project_media Values('" + project_id + "','" + media_link + "','Management','gallery image','" + gallery_text + "')";
    await db.query(query);
  }
  res.redirect(backend_url + '/management/edit_project_phase2?project_id=' + project_id + '&status=7');
})

router.post('/Edit_add_floor_pic', upload.fields([{ name: 'floor_image', maxCount: 15 }]), async function (req, res, next) {
  // console.log("xxxxxxxxxxxxx",req.body);
  // console.log("yyyyyyyyyyyyy",req.files);
  var project_id = req.body.project_id;
  var floor_image_count = req.files.floor_image.length;
  for (i = 0; i < floor_image_count; i++) {
    var media_link = req.files.floor_image[i].location;
    var floor_text = req.body.floor_text[i];
    // console.log("media_link: ",media_link);
    // console.log("floor_text: ",floor_text);
    var query = "Insert Into project_media Values('" + project_id + "','" + media_link + "','Management','floor image','" + floor_text + "')";
    //console.log("query: ",query);
    await db.query(query);
  }
  
  res.redirect(backend_url + '/management/edit_project_phase2?project_id=' + project_id + '&status=7');
})

router.post("/approve_user_photos/", async function (req, res) {
  // console.log(req.body);
  var project_id = req.body.projectid;
  var postid = req.body.postid;
  var reviewer_email = req.body.email;
  var query = "UPDATE project_post_pictures SET status='approved' \
  WHERE project_id='"+ project_id + "' AND post_id='" + postid + "'";
  await db.query(query);

  var sel_project_name = "select project_name from project_details where project_id ='" + project_id + "' LIMIT 1";
  var result_sel = await db.query(sel_project_name);
  var project_name = result_sel.rows[0].project_name;
  //console.log("project_name: ",project_name);

  try {
    sgMail.setApiKey(config_var.sendgrid_mail_key)
    const msg = {
      to: reviewer_email,
      from: 'propviewz@goldenabodes.com',
      subject: 'Your Photos Are Approved By Propviewz',
      html: "<br><p>Propviewz has approved the photos submitted by you for the project of '" + project_name + "' . It is now visible on our site.</p><br>\
      <img src='https://www.propviewz.com/static/media/logo_white.56d6648f.png' width='200px'><br>\
      'We help, you decide.'<br>\
      <p> Thanks, Propviewz team </p>",
    }
    sgMail.send(msg)
  }
  catch {
    console.log("Error in sending mail");
  }
  res.redirect(backend_url + '/management/approve_user_photo');
});


router.post("/delete_user_photos/", async function (req, res) {
  //console.log(req.body);
  var project_id = req.body.projectid;
  var postid = req.body.postid;
  var reviewer_email = req.body.email;
  var query = "delete from project_post_pictures \
  WHERE project_id='"+ project_id + "' AND post_id='" + postid + "'";
  await db.query(query);
  try {
    sgMail.setApiKey(config_var.sendgrid_mail_key)
    const msg = {
      to: reviewer_email,
      from: 'propviewz@goldenabodes.com',
      subject: 'Your Media Photo Is Rejected By Propviewz',
      html: "<br><p>We are here to inform you that our team is not approving your media photos. As we found it not appropriate for our site.</p><br>\
      <img src='https://www.propviewz.com/static/media/logo_white.56d6648f.png' width='200px'><br>\
      'We help, you decide.'<br>\
      <p> Thanks, Propviewz team </p>",
    }
    sgMail.send(msg)
  }
  catch {
    console.log("Error in sending mail");
  }
  res.redirect(backend_url + '/management/approve_user_photo');
});

router.get("/edit_project_location/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/edit_project_location.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/edit_project_location.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/fetch_location_list/", async function (req, res) {
  if (req.session.admin) {
    var query = "select location_id, area from project_location Order By area";
    var results = await db.query(query);
    return res.json(results.rows);
  }
  return res.json({ "Response": "Login Error" });
});

router.get("/edit_location_details/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/edit_location_details.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/edit_location_details.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/fetch_location_info/", async function (req, res) {
  if (req.session.admin) {
    var location_id = req.body.location_id;
    var query = "select location_id, area, location_disc, cover_img from project_location where location_id='" + location_id + "'";
    var results = await db.query(query);
    return res.json(results.rows);
  }
  return res.json({ "Response": "Login Error" });
});

router.post("/update_location_disc/", async function (req, res) {
  //console.log("---------------",req.body);
  var location_id = req.body.locationid;
  var new_dics = req.body.new_disc;
  new_dics = new_dics.replace(/'/g, "''");
  var query = "update project_location SET location_disc ='" + new_dics + "' where location_id='" + location_id + "'";
  console.log(query);
  await db.query(query);
  res.redirect(backend_url + "/management/edit_location_details?locationid=" + location_id + "&status=1");
});

var upload_location_poster = multer({
  storage: multerS3({
    s3: s3,
    bucket: config_var.AWS_bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, "Location_poster/" + Date.now() + file.originalname)
    }
  })
})

router.post("/update_location_cover_image/", upload_location_poster.fields([{ name: 'cover_pic' }]), async function (req, res) {
  var location_id = req.body.locationid;
  var file_path = req.files.cover_pic[0].location;
  var query = "update project_location SET cover_img ='" + file_path + "' where location_id='" + location_id + "'";
  await db.query(query);
  res.redirect(backend_url + "/management/edit_location_details?locationid=" + location_id + "&status=1");
});


router.get("/approve_location_review/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/approve_location_review.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/approve_location_review.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/fetch_unapproved_location_reviews", async function (req, res) {
  if (req.session.admin) {
    var json_string = '';
    var query = "select  vu.email, pl.area , plr.reviewer_name,  plr.reviewer_type, plr.review_date, \
    plr.location_review_id , plr.review_title, plr.review \
    from project_location_review plr \
    Inner join project_location pl  ON pl.location_id = plr.location_id   \
    Inner join visitor_user vu ON vu.userid = plr.reviewer_id  \
    where plr.status != 'approved' AND plr.status != 'rejected' ORDER BY plr.review_time desc";
    const results = await db.query(query);
    for (items in results.rows) {
      //console.log("Record:", results.rows[items]);
      var record = JSON.stringify(results.rows[items]).replace("{", "").replace("}", "");
      var location_review_id = results.rows[items].location_review_id;
      var select_query = "select post_title, media_link from project_location_review_media where location_review_id = '" + location_review_id + "'";
      var sel_result = await db.query(select_query);
      //console.log("Record Media:", sel_result.rows);
      var media_record = JSON.stringify(sel_result.rows);
      if (json_string == '') {
        json_string = "{" + record + ', "media_files":' + media_record + "}";
      }
      else {
        json_string = json_string + "," + "{" + record + ', "media_files":' + media_record + "}";
      }
    }
    json_string = "[" + json_string + "]";
    //console.log("JSON:",json_string);
    return res.json(JSON.parse(json_string));
  }
  else {
    res.json({});
  }
});

router.get("/approve_location_review_id/:id", async function (req, res) {
  if (req.session.admin) {
    var review_id = req.params.id;
    try {
      var query = "select vu.email, plr.review from visitor_user vu LEFT Join project_location_review plr On vu.userid = plr.reviewer_id\
      where plr.location_review_id = '"+ review_id + "' LIMIT 1";
      var result = await db.query(query);
      var reviewer_email = result.rows[0].email;
      var review = result.rows[0].review;

      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: reviewer_email,
        from: 'propviewz@goldenabodes.com',
        subject: 'Your Review Is Approved By Propviewz',
        html: "<br><p>Propviewz are here to inform you that our team is approving your Review ( '" + review + "' ) now it is been shown to our site.</p><br>\
        <img src='https://www.propviewz.com/static/media/logo_white.56d6648f.png' width='200px'><br>\
        'We help, you decide.'<br>\
        <p> Thanks, Propviewz team </p>",
      }
      sgMail.send(msg)

      var query = "UPDATE public.project_location_review SET status= 'approved' \
      WHERE location_review_id='"+ review_id + "'";
      await db.query(query);
      console.log("Location Review Id ", review_id, " is now approved.");
    } catch (err) {
      console.log("ERROR", err);
    }
    res.redirect(backend_url + '/management/approve_location_review');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.get("/reject_location_review/:id", async function (req, res) {
  if (req.session.admin) {
    var review_id = req.params.id;
    try {
      var query = "select vu.email, plr.review from visitor_user vu LEFT Join project_location_review plr On vu.userid = plr.reviewer_id\
      where plr.location_review_id = '"+ review_id + "' LIMIT 1";
      var result = await db.query(query);
      var reviewer_email = result.rows[0].email;
      var review = result.rows[0].review;
      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: reviewer_email,
        from: 'propviewz@goldenabodes.com',
        subject: 'Your Review Is Rejected By Propviewz',
        html: "<br><p>We are here to inform you that our team is not approving your Review ( '" + review + "' ). As we found it not appropriate for our site.</p><br>\
        <img src='https://www.propviewz.com/static/media/logo_white.56d6648f.png' width='200px'><br>\
        'We help, you decide.'<br>\
        <p> Thanks, Propviewz team </p>",
      }
      sgMail.send(msg)
      // var query = "delete from project_review_media where review_id = '"+review_id+"'";
      // await db.query(query);
      var query = "UPDATE public.project_location_review SET status= 'rejected' \
      WHERE location_review_id ='"+ review_id + "'";
      await db.query(query);
      console.log("Location Review Id ", review_id, " is now Rejected.");
    } catch (err) {
      console.log("ERROR", err);
    }
    res.redirect(backend_url + '/management/approve_location_review');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});




router.get("/approve_user_location_photo/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/approve_user_location_photo.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/approve_user_location_photo.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


router.post("/fetch_unapproved_user_location_photos", async function (req, res) {
  if (req.session.admin) {
    var query = "select pplp.location_id, pplp.location_name, pplp.userid, pplp.post_media, \
    pplp.status, pplp.post_id, pplp.post_time, pplp.post_title, vu.name, vu.email \
    from project_post_location_pictures pplp  \
    INNER JOIN visitor_user vu ON vu.userid = pplp.userid \
    where pplp.status != 'approved' AND pplp.status != 'rejected' order by pplp.post_time desc";
    const results = await db.query(query);
    return res.json(results.rows);
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/approve_user_location_photos/", async function (req, res) {
  var location_id = req.body.location_id;
  var post_id = req.body.post;
  var userid = req.body.userid;

  var sel_query = "select email from visitor_user where userid = '" + userid + "'"
  var result = await db.query(sel_query);
  var result_email = result.rows[0].email;

  var sel_query2 = "select area from project_location where location_id = '" + location_id + "'"
  var result2 = await db.query(sel_query2);
  var result_area = result2.rows[0].area;

  try {
    sgMail.setApiKey(config_var.sendgrid_mail_key)
    const msg = {
      to: result_email,
      from: 'propviewz@goldenabodes.com',
      subject: 'Your Photos Are Approved By Propviewz',
      html: "<br><p>Propviewz has approved the photos submitted by you for the location of '" + result_area + "' . It is now visible on our site.</p><br>\
      <img src='https://www.propviewz.com/static/media/logo_white.56d6648f.png' width='200px'><br>\
      'We help, you decide.'<br>\
      <p> Thanks, Propviewz team </p>",
    }
    sgMail.send(msg)
  }
  catch {
    console.log("Error in sending mail");
  }

  var query = "UPDATE project_post_location_pictures SET status='approved' \
  WHERE location_id='"+ location_id + "' AND post_id ='" + post_id + "'";
  await db.query(query);
  res.redirect(backend_url + '/management/approve_user_location_photo');
});


router.post("/delete_user_location_photos/", async function (req, res) {
  var location_id = req.body.location_id;
  var post_id = req.body.post;
  var userid = req.body.userid;

  var sel_query = "select email from visitor_user where userid = '" + userid + "'"
  var result = await db.query(sel_query);
  var result_email = result.rows[0].email;

  var sel_query2 = "select area from project_location where location_id = '" + location_id + "'"
  var result2 = await db.query(sel_query2);
  var result_area = result2.rows[0].area;

  try {
    sgMail.setApiKey(config_var.sendgrid_mail_key)
    const msg = {
      to: result_email,
      from: 'propviewz@goldenabodes.com',
      subject: 'Your Photos Are Rejected By Propviewz',
      html: "<br><p>We are here to inform you that our team is not approving your media photos. As we found it not appropriate for our site.</p><br>\
      <img src='https://www.propviewz.com/static/media/logo_white.56d6648f.png' width='200px'><br>\
      'We help, you decide.'<br>\
      <p> Thanks, Propviewz team </p>",
    }
    sgMail.send(msg)
  }
  catch {
    console.log("Error in sending mail");
  }

  var query = "UPDATE project_post_location_pictures SET status='rejected' \
  WHERE location_id='"+ location_id + "' AND post_id ='" + post_id + "'";
  await db.query(query);
  res.redirect(backend_url + '/management/approve_user_location_photo');
});


router.get("/fetch_reported_review/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/report_review.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/fetch_reported_review_unsolved/", async function (req, res) {
  var query = "SELECT rr.project_id, pd.project_name, rr.review_id, rr.reporter_name, rr.reporter_email,  \
  rr.report_issue, pr.review, rr.status, rr.created_at, rr.report_id FROM report_review  rr \
  Inner Join project_details pd ON pd.project_id = rr.project_id  \
  Inner Join project_review pr ON pr.review_id = rr.review_id   \
  where rr.status='unsolved' ORDER BY report_id desc";
  var results = await db.query(query);
  return res.json(results.rows);
});

router.get("/fetch_newsletter/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/fetch_newsletter.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/fetch_newsletter/", async function (req, res) {
  var query = "select distinct(user_email) from subscribe_user UNION ALL \
  select email as user_email from visitor_user where newsletter = 'true' ";
  var results = await db.query(query);
  return res.json(results.rows);
});

router.post("/fetch_newsletter_count/", async function (req, res) {
  var query = "select distinct(user_email) from subscribe_user UNION ALL \
  select email as user_email from visitor_user where newsletter = 'true' ";
  var results = await db.query(query);
  return res.json({ "Count": results.rowCount });
});


router.get("/solve_report/:id", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    var report_id = req.params.id;
    console.log("REPORT ID:", report_id);
    var query = "UPDATE public.report_review	SET status='solved'	WHERE report_id = '" + report_id + "'";
    await db.query(query);
    var sel_query = "select reporter_email from report_review WHERE report_id = '" + report_id + "' ";
    var result = await db.query(sel_query);
    var to = result.rows[0].reporter_email;
    console.log("XXX", result.rows[0].reporter_email)
    try {
      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: to,
        from: 'propviewz@goldenabodes.com',
        subject: 'Propviewz',
        html: '<html> <body>\
              <center>\
              <div style="background-color: #46423c;width: 500px;height: 307px;color: bisque;border-radius: 18px;padding-top: 52px;">\
              <h1>Reported Review Report</h1>\
              <p>Sorry! Our Team Haven`t Found Any Issue Reported by You. So, We Are Not Taking Any Action On That.<p/>\
              <p>Thanks for showing your concern. <p/>\
              <div>\
              </center>\
              </body></html>',
      }
      sgMail.send(msg)
    }
    catch {
      console.log("Error is send mail...")
    }
    res.redirect(backend_url + '/management/fetch_reported_review');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.get("/remove_reported_review/:id", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    var report_id = req.params.id;
    //console.log("REPORT ID:", report_id);
    var query = "UPDATE report_review SET status='solved'	WHERE report_id = '" + report_id + "'";
    await db.query(query);
    var sel_query = "select review_id, reporter_email from report_review WHERE report_id = '" + report_id + "' ";
    var result = await db.query(sel_query);
    var review_id = result.rows[0].review_id;
    //console.log("review_id:",review_id);
    var del_query1 = "Delete from project_review_media where review_id = '" + review_id + "' ";
    await db.query(del_query1);
    var del_query2 = "Delete from project_review_comment where review_id = '" + review_id + "' ";
    await db.query(del_query2);
    var del_query3 = "Delete from project_review where review_id = '" + review_id + "' ";
    await db.query(del_query3);
    var to = result.rows[0].reporter_email;
    try {
      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: to,
        from: 'propviewz@goldenabodes.com',
        subject: 'Propviewz- Review reported',
        html: '<html> <body>\
              <center>\
              <div style="background-color: #46423c;width: 500px;height: 307px;color: bisque;border-radius: 18px;padding-top: 52px;">\
              <h1>Propviewz- Review reported</h1>\
              <p>Hi! We have successfully removed the review Reported by You.<p/>\
              <p>Thanks for showing your concern. <p/><br>\
              <img src="https://www.propviewz.com/static/media/logo_white.56d6648f.png" width="200px"><br>\
              <p>We help, you decide.</p><br>\
              <p> Thanks, Propviewz team </p>\
              <div>\
              </center>\
              </body></html>',
      }
      sgMail.send(msg)
    }
    catch {
      console.log("Error is send mail...")
    }
    res.redirect(backend_url + '/management/fetch_reported_review');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


router.get("/upload_most_trending/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/upload_most_trending.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


router.get("/success_most_trending/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/success_most_trending.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


router.get("/bulk_upload_section/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/bulk_upload.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


router.get("/bulk_upload_failed/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/bulk_upload_failed.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.get("/bulk_upload_success/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/bulk_upload_success.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/contact_us_request/", async function (req, res) {
  //console.log(req.body);
  var name = req.body.user_name;
  var email = req.body.user_email;
  var number = req.body.user_contact_no;
  var query = req.body.user_query;
  try {
    sgMail.setApiKey(config_var.sendgrid_mail_key)
    const msg = {
      to: 'bd.pune@propertyanthem.com',
      from: 'propviewz@goldenabodes.com',
      subject: 'ContactUs Propviewz',
      html: '<html> <body>\
            <center>\
            <div style="background-color: darkgray; width: 500px;height: 307px;color: bisque;border-radius: 18px;padding-top: 52px;}">\
            <h1>Contact Query.</h1>\
            <p>Name: '+ name + '<p/>\
            <p>Email-Id: '+ email + '<p/>\
            <p>Phone Number: '+ number + '<p/>\
            <p>Query: '+ query + '<p/><br>\
            <img src="https://www.propviewz.com/be/images/propadvisor.png" width="200px"><br>\
            <p>We help, you decide.</p>\
            <p> Thanks, Propviewz team </p>\
            <div>\
            </center>\
            </body></html>',
    }
    sgMail.send(msg)
  }
  catch {
    console.log("Error is send mail...")
  }
  res.json({ "Response": "Success" });
});


// forget password function that takes valid email id and sends email to reset password.
router.post("/forget_password/", async function (req, res) {
  //console.log(req.body);
  var email = req.body.email;
  var query = "select * from visitor_user where email ='" + email + "'";
  var result = await db.query(query);
  //console.log("No.of rows selected",result.rowCount);
  if (result.rowCount == 1) {
    try {
      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: email,
        from: 'propviewz@goldenabodes.com',
        subject: 'Reset Password Propviewz',
        html: '<html> <body>\
              <center>\
              <div style="background-color: darkgray; width: 500px;height: 307px;color: bisque;border-radius: 18px;padding-top: 52px;}">\
              <h1>To Reset Your Password. Click The Link Below.</h1><br>\
              <a href="https://www.propviewz.com/ResetPassword/'+ email + '">Reset Password</a><br><br>\
              </center>\
              <img src="https://www.propviewz.com/be/images/propadvisor.png" width="200px"><br>\
              <p>We help, you decide.</p>\
              <p> Thanks, Propviewz team </p>\
              <div>\
              </body></html>',
      }
      sgMail.send(msg)
    }
    catch {
      console.log("Error is send mail...")
    }
    res.json({ "Response": "Success" });
  }
  else {
    res.json({ "Response": "Fail" });
  }
});


// Reset Password_functionality
router.post("/set_new_password/", async function (req, res) {
  //console.log(req.body);  
  var password = req.body.password;
  var email = req.body.email;
  //encry password
  let hash = bcrypt.hashSync(password, 10);
  console.log("Hash Password:", hash);

  var update_query = "UPDATE visitor_login SET password='" + hash + "'	WHERE email='" + email + "'";
  await db.query(update_query);
  return res.json({ "Response": "Success" });

});

router.get("/approve_location_review_comment/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/approve_location_review_comment.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/approve_location_review_comment.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.post("/fetch_unapproved_location_reviews_comments/", async function (req, res) {
  var query = "select plrc.comment_id, plrc.location_review_id, plrc.comment, plrc.email, plrc.name,\
  plrc.comment_date, plrc.comment_time, plrc.status, plr.location_id, pl.area\
  from project_location_review_comment plrc\
  Inner Join project_location_review plr ON plr.location_review_id = plrc.location_review_id\
  Inner Join project_location pl ON pl.location_id = plr.location_id\
  where plrc.status ='unapproved' order by plrc.comment_time desc";
  var results = await db.query(query);
  return res.json(results.rows);
});

router.get("/approve_location_Comment/:id", async function (req, res) {
  if (req.session.admin) {
    var comment_id = req.params.id;
    try {
      var query = "select * from project_location_review_comment where comment_id='" + comment_id + "'";
      var result = await db.query(query);
      var reviewer_email = result.rows[0].email;
      var comment = result.rows[0].comment;

      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: reviewer_email,
        from: 'propviewz@goldenabodes.com',
        subject: 'Your Comment Is Approved By Propviewz',
        html: "<br><p>Propviewz are here to inform you that our team is approving your Comment ( '" + comment + "' ) now it is been shown to our site.</p><br>\
        <img src='https://www.propviewz.com/static/media/logo_white.56d6648f.png' width='200px'><br>\
        'We help, you decide.'<br>\
        <p> Thanks, Propviewz team </p>",
      }
      sgMail.send(msg)

      var query = "UPDATE project_location_review_comment SET status= 'approved' \
      WHERE comment_id='"+ comment_id + "'";
      await db.query(query);
      console.log("Location comment Id ", comment_id, " is now approved.");
    } catch (err) {
      console.log("ERROR", err);
    }
    res.redirect(backend_url + '/management/approve_location_review_comment');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});

router.get("/reject_location_Comment/:id", async function (req, res) {
  if (req.session.admin) {
    var comment_id = req.params.id;
    try {
      var query = "select * from project_location_review_comment where comment_id='" + comment_id + "'";
      var result = await db.query(query);
      var reviewer_email = result.rows[0].email;
      var comment = result.rows[0].comment;

      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: reviewer_email,
        from: 'propviewz@goldenabodes.com',
        subject: 'Your Comment Is Rejected By Propviewz',
        html: "<br><p>We are here to inform you that our team is not approving your Comment ( '" + comment + "' ). As we found it not appropriate for our site.</p><br>\
        <img src='https://www.propviewz.com/static/media/logo_white.56d6648f.png' width='200px'><br>\
        'We help, you decide.'<br>\
        <p> Thanks, Propviewz team </p>",
      }
      sgMail.send(msg)
      // var query = "delete from project_review_media where review_id = '"+review_id+"'";
      // await db.query(query);
      var query = "UPDATE project_location_review_comment SET status= 'rejected' \
      WHERE comment_id ='"+ comment_id + "'";
      await db.query(query);
      console.log("Location comment Id ", comment_id, " is now Rejected.");
    } catch (err) {
      console.log("ERROR", err);
    }
    res.redirect(backend_url + '/management/approve_location_review_comment');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


router.get("/fetch_location_reported_review/", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    res.sendFile(__basedir + '/html_template/fetch_location_reported_review.html');
  }
  else if (req.session.admin && req.session.role == "Approval_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else if (req.session.admin && req.session.role == "Creator_Role") {
    res.sendFile(__basedir + '/html_template/access_denied.html');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


router.post("/fetch_location_reported_review/", async function (req, res) {
  var query = "select rlr.report_id, rlr.location_id, rlr.location_review_id,\
  rlr.reporter_name, rlr.reporter_email, rlr.report_issue,\
  rlr.status, rlr.created_at, pl.area, plr.review, plr.review_title\
  from report_location_review rlr\
  LEFT JOIN project_location pl ON pl.location_id = rlr.location_id\
  LEFT JOIN project_location_review plr ON plr.location_review_id = rlr.location_review_id\
  where rlr.status ='unsolved' order by rlr.created_at desc";
  var results = await db.query(query);
  return res.json(results.rows);
});


router.get("/discard_location_review_report/:id", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    var report_id = req.params.id;
    console.log("REPORT ID:", report_id);
    var query = "UPDATE report_location_review	SET status='solved'	WHERE report_id = '" + report_id + "'";
    await db.query(query);
    var sel_query = "select reporter_email from report_location_review WHERE report_id = '" + report_id + "' ";
    var result = await db.query(sel_query);
    var to = result.rows[0].reporter_email;
    console.log("XXX", result.rows[0].reporter_email)
    try {
      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: to,
        from: 'propviewz@goldenabodes.com',
        subject: 'Propviewz',
        html: '<html> <body>\
              <center>\
              <div style="background-color: #46423c;width: 500px;height: 307px;color: bisque;border-radius: 18px;padding-top: 52px;">\
              <h1>Reported Review Report</h1>\
              <p>Sorry! Our Team Haven`t Found Any Issue Reported by You. So, We Are Not Taking Any Action On That.<p/>\
              <p>Thanks for showing your concern. <p/>\
              <div>\
              </center>\
              </body></html>',
      }
      sgMail.send(msg)
    }
    catch {
      console.log("Error is send mail...")
    }
    res.redirect(backend_url + '/management/fetch_location_reported_review');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


router.get("/remove_location_reported_review/:id", async function (req, res) {
  if (req.session.admin && req.session.role == "Super_Admin") {
    var report_id = req.params.id;
    //console.log("REPORT ID:", report_id);
    var query = "UPDATE report_location_review SET status='solved'	WHERE report_id = '" + report_id + "'";
    await db.query(query);
    var sel_query = "select location_review_id, reporter_email from report_location_review WHERE report_id = '" + report_id + "' ";
    var result = await db.query(sel_query);
    var location_review_id = result.rows[0].location_review_id;
    //console.log("review_id:",review_id);

    var del_query1 = "Delete from project_location_review_media where location_review_id = '" + location_review_id + "' ";
    await db.query(del_query1);
    var del_query2 = "Delete from project_location_review_comment where location_review_id = '" + location_review_id + "' ";
    await db.query(del_query2);
    var del_query3 = "Delete from project_location_review where location_review_id = '" + location_review_id + "' ";
    await db.query(del_query3);

    var to = result.rows[0].reporter_email;
    try {
      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: to,
        from: 'propviewz@goldenabodes.com',
        subject: 'Propviewz- Review reported',
        html: '<html> <body>\
              <center>\
              <div style="background-color: #46423c;width: 500px;height: 307px;color: bisque;border-radius: 18px;padding-top: 52px;">\
              <h1>Propviewz- Review reported</h1>\
              <p>Hi! We have successfully removed the review Reported by You.<p/>\
              <p>Thanks for showing your concern. <p/><br>\
              <img src="https://www.propviewz.com/static/media/logo_white.56d6648f.png" width="200px"><br>\
              <p>We help, you decide.</p><br>\
              <p> Thanks, Propviewz team </p>\
              <div>\
              </center>\
              </body></html>',
      }
      sgMail.send(msg)
    }
    catch {
      console.log("Error is send mail...")
    }
    res.redirect(backend_url + '/management/fetch_location_reported_review');
  }
  else {
    res.redirect(backend_url + '/admin');
  }
});


module.exports = router;

