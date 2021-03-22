
// calling express package
const express = require("express");
// calling Express Routes 
const router = express.Router();
// Import all the functions for realstate projects
const realstate_project_fun = require("../realstate_projects/project_functions");
// fs for reading Json file
const fs = require('fs');
const db = require("../config/db");


// Fetch All the Projects form Database For The Home Page View
router.get("/projects", function (req, res) {
  try {
    var result = realstate_project_fun.viewProjects(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that Fetch City Location
router.get("/project_city/", async function (req, res) {
  try {
    var result = realstate_project_fun.project_city(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch All the Projects Based On Location form Database For The Home Page View
router.get("/geo_location_projects/:city", function (req, res) {
  try {
    var result = realstate_project_fun.geo_location_projects(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch All the Recent Launched Projects Based On Location form Database For The Home Page View
router.get("/recent_launched_geo_location_projects/:city", function (req, res) {
  try {
    var result = realstate_project_fun.recent_launched_geo_location_projects(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch All the Most Trending Projects Based On Location form Database For The Home Page View
router.get("/most_trending_geo_location_projects/:city", function (req, res) {
  console.log("most_trending_geo_location_projects");
  try {
    var result = realstate_project_fun.most_trending_geo_location_projects(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch all the media avilable for the requested project id
router.get("/project_media/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.projectMedia(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch all the media avilable for the requested project id
router.get("/location_media/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.location_media(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch all the Project details avilable for the requested project id
router.get("/project_details/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.projectDetails(req, res)
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch all the Project review avilable for the requested project id
router.get("/project_review/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.projectReview(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch Project cofiguration avilable for the requested project id
router.get("/project_config/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.projectConfig(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch all the Suggested RealState Project avilable for the requested project id
router.get("/suggested_project/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.projectSuggested(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch Project Transaction avilable for the requested project id
router.get("/project_transaction/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.projectTransaction(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch Project Transaction avilable for the requested project id
router.get("/projectTransaction_new/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.projectTransaction_new(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch all the review information avilable for the requested review id
router.get("/review_info/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.review_info(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch all the location review information avilable for the requested review id
router.get("/location_review_info/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.location_review_info(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch all the project Amenities avilable for the requested project id
router.get("/project_amenities/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.project_amenities(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch Developer Information avilable for the requested project id
router.get("/developer_info/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.developer_info(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Save the reported review information for the requested review id
router.post("/save_reported_review/", async function (req, res) {
  try {
    var result = realstate_project_fun.save_reported_review(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Save the location reported review information for the requested review id
router.post("/save_location_reported_review/", async function (req, res) {
  try {
    var result = realstate_project_fun.save_location_reported_review(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// fetch the project details for search on home page
router.post("/fetch_search", async function (req, res) {
  try {
    var result = realstate_project_fun.fetch_search(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});


// Save the new incremented value for helpfull reviews 
router.post("/helpful_review/", async function (req, res) {
  try {
    var result = realstate_project_fun.helpful_increment(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});


// Save the new incremented value for helpfull location reviews 
router.post("/helpful_location_review/", async function (req, res) {
  try {
    var result = realstate_project_fun.helpful_location_review(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// fetch all the voters emailid who clicked helpful
router.post("/fetch_helpful_voters/", async function (req, res) {
  try {
    var result = realstate_project_fun.fetch_helpful_voters(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// fetch all the voters emailid who clicked helpful for location
router.post("/fetch_location_helpful_voters/", async function (req, res) {
  try {
    var result = realstate_project_fun.fetch_location_helpful_voters(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// fetch the project name and location for edit project page
router.get("/fetch_project_name_and_location", async function (req, res) {
  try {
    var result = realstate_project_fun.fetch_project_name_and_location(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that Fetch Area Details for the location Page
router.get("/location_page_area_details/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.location_page_area_details(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that Fetch Projects Map Link for the location Page
router.get("/location_page_map_link/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.location_page_map_link(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that Fetch Location Review for the location Page
router.get("/location_page_location_review/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.location_page_location_review(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that Fetch Trending Projects for the location Page
router.get("/location_page_trending_projects/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.location_page_trending_projects(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that Fetch User Phothos for the Project Page
router.get("/fetch_user_photos/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.fetch_user_photos(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that Fetch User Phothos for the Project Page
router.post("/location_page_filter/", async function (req, res) {
  try {
    var result = realstate_project_fun.location_page_filter(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that Fetch Project transction
router.get("/get_project_transaction/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.get_project_transaction(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that Fetch Project transction
router.post("/update_user_profile/", async function (req, res) {
  try {
    var result = realstate_project_fun.update_user_profile(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that saves payment details 
router.post("/save_payment/", async function (req, res) {
  try {
    var result = realstate_project_fun.save_payment(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that saves Comment 
router.post("/save_comment/", async function (req, res) {
  try {
    var result = realstate_project_fun.save_comment(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});


// function that Saves location Review Comments 
router.post("/save_location_review_comment/", async function (req, res) {
  try {
    var result = realstate_project_fun.save_location_review_comment(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that fetch sub comments 
router.post("/fetch_sub_comments/", async function (req, res) {
  try {
    var result = realstate_project_fun.fetch_sub_comments(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that fetch location sub comments 
router.post("/fetch_location_sub_comments/", async function (req, res) {
  try {
    var result = realstate_project_fun.fetch_location_sub_comments(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that fetch user gallery media for location page 
router.get("/fetch_user_media_for_location_page/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.fetch_user_media_for_location_page(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// function that fetch management media for location page 
router.get("/fetch_management_media_for_location_page/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.fetch_management_media_for_location_page(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// verify non resigistered user with mail to show review.
router.get("/verify_unregis_user/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.verify_unregis_user(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// this function store the favorite project of the user
router.post("/save_favorite_project/", async function (req, res) {
  try {
    var result = realstate_project_fun.save_favorite_project(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// this function store user for subscribtion
router.post("/save_user_subscribe/", async function (req, res) {
  try {
    var result = realstate_project_fun.save_user_subscribe(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// this function checks if project id is maked as favorite by user
router.post("/check_favorite/", async function (req, res) {
  try {
    var result = realstate_project_fun.check_favorite(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// this function fetch project id is maked as favorite by user
router.post("/fetch_favorite_by_user/", async function (req, res) {
  try {
    var result = realstate_project_fun.fetch_favorite_by_user(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch All Publish Blog
router.get("/fetch_publish_blog/", async function (req, res) {
  try {
    var result = realstate_project_fun.fetch_publish_blog(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Fetch User Blog with BlogId
router.post("/fetch_blog_with_id/", async function (req, res) {
  try {
    var result = realstate_project_fun.fetch_blog_with_id(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// Delete User Blog with BlogId
router.post("/delete_blog_with_id/", async function (req, res) {
  try {
    var result = realstate_project_fun.delete_blog_with_id(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// this function fetch Delete favorite by user
router.post("/delete_favorite_by_user/", async function (req, res) {
  try {
    var result = realstate_project_fun.delete_favorite_by_user(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// get config variable for HTML
router.get("/Config_var/", async function (req, res) {

  try {
    var rawdata = fs.readFileSync(__basedir + "/config/Config_var.json");
    var proj_var = JSON.parse(rawdata);
    console.log("XXXXXXX", proj_var);
    return res.json(proj_var);
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});

// get config variable for HTML
router.get("/count_page_visit/:id", async function (req, res) {
  try {
    var result = realstate_project_fun.count_page_visit(req, res);
    return result;
  } catch (err) {
    return res.json({ "Status": "404" });
  }
});


module.exports = router;


