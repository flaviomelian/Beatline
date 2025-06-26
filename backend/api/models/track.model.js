const { DataTypes } = require("sequelize"); //importar sequelize
const { connection } = require("../../db/db"); //importar las funciones que nos conectan a la base de datos

const Track = connection.define(
    "track",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = Track; //exportar el modelo para usarlo en el controlador