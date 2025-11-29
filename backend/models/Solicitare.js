const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Solicitare = sequelize.define('Solicitare', {
        id_solicitare: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'id_solicitare'
        },
        id_produs: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'id_produs',
            references: {
                model: 'Produse',
                key: 'id_produs'
            }
        },
        id_solicitant: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'id_solicitant',
            references: {
                model: 'Utilizatori', 
                key: 'id_utilizator'
            }
        },
        status_solicitare: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'status_solicitare'
        },
        nr_bucati: {                
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            field: 'nr_bucati'
        },

    }, {
        tableName: 'Solicitari', 
        timestamps: true,
        underscored: true,
    });


    Solicitare.associate = (models) => {
        Solicitare.belongsTo(models.Product, {
            foreignKey: 'id_produs',
            as: 'ProdusSolicitat'
        });


        Solicitare.belongsTo(models.User, {
            foreignKey: 'id_solicitant',
            as: 'Solicitant'
        });
    };


    return Solicitare;
};
