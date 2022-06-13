const express = require("express"); 
const bodyParser = require("body-parser");
const rutasCRUDUsuarios = require("./routes/peticionesCRUDUsuarios");
const rutasCRUDRecetas = require("./routes/peticionesCRUDRecetas");
const enviarCorreos = require("./routes/enviarCorreos");

const app = express(); //Crear el servidor.
const port = process.env.PORT || 3080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/aplicacion-angular/dist/proyecto/"));

app.get('/', (peticion, respuesta) => {
	respuesta.sendFile(process.cwd() + "/aplicacion-angular/dist/proyecto/index.html")
});

app.listen(port, () => {
	console.log(`Servidor Node ejecutándose en el puerto ${port}.`);
})

app.use("/api/usuarios", rutasCRUDUsuarios);
app.use("/api/recetas", rutasCRUDRecetas);
app.use("/api/correos", enviarCorreos);