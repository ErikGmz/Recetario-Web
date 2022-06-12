const express = require("express"); 
const bodyParser = require("body-parser");
const rutasCRUDUsuarios = require("./routes/peticionesCRUDUsuarios");
const rutasCRUDRecetas = require("./routes/peticionesCRUDRecetas");
const enviarCorreos = require("./routes/enviarCorreos");

const app = express(); //Crear el servidor.
const port = process.env.PORT || 3080;

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`Servidor Node ejecutándose en http://localhost:${port}.`);
})

app.use("/usuarios", rutasCRUDUsuarios);
app.use("/recetas", rutasCRUDRecetas);
app.use("/correos", enviarCorreos);