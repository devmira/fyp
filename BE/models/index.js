import dbConfig from "../config/Database.js";
import Sequelize from "sequelize";
// import Coupons from "./CouponModel.js";
// import Users from "./UserModel.js";
// import UserCoupons from "./UserCouponsModel.js";

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  logging: false,
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
export default db;

// export const CouponsModel = Coupons;
// export const UsersModel = Users;
// export const UserCouponsModel = UserCoupons;

// CouponsModel.hasOne(Users, {
//   foreignKey: "id",
//   sourceKey: "merchant_id",
// });

// UsersModel.belongsTo(Coupons, { foreignKey: "id", targetKey: "merchant_id" });
