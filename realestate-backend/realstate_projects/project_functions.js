
// calling of database file
const db = require("../config/db");
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const config_var = require('../config/config_var');
const { json } = require("body-parser");


// function that fetch all the projects
async function viewProjects(request, response) {
    var query = "Select pd.project_id, pd.project_name, pd.city, pd.area, \
    COALESCE(   \
    ROUND( \
    (   \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating = '1' and project_id = pd.project_id), 0) * 1) +   \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating = '2' and project_id = pd.project_id), 0) * 2) +   \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating = '3' and project_id = pd.project_id), 0) * 3) +   \
        (COALESCE((select Count(overall_rating) from project_review where overall_rating = '4' and project_id = pd.project_id), 0) * 4) +   \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating = '5' and project_id = pd.project_id), 0) * 5)  \
    :: decimal  \
    ) /COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
    ), 0    \
    ) as overall_rating,    \
    pd.construction_status, pm.media_link, \
    COALESCE(count(project_review.reviewer_name), 0) AS Reviews  \
    from project_details pd     \
    LEFT JOIN project_rating ON pd.project_id = project_rating.project_id   \
    LEFT JOIN project_review On pd.project_id = project_review.project_id    \
    LEFT JOIN project_media pm ON pd.project_id = pm.project_id     \
    where pm.media_type = 'cover image' AND pd.status = 'approved'    \
    GROUP BY pd.project_id, project_rating.overall_rating, pm.media_link";
    const results = await db.query(query);
    //console.log(results.rows);
    return response.json(results.rows);
}

// function that Fetch City Location
async function project_city(request, response) {
    var query = "select DISTINCT(city) from project_details";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that fetch all the projects
async function geo_location_projects(request, response) {
    var searching_city = request.params.city;
    var query = "Select pd.project_id, pd.project_name, pd.city, pd.area, \
    COALESCE(   \
    ROUND( \
    (   \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating = '1' and project_id = pd.project_id), 0) * 1) +  \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating = '2' and project_id = pd.project_id), 0) * 2) +  \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating = '3' and project_id = pd.project_id), 0) * 3) +  \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating = '4' and project_id = pd.project_id), 0) * 4) +  \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating = '5' and project_id = pd.project_id), 0) * 5)  \
    :: decimal  \
    ) /COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
    ), 0    \
    ) as overall_rating,    \
    pd.construction_status, pm.media_link, \
    COALESCE(count(project_review.reviewer_name),0) AS Reviews  \
    from project_details pd    \
    LEFT JOIN project_rating ON pd.project_id = project_rating.project_id  \
    LEFT JOIN project_review On pd.project_id = project_review.project_id \
    LEFT JOIN project_media pm ON pd.project_id = pm.project_id \
    where pm.media_type='cover image' AND pd.status = 'approved' AND lower(pd.city)=lower('"+ searching_city + "') \
    GROUP BY pd.project_id, project_rating.overall_rating, pm.media_link \
    order by overall_rating DESC";

    const results = await db.query(query);
    console.log("Count Of Project Found: ", results.rows.length);
    //return response.json(results.rows);

    if (results.rows.length != 0) {
        return response.json(results.rows);
    }
    else {
        var query = "Select pd.project_id, pd.project_name, pd.city, pd.area, \
        COALESCE(   \
        ROUND( \
        (   \
        (COALESCE((select Count(overall_rating) from project_review where overall_rating = '1' and project_id = pd.project_id), 0) * 1) +  \
        (COALESCE((select Count(overall_rating) from project_review where overall_rating = '2' and project_id = pd.project_id), 0) * 2) +  \
        (COALESCE((select Count(overall_rating) from project_review where overall_rating = '3' and project_id = pd.project_id), 0) * 3) +  \
        (COALESCE((select Count(overall_rating) from project_review where overall_rating = '4' and project_id = pd.project_id), 0) * 4) +  \
        (COALESCE((select Count(overall_rating) from project_review where overall_rating = '5' and project_id = pd.project_id), 0) * 5)  \
        :: decimal  \
        ) /COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
        ), 0    \
        ) as overall_rating,    \
        pd.construction_status, pm.media_link, \
        COALESCE(count(project_review.reviewer_name),0) AS Reviews  \
        from project_details pd    \
        LEFT JOIN project_rating ON pd.project_id = project_rating.project_id  \
        LEFT JOIN project_review On pd.project_id = project_review.project_id \
        LEFT JOIN project_media pm ON pd.project_id = pm.project_id \
        where pm.media_type='cover image' AND pd.status = 'approved'\
        GROUP BY pd.project_id, project_rating.overall_rating, pm.media_link \
        order by overall_rating DESC";

        const results = await db.query(query);
        console.log("Count Of Project Fetched When State Not Found: ", results.rows.length);
        return response.json(results.rows);
    }

}


// Fetch All the Recent Launched Projects Based On Location form Database For The Home Page View
async function recent_launched_geo_location_projects(request, response) {
    var searching_city = request.params.city;
    var query = "Select pd.project_id, pd.project_name, pd.city, pd.area, \
    COALESCE(   \
    ROUND(  \
    (   \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id=pd.project_id),0)*1)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id=pd.project_id),0)*2)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id=pd.project_id),0)*3)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id=pd.project_id),0)*4)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id=pd.project_id),0)*5)  \
    ::decimal \
    )/COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
    ),0 \
    ) as overall_rating, \
    pd.construction_status, pm.media_link,  \
    COALESCE(count(project_review.reviewer_name),0) AS Reviews  \
    from project_details pd   \
    LEFT JOIN project_rating ON pd.project_id = project_rating.project_id \
    LEFT JOIN project_review On pd.project_id = project_review.project_id \
    LEFT JOIN project_media pm ON pd.project_id = pm.project_id \
    where pm.media_type='cover image' AND pd.status = 'approved' AND \
    pd.construction_status = 'Under construction' AND lower(pd.city)=lower('"+ searching_city + "')  \
    GROUP BY pd.project_id, project_rating.overall_rating, pm.media_link ";

    const results = await db.query(query);
    console.log("Count Of Project Found: ", results.rows.length);
    //return response.json(results.rows);

    if (results.rows.length != 0) {
        return response.json(results.rows);
    }
    else {
        var query = "Select pd.project_id, pd.project_name, pd.city, pd.area, \
     COALESCE(count(project_rating.overall_rating),0) As overall_rating, \
     pd.construction_status, pm.media_link, \
     COALESCE(count(project_review.reviewer_name),0) AS Reviews \
     from project_details pd \
     LEFT JOIN project_rating ON pd.project_id = project_rating.project_id   \
     LEFT JOIN project_review On pd.project_id = project_review.project_id   \
     LEFT JOIN project_media pm ON pd.project_id = pm.project_id \
     where pm.media_type='cover image' AND pd.status = 'approved'    \
     GROUP BY pd.project_id, project_rating.overall_rating, pm.media_link";

        const results = await db.query(query);
        console.log("Count Of Project Fetched When State Not Found: ", results.rows.length);
        return response.json(results.rows);
    }

}


// Fetch All the Most Trending Projects Based On Location form Database For The Home Page View
async function most_trending_geo_location_projects(request, response) {
    var searching_city = request.params.city;
    var query = "Select pd.project_id, mtp.visit_count, pd.project_name, pd.city, pd.area, \
    COALESCE(  \
    ROUND(  \
    (   \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id=pd.project_id),0)*1)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id=pd.project_id),0)*2)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id=pd.project_id),0)*3)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id=pd.project_id),0)*4)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id=pd.project_id),0)*5)  \
    ::decimal \
    )/COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
    ),0 \
    ) as overall_rating  ,  \
    pd.construction_status, pm.media_link, \
    COALESCE(count(project_review.reviewer_name),0) AS Reviews  \
    from project_details pd   \
    LEFT JOIN project_rating ON pd.project_id = project_rating.project_id   \
    LEFT JOIN project_review On pd.project_id = project_review.project_id   \
    LEFT JOIN project_media pm ON pd.project_id = pm.project_id     \
    RIGHT JOIN most_trending_project mtp ON mtp.project_id = pd.project_id  \
    where pm.media_type='cover image' AND pd.status = 'approved' AND lower(pd.city)=lower('"+ searching_city + "')  \
    GROUP BY pd.project_id, project_rating.overall_rating, pm.media_link, mtp.visit_count \
    order by mtp.visit_count DESC Limit 10";
    const results = await db.query(query);
    console.log("Count Of Project Found: ", results.rows.length);
    //return response.json(results.rows);

    if (results.rows.length != 0) {
        return response.json(results.rows);
    }
    else {
        var query = "Select pd.project_id, pd.project_name, pd.city, pd.area, \
        COALESCE(count(project_rating.overall_rating),0) As overall_rating, \
        pd.construction_status, pm.media_link, \
        COALESCE(count(project_review.reviewer_name),0) AS Reviews \
        from project_details pd \
        LEFT JOIN project_rating ON pd.project_id = project_rating.project_id   \
        LEFT JOIN project_review On pd.project_id = project_review.project_id   \
        LEFT JOIN project_media pm ON pd.project_id = pm.project_id \
        where pm.media_type='cover image' AND pd.status = 'approved'    \
        GROUP BY pd.project_id, project_rating.overall_rating, pm.media_link LIMIT 10";

        const results = await db.query(query);
        console.log("Count Of Project Fetched When State Not Found: ", results.rows.length);
        return response.json(results.rows);
    }
}


// function that fetch media for the perticular project
async function projectMedia(request, response) {
    project_id = request.params.id;
    var query = "select * from project_media pm where pm.project_id = '" + project_id + "' \
    And media_type = 'cover image' ";
    const results1 = await db.query(query);
    var cover_img_data = JSON.stringify(results1.rows).replace("[", "").replace("]", "");
    //console.log(cover_img_data);

    var query = "select * from project_media pm where pm.project_id = '" + project_id + "' \
    And media_type = 'gallery image' ";
    const results2 = await db.query(query);
    var gallery_img_data = JSON.stringify(results2.rows).replace("[", "").replace("]", "");
    //console.log(gallery_img_data);

    var query = "select project_id,created_at, post_media as media_link, 'Visitor' as given_by, \
    'user image' as media_type, 'N/A' as comment \
    from project_post_pictures where project_id = '" + project_id + "' and status='approved'";
    const results3 = await db.query(query);
    var user_img_data = JSON.stringify(results3.rows).replace("[", "").replace("]", "");
    //console.log(user_img_data);

    var query = "select * from project_media pm where pm.project_id = '" + project_id + "' \
    And media_type = 'floor image' ";
    const results4 = await db.query(query);
    var floor_img_data = JSON.stringify(results4.rows).replace("[", "").replace("]", "");
    //console.log(floor_img_data);
    var json_string = '';

    if (gallery_img_data == '' && floor_img_data == '' && user_img_data == '') {
        json_string = "[" + cover_img_data + "]";
    }
    else if (gallery_img_data != '' && floor_img_data == '' && user_img_data == '') {
        json_string = "[" + cover_img_data + "," + gallery_img_data + "]";
    }
    else if (gallery_img_data != '' && floor_img_data == '' && user_img_data != '') {
        json_string = "[" + cover_img_data + "," + gallery_img_data + "," + user_img_data + "]";
    }
    else if (gallery_img_data == '' && floor_img_data != '' && user_img_data != '') {
        json_string = "[" + cover_img_data + "," + floor_img_data + "," + user_img_data + "]";
    }
    else if (gallery_img_data == '' && floor_img_data == '' && user_img_data != '') {
        json_string = "[" + cover_img_data + "," + user_img_data + "]";
    }
    else if (gallery_img_data == '' && floor_img_data != '' && user_img_data == '') {
        json_string = "[" + cover_img_data + "," + floor_img_data + "]";
    }
    else if (gallery_img_data != '' && floor_img_data != '' && user_img_data == '') {
        json_string = "[" + cover_img_data + "," + gallery_img_data + "," + floor_img_data + "]";
    }
    else {
        json_string = "[" + cover_img_data + "," + gallery_img_data + "," + user_img_data + "," + floor_img_data + "]";
    }
    //console.log(json_string);
    return response.json(JSON.parse(json_string));
}

