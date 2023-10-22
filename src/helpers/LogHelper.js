import { transcode } from 'buffer';
import fs from 'fs'; 

export default class LogHelper {
    constructor() { };

    static procuraEndCheckpoint(entradaLog) {
        let beforCheckpoint = [];
        let afterCheckpoint = [];
        let retorno = {};
        const linhas = entradaLog.split('\n');
        
        for (let i = 0; i <= linhas.length; i++) {
            if (linhas[i]) {
                linhas[i] = linhas[i].replace('\r', '')
                if (linhas[i] === '<END CKPT>') {
                    beforCheckpoint.push(linhas[i]);
                    break;
                }
                beforCheckpoint.push(linhas[i]);
            }
        }

        for(let i = linhas.length; i >= 0; i--) {
            if (linhas[i]) {
                linhas[i] = linhas[i].replace('\r', '')
                if (linhas[i] === '<END CKPT>') {
                    afterCheckpoint.push(linhas[i]);
                    break;
                }
                afterCheckpoint.push(linhas[i]);
            }
        }
        retorno.beforeEnd = beforCheckpoint;
        retorno.afterEnd = afterCheckpoint;

        return retorno;
    }

    static checkCommitedAndUncommitedTransactions(arrayLog) {
        let retorno = {};
        let arrayCommited = [];
        let arrayUncommited = [];
        
        for(let linha of arrayLog.beforeEnd) {
            if(linha.startsWith('<start')) {
                let transacao = linha.match(/<start (\w+)>/)[1];
                arrayUncommited.push(transacao);
                
                for(let i of arrayLog.beforeEnd) {
                    if(i === `<commit ${transacao}>`) {
                        arrayCommited.push(transacao);
                    }
                }
            }
        }

        for(let linha of arrayLog.afterEnd) {
            if(linha.startsWith('<start')) {
                let transacao = linha.match(/<start (\w+)>/)[1];
                arrayUncommited.push(transacao);
            }
        }
        arrayUncommited = arrayUncommited.filter(item => !arrayCommited.includes(item));
        retorno.commitedTransactions = arrayCommited;
        retorno.uncommitedTransactios = arrayUncommited;
        return retorno;
    }

    static prepareArrayUndoRecovery(arrayLog, transacoesCommitadas) {
        let retorno = [];
        for(let linha of arrayLog) {
            let line = linha.replace(/[<> \r\t]/g, '').split(',');
            if(transacoesCommitadas.commitedTransactions.includes(line[0])) {
                retorno.push(line);
            }
        }
        return retorno;

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