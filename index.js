const readline = require("readline");

const readlineTwo = readline.createInterface({input: process.stdin, output: process.stdout});

function iniciarApp(){
    console.log("\n=== AgilStore ===");
    console.log("1 - Adicionar produto");
    console.log("0 - Sair");

    readlineTwo.question("\n Escolha uma opção:", (opcao) => {
        console.log(`Você escolheu: ${opcao}`);
        if (opcao === "1"){
            console.log("Adicionar produto");
            iniciarApp();
        } else if (opcao === "0"){
            console.log("Encerrando aplicação");
            readlineTwo.close();
        } else {
            console.log("Opção inválida")
            iniciarApp();
        }
    });
}

iniciarApp()