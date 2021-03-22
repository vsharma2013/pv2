
// calling express package
const express   = require("express");
// calling Express Routes 
const router    = express.Router();

// Fetch all the review information avilable on Google
router.get("/google_review/", async function(req, res) {

    try{
        var spawn = require("child_process").spawn; 
        var py_script = __basedir+"/realestate_python/Google_review_scraping/scraper.py";
        
        console.log("Python Script Path:",py_script);

        var process = spawn('python3',[py_script] ); 

        // Takes stdout data from script which executed 
        // with arguments and send this data to res object 
        process.stdout.on('data', function(data) { 
            console.log(data.toString()); 
            //res.json({"Status":res.statusCode}); 
        } ) 
        res.redirect(backend_url+'/management/show_dashboard');
    }
    catch{
        console.log("----- Cannot run Python Script for Google Reviews.. ----");
        res.redirect(backend_url+'/management/show_dashboard');
    }

});


// Fetch all the project transaction done for the properties which are rest of maharastra
router.get("/project_transaction/", async function(req, res) {

    try{
        var spawn = require("child_process").spawn; 
        var py_script = __basedir+"/realestate_python/Scraping_transaction/main.py";
        
        console.log("Python Scraping Script Path:",py_script);

        var process = spawn('python3',[py_script] ); 

        // Takes stdout data from script which executed 
        // with arguments and send this data to res object 
        process.stdout.on('data', function(data) { 
            console.log(data.toString()); 
            //res.json({"Status":res.statusCode}); 
        });
        process.stderr.on('data', (data) => 
        {
            console.log(`error:${data}`);
        });

        process.stderr.on('close', () => 
        {
            console.log("Closed");
        }); 

        res.redirect(backend_url+'/management/show_dashboard');

    }
    catch{
        console.log("Cannot run Python Script for  project transaction..");
        res.redirect(backend_url+'/management/show_dashboard');
    }

});

module.exports = router;


