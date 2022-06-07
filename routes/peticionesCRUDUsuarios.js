const express = require("express"); //Importar Express.
const router = express.Router();

const administrador = require("firebase-admin");
const cuenta = require("../llave-firebase.json");
administrador.initializeApp({
    credential: administrador.credential.cert(cuenta)
});
const baseDatos = administrador.firestore();

router.post('/agregar-usuario', (peticion, respuesta) => {
    try {
        const datosUsuarioNuevo = {
            ID: peticion.body.ID,
            correoElectronico: peticion.body.correoElectronico,
            nombreCompleto: peticion.body.nombreCompleto,
            nombreUsuario: peticion.body.nombreUsuario
        }
        resultado = baseDatos.collection("usuarios").add(datosUsuarioNuevo);
        respuesta.send("El usuario fue exitosamente agregado.");
    }
    catch(error) {
        respuesta.send(error);
    }
});
module.exports = router;