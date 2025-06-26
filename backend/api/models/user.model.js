const { DataTypes } = require("sequelize"); //importar sequelize
const { connection } = require("../../db/db"); //importar las funciones que nos conectan a la base de datos

const User = connection.define(
    "user",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: true,
    }
);


module.exports = User; //exportar el modelo para usarlo en el controlador