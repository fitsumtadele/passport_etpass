var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const applicantController = require("../controller/applicant.controller");

router.post("/create_upload", upload.array('images', 2), function (req, res, next) {
  const files = req.files;
  if (files.length < 2) {
    return res.status(400).send('You need to upload at least two image files.');
  }

  applicantController.createPassportApplicants2(req.body, files)
    .then(async (response) => {
      res.status(200).send({ success: true, data: response });
    })
    .catch((err) => {
      res.status(500).send({ success: false, data: err });
    });
});

router.get("/getApplications", function (req, res, next){
  const userId = req.headers['x-user-id'];
  applicantController.getApplications(userId)
  .then(async (response) => {
    res.status(200).send({ success: true, data: response });
  })
  .catch((err) => {
    res.status(500).send({ success: false, data: err });
  });
});

router.get("/list", function (req, res, next){
    applicantController.getPassportApplicants (req.body)
    .then(async (response) => {
      res.status(200).send({ success: true, data: response });
    })
    .catch((err) => {
      res.status(500).send({ success: false, data: err });
    });
});

router.post("/create-applicant",   function (req, res, next){
  const userId = req.headers['x-user-id'];
  applicantController.createPassportApplicants (req.body,userId)
  .then(async (response) => {
    res.status(200).send({ success: true, data: response });
  })
  .catch((err) => {
    res.status(500).send({ success: false, data: err });
  });
});

router.post("/create", upload.single('video'), function (req, res, next){
  const file = req.file;
  applicantController.createPassportApplicants (req.body,file)
  .then(async (response) => {
    res.status(200).send({ success: true, data: response });
  })
  .catch((err) => {
    res.status(500).send({ success: false, data: err });
  });
});

router.patch("/update-applicant/:Id", function (req, res, next) {
  applicantController.updateApplicantById(
    req.params.Id,
    req.body
  )
    .then(async (response) => {
      res.status(200).send({ success: true , data: response});
    })
    .catch((err) => {
      res.status(500).send({ success: false, data: console.log(err) });
    });
});

router.delete('/remove-applicant/:Id', function (req, res) {
  applicantController.deleteApplicant(req.params.Id)
      .then(response => {
          res.sendStatus(200);
      }).catch((err) => {
          res.status(500).send({
              success: false,
              error: err
          });
      });
});
module.exports = router;