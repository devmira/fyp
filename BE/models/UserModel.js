import { Sequelize } from "sequelize";
import db from "./index.js";

const { DataTypes } = Sequelize;

// const Users = db.define(
//   "users",
//   {
//     fullname: {
//       type: DataTypes.STRING,
//     },
//     email: {
//       type: DataTypes.STRING,
//     },
//     brandname: {
//       type: DataTypes.STRING,
//     },
//     password: {
//       type: DataTypes.STRING,
//     },
//     address: {
//       type: DataTypes.TEXT,
//     },
//     role: {
//       type: DataTypes.STRING,
//     },
//     status: {
//       type: DataTypes.STRING,
//     },
//     refresh_token: {
//       type: DataTypes.TEXT,
//     },
//   },
//   {
//     freezeTableName: true,
//   }
// );
// Users.associate = function (models) {
//   Users.belongsTo(models.coupons, { as: "Coupons", foreignKey: "merchant_id" });
// };

// // (async () => {
// //   await db.sync();
// // })();

// // Users.belongsTo(Coupons, { as: "Coupons", foreignKey: "id" });

// export default Users;

// import Sequelize from "sequelize";

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
