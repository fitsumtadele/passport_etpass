const dbs = require("../models");
const passports = dbs.passports;

const getPassport = async() => {
    return new Promise(async (resolve,reject) => {
       var response = await passports.findAll();
       resolve(response);
    }) 
 }

 const createPassport = async(data) => {

   return new Promise(async (resolve,reject) => {
      passports.create(data)
         .then((res) => {
           resolve(res); 
         })
        .catch((error) => {
            console.log(error);
            reject({
            message:
                error || "Some error occurred while creating the Passport Request.",
            });
        });
   })

  
}


const updatepassportById = async(id,data) => {
  
    return new Promise(async (resolve,reject) => {
      passports.update(data, {
        where: { id: id },
        returning: true,
        plain: true,
      })
        .then(async (res) => {
          resolve(res)
        })
        .catch((error) => {
          console.log(error);
          reject({
            message: error || "Some error occurred while updating Passport passport details",
          });
        });
     })
}

const deletepassport = (passportId) => {
  return new Promise((resolve, reject) => {

      let condition = {
          id: passportId
      };
      passports.destroy({
          where: condition
      })
          .then(data => {
            resolve(data);
          }).catch(err => {

              reject({
                  message: err.message || "Error destroying passport"
              });
          });

  });
};



 module.exports = {
    getPassport : getPassport,
    createPassport : createPassport,
    updatepassportById : updatepassportById,
    deletepassport : deletepassport
  }