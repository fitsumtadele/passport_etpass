var express = require('express');
var router = express.Router();
const passportController = require("../controller/passport.controller");


router.get("/list", function (req, res, next){
    passportController.getPassport (req.body)
    .then(async (response) => {
      res.status(200).send({ success: true, data: response });
    })
    .catch((err) => {
      res.status(500).send({ success: false, data: err });
    });
});

router.post("/passport", function (req, res, next){
  passportController.createPassport (req.body)
  .then(async (response) => {
    res.status(200).send({ success: true, data: response });
  })
  .catch((err) => {
    res.status(500).send({ success: false, data: err });
  });
});

router.patch("/passport/:Id", function (req, res, next) {
  passportController.updatepassportById(
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

router.delete('/passport/:Id', function (req, res) {
  passportController.deletepassport(req.params.Id)
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