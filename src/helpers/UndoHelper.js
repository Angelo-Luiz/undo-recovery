import LogHelper from "./LogHelper.js";
import UndoError from "../Exceptions/UndoError.js";

export default class UndoHelper{
    constructor() {}

    static undoRecovery(logs, transacoes) {
        
        if(logs.length === 0 || transacoes.length === 0) {
            throw new UndoError('dados inválidos');
        }

        if(logs.length > 0) {
            logs.forEach(element => {
                let arrayLog = LogHelper.preparaLogUndo(element);
                console.log(arrayLog)
                
                               
            });
        }
        

        if(transacoes.length > 0) {
            for(let i of transacoes) {
                console.log(`Transação ${i} realizou UNDO`);
            }
        }
    }
}