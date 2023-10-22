import fs from 'fs'
import LogHelper from './helpers/LogHelper.js';
import TableHelper from './helpers/TableHelper.js';
import UndoHelper from './helpers/UndoHelper.js';

const filePathJsonTable = './entries/metadado.json';
const filePathLog = './entries/entradaLog.txt';

const tabelaJson = async () => {
    try{
        const data = await fs.promises.readFile(filePathJsonTable, 'utf-8');
        const tableJson = JSON.parse(data);
        const log = await fs.promises.readFile(filePathLog, 'utf-8');

        let arrayUndo = LogHelper.procuraEndCheckpoint(log);
        let commitados = LogHelper.checkCommitedAndUncommitedTransactions(arrayUndo);
        let arrayTransacoesGravadas = LogHelper.prepareArrayUndoRecovery(arrayUndo.beforeEnd, commitados);
        let undo = UndoHelper.undoRecovery(tableJson, arrayTransacoesGravadas);
        //falta finalizar o retorno
    }catch(e) {
        console.log('Erro ao ler arquivos: ', e);
    }
};

tabelaJson();
