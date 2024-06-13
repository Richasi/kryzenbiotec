const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');


const UserModel = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const ProductModel = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  product_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: 'id',
    },
  },

});

ProductModel.belongsTo(UserModel, { foreignKey: 'user_id' });

(async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully.");
})();

module.exports = { UserModel, ProductModel };
