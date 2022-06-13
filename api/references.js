const pessoas = require("./pessoas");
const users = require("./usuarios");
const boletos = require("./boletos");

const references = {};

references.pessoas = pessoas;
references.users = users;
references.boletos = boletos;

module.exports = references;