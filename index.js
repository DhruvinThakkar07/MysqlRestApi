const express = require("express");
const con = require("./config");

const app = express();

app.use(express.json());

app.get("/table", (req, res)=>{
    con.query(`show tables`, (e, r, f)=>{
        if(e){
            res.send(e);
        }
        else{
            res.send(r);
        }
    })
});

app.get("/table/:tableName", (req, res)=>{
    con.query(`desc ${req.params.tableName}`, (e, r, f)=>{
        if(e){
            res.send(e);
        }
        else{
            res.send(r);
        }
    });
});

app.get("/table/:tableName/data", (req, res)=>{
    const selectFields = req.query.select;
    const filterFields = req.query.filter;
    const selectClause = selectFields ? selectFields: "*";
    const whereClause = filterFields ? `WHERE ${filterFields}`: "";
    const query = `SELECT ${selectClause} FROM ${req.params.tableName} ${whereClause}`;
    con.query(query, (e, r, f)=>{
        if(e){
            res.send(e);
        }
        else{
            res.send(r);
        }
    });
});

app.post("/table/:tableName/data", (req, res)=>{
    
    con.query(`INSERT INTO ${req.params.tableName} SET ?`, req.body, (e, r, f)=>{
        if(e) e;
        res.send("Successfully inserted");
    })
});

app.put("/table/:tableName/data", (req, res) => {
    const filterFields = req.query.filter;
    const updateFields = req.body; 

    const whereClause = filterFields ? `WHERE ${filterFields}` : "";

    const updateValues = Object.entries(updateFields)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(", ");

    const query = `UPDATE ${req.params.tableName} SET ${updateValues} ${whereClause}`;

    con.query(query, (e, r, f) => {
        if (e) {
            res.send(e);
        } else {
            res.send("Update successful");
        }
    });
});

app.delete("/table/:tableName/data", (req, res)=>{
    const filterFields = req.query.filter;
    const whereClause = filterFields ? `WHERE ${filterFields}` : "";
    con.query(`DELETE FROM ${req.params.tableName} ${whereClause}`, (e, r, f)=>{
        if(e){
            res.send(e);
        }
        else{
            res.send("Successfully deleted");
        }
    });
});

app.listen(3000, function(req, res){
    console.log("Listening to 3000...");
});







