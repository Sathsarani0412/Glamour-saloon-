const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();

const PORT = 3000;

/* DATABASE */

const db = new sqlite3.Database("./database/salon.db");

/* CREATE TABLE */

db.serialize(() => {

    db.run(`

        CREATE TABLE IF NOT EXISTS appointments(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT,
            email TEXT,
            phone TEXT,
            service TEXT,
            date TEXT,
            time TEXT,
            message TEXT

        )

    `);

});

/* MIDDLEWARE */

app.use(bodyParser.json());

app.use(express.static(__dirname));

/* ROUTES */

app.get("/", (req,res)=>{

    res.sendFile(path.join(__dirname,"index.html"));

});

/* BOOK APPOINTMENT */

app.post("/book-appointment",(req,res)=>{

    const {

        name,
        email,
        phone,
        service,
        date,
        time,
        message

    } = req.body;

    const sql = `

        INSERT INTO appointments
        (name,email,phone,service,date,time,message)

        VALUES (?,?,?,?,?,?,?)

    `;

    db.run(sql,[

        name,
        email,
        phone,
        service,
        date,
        time,
        message

    ], function(err){

        if(err){

            console.log(err);

            res.json({
                success:false
            });

        }else{

            res.json({
                success:true
            });

        }

    });

});

/* START SERVER */

app.listen(PORT, ()=>{

    console.log(`Server running on http://localhost:${PORT}`);

});