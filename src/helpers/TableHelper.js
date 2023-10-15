export default class TabelaHelper {
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
}