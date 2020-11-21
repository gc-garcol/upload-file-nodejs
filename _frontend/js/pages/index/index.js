const IndexService = require("./IndexService");

// Namespace
const garcol = {};

// SERVICE
const Service = new IndexService(garcol);

// CONSTs
garcol.FILE_NAME = 'myfiles';

// URLs
garcol.POST_UPLOAD = "/api/file";

// SELECTORs
garcol.submitBtn = document.getElementById("js-submitBtnID");
garcol.submitForm = document.getElementById("js-formID");
garcol.fileContainer = document.getElementById("js-files");

// HANDLERs
garcol.onResponseSubmitFile = (response) => {
    console.log(response);
}

// CONTROLLERs
garcol.submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    Service.submitFile();
});