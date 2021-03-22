
var express = require('express');
var router = express.Router();
// calling of database file
const db = require("../config/db");
const config_var = require('../config/config_var');
const bcrypt = require('bcrypt');
const SendOtp = require('sendotp');

const AuthKey = config_var.MSG91_AuthKey;
const senderId = config_var.MSG91_senderId;

const sendOtp = new SendOtp(AuthKey);
sendOtp.setOtpExpiry('120');

const sgMail = require('@sendgrid/mail')

// email/number check
router.post("/", async function (req, res) {
  var id = req.body.id;
  // Regex for email 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //console.log(re.test(id));

  if (!re.test(id)) {
    console.log("Mobile Number Found for login");
    //console.log(id.length);

    if (id.match(/^-{0,1}\d+$/)) {
      //valid integer (positive or negative)
      var query = "select phone from visitor_user where phone ='" + id + "' Limit 1";
      const results = await db.query(query);
      var avai = results.rows.length;
      console.log("id===========", id);
      var phone_num = id;

      if (results.rows.length == 1) {
        console.log("number available redirect to login");
        return res.json({ "Response": "Success", "type": "phone", "ValidNumber": phone_num });
      }
      else {
        console.log("phone not available redirect to otp");
        sendOtp.send('91' + phone_num, senderId, function (error, data) {
          console.log("Message from Opt Provider: ", data);
          console.log("number============" + '91' + phone_num);
        });
        return res.json({ "Response": "Fail", "type": "phone", "ValidNumber": phone_num });
      }
    }
  }
  else {
    console.log("Email-id Found for login");
    var query = "select vl.email, vu.name from visitor_login vl \
       inner join visitor_user vu on vl.email = vu.email \
       where lower(vl.email)=lower('"+ id + "')";
    const results = await db.query(query);
    var avai = results.rows.length;

    if (results.rows.length == 1) {
      console.log("email available redirect to password");
      return res.json({ "Response": "Success", "type": "email", "ValidEmail": results.rows[0].email, "Name": results.rows[0].name });
      // res.redirect('');
    } else {
      console.log("email not available redirect to resigter");
      sgMail.setApiKey(config_var.sendgrid_mail_key)
      const msg = {
        to: id,
        from: 'propviewz@goldenabodes.com',
        subject: 'Propviewz Registration',
        text: 'Complete your Registration from here ...',
        html: '<html> <body>\
            <center>\
            <div style="background-color: #46423c;width: 400px;height: 307px;color: bisque;border-radius: 18px;padding-top: 52px;">\
            <p>Hi there! We are glad that you showed interest in our Website. Kindly Click on the below link to Register yourself on Propviewz<p/>\
            <p>We are providing you the registration link. <p/>\
            <h4><a href="https://www.propviewz.com/registration/'+ id + '" style="color: yellowgreen;">Click Here</a></h4>\
            <div>\
            </center>\
            </body></html>',
        //html: '<a href ="'+config_var.frontend_url+'/registration/'+id+'"> Registion link</a>',
      }
      sgMail.send(msg)
      return res.json({ "Response": "Fail" });
      // res.redirect('');   
    }
  }
});

// login Email
router.post("/email_login", async function (req, res) {
  console.log("hit============================");
  var id = req.body.id;
  var pass = req.body.pass;
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var query = '';
  try {
    if (!re.test(id)) {
      var sel_query = "select email from visitor_user where phone ='" + id + "'";
      var sel_results = await db.query(sel_query);
      console.log("xxxxx", sel_results.rowCount);
      if (sel_results.rowCount == 0) {
        return res.json({ "Response": "unregistered_phone" });
      }
      query = "select vu.name, vl.password, vl.email from visitor_login vl inner join \
        visitor_user vu on vl.email = vu.email \
        where vu.phone = '"+ id + "' limit 1";
    } else {
      var sel_query = "select email from visitor_login where lower(email) =lower('" + id + "')";
      var sel_results = await db.query(sel_query);
      console.log("xxxxx", sel_results.rowCount);
      if (sel_results.rowCount == 0) {
        return res.json({ "Response": "unregistered_email" });
      }
      query = "select vu.name, vl.password, vl.email from visitor_login vl inner join \
      visitor_user vu on vl.email = vu.email \
      where lower(vl.email) =lower('"+ id + "')";
    }
    // var query = "select password from visitor_login where lower(email) =lower('"+id+"')";
    const results = await db.query(query);
    console.log(results.rows);
    if (results.rows.length == 1 && results.rows[0].password != null) {
      var avai = results.rows[0].password;
      //check password 
      if (bcrypt.compareSync(pass, avai)) {
        // Passwords match
        if (results.rows.length == 1) {
          console.log("User Email Login successful");
          return res.json({ "Response": "Success", "ValidEmail": results.rows[0].email, "Name": results.rows[0].name });
          // res.redirect('');
        }
      } else {
        console.log("User Email Login failed");
        return res.json({ "Response": "Fail" });
      }
    }
    else {
      console.log("User Email Login failed");
      return res.json({ "Response": "Fail" });
    }
  }
  catch {
    console.log("Invalid_format");
    return res.json({ "Response": "invalid_format" });
  }



});

