'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Utilizatori', 'descriere', {
      type: Sequelize.TEXT,
      allowNull: true, 
    });

    await queryInterface.addColumn('Produse', 'categorie', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('Solicitari', 'nr_bucati', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Utilizatori', 'descriere');
    await queryInterface.removeColumn('Produse', 'categorie');
    await queryInterface.removeColumn('Solicitari', 'nr_bucati');
}
};