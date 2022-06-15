const functions = require("firebase-functions");
const express = require("express"); 
const bodyParser = require("body-parser");
const rutasCRUDUsuarios = require("./routes/peticionesCRUDUsuarios");
const rutasCRUDRecetas = require("./routes/peticionesCRUDRecetas");
const enviarCorreos = require("./routes/enviarCorreos");

const app = express(); //Crear el servidor.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/api/usuarios", rutasCRUDUsuarios);
app.use("/api/recetas", rutasCRUDRecetas);
app.use("/api/correos", enviarCorreos);
exports.api = functions.https.onRequest(app);