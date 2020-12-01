class BootstrapToast {
    constructor(header, message) {
        this.header = header;
        this.message = message;
        this.id = new Date().getMilliseconds();
    }

    render() {
        let data = `
        <div id="${this.id}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="mr-auto">${this.header}</strong>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body" style="font-weight: bold">
                ${this.message}
            </div>
        </div>
        `;

        window.$(`#js-messageContainer`).append(data);

        let toast = window.$(`#${this.id}`);
        toast.toast({delay: 3000});
        toast.toast('show');

        setTimeout(toast.remove, 3000);
    }
}

module.exports = BootstrapToast;