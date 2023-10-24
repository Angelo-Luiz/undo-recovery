import pg from 'pg-promise'

export default class Postgres {
    constructor() {
        this.dadosConexao = {
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'postgres',
            port: 5432, 
        };
        this.conn = this.criaConexao();
    }

    criaConexao() {
        const db = new pg()(this.dadosConexao);
        return db;

    }

    async criaTabela() {
        try{
            
            let tabelaSQL = `create table if not exists undo (
                            id int,
                            A int,
                            B int
                        )`;
            
            await this.conn.none(tabelaSQL);


        } catch(e) {
            throw new Error(`erro ao conectar com o postgres: ${e}`);
        }
    }

    async insereTuplas(arrayUndo) {
        let insert = `INSERT INTO undo (id, A, B) values ($1, $2, $3)`;
        arrayUndo.forEach(transacao => {
            console.log(transacao)
        })
    }
}