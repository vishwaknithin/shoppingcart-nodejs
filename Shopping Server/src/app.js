const crypto = require('crypto');
const express = require("express");

const path = require('path');
const bodyParser = require("body-parser");
var connection  = require('./database');

require('dotenv').config();

var cookie = {}
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

/*
 * =======================
 * ORDER PAYMENT [GET | POST] 
 * =======================
 */
app.get("/order/:id",(req,res) => {
    if(!(req.socket.remoteAddress in cookie)){
        res.redirect("/login");
        return;
    }

    connection.query("SELECT * FROM `orders` WHERE `hash`='"+req.params.id+"'",(err, result, fields) => { 
        res.render("order",{order:result[0]})
    });

}); 

/*
 * =======================
 * LOGIN  -> [GET | POST]
 * =======================
 */
app.get("/login",(req,res) => {
    res.render("login");
});
app.post("/login",(req,res) => {

    if("login" in req.body){
        connection.query("SELECT * FROM `users` WHERE `mail`='"+req.body.mail+"'",(err, result, fields) => { 
            if (err) throw err;
            
            if(result.length < 1){
                res.redirect("../");
                return;
            }

            cookie[req.socket.remoteAddress]={'mail':result[0]['mail'], 'isadmin':result[0]['isadmin']};
            
            console.log(cookie);
            res.redirect("../");
        });
        return;   
    }

    if("signup" in req.body){
        connection.query("SELECT * FROM `users` WHERE `mail`='"+req.body.mail+"'",(err, result, fields) => { 
            if (err) throw err;
            
            if(result.length > 0){
                res.redirect("../login");
                return;
            }

            connection.query("INSERT INTO `users`(`mail`, `password`, `isadmin`) VALUES ('"+req.body.mail+"','"+req.body.password+"',0)", (err, result, fields) => { if (err) throw err; });
            cookie[req.socket.remoteAddress]={'mail':req.body.mail, 'isadmin':0};
            
            console.log(cookie);
            res.redirect("../");
        });
        return;
    }

});


/*
 * =======================
 * SERVER 
 * =======================
 */
app.get("/",(req,res) => {
    if(!(req.socket.remoteAddress in cookie)){
        res.redirect("/login");
        return;
    }
    connection.query("SELECT * FROM `products`",(err, result, fields) => { 
        res.render("index",{userInfo:cookie[req.socket.remoteAddress],products:result});
    });
}); 

app.post("/",(req,res) => {
    
    if("logout" in req.body){
        delete cookie[req.socket.remoteAddress];
        res.redirect("/login");
        return;
    }

    if("order" in req.body){
        let hash = crypto.createHash('md5').update((new Date()).toLocaleString(undefined,{timeZone: 'Asia/Kolkata'})+crypto.randomInt(1000)+"x"+crypto.randomInt(1000)).digest('hex');
        connection.query("INSERT INTO `orders`(`hash`, `owner_mail`, `product_name`, `product_id`, `quantity`, `price`, `status`) VALUES ('"+hash+"', '"+req.body.mail+"','"+req.body.product_name+"','"+req.body.product_id+"','"+req.body.product_quantity+"','"+req.body.product_price+"','0')", (err, result, fields) => {
        if (err) throw err;
        res.send(hash);
        });
    
        return;
    }

    if("getOrderStatus" in req.body){
        connection.query("SELECT * FROM `orders` WHERE `hash`='"+req.body.hash+"'",(err, result, fields) => { 
            if (err) throw err;
            if(result.length <= 0){
                res.send("0");
                return;
            }

            res.send(`${result[0].status}`);
        });
        return;
    }

    if("accept_order" in req.body){
        connection.query("UPDATE `orders` SET `status`='1' WHERE `id`='"+req.body.id+"'", (err, result, fields) => { if (err) throw err; });
        return;
    }

    if("decline_order" in req.body){
        connection.query("UPDATE `orders` SET `status`='2' WHERE `id`='"+req.body.id+"'", (err, result, fields) => { if (err) throw err; });
        return;
    }

    if("bank_login" in req.body){
        connection.query("UPDATE `orders` SET `status`='1' WHERE `id`='"+req.body.id+"'", (err, result, fields) => { if (err) throw err; });
        return;
    }
}); 

const PORT = process.env.PORT;
app.listen(PORT, 'localhost', function() {
    console.log(`Development URL: http://localhost:${PORT}; Listening to PORT: ${PORT}`);
});

/*
 * FOR CREATING A UNIQUE HASH PURPOSE
 * let hash = crypto.createHash('md5').update((new Date()).toLocaleString(undefined,{timeZone: 'Asia/Kolkata'})+crypto.randomInt(1000)+"x"+crypto.randomInt(1000)).digest('hex');
 *
 */