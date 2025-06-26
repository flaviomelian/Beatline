const { DataTypes } = require("sequelize"); //importar sequelize
const { connection } = require("../../db/db"); //importar las funciones que nos conectan a la base de datos

const Audio = connection.define(
    "audio",
    {
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.FLOAT,
        },
        rate: {
            type: DataTypes.STRING,
        },
        trackId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.FLOAT,
        }
    },
    {
        timestamps: true,
    }
);


module.exports = Audio; //exportar el modelo para usarlo en el controlador