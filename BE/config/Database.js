const dbConfig = {
  HOST: "localhost",
  USER: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

// console.log(process.env.DB_NAME)

export default dbConfig;

// module.exports = {
//   HOST: "localhost",
//   USER: process.env.DB_USERNAME,
//   PASSWORD: "123",
//   DB: process.env.DB_NAME,
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };