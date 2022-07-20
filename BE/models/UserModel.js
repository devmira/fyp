import { Sequelize } from "sequelize";
import db from "./index.js";

const { DataTypes } = Sequelize;
class Users extends Sequelize.Model {
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
