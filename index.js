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

                const precoBrasileiro = Number(preco.replace(/\./g, '').replace(',', '.'));

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
console.log("\nOPÇÕES DE FILTRO/ORDENAÇÃO:");
console.log("───────────────────────────────\n");
console.log("1 - Listar todos os produtos");
console.log("2 - Filtrar por categoria");
console.log("3 - Ordenar produtos");
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
    console.log("\nPRODUTOS:");
    console.log("──────────\n");
    console.log(`${"ID:".padEnd(4)} | ${"Nome:".padEnd(27)} | ${"Categoria:".padEnd(20)} | ${"Estoque:".padEnd(8)}  | Preço:"`);
    console.log("─".repeat(90));

    lista.forEach(pa =>{
        console.log(`${String(pa.id).padEnd(4)} | ${pa.nome.padEnd(27)} | ${pa.categoria.padEnd(20)} | ${String(pa.estoque).padEnd(9)} | R$ ${pa.preco.toFixed(2).replace('.', ',')}`);
    });
    console.log(`\nTotal: ${lista.length} produto(s)`);

    readlineTwo.question("\nPressione ENTER para voltar nas opções de filtro/ordenação", () => {
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
    console.log("──────────────────────────\n");
    for (let i = 0; i < arrayCategorias.length; i++){
        console.log(`• ${arrayCategorias[i]}`);
    }

    readlineTwo.question("\nDigite a categoria ou aperte ENTER para todos: ", (categoriaEscolhida) =>{
        let produtosFiltrados = [];

        if(categoriaEscolhida.trim() === ""){
            produtosFiltrados = [...produtos];
            produtosFiltrados.sort((a,b) => a.categoria.localeCompare(b.categoria));
            console.log("Todos os produtos exibidos por categoria (A-Z)");
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
            produtosFiltrados.sort((a,b) => a.nome.localeCompare(b.nome));
            console.log(`Exibindo produtos da categoria: ${categoriaEscolhida}`);
        }
            tabelaProdutos(produtosFiltrados);
    });
}
// ===== MENU ORDENAÇÃO =====
function ordenar(){
    console.log("\nORDENAR POR:");
    console.log("──────────────\n");
    console.log("1 - Nome de A-Z");
    console.log("2 - Nome de Z-A");
    console.log("3 - Preço (do menor ao maior)");
    console.log("4 - Preço (do maior ao menor)");
    console.log("5 - Quantidade (crescente)");
    console.log("6 - Quantidade (decrescente)");
    console.log("0 - Voltar");

    readlineTwo.question("\nEscolha uma opção: ", (ordenacao) => {
        let produtosOrdenados = [...produtos];
        switch (ordenacao){
            case "1":
                produtosOrdenados.sort((a,b) => a.nome.localeCompare(b.nome));
                console.log("Ordenado por nome de A-Z");
                tabelaProdutos(produtosOrdenados);
                break;
            case "2":
                produtosOrdenados.sort((a,b) => b.nome.localeCompare(a.nome));
                console.log("Ordenado por nome de Z-A");
                tabelaProdutos(produtosOrdenados);
                break;
            case "3":
                produtosOrdenados.sort((a,b) => a.preco - b.preco);
                console.log("Ordenado por preço do menor ao maior");
                tabelaProdutos(produtosOrdenados);
                break;
            case "4":
                produtosOrdenados.sort((a,b) => b.preco - a.preco);
                console.log("Ordenado por preço do maior ao menor");
                tabelaProdutos(produtosOrdenados);
                break;
            case "5":
                produtosOrdenados.sort((a,b) => a.estoque - b.estoque);
                console.log("Ordenado pela quantidade (crescente)");
                tabelaProdutos(produtosOrdenados);
                break;
            case "6":
                produtosOrdenados.sort((a,b) => b.estoque - a.estoque);
                console.log("Ordenado pela quantidade (decrescente)");
                tabelaProdutos(produtosOrdenados);
                break;
            case "0":
                listaProduto();
                break;
            default:
                console.log("\nOpção inválida!");
                ordenar();
        }
    });
}
// ===== ATUALIZAR PRODUTOS =====
function atualizaProduto(){
       if(produtos.length === 0){
        console.log("\nNenhum produto cadastrado no momento");
        menu();
        return;
       }
readlineTwo.question("\nDigite o ID do produto que gostaria de atualizar: ", (idInformado) =>{
    const id = Number(idInformado);
    const produto = produtos.find(item => item.id === id);

    if(!produto){
        console.log("\nProduto não encontrado!");
        menu();
        return;
    }
    console.log("\nProduto encontrado!");
    console.log(produto);

    readlineTwo.question(`\nNovo nome (${produto.nome}): `, (novoNome) =>{
        readlineTwo.question(`\nNova categoria (${produto.categoria}): `, (novaCategoria) =>{
            readlineTwo.question(`\nNova quantidade (${produto.estoque}): `, (novaQuantidade) =>{
                readlineTwo.question(`\nNovo preço (${produto.preco.toFixed(2).replace('.', ',')}): `, (novoPreco) =>{
                    if (novoNome.trim() !== ""){
                        produto.nome = novoNome;
                    }
                    if (novaCategoria.trim() !== ""){
                        produto.categoria = novaCategoria;
                    }
                    if (novaQuantidade.trim() !== ""){
                        const estoqueNumero = Number(novaQuantidade);
                        if (estoqueNumero >= 0){
                            produto.estoque = estoqueNumero;
                        } else {
                            console.log("Número de estoque permanece o mesmo");
                        }
                    }
                    if (novoPreco.trim() !== ""){
                        const precoAlterado = Number(novoPreco.replace(/\./g, '').replace (',', '.'));
                        if (precoAlterado > 0){
                            produto.preco = precoAlterado;
                        } else {
                            console.log("Preço original mantido");
                        }
                    }
                    console.log("\nProduto atualizado com sucesso!");
                    menu();
                });
            });
        });
    });
});
}
// ===== EXCLUIR PRODUTOS =====
function excluirProduto(){
    if(produtos.length === 0){
        console.log("\nNenhum produto cadastrado");
        menu();
        return;
    }
    readlineTwo.question("\nDigite o ID do produto que deseja excluir: ", (idDigitado) =>{
        const index = produtos.findIndex(item => item.id === Number(idDigitado));
        if (index === -1){
            console.log("\nProduto não encontrado!");
            menu();
            return;
        }
    const produtoRemovido = produtos[index];
    readlineTwo.question(`\nConfirme se deseja excluir "${produtoRemovido.nome}"? (s/n): `, (confirmacao) =>{
        if (confirmacao.toLowerCase() === 's'){
            produtos.splice(index, 1);
            console.log("\nProduto excluído com sucesso!");
        } else{
            console.log("\nExclusão cancelada")
        }
        menu()
        });
    });
}
// ===== BUSCAR PRODUTOS =====
function buscarProduto(){
    if (produtos.length === 0){
        console.log("\nNenhum produto cadastrado");
        menu();
        return;
    }
    console.log("\nBUSCAR POR:");
    console.log("────────────\n");
    console.log("1 - Buscar pelo ID");
    console.log("2 - Buscar pelo nome");
    console.log("0 - Voltar ao menu inicial");

    readlineTwo.question("\nEscolha uma opção: ", (buscaEscolhida) =>{
        switch(buscaEscolhida){
            case "1":
                buscarPorId();
                break;
            case "2":
                buscarPorNome();
                break;
            case "0":
                menu();
                break;
            default:
                console.log("\nOpção inválida!");
                buscarProduto();
        }
    });
}
function buscarPorId(){
    readlineTwo.question("\nDigite o ID do produto: ", (idDigitado) =>{
        const produto = produtos.find(item => item.id === Number(idDigitado));
        
        if (!produto){
            console.log("\nProduto não encontrado!");
        } else {
            exibirDetalhesProduto(produto);
        }
        readlineTwo.question("\nPressione ENTER para voltar ao menu de busca", () =>{
            buscarProduto();
        });
    });
}
function buscarPorNome(){
    readlineTwo.question("\nDigite o nome ou parte dele: ", (nomeDigitado) =>{
        const resultados = produtos.filter(item => item.nome.toLowerCase().includes(nomeDigitado.toLowerCase()));

        if (resultados.length === 0){
            console.log("\nNenhum produto encontrado!");
            readlineTwo.question("\nPressione ENTER para voltar ao menu de busca", () => {
                buscarProduto()
            });
        } else if (resultados.length === 1){
            exibirDetalhesProduto(resultados[0]);
        } else{
            console.log(`\n${resultados.length} PRODUTOS ENCONTRADO(S)`);
            console.log("─".repeat(26));
            console.log(`${"ID:".padEnd(4)} | ${"Nome:".padEnd(27)} | ${"Categoria:".padEnd(20)} | ${"Estoque:".padEnd(8)}  | Preço:`);
            console.log("─".repeat(88));
            
            resultados.forEach(item => {
              console.log(`${String(item.id).padEnd(4)} | ${item.nome.padEnd(27)} | ${item.categoria.padEnd(20)} | ${String(item.estoque).padEnd(9)} | R$ ${item.preco.toFixed(2).replace('.', ',')}`);
            });
            console.log(`\nTotal: ${resultados.length} produtos(s)`);

            readlineTwo.question("\nPressione ENTER para voltar ao menu de busca", () =>{
                buscarProduto();
            });
        }
    });
}
// ===== EXIBIIR DETALHES DOS PRODUTOS =====
function exibirDetalhesProduto(produto){
    console.log("\nDETALHES DO PRODUTO:");
    console.log("─────────────────────\n");
    console.log(`ID: ${produto.id}`);
    console.log(`Nome: ${produto.nome}`);
    console.log(`Categoria: ${produto.categoria}`);
    console.log(`Quantidade em estoque: ${produto.estoque} unidade(s)`);
    console.log(`Preço: R$ ${produto.preco.toFixed(2).replace('.', ',')}`);
 
    readlineTwo.question("\nPressione ENTER para voltar ao menu inicial", () => {
        menu();
    });
}
menu();