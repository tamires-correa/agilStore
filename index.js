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

    readlineTwo.question("\nQual opção você deseja? ", (opcao) => {
        console.log(`Opção escolhida: ${opcao}`);
      switch (opcao){
        case "1":
            addProduto();
            break;
        case "2":
            listaProduto();
            break;
        case "3":
            atualizaProduto();
            break;
        case "4":
            excluirProduto();
            break;
        case "5":
            buscarProduto();
            break;
        case "0":
            console.log("Aplicação encerrada");
            readlineTwo.close();
            break;
        default:
            console.log("Opção inválida!");
            menu();
      }
    });
}

// === ADICIONAR PRODUTOS ===
function addProduto(){
    console.log("Em desenvolvimento");
    menu();
}

// === LISTAR PRODUTOS ===
function listaProduto(){
    console.log("Listar produtos - Em desenvolvimento");
    menu();
}

// === ATUALIZAR PRODUTOS ===
function atualizaProduto(){
    console.log("Atualizar produtos. - Em desenvolvimento");
    menu();
}

// === EXCLUIR PRODUTOS ===
function excluirProduto(){
    console.log("Excluir produtos - Em desenvolvimento");
    menu();
}

// === BUSCAR PRODUTOS ===
function buscarProduto(){
    console.log("Buscar Produtos - Em desenvolvimento");
    menu();
}

menu();