// login Phone Number
router.post("/phone_login", async function (req, res) {
  var phone = req.body.phoneNum;
  var otpToVerify = req.body.otp;
  //check otp To Verify 

  sendOtp.verify('91' + phone, otpToVerify, function (error, data) {
    console.log("Message from Opt Provider: ", data); // data object with keys 'message' and 'type'
    if (data.type == 'success') {
      return res.json({ "Response": "Success", "Validphone": phone });
    }
    if (data.type == 'error') {
      return res.json({ "Response": "Fail" })
    }
  });
});


// registration 
router.post("/registration", async function (req, res) {
  //console.log(req.body);  
  var name = req.body.name;
  var password = req.body.password;
  var con_password = req.body.con_password;
  var gender = req.body.gender;
  var mobile = req.body.mobile;
  var city = req.body.city;
  var dob = req.body.dob;
  var state = req.body.state;
  var email = req.body.email;
  var marital = req.body.marital;
  var terms = req.body.terms;
  var newsletter = req.body.newsletter;

  //encry password
  let hash = bcrypt.hashSync(password, 10);
  console.log(hash);
  // console.log(name +"\n"+ password +"\n"+ con_password + "\n"+ gender +"\n"+ mobile+"\n"+ city /
  //                 +"\n"+dob + "\n" + state +"\n"+email + "\n" + marital +"\n"+terms + "\n" + newsletter);

  if (password != con_password) {
    console.log("not match");
    return res.json("not match");

  } else {
    var userid = "";
    try {
      var del_query = "delete from visitor_user where email='" + email + "'";
      await db.query(del_query);

      var del_query = "delete from visitor_user where email='" + email + "'";
      await db.query(del_query);

      var query1 = "Insert Into visitor_login (email,password) \
      Values('"+ email + "','" + hash + "') RETURNING email";

      var email_res = await db.query(query1);
      console.log("email id:", email_res.rows[0].email);

      var query2 = "Insert Into visitor_user (name,gender,phone,city,dob,state_,email,marital,newsletter) \
      Values('"+ name + "','" + gender + "','" + mobile + "','" + city + "','" + dob + "',\
      '"+ state + "','" + email + "','" + marital + "','" + newsletter + "') RETURNING userid";

      userid = await db.query(query2);
      console.log("user id:", userid.rows[0].userid);
    } catch {
      console.log("user id:", userid);
    }
    if (userid == "") {
      return res.json({ "Response": "Fail" })
    } else {
      return res.json({ "Response": "Success", "ValidEmail": email, "Name": name });
    }
  }
});

router.post("/get_profile", async function (req, res) {

  var id = req.body.id;
  query = "SELECT vs.userid,vs.name, vs.gender,vs.dob, vs.email,vs.phone, vs.marital,vs.state_,vs.city, vl.password \
  FROM visitor_user vs inner join visitor_login vl on vl.email = vs.email \
  where lower(vs.email) =lower('"+ id + "') Limit 1";
  // var query = "select password from visitor_login where lower(email) =lower('"+id+"')";
  const results = await db.query(query);
  console.log(results.rows);
  if (results.rows.length == 1) {
    console.log("User Email Login successful");
    return res.json(results.rows);
    // res.redirect('');
  }
  else {
    console.log("User Email Login failed");
    return res.json({ "Response": "Fail" });
  }
});


router.post("/google_login", async function (req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var login_type = req.body.login_type;
  var pic = req.body.pic;

  console.log(id, name, login_type);
  query = "select email from visitor_login where lower(email) =lower('" + id + "')";
  const results = await db.query(query);

  if (results.rows.length == 1) {
    console.log("User google Email Login successful");
    query = "select email from visitor_user where lower(email) =lower('" + id + "')";
    const results_user = await db.query(query);
    //console.log("XXX", results_user.rowCount);
    if (results_user.rowCount == 0) {
      console.log("No info found in visitor user table");
      var query2 = "Insert Into visitor_user (name,email,profile_pic) \
      Values('"+ name + "','" + id + "','" + pic + "') RETURNING userid";
      var userid = await db.query(query2);
      console.log("user id:", userid.rows[0].userid);
      return res.json({ "Response": "Success", "ValidEmail": results.rows[0].email, "Name": name, "Type": 'Existed' });
    }
    else {
      var query1 = "UPDATE visitor_user SET updatedat = NOW() WHERE lower(email) =lower('" + id + "') RETURNING updatedat";
      var update_query = await db.query(query1);
      console.log('update query result', update_query.rows.length);
      return res.json({ "Response": "Success", "ValidEmail": results.rows[0].email, "Name": name, "Type": 'Existed' });
    }
  }
  else {
    console.log("User Email Login failed");
    var query1 = "Insert Into visitor_login (email,login_type) \
        Values('"+ id + "','" + login_type + "') RETURNING email";

    var insert_res = await db.query(query1);
    console.log('insert login user result', insert_res.rows.length);

    var query2 = "Insert Into visitor_user (name,email,profile_pic) \
        Values('"+ name + "','" + id + "','" + pic + "') RETURNING userid";

    userid = await db.query(query2);
    console.log("user id:", userid.rows[0].userid);

    return res.json({ "Response": "Fail", "ValidEmail": id, "Name": name, "Type": 'New User' });
  }
});