// function that fetch media for the perticular location
async function location_media(request, response) {
    location_id = request.params.id;

    var query = "select cover_img as media_link, 'cover_image' AS media_type from project_location where location_id = '" + location_id + "' ";
    const results = await db.query(query);
    var cover_img_data = JSON.stringify(results.rows).replace("[", "").replace("]", "");
    //console.log(cover_img_data);

    var query = "select media_link, 'gallery_image' AS media_type from project_location_media where location_id = '" + location_id + "' ";
    const results1 = await db.query(query);
    var gallery_img_data = JSON.stringify(results1.rows).replace("[", "").replace("]", "");
    //console.log(gallery_img_data);

    var query = "select post_media as media_link, 'user_image' AS media_type from project_post_location_pictures where location_id = '" + location_id + "' \
    And status = 'approved' ";
    const results2 = await db.query(query);
    var user_img_data = JSON.stringify(results2.rows).replace("[", "").replace("]", "");
    //console.log(user_img_data);

    var json_string = '';

    if (cover_img_data != '' && gallery_img_data == '' && user_img_data == '') {
        json_string = "[" + cover_img_data + "]";
    }
    else if (cover_img_data != '' && gallery_img_data != '' && user_img_data == '') {
        json_string = "[" + cover_img_data + "," + gallery_img_data + "]";
    }
    else if (cover_img_data != '' && gallery_img_data != '' && user_img_data != '') {
        json_string = "[" + cover_img_data + "," + gallery_img_data + "," + user_img_data + "]";
    }
    else if (cover_img_data != '' && gallery_img_data == '' && user_img_data != '') {
        json_string = "[" + cover_img_data + "," + user_img_data + "]";
    }

    //console.log(json_string);
    return response.json(JSON.parse(json_string));
}

// function that fetch all the details of the perticular project
async function projectDetails(request, response) {
    var project_id = request.params.id;
    var query = "select pd.project_name, pd.location_id , pd.city, pd.area, pd.brief_dics, \
    pd.construction_status, pd.google_map_link, pd.rera_no, pd.rera_link, \
    ROUND(COALESCE(SUM(pr.location_rating)/Round(COALESCE((select count(review) from project_review where project_id='"+ project_id + "' \
    and reviewer_id != '0' HAVING COUNT(review) > 0),1),2),0),2) as location_points, \
    ROUND(COALESCE(SUM(pr.amenities_rating)/Round(COALESCE((select count(review) from project_review where project_id='"+ project_id + "' \
    and reviewer_id != '0' HAVING COUNT(review) > 0),1),2),0),2) as amenity_Points, \
    ROUND(COALESCE(SUM(pr.layout_planning_rating)/Round(COALESCE((select count(review) from project_review where project_id='"+ project_id + "' \
    and reviewer_id != '0' HAVING COUNT(review) > 0),1),2),0),2) as layout_rating,    \
    ROUND(COALESCE(SUM(pr.customer_service_rating)/Round(COALESCE((select count(review) from project_review where project_id='"+ project_id + "' \
    and reviewer_id != '0' HAVING COUNT(review) > 0),1),2),0),2) as customer_rating,    \
    ROUND(COALESCE(SUM(pr.vfm)/Round(COALESCE((select count(review) from project_review where project_id='"+ project_id + "' \
    and reviewer_id != '0' HAVING COUNT(review) > 0),1),2),0),2) as valueForMoney_rating,    \
    COALESCE(Count(pr.review),0) as total_review,   \
    COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id='"+ project_id + "'),0) as rating1_count,   \
    COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id='"+ project_id + "'),0) as rating2_count,   \
    COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id='"+ project_id + "'),0) as rating3_count,   \
    COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id='"+ project_id + "'),0) as rating4_count,   \
    COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id='"+ project_id + "'),0) as rating5_count,   \
    COALESCE(   \
    ROUND(  \
    (   \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id='"+ project_id + "'),0)*1)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id='"+ project_id + "'),0)*2)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id='"+ project_id + "'),0)*3)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id='"+ project_id + "'),0)*4)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id='"+ project_id + "'),0)*5)  \
    ::decimal \
    )/COALESCE((select Count(review) from project_review where project_id='"+ project_id + "' HAVING COUNT(review) > 1 ),1),2    \
    ),0 \
    ) as overall_rating      \
    from project_details pd  \
    LEFT JOIN project_review pr ON pd.project_id = pr.project_id \
    LEFT JOIN project_rating prate ON pd.project_id= prate.project_id   \
    where pd.project_id = '"+ project_id + "'   \
    GROUP BY pd.project_id, prate.rating1_count,  \
    prate.rating2_count, prate.rating3_count, prate.rating4_count, prate.rating5_count, prate.overall_rating";

    const results = await db.query(query);
    return response.json(results.rows);
}

// function to find out all the reviews of the perticular projects
async function projectReview(request, response) {
    project_id = request.params.id;
    var query = "select pr.review_id, pr.review_title, pr.review, pr.reviewer_type, pr.reviewer_name, \
    pr.overall_rating, vu.profile_pic, pr.review_date, pr.review_time, \
    Count(prm.review_id) as media_count, COALESCE((rh.helpful_count),0) as helpful_count,\
    Count(prc.comment) as comment_count \
    from project_review pr LEFT JOIN visitor_user vu ON pr.reviewer_id = vu.userid \
    Left Join project_review_media prm ON pr.review_id = prm.review_id \
    Left Join review_helpful rh ON pr.review_id = rh.review_id \
    Left Join project_review_comment prc ON pr.review_id = prc.review_id \
    where project_id = '"+ project_id + "' and pr.status = 'approved' and (pr.review !='' OR pr.review_title !='')  \
    Group By pr.review_id, vu.profile_pic, rh.helpful_count";
    var results_review = await db.query(query);
    if (results_review.rows.length == 0) {
        console.log("No Review found");
        return response.json(results_review.rows);
    }
    else {
        var json_string = '';
        var data = results_review.rows;
        for (i in data) {
            //console.log(JSON.stringify(data[i]));
            var review_id = data[i].review_id;
            var query_media = "select * from project_review_media where review_id = '" + review_id + "'";
            var results_media = await db.query(query_media);
            var media_data = JSON.stringify(results_media.rows);
            // console.log("results_media", media_data);

            var query = "Select * from project_review_comment where review_id = '" + review_id + "' and status = 'approved'";
            var results_comment = await db.query(query);
            var comments = JSON.stringify(results_comment.rows);
            var review_data = JSON.stringify(data[i]).replace("{", "").replace("}", "");
            // console.log(review_data )
            // console.log(comments );


            if (json_string == '') {
                json_string = '{' + review_data + ', "comments":' + comments + ',"Media_data":' + media_data + '}';
            }
            else {
                json_string = json_string + ',' + '{' + review_data + ', "comments":' + comments + ',"Media_data":' + media_data + '}';
            }
            // console.log("media_dataxxx2", json_string);
        }

        var json_obj = JSON.parse('[' + json_string + ']');
        // console.log(json_obj);
        // console.log("___________________________________");
        return response.json(json_obj);
    }

}

// function that fech the project configuration based on the project id
async function projectConfig(request, response) {
    project_id = request.params.id;
    // var query = "select pc.project_id, pc.configuration, pc.price_range, pd.possession_date_as_rera  \
    // from project_configuration pc \
    // LEFT JOIN project_details pd ON pc.project_id=pd.project_id \
    // where pc.project_id = "+project_id+"";
    //var query = "select DISTINCT project_phase from project_configuration where project_id="+project_id+"";
    var query = "select * from project_configuration where project_id=" + project_id + "";
    const results = await db.query(query);
    // var list_of_config="";
    // for (i in results.rows)
    // {
    //     var query_x = "select project_id, configuration, price_range, possesion_date from project_configuration \
    //     where project_phase= '"+results.rows[i].project_phase+"' and project_id = '"+project_id+"'";
    //     const results2 = await db.query(query_x);   
    //     //console.log("xxxxxx",results2.rows);
    //     var str_result = JSON.stringify(results2.rows).replace("[", "").replace("]", "");
    //      if(list_of_config == ""){
    //         list_of_config = '{"'+results.rows[i].project_phase+'": ['+str_result+']}';
    //      }
    //      else{
    //         list_of_config = list_of_config+","+'{"'+results.rows[i].project_phase+'": ['+str_result+']}';
    //      }
    // }
    // JSON.parse('['+list_of_config+']');
    return response.json(results.rows);
}

