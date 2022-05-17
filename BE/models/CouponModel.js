import { Sequelize } from "sequelize";
import db from "./index.js";
 
const { DataTypes } = Sequelize;
 
const Coupons = db.define('coupons',{
  name:{
    type: DataTypes.STRING
  },
  description:{
    type: DataTypes.STRING
  },
  expiry_date:{
    type: DataTypes.DATE
  },
  quantity:{
    type: DataTypes.INTEGER
  },
  image:{
    type: DataTypes.STRING
  },
},{
  freezeTableName:true
});
 
(async () => {
  await db.sync();
})();

export default Coupons;