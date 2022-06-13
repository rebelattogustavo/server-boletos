const express = require("express");

const router = express.Router();

const pessoas = require("./listaP");
const userRoute = require("./usuarios");
const boletos = require("./listaB");



function adicionaBoleto(req){
    console.log(req.body)
    const boleto = req.body;
    boleto.id_boleto = boletos.listaBoletos.length + 1;
    boleto.nome_pessoa = pessoas.listaPessoas.filter(p => p.id == boleto.id_pessoa)[0].nome;
    boletos.listaBoletos.push(boleto);
    return boleto;
}


function pegaIdBoleto(req){
    const id = req.params.id;
    const isInteger = new RegExp('^[0-9]+$');	
    id = isInteger.test(_id) ? parseInt(_id) : _id;
    const index = boletos.listaBoletos.findIndex(p => p.id_boleto == id);
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
    const boleto_pessoa = buscarBoleto().filter(boleto => boleto.id_pessoa == req.params.id);
    res.json(boleto_pessoa);
});



router.post("/", (req, res) => {
    let num;
    const listaUsers = userRoute.buscarUser();
    pessoas.listaPessoas.forEach(pessoa => {
        if(pessoa.id == req.body.id_pessoa){
            if(listaUsers.find(user => user.id == req.body.id_user)){
                if(req.body.valor > 0){
                    res.json(adicionaBoleto(req));
                    num = 0;
                }else{
                    num =1
                }
            }else{
                num =2
            }
        }else{
            num =3;
        }
    })
    if(num == 1){
        res.json({
            erro: "Valor inválido!"
        })
    }if(num == 2){
        res.json({
            erro: "O usuário não existe!"
        })
    }if(num == 3){
        res.json({
            erro: "A pessoa não existe!"
        })
    }
})

router.put("/:id", (req,res) =>{
    const id = req.params.id;
    const boleto = req.body;
    boleto.id_boleto = id;
    boleto.nome_pessoa = pessoas.listaPessoas.filter(p => p.id == boleto.id_pessoa)[0].nome;
    boletos.listaBoletos[pegaIdBoleto(req)] = boleto;
    res.json(boleto);
})

router.delete("/:id", (req,res) =>{
    let num =0;
    pessoas.listaPessoas.forEach(pessoa => {
        if(pessoa.id == boletos.listaBoletos.find(boleto => boleto.id_boleto == req.params.id).id_pessoa){
            res.status(404).json({erro: 
                "Impossível deletar, pessoa adicionada ao boleto!"
            });
            num = 1;
        }
    })
    if(num != 1){
        boletos.listaBoletos.splice(pegaIdBoleto(req), 1);
        res.json({
            erro: "Boleto excluído com sucesso!"
        })
    }
})

module.exports = {
    router,
    adicionaBoleto,
    pegaIdBoleto,
    buscarBoleto
}