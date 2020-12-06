import Main from './Main'


class Events extends Main {

    constructor() {
        super();
        this.eventListen();
    }

    private eventListen(): void {
        document.querySelector('#load-data').addEventListener("click", () => {
            this.loadData();
        });
        document.querySelector('#export').addEventListener("click", () => {
            this.getSum();
            this.exportToExcel();
        });
    }
}

new Events();