// function that finds all the suggested projets based on the project id 
async function projectSuggested(request, response) {
    project_id = request.params.id;
    var query = "select pd.project_id, pd.project_name, pd.city, pd.area, pr.overall_rating, pm.media_link, COUNT(prate.review) AS ReviewCount \
    from project_details pd \
    INNER JOIN project_rating pr ON pd.project_id=pr.project_id \
    LEFT JOIN project_media pm ON pm.project_id= pd.project_id \
    LEFT JOIN project_review prate ON pd.project_id=prate.project_id \
    where pd.city=(select city from project_details where project_id ="+ project_id + ")  \
    AND pd.project_id != "+ project_id + " \
    AND (pm.media_type='cover image' OR pm.media_type IS NULL)  \
    AND pd.status = 'approved' \
    GROUP BY pd.project_id,pd.project_name, pd.city, pd.area, pr.overall_rating, pm.media_link";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that fetch all the recent transactions based on the project id
async function projectTransaction(request, response) {
    project_id = request.params.id;
    var query = "select * from project_recent_transaction where project_id =" + project_id + "";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that fetch all the recent transactions based on the project id
async function projectTransaction_new(request, response) {
    project_id = request.params.id;
    var query = "select project_id, '-' AS unit_type, '-' AS transaction_type,\
    क्षेत्रफळ as total_area, दस्त_नोंदणी_केल्याचा_दि as month_year, मोबदला as rent_amount \
    from project_recent_transac where project_id = '"+ project_id + "'";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that Fetch all the review information avilable for the requested review id
async function review_info(request, response) {
    review_id = request.params.id;
    var query = "select pr.project_id, pr.review_id, pr.review_title, pr.review, pr.reviewer_name, pr.review_date, pr.overall_rating, vu.profile_pic  \
    from project_review pr LEFT JOIN visitor_user vu ON pr.reviewer_id = vu.userid \
    where pr.review_id = "+ review_id + "";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that Fetch all the review information avilable for the requested review id
async function location_review_info(request, response) {
    var location_review_id = request.params.id;
    var query = "select plr.location_id, plr.location_review_id, \
    plr.review_title, plr.review, plr.reviewer_name,\
    plr.review_date, plr.overall_rating,  vu.profile_pic    \
    from project_location_review plr    \
    LEFT JOIN visitor_user vu ON plr.reviewer_id = vu.userid    \
    where plr.location_review_id = '"+ location_review_id + "'";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that Saves the reported review information for the requested review id
async function save_reported_review(request, response) {
    //console.log("DATA",request.body);
    project_id = request.body.project_id;
    review_id = request.body.review_id;
    reporter_name = request.body.name;
    reporter_email = request.body.email;
    reported_issue = request.body.issue;

    var query = "INSERT INTO public.report_review(  \
    project_id, review_id, reporter_name, reporter_email, report_issue, status) \
    VALUES ('"+ project_id + "', '" + review_id + "', '" + reporter_name + "', '" + reporter_email + "', '" + reported_issue + "', 'unsolved' )";
    await db.query(query);

    var sel_query = "select review from project_review where review_id= '" + review_id + "'";
    var result = await db.query(sel_query);
    var offencive_review = result.rows[0].review;
    //console.log(offencive_review);

    sgMail.setApiKey(config_var.sendgrid_mail_key)
    const msg = {
        to: reporter_email,
        from: 'propviewz@goldenabodes.com',
        subject: 'Propviewz- Review reported',
        text: 'Your Reported review is successfully taken with us ...',
        html: '<html> <body>\
            <center>\
            <div style="background-color: #46423c;width: 500px;height: 307px;color: bisque;border-radius: 18px;padding-top: 52px;">\
            <h1>Propviewz- Review reported</h1>\
            <p>Your Reported issue " '+ reported_issue + ' " is successfully Noted with us for review " ' + offencive_review + ' ". Our team is currently working on it. <p/>\
            <p>Thanks for showing your concern. <p/><br>\
            <img src="https://www.propviewz.com/static/media/logo_white.56d6648f.png" width="200px"><br>\
            <p>We help, you decide.</p><br>\
            <p> Thanks, Propviewz team </p>\
            <div>\
            </center>\
            </body></html>',
    }
    sgMail.send(msg)

    return response.json({ "Reponse": "Success" });
}


// function that Saves the Location reported review information for the requested review id
async function save_location_reported_review(request, response) {
    //console.log("DATA",request.body);
    var location_id = request.body.location_id;
    var location_review_id = request.body.location_review_id;
    var reporter_name = request.body.name;
    var reporter_email = request.body.email;
    var reported_issue = request.body.issue;
    var current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

    var query = "INSERT INTO report_location_review(  \
    location_id, location_review_id, reporter_name, reporter_email, report_issue, status, created_at) \
    VALUES ('"+ location_id + "', '" + location_review_id + "', '" + reporter_name + "', \
    '" + reporter_email + "', '" + reported_issue + "', 'unsolved', '" + current_time + "' )";
    await db.query(query);

    var sel_query = "select review from project_location_review where location_review_id= '" + location_review_id + "'";
    var result = await db.query(sel_query);
    var offencive_review = result.rows[0].review;
    //console.log(offencive_review);

    sgMail.setApiKey(config_var.sendgrid_mail_key)
    const msg = {
        to: reporter_email,
        from: 'propviewz@goldenabodes.com',
        subject: 'Propviewz- Review reported',
        text: 'Your Reported review is successfully taken with us ...',
        html: '<html> <body>\
            <center>\
            <div style="background-color: #46423c;width: 500px;height: 307px;color: bisque;border-radius: 18px;padding-top: 52px;">\
            <h1>Propviewz- Review reported</h1>\
            <p>Your Reported issue " '+ reported_issue + ' " is successfully Noted with us for review " ' + offencive_review + ' ". Our team is currently working on it. <p/>\
            <p>Thanks for showing your concern. <p/><br>\
            <img src="https://www.propviewz.com/static/media/logo_white.56d6648f.png" width="200px"><br>\
            <p>We help, you decide.</p><br>\
            <p> Thanks, Propviewz team </p>\
            <div>\
            </center>\
            </body></html>',
    }
    sgMail.send(msg)

    return response.json({ "Reponse": "Success" });
}


// this function save the new incremented value when the review was helpfull
async function helpful_increment(request, response) {
    var review_id = request.body.review_id;
    var email_id = request.body.email_id;
    var project_id = request.body.project_id;

    var query = "select Count(review_id) as review_id_count \
    from review_helpful where review_id ="+ review_id + "";
    var review_info = await db.query(query);

    if (review_info.rows[0].review_id_count == 0) {
        var query = "Insert Into review_helpful Values(" + review_id + ",'1')";
        await db.query(query);
    }
    else {
        var query = "Select helpful_count as helpful_count \
        from review_helpful where review_id ="+ review_id + "";
        var review_info = await db.query(query);
        var old_count = review_info.rows[0].helpful_count;
        var new_count = parseInt(old_count, 10) + 1;
        var query = "UPDATE review_helpful SET helpful_count = " + new_count + " \
        where review_id="+ review_id + "";
        await db.query(query);
    }

    var sel_query = "select * from review_voters where email_id= '" + email_id + "' AND project_id='" + project_id + "' AND review_id='" + review_id + "'";
    var sel_result = await db.query(sel_query);
    //console.log("XXX",sel_result.rowCount);
    if (sel_result.rowCount == 0) {
        var query = "INSERT INTO public.review_voters(email_id, project_id, review_id)\
        VALUES ('"+ email_id + "','" + project_id + "','" + review_id + "')";
        await db.query(query);
    }

    return response.json({ "Reponse": "Success" });
}


// this function save the new incremented value when the location review was helpfull
async function helpful_location_review(request, response) {
    var location_review_id = request.body.location_review_id;
    var email_id = request.body.email_id;
    var location_id = request.body.location_id;
    //console.log("helpful_location_review:",request.body);

    var query = "select Count(location_review_id) as location_review_id_count \
    from project_location_review_helpful where location_review_id ="+ location_review_id + "";
    var review_info = await db.query(query);

    if (review_info.rows[0].location_review_id_count == 0) {
        var query = "Insert Into project_location_review_helpful Values(" + location_review_id + ",'1')";
        await db.query(query);
    }
    else {
        var query = "Select helpful_count as helpful_count \
        from project_location_review_helpful where location_review_id ="+ location_review_id + "";
        var review_info = await db.query(query);
        var old_count = review_info.rows[0].helpful_count;
        var new_count = parseInt(old_count, 10) + 1;
        console.log("new_count", new_count);
        var query = "UPDATE project_location_review_helpful SET helpful_count = " + new_count + " \
        where location_review_id="+ location_review_id + "";
        await db.query(query);
    }

    var sel_query = "select * from project_location_review_voters where email_id= '" + email_id + "' AND location_id='" + location_id + "' AND location_review_id='" + location_review_id + "'";
    var sel_result = await db.query(sel_query);
    console.log("XXX", sel_result.rowCount);
    if (sel_result.rowCount == 0) {
        var query = "INSERT INTO project_location_review_voters (email_id, location_id, location_review_id)\
        VALUES ('"+ email_id + "','" + location_id + "','" + location_review_id + "')";
        await db.query(query);
    }

    return response.json({ "Reponse": "Success" });
}


// function that fetch the project details for search on home page
async function fetch_search(request, response) {
    var list_of_serch = '';
    var select_unique_city = "select DISTINCT pd.city from project_details pd";
    var results_city = await db.query(select_unique_city);
    for (i in results_city.rows) {
        if (list_of_serch == "") {
            list_of_serch = '{"Location_id":"","Location": "' + results_city.rows[i].city + '", "Projects": [""]}';
        }
        else {
            list_of_serch = list_of_serch + "," + '{"Location_id":"","Location": "' + results_city.rows[i].city + '", "Projects": [""]}';
        }
    }

    var select_unique_location = "select DISTINCT pd.location_id, pd.city, pd.area from project_details pd";
    const results = await db.query(select_unique_location);

    for (i in results.rows) {
        var select_query = "select pd.project_name, pd.project_id, pm.media_link from project_details pd \
         INNER JOIN project_media pm ON pm.project_id = pd.project_id \
         where pd.city ='"+ results.rows[i].city + "' AND pd.area ='" + results.rows[i].area + "' \
         AND pd.status = 'approved'AND pm.media_type='cover image'";
        const results_search = await db.query(select_query);
        var str_result = JSON.stringify(results_search.rows).replace("[", "").replace("]", "");
        if (list_of_serch == "") {
            list_of_serch = '{"Location_id":"' + results.rows[i].location_id + '","Location": "' + results.rows[i].area + ',' + results.rows[i].city + '", "Projects": [' + str_result + ']}';
        }
        else {
            list_of_serch = list_of_serch + "," + '{"Location_id":"' + results.rows[i].location_id + '","Location": "' + results.rows[i].area + ',' + results.rows[i].city + '",  "Projects": [' + str_result + ']}';
        }
    }

    var json_list_of_search = '[' + list_of_serch + ']';
    json_obj = JSON.parse(json_list_of_search);
    return response.json(json_obj);
}

// function that Fetch all the project_amenities information avilable for the requested project id
async function project_amenities(request, response) {
    project_id = request.params.id;
    var query = "select amenities_type from project_amenities where project_id='" + project_id + "'";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that Fetch all the project_amenities information avilable for the requested project id
async function developer_info(request, response) {
    project_id = request.params.id;
    var query = "Select project_id, brand, developer_entity from project_details where project_id = '" + project_id + "'";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that Fetch all the project_name and location
async function fetch_project_name_and_location(request, response) {
    var val = request.query.val;
    var query = "select project_id, project_name, city from project_details \
    where status = 'approved' and LOWER(project_name) LIKE LOWER('%"+ val + "%')";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that Fetch Area Details for the location Page
async function location_page_area_details(request, response) {
    var location_id = request.params.id;
    var query = "select pl.location_id, pl.area, pl.location_disc, pl.cover_img, \
    COALESCE(Count(plr.location_id),0) as total_review, \
    COALESCE(floor(AVG(plr.social_appeal)),0) as social_appeal, \
    COALESCE(floor(AVG(plr.school)),0) as school_rating ,   \
    COALESCE(floor(AVG(plr.mall_restaurent)),0) as mall_restaurent_rating,  \
    COALESCE(floor(AVG(plr.medical_facilities)),0) as medical_facilities_rating,    \
    COALESCE(floor(AVG(plr.public_transport)),0) as public_transport_rating,    \
    COALESCE((select count(overall_rating) from project_location_review where overall_rating='1' And location_id='"+ location_id + "'),0) as rating1_count,  \
    COALESCE((select count(overall_rating) from project_location_review where overall_rating='2' And location_id='"+ location_id + "'),0) as rating2_count,  \
    COALESCE((select count(overall_rating) from project_location_review where overall_rating='3' And location_id='"+ location_id + "'),0) as rating3_count,  \
    COALESCE((select count(overall_rating) from project_location_review where overall_rating='4' And location_id='"+ location_id + "'),0) as rating4_count,  \
    COALESCE((select count(overall_rating) from project_location_review where overall_rating='5' And location_id='"+ location_id + "'),0) as rating5_count,  \
    COALESCE(   \
    ROUND(  \
    (   \
    (COALESCE((select count(overall_rating) from project_location_review where overall_rating='1' And location_id='"+ location_id + "'),0)*1)+ \
    (COALESCE((select Count(overall_rating) from project_location_review where overall_rating='2' and location_id='"+ location_id + "'),0)*2)+ \
    (COALESCE((select Count(overall_rating) from project_location_review where overall_rating='3' and location_id='"+ location_id + "'),0)*3)+ \
    (COALESCE((select Count(overall_rating) from project_location_review where overall_rating='4' and location_id='"+ location_id + "'),0)*4)+ \
    (COALESCE((select Count(overall_rating) from project_location_review where overall_rating='5' and location_id='"+ location_id + "'),0)*5)  \
    ::decimal \
    )/COALESCE((select Count(review) from project_location_review where location_id='"+ location_id + "' HAVING COUNT(review) > 1 ),1),2   \
    ),0 \
    ) as overall_rating   \
    from project_location pl Left JOIN project_location_review plr \
    ON pl.location_id = plr.location_id     \
    Left JOIN project_location_rating lr On lr.location_id = pl.location_id \
    where pl.location_id= '"+ location_id + "'   \
    GROUP BY pl.location_id, pl.location_disc, lr.rating1_count, lr.rating2_count, \
    lr.rating3_count, lr.rating4_count, lr.rating5_count";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that Fetch Projects Map Link for the location Page
async function location_page_map_link(request, response) {
    var location_id = request.params.id;
    var query = "select pd.project_id, pd.project_name, pd.area, pd.construction_status,\
    pd.location_id, pd.google_map_link, pm.media_link,\
    COALESCE( \
    ROUND( \
    (   \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id),0)*1)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id),0)*2)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id),0)*3)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id),0)*4)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id),0)*5)  \
    ::decimal \
    )/COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
    ),0 \
    ) as overall_rating,    \
    coalesce((count(p_rev.reviewer_id)),0) as total_review  \
    from project_details pd \
    LEFT Join project_media pm On pd.project_id = pm.project_id \
    LEFT Join project_rating pr on pd.project_id = pr.project_id    \
    Left Join project_review p_rev on pd.project_id = p_rev.project_id  \
    where pd.location_id='"+ location_id + "' AND pd.status = 'approved' AND pm.media_type = 'cover image'  \
    Group by pd.project_id, pm.media_link, pr.overall_rating";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that Fetch Location Review for the location Page
async function location_page_location_review(request, response) {
    var location_id = request.params.id;
    var query = "select plr.location_id, plr.location_review_id, plr.reviewer_name, plr.reviewer_type, plr.overall_rating, \
    plr.review_title, plr.review, plr.review_date, plr.review_time, vu.email,\
    Count(plrm.location_review_id) as media_count,\
    COALESCE((plrh.helpful_count),0) as helpful_count\
    from project_location_review plr \
    LEFT JOIN visitor_user vu ON plr.reviewer_id = vu.userid \
    LEFT JOIN project_location_review_helpful plrh ON plrh.location_review_id = plr.location_review_id \
    Left Join project_location_review_media plrm ON plrm.location_review_id = plr.location_review_id\
    where plr.location_id='"+ location_id + "' and (plr.review !='' OR plr.review_title !='')  \
    And plr.status = 'approved' Group By plr.location_id, plr.location_review_id, plr.reviewer_name, \
    plr.reviewer_type, plr.overall_rating, plr.review_title, plr.review, plr.review_date, plr.review_time, \
    vu.email, plrh.helpful_count";
    const results = await db.query(query);
    if (results.rows.length == 0) {
        console.log("No Review found");
        return response.json(results.rows);
    }
    else {
        var json_string = '';
        var data = results.rows;
        for (i in data) {
            //console.log(JSON.stringify(data[i]));
            var location_review_id = data[i].location_review_id;
            var query_media = "select * from project_location_review_media where location_review_id = '" + location_review_id + "'";
            var results_media = await db.query(query_media);
            var media_data = JSON.stringify(results_media.rows);
            //console.log("results_media", media_data);

            var query = "Select * from project_location_review_comment where location_review_id = '" + location_review_id + "' and status = 'approved'";
            var results_comment = await db.query(query);
            var comments = JSON.stringify(results_comment.rows);
            var review_data = JSON.stringify(data[i]).replace("{", "").replace("}", "");
            // console.log(review_data )
            // console.log(comments );


            if (json_string == '') {
                json_string = '{' + review_data + ', "comments":' + comments + ',"Media_data":' + media_data + '}';
            }
            else {
                json_string = json_string + ',' + '{' + review_data + ', "comments":' + comments + ',"Media_data":' + media_data + '}';
            }
            //console.log("media_dataxxx2", json_string);
        }

        //console.log('[' + json_string + ']');
        var json_obj = JSON.parse('[' + json_string + ']');
        //console.log(json_obj);
        console.log("___________________________________");
        return response.json(json_obj);
    }
}


// function that Fetch Trending Projects for the location Page
async function location_page_trending_projects(request, response) {
    var location_id = request.params.id;
    var query = "select pd.project_id, pd.project_name, pm.media_link as cover_image, pd.city, \
    pd.area, pd.sub_area, count(priew.review) As review_count, FLOOR(pr.overall_rating) as overall_rating, \
    pd.developer_name, pd.construction_status \
    from project_details pd INNER JOIN project_media pm ON pd.project_id = pm.project_id \
    INNER JOIN project_rating pr ON pr.project_id = pd.project_id   \
    INNER JOIN project_review priew ON priew.project_id = pd.project_id  \
    where pm.media_type = 'cover image' AND pd.location_id ='"+ location_id + "' AND pd.status='approved' \
    Group By pd.project_id, pm.media_link, pr.overall_rating";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that Fetch user photos for Project Page
async function fetch_user_photos(request, response) {
    var project_id = request.params.id;
    var query = "select * from project_post_pictures where project_id ='" + project_id + "' And status = 'approved'";
    const results = await db.query(query);
    return response.json(results.rows);
}

async function location_page_filter(request, response) {
    console.log("YYYY: ", request.body);
    var overall_rating = request.body.overall_rating;
    var property_type = request.body.property_type;
    var budget = request.body.budget;
    var amenities = request.body.amenities;
    var possesion_status = request.body.possession_status;
    var sort_by = request.body.sort_by;
    var location = request.body.searched_location[0];

    var lastIndex = location.lastIndexOf(",")
    // Break location into city and area
    var area = location.substring(0, lastIndex);
    var city = location.substring(lastIndex + 1);
    //    console.log("AREA:", area);
    //    console.log("City:", city);

    var all_filter_projectid = [];

    if (area == '') {
        console.log("Fetch everything based on the city...");
        console.log("City:", city);
        if (city.toLowerCase() == 'india') {

            // var query = "select project_id from project_details LIMIT 25";
            // var results = await db.query(query);
            // for (j = 0; j < results.rows.length; j++) {
            //     var filter_project_id = results.rows[j].project_id;
            //     all_filter_projectid.push(filter_project_id);
            // }

            all_filter_projectid = await filter_projects_by_india(request, response);
        }
        else {
            all_filter_projectid = await filter_projects_by_city(request, response, city);
        }
    }
    else {

        console.log("Fetch everything based on the City & Area...");
        var query = "select location_id from project_details where lower(city) = lower('" + city + "') \
        and Lower(area)=lower('"+ area + "') Limit 1";
        var results = await db.query(query);
        var location_id = results.rows[0].location_id;
        console.log("LOCATION ID: ", location_id);

        all_filter_projectid = await filter_projects_by_location_id(request, response, location_id);

    }

    var index = all_filter_projectid.indexOf('*');
    delete all_filter_projectid[index];

    console.log("all_filter_projectid ", all_filter_projectid);

    var set = new Set(all_filter_projectid);
    var project_id_found_in_process = "";

    for (var it = set.values(), val = null; val = it.next().value;) {
        if (project_id_found_in_process == "") {
            project_id_found_in_process = val;
        }
        else {
            project_id_found_in_process = project_id_found_in_process + "," + val;
        }
    }
    console.log("Project_id_found_in_process:", project_id_found_in_process);
    if (project_id_found_in_process == '' && overall_rating == null && property_type == null && budget == null && amenities == null && possesion_status == null && sort_by == null) {
        console.log("Show all projects");
        if (area == '') {
            var query = "select pd.project_id, pd.project_name, pm.media_link as cover_image,\
            pd.google_map_link, pd.construction_status, COALESCE((Count(p_review.reviewer_name)),0) as review_count ,\
            pd.city, pd.area, pd.sub_area, \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id ),0) as rating1_count, \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id ),0) as rating2_count, \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id),0) as rating3_count,   \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id),0) as rating4_count,  \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id),0) as rating5_count,  \
            COALESCE( \
            ROUND(  \
            (   \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id),0)*1)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id),0)*2)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id),0)*3)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id),0)*4)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id),0)*5)  \
            ::decimal \
            )/COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
            ),0 \
            ) as overall_rating, \
            pd.developer_name \
            from project_details pd LEFT JOIN project_media pm ON pd.project_id = pm.project_id \
            LEFT JOIN project_rating pr ON pr.project_id = pd.project_id  \
            LEFT Join project_review p_review on p_review.project_id = pd.project_id \
            where pm.media_type = 'cover image' AND pd.status='approved' \
            AND lower(pd.city) = lower('"+ city + "') Group By pd.project_id, pm.media_link, \
            pr.overall_rating";
            var results = await db.query(query);
            return response.json(results.rows);
        }
        else {

            var query = "select location_id from project_details where lower(city) = lower('" + city + "') \
            and Lower(area)=lower('"+ area + "') Limit 1";
            var results = await db.query(query);
            var location_id = results.rows[0].location_id;
            //console.log("XXXXXXXXXXXX",location_id);
            var query = "select pd.project_id, pd.project_name, pm.media_link as cover_image,\
            pd.google_map_link, pd.construction_status,pd.city, pd.area, pd.sub_area, \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id ),0) as rating1_count,   \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id ),0) as rating2_count,   \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id),0) as rating3_count,   \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id),0) as rating4_count,   \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id),0) as rating5_count,   \
            COALESCE(   \
            ROUND(  \
            (   \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id),0)*1)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id),0)*2)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id),0)*3)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id),0)*4)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id),0)*5)  \
            ::decimal \
            )/COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
            ),0 \
            ) as overall_rating,  \
            pd.developer_name , \
            COALESCE((Count(p_review.reviewer_name)),0) as review_count \
            from project_details pd LEFT JOIN project_media pm ON pd.project_id = pm.project_id \
            Left JOIN project_rating pr ON pr.project_id = pd.project_id  \
            LEFT Join project_review p_review on p_review.project_id = pd.project_id \
            where pm.media_type = 'cover image' AND pd.status='approved' \
            AND pd.location_id = '"+ location_id + "' Group By pd.project_id, pm.media_link, \
            pr.overall_rating";
            var results = await db.query(query);
            return response.json(results.rows);
        }
    }
    else if (project_id_found_in_process == '' && (overall_rating != null || property_type != null || budget != null || amenities != null || possesion_status != null || sort_by != null)) {
        console.log("Say N/A");
        return response.json({ "Response": "N/A" });
    }
    else {
        console.log("length:", all_filter_projectid.length);
        var json_string = '';
        for (id in all_filter_projectid) {
            //console.log(all_filter_projectid[id])
            var project_id = all_filter_projectid[id];
            var query = "select pd.project_id, pd.project_name, pm.media_link as cover_image, \
            pd.construction_status, COALESCE((Count(p_review.reviewer_name)),0) as review_count ,\
            pd.city, pd.area, pd.sub_area, pd.google_map_link, \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id ),0) as rating1_count,   \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id ),0) as rating2_count,   \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id),0) as rating3_count,   \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id),0) as rating4_count,   \
            COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id),0) as rating5_count,   \
            COALESCE( \
            ROUND( \
            (   \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id),0)*1)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id),0)*2)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id),0)*3)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id),0)*4)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id),0)*5)  \
            ::decimal \
            )/COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
            ),0 \
            ) as overall_rating    \
            from project_details pd INNER JOIN project_media pm ON pd.project_id = pm.project_id \
            INNER JOIN project_rating pr ON pr.project_id = pd.project_id  \
            Left Join project_review p_review on p_review.project_id = pd.project_id \
            where pm.media_type = 'cover image' AND pd.status='approved' \
            AND pd.project_id = '"+ project_id + "' Group By pd.project_id, pm.media_link,\
            pr.overall_rating";
            var results = await db.query(query);
            //console.log("YYYYYYYYYYY:", results.rowCount);
            if (results.rowCount == 1) {
                if (json_string == '') {
                    json_string = JSON.stringify(results.rows[0]);
                }
                else {
                    json_string = json_string + "," + JSON.stringify(results.rows[0]);
                }
            }
        }
        json_string = "[" + json_string + "]";
        //console.log(json_string)
        return response.json(JSON.parse(json_string));
    }

}


async function filter_projects_by_location_id(request, response, location_id) {
    console.log("Inside function filter_projects_by_location_id called from location_page_filter");
    var filtered_project_ids_for_rating = [];
    var filtered_project_ids_for_amenities = [];
    var filtered_project_ids_for_property_type = [];
    var filtered_project_ids_for_budget = [];
    var filtered_project_ids_for_possesion_status = [];
    var filtered_project_ids_for_sort_by = [];

    var overall_rating = request.body.overall_rating;
    var property_type = request.body.property_type;
    var budget = request.body.budget;
    var amenities = request.body.amenities;
    var possesion_status = request.body.possession_status;
    var sort_by = request.body.sort_by;

    //------------------------------------------------------------------------------------------

    if (overall_rating != null) {
        //console.log("Inside Overall rating");   
        var overall_rating_count = overall_rating.length;
        //console.log("overall_rating_count",overall_rating_count);
        for (var i = 0; i < overall_rating_count; i++) {
            var rating = overall_rating[i].replace("+", "");
            console.log("rating", rating);
            var query = "select pd.project_id from project_details pd \
            where pd.location_id = '"+ location_id + "' and \
            COALESCE( \
            ROUND(  \
            (   \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id ),0)*1)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id ),0)*2)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id ),0)*3)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id ),0)*4)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id ),0)*5)  \
            ::decimal \
            )/COALESCE((select Count(review) from project_review where project_id= pd.project_id  HAVING COUNT(review) > 1 ),1),2    \
            ),0 \
            ) >= '" + rating + "' \
            Order BY pd.project_id";
            var results = await db.query(query);
            for (j = 0; j < results.rows.length; j++) {
                var filtered_project_ids_for_rating_found = results.rows[j].project_id;
                //console.log("project_id:",filter_rating_project_id);
                filtered_project_ids_for_rating.push(filtered_project_ids_for_rating_found);
            }
        }
        filtered_project_ids_for_rating.push('*');
        //console.log("filtered_project_ids for rating: ",filtered_project_ids_for_rating);
    }

    //------------------------------------------------------------------------------------------

    if (amenities != null) {
        var amenities_count = amenities.length;
        //console.log("amenities_count",amenities_count);
        for (var i = 0; i < amenities_count; i++) {
            var prop_amenities = amenities[i];
            console.log("prop_amenities:", prop_amenities);
            var query = "select pd.project_id from project_details pd\
            Inner Join project_amenities pa On pa.project_id = pd.project_id\
            Inner Join project_location pl On pl.location_id = pd.location_id\
            where pl.location_id = '"+ location_id + "' and lower(pa.amenities_type) = lower('" + prop_amenities + "')";
            var results = await db.query(query);
            for (j = 0; j < results.rows.length; j++) {
                var filter_rating_project_id = results.rows[j].project_id;
                //console.log("project_id:",filter_rating_project_id);
                filtered_project_ids_for_amenities.push(filter_rating_project_id);
            }
        }
        filtered_project_ids_for_amenities.push('*');
        //console.log("filtered_project_ids for amenities: ",filtered_project_ids_for_amenities);
    }

    //------------------------------------------------------------------------------------------

    if (property_type != null) {
        var property_type_count = property_type.length;
        //console.log("property_type_count",property_type_count);
        for (var i = 0; i < property_type_count; i++) {
            var prop_type = property_type[i];
            //console.log("prop_type",prop_type);  
            var query = "select pd.project_id from project_details pd\
            Inner Join project_configuration pc On pd.project_id = pc.project_id\
            Inner Join project_location pl On pl.location_id = pd.location_id\
            where pl.location_id = '"+ location_id + "' and lower(pc.configuration) = lower('" + prop_type + "')";
            var results = await db.query(query);
            for (j = 0; j < results.rows.length; j++) {
                var filter_rating_project_id = results.rows[j].project_id;
                //console.log("project_id:",filter_rating_project_id);
                filtered_project_ids_for_property_type.push(filter_rating_project_id);
            }
        }
        filtered_project_ids_for_property_type.push('*');
        //console.log("filtered_project_ids for propert type: ",filtered_project_ids_for_property_type);
    }

    //------------------------------------------------------------------------------------------

    if (budget != null) {
        var min_budget = budget.split("-")[0].replace(" ", "");
        var max_budget = budget.split("-")[1].replace(" ", "");
        // console.log("min:",min_budget)
        // console.log("max:",max_budget)

        var query = "select pd.project_id from project_details pd\
        Inner Join project_configuration pc On pc.project_id = pd.project_id\
        Inner Join project_location pl On pl.location_id = pd.location_id\
        where pl.location_id = '"+ location_id + "' and pc.max_price <= '" + max_budget + "' and pc.min_price >= '" + min_budget + "'";
        var results = await db.query(query);

        for (j = 0; j < results.rows.length; j++) {
            var filter_rating_project_id = results.rows[j].project_id;
            //console.log("project_id:",filter_rating_project_id);
            filtered_project_ids_for_budget.push(filter_rating_project_id);
        }
        filtered_project_ids_for_budget.push('*');
        //console.log("filtered_project_ids for budget: ",filtered_project_ids_for_budget);
    }

    //------------------------------------------------------------------------------------------

    if (possesion_status != null) {
        var possesion_status_count = possesion_status.length;
        //console.log("property_type_count",property_type_count);
        for (var i = 0; i < possesion_status_count; i++) {
            var prop_possesion_date = find_date(possesion_status[i]);
            //console.log("prop_possesion_status",prop_possesion_date);
            var query = "select pd.project_id from project_details pd\
            Inner Join project_configuration pc On pc.project_id = pd.project_id\
            Inner Join project_location pl On pl.location_id = pd.location_id\
            where pl.location_id = '"+ location_id + "' and pc.possesion_date <= '" + prop_possesion_date + "'";
            var results = await db.query(query);

            for (j = 0; j < results.rows.length; j++) {
                var filter_rating_project_id = results.rows[j].project_id;
                //console.log("project_id:",filter_rating_project_id);
                filtered_project_ids_for_possesion_status.push(filter_rating_project_id);
            }
        }
        filtered_project_ids_for_possesion_status.push('*');
        //console.log("filtered_project_ids for possesion_status: ",filtered_project_ids_for_possesion_status);
    }

    //------------------------------------------------------------------------------------------

    if (sort_by != null) {
        var sort_by_length = sort_by.length;
        //console.log("Sort By Length:", sort_by_length);
        for (var i = 0; i < sort_by_length; i++) {
            var sort_by_value = sort_by[i];
            //console.log("sort_by_value", sort_by_value);
            if (sort_by_value == "Top trending") {
                var query = "Select pd.project_id from project_details pd   \
                RIGHT JOIN most_trending_project mtp ON mtp.project_id = pd.project_id \
                where  pd.status = 'approved' AND pd.location_id = '"+ location_id + "'";
                var results = await db.query(query);
                //console.log("Top trending", results.rows);
                for (j = 0; j < results.rows.length; j++) {
                    var filter_sorted_by_project_id = results.rows[j].project_id;
                    //console.log("project_id:",filter_sorted_by_project_id);
                    filtered_project_ids_for_sort_by.push(filter_sorted_by_project_id);
                }
            }
            if (sort_by_value == "Top Rated") {
                var query = "Select pd.project_id, \
                COALESCE(   \
                ROUND(  \
                (   \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id),0)*1)+ \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id),0)*2)+ \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id),0)*3)+ \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id),0)*4)+ \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id),0)*5)  \
                ::decimal \
                )/COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
                ),0 \
                ) as overall_rating \
                from project_details pd \
                LEFT JOIN project_rating ON pd.project_id = project_rating.project_id \
                LEFT JOIN project_review On pd.project_id = project_review.project_id \
                where pd.status = 'approved' AND pd.location_id = '"+ location_id + "' \
                GROUP BY pd.project_id \
                order by overall_rating DESC";
                var results = await db.query(query);
                //console.log("Top Rated", results.rows);
                for (j = 0; j < results.rows.length; j++) {
                    var filter_sorted_by_project_id = results.rows[j].project_id;
                    //console.log("project_id:",filter_sorted_by_project_id);
                    filtered_project_ids_for_sort_by.push(filter_sorted_by_project_id);
                }

            }
            if (sort_by_value == "New projects") {
                var query = "Select pd.project_id from project_details pd   \
                where pd.status = 'approved' AND pd.construction_status = 'Under construction' \
                AND  pd.location_id = '"+ location_id + "' ";
                var results = await db.query(query);
                //console.log("New projects", results.rows);
                for (j = 0; j < results.rows.length; j++) {
                    var filter_sorted_by_project_id = results.rows[j].project_id;
                    //console.log("project_id:",filter_sorted_by_project_id);
                    filtered_project_ids_for_sort_by.push(filter_sorted_by_project_id);
                }
            }
        }

    }
    //------------------------------------------------------------------------------------------

    var all_filter_projectid = [];
    all_filter_projectid = intersect(filtered_project_ids_for_rating, filtered_project_ids_for_amenities);
    all_filter_projectid = intersect(all_filter_projectid, filtered_project_ids_for_property_type);
    all_filter_projectid = intersect(all_filter_projectid, filtered_project_ids_for_possesion_status);
    all_filter_projectid = intersect(all_filter_projectid, filtered_project_ids_for_budget);
    all_filter_projectid = intersect(all_filter_projectid, filtered_project_ids_for_sort_by);

    console.log("filtered_project_ids with location_id: ", all_filter_projectid);
    return all_filter_projectid;

}

async function filter_projects_by_india(request, response) {
    console.log("Inside function filter_projects_by_India called from location_page_filter");
    var filtered_project_ids_for_rating = [];
    var filtered_project_ids_for_amenities = [];
    var filtered_project_ids_for_property_type = [];
    var filtered_project_ids_for_budget = [];
    var filtered_project_ids_for_possesion_status = [];
    var filtered_project_ids_for_sort_by = [];

    var overall_rating = request.body.overall_rating;
    var property_type = request.body.property_type;
    var budget = request.body.budget;
    var amenities = request.body.amenities;
    var possesion_status = request.body.possession_status;
    var sort_by = request.body.sort_by;

    //------------------------------------------------------------------------------------------

    if (overall_rating != null) {
        //console.log("Inside Overall rating");   
        var overall_rating_count = overall_rating.length;
        //console.log("overall_rating_count",overall_rating_count);
        for (var i = 0; i < overall_rating_count; i++) {
            var rating = overall_rating[i].replace("+", "");
            console.log("rating", rating);
            var query = "select pd.project_id from project_details pd \
            where COALESCE( \
            ROUND(  \
            (   \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id ),0)*1)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id ),0)*2)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id ),0)*3)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id ),0)*4)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id ),0)*5)  \
            ::decimal \
            )/COALESCE((select Count(review) from project_review where project_id= pd.project_id  HAVING COUNT(review) > 1 ),1),2    \
            ),0 \
            ) >= '" + rating + "' \
            Order BY pd.project_id";
            var results = await db.query(query);
            for (j = 0; j < results.rows.length; j++) {
                var filtered_project_ids_for_rating_found = results.rows[j].project_id;
                //console.log("project_id:",filter_rating_project_id);
                filtered_project_ids_for_rating.push(filtered_project_ids_for_rating_found);
            }
        }
        filtered_project_ids_for_rating.push('*');
        //console.log("filtered_project_ids for rating: ",filtered_project_ids_for_rating);
    }

    //------------------------------------------------------------------------------------------

    if (amenities != null) {
        var amenities_count = amenities.length;
        //console.log("amenities_count",amenities_count);
        for (var i = 0; i < amenities_count; i++) {
            var prop_amenities = amenities[i];
            console.log("prop_amenities:", prop_amenities);
            var query = "select pd.project_id from project_details pd\
            Inner Join project_amenities pa On pa.project_id = pd.project_id\
            Inner Join project_location pl On pl.location_id = pd.location_id\
            where lower(pa.amenities_type) = lower('" + prop_amenities + "')";
            var results = await db.query(query);
            for (j = 0; j < results.rows.length; j++) {
                var filter_rating_project_id = results.rows[j].project_id;
                //console.log("project_id:",filter_rating_project_id);
                filtered_project_ids_for_amenities.push(filter_rating_project_id);
            }
        }
        filtered_project_ids_for_amenities.push('*');
        //console.log("filtered_project_ids for amenities: ",filtered_project_ids_for_amenities);
    }

    //------------------------------------------------------------------------------------------

    if (property_type != null) {
        var property_type_count = property_type.length;
        //console.log("property_type_count",property_type_count);
        for (var i = 0; i < property_type_count; i++) {
            var prop_type = property_type[i];
            //console.log("prop_type",prop_type);  
            var query = "select pd.project_id from project_details pd\
            Inner Join project_configuration pc On pd.project_id = pc.project_id\
            Inner Join project_location pl On pl.location_id = pd.location_id\
            where lower(pc.configuration) = lower('" + prop_type + "')";
            var results = await db.query(query);
            for (j = 0; j < results.rows.length; j++) {
                var filter_rating_project_id = results.rows[j].project_id;
                //console.log("project_id:",filter_rating_project_id);
                filtered_project_ids_for_property_type.push(filter_rating_project_id);
            }
        }
        filtered_project_ids_for_property_type.push('*');
        //console.log("filtered_project_ids for propert type: ",filtered_project_ids_for_property_type);
    }

    //------------------------------------------------------------------------------------------

    if (budget != null) {
        var min_budget = budget.split("-")[0].replace(" ", "");
        var max_budget = budget.split("-")[1].replace(" ", "");
        // console.log("min:",min_budget)
        // console.log("max:",max_budget)

        var query = "select pd.project_id from project_details pd\
        Inner Join project_configuration pc On pc.project_id = pd.project_id\
        Inner Join project_location pl On pl.location_id = pd.location_id\
        where pc.max_price <= '" + max_budget + "' and pc.min_price >= '" + min_budget + "'";
        var results = await db.query(query);

        for (j = 0; j < results.rows.length; j++) {
            var filter_rating_project_id = results.rows[j].project_id;
            //console.log("project_id:",filter_rating_project_id);
            filtered_project_ids_for_budget.push(filter_rating_project_id);
        }
        filtered_project_ids_for_budget.push('*');
        //console.log("filtered_project_ids for budget: ",filtered_project_ids_for_budget);
    }

    //------------------------------------------------------------------------------------------

    if (possesion_status != null) {
        var possesion_status_count = possesion_status.length;
        //console.log("property_type_count",property_type_count);
        for (var i = 0; i < possesion_status_count; i++) {
            var prop_possesion_date = find_date(possesion_status[i]);
            //console.log("prop_possesion_status",prop_possesion_date);
            var query = "select pd.project_id from project_details pd\
            Inner Join project_configuration pc On pc.project_id = pd.project_id\
            Inner Join project_location pl On pl.location_id = pd.location_id\
            where pc.possesion_date <= '" + prop_possesion_date + "'";
            var results = await db.query(query);

            for (j = 0; j < results.rows.length; j++) {
                var filter_rating_project_id = results.rows[j].project_id;
                //console.log("project_id:",filter_rating_project_id);
                filtered_project_ids_for_possesion_status.push(filter_rating_project_id);
            }
        }
        filtered_project_ids_for_possesion_status.push('*');
        //console.log("filtered_project_ids for possesion_status: ",filtered_project_ids_for_possesion_status);
    }

    //------------------------------------------------------------------------------------------

    if (sort_by != null) {
        var sort_by_length = sort_by.length;
        //console.log("Sort By Length:", sort_by_length);
        for (var i = 0; i < sort_by_length; i++) {
            var sort_by_value = sort_by[i];
            //console.log("sort_by_value", sort_by_value);
            if (sort_by_value == "Top trending") {
                var query = "Select pd.project_id from project_details pd   \
                RIGHT JOIN most_trending_project mtp ON mtp.project_id = pd.project_id \
                where  pd.status = 'approved' ";
                var results = await db.query(query);
                //console.log("Top trending", results.rows);
                for (j = 0; j < results.rows.length; j++) {
                    var filter_sorted_by_project_id = results.rows[j].project_id;
                    //console.log("project_id:",filter_sorted_by_project_id);
                    filtered_project_ids_for_sort_by.push(filter_sorted_by_project_id);
                }
            }
            if (sort_by_value == "Top Rated") {
                var query = "Select pd.project_id, \
                COALESCE(   \
                ROUND(  \
                (   \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id),0)*1)+ \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id),0)*2)+ \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id),0)*3)+ \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id),0)*4)+ \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id),0)*5)  \
                ::decimal \
                )/COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
                ),0 \
                ) as overall_rating \
                from project_details pd \
                LEFT JOIN project_rating ON pd.project_id = project_rating.project_id \
                LEFT JOIN project_review On pd.project_id = project_review.project_id \
                where pd.status = 'approved' \
                GROUP BY pd.project_id \
                order by overall_rating DESC";
                var results = await db.query(query);
                //console.log("Top Rated", results.rows);
                for (j = 0; j < results.rows.length; j++) {
                    var filter_sorted_by_project_id = results.rows[j].project_id;
                    //console.log("project_id:",filter_sorted_by_project_id);
                    filtered_project_ids_for_sort_by.push(filter_sorted_by_project_id);
                }

            }
            if (sort_by_value == "New projects") {
                var query = "Select pd.project_id from project_details pd   \
                where pd.status = 'approved' AND pd.construction_status = 'Under construction' ";
                var results = await db.query(query);
                //console.log("New projects", results.rows);
                for (j = 0; j < results.rows.length; j++) {
                    var filter_sorted_by_project_id = results.rows[j].project_id;
                    //console.log("project_id:",filter_sorted_by_project_id);
                    filtered_project_ids_for_sort_by.push(filter_sorted_by_project_id);
                }
            }
        }

    }
    //------------------------------------------------------------------------------------------

    var all_filter_projectid = [];
    all_filter_projectid = intersect(filtered_project_ids_for_rating, filtered_project_ids_for_amenities);
    all_filter_projectid = intersect(all_filter_projectid, filtered_project_ids_for_property_type);
    all_filter_projectid = intersect(all_filter_projectid, filtered_project_ids_for_possesion_status);
    all_filter_projectid = intersect(all_filter_projectid, filtered_project_ids_for_budget);
    all_filter_projectid = intersect(all_filter_projectid, filtered_project_ids_for_sort_by);

    console.log("filtered_project_ids with location_id: ", all_filter_projectid);
    return all_filter_projectid;

}

