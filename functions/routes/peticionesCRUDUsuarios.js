const express = require("express"); //Importar Express.
const router = express.Router();

const administrador = require("firebase-admin");
const cuenta = require("../llave-firebase.json");
administrador.initializeApp({
    credential: administrador.credential.cert(cuenta)
});
const baseDatos = administrador.firestore();

router.post('/agregar', async (peticion, respuesta) => {
    try {
        const datosUsuarioNuevo = {
            ID: peticion.body.ID,
            correoElectronico: peticion.body.correoElectronico,
            nombreCompleto: peticion.body?.nombreCompleto,
            nombreUsuario: peticion.body.nombreUsuario,
            permisos: peticion.body.permisos,
            numeroTelefono: peticion.body?.numeroTelefono,
            recetasFavoritas: peticion.body?.recetasFavoritas
        }
        await baseDatos.collection("usuarios").doc(datosUsuarioNuevo.ID).set(datosUsuarioNuevo);
        console.log("El usuario fue exitosamente agregado.");
        respuesta.send("El usuario fue exitosamente agregado.");
    }
    catch(error) {
        console.log("Ocurrió un error al agregar al usuario.");
        respuesta.send("Ocurrió un error al agregar al usuario.");
    }
});

router.get('/obtener-todos', async (peticion, respuesta) => {
    try {
        arregloUsuarios = [];
        datosUsuarios = await baseDatos.collection("usuarios").get();

        datosUsuarios.forEach(registro => {
            arregloUsuarios.push(registro.data());
        });
        console.log("Lista de usuarios registrados.");
        console.log(arregloUsuarios);
        respuesta.send(arregloUsuarios);
    }
    catch(error) {
        console.log("Ocurrió un error al obtener los usuarios.\n" + error);
        respuesta.send("Ocurrió un error al obtener los usuarios.\n" + error);
    }
});

router.get('/obtener/:id', async (peticion, respuesta) => {
    try {
        datosUsuario = await baseDatos.collection("usuarios").doc(peticion.params.id).get();
        console.log("Datos del usuario correspondiente.");
        console.log(datosUsuario.data());
        respuesta.send(datosUsuario.data());
    }
    catch(error) {
        console.log("Ocurrió un error al obtener el usuario.\n" + error);
        respuesta.send("Ocurrió un error al obtener el usuario.\n" + error);
    }
});

router.put('/agregarFavorito/:id', async (peticion, respuesta) => {
    try {
        await baseDatos.collection("usuarios").doc(peticion.params.id).update({
            recetasFavoritas: administrador.firestore.FieldValue.arrayUnion(peticion.body.IDReceta)
        });
        console.log("La receta ha sido exitosamente agregada a favoritos.");
        respuesta.send("La receta ha sido exitosamente agregada a favoritos.");
    }
    catch(error) {
        console.log("Ocurrió un error al registrar la receta favorita.\n" + error);
        respuesta.send("Ocurrió un error al registrar la receta favorita.\n" + error);
    }
});

router.put('/removerFavorito/:id', async (peticion, respuesta) => {
    try {
        await baseDatos.collection("usuarios").doc(peticion.params.id).update({
            recetasFavoritas: administrador.firestore.FieldValue.arrayRemove(peticion.body.IDReceta)
        });
        console.log("La receta ha sido exitosamente eliminada de favoritos.");
        respuesta.send("La receta ha sido exitosamente eliminada de favoritos.");
    }
    catch(error) {
        console.log("Ocurrió un error al actualizar el usuario.\n" + error);
        respuesta.send("Ocurrió un error al actualizar el usuario.\n" + error);
    }
});

router.delete('/eliminar/:id', async (peticion, respuesta) => {
    try {
        const resultado = await baseDatos.collection("usuarios").doc(peticion.params.id).delete();
        console.log("Usuario eliminado.");
        console.log(resultado);
        respuesta.send("Usuario eliminado.\n" + JSON.stringify(resultado));
    }
    catch(error) {
        console.log("Ocurrió un error al borrar el usuario.\n" + error);
        respuesta.send("Ocurrió un error al borrar el usuario.\n" + error);
    }
});
module.exports = router;