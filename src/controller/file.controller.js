const processFile = require("../middleware/upload");
const { format } = require("util");
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
var streamBuffers = require('stream-buffers');

const azureStorageAccountName = 'etpassdevstorage';
const azureStorageAccountKey = 'BHnXu2+mhdUdav0/6Pg7t8JMG7vMHVDr9JCkmn0Pt9YEIaSFsCf2ElTKn56i9szBp8iY/0XIe2e/+AStW+le1w==';
const azureBlobContainerviditure = 'etpass-viditures';
const azureBlobContainerimages = 'etpass-images';
const sharedKeyCredential = new StorageSharedKeyCredential(azureStorageAccountName, azureStorageAccountKey);

const blobServiceClient = new BlobServiceClient(`https://${azureStorageAccountName}.blob.core.windows.net`, sharedKeyCredential);
const containerClient_image = blobServiceClient.getContainerClient(azureBlobContainerimages);
const upload = async (req, res) => {
  try {
    await processFile(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
                                
    // Create a new blob in the container and upload the file data.
    const blobName = formattedDate + "_" + req.file.originalname;
    const blockBlobClient = containerClient_image.getBlockBlobClient(blobName);

    await blockBlobClient.upload(req.file.buffer, req.file.size, {
      blobHTTPHeaders: {
        blobContentType: req.file.mimetype,
      },
    });
    const publicUrl = blockBlobClient.url;
    res.status(200).send({
      message: "Uploaded the file successfully: " + blobName,
      url: publicUrl,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};
const containerClient_viditure = blobServiceClient.getContainerClient(azureBlobContainerviditure);
const upload_viditure = async (req, res) => {
  try {
    await processFile(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
                                
    // Create a new blob in the container and upload the file data.
    const blobName = formattedDate + "_" + req.file.originalname;
    const blockBlobClient = containerClient_viditure.getBlockBlobClient(blobName);

    await blockBlobClient.upload(req.file.buffer, req.file.size, {
      blobHTTPHeaders: {
        blobContentType: req.file.mimetype,
      },
    });
    
    const publicUrl = blockBlobClient.url;

    res.status(200).send({
      message: "Uploaded the file successfully: " + blobName,
      url: publicUrl,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

module.exports = {
    upload,
    upload_viditure
};