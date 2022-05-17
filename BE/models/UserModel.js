import { Sequelize } from "sequelize";
import db from "./index.js";
 
const { DataTypes } = Sequelize;
 
const Users = db.define('users',{
  fullname:{
    type: DataTypes.STRING
  },
  email:{
    type: DataTypes.STRING
  },
  password:{
    type: DataTypes.STRING
  },
  address:{
    type: DataTypes.TEXT
  },
  role:{
    type: DataTypes.STRING
  },
  refresh_token:{
    type: DataTypes.TEXT
  }
},{
  freezeTableName:true
});
 
(async () => {
  await db.sync();
})();

export default Users;