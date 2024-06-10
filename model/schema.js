const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

// "email":"ab@gmail.com",
//   "password": "abc@123"
// const Vehicle = sequelize.define('Vehicle', {
//   type: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   model: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   wheels: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// });

// Define User model
const UserModel = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
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
