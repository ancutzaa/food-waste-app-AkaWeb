const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Notificare = sequelize.define('Notificare', {
        id_notificare: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'id_notificare',
        },
        id_utilizator: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_utilizator',
        },
        mesaj: {
            type: DataTypes.TEXT, 
            allowNull: false,
            field: 'mesaj',
        },
        citita: {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
            defaultValue: false,
            field: 'citita',
        },
        data_notificare: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'data_notificare',
        }
    }, {
        tableName: 'Notificari',
        timestamps: false, 
        underscored: true,
    });

    Notificare.associate = (models) => {
        Notificare.belongsTo(models.User, { 
            foreignKey: 'id_utilizator', 
            as: 'utilizator'
        });
    };

    return Notificare;
};