import LogHelper from "./LogHelper.js";
import UndoError from "../Exceptions/UndoError.js";
import TableHelper from "./TableHelper.js";

export default class UndoHelper{
    constructor() {}

    static undoRecovery(logs, transacoes, tabela) {
        
        if(logs.length === 0 || transacoes.length === 0) {
            throw new UndoError('dados inválidos');
        }

        if(logs.length > 0) {
            logs.forEach(element => {
                let arrayLog = LogHelper.preparaLogUndo(element);
                if(arrayLog[0].startsWith('T')) {                   
                    let indice = TableHelper.getIndexById(parseInt(arrayLog[1]), tabela);
                    TableHelper.updateById(indice, arrayLog[2], arrayLog[3], tabela)
                    console.log(arrayLog)
                    console.log(tabela)
                }
                
                               
            });
        }


        if(transacoes.length > 0) {
            for(let i of transacoes) {
                console.log(`Transação ${i} realizou UNDO`);
            }
        }
    }
}