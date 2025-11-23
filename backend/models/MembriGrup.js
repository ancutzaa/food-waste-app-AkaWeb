const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const MembriGrup = sequelize.define('MembriGrup', {
        id_grup: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            allowNull: false,
            field: 'id_grup',
            references: {
                model: 'Grupuri', 
                key: 'id_grup'
            }
        },
        id_utilizator: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            allowNull: false,
            field: 'id_utilizator',
            references: {
                model: 'User', 
                key: 'id_utilizator'
            }
        },
    }, {
        tableName: 'MembriGrup', 
        timestamps: true,
        underscored: true, 
        indexes: [
            {
                unique: true,
                fields: ['id_grup', 'id_utilizator']
            }
        ]
    });


    MembriGrup.associate = (models) => {
        MembriGrup.belongsTo(models.Grup, { foreignKey: 'id_grup' });
        MembriGrup.belongsTo(models.User, { foreignKey: 'id_utilizator' });
    };


    return MembriGrup;
};
