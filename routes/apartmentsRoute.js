const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const imgur = require("imgur");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
// const fileUpload = require("express-fileupload");
const apartments = require("../models/apartment");

// app.use(express.urlencoded());

const apartRouter = express.Router();
// apartRouter.use(express.urlencoded());
apartRouter.use(express.json());

apartRouter
  .route("/")
  .get((req, res, next) => {
    apartments
      .find({})
      .populate("landlord")
      .then(
        (apartments) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(apartments);
        },
        (err) => next(err)
      )
      .catch((err) => console.log(err));
  })
  .post((req, res, next) => {
    // console.log(req)
    req.body.landlord = req.session.userId;

    // console.log(req.body);
    var obj = {
      address: req.body.address,
      bedrooms: req.body.bedrooms,
      rentPrice: req.body.rentPrice,
      email: req.body.email,
      image: req.body.image,
    };
    apartments
      .create(obj)
      .then((apartment) => {
        console.log("apartment posted", apartment);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(apartment);
      })
      .catch((err) => console.log(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /apartment");
  })
  .delete((req, res, next) => {
    apartments
      .deleteMany({})
      .then(
        (apartment) => {
          console.log("Apartment created", apartment);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(apartment);
        },
        (err) => next(err)
      )
      .catch((err) => console.log(err));
  });

apartRouter
  .route("/:apartmentId")
  .get((req, res, next) => {
    apartments
      .findById(req.params.apartmentId)
      .populate("landlord")
      .then(
        (apartment) => {
          console.log("Apartment created", apartment);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(apartment);
        },
        (err) => next(err)
      )
      .catch((err) => console.log(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
  })
  .put((req, res, next) => {
    apartments
      .findByIdAndUpdate(
        req.params.apartmentId,
        {
          $set: req.body,
        },
        { new: true }
      )
      .then(
        (apartment) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(apartment);
        },
        (err) => next(err)
      )
      .catch((err) => console.log(err));
  })
  .delete((req, res, next) => {
    apartments
      .findByIdAndRemove(req.params.apartmentId)
      .then(
        (apartment) => {
          console.log("Apartment deleted", apartment);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(apartment);
        },
        (err) => next(err)
      )
      .catch((err) => console.log(err));
  });

module.exports = apartRouter;
