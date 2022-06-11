const express = require("express");

const router = express.Router();

const pessoasRoute = require("./pessoas");
const userRoute = require("./usuarios");

const listaBoletos = [
    {   id_boleto: 1,
        valor: 100,
        id_user: 1,
        id_pessoa: 1,
        status: "pendente",
        nome_pessoa: "Gustavo"
    },
    {   id_boleto: 2,
        valor: 200,
        id_user: 2,
        id_pessoa: 2,
        status: "pendente",
        nome_pessoa: "Leonardo"
    },
];

function adicionaBoleto(req){
    console.log(req.body)
    const boleto = req.body;
    boleto.id = listaBoletos.length + 1;
    listaBoletos.push(boleto);
    return boleto;
}


function pegaIdBoleto(req){
    const id = req.params.id;
    const index = listaBoletos.findIndex(p => p.id_boleto == id);
    return index;
}

function buscarBoleto(){
    return listaBoletos;
}

router.get("/", (req, res) => {
    res.json(buscarBoleto());
})

router.get("/:id", (req, res) => {
    buscarBoleto().forEach(boleto => {
        if(boleto.id_boleto == req.params.id){
            res.json(boleto);
        }
    });
})


router.post("/", (req, res) => {
    const listaUsers = userRoute.buscarUser();
    pessoasRoute.buscarPessoa().then(pessoa => {
        if(pessoa.id == req.body.id_pessoa){
            res.json(adicionaBoleto(req));
        }
        else{
            res.status(400).send("Pessoa ou usuário não encontrados!");
        }
    })
})

router.delete("/:id", (req,res) =>{
    pessoasroute.buscarPessoa(res.body.id).then(pessoa => {
        if(pessoa.id == listaBoletos.id_pessoa){
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