import { Sequelize } from "sequelize";
import db from "./index.js";

const { DataTypes } = Sequelize;
class Users extends Sequelize.Model {
  static associate(models) {
    this.belongsTo(models.coupons, {
      foreignKey: "merchant_id",
    });
  }
}

Users.init(
  {
    fullname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    brandname: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

export default Users;
