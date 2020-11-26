const express = require('express')
const app = express();
const bodyParser = require("body-parser");

const MulterUtil = require("./_backend/utils/MulterUtil");
const ENV = require("./env");

// INIT
MulterUtil.createDirIfNotExist(ENV.UPLOAD_DIR_NAME);
MulterUtil.createDirIfNotExist(ENV.TMP_UPLOAD_DIR_NAME);

// IMPORT controllers
const FileController = require("./_backend/endpoints/FileController");


// config
const PORT = 54000;

// body parse
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// static
app.use(`${ENV.HOME_URL}`, express.static(`${ENV.PUBLIC}`));
app.use(`${ENV.FILE_URL}`, express.static(`${ENV.UPLOAD_DIR_NAME}`));

// DEFAULT home
app.get(`${ENV.DEFAUL_HOME_URL}`, (req, res) => {
    res.redirect(`${ENV.HOME_URL}`);
});

const middleware = (req, res, next) => {
    console.log(`Endpoint: ${req.originalUrl}`);
    next();
}

// ENDPOINTs
app.use(`${ENV.BASE_API_FILE}`, middleware, FileController);

app.listen(PORT);