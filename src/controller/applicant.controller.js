const dbs = require("../models");
var path = require('path');
const processFile = require("../middleware/upload");
const { format } = require("util");
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
var streamBuffers = require('stream-buffers');

const azureStorageAccountName = 'etpassdevstorage';
const azureStorageAccountKey = 'BHnXu2+mhdUdav0/6Pg7t8JMG7vMHVDr9JCkmn0Pt9YEIaSFsCf2ElTKn56i9szBp8iY/0XIe2e/+AStW+le1w==';
const azureBlobContainerSigniture = 'etpass-signitures';
const sharedKeyCredential = new StorageSharedKeyCredential(azureStorageAccountName, azureStorageAccountKey);

const blobServiceClient = new BlobServiceClient(`https://${azureStorageAccountName}.blob.core.windows.net`, sharedKeyCredential);
const containerClient_image = blobServiceClient.getContainerClient(azureBlobContainerSigniture);
const PassportApplicant = dbs.passportApplicant;

const getPassportApplicants = async() => {
    return new Promise(async (resolve,reject) => {
       var response = await PassportApplicant.findAll();
       resolve(response);
    }) 
 }
 const getApplications = async(userId) => {
  console.log(userId);
  return new Promise(async (resolve,reject) => {
     var response = await PassportApplicant.findAll({
      where: {
        applicantId: userId,
      },
    });
    const inverseMappedData = response.map((data) => trimValues(_inverseMapPassport(data)));  
    resolve(inverseMappedData);
  });
}
 const createPassportApplicants = async(data, userId) => {
   return new Promise(async (resolve,reject) => {
    // arr = Object.keys(data).map(key => data[key]);
    data.applicantId=userId;
    const passport_data = _mapPassport(data);
      PassportApplicant.create(passport_data)
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

const updateApplicantById = async (id, data) => {
  try {
    console.log(data);
    const passportData = trimValues(_mapPassport(data));
    console.log(passportData);
    if (passportData.signiture) {
      const base64Data = passportData.signiture.replace(/^data:image\/png;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
      const blobName = `${formattedDate}_processed_image.png`;
      const blockBlobClient = containerClient_image.getBlockBlobClient(blobName);
      await blockBlobClient.upload(buffer, buffer.length, {
        blobHTTPHeaders: {
          blobContentType: 'image/png',
        },
      });
      const publicUrl = blockBlobClient.url;
      passportData.signiture = publicUrl;
    }

    const [rowsUpdated, [updatedApplicant]] = await PassportApplicant.update(passportData, {
      where: { applicationNumber: id },
      returning: true,
    });

    console.log(updatedApplicant);
    return updatedApplicant;
  } catch (error) {
    console.error(error);
    throw {
      message: error.message || "Some error occurred while updating Passport Applicant details",
    };
  }
};

const deleteApplicant = (applicantId) => {
  return new Promise((resolve, reject) => {
      let condition = {
          id: applicantId
      };
      PassportApplicant.destroy({
          where: condition
      })
          .then(data => {
            resolve(data);
          }).catch(err => {
              reject({
                  message: err.message || "Error destroying Passport"
              });
          });
  });
};

const trimValues = (obj) => {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      obj[key] = trimValues(obj[key]);
    }
  }
  return obj;
};
const _mapPassport = (data) => {
  try {
    return { 
      first_name: data?.firstName,
      last_name: data?.lastName,
      middle_name: data?.middleName,
      first_name_amharic: data?.firstNameAmharic,
      last_name_amharic: data?.lastNameAmharic,
      middle_name_amharic: data?.middleNameAmharic,
      date_of_birth: data?.dateOfBirth,
      place_of_birth: data?.placeOfBirth,
      date_of_birth_amharic: data?.dateOfBirthAmharic,
      place_of_birth_amharic: data?.placeOfBirthAmharic,
      gender: data?.gender,
      email: data?.email,
      nationality: data?.nationality,
      occupation: data?.occupation,
      phone: data?.phone,
      martial_status: data?.martialStatus,
      country_code: data?.countryCode,
      height: data?.height,
      hair_color: data?.hairColor,
      eye_color: data?.eyeColor,
      birth_certificate_id: data?.birthCertificateUniqueID,

      region: data?.region,
      city: data?.city,
      state: data?.state,
      zone: data?.zone,
      woreda: data?.woreda,
      kebele: data?.kebele,
      street: data?.street,
      house_number: data?.houseNumber,

      Billing_region: data?.billingRegion,
      Billing_city: data?.billingCity,
      Billing_state: data?.billingState,
      Billing_zone: data?.billingZone,
      Billing_woreda: data?.billingWoreda,
      Billing_kebele: data?.billingKebele,
      Billing_street: data?.billingStreet,
      Billing_house_number: data?.billingHouseNumber,

      passport_page_number: data?.passportPageNumber,
      old_passport_number: data?.oldPassportNumber,
      old_passport_issue_date: data?.oldPassportIssueDate,
      old_passport_expire_date: data?.oldPassportExpirationDate,
      old_passport_picture: data?.oldPassportPhoto,
      passport_size_photo: data?.recentPassportSizePhoto,
      correction_document: data?.correctionDocument,
      applicantId:data.applicantId,
      viditure: data?.viditure,
      signiture: data?.Signiture,
      application_type: data?.application_type,
      status: data?.status,
     }
  }
  catch (error) {
    return {
      error: error,
      message: "Some Parameters are missing",
    };
  }
};
const _inverseMapPassport = (data) => {
  try {
    
    const billingAddress = data?.useResidentialAsBilling
      ? {
          Billing_region: data?.region,
          Billing_city: data?.city,
          Billing_state: data?.state,
          Billing_zone: data?.zone,
          Billing_woreda: data?.woreda,
          Billing_kebele: data?.kebele,
          Billing_street: data?.street,
          Billing_house_number: data?.houseNumber,
        }
      : {
          Billing_region: data?.billingRegion,
          Billing_city: data?.billingCity,
          Billing_state: data?.billingState,
          Billing_zone: data?.billingZone,
          Billing_woreda: data?.billingWoreda,
          Billing_kebele: data?.billingKebele,
          Billing_street: data?.billingStreet,
          Billing_house_number: data?.billingHouseNumber,
        };
    return {
      firstName: data?.first_name,
      lastName: data?.last_name,
      middleName: data?.middle_name,
      firstNameAmharic: data?.first_name_amharic,
      lastNameAmharic: data?.last_name_amharic,
      middleNameAmharic: data?.middle_name_amharic,
      dateOfBirth: data?.date_of_birth,
      placeOfBirth: data?.place_of_birth,
      dateOfBirthAmharic: data?.date_of_birth_amharic,
      placeOfBirthAmharic: data?.place_of_birth_amharic,
      gender: data?.gender,
      email: data?.email,
      nationality: data?.nationality,
      occupation: data?.occupation,
      phone: data?.phone,
      martialStatus: data?.martial_status,
      countryCode: data?.country_code,
      height: data?.height,
      hairColor: data?.hair_color,
      eyeColor: data?.eye_color,
      birthCertificateUniqueID: data?.birth_certificate_id,

      region: data?.region,
      city: data?.city,
      state: data?.state,
      zone: data?.zone,
      woreda: data?.woreda,
      kebele: data?.kebele,
      street: data?.street,
      houseNumber: data?.house_number,
      useResidentialAsBilling: data?.useResidentialAsBilling,

      ...billingAddress,

      passportPageNumber: data?.passport_page_number,
      oldPassportNumber: data?.old_passport_number,
      oldPassportIssueDate: data?.old_passport_issue_date,
      oldPassportExpirationDate: data?.old_passport_expire_date,
      oldPassportPhoto: data?.old_passport_picture,
      recentPassportSizePhoto: data?.passport_size_photo,
      correctionDocument: data?.correction_document,
      applicantId: data.applicantId,
      viditure: data?.viditure,
      Signiture: data?.signiture,
      application_type: data?.application_type,
      status: data?.status,
    };
  } catch (error) {
    return {
      error: error,
      message: "Some Parameters are missing",
    };
  }
};



 module.exports = {
    getPassportApplicants : getPassportApplicants,
    getApplications : getApplications,
    createPassportApplicants : createPassportApplicants,
    updateApplicantById : updateApplicantById,
    deleteApplicant : deleteApplicant
  }