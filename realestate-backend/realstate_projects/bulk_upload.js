var express = require('express');
var router = express.Router();
var multer = require('multer');
var aws = require('aws-sdk');
// calling of database file
const db = require("../config/db");
const fs = require('fs');
const StreamZip = require('node-stream-zip');
const config_var = require('../config/config_var');
const extract = require('extract-zip')
const delay = require('delay');
const compress_images = require("compress-images");

xlsxj = require("xlsx-to-json");
//---------- Image compression --------------

async function MyFun(media_file_path, media_name_for_compress) {
    await compress_images(
        media_file_path,
        "./compressed/extracted/" + media_name_for_compress,
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        {
            gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
        },
        function (err, completed) {
            if (completed === true) {
                // Doing something.
            }
            if (err === null) {

            }
        }
    );
}
// -------------- S3 Bucket Configuration---------
const s3 = new aws.S3({
    accessKeyId: config_var.AWS_accessKeyId,
    secretAccessKey: config_var.AWS_secretAccessKey
});

//------------------------------------------------------------------------

// -------------- Multer for Saving Excel Sheet and media Folder for reading---------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //cb(null, 'Csv_Bulk_uploads/');
        fs.mkdir('./Csv_Bulk_uploads/',(err)=>{
            cb(null, './Csv_Bulk_uploads/');
        });
    },
    filename: (req, file, cb) => {
        //console.log(file);
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
}
const upload = multer({ storage: storage, fileFilter: fileFilter });
//------------------------------------------------------------------------

router.post('/', upload.fields([{ name: 'bulk_data_1', maxCount: 1 }, { name: 'media_folder', maxCount: 1 }]), async function (req, res) {
    var file_path_1 = req.files.bulk_data_1[0].path;
    var media_folder_path = req.files.media_folder[0].path;
    console.log("FilePath_1 : ", file_path_1); // the uploaded file object
    console.log("media_folder Path : ", media_folder_path);

    await delete_old_extracted_folder();

    await delay(2000);

    await delete_old_compressed_folder();

    await delay(2000);

    await extract_folder(media_folder_path);

    await delay(2000);

    await xlsxj({
        input: file_path_1,
        output: "output2.json",
        sheet: "Sheet2"
    }, function (err, result) {
        if (err) {
            console.error("Can not read excel file");
            console.error(err);
        } else {
            console.log("Reading File 2....");
            // process_sheet_2(result);
        }
    });

    await xlsxj({
        input: file_path_1,
        output: "output1.json",
        sheet: "Sheet1"
    }, async function (err, result) {
        if (err) {
            console.error("Can not read excel file");
            console.error(err);
        } else {
            console.log("Reading File 1....");
            var data_checking = await test_sheet(result, media_folder_path);
            //var data_checking = 1;
            if (data_checking == 1) {
                console.log("Data Checking:", data_checking + ", Error In the Sheet Or Folder.");
                try {

                    fs.unlinkSync(media_folder_path);
                    //file removed
                } catch (err) {
                    console.error(err)
                }
                return res.redirect(backend_url + '/management/bulk_upload_failed');
            }
            else {
                console.log("Data Checking:", data_checking + ", Correct Excel Sheet Or Folder.");
                process_sheet_1(result, media_folder_path, file_path_1);
                return res.redirect(backend_url + '/management/bulk_upload_success');
            }
        }
    });

    //return res.json({ "Response": "Success" });
});

async function extract_folder(media_folder_path) {
    var source = __basedir + "/" + media_folder_path;
    var extracted_path = __basedir + "/extracted";
    //console.log(extracted_path)
    try {
        await extract(source, { dir: extracted_path })
        console.log('------New Extraction complete-----\n')
    } catch (err) {
        console.log('Extraction Error:', err)
    }
}


