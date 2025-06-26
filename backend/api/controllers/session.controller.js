const Session = require("../models/session.model"); //Importar el modelo del Session

const getAllSessions = async (request, response) => {
    //Funcion que nos devuelve todas las filas de la tabla Sessions
    try {
        if (request.query && request.query.name) {
            const sessions = await Session.findAll({
                where: {
                    name: request.query.name,
                },
            }); //guardamos todos las Sessions en una constante con findAll()
            return response.status(200).json(sessions); //devolvemos el codigo de OK y la respuesta en formato json
        }
        const sessions = await Session.findAll();
        return response.status(200).json(sessions); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const getSession = async (request, response) => {
    //Funcion que nos devuelve un Session
    try {
        const session = await Session.findOne({
            where: {
                id: request.params.id, //filtrar por id
            },
        }); //guardamos el Session en una constante con findOne()
        return response.status(200).json(session); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const createSession = async (request, response) => {
    //Funcion que nos crea un Session
    try {
        const session = await Session.create(request.body); //guardamos la Session en una constante con create() y le pasamos el body de la request (la info del Session)
        return response.status(200).json(session); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const updateSession = async (request, response) => {
    //Funcion que nos actualiza una Session
    try {
        const session = await Session.update(request.body, {
            where: { id: request.params.id },
        }); //guardamos el Session en una constante con update() y le pasamos el body de la request (la info de la Session), usamos su id para filtar el que se quiere actualizar
        return response.status(200).json(session); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const deleteSession = async (request, response) => {
    //Funcion que nos elimina una Session
    try {
        const session = await Session.destroy({
            where: { id: request.params.id },
        }); //guardamos el Session en una constante con destroy() y usamos su id para filtar el que se quiere eliminar
        return response
            .status(200)
            .send(`Session ${session} with id: ${request.params.id} deleted`); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

module.exports = {
    getAllSessions,
    createSession,
    getSession,
    updateSession,
    deleteSession,
}; //exportamos el CRUD