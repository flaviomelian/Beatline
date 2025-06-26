const Audio = require("../models/audio.model"); //Importar el modelo del audio

const getAllAudios = async (request, response) => {
    //Funcion que nos devuelve todas las filas de la tabla audios
    try {
        if (request.query && request.query.name) {
            const audios = await Audio.findAll({
                where: {
                    name: request.query.name,
                },
            }); //guardamos todos las audios en una constante con findAll()
            return response.status(200).json(audios); //devolvemos el codigo de OK y la respuesta en formato json
        }
        const audios = await Audio.findAll();
        return response.status(200).json(audios); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const getAudio = async (request, response) => {
    //Funcion que nos devuelve un audio
    try {
        const audio = await Audio.findOne({
            where: {
                id: request.params.id, //filtrar por id
            },
        }); //guardamos el audio en una constante con findOne()
        return response.status(200).json(audio); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const createAudio = async (request, response) => {
    //Funcion que nos crea un audio
    try {
        const audio = await Audio.create(request.body); //guardamos la audio en una constante con create() y le pasamos el body de la request (la info del audio)
        return response.status(200).json(audio); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const updateAudio = async (request, response) => {
    //Funcion que nos actualiza una audio
    try {
        const audio = await Audio.update(request.body, {
            where: { id: request.params.id },
        }); //guardamos el audio en una constante con update() y le pasamos el body de la request (la info de la audio), usamos su id para filtar el que se quiere actualizar
        return response.status(200).json(audio); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const deleteAudio = async (request, response) => {
    //Funcion que nos elimina una audio
    try {
        const audio = await Audio.destroy({
            where: { id: request.params.id },
        }); //guardamos el audio en una constante con destroy() y usamos su id para filtar el que se quiere eliminar
        return response
            .status(200)
            .send(`Audio ${audio} with id: ${request.params.id} deleted`); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

module.exports = {
    getAllAudios,
    createAudio,
    getAudio,
    updateAudio,
    deleteAudio,
}; //exportamos el CRUD