async function process_sheet_1(result, media_folder_path, file_path_1) {
    //console.log(result);
    for (item in result) {
        //console.log("From Sheet 1:",result[item]["Project Name"])
        var pro_name = result[item]["Project Name"].replace(/'/g, "''");
        var pro_country = result[item]["Country"].replace(/'/g, "''");
        var pro_state = result[item]["State"].replace(/'/g, "''");
        var pro_city = result[item]["City"].replace(/'/g, "''");
        var pro_area = result[item]["Area"].replace(/'/g, "''");
        var pro_sub_area = result[item]["Sub-Area"].replace(/'/g, "''");
        var property_type = result[item]["Property type"].replace(/'/g, "''");
        var posession_date_as_rera = result[item]["Possession Date As Per Rera"].replace(/'/g, "''");
        var pro_add = result[item]["Address"].replace(/'/g, "''");
        var dev_email = result[item]["Developer Email"].replace(/'/g, "''");
        var dev_name = result[item]["Developer Name"].replace(/'/g, "''");
        var dev_mob_no = result[item]["Developer Phone Number"].replace(/'/g, "''");
        var developer_entity = result[item]["Developer Entity"].replace(/'/g, "''");
        var brand = result[item]["Brand"].replace(/'/g, "''");
        var map_link = result[item]["Google Map link"].replace(/'/g, "''");
        var rera_no = result[item]["Rera Number"].replace(/'/g, "''");
        var rera_link = result[item]["Rera link"].replace(/'/g, "''");
        var no_of_buildings = result[item]["No. of Buildings"];
        var brief_desc = result[item]["Brief Discription"].replace(/'/g, "''");
        var review_link = result[item]["google_review_link"].replace(/'/g, "''");
        var FolderId = result[item]["FolderId"].replace(/'/g, "''");
        var year = result[item]["year"].replace(/'/g, "''");
        var district = result[item]["district"].replace(/'/g, "''");
        var tahsil = result[item]["tahsil"].replace(/'/g, "''");
        var village = result[item]["village"].replace(/'/g, "''");
        var property_no = result[item]["property_no"];
        var property_marathi_name = result[item]["property_marathi_name"].replace(/'/g, "''");
        var rest_of_maharastra = result[item]["rest_of_maharastra"];
        var kids_play_area = result[item]['kids play area'];
        var indoor_games = result[item]["indoor games"];
        var garden = result[item]["garden"];
        var Swimming_pool = result[item]["Swimming pool"];
        var outdoor_games = result[item]["outdoor games"];
        var gym = result[item]["gym"];
        var final_construction_status = '';
        var posession_date = '';

        if (pro_name != '') {
            if (posession_date_as_rera == "") {
                posession_date_as_rera = "N/A";
            }
            //find the location ID
            var query = "select location_id from project_location where lower(area)=lower('" + pro_area + "')";
            const results = await db.query(query);

            var location_id = "";
            if (results.rows.length == 1) {
                location_id = results.rows[0].location_id;
                //console.log("Location ID Already Found..... Id=> ",location_id);
            }
            else {
                var query = "insert into project_location(area) Values ('" + pro_area + "') RETURNING location_id";
                const results = await db.query(query);
                location_id = results.rows[0].location_id;
                var query = "insert into project_location_rating Values ('" + location_id + "','0','0','0','0','0','0')";
                await db.query(query);
                //console.log("Location ID Created.....");
            }


            var sel_query = "select * from project_details where project_name = '" + pro_name + "' AND area ='" + pro_area + "' AND sub_area ='" + pro_sub_area + "' ";
            var query_result = await db.query(sel_query);
            //console.log("query_result:", query_result.rows[0].project_id);

            // var proj_id = query_result.rows[0].project_id;
            // var del_query = "delete from project_media where project_id = '" + proj_id + "'";
            // await db.query(del_query);

            if (query_result.rowCount >= 1) {
                console.log("------Project Already Found with project name => ", pro_name);
                console.log("\n");
            }
            else {
                // Creating project Details...
                var query = "Insert Into project_details (project_name, country, state, city, area, sub_area, location_id, \
                property_type, construction_status, developer_email, developer_name, developer_phone_no, developer_entity, \
                brand, google_map_link, rera_no, rera_link, possession_date_as_rera, no_of_buildings, brief_dics, status, google_review_link ) \
                Values('"+ pro_name + "','" + pro_country + "','" + pro_state + "','" + pro_city + "','" + pro_area + "','" + pro_sub_area + "','" + location_id + "','" + property_type + "',  \
                '"+ final_construction_status + "','" + dev_email + "','" + dev_name + "','" + dev_mob_no + "','" + developer_entity + "',\
                '"+ brand + "','" + map_link + "','" + rera_no + "','" + rera_link + "','" + posession_date_as_rera + "','" + no_of_buildings + "','" + brief_desc + "', 'approved', '" + review_link + "') RETURNING project_id ";

                var project_id = await db.query(query);
                var project_id = project_id.rows[0].project_id;

                // inserting project Address...
                var query = "Insert Into project_address Values('" + project_id + "','" + pro_add + "')";
                await db.query(query);

                var Amenities = [];
                if (kids_play_area.toLowerCase() == 'yes') {
                    Amenities.push('Kids Play Area');
                }
                if (indoor_games.toLowerCase() == 'yes') {
                    Amenities.push('Indoor Games');
                }
                if (garden.toLowerCase() == 'yes') {
                    Amenities.push('Garden');
                }
                if (Swimming_pool.toLowerCase() == 'yes') {
                    Amenities.push('Swimming pool');
                }
                if (outdoor_games.toLowerCase() == 'yes') {
                    Amenities.push('Outdoor Games');
                }
                if (gym.toLowerCase() == 'yes') {
                    Amenities.push('Gym');
                }

                // inserting project Amenities...
                for (Amenities_item in Amenities) {
                    var query = "Insert Into project_amenities Values('" + project_id + "','" + Amenities[Amenities_item] + "')";
                    await db.query(query);
                }

                // inserting Default project rating at the time of creating project...
                var query = "Insert Into project_rating Values('" + project_id + "','0','0','0','0','0','0')";
                await db.query(query);

                // inserting project transactions...
                var query = "Insert Into project_property_transaction Values('" + project_id + "','" + year + "','" + district + "','" + tahsil + "','" + village + "','" + property_no + "','" + property_marathi_name + "','" + rest_of_maharastra + "')";
                await db.query(query);

                console.log("--------New Project Created With Project Name => ", pro_name);
                console.log("\n");
            }

        }
    }
    //inserting project configuration...
    let rawdata = fs.readFileSync(__basedir + "/output2.json");
    let pro_config = JSON.parse(rawdata);
    await process_sheet_2(pro_config);

    await prosess_media_folder(media_folder_path, file_path_1);
}

async function process_sheet_2(result) {
    //console.log(result);
    var project_ids_found = [];
    for (item in result) {
        var pro_name_x = result[item]["project Name"].replace(/'/g, "''");
        var Phase = result[item]["Phase"].replace(/'/g, "''");
        var configuration = result[item]["configuration"].replace(/'/g, "''");
        var price_range = result[item]["price_range (In lakhs)"];
        var possesion_date = result[item]["possesion_date"].replace(/'/g, "''");
        var min_price = parseInt(result[item]["min_price (In lakhs)"]).toString();
        var max_price = parseInt(result[item]["max_price (In lakhs)"]).toString();
        var Construction_status = result[item]["Construction status"].replace(/'/g, "''");
        var Rera_Number = result[item]["Rera Number"].replace(/'/g, "''");
        //console.log("From Sheet 2:",pro_name_x);
        var proj_id_query = "select COALESCE((select project_id from project_details where project_name = '" + pro_name_x + "'),null) as project_id";
        var result_id = await db.query(proj_id_query);
        var project_id = result_id.rows[0].project_id;
        project_ids_found.push(project_id);
        //console.log("*****************",project_id); 
        if (project_id != null) {
            min_price = Number(min_price.replace(/,/g, ""));
            max_price = Number(max_price.replace(/,/g, ""));

            var project_price = changeNumberFormat(min_price) + " ₹ to " + changeNumberFormat(max_price) + " ₹";
            console.log(project_price + " For " + configuration + " ----> " + Phase);
            // var update = "UPDATE public.project_configuration SET min_price='" + min_price + "', max_price='" + max_price + "', price_range='" + project_price + "' \
            // WHERE project_id='" + project_id + "' AND project_phase = '" + Phase + "' AND configuration = '" + configuration + "' ";
            // await db.query(update);
            var query = "INSERT INTO public.project_configuration(project_id, project_phase, configuration, price_range, \
            possesion_date, min_price, max_price, construction_status, rera_number)\
            VALUES ('"+ project_id + "', '" + Phase + "', '" + configuration + "', '" + project_price + "', '" + possesion_date + "', '" + min_price + "', \
            '"+ max_price + "', '" + Construction_status + "', '" + Rera_Number + "');";
            await db.query(query);
            console.log("New Project Configuration Added for projectId..", project_id);
        }
    }
    project_ids_found = project_ids_found.filter(Boolean);
    //Remove the repeating ids from the array
    project_ids_found = project_ids_found.filter(function (item, index, inputArray) {
        return inputArray.indexOf(item) == index;
    });
    console.log(project_ids_found);

    for (id in project_ids_found) {
        console.log("XXXXXXX", project_ids_found[id]);
        var construction_status_arry = [];
        var final_construction_status = '';
        var sel_qury = "select construction_status from project_configuration where project_id ='" + project_ids_found[id] + "'";
        var result = await db.query(sel_qury);
        var length_of_status = result.rows.length;
        for (i = 0; i < length_of_status; i++) {
            construction_status_arry.push(result.rows[i].construction_status);
        }
        if (construction_status_arry.includes("Ready Possession")) {
            final_construction_status = "Ready Possession";
        }
        else {
            final_construction_status = "Under construction";
        }

        var in_query = "update project_details SET construction_status='" + final_construction_status + "' \
        where project_id ='" + project_ids_found[id] + "'";
        await db.query(in_query);
        console.log("Updating Constrction Status:" + final_construction_status + ", For projectId: " + project_ids_found[id]);
    }

}


async function prosess_media_folder(media_folder_path, file_path_1) {
    const zip = new StreamZip({
        file: __basedir + "/" + media_folder_path,
        storeEntries: true
    });

    zip.on('ready', async function () {
        //console.log('Entries read: ' + zip.entriesCount);
        console.log("----Creating the compressed folder------");
        for (const entry of Object.values(zip.entries())) {
            var media_file_path_for_compress = __basedir + "/extracted/" + entry.name;
            var media_name_for_compress = entry.name;
            console.log("media_name_for_compress", media_name_for_compress);
            await MyFun(media_file_path_for_compress, media_name_for_compress);
            await delay(800);
        }
        console.log('\n ---------------Compression completed---------\n');

        for (const entry of Object.values(zip.entries())) {

            if (!entry.isDirectory) {
                var orignal_directory_name = entry.name;
                var directory_name = orignal_directory_name.split("/")[1];
                //console.log('\nDirectory:', directory_name);

                var query_proj_id = "select COALESCE( (select project_id from project_details where \
                lower(project_name) = lower('"+ directory_name + "') LIMIT 1),null) as project_id";
                var result_id = await db.query(query_proj_id);
                result_id = result_id.rows[0].project_id;
                console.log("\nFor Folder Name: " + directory_name + ", We Found ProjectId: ", result_id);

                if (result_id != null) {
                    var media_file_folder = orignal_directory_name.split("/")[2];
                    console.log("Folder Type: ", media_file_folder);


                    if (media_file_folder.toLowerCase() == "cover_photo") {
                        //console.log("Found Cover photo folder"); 
                        var file_url = entry.name;
                        console.log(file_url);
                        console.log(entry.name);
                        var file_extension = file_url.split('.').pop();
                        var file_name = file_url.split('/').pop();
                        console.log("***********", file_name);
                        //Read content from the file
                        //const fileContent = fs.readFileSync(__basedir + "/extracted/" + file_url);

                        try {
                            //Read content from the file
                            const fileContent = fs.readFileSync(__basedir + "/compressed/extracted/" + file_url + file_name);

                            // Setting up S3 upload parameters
                            const params = {
                                Bucket: config_var.AWS_bucketName,
                                Key: "Project_Photos/ProjectId_" + result_id + "/" + Date.now() + "." + file_extension, // File name you want to save as in S3
                                Body: fileContent
                            };

                            var query_media_typ = "select COALESCE( (select media_type from project_media where project_id = '" + result_id + "' And \
                            lower(media_type)=Lower('cover image')),null) as media_type";
                            var result_media_type = await db.query(query_media_typ);
                            var result_media_type = result_media_type.rows[0].media_type;
                            if (result_media_type == null) {
                                // Uploading files to the bucket
                                const stored = await s3.upload(params).promise()
                                //console.log(stored.Location);
                                var cover_img_location = stored.Location;
                                var insert_query = "Insert Into project_media Values('" + result_id + "','" + cover_img_location + "','Management','cover image','N/A')";;
                                await db.query(insert_query);
                                console.log("One Cover Image is Uploaded for Project_id:", result_id);
                            }
                            else {
                                // Uploading files to the bucket
                                const stored = await s3.upload(params).promise()
                                //console.log(stored.Location);
                                var cover_img_location = stored.Location;
                                var update_query = "Update project_media SET media_link ='" + cover_img_location + "' where project_id='" + result_id + "' AND media_type ='cover image' ";
                                await db.query(update_query);
                                console.log("Cover Image updated fro projectid:", result_id);
                            }
                        } catch (err) {
                            console.log(err)
                        }

                    }

                    else if (media_file_folder.toLowerCase() == "gallery_images") {
                        //console.log("Found Gallery photo folder"); 
                        var file_url = entry.name;
                        console.log(file_url);
                        var file_extension = file_url.split('.').pop();
                        var file_name = file_url.split('/').pop();

                        try {
                            //Read content from the file
                            const fileContent = fs.readFileSync(__basedir + "/compressed/extracted/" + file_url + file_name);

                            // Setting up S3 upload parameters
                            const params = {
                                Bucket: config_var.AWS_bucketName,
                                Key: "Project_Photos/ProjectId_" + result_id + "/" + Date.now() + "." + file_extension, // File name you want to save as in S3
                                Body: fileContent
                            };
                            // Uploading files to the bucket

                            const stored = await s3.upload(params).promise()
                            //console.log(stored.Location);
                            var gallery_img_location = stored.Location;
                            var insert_query = "Insert Into project_media Values('" + result_id + "','" + gallery_img_location + "','Management','gallery image','N/A')";;
                            await db.query(insert_query);
                            console.log("One Gallery Image is Uploaded for Project_id:", result_id);
                        } catch (err) {
                            console.log(err)
                        }
                    }
                    else if (media_file_folder.toLowerCase() == "floor_plan") {
                        //console.log("Found Floor photo folder"); 
                        var file_url = entry.name;
                        console.log(file_url);
                        var file_extension = file_url.split('.').pop();
                        var file_name = file_url.split('/').pop();

                        try {
                            //Read content from the file
                            const fileContent = fs.readFileSync(__basedir + "/compressed/extracted/" + file_url + file_name);
                            // Setting up S3 upload parameters
                            const params = {
                                Bucket: config_var.AWS_bucketName,
                                Key: "Project_Photos/ProjectId_" + result_id + "/" + Date.now() + "." + file_extension, // File name you want to save as in S3
                                Body: fileContent
                            };
                            // Uploading files to the bucket

                            const stored = await s3.upload(params).promise()
                            //console.log(stored.Location);
                            var floor_img_location = stored.Location;
                            var insert_query = "Insert Into project_media Values('" + result_id + "','" + floor_img_location + "','Management','floor image','N/A')";;
                            await db.query(insert_query);
                            console.log("One Floor Image is Uploaded for Project_id:", result_id);
                        } catch (err) {
                            console.log(err)
                        }
                    }

                }
            }

        }
        // Do not forget to close the file once you're done
        zip.close();
        try {
            fs.unlinkSync(file_path_1);
            //file removed
        } catch (err) {
            console.error(err)
        }
        try {

            fs.unlinkSync(media_folder_path);
            //file removed
        } catch (err) {
            console.error(err)
        }
        await delete_old_csv_folder();
        await set_default_cover_images();
        console.log("\n************* Media Folders Successfully Uploaded ***************\n");
    });

}

async function delete_old_csv_folder() {
    var path = "Csv_Bulk_uploads";
    try {
        var rimraf = require("rimraf");
        await rimraf(path, function () { console.log("\n----------OLd Csv_Bulk_uploads Folder is deleted----\n"); });
    }
    catch {
        console.log(`\n-------Csv_Bulk_uploads Folder Not Folund------\n`);
    }

}

async function delete_old_extracted_folder() {
    var path = "extracted";
    try {
        var rimraf = require("rimraf");
        await rimraf(path, function () { console.log("\n----------OLd Extracted Folder is deleted----\n"); });
    }
    catch {
        console.log(`\n-------Extracted Folder Not Folund------\n`);
    }

}

async function delete_old_compressed_folder() {
    var path = "compressed";
    try {
        var rimraf = require("rimraf");
        await rimraf(path, function () { console.log("\n----------OLd Compressed Folder is deleted----\n"); });
    }
    catch {
        console.log(`\n-------Compressed Folder Not Folund------\n`);
    }

}

async function set_default_cover_images() {
    var query = "select pd.project_id from project_details pd \
    LEFT JOIN project_media pm ON pd.project_id = pm.project_id \
    where pm.media_link IS NULL"
    var result = await db.query(query);
    var result_len = result.rows.length;

    for (i = 0; i < result_len; i++) {
        var pro_id = result.rows[i].project_id;
        var cover_img_location = 'https://propadvisor.s3.amazonaws.com/logo.jpg';
        var insert_query = "Insert Into project_media Values('" + pro_id + "','" + cover_img_location + "','Management','cover image','N/A')";;
        await db.query(insert_query);
        console.log("New Default Cover Photo Given for project_id: ", pro_id);
    }
}

function changeNumberFormat(number, decimals, recursiveCall) {
    const decimalPoints = decimals || 2;
    const noOfLakhs = number / 100000;
    let displayStr;
    let isPlural;


    // Rounds off digits to decimalPoints decimal places
    function roundOf(integer) {
        return +integer.toLocaleString(undefined, {
            minimumFractionDigits: decimalPoints,
            maximumFractionDigits: decimalPoints,
        });
    }

    if (noOfLakhs >= 1 && noOfLakhs <= 99) {
        const lakhs = roundOf(noOfLakhs);
        isPlural = lakhs > 1 && !recursiveCall;
        displayStr = `${lakhs} Lakh${isPlural ? 's' : ''}`;
    } else if (noOfLakhs >= 100) {
        const crores = roundOf(noOfLakhs / 100);
        const crorePrefix = crores >= 100000 ? changeNumberFormat(crores, decimals, true) : crores;
        isPlural = crores > 1 && !recursiveCall;
        displayStr = `${crorePrefix} Crore${isPlural ? 's' : ''}`;
    } else {
        displayStr = roundOf(+number);
    }

    return displayStr;
}

async function test_sheet(result, media_folder_path) {
    console.log("\n------------------------------------------------")
    var folder_ids = [];
    var flag = 0;
    var project_names = [];
    //console.log(result);

    fs.open('./public/bulk_upload_log.txt', 'w', function (err, file) { });
    fs.truncate('./public/bulk_upload_log.txt', 0, function () { console.log('done') })

    for (item in result) {
        console.log("XXXX", result[item]["Project Name"]);
    }

    for (item in result) {
        var pro_name = result[item]["Project Name"];
        //console.log("From Sheet 1:",result[item]["Project Name"])
        var query = "select project_name from project_details";
        var result_sel = await db.query(query);
        var result_len = result_sel.rows.length;

        for (i = 0; i < result_len; i++) {
            var project_name = result_sel.rows[i].project_name;
            project_names.push(project_name);
        }
        project_names = project_names.filter(Boolean);

        if (project_names.includes(pro_name)) {
            console.log("Project Name: " + pro_name + ", Given In Excel Sheet Already Present In database.");
            fs.appendFile('./public/bulk_upload_log.txt', "Project Name: " + pro_name + ", Given In Excel Sheet Already Present In database.\n\n", function (err) {
                if (err) throw err;
                console.log('Updated!');
            });
            flag = 1;
        }
    }
    for (item in result) {
        //console.log("From Sheet 1:",result[item]["Project Name"])
        var pro_name = result[item]["Project Name"];
        var folder_id = result[item]["FolderId"];
        folder_ids.push(folder_id);
        console.log("Compairing ===> Project Name:" + pro_name + " , FolderId:" + folder_id);


        if (pro_name.toLowerCase() != folder_id.toLowerCase()) {
            console.log("Non Matching ===> Project Name:" + pro_name + " , FolderId:" + folder_id);
            console.log("\n");
            fs.appendFile('./public/bulk_upload_log.txt', "Excel Sheet Fould With Non Matching ===> Project Name:" + pro_name + " , FolderId:" + folder_id + "\n\n", function (err) {
                if (err) throw err;
                console.log('Updated!');
            });
            flag = 1;
        }
    }
    console.log("\n------------------------------------------------")
    //console.log("Folder Id from excel sheet:", folder_ids);
    const zip = new StreamZip({
        file: __basedir + "/" + media_folder_path,
        storeEntries: true
    });

    zip.on('ready', async function () {
        //console.log('Entries read: ' + zip.entriesCount);
        for (const entry of Object.values(zip.entries())) {

            if (!entry.isDirectory) {
                var orignal_directory_name = entry.name;
                directory_name = orignal_directory_name.split("/")[1];
                //console.log(`\nDirectory: ${directory_name}`);
                if (!folder_ids.includes(directory_name)) {
                    console.log("\n*****Folder Name: " + directory_name + ", Is Not Matching with Excel Sheet FolderId.*******");
                    fs.appendFile('./public/bulk_upload_log.txt', "Media Folder Name: " + directory_name + ", Is NOT Matching with Excel Sheet FolderId.\n\n", function (err) {
                        if (err) throw err;
                        console.log('Updated!');
                    });

                    flag = 1;
                }
            }
        }
        // Do not forget to close the file once you're done
        zip.close();
        console.log("Flag Value:", flag);
        console.log("\n****************************\n");
    });
    await delay(7000);
    return flag;
}

module.exports = router;