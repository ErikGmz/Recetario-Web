const express = require("express"); //Importar Express.
const router = express.Router();
const administrador = require("firebase-admin");
const baseDatos = administrador.firestore();

router.post('/agregar', async (peticion, respuesta) => {
    try {
        let documentoNuevo = baseDatos.collection("receta").doc();
        let ID = documentoNuevo.id;
        let recetaNueva = peticion.body;
        recetaNueva.ID = ID;
        
        await baseDatos.collection("recetas").doc(ID).set(recetaNueva);
        console.log("La receta fue exitosamente agregada.");
        respuesta.send("La receta fue exitosamente agregada.");
    }
    catch(error) {
        console.log("Ocurrió un error al agregar la receta\n" + error);
        respuesta.send("Ocurrió un error al agregar la receta\n" + error);
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
        console.log("Ocurrió un error al obtener las recetas.\n" + error);
        respuesta.send("Ocurrió un error al obtener las recetas.\n" + error);
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
        console.log("Ocurrió un error al obtener la receta.\n" + error);
        respuesta.send("Ocurrió un error al obtener la receta.\n" + error);
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
        console.log("Ocurrió un error al borrar la receta.\n" + error);
        respuesta.send("Ocurrió un error al borrar la receta.\n" + error);
    }
});
module.exports = router;