const express = require("express")

const router = express.Router();

const boletosRoute = require("./boletoFunc");


const listaPessoas = [
    {
        id: 1,
        nome: "Gusta",
        cpf: "106.141.649-66"
    },
    {
        id: 2,
        nome: "Leo",
        cpf: "109.163.891-22"
    },
];



function buscarPessoa(){
    return listaPessoas;
}

function adicionaPessoa(req){
    console.log(req.body)
    const pessoa = req.body;
    pessoa.id = listaPessoas.length + 1;
    listaPessoas.push(pessoa);
    return pessoa;
}

function pegaId(req){
    const id = req.params.id;
    const index = listaPessoas.findIndex(p => p.id == id);
    return index;
}

router.get("/", (req, res) => {
    res.json(buscarPessoa());
})

router.get("/:id", (req, res) => {
    res.json(listaPessoas[pegaId(req)]);
})


router.post("/", (req, res) => {
    console.log(req.body.nome)
    if(req.body.nome != undefined && req.body.cpf != undefined){
        res.json(adicionaPessoa(req));
    }
    else{
        res.json({
            erro: "Nome e CPF são obrigatórios"
        })
    }
})

router.put("/:id", (req,res) =>{
    const id = req.params.id;
    const pessoa = req.body;
    pessoa.id = id;
    listaPessoas[pegaId(req)] = pessoa;
    res.json(pessoa);
})

router.delete("/:id", (req,res) =>{
    const pessoa = req.params.id;
    boletosRoute.buscarBoleto().forEach(b => {
        if(b.id_pessoa == pessoa){
            res.json({
                erro: "Não é possível excluir uma pessoa que possui boletos"
                })
        }else{
            res.json({
                erro: "Pessoa excluída com sucesso"
            });
        }
    })
})

module.exports = {router, buscarPessoa, pegaId}