async function filter_projects_by_city(request, response, city) {
    console.log("Inside function filter_projects_by_city called from location_page_filter");
    var filtered_project_ids_for_rating = [];
    var filtered_project_ids_for_amenities = [];
    var filtered_project_ids_for_property_type = [];
    var filtered_project_ids_for_budget = [];
    var filtered_project_ids_for_possesion_status = [];
    var filtered_project_ids_for_sort_by = [];

    var overall_rating = request.body.overall_rating;
    var property_type = request.body.property_type;
    var budget = request.body.budget;
    var amenities = request.body.amenities;
    var possesion_status = request.body.possession_status;
    var sort_by = request.body.sort_by;

    //------------------------------------------------------------------------------------------

    if (overall_rating != null) {
        //console.log("Inside Overall rating");   
        var overall_rating_count = overall_rating.length;
        //console.log("overall_rating_count",overall_rating_count);
        for (var i = 0; i < overall_rating_count; i++) {
            var rating = overall_rating[i].replace("+", "");
            //console.log("rating",rating);  
            var query = "select pd.project_id from project_details pd \
            Inner Join project_rating pr On pd.project_id = pr.project_id   \
            where lower(pd.city) = lower( '"+ city + "') and     \
            COALESCE(   \
            ROUND(      \
            (       \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id ),0)*1)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id ),0)*2)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id ),0)*3)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id ),0)*4)+ \
            (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id ),0)*5)  \
            ::decimal \
            )/COALESCE((select Count(review) from project_review where project_id= pd.project_id  HAVING COUNT(review) > 1 ),1),2      \
            ),0 \
            )   \
            >= '" + rating + "'  \
            Order BY pd.project_id";
            //console.log(query);
            var results = await db.query(query);

            for (j = 0; j < results.rows.length; j++) {
                var filtered_project_ids_for_rating_found = results.rows[j].project_id;
                //console.log("project_id:",filter_rating_project_id);
                filtered_project_ids_for_rating.push(filtered_project_ids_for_rating_found);
            }
        }
        filtered_project_ids_for_rating.push('*');
        //console.log("filtered_project_ids for rating: ",filtered_project_ids_for_rating);
    }

    //------------------------------------------------------------------------------------------

    if (amenities != null) {
        var amenities_count = amenities.length;
        //console.log("amenities_count",amenities_count);
        for (var i = 0; i < amenities_count; i++) {
            var prop_amenities = amenities[i];
            console.log("prop_amenities:", prop_amenities);
            var query = "select pd.project_id from project_details pd\
            Inner Join project_amenities pa On pa.project_id = pd.project_id\
            where lower(pd.city) = lower('"+ city + "') and lower(pa.amenities_type) = lower('" + prop_amenities + "')";
            var results = await db.query(query);
            for (j = 0; j < results.rows.length; j++) {
                var filter_rating_project_id = results.rows[j].project_id;
                //console.log("project_id:",filter_rating_project_id);
                filtered_project_ids_for_amenities.push(filter_rating_project_id);
            }
        }
        filtered_project_ids_for_amenities.push('*');
        //console.log("filtered_project_ids for amenities: ",filtered_project_ids_for_amenities);
    }

    //------------------------------------------------------------------------------------------

    if (property_type != null) {
        var property_type_count = property_type.length;
        //console.log("property_type_count",property_type_count);
        for (var i = 0; i < property_type_count; i++) {
            var prop_type = property_type[i];
            //console.log("prop_type",prop_type);  
            var query = "select pd.project_id from project_details pd\
            Inner Join project_configuration pc On pd.project_id = pc.project_id\
            where lower(pd.city) = lower('"+ city + "') and lower(pc.configuration) = lower('" + prop_type + "')";
            var results = await db.query(query);
            for (j = 0; j < results.rows.length; j++) {
                var filter_rating_project_id = results.rows[j].project_id;
                //console.log("project_id:",filter_rating_project_id);
                filtered_project_ids_for_property_type.push(filter_rating_project_id);
            }
        }
        filtered_project_ids_for_property_type.push('*');
        //console.log("filtered_project_ids for propert type: ",filtered_project_ids_for_property_type);
    }

    //------------------------------------------------------------------------------------------

    if (budget != null) {
        var min_budget = budget.split("-")[0].replace(" ", "");
        var max_budget = budget.split("-")[1].replace(" ", "");
        // console.log("min:",min_budget)
        // console.log("max:",max_budget)

        var query = "select distinct pd.project_id from project_details pd\
        Inner Join project_configuration pc On pc.project_id = pd.project_id\
        where lower(pd.city) = lower('"+ city + "') and pc.max_price <= '" + max_budget + "' and pc.min_price >= '" + min_budget + "'";
        var results = await db.query(query);

        for (j = 0; j < results.rows.length; j++) {
            var filter_rating_project_id = results.rows[j].project_id;
            //console.log("project_id:",filter_rating_project_id);
            filtered_project_ids_for_budget.push(filter_rating_project_id);
        }
        filtered_project_ids_for_budget.push('*');
        //console.log("filtered_project_ids for budget: ",filtered_project_ids_for_budget);
    }

    //------------------------------------------------------------------------------------------

    if (possesion_status != null) {
        var possesion_status_count = possesion_status.length;
        //console.log("property_type_count",property_type_count);
        for (var i = 0; i < possesion_status_count; i++) {
            var prop_possesion_date = find_date(possesion_status[i]);
            //console.log("prop_possesion_status",prop_possesion_date);
            var query = "select pd.project_id, pc.possesion_date from project_details pd\
            Inner Join project_configuration pc On pc.project_id = pd.project_id\
            where lower(pd.city) = lower('"+ city + "') and pc.possesion_date <= '" + prop_possesion_date + "'";
            var results = await db.query(query);

            for (j = 0; j < results.rows.length; j++) {
                var filter_rating_project_id = results.rows[j].project_id;
                //console.log("project_id:",filter_rating_project_id);
                filtered_project_ids_for_possesion_status.push(filter_rating_project_id);
            }
        }
        filtered_project_ids_for_possesion_status.push('*');
        //console.log("filtered_project_ids for possesion_status: ",filtered_project_ids_for_possesion_status);
    }

    //------------------------------------------------------------------------------------------

    if (sort_by != null) {
        var sort_by_length = sort_by.length;
        //console.log("Sort By Length:", sort_by_length);
        for (var i = 0; i < sort_by_length; i++) {
            var sort_by_value = sort_by[i];
            console.log("sort_by_value", sort_by_value);
            if (sort_by_value == "Top trending") {
                var query = "Select pd.project_id from project_details pd   \
                RIGHT JOIN most_trending_project mtp ON mtp.project_id = pd.project_id \
                where  pd.status = 'approved' AND lower(pd.city)=lower('"+ city + "') ORDER BY mtp.visit_count DESC ";
                var results = await db.query(query);
                //console.log("Top trending", results.rows);
                for (j = 0; j < results.rows.length; j++) {
                    var filter_sorted_by_project_id = results.rows[j].project_id;
                    //console.log("project_id:",filter_sorted_by_project_id);
                    filtered_project_ids_for_sort_by.push(filter_sorted_by_project_id);
                }
            }
            if (sort_by_value == "Top Rated") {
                var query = "Select pd.project_id, pd.project_name, \
                COALESCE(   \
                ROUND( \
                (   \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating = '1' and project_id = pd.project_id), 0) * 1) +  \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating = '2' and project_id = pd.project_id), 0) * 2) +  \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating = '3' and project_id = pd.project_id), 0) * 3) +  \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating = '4' and project_id = pd.project_id), 0) * 4) +  \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating = '5' and project_id = pd.project_id), 0) * 5)  \
                :: decimal  \
                ) /COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
                ), 0    \
                ) as overall_rating,    \
                COALESCE(count(project_review.reviewer_name),0) AS Reviews  \
                from project_details pd    \
                LEFT JOIN project_rating ON pd.project_id = project_rating.project_id   \
                LEFT JOIN project_review On pd.project_id = project_review.project_id   \
                LEFT JOIN project_media pm ON pd.project_id = pm.project_id     \
                where pm.media_type='cover image' AND pd.status = 'approved' AND lower(pd.city)=lower('"+ city + "')   \
                GROUP BY pd.project_id, project_rating.overall_rating, pm.media_link    \
                order by overall_rating DESC";
                var results = await db.query(query);
                //console.log("Top Rated", results.rows);
                for (j = 0; j < results.rows.length; j++) {
                    var filter_sorted_by_project_id = results.rows[j].project_id;
                    //console.log("project_id:",filter_sorted_by_project_id);
                    filtered_project_ids_for_sort_by.push(filter_sorted_by_project_id);
                }

            }
            if (sort_by_value == "New projects") {
                var query = "Select pd.project_id, pd.project_name, pd.city, pd.area, \
                COALESCE(   \
                ROUND(  \
                (   \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id=pd.project_id),0)*1)+ \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id=pd.project_id),0)*2)+ \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id=pd.project_id),0)*3)+ \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id=pd.project_id),0)*4)+ \
                (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id=pd.project_id),0)*5)  \
                ::decimal \
                )/COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
                ),0 \
                ) as overall_rating, \
                pd.construction_status, pm.media_link,  \
                COALESCE(count(project_review.reviewer_name),0) AS Reviews  \
                from project_details pd   \
                LEFT JOIN project_rating ON pd.project_id = project_rating.project_id \
                LEFT JOIN project_review On pd.project_id = project_review.project_id \
                LEFT JOIN project_media pm ON pd.project_id = pm.project_id \
                where pm.media_type='cover image' AND pd.status = 'approved' AND \
                pd.construction_status = 'Under construction' AND lower(pd.city)=lower('"+ city + "')  \
                GROUP BY pd.project_id, project_rating.overall_rating, pm.media_link ";
                var results = await db.query(query);
                //console.log("New projects", results.rows);
                for (j = 0; j < results.rows.length; j++) {
                    var filter_sorted_by_project_id = results.rows[j].project_id;
                    //console.log("project_id:",filter_sorted_by_project_id);
                    filtered_project_ids_for_sort_by.push(filter_sorted_by_project_id);
                }
            }
        }

    }
    //------------------------------------------------------------------------------------------

    var all_filter_projectid = [];
    all_filter_projectid = intersect(filtered_project_ids_for_rating, filtered_project_ids_for_amenities);
    all_filter_projectid = intersect(all_filter_projectid, filtered_project_ids_for_property_type);
    all_filter_projectid = intersect(all_filter_projectid, filtered_project_ids_for_possesion_status);
    all_filter_projectid = intersect(all_filter_projectid, filtered_project_ids_for_budget);
    all_filter_projectid = intersect(all_filter_projectid, filtered_project_ids_for_sort_by);

    console.log("filtered_project_ids with city: ", all_filter_projectid);
    return all_filter_projectid;
}



