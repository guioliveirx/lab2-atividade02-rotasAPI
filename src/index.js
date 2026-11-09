const express = require('express');

const app = express();

app.use(express.json());

let produtos = []
let identificador = 1;

app.get('/', (request, response) => {
    return response.json({ 
        message: "Olá Mundo!"
    });
})

app.get('/produtos', (request, response) => {
    return response.json({ 
        produtos 
    });
})

app.post('/produto', (request, response) => {
    const { nome, categoria, preco, quantidade } = request.body;

    const produto = {
        id: identificador++,
        nome: nome.trim(),
        categoria: categoria.trim(),
        preco,
        quantidade
    }

    produtos.push(produto);

    return response.status(201).json({
        message: 'Produto Inserido!', 
        produto
    });
})

app.patch('/produto/:id', (request, response) => {
    const id  = Number(request.params.id);

    const { nome, categoria, preco, quantidade } = request.body;
    
    const produto = produtos.find(produto => produto.id === id);

    if (!produto){
        return response.status(404).json({
            message: 'Produto não encontrado!'
        });
    }
    
    produto.nome = nome ?? produto.nome
    produto.categoria = categoria ?? produto.categoria
    produto.preco = preco ?? produto.preco
    produto.quantidade = quantidade ?? produto.quantidade

    return response.status(200).json({
        message: 'Produto Atualizado!', produto}
    );
})

app.delete('/produto/:id', (request, response) => {
    const id  = Number(request.params.id);
    
    const produto = produtos.find(p => p.id === id);

    if (!produto){
        return response.status(404).json({
            message: 'Produto não encontrado!'
        })
    }

    produtos = produtos.filter(p => p.id !== produto.id);

    return response.status(204).send();
})


app.listen(3333, () => {
    console.log("Hello World!");
});