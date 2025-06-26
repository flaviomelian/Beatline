const Track = require("../models/track.model"); //Importar el modelo del Track

const getAllTracks = async (request, response) => {
    //Funcion que nos devuelve todas las filas de la tabla Tracks
    try {
        if (request.query && request.query.name) {
            const tracks = await Track.findAll({
                where: {
                    name: request.query.name,
                },
            }); //guardamos todos las tracks en una constante con findAll()
            return response.status(200).json(tracks); //devolvemos el codigo de OK y la respuesta en formato json
        }
        const tracks = await Track.findAll();
        return response.status(200).json(tracks); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const getTrack = async (request, response) => {
    //Funcion que nos devuelve un Track
    try {
        const track = await Track.findOne({
            where: {
                id: request.params.id, //filtrar por id
            },
        }); //guardamos el Track en una constante con findOne()
        return response.status(200).json(track); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const createTrack = async (request, response) => {
    //Funcion que nos crea un Track
    try {
        const track = await Track.create(request.body); //guardamos la Track en una constante con create() y le pasamos el body de la request (la info del Track)
        return response.status(200).json(track); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const updateTrack = async (request, response) => {
    //Funcion que nos actualiza una Track
    try {
        const track = await Track.update(request.body, {
            where: { id: request.params.id },
        }); //guardamos el Track en una constante con update() y le pasamos el body de la request (la info de la Track), usamos su id para filtar el que se quiere actualizar
        return response.status(200).json(track); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const deleteTrack = async (request, response) => {
    //Funcion que nos elimina una Track
    try {
        const track = await Track.destroy({
            where: { id: request.params.id },
        }); //guardamos el Track en una constante con destroy() y usamos su id para filtar el que se quiere eliminar
        return response
            .status(200)
            .send(`Track ${track} with id: ${request.params.id} deleted`); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

module.exports = {
    getAllTracks,
    createTrack,
    getTrack,
    updateTrack,
    deleteTrack,
}; //exportamos el CRUD