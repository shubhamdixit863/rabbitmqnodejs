// You can run your cron job
require("dotenv").config();

const events=require("./event");

const {getFilterQuery}=require("./elastic");
var cron = require('node-cron');

cron.schedule("*/10 * * * * *", () => {

    getFilterQuery("notprocessed","logs").then(data=>{
       // console.log()
        events.emit("data",JSON.stringify(data))

    })
 // console.log('running a task every minute');
});