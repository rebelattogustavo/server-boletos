const boleto = require("./boletos");

const listaBoletos = boleto.buscarBoleto();

const buscarBoleto = () =>{
    return listaBoletos;
}


module.exports = {
    buscarBoleto,
}