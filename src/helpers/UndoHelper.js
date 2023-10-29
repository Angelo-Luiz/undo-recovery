import TableHelper from "./TableHelper.js";

export default class UndoHelper{
    constructor() {}

    static undoRecovery(tabela, transacoes) {
        let retorno = [];
        for(let transacao of transacoes) {
            let indice = TableHelper.getIndexById(parseInt(transacao[1]), tabela);
            Object.keys(tabela.table).forEach(tableIndex => {
                transacao[2] = transacao[2].replace(' ', '');
                if(tableIndex === transacao[2]){
                    // console.log(indice, transacao[2], parseInt(transacao[3]), tabela)
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

    static renderResponse(transacoes, realizouUndo) {
        const response = {
            "text": [],
            "alteracoes": transacoes,
        }
        realizouUndo.transacoesAtivas.forEach(transacao => {
           response.text.push(`Transacao ${transacao} realizou UNDO`)
        });
        console.log(response)
    }
}