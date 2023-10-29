# UNDO Recovery

## Instruções de uso

1. Será necessário instalar o nodejs e o npm caso não tenha.
2. Após instalar o nodejs e o npm, na raiz do projeto execute o comando 'npm install', para instalar as dependências do projeto.
3.  Após instalar as dependências, dentro do diretório 'src', execute o comando 'node index.js' para rodar a aplicação.

## Resumo do trabalho

1. A aplicação irá ler os dois arquivos de entrada esperados dentro do diretório 'entries', um arquivos com os logs e outro com a tabela json inconsistente.
2. Após ler os dois arquivos de entrada, a aplicação irá aplicar a lógica do Undo recovery, que consiste na ideia de realizar o rollback das transações que realizaram alguma alteração mas não foram commitadas até o instante em que o sgbd iniciou o checkpoint, voltando esses registros para um estado consistente.
3. Após aplicar a lógica e restaurar a tabela, será gerado um arquivo no diretório 'output', com um arquivo json contendo a tabela restaurada.
4. Também será retornado para o usuário no terminal os registros restaurados e as transações que sofreram o rollback.