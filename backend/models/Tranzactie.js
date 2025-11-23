const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tranzactie = sequelize.define('Tranzactie', {
        id_tranzactie: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'id_tranzactie'
        },
        id_produs: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            field: 'id_produs'
        },
        id_proprietar: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            field: 'id_proprietar'
        },
        id_beneficiar: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            field: 'id_beneficiar'
        },
        nr_bucati: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            field: 'nr_bucati'
        },
        data_finalizare: {
            type: DataTypes.DATE, 
            allowNull: false,
            field: 'data_finalizare'
        }
    }, {
        tableName: 'Tranzactii', 
        timestamps: true,
        underscored: true 
    });


    Tranzactie.associate = (models) => {
        
        Tranzactie.belongsTo(models.Product, {
            foreignKey: 'id_produs',
            as: 'product',
            onDelete: 'SET NULL'
        });


       
        Tranzactie.belongsTo(models.User, {
            foreignKey: 'id_proprietar',
            as: 'owner',
            onDelete: 'CASCADE'
        });


        
        Tranzactie.belongsTo(models.User, {
            foreignKey: 'id_beneficiar',
            as: 'beneficiary',
            onDelete: 'CASCADE'
        });
    };


    return Tranzactie;
};
