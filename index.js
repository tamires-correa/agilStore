const readline = require("readline");

const readlineTwo = readline.createInterface({input: process.stdin, output: process.stdout});

function menu(){
    console.log("\nAgilStore");
    console.log("──────────\n");
    console.log("1 - Adicionar Produto");
    console.log("2 - Listar Produtos");
    console.log("3 - Atualizar Produto");
    console.log("4 - Excluir Produto");
    console.log("5 - Buscar Produto")
    console.log("0 - Sair");

    readlineTwo.question("\nQual opção você deseja?", (opcao) => {
        console.log(`Opção escolhida: ${opcao}`);
        if (opcao === "1"){
            console.log("Adicionar produto");
            menu();
        } else if (opcao === "0"){
            console.log("Encerrando aplicação");
            readlineTwo.close();
        } else {
            console.log("Opção inválida")
            menu();
        }
    });
}

menu()