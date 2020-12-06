// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dialog } = require('electron').remote
// eslint-disable-next-line @typescript-eslint/no-var-requires
const  json2xls = require('json2xls');
import path from 'path'
import fs from 'fs'


export default class Main {
    private display: HTMLElement = document.querySelector('#table-data');
    private db: [];

    protected loadData(): boolean {
        const dir = dialog.showOpenDialogSync({properties: ['openFile'], filters: [{name: 'JSON data base', extensions:['json']}]})
        this.db = JSON.parse(fs.readFileSync(dir[0], 'utf8'));
        this.showOnDisplay();

        return true;
    }

    protected exportToExcel(): boolean {
        const xls = json2xls(this.db);
        console.log(json2xls)
        const dir: string = dialog.showSaveDialogSync({filters: [{name: 'Excel format', extensions:['xlsx']}]})
        fs.writeFileSync(dir, xls, 'binary');

        return true;
    }

    protected showOnDisplay(): boolean {
        this.display.innerHTML = ''
        for (let i = 0; i < this.db.length - 1; i++) {
            this.display.innerHTML += `<tr>
                                         <th scope="row">${i + 1}</th>
                                         <td>${this.db[i].Mark}</td>
                                         <td>${this.db[i].Model}</td>
                                         <td>${this.db[i].Year}</td>
                                         <td>${this.db[i].Quantity}</td>
                                       </tr>`
        }

        return true;
    }

    protected getSum(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.db[this.db.length - 1].Quantity = `=СУММ(D2:D${this.db.length})`;
    }
}