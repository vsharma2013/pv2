
// calling express package
const express = require("express");
// calling Express Routes 
const router = express.Router();
// calling of database file
const db = require("../config/db");

const bcrypt = require("bcrypt");


router.get("/", async function (req, res) {
  var base_path = __basedir;
  res.sendFile(base_path + '/html_template/admin_login.html');
});

router.post("/", async function (req, res) {
  var query = "Select * from management_login where email='" + req.body.UserName + "'";
  const results = await db.query(query);
  //console.log("Role: ",results.rows[0].role);
  if (results.rows.length == 1) {
    if (await bcrypt.compare(req.body.Password, results.rows[0].password)) {
      req.session.admin = results.rows[0].email;
      req.session.role = results.rows[0].role;
      console.log("New Session is assigned for email as '" + results.rows[0].email + "' with Role: " + results.rows[0].role);
      //console.log("BACKEND:",backend_url);
      res.redirect(backend_url+'/management/show_dashboard');
    }
    else {
      res.redirect(backend_url+'/admin?message=Error');
    }
  }
  else {
    res.redirect(backend_url+'/admin?message=Error');
  }
});



// Logout Admin
router.get("/logout/", async function (req, res) {
  if (req.session.admin) {
    req.session.destroy(function (err) {
      console.log("SUPER ADMIN IS LOGED-OUT");
      res.redirect(backend_url + '/admin');
    })
  }
});

router.get("/project_details/:id", async function (request, response) {
  var project_id = request.params.id;
  var query = "select * from project_details where project_id = " + project_id + "";
  const results = await db.query(query);
  return response.json(results.rows);
});



module.exports = router;