import { Sequelize } from "sequelize";
import db from "./index.js";
 
const { DataTypes } = Sequelize;
 
const UserCoupons = db.define('user_coupons',{
  user_id:{
    type: DataTypes.INTEGER
  },
  coupon_id:{
    type: DataTypes.INTEGER
  },
},{
  freezeTableName:true
});
 
(async () => {
  await db.sync();
})();

export default UserCoupons;