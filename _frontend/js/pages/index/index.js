const IndexNetworkService = require("./IndexNetworkService");

// Namespace
const garcol = {};

// SERVICE
const NetworkService = new IndexNetworkService(garcol);

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
    let currentDir = window.location.pathname;
    NetworkService.submitFile(currentDir);
});