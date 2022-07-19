import { Sequelize } from "sequelize";
import db from "./index.js";

const { DataTypes } = Sequelize;
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

export default Coupons;
