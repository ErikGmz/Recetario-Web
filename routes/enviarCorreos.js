const express = require("express"); //Importar Express.
const router = express.Router();
const nodemailer = require('nodemailer');

var intermediario = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'recetarioweb@outlook.com',
      pass: 'AmoLasRecetas53'
    }
});

router.post("/enviar", (peticion, respuesta) => {
    estructuraCorreo = {
        from: "recetarioweb@outlook.com",
        to: "erikgomez198755@outlook.com",
        subject: peticion.body.asunto,
        html: "<h2>Se ha recibido una pregunta en MakeYourFood.</h2>" +
        "<p><b>Nombre completo del remitente:</b> " + peticion.body.nombreCompleto + ".</p>" +
        "<p><b>Nombre de usuario:</b> " + peticion.body.nombreUsuario + ".</p><br>" +
        "<h2 style='margin-top: 5px;'>Mensaje.</h2><p>" + peticion.body.mensaje + "</p>"
    }
    intermediario.sendMail(estructuraCorreo, (error, informacion) => {
        if(!error) {
            console.log("El correo fue exitosamente enviado.\n" + JSON.stringify(estructuraCorreo));
            respuesta.send("El correo fue exitosamente enviado.\n" + JSON.stringify(estructuraCorreo));
        }
        else {
            console.log(error)
            respuesta.send(error);
        }
    });
})
module.exports = router;