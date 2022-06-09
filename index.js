const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const pessoasroute = require("./api/pessoas");
const usersRoute = require("./api/usuarios");
const boletosRoute = require("./api/boletos");
    
// Handling routes request
app.use("/pessoa", pessoasroute.router)
app.use("/user", usersRoute.router)
app.use("/boleto", boletosRoute.router)

app.listen(port, () => console.log(`Servidor rodando local na porta ${port}` ));