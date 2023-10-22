import LogHelper from "./LogHelper.js";
import TableHelper from "./TableHelper.js";

export default class UndoHelper{
    constructor() {}

  static undoRecovery(tabela, transacoes) {
    let valoresAlterados = [];
    for(let i of transacoes) {
        let indice  = TableHelper.getIndexById(parseInt(i[1]), tabela);
        if(indice === NaN) {
            throw new Error("indice invalido");
        }
        TableHelper.updateById(indice, parseInt(i[2]), parseInt(i[3]), tabela);
        valoresAlterados.push(i);
    }
    return valoresAlterados;

  }
}