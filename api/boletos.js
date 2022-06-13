const express = require("express");

const router = express.Router();

const pessoas = require("./listaP");
const userRoute = require("./usuarios");
const boletos = require("./listaB");



function adicionaBoleto(req){
    console.log(req.body)
    const boleto = req.body;
    boleto.id = boletos.listaBoletos.length + 1;
    boletos.listaBoletos.push(boleto);
    return boleto;
}


function pegaIdBoleto(req){
    const id = req.params.id;
    const index = boletos.listaBoletos.findIndex(p => p.id == id);
    return index;
}

function buscarBoleto(){
    return boletos.listaBoletos;
}

router.get("/", (req, res) => {
    res.json(buscarBoleto());
})

router.get("/:id", (req, res) => {
    buscarBoleto().forEach(boleto => {
        if(boleto.id== req.params.id){
            res.json(boleto);
        }
    });
})

router.get("/pessoa/:id", (req, res) => {
    buscarBoleto().forEach(boleto => {
        if(boleto.id_pessoa== req.params.id){
            res.json(boleto);
        }
    });
})


router.post("/", (req, res) => {
    const listaUsers = userRoute.buscarUser();
    pessoas.listaPessoas.forEach(pessoa => {
        if(pessoa.id == req.body.id_pessoa && listaUsers.find(user => user.id == req.body.id_user) 
        && req.body.valor > 0){
            res.json(adicionaBoleto(req));
        }
        else{
            res.status(400).send("Pessoa ou usuário não encontrados!");
        }
    })
})

router.put("/:id", (req,res) =>{
    const id = req.params.id;
    const boleto = req.body;
    boleto.id = id;
    boletos.listaBoletos[pegaIdBoleto(req)] = boleto;
    res.json(boleto);
})

router.delete("/:id", (req,res) =>{
    pessoas.listaPessoas.forEach(pessoa => {
        if(pessoa.id == boletos.listaBoletos[pegaIdBoleto(req)].id_pessoa){
            res.status(404).send("Impossível deletar, pessoa adicionada ao boleto!");
        }
        else{
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
    buscarBoleto
}