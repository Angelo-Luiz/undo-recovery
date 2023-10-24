import fs from 'fs';

export default class LogHelper {
    constructor() { };

   static logsValidate(arrayLogs) {
        let validCheckpoint = false;
        
        if(arrayLogs.length === 0) throw new Error(`arquivo vazio`);

        for(let i = 0; i < arrayLogs.length; i++){
            if(arrayLogs[i].startsWith(`START CKP`)) {
                for(let j = 0; j < arrayLogs.length; j++) {
                    if(arrayLogs[j].startsWith(`END CKP`)) {
                        validCheckpoint = true;
                    }
                }
            }
        }

        if(! validCheckpoint) throw new Error(`Nao encontrado End Checkpoint`);
    
    }

    static checkCommitedAndUncommitedTransactions(arrayLogs) {
        let arrayCommited = [];
        let arrayUncommited = [];
        let retorno = {};

        for (let i of arrayLogs) {
            
            if(i.startsWith(`start`)){
                let transacao = i.split(` `)
                transacao = transacao[1]

                arrayUncommited.push(transacao);
                
                for(let j of arrayLogs) {
                    if(j === `commit ${transacao}`){
                        arrayCommited.push(transacao);
                    }
                }
                
            }
            if(i.startsWith(`START CKP`)) {
                let transacoesAtivas = i.match(/\(([^)]+)\)/)[1].split(`,`);
                retorno.transacoesAtivas = transacoesAtivas
            }
        }

        arrayUncommited = arrayUncommited.filter(item => !arrayCommited.includes(item));
        retorno.commited = arrayCommited;
        retorno.uncommited = arrayUncommited;

        return retorno;

    }

    static prepareArrayUndo(arrayLogs, transacoes) {
        let arrayUndo = [];
        for(let i of transacoes.uncommited) {
            for(let j of arrayLogs) {
                if(j.startsWith(`crash`)) break;
                if(j.startsWith(i)) {
                    arrayUndo.push(j.replace(` `, ``).split(`,`));
                }
            }
        }
        return arrayUndo;
    }

    static gravaJson(json, transacao) {
        try {
            let tablePath = './entries/metadado.json';
            let conteudo = JSON.stringify(json, null, 2);
            fs.writeFileSync(tablePath, conteudo, 'utf-8');
        }catch(error) {
            console.log(`Erro ao gravar a transação ${transacao}: ${error}`);
        }
    }

}