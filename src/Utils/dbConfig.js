module.exports = {
    HOST: "etpass-server.postgres.database.azure.com",
    USER: "azure_admin@etpass-server",
    PASSWORD: "etpass-password0",
    DB: "etpass-passport",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

// module.exports = {
//     HOST: "localhost",
//     USER: "postgres",
//     PASSWORD: "password",
//     DB: "etpass-passport",
//     dialect: "postgres",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };