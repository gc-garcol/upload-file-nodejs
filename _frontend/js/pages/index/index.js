const IndexNetworkService = require("./IndexNetworkService");
const FileInformation = require("../../components/FileInformation");

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
garcol.submitArea = document.getElementById("js-onHaveFile");
garcol.fileQuanitty = document.getElementById("js-fileQuantity");
garcol.menuBar = document.getElementById("js-menuBar");
garcol.contentArea = document.getElementById("js-contentArea");
garcol.sidebarArea = document.getElementById("js-sidebarArea");
garcol.fileArea = document.getElementById("js-fileArea");

// WINDOW FUNCTIONs
onClickRow = (row, info) => {
    console.log(row);
    console.log(info);
}


// HANDLERs
garcol.onResponseSubmitFile = (response) => {
    console.log(response);
    
}

// UI SERVICEs
garcol.onHideMenuBar = () => {
    garcol.contentArea.classList.remove("-left");
    garcol.sidebarArea.classList.remove("-left");
    garcol.menuBar.classList.remove("-rotate");
}

garcol.renderFile = () => {
    garcol.fileArea.innerHTML = 
        `
            ${new FileInformation("thaivan.jpg###1606057099000").render()}
            ${new FileInformation("thaivan.png###1606057099000").render()}
            ${new FileInformation("thaivan###1606057099000").render()}
            ${new FileInformation("thaivan.pdf###1606057099000").render()}
        `
}

garcol.renderFile();

// CONTROLLERs

/**
 * [onSubmit]
 */
garcol.submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let currentDir = window.location.pathname;
    NetworkService.submitFile(currentDir);
});

/**
 * [onFileInputChanged]
 */
garcol.fileContainer.addEventListener('change', () => {
    let fileQuantity = garcol.fileContainer.files.length;
    garcol.fileQuanitty.innerHTML = `${fileQuantity} file${fileQuantity > 1 ? "s" : ""}`;
    
    fileQuantity > 0 
    ? garcol.submitArea.classList.add("-display")
    : garcol.submitArea.classList.removeClass("-display");
});

/**
 * [show menu bar]
 */
garcol.menuBar.addEventListener('click', () => {
    garcol.contentArea.classList.toggle("-left");
    garcol.sidebarArea.classList.toggle("-left");
    garcol.menuBar.classList.toggle("-rotate");
    window.event.cancelBubble = true;
});

/**
 * [hide menu bar]
 */
garcol.contentArea.addEventListener('click', garcol.onHideMenuBar);