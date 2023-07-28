const mysql = require("mysql");

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'office'
});

con.connect((e)=>{
    if(e){
        console.log(e);
    }
    else{
        console.log("connected");
    }
});

module.exports = con;