function intersect(a, b) {
    if (a.length != 0 && b.length != 0) {
        // console.log("both array are having element");
        // console.log("array A:",a.length);
        // console.log("array B:",b.length);
        var d = {};
        var results = [];
        for (var i = 0; i < b.length; i++) {
            d[b[i]] = true;
        }
        for (var j = 0; j < a.length; j++) {
            if (d[a[j]])
                results.push(a[j]);
        }
        return results;
    }
    else {
        if (a.length != 0) {
            //console.log("Only A array are having element");
            return a;
        }
        else {
            //console.log("Only B array are having element");
            return b;
        }
    }
}


function find_date(duration) {
    if (duration == 'Ready') {
        var current_date = new Date();
        var year = current_date.getFullYear();
        var month = current_date.getMonth();
        var day = current_date.getDate();
        var new_date = new Date(year, month, day).toISOString().split('T')[0];
        return new_date;
    }

    else if (duration == '0-6 months') {
        var current_date = new Date();
        var year = current_date.getFullYear();
        var month = current_date.getMonth() + 6;
        var day = current_date.getDate();
        var new_date = new Date(year, month, day).toISOString().split('T')[0];
        return new_date;
    }

    else if (duration == '6-12 months') {
        var current_date = new Date();
        var year = current_date.getFullYear();
        var month = current_date.getMonth();
        var day = current_date.getDate();
        var new_date = new Date(year + 1, month, day).toISOString().split('T')[0];
        return new_date;
    }

    else if (duration == '1-2 years') {
        var current_date = new Date();
        var year = current_date.getFullYear();
        var month = current_date.getMonth();
        var day = current_date.getDate();
        var new_date = new Date(year + 2, month, day).toISOString().split('T')[0];
        return new_date;
    }

    else if (duration == '2+ years') {
        var current_date = new Date();
        var year = current_date.getFullYear();
        var month = current_date.getMonth();
        var day = current_date.getDate();
        var new_date = new Date(year + 15, month, day).toISOString().split('T')[0];
        return new_date;
    }

    else {
        var new_date = ""
        return new_date;
    }
}

