import TableHelper from "./TableHelper.js";

export default class UndoHelper{
    constructor() {}

    static undoRecovery(tabela, transacoes) {
        let retorno = [];

        for(let transacao of transacoes) {
            let indice = TableHelper.getIndexById(parseInt(transacao[1]), tabela);
            
            Object.keys(tabela.table).forEach(tableIndex => {
                if(tableIndex === transacao[2]){
                    TableHelper.updateById(indice, transacao[2], parseInt(transacao[3]), tabela);
                    let obj = {
                        "coluna": transacao[2],
                        "linha": indice,
                        "valor": parseInt(transacao[3]),
                        "transacao": transacao[0]
                    }
                    retorno.push(obj);
                }
            });
        }

        return retorno;
    }

    static renderResponse(transacoes, realizouUndo, newTable) {
        const response = {
            "text": [],
            "alteracoes": transacoes,
            "Tabela Recuperada": newTable.table
            
        }
        realizouUndo.uncommited.forEach(transacao => {
           response.text.push(`Transacao ${transacao} realizou UNDO`)
        });
        console.log(response)
    }
}