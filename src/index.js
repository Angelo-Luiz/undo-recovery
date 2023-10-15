import fs from 'fs'
import TabelaHelper from './helpers/TableHelper.js';
import LogHelper from './helpers/LogHelper.js';

const filePathJsonTable = './entries/metadado.json';
const filePathLog = './entries/entradaLog.txt';

const tabelaJson = async () => {
    try{
        const data = await fs.promises.readFile(filePathJsonTable, 'utf-8');
        const tableJson = JSON.parse(data);
        const log = await fs.promises.readFile(filePathLog, 'utf-8');
        let arrayUndo = LogHelper.procuraEndCheckpoint(log);
        let transacaoUndo = LogHelper.checkUndoTransaction(arrayUndo);
        let dat = TabelaHelper.getById(22, tableJson)
        console.log(dat)
    }catch(e) {
        console.log('Erro ao ler arquivos: ', e);
    }
};

tabelaJson();
