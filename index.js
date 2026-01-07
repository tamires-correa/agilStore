const readline = require("readline");

const readlineTwo = readline.createInterface({input: process.stdin, output: process.stdout});

// ===== VARIÁVEIS GLOBAIS =====
const produtos = [];
let proximoId = 1;

// ===== FUNÇÃO MENU =====
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

// ===== ADICIONAR PRODUTOS =====
function addProduto(){
  readlineTwo.question("Nome do produto: ", (nome) => {
    readlineTwo.question("Categoria: ", (categoria) => {
        readlineTwo.question("Quantidade em estoque: ", (estoque) => {
            readlineTwo.question("Preço (R$): ", (preco) => {

                const id = proximoId;
                proximoId++;

                const precoBrasileiro = Number(preco.replace(/\./g, '').replace(',', '.'))

                const produto = {
                    id: id,
                    nome,
                    categoria,
                    estoque: Number(estoque),
                    preco: precoBrasileiro
                };
                produtos.push(produto);
                console.log("\nProduto adicionado com sucesso!!");
                menu();
            })
        })
    })
  })
}

// ===== LISTAR PRODUTOS =====
function listaProduto(){
    if (produtos.length === 0){
        console.log("\nNenhum produto cadastrado ainda");
        menu();
        return;
    }
// =====  OPÇÃO DE FILTRO/ORDENAÇÃO =====
console.log("\nOPÇÕES DE FILTRO/ORDENAÇÃO");
console.log("───────────────────────────────\n");
console.log("1 - Listar todos os produtos");
console.log("2 - Filtrar por categoria");
console.log("3 - Ordernar produtos");
console.log("0 - Voltar ao menu inicial");

readlineTwo.question("\nEscolha uma opção: ", (opcaoFiltragem) => {
    switch(opcaoFiltragem){
        case "1":
            tabelaProdutos(produtos);
            break;
        case "2":
            filtroCategoria();
            break;
        case "3":
            ordenar();
            break;
        case "0":
            menu();
            break;
        default:
            console.log("\nOpção inválida!");
            listaProduto();
        }
    });
}
// =====  TABELA DE PRODUTOS =====
function tabelaProdutos(lista){
    console.log("\nPRODUTOS");
    console.log("──────────\n");
    console.log(`${"ID:".padEnd(4)} | ${"Nome:".padEnd(27)} | ${"Categoria:".padEnd(20)} | ${"Estoque:".padEnd(8)}  | Preço:"`);
    console.log("-".repeat(90));

    lista.forEach(pa =>{
        console.log(`${String(pa.id).padEnd(4)} | ${pa.nome.padEnd(27)} | ${pa.categoria.padEnd(20)} | ${String(pa.estoque).padEnd(9)} | R$ ${pa.preco.toFixed(2).replace('.', ',')}`);
    });
    console.log(`\nTotal: ${lista.length} produto(s)`);

    readlineTwo.question("\nPressione ENTER para voltar a tabela", () => {
        listaProduto();
    });
}
// ===== FILTRAGEM POR CATEGORIA =====
function filtroCategoria(){
    const arrayCategorias = [];

    for (let i = 0; i < produtos.length; i ++){
        const categorias = produtos[i].categoria;
        if(!arrayCategorias.includes(categorias)){
            arrayCategorias.push(categorias);
        }
    }
    console.log("\nCATEGORIAS DISPONÍVEIS:");
    console.log("───────────────────────────────\n");
    for (let i = 0; i < arrayCategorias.length; i++){
        console.log(`• ${arrayCategorias[i]}`);
    }

    readlineTwo.question("\nDigite a categoria ou aperte ENTER para todos: ", (categoriaEscolhida) =>{
        let produtosFiltrados = [];

        if(categoriaEscolhida.trim() === ""){
            produtosFiltrados = produtos;
            console.log("Todos os produtos exibidos");
        } else {
            for (let i = 0; i < produtos.length; i ++){
                const produtoCategoria = produtos[i].categoria.toLowerCase();
                const filtro = categoriaEscolhida.toLowerCase();
                
                if(produtoCategoria === filtro){
                    produtosFiltrados.push(produtos[i]);
                }
            }
            if (produtosFiltrados.length === 0){
                console.log(`Nenhum produto encontrado na categoria ${categoriaEscolhida}`);
                return filtroCategoria()
            }
            console.log(`Exibindo produtos da categoria: ${categoriaEscolhida}`);
        }
            tabelaProdutos(produtosFiltrados);
    });
}

// ===== MENU ORDENAÇÃO =====
function ordenar(){
     console.log("Ordenar produtos. - Em desenvolvimento");
    menu();
}

// ===== ATUALIZAR PRODUTOS =====
function atualizaProduto(){
       console.log("Atualizar produtos. - Em desenvolvimento");
    menu();
}

// ===== EXCLUIR PRODUTOS =====
function excluirProduto(){
    console.log("Excluir produtos - Em desenvolvimento");
    menu();
}

// ===== BUSCAR PRODUTOS =====
function buscarProduto(){
    console.log("Buscar Produtos - Em desenvolvimento");
    menu();
}

menu();