// function that Fetch Project transction
async function get_project_transaction(request, response) {
    var project_id = request.params.id;
    //console.log("Project_id",project_id);
    var query = "select * from project_property_transaction where project_id ='" + project_id + "'";
    const results = await db.query(query);
    return response.json(results.rows);
}

// function that Fetch Project transction
async function update_user_profile(request, response) {
    console.log("XXXXXXXXXX", request.body);
    if (request.body.password == null) {
        console.log("XXXXXXXXXX Password was found null");
        var name = request.body.name;
        var gender = request.body.gender;
        var dob = request.body.date_of_birth;
        var martial_status = request.body.martial_status;
        var phone_no = request.body.phone_no;
        var email = request.body.email;
        var city = request.body.city;
        var state = request.body.state;

        if (dob == 'dd/mm/yyyy') {
            dob = '';
        }
        if (gender == null) {
            gender = '';
        }
        if (martial_status == null) {
            martial_status = '';
        }

        var query = "UPDATE visitor_user SET name='" + name + "', gender='" + gender + "',\
        phone="+ phone_no + ", city='" + city + "', dob='" + dob + "', state_='" + state + "', \
        marital='"+ martial_status + "' WHERE email='" + email + "'";
        var results = await db.query(query);
        console.log("Profile Data is Updated for emial: ", email);
        response.json({ "Response": "Success" });

    }
    else {
        var name = request.body.name;
        var gender = request.body.gender;
        var password = request.body.password;
        var password_hash = bcrypt.hashSync(password, 10);
        var dob = request.body.date_of_birth;
        var martial_status = request.body.martial_status;
        var phone_no = request.body.phone_no;
        var email = request.body.email;
        var city = request.body.city;
        var state = request.body.state;

        if (dob == 'dd/mm/yyyy') {
            dob = '';
        }
        if (gender == null) {
            gender = '';
        }
        if (martial_status == null) {
            martial_status = '';
        }

        //console.log("-------",password_hash);
        var query = "UPDATE visitor_login SET password='" + password_hash + "' WHERE email='" + email + "'";
        var results = await db.query(query);
        //console.log("+++++++++",results.rowCount);
        if (results.rowCount == 1) {
            var query = "UPDATE visitor_user SET name='" + name + "', gender='" + gender + "',\
            phone="+ phone_no + ", city='" + city + "', dob='" + dob + "', state_='" + state + "', \
            marital='"+ martial_status + "' WHERE email='" + email + "'";
            var results = await db.query(query);
            console.log("Profile Data is Updated for emial: ", email);
            response.json({ "Response": "Success" });
        }
        else {
            response.json({ "Response": "Incorrect EmailId" });
        }
    }
}

