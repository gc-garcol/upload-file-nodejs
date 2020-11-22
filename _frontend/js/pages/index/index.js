const IndexNetworkService = require("./IndexNetworkService");
const FileInformation = require("../../components/FileInformation");

// Namespace
const garcol = {};

// SERVICE
const NetworkService = new IndexNetworkService(garcol);

// CONSTs
garcol.FILE_NAME = 'myfiles';

// URLs
garcol.BASE_API = "/api/file";
garcol.FILES = "/myfile";
garcol.BASE = "/garcol";


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
garcol.image = document.getElementById("js-image");

// WINDOW FUNCTIONs
/**
 * Coupling -> need to decouple
 * classType: 'folder', 'other', 'jpg', 'png'
 * 
 * @param {String} extra photo link
 */
onClickRow = (row, info, classType, extra) => {
    console.log(`${row} - ${info} - ${classType} - ${extra}`);
    switch(classType) {
        case 'jpg':
        case 'png':
        case 'gif':    
            garcol.image.src = `${window.location.origin}${garcol.FILES}${extra}`;
            break;  
        case 'other':
            garcol.image.src = `${window.location.origin}${garcol.BASE}/img/file.png`;
            break;    
        case 'folder':
            break;    
    }
}

// VARIABLEs
garcol.folder = [];

// UTILs
garcol.getCurrentDir = () => {
    return garcol.folder.join("/");
}

// HANDLERs
/**
 * 
 * @param {HttpServletResponse} response 
 */
garcol.onResponseSubmitFile = (response) => {
    console.log(response);
}

/**
 * 
 * @param {HttpServletResponse} response 
 */
garcol.onReceiveFiles = (response) => {
    console.log(response);
    switch (response.status) {
        case 200: {
            
            break;
        }
    }
}

// UI SERVICEs
garcol.onHideMenuBar = () => {
    garcol.contentArea.classList.remove("-left");
    garcol.sidebarArea.classList.remove("-left");
    garcol.menuBar.classList.remove("-rotate");
}

/**
 * 
 * @param {Array} data 
 */
garcol.renderFiles = (data) => {
    garcol.fileArea.innerHTML = 
        `
            ${new FileInformation("zero-two.gif", garcol.getCurrentDir()).render()}
            ${new FileInformation("zero-two.git", garcol.getCurrentDir()).render()}
            ${new FileInformation("zero-two.gif", garcol.getCurrentDir()).render()}
            ${new FileInformation("zero-two.gif", garcol.getCurrentDir()).render()}
        `
}
garcol.renderFiles();
// CONTROLLERs

/**
 * [onSubmit]
 */
garcol.submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    NetworkService.submitFile(garcol.folder.join("/"));
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

/**
 * 
 */
garcol.loadFiles = () => {
    NetworkService.getFiles(garcol.folder.join());
}

/**
 * [go to parent folder]
 */
garcol.goBack = () => {
    garcol.folder.pop();
    garcol.loadFiles();
}

/**
 * [go to child folder]
 */
garcol.goToFolder = (folderName) => {
    garcol.folder.push(folderName);
    garcol.loadFiles();
}

/**
 * [window onload]
 */
window.onload = () => {
    NetworkService.getFiles(garcol.getCurrentDir());
}