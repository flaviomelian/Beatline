const User = require("../models/user.model"); //Importar el modelo del User

const getAllUsers = async (request, response) => {
    //Funcion que nos devuelve todas las filas de la tabla Users
    try {
        if (request.query && request.query.name) {
            const users = await User.findAll({
                where: {
                    name: request.query.name,
                },
            }); //guardamos todos las users en una constante con findAll()
            return response.status(200).json(users); //devolvemos el codigo de OK y la respuesta en formato json
        }
        return response.status(404); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const getUser = async (request, response) => {
    //Funcion que nos devuelve un User
    try {
        const user = await User.findOne({
            where: {
                id: request.params.id, //filtrar por id
            },
        }); //guardamos el User en una constante con findOne()
        return response.status(200).json(user); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const createUser = async (request, response) => {
    //Funcion que nos crea un User
    try {
        const user = await User.create(request.body); //guardamos la User en una constante con create() y le pasamos el body de la request (la info del User)
        return response.status(200).json(user); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const updateUser = async (request, response) => {
    //Funcion que nos actualiza una User
    try {
        const user = await User.update(request.body, {
            where: { id: request.params.id },
        }); //guardamos el User en una constante con update() y le pasamos el body de la request (la info de la User), usamos su id para filtar el que se quiere actualizar
        return response.status(200).json(user); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

const deleteUser = async (request, response) => {
    //Funcion que nos elimina una User
    try {
        const user = await User.destroy({
            where: { id: request.params.id },
        }); //guardamos el User en una constante con destroy() y usamos su id para filtar el que se quiere eliminar
        return response
            .status(200)
            .send(`User ${user} with id: ${request.params.id} deleted`); //devolvemos el codigo de OK y la respuesta en formato json
    } catch (error) {
        return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
}; //exportamos el CRUD