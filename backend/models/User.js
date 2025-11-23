const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id_utilizator: {
            type: DataTypes.BIGINT, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'id_utilizator' 
        },
        nume: {
            type: DataTypes.TEXT, 
            allowNull: false,
            field: 'nume'
        },
        prenume: {
            type: DataTypes.TEXT, 
            allowNull: false,
            field: 'prenume'
        },
        email: {
            type: DataTypes.TEXT, 
            allowNull: false,
            unique: true, 
            field: 'email'
        },
        parola: {
            type: DataTypes.TEXT, 
            allowNull: false,
            field: 'parola'
        },
    }, {
        tableName: 'Utilizatori', 
        timestamps: true, 
        underscored: true 
    });


    User.associate = (models) => {
        User.hasMany(models.Product, {
            foreignKey: 'id_utilizator',
            as: 'productsOwned',
            onDelete: 'CASCADE'
        });


        User.hasMany(models.Tranzactie, {
            foreignKey: 'id_proprietar',
            as: 'transactionsAsOwner',
            onDelete: 'CASCADE'
        });


        User.hasMany(models.Tranzactie, {
            foreignKey: 'id_beneficiar',
            as: 'transactionsAsBeneficiary',
            onDelete: 'CASCADE'
        });


        User.hasMany(models.Solicitare, {
            foreignKey: 'id_solicitant',
            as: 'claimsMade',
            onDelete: 'CASCADE'
        });
       
        User.hasMany(models.Notificare, {
            foreignKey: 'id_utilizator',
            as: 'notifications',
            onDelete: 'CASCADE'
        });


        User.belongsToMany(models.User, {
            through: models.Prietenii,
            as: 'FriendsOfUser1', 
            foreignKey: 'id_utilizator_1',
            otherKey: 'id_utilizator_2' 
        });
       
        User.belongsToMany(models.User, {
            through: models.Prietenii,
            as: 'FriendsOfUser2', 
            foreignKey: 'id_utilizator_2',
            otherKey: 'id_utilizator_1'
        });


        User.belongsToMany(models.Grup, {
            through: models.MembriGrup,
            as: 'Groups',
            foreignKey: 'id_utilizator',
            otherKey: 'id_grup'
        });


        User.hasMany(models.Grup, {
            foreignKey: 'id_admin',
            as: 'groupsAdministered',
            onDelete: 'SET NULL'
        });
    };


    return User;
};
