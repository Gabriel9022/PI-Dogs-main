const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    sequelize.define('raza', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: 'composite_unique'
        },

        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'composite_unique'
        },

        Altura: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        Peso: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        Años_de_vida: {
            type: DataTypes.INTEGER
        }

    })

}
