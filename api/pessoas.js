const express = require("express")

const router = express.Router();

const boletos = require("./listaB");
const pessoas = require("./listaP");



function buscarPessoa(){
    return pessoas.listaPessoas;
}

function adicionaPessoa(req){
    console.log(req.body)
    const pessoa = req.body;
    pessoa.id = pesoas.listaPessoas.length + 1;
    pessoas.listaPessoas.push(pessoa);
    return pessoa;
}

function pegaId(req){
    const id = req.params.id;
    const index = pessoas.listaPessoas.findIndex(p => p.id == id);
    return index;
}

router.get("/", (req, res) => {
    res.json(buscarPessoa());
})

router.get("/:id", (req, res) => {
    res.json(pessoas.listaPessoas[pegaId(req)]);
})


router.post("/", (req, res) => {
    console.log(req.body.nome)
    if(req.body.nome != undefined){
        if(req.body.cpf != undefined){
            res.json(adicionaPessoa(req));
        }else{
            res.json("CPF não informado");
        }
    }else{
        res.json("Nome não informado");
    }
})

router.put("/:id", (req,res) =>{
    const id = req.params.id;
    const pessoa = req.body;
    pessoa.id = id;
    pessoas.listaPessoas[pegaId(req)] = pessoa;
    res.json(pessoa);v
})

router.delete("/:id", (req,res) =>{
    let num =0;
    const pessoa = req.params.id;
    boletos.listaBoletos.forEach(b => {
        if(b.id_pessoa == pessoa){
            res.status(400).send("Não é possível deletar! Pessoa está adicionada a um boleto.");
            num =1;
        }
    })
    if(num != 1){
        pessoas.listaPessoas.splice(pegaIdUser(req), 1);
        res.json({
            mensagem: "Pessoa excluída com sucesso!"
        })
    }
})

module.exports = {router, buscarPessoa, pegaId}