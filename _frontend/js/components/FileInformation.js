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
    }

    render = () => {
        return `
            <div onclick="onClickRow(this, '${this.fileData}', '${this.classType}', '${this.currentDir}/${this.fileData}')" class="file-information js-fileInformation">
                <div class="iconcontainer">
                    <i class="${this.clazz}" aria-hidden="true"></i>
                </div>
                <p class="text">${this.fileName}</p>
                <p class="date">${this.date.getFullYear()}/${this.date.getMonth()}/${this.date.getDate()} - ${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()} </p>
            </div>
        `;
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
    "folder": "fa fa-folder",
    "other": "fa fa-file-o"

}

module.exports = FileInformation;