const express = require("express"); 
const bodyParser = require("body-parser");
const rutasCRUDUsuarios = require("./routes/peticionesCRUDUsuarios");

const app = express(); //Crear el servidor.
const port = process.env.PORT || 3080;

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`Servidor Node ejecutándose en http://localhost:${port}.`);
})

app.use("/", rutasCRUDUsuarios);