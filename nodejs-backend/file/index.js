const express = require('express');
const fs = require('fs');

// sqlite3 DB setup
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./sqlite3_tmp.db");
db.run("create table if not exists roomdata(time, room_temp, room_humid, room_pressure)");
db.run("create table if not exists memo(message)");

let bodyParser = require('body-parser');

const app = express();
const port = 8080

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  fs.readFile('./html/index.html','UTF-8',(err,data)=>{
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(data);
    res.end();
  });
});

app.get('/vue_app.js', (req, res) => {
  fs.readFile('./html/vue_app.js','UTF-8',(err,data)=>{
    res.writeHead(200,{'Content-Type':'text/javascript'});
    res.write(data);
    res.end();
  });
});

app.get('/api/v1/roomdata', (req, res) => {
  db.all("select * from roomdata order by time desc limit 1;", (err, rows) => {
    console.log(rows)
    if (err) {
      res.status(400).json({
        "status": "error",
        "message": err.message
      });
      return;
    } else {
      res.status(200).json({
        "status": "OK",
        "members": rows
      });
    }
  })
});

app.post('/api/v1/roomdata', (req, res) => {
  console.log(req.body);
  db.run("insert into roomdata(time, room_temp, room_humid, room_pressure) values(?,?,?,?)",
    req.body.time, req.body.room_temp, req.body.room_humid, req.body.room_pressure);
  //db.each("select * from members", (err, row) => {
  //    console.log(`${row.name} ${row.age}`);
  //});
  //Error? What is this?
  res.send('200 OK');
});


app.get('/api/v1/memo', (req, res) => {
  db.all("select * from memo;", (err, rows) => {
    console.log(rows)
    if (err) {
      res.status(400).json({
        "status": "error",
        "message": err.message
      });
      return;
    } else {
      res.status(200).json({
        "status": "OK",
        "members": rows
      });
    }
  })
});

app.post('/api/v1/memo', (req, res) => {
  console.log(req.body);
  db.run("insert into memo(message) values(?)", req.body.message);
  res.send('200 OK');
});


app.listen(port, () => {
  console.log('Listening on port 8080');
});