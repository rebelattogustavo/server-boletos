const express = require("express");

const router = express.Router();

const pessoasroute = require("./pessoas");

const listaBoletos = [
    {   id_boleto: 1,
        valor: 100,
        id_user: 1,
        id_pessoa: 1,
        status: "pendente",
        nome_pessoa: pegaNomePessoa(id_boleto)
    }
];

function adicionaBoleto(req){
    console.log(req.body)
    const boleto = req.body;
    boleto.id = listaBoletos.length + 1;
    listaBoletos.push(boleto);
    return boleto;
}

function pegaNomePessoa(id_pessoa){
    const pessoa = pessoasroute.pegaIdPessoa(id_pessoa);
    const index = listaPessoas.find(p => p.id == listaBoletos[id_boleto].id_pessoa);
    const nomePessoa = listaPessoas[index].nome;
    return nomePessoa;
}

function pegaIdBoleto(req){
    const id = req.params.id_boleto;
    const index = listaBoletos.findIndex(p => p.id == id);
    return index;
}

router.post("/", (req, res) => {
    pessoasroute.buscarPessoa().then(pessoa => {
        if(pessoa.id == req.body.id_pessoa){
            res.json(adicionaBoleto(req));
        }
        else{
            res.status(400).send("Pessoa não encontrada");
        }
    res.json(adicionaBoleto(req));
    })
})

router.delete("/:id", (req,res) =>{
    pessoasroute.buscarPessoa(res.body.id).then(pessoa => {
        if(pessoa.id == listaBoletos.id_pessoa){
            res.status(404).send("Pessoa adicionada ao boleto");
        }
        else{
            const boleto = req.body;
            listaBoletos.splice(pegaIdBoleto(req), 1);
            res.json(pessoa)
        }
    }
    )
})

module.exports = {
    router,
    adicionaBoleto,
    pegaIdBoleto,
    pegaNomePessoa
}