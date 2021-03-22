const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../config/db');
const config_var = require('../config/config_var');

//router.get('/login/linkedin', passport.authenticate('linkedin'));
router.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_liteprofile'],
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/success',async (req, res, next) => {
  console.log('++++++++++++++++++INSIDE SUCCESS+++++++++++++++++++++');
  try{
    console.log('got+++++++++++++++++++++++++++++++++++++++');
    console.log("=========================Start request++++++++++++++++++++");
    console.log(req);
    console.log("=========================End request++++++++++++++++++++");
    const { user } = req;
    console.log("=========================User:++++++++++++++++++++",user);
    const Name = user.displayName
    console.log("=========================Name++++++++++++++++++++",Name);
    const Email = user.emails[0].value
    console.log("=========================Email++++++++++++++++++++",Email);
    const Pic = user.photos[0].value
    console.log("=========================Pic++++++++++++++++++++",Pic);
    const login_type = "Linkedin"
    const value = Name.concat("+").concat(Email)
    console.log("=========================Value++++++++++++++++++++",value);
    res.redirect(config_var.frontend_url+'/LinkedInRedirect/'+value);
    //res.redirect('/LinkedInRedirect/'+value);
  }catch{
    console.log('Fail+++++++++++++++++++++++++++++++++++++++');
    res.redirect('/fail');
  }
});

router.get('/fail', (req, res, next) => {
  console.log('fail+++++++++++++++++++++++++++++++++++++++');
  res.redirect('/login/linkedin');
});

router.get('/auth/linkedin/callback/', 
  passport.authenticate('linkedin', { failureRedirect: '/ld/fail', successRedirect: '/ld/success' }),
  (req, res, next) => {
    // res.redirect('/');
});

router.post("/ld_login", async function(req, res){
  var id =  req.body.id;
  var name =  req.body.name;
  var login_type =  "Linkedin";

  console.log(id,name,login_type);
  query = "select email from visitor_login where lower(email) =lower('"+id+"')";
  const results = await db.query(query);

  if(results.rows.length == 1)
  {
    console.log("User ld Email Login successful");
    var query1 = "UPDATE visitor_user SET updatedat = NOW() WHERE lower(email) =lower('"+id+"') RETURNING updatedat";
    var update_query = await db.query(query1);
    console.log(update_query.rows.length);

    return res.json({"Response": "Success", "ValidEmail":results.rows[0].email,"Name": name ,"Type":'Existed'});
  } 
  else 
  {
    console.log("User Email Login failed");
    var query1 = "Insert Into visitor_login (email,login_type) \
    Values('"+id+"','"+login_type+"') RETURNING email";

    var insert_res = await db.query(query1);
    console.log('insert login user result',insert_res.rows.length);
    
    var query2 = "Insert Into visitor_user (name,email) \
    Values('"+name+"','"+id+"') RETURNING userid";

    userid = await db.query(query2);
    console.log("user id:",userid.rows[0].userid);

    return res.json({"Response":"Fail", "ValidEmail":id,"Name": name ,"Type":'New User'});
  } 
  });

module.exports = router;