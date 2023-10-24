import fs from 'fs'
import LogHelper from './helpers/LogHelper.js';
import UndoHelper from './helpers/UndoHelper.js';
import Postgres from './DB/Postgres.js';

const filePathJsonTable = './entries/metadado.json';
const filePathLog = './entries/entradaLog.txt';

const undo = async () => {
    try{
        const data = await fs.promises.readFile(filePathJsonTable, 'utf-8');
        const tableJson = JSON.parse(data);
        const log = await fs.promises.readFile(filePathLog, 'utf-8');
        let pgsql = new Postgres();
       
        let arrayLogs = log.replace(/[<>\r\t]/g, '').split('\n');
        LogHelper.logsValidate(arrayLogs);

        let transacoes = LogHelper.checkCommitedAndUncommitedTransactions(arrayLogs);
        let arrayUndo = LogHelper.prepareArrayUndo(arrayLogs, transacoes);
        let undo = UndoHelper.undoRecovery(tableJson, arrayUndo);
        
        pgsql.criaTabela();
        pgsql.insereTuplas(arrayUndo);
        
        // UndoHelper.renderResponse(undo, transacoes, tableJson);

    }catch(e) {
        console.log('Erro Undo: ', e);
    }
};

undo();
