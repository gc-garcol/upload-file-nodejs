class BootstrapToast {
    constructor() {

    }

    render(content) {
        return `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="mr-auto">Error</strong>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">
                ${content}
            </div>
        </div>
        `;
    }
}

const INSTANCE = new BootstrapToast();
module.exports = INSTANCE;