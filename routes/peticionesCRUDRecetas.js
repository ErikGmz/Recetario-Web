const express = require("express"); //Importar Express.
const router = express.Router();
const administrador = require("firebase-admin");
const baseDatos = administrador.firestore();

router.post('/agregar', async (peticion, respuesta) => {
    try {
        const datosRecetaNueva = {
            ID: peticion.body.ID,
            correoElectronico: peticion.body.correoElectronico,
            nombreCompleto: peticion.body?.nombreCompleto,
            nombreUsuario: peticion.body.nombreUsuario,
            permisos: peticion.body.permisos,
            numeroTelefono: peticion.body?.numeroTelefono
        }
        await baseDatos.collection("receta").doc(datosRecetaNueva.ID).set(datosRecetaNueva);
        console.log("La receta fue exitosamente agregada.");
        respuesta.send("La receta fue exitosamente agregada.");
    }
    catch(error) {
        console.log("Ocurrió un error al agregar la receta.");
        respuesta.send("Ocurrió un error al agregar la receta.");
    }
});

router.get('/obtener-todos', async (peticion, respuesta) => {
    try {
        arregloRecetas = [];
        datosRecetas = await baseDatos.collection("recetas").get();

        datosRecetas.forEach(registro => {
            arregloRecetas.push(registro.data());
        });
        console.log("Lista de recetas registradas.");
        console.log(arregloRecetas);
        respuesta.send(arregloRecetas);
    }
    catch(error) {
        console.log("Ocurrió un error al obtener las recetas.");
        respuesta.send("Ocurrió un error al obtener las recetas.");
    }
});

router.get('/obtener/:id', async (peticion, respuesta) => {
    try {
        datosReceta = await baseDatos.collection("recetas").doc(peticion.params.id).get();
        console.log("Datos de la receta correspondiente.");
        console.log(datosReceta.data());
        respuesta.send(datosReceta.data());
    }
    catch(error) {
        console.log("Ocurrió un error al obtener la receta.");
        respuesta.send("Ocurrió un error al obtener la receta.");
    }
});

router.delete('/eliminar/:id', async (peticion, respuesta) => {
    try {
        const resultado = await baseDatos.collection("recetas").doc(peticion.params.id).delete();
        console.log("Receta eliminada.");
        console.log(resultado);
        respuesta.send("Receta eliminada.\n" + JSON.stringify(resultado));
    }
    catch(error) {
        console.log("Ocurrió un error al borrar la receta.");
        respuesta.send("Ocurrió un error al borrar la receta.");
    }
});
module.exports = router;