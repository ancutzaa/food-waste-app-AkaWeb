const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Prietenii = sequelize.define('Prietenii', {
        id_utilizator_1: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            allowNull: false,
            field: 'id_utilizator_1',
            references: {
                model: 'Utilizatori',
                key: 'id_utilizator'
            }
        },
        id_utilizator_2: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            allowNull: false,
            field: 'id_utilizator_2',
            references: {
                model: 'Utilizatori', 
                key: 'id_utilizator'
            }
        },
        status_prietenie: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, 
            field: 'status_prietenie'
        }
    }, {
        tableName: 'Prietenii', 
        timestamps: true, 
        underscored: true, 
        indexes: [
            {
                unique: true,
                fields: ['id_utilizator_1', 'id_utilizator_2']
            }
        ]
    });


    Prietenii.associate = (models) => {
        Prietenii.belongsTo(models.User, {
            foreignKey: 'id_utilizator_1',
            as: 'UtilizatorPrincipal'
        });


        Prietenii.belongsTo(models.User, {
            foreignKey: 'id_utilizator_2',
            as: 'UtilizatorSecundar'
        });
    };


    return Prietenii;
};
