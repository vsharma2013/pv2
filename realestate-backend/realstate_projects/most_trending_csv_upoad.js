var express = require('express');
var router = express.Router();
var multer = require('multer');
// calling of database file
const db = require("../config/db");
const fs = require('fs')

xlsxj = require("xlsx-to-json");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Csv_Bulk_uploads/');
    },
    filename: (req, file, cb) => {
        //console.log(file);
        cb(null, Date.now() + Date.now() + "_" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: fileFilter });


router.post('/', upload.fields([{ name: 'bulk_data', maxCount: 1 }]), async function (req, res) {
    var file_path = req.files.bulk_data[0].path;
    console.log("FilePath : ",file_path); // the uploaded file object

    xlsxj({
        input: file_path,
        output: "CSV_most_trending.json",
        sheet: "Dataset1"
    }, async function (err, result) {
        if (err) {
            console.error(err);
        } else {
           //console.log(result);
           const json_fetched = JSON.parse(JSON.stringify(result));
           
            for (i in json_fetched) 
            {
                var trending_project_id = json_fetched[i]['Page path level 2'].replace("/","");
                var trending_page_count = json_fetched[i]['Page Views'].replace("/","")
                console.log("trending_project_id: ",trending_project_id);
                console.log("trending_page_count: ",trending_page_count);
                if(trending_project_id !="")
                {
                    var query = "select project_id from most_trending_project where project_id='"+trending_project_id+"'";
                    var results = await db.query(query);
                    //console.log("results: ",results.rowCount);
                    if (results.rowCount == 0){
                        var insert_query = "INSERT INTO public.most_trending_project(project_id, visit_count) \
                        VALUES ('"+trending_project_id+"', '"+trending_page_count+"')";
                        await db.query(insert_query);
                        console.log("One Row Inserted For Most Trending Project");
                    }
                    else
                    {
                        var update_query = "UPDATE public.most_trending_project SET visit_count='"+trending_page_count+"' \
                        WHERE project_id = '"+trending_project_id+"'";
                        await db.query(update_query);
                        console.log("One Row Updated For Most Trending Project")
                    }
                }
            }

            try {
                fs.unlinkSync(file_path)
                //file removed
              } catch(err) {
                console.error(err)
              }
        }
    });

    return res.redirect(backend_url+'/management/success_most_trending');
});

module.exports = router;