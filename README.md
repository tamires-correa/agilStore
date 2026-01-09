# AgilStore

AgilStore é uma aplicação **CLI (Command Line Interface)** desenvolvida em **Node.js** para gerenciamento simples de produtos em estoque.  
O sistema permite cadastrar, listar, filtrar, ordenar, buscar, atualizar e excluir produtos, com persistência de dados em arquivo JSON.

---

## Funcionalidades:

- Adicionar produtos;
- Listar produtos, com filtro por categoria; e ordenação de nome, preço ou quantidade; 
- Buscar produtos por ID ou nome;
- Atualizar produtos;
- Excluir produtos;
- Persistência de dados em arquivo JSON.
---

## Tecnologias Utilizadas:

- **Node.js**
- **JavaScript (ES6+)**
- **Módulos nativos do Node.js**:
  - `fs` (File System)
  - `path`
  - `readline`

---

## Estrutura do Projeto:

```
agilstore/
│
├── index.js          # Arquivo principal da aplicação
├── produtos.json     # Arquivo de persistência dos dados
└── README.md         # Documentação do projeto
```

---

## Como Rodar a Aplicação Localmente:

### 1º: Pré-requisitos

* Ter o **Node.js** instalado (versão 18 ou superior)

Verifique se o Node está instalado:

```bash
node -v
```

---

### 2º: Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd agilstore
```

---

### 3º: Criar o arquivo de dados

Crie um arquivo chamado `produtos.json` na raiz do projeto com o seguinte conteúdo inicial:

```json
{
  "proximoId": 1,
  "produtos": []
}
```

⚠️ Isso é importante para evitar erros ao carregar os dados.

---

### 4º: Executar a aplicação

No terminal, execute:

```bash
node index.js
```

O menu principal da aplicação será exibido no terminal.

---

## Observações:

* A aplicação roda inteiramente no terminal
* Os dados são salvos automaticamente após adicionar, atualizar ou excluir produtos
* O preço aceita formato brasileiro (ex: 1.234,56)

---

## 👩‍💻 Autora:

Desenvolvido por **Tamires Correa** 

Projeto feito através de um desafio para fins educacionais, focado lógica, JavaScript e Node.js.