// function that Saves Project Payment Transction
async function save_payment(request, response) {
    console.log("Data", request.body);
    var project_id = request.body.project_id;
    var card_holder_name = request.body.name;
    var email = request.body.email;
    var amount = request.body.amount;

    var query = "INSERT INTO project_payment( project_id, card_holder_name, email, amount)\
    VALUES ('"+ project_id + "', '" + card_holder_name + "', '" + email + "', '" + amount + "')";
    await db.query(query);
    return response.json({ "Response": "Success" });
}


// function that Saves Project Comments 
async function save_comment(request, response) {
    //console.log("Data:",request.body);
    var comment = request.body.comment;
    var review_id = request.body.review_id;
    var email = request.body.email;
    var name = request.body.name;
    var date = new Date().toISOString().split('T')[0];
    var current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

    var query = "INSERT INTO project_review_comment( email, name, review_id, comment, comment_date, comment_time, status)\
    VALUES ('"+ email + "', '" + name + "', '" + review_id + "', '" + comment + "', '" + date + "', '" + current_time + "', 'unapproved')";
    var result = await db.query(query);
    //console.log(result);
    if (result.rowCount == 1) {
        return response.json({ "Response": "Success" });
    }
    else {
        return response.json({ "Response": "Fail" });
    }
}


// function that Saves location Review Comments 
async function save_location_review_comment(request, response) {
    //console.log("Data:",request.body);
    var comment = request.body.comment;
    var location_review_id = request.body.location_review_id;
    var email = request.body.email;
    var name = request.body.name;
    var date = new Date().toISOString().split('T')[0];
    var current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

    var query = "INSERT INTO project_location_review_comment( email, name, location_review_id, comment, comment_date, comment_time, status)\
    VALUES ('"+ email + "', '" + name + "', '" + location_review_id + "', '" + comment + "', '" + date + "', '" + current_time + "', 'unapproved')";
    var result = await db.query(query);
    //console.log(result);
    if (result.rowCount == 1) {
        return response.json({ "Response": "Success" });
    }
    else {
        return response.json({ "Response": "Fail" });
    }
}


