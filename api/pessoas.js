const express = require("express")

const router = express.Router();

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
    res.send(buscarPessoa());
})

router.get("/:id", (req, res) => {
    res.json(pegaId(req));
})


router.post("/", (req, res) => {
    res.json(adicionaPessoa(req));
})

router.put("/:id", (req,res) =>{
    const id = req.params.id;
    const pessoa = req.body;
    pessoa.id = id;
    listaPessoas[pegaId(req)] = pessoa;
    res.json(pessoa);
})

router.delete("/:id", (req,res) =>{
    const pessoa = req.body;
    listaPessoas.splice(pegaId(req), 1);
    res.json(pessoa)
})

module.exports = {
    router,
    buscarPessoa,
    pegaId,
};