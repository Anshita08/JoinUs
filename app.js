const express = require('express');
const mysql = require('mysql');
const faker = require('faker');
const bodyParser = require('body-parser');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'nodemysql'
  });

const app = express();  
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.get("/", function(req, res){
        // Find count of users in DB
        var q = "SELECT COUNT(*) AS count FROM users";
        connection.query(q, function(err, results){
            if(err) throw err;
            var count = results[0].count; 
            res.render("home", {count: count});
    });
});

app.post("/register", function(req, res){
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});


app.listen(3000, () => {
    console.log("Server running on 3000!");
});

