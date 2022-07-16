const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    sequelize.define('raza', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false

        },

        height_min: {
            type: DataTypes.STRING,
            allowNull: false

        },
        height_max: {
            type: DataTypes.STRING,
            allowNull: false

        },

        weight_min: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight_max: {
            type: DataTypes.STRING,
            allowNull: false
        },

        life_span_min: {
            type: DataTypes.STRING,
           /*  get(){
                let value = this.getDataValue('life_span')
                if(!value) return null
                return value + ' years old'
            } */
        },
        life_span_max: {
            type: DataTypes.STRING,
            get(){
                let value = this.getDataValue('life_span_max')
                if(!value) return null
                return value + ' years old'
            }
        }

    },
        { timestamps: false });

}