router.post("/fb_login", async function (req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var login_type = req.body.login_type;
  var pic = req.body.pic;

  console.log(id, name, login_type, pic);
  query = "select email from visitor_login where lower(email) =lower('" + id + "')";
  const results = await db.query(query);

  if (results.rows.length == 1) {
    console.log("User fb Email Login successful");
    var query1 = "UPDATE visitor_user SET updatedat = NOW() WHERE lower(email) =lower('" + id + "') RETURNING updatedat";
    var update_query = await db.query(query1);
    console.log(update_query.rows.length);

    return res.json({ "Response": "Success", "ValidEmail": results.rows[0].email, "Name": name, "Type": 'Existed' });
  }
  else {
    console.log("User Email Login failed");
    var query1 = "Insert Into visitor_login (email,login_type) \
      Values('"+ id + "','" + login_type + "') RETURNING email";

    var insert_res = await db.query(query1);
    console.log('insert login user result', insert_res.rows.length);

    var query2 = "Insert Into visitor_user (name,email,profile_pic) \
      Values('"+ name + "','" + id + "','" + pic + "') RETURNING userid";

    userid = await db.query(query2);
    console.log("user id:", userid.rows[0].userid);

    return res.json({ "Response": "Fail", "ValidEmail": id, "Name": name, "Type": 'New User' });
  }
});

router.post("/ld_login", async function (req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var login_type = req.body.login_type;

  console.log(id, name, login_type);
  query = "select email from visitor_login where lower(email) =lower('" + id + "')";
  const results = await db.query(query);

  if (results.rows.length == 1) {
    console.log("User ld Email Login successful");
    var query1 = "UPDATE visitor_user SET updatedat = NOW() WHERE lower(email) =lower('" + id + "') RETURNING updatedat";
    var update_query = await db.query(query1);
    console.log(update_query.rows.length);

    return res.json({ "Response": "Success", "ValidEmail": results.rows[0].email, "Name": name, "Type": 'Existed' });
  }
  else {
    console.log("User Email Login failed");
    var query1 = "Insert Into visitor_login (email,login_type) \
      Values('"+ id + "','" + login_type + "') RETURNING email";

    var insert_res = await db.query(query1);
    console.log('insert login user result', insert_res.rows.length);

    var query2 = "Insert Into visitor_user (name,email) \
      Values('"+ name + "','" + id + "') RETURNING userid";

    userid = await db.query(query2);
    console.log("user id:", userid.rows[0].userid);

    return res.json({ "Response": "Fail", "ValidEmail": id, "Name": name, "Type": 'New User' });
  }
});




// email/number check
router.post("/login_with_review/", async function (req, res) {

  var id = req.body.id;
  // Regex for email 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(re.test(id));

  if (!re.test(id)) {
    console.log("Mobile Number Found for login");
    //console.log(id.length);

    if (id.match(/^-{0,1}\d+$/)) {
      //valid integer (positive or negative)
      var query = "select phone from visitor_user where phone ='" + id + "' Limit 1";
      const results = await db.query(query);
      var avai = results.rows.length;
      console.log("id===========", id);
      var phone_num = id;

      if (results.rows.length == 1) {
        console.log("number available redirect to login");
        return res.json({ "Response": "Success", "type": "phone", "ValidNumber": phone_num });
      }
      else {
        console.log("phone not available redirect to otp");
        sendOtp.send('91' + phone_num, senderId, function (error, data) {
          console.log("Message from Opt Provider: ", data);
          console.log("number============" + '91' + phone_num);
        });
        return res.json({ "Response": "Fail", "type": "phone", "ValidNumber": phone_num });
      }
    }
  }
  else {
    console.log("Email-id Found for login");
    var query = "select vl.email, vu.name from visitor_login vl \
     inner join visitor_user vu on vl.email = vu.email \
     where lower(vl.email)=lower('"+ id + "')";
    const results = await db.query(query);
    var avai = results.rows.length;

    if (results.rows.length == 1) {
      console.log("email available redirect to password");
      return res.json({ "Response": "Success", "type": "email", "ValidEmail": results.rows[0].email, "Name": results.rows[0].name });
      // res.redirect('');
    } else {
      console.log("email not available ");
      return res.json({ "Response": "Fail" });
      //res.redirect('');   
    }
  }
});

module.exports = router;