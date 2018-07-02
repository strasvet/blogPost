const express = require("express");
const path = require("path"); //для склейки кусков пути
const mongoose = require("mongoose");


const keys = require("./keys");
mongoose.connect(keys.mongoURI).then(()=>console.log("MongoDB connected")).catch(err=>console.error(err));

const port = 8081;
const clientPath = path.join(__dirname,"client"); //склеиваем корень(проекта) с папкой (client) в корне

const app = express();
app.use(express.static(clientPath));

app.listen(port,()=> {
    //esli vse ok, to vipolnit:
    console.log(`Server is running on port: ${port}`);
    console.log(`${clientPath}`);
});


//npm i express, mongoose, nodemon