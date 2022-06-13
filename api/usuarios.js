const express = require("express")

const router = express.Router();

const boletos = require("./listaB");
const usuarios = require("./listaU");





function buscarUser(){
    return usuarios.listaUsers;
}

function adicionaUser(req){
    console.log(req.body)
    const user = req.body;
    user.id = usuarios.listaUsers.length + 1;
    usuarios.listaUsers.push(user);
    return user;
}


function pegaIdUser(req){
    const id = req.params.id;
    const index = usuarios.listaUsers.findIndex(p => p.id == id);
    return index;
}


router.get("/", (req, res) => {
    res.json(buscarUser());
})

router.get("/:id", (req, res) => {
    res.json(usuarios.listaUsers[pegaIdUser(req)]);
})


router.post("/", (req, res) => {
    if(req.body.nome != undefined && req.body.senha != undefined){
        res.json(adicionaUser(req));
    }
    else{
        res.json({
            erro: "É necessário preencher nome e senha!"
        })
    }
})


router.put("/:id", (req,res) =>{
    const id = req.params.id;
    const user = req.body;
    user.id = id;
    usuarios.listaUsers[pegaId(req)] = user;
    res.json(user);
})

router.delete("/:id", (req,res) =>{
    let num =0;
    const user = req.params.id;
    boletos.listaBoletos.forEach(b => {
        if(b.id_user == user){
            num =0;
            res.json({
                erro: "Não é possível excluir um usuário que possui boletos cadastrados!"
            })
        }else{
            num =1;
        }
    })
    if(num == 1){
        usuarios.listaUsers.splice(pegaIdUser(req), 1);
        res.json({
            mensagem: "Usuário excluído com sucesso!"
        })
    }
})

module.exports = {router, buscarUser, pegaIdUser};