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
garcol.currentDir = document.getElementById("js-currentFolder");
garcol.goBackDOM = document.getElementById("js-back");

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
            garcol.image.src = `${window.location.origin}${garcol.BASE}/img/folder.jpg`;
            garcol.folder.push(info);
            NetworkService.getFiles(garcol.getCurrentDir());
            break;    
    }
}

// VARIABLEs
garcol.folder = [];

// UTILs
garcol.getCurrentDir = () => {
    let path = `/${garcol.folder.join("/")}`;
    return path;
}

// HANDLERs
/**
 * 
 * @param {HttpServletResponse} response 
 */
garcol.onResponseSubmitFile = (response) => {
    console.log(response);
    switch(response.status) {
        case 200: {
            NetworkService.getFiles(garcol.getCurrentDir());
            break;
        }
    }
}

/**
 * 
 * @param {HttpServletResponse} response 
 */
garcol.onReceiveFiles = (response) => {
    console.log(response);
    switch (response.status) {
        case 200: {
            let data = response.data.files;
            let arr = data.split(",");
            garcol.renderFiles(arr);
            garcol.currentDir.innerHTML = `${garcol.getCurrentDir()}`;
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
    let renderData = [];
    data.forEach((file) => {
        renderData.push(new FileInformation(file, garcol.getCurrentDir()).render())
    });
    garcol.fileArea.innerHTML = renderData.join("\n");
}
// CONTROLLERs

/**
 * [onSubmit]
 */
garcol.submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    NetworkService.submitFile(garcol.getCurrentDir());
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
    NetworkService.getFiles(garcol.getCurrentDir());
}

/**
 * [go to parent folder]
 */
garcol.goBack = () => {
    if (garcol.folder.length == 0) return;

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
 * on click go back
 */
garcol.goBackDOM.addEventListener('click', () => {
    garcol.goBack();
});

/**
 * [window onload]
 */
window.onload = () => {
    NetworkService.getFiles(garcol.getCurrentDir());
}