const express = require("express")

const router = express.Router();

const pessoasroute = require("./pessoas");

const listaUsers = [
    {
        id: 1,
        nome: "gustaXL_",
        senha: "guga321"
    },
    {
        id: 2,
        nome: "leozin89",
        senha: "leozao123"
    },
];


function buscarUser(){
    return listaUsers;
}

function adicionaUser(req){
    console.log(req.body)
    const user = req.body;
    user.id = listaUsers.length + 1;
    listaUsers.push(pessoa);
    return user;
}


function pegaIdUser(req){
    const id = req.params.id;
    const index = listaUsers.findIndex(p => p.id == id);
    return index;
}


router.get("/", (req, res) => {
    res.send(buscarUser());
})

router.get("/:id", (req, res) => {
    res.json(pegaIdUser(req));
})


router.post("/", (req, res) => {
    
    res.json(adicionaUser(req));
})


router.put("/:id", (req,res) =>{
    const id = req.params.id;
    const user = req.body;
    user.id = id;
    listaUsers[pegaId(req)] = user;
    res.json(user);
})

router.delete("/:id", (req,res) =>{
    const pessoa = req.body;
    listaUsers.splice(pegaId(req), 1);
    res.json(pessoa)
})

module.exports = {router, buscarUser, pegaIdUser};