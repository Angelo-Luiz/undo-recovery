import fs from 'fs'; 

export default class LogHelper {
    constructor() { };

    static procuraEndCheckpoint(entradaLog) {
        let valoresUndo = [];
        const linhas = entradaLog.split('\n');

        for (let i = linhas.length; i >= 0; i--) {
            if (linhas[i]) {
                if (linhas[i] === '<END CKPT>') {
                    valoresUndo.push(linhas[i]);
                    break;
                }
                valoresUndo.push(linhas[i]);
            }
        }

        return valoresUndo;
    }

    static checkUndoTransaction(arrayLog) {
        let arrayUndo = [];
        for (let i of arrayLog) {
            if (i.includes('<start')) {
                let transacao = i.split(' ');
                transacao = transacao[1].slice(0, -1);
                arrayUndo.push(transacao);
            }
        }
        return arrayUndo;
    }

    static trataArrayLog(arrayLog) {
        if (arrayLog) {
            let retorno = arrayLog.map(str => str.replace(/<|>/g, ''));
            return retorno;
        }
    }

    static preparaLogUndo(element) {
        const array = element.split(',')
        return array;
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