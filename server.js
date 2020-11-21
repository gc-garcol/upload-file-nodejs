const express = require('express')
const app = express();
const bodyParser = require("body-parser");

// IMPORT controllers
const FileController = require("./_backend/endpoints/FileController");


// config
const PORT = 54000;

// body parse
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// static
app.use(express.static('_public'))

// ENDPOINTs
app.use('/api/file', FileController);

 
app.listen(PORT);