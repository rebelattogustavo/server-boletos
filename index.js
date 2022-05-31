const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const pessoasroute = require("./api/pessoas");
    
// Handling routes request
app.use("/", pessoasroute.router)

app.listen(port, () => console.log(`Servidor rodando local na porta ${port}` ));