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

router.put('/actualizar/:id', async (peticion, respuesta) => {
    try {
        await baseDatos.collection("recetas").doc(peticion.params.id).set(peticion.body);
        console.log("La receta fue exitosamente actualizada.");
        respuesta.send("La receta fue exitosamente actualizada.");
    }
    catch(error) {
        console.log("Ocurrió un error al actualizar la receta.\n" + error);
        respuesta.send("Ocurrió un error al actualizar la receta.\n" + error);
    }
});

router.put('/incrementarFavorito/:id', async (peticion, respuesta) => {
    try {
        await baseDatos.collection("recetas").doc(peticion.params.id).update({
            cantidadFavoritos: administrador.firestore.FieldValue.increment(1)
        });
        console.log("La cantidad de favoritos de la receta fue exitosamente incrementada.");
        respuesta.send("La cantidad de favoritos de la receta fue exitosamente incrementada.");
    }
    catch(error) {
        console.log("Ocurrió un error al incrementar la cantidad de favoritos.\n" + error);
        respuesta.send("Ocurrió un error al incrementar la cantidad de favoritos.\n" + error);
    }
});

router.put('/restarFavorito/:id', async (peticion, respuesta) => {
    try {
        await baseDatos.collection("recetas").doc(peticion.params.id).update({
            cantidadFavoritos: administrador.firestore.FieldValue.increment(-1)
        });
        console.log("La cantidad de favoritos de la receta fue exitosamente restada.");
        respuesta.send("La cantidad de favoritos de la receta fue exitosamente restada.");
    }
    catch(error) {
        console.log("Ocurrió un error al restar la cantidad de favoritos.\n" + error);
        respuesta.send("Ocurrió un error al restar la cantidad de favoritos.\n" + error);
    }
});

router.delete('/eliminar/:id', async (peticion, respuesta) => {
    try {
        await baseDatos.collection("recetas").doc(peticion.params.id).delete();
        console.log("La receta fue exitosamente eliminada.");
        respuesta.send("La receta fue exitosamente eliminada.");
    }
    catch(error) {
        console.log("Ocurrió un error al borrar la receta.\n" + error);
        respuesta.send("Ocurrió un error al borrar la receta.\n" + error);
    }
});
module.exports = router;