const express = require("express");

const path = require('path');
const bodyParser = require("body-parser");
var connection  = require('./database');

var cookie = {}
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));


app.get("/payment/:id",(req,res) => {
    connection.query("SELECT * FROM `orders` WHERE `hash`='"+req.params.id+"'",(err, result, fields) => { 
        res.render("order",{order:result[0]})
    });

}); 


app.post("/",(req,res) => {
    if("accept_order" in req.body){

        connection.query("UPDATE `orders` SET `status`='3' WHERE `id`='"+req.body.id+"'", (err, result, fields) => { if (err) throw err; });
        return;
    }
}); 

app.listen(3001, 'localhost', function() {
    console.log(`Development URL: http://localhost:3001; Listening to PORT: 3001`);
});