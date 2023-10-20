import LogHelper from "./LogHelper.js";

export default class TableHelper {
    constructor() {}

    static getIndexById(id, json) {
        let indice = null;
        Object.keys(json.table.id).forEach(index => {
            if(json.table.id[index] === id) {
                indice = index;
            }
        });        
        return indice;
    }

    static updateById(indice, coluna, valor, table) {
        Object.keys(table.table).forEach(e => {
            if(e === coluna) {
                table.table[coluna][indice] = parseInt(valor);
                LogHelper.gravaJson(table);
            }
        })
    }
}