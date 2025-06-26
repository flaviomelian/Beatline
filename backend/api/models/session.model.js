const { DataTypes } = require("sequelize"); //importar sequelize
const { connection } = require("../../db/db"); //importar las funciones que nos conectan a la base de datos

const Session = connection.define(
    "session",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bpm: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = Session; //exportar el modelo para usarlo en el controlador