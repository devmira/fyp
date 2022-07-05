import { Sequelize } from "sequelize";
import db from "./index.js";

const { DataTypes } = Sequelize;

// const Coupons = db.define(
//   "coupons",
//   {
//     name: {
//       type: DataTypes.STRING,
//     },
//     description: {
//       type: DataTypes.STRING,
//     },
//     expiry_date: {
//       type: DataTypes.DATE,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//     },
//     merchant_id: {
//       type: DataTypes.INTEGER,
//     },
//     image: {
//       type: DataTypes.STRING,
//     },
//     coupon_code: {
//       type: DataTypes.STRING,
//     },
//     city: {
//       type: DataTypes.STRING,
//     },
//     inventoryType: {
//       type: DataTypes.STRING,
//     },
//     status: {
//       type: DataTypes.STRING,
//     },
//     section: {
//       type: DataTypes.STRING,
//     },
//   },
//   {
//     freezeTableName: true,
//   }
// );

// Coupons.associate = function (models) {
//   Coupons.hasOne(models.users, { foreignKey: "merchant_id" });
// };

// // (async () => {
// //   await db.sync();
// // })();

// // Coupons.hasOne(Users, {
// //   as: "Users",
// //   foreignKey: "id",
// //   sourceKey: "merchant_id",
// // });
// export default Coupons;
// module.exports = (sequelize, DataTypes) => {
//   const Coupons = sequelize.define(
//     "Coupons",
//     {
//       name: {
//         type: DataTypes.STRING,
//       },
//       description: {
//         type: DataTypes.STRING,
//       },
//       expiry_date: {
//         type: DataTypes.DATE,
//       },
//       quantity: {
//         type: DataTypes.INTEGER,
//       },
//       merchant_id: {
//         type: DataTypes.INTEGER,
//       },
//       image: {
//         type: DataTypes.STRING,
//       },
//       coupon_code: {
//         type: DataTypes.STRING,
//       },
//       city: {
//         type: DataTypes.STRING,
//       },
//       inventoryType: {
//         type: DataTypes.STRING,
//       },
//       status: {
//         type: DataTypes.STRING,
//       },
//       section: {
//         type: DataTypes.STRING,
//       },
//     },
//     {}
//   );
//   Coupons.associate = function (models) {
//     Coupons.hasMany(models.Users, { foreignKey: "merchant_id" });
//   };
//   return Coupons;
// };
class Coupons extends Sequelize.Model {
  static associate(models) {
    console.log("kkk", models);
    this.hasOne(models.users, {
      foreignKey: "merchant_id",
      sourceKey: "id",
    });
  }
}

Coupons.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    expiry_date: {
      type: DataTypes.DATE,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    merchant_id: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    coupon_code: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    inventoryType: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    section: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "coupons",
  }
);
// return Coupons;
// };

export default Coupons;
