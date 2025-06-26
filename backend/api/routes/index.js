// Importamos el módulo de enrutamiento de Express y creamos un enrutador.
const router = require("express").Router();

// Usamos el enrutador general para manejar todas las peticiones dirigidas a las direciones definidas para el resto de enrutadores.
router.use("/user", require("./user.router"));
router.use("/session", require("./session.router"));
router.use("/track", require("./track.router"));
router.use("/audio", require("./audio.router"));

// Exportamos el enrutador para que pueda ser utilizado por otros archivos en nuestra aplicación.
module.exports = router;