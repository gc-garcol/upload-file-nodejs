
/**
 * @author thaivan
 */
class FileInformation {
    
    /**
     * 
     * @param {JsonObject} fileData 
     */
    constructor(fileData, currentDir) {
        this.fileData = fileData;
        this.fileName = fileData;
        this.currentDir = currentDir;

        this.date = new Date();
        console.log(fileData);
        this.classType = findClassType(this.fileName);
        this.clazz = FILE_CLASS[this.classType];

        this.initOnDelete();
    }

    render = () => {
        console.log(`classType ${this.classType}`);
        return `
            <div onclick="${this.initOnDisplay()}" class="file-information js-fileInformation">
                <div class="iconcontainer">
                    <i class="${this.clazz}" aria-hidden="true"></i>
                </div>
                <p class="text">${this.fileName}</p>
                <div class="file-information__button-group">
                    <a target="_blank" href="${window.location.origin}/myfile${this.currentDir}/${this.fileName}" style=display:${this.classType == 'folder' ? 'none' : 'block'} download>
                        <i class="fa fa-download" aria-hidden="true"></i>
                    </a>
                    <i onclick='onDeleteFileInformation("${this.fileName}")' class="fa fa-trash" aria-hidden="true"></i>
                </div>
            </div>
        `;
    }

    initOnDisplay() {
        return `garcol.onClickRow(this, '${this.fileData}', '${this.classType}', '${this.currentDir}/${this.fileName}')`
    }

    initOnDelete() {
        if (window.onDeleteFileInformation) return;
        console.log("initOnDeleteFileInformation");

        window.onDeleteFileInformation = (filename) => {
            let elementPath = `${garcol.getCurrentDir()}/${filename}`;
            garcol.NetworkService.deleteElement(elementPath);
        };
    }
}

const findClassType = (fileName) => {
    let nameData = fileName.split(".");
    if (nameData.length == 1) {
        return "folder";
    }

    if (nameData[nameData.length - 1] === "jpg" || nameData[nameData.length - 1] == "png" || nameData[nameData.length - 1] == "gif") {
        return nameData[nameData.length - 1];
    }

    return "other";
}

const FILE_CLASS = {
    "jpg": "fa fa-file-image-o",
    "png": "fa fa-file-image-o",
    "gif": "fa fa-file-image-o",
    "folder": "fa fa-folder highlight",
    "other": "fa fa-file-o"

}

module.exports = FileInformation;