/**
 * @author thaivan
 */
class FileInformation {
    
    /**
     * 
     * @param {JsonObject} fileData 
     */
    constructor(fileData) {
        let seperator = "###";
        let data = fileData.split(seperator);
        
        this.fileData = fileData;
        this.fileName = data[0];

        console.log(data[1]);
        this.date = new Date(data[1] - 0);

        let clazz = findClassType(this.fileName);
        this.classType = FILE_CLASS[clazz];
    }

    render = () => {
        return `
            <div onclick="onClickRow(this, '${this.fileData}')" class="file-information js-fileInformation">
                <div class="iconcontainer">
                    <i class="${this.classType}" aria-hidden="true"></i>
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

    if (nameData[nameData.length - 1] === "jpg" || nameData[nameData.length - 1] == "png") {
        return nameData[nameData.length - 1];
    }

    return "other";
}

const FILE_CLASS = {
    "jpg": "fa fa-file-image-o",
    "png": "fa fa-file-image-o",
    "folder": "fa fa-folder",
    "other": "fa fa-file-o"

}

module.exports = FileInformation;