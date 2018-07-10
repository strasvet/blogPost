const express = require("express");
const path = require("path"); //для склейки кусков пути
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const keys = require("./keys");
const postRouter = require("./routes/post");
mongoose.connect(keys.mongoURI).then(()=>console.log("MongoDB connected")).catch(err=>console.error(err));

const port = 8081;
const clientPath = path.join(__dirname,"client"); //склеиваем корень(проекта) с папкой (client) в корне

const app = express();
app.use(bodyParser.json());
app.use(express.static(clientPath));
app.use("/api/post", postRouter);

app.listen(port,()=> {
    //esli vse ok, to vipolnit:
    console.log(`Server is running on port: ${port}`);
    console.log(`${clientPath}`);
});


//npm i express, mongoose, nodemon