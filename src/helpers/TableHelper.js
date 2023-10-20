import LogHelper from "./LogHelper.js";

export default class TableHelper {
    constructor() {}

    static getById(id, json) {
        let indice = null;
        let obj = [];
        let arrayDados = [];

        Object.keys(json.table.id).forEach(index => {
            if(json.table.id[index] === id) {
                indice = index;
            }
        });

        Object.keys(json.table).forEach(key => {
            if(json.table[key][indice]) {
               arrayDados[key] = json.table[key][indice];
            }
        });
        
        return arrayDados;
    }

    static updateById(indice, coluna, valor, table) {
        Object.keys(table.table).forEach(e => {
            if(e === coluna) {
                table.table[coluna][indice] = valor;
                LogHelper.gravaJson(table);
            }
        })
    }
}