// function that fetch sub comments 
async function fetch_sub_comments(request, response) {
    // console.log("Data:",request.body);
    var review_id = request.body.review_id;
    var query = "Select * from project_review_comment where review_id = '" + review_id + "'";
    var result = await db.query(query);
    return response.json(result.rows);
}

// function that fetch sub comments 
async function fetch_location_sub_comments(request, response) {
    // console.log("Data:",request.body);
    var location_review_id = request.body.location_review_id;
    var query = "Select * from project_location_review_comment where location_review_id = '" + location_review_id + "'";
    var result = await db.query(query);
    return response.json(result.rows);
}

// function that fetch galery media for location page  
async function fetch_user_media_for_location_page(request, response) {
    console.log("Data:", request.params);
    var loc_id = request.params.id;
    var query = "select 'User' AS given_by, pplp.post_media as media_link, post_id, post_time, post_title from project_post_location_pictures pplp \
     where pplp.status != 'unapproved' AND pplp.location_id = '"+ loc_id + "'";
    var result = await db.query(query);
    return response.json(result.rows);
}

// function that fetch management galery media for location page  
async function fetch_management_media_for_location_page(request, response) {
    console.log("Data:", request.params.id);
    var loc_id = request.params.id;
    var query = "select 'Management' AS given_by, media_link from project_location_media \
     where location_id = '"+ loc_id + "'";
    var result = await db.query(query);
    return response.json(result.rows);
}

// verify non resigistered user with mail to show review.
async function verify_unregis_user(request, response) {
    console.log("Data:", request.params.id);
    var user_id = request.params.id;
    var query = "select userid from visitor_user where email = '" + user_id + "'";
    var result = await db.query(query)
    var db_userid = result.rows[0].userid;
    var update_query = "UPDATE project_review SET email_varified = 'true' WHERE reviewer_id='" + db_userid + "'";
    var result = await db.query(update_query)
    return response.redirect("https://www.propviewz.com/");
}

// this function store the favorite project of the user
async function save_favorite_project(request, response) {
    //console.log("Data:",request.body);
    var email = request.body.email;
    var project_id = request.body.project_id;
    var sel_query = "Select * from favorite_projects where project_id = '" + project_id + "' And user_email = '" + email + "'";
    var result = await db.query(sel_query);
    if (result.rowCount == 0) {
        var query = "INSERT INTO public.favorite_projects(project_id, user_email) VALUES ('" + project_id + "', '" + email + "')";
        await db.query(query);
        //console.log("favorite_project is added");
        return response.json({ "Response": "Success", "Action": "Added" });
    }
    else {
        var del_query = "delete from favorite_projects where project_id = '" + project_id + "' And user_email = '" + email + "'";
        await db.query(del_query);
        //console.log("favorite_project is removed");
        return response.json({ "Response": "Success", "Action": "Removed" });
    }

}

// this function store user for subscribtion
async function save_user_subscribe(request, response) {
    //console.log("Data:",request.body);
    var email = request.body.email;
    var query = "INSERT INTO subscribe_user(user_email) VALUES ('" + email + "')";
    await db.query(query);
    return response.json({ "Response": "Success" });
}

// this function checks if project id is maked as favorite by user
async function check_favorite(request, response) {
    //console.log("Data:",request.body);
    var email = request.body.email;
    var project_id = request.body.project_id;
    var query = "select * from favorite_projects where user_email = '" + email + "' AND project_id = '" + project_id + "' Limit 1";
    var result = await db.query(query);
    console.log("RESULT", result.rowCount);
    if (result.rowCount == 0) {
        return response.json({ "Response": "Fail" });
    }
    else {
        return response.json({ "Response": "Success" });
    }

}

// this function fetch project id is maked as favorite by user
async function fetch_favorite_by_user(request, response) {
    //console.log("Data:",request.body);
    var email = request.body.email;
    var query = "select pd.project_id, pd.project_name, pm.media_link as cover_image, pd.city, \
    pd.area, pd.sub_area, COALESCE((Count(p_review.reviewer_name)),0) as review_count,    \
    COALESCE( \
    ROUND( \
    (   \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='1' and project_id= pd.project_id),0)*1)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='2' and project_id= pd.project_id),0)*2)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='3' and project_id= pd.project_id),0)*3)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='4' and project_id= pd.project_id),0)*4)+ \
    (COALESCE((select Count(overall_rating) from project_review where overall_rating='5' and project_id= pd.project_id),0)*5)  \
    ::decimal   \
    )/COALESCE((select Count(review) from project_review where project_id=pd.project_id HAVING COUNT(review) > 1 ),1),2    \
    ),0 \
    ) as overall_rating,    \
    pd.developer_name , pd.construction_status \
    from project_details pd INNER JOIN project_media pm ON pd.project_id = pm.project_id \
    INNER JOIN favorite_projects fp ON fp.project_id = pd.project_id \
    Left Join project_review p_review on p_review.project_id = pd.project_id \
    where pm.media_type = 'cover image' AND fp.user_email ='"+ email + "' AND pd.status='approved' \
    GROUP BY pd.project_id,pm.media_link ";
    var results = await db.query(query);
    return response.json(results.rows);
}


// Fetch All Publish Blog
async function fetch_publish_blog(request, response) {
    var query = "select * from user_blogs Inner Join user_blogs_media On \
    user_blogs_media.blog_id = user_blogs.blog_id   \
    where blog_type = 'publish'";
    var results = await db.query(query);
    return response.json(results.rows);
}

// Fetch User Blog with BlogId
async function fetch_blog_with_id(request, response) {
    var id = request.body.blog_id;
    var query = "select ub.blog_id, ub.blog_title, ub.blog, ub.created_at, vu.name, ub.user_id,\
     ub.email, ub.blog_type, user_blogs_media.media_link from user_blogs ub \
     Inner Join user_blogs_media On user_blogs_media.blog_id = ub.blog_id   \
     Inner JOIN visitor_user vu ON vu.userid = ub.user_id where ub.blog_id = '"+ id + "'";
    var results = await db.query(query);
    return response.json(results.rows);
}


// Delete User Blog with BlogId
async function delete_blog_with_id(request, response) {
    var id = request.body.blog_id;
    var query = "delete from user_blogs_media where blog_id = '" + id + "'";
    await db.query(query);
    var query = "delete from user_blogs where blog_id = '" + id + "'";
    await db.query(query);
    return response.json({ "Response": "Success" });
}

// Delete User delete_favorite_by_user
async function delete_favorite_by_user(request, response) {
    var email = request.body.email;
    var project_id = request.body.project_id;
    var query = "delete from favorite_projects where project_id = '" + project_id + "' AND user_email = '" + email + "'";
    await db.query(query);
    return response.json({ "Response": "Success" });
}

// Delete User delete_favorite_by_user
async function count_page_visit(request, response) {
    var project_id = request.params.id;
    var sel_query = "select * from most_trending_project where project_id='" + project_id + "' Limit 1";
    var sel_result = await db.query(sel_query);
    //console.log("sel_result:",sel_result.rowCount);
    if (sel_result.rowCount == 1) {
        var visit_count = sel_result.rows[0].visit_count;
        //console.log("visit_count:",visit_count);
        var new_visit_count = visit_count + 1;
        //console.log("new_visit_count:",new_visit_count);
        var update_query = "UPDATE most_trending_project SET visit_count='" + new_visit_count + "' WHERE project_id='" + project_id + "'";
        await db.query(update_query);
    }
    else {
        var insert_query = "INSERT INTO public.most_trending_project(project_id, visit_count)VALUES ('" + project_id + "', '1')";
        await db.query(insert_query);
    }
    return response.json({ "Response": "Success" });
}


// fetch all the voters emailid who clicked helpful
async function fetch_helpful_voters(request, response) {
    var email = request.body.email_id;
    var project_id = request.body.project_id;
    var query = "select review_id from review_voters where email_id = '" + email + "' AND project_id='" + project_id + "'";
    var result = await db.query(query);
    return response.json(result.rows);
}

// fetch all the voters emailid who clicked helpful for location
async function fetch_location_helpful_voters(request, response) {
    var email = request.body.email_id;
    var location_id = request.body.location_id;
    //console.log("fetch_location_helpful_voters",request.body);
    var query = "select location_review_id from project_location_review_voters where \
    email_id = '" + email + "' AND location_id='" + location_id + "'";
    //console.log(query);
    var result = await db.query(query);
    return response.json(result.rows);
}



// Export modules. so they can be excessed.
module.exports = {
    viewProjects, projectMedia, projectDetails, projectReview, projectConfig, project_amenities,
    projectSuggested, projectTransaction, review_info, save_reported_review, helpful_increment, fetch_search, developer_info,
    fetch_project_name_and_location, location_page_area_details, location_page_map_link, location_page_location_review,
    location_page_trending_projects, geo_location_projects, fetch_user_photos, location_page_filter, project_city, get_project_transaction,
    update_user_profile, save_payment, save_comment, fetch_sub_comments, fetch_user_media_for_location_page, check_favorite,
    fetch_management_media_for_location_page, projectTransaction_new, verify_unregis_user, save_favorite_project, save_user_subscribe,
    fetch_favorite_by_user, fetch_publish_blog, recent_launched_geo_location_projects, most_trending_geo_location_projects,
    fetch_blog_with_id, delete_blog_with_id, delete_favorite_by_user, count_page_visit, fetch_helpful_voters, save_location_review_comment,
    fetch_location_sub_comments, helpful_location_review, fetch_location_helpful_voters, save_location_reported_review,
    location_review_info, location_media
};