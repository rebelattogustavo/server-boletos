const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const pessoasroute = require("./api/pessoas");
const usersRoute = require("./api/usuarios");
const boletosRoute = require("./api/boletos");
    
// Handling routes request
app.use("/pessoas", pessoasroute.router)
app.use("/users", usersRoute.router)
app.use("/boletos", boletosRoute.router)

app.listen(port, () => console.log(`Servidor rodando local na porta ${port}` ));