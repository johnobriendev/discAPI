const Discinstance = require("../models/discinstance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Disc = require("../models/disc");
const {upload, deleteS3Object} = require('../config/s3');





// Display list of all discinstances.
exports.discinstance_list = asyncHandler(async (req, res, next) => {
  const allDiscInstances = await Discinstance.find().populate('disc').exec();

  res.render("discinstance_list", {
    title: "Discs in Stock",
    discinstance_list: allDiscInstances,
  });
});

// Display detail page for a specific discinstance.
exports.discinstance_detail = asyncHandler(async (req, res, next) => {
  const discinstance = await Discinstance.findById(req.params.id).populate("disc").exec();

  if (discinstance === null) {
    //No results.
    const err = new Error("This specific disc wasn't found");
    err.status = 404;
    return next(err);
  }

  res.render("discinstance_detail", {
    title: `${discinstance.plastic + " " + discinstance.disc.name} `,
    discinstance: discinstance,
  })

});
//create get
exports.discinstance_create_get = asyncHandler(async(req, res, next) =>{
  const allDiscs = await Disc.find({},"name").exec();

  res.render("discinstance_form", {
    title: "Create instance of disc",
    disc_list: allDiscs,
  })
});
// create post
exports.discinstance_create_post = [
  upload.single('photo'),
  body("disc", "Disc must be specified").escape(),
  body("plastic", "Plastic must be specified")
    .escape(),
  body("weight", "Weight must be specified").isNumeric({min: 130, max: 180}).escape(),
  body("color", "Color must be specified").escape(),
  body("price", "Price must be specified").isFloat({min: 0}).escape(),
  body('published').toBoolean(),
    

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const discInstance = new Discinstance({
      disc: req.body.disc,
      plastic: req.body.plastic,
      weight: req.body.weight,
      color: req.body.color,
      price: parseFloat(req.body.price),
      photo: req.file ? req.file.location : null, // Store the S3 URL
      photoKey: req.file.key,
      published: req.body.published,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allDiscs = await Disc.find({}, "name").exec();

      res.render("discinstance_form", {
        title: "Create an copy of a disc",
        disc_list: allDiscs,
        selected_disc: discInstance.disc._id,
        errors: errors.array(),
        discinstance: discInstance,
      });
      return;
    } else {
      // Data from form is valid
      await discInstance.save();
      res.redirect(discInstance.url);
    }
  }),
];


//delete get
exports.discinstance_delete_get = asyncHandler(async(req, res, next) =>{
  const discinstance = await Discinstance.findById(req.params.id).populate("disc").exec();

  if (discinstance === null) {
    // No results.
    res.redirect("/catalog/discinstances");
  }

  res.render("discinstance_delete", {
    title: "Delete discinstance",
    discinstance: discinstance,
  });
});


//delete post
exports.discinstance_delete_post = asyncHandler(async(req, res, next) =>{
  const discinstance = await Discinstance.findByIdAndDelete(req.body.id);

  if (discinstance) {
    // Delete the photo from S3
    await deleteS3Object(discinstance.photoKey);

    // Delete the disc instance from the database
    await Discinstance.findByIdAndDelete(req.body.id);
  }

  res.redirect("/catalog/discinstances");
});
//update get
exports.discinstance_update_get = asyncHandler(async(req, res, next) =>{
  const [discInstance, allDiscs] = await Promise.all([
    Discinstance.findById(req.params.id).populate("disc").exec(),
    Disc.find().exec(),
    
  ]);

  if (discInstance === null) {
    const err = new Error("Disc Copy not found");
    err.status = 404;
    return next(err);
  }


  res.render("discinstance_form", {
    title: "Update Disc Copy",
    disc_list: allDiscs,
    discinstance: discInstance,
    selected_disc: discInstance.disc._id.toString(),
    selected_plastic: discInstance.plastic,
  });
});
//update post
exports.discinstance_update_post = [
  upload.single('photo'),
  body("disc", "Disc must be specified").escape(),
  body("plastic", "Imprint must be specified")
    .escape(),
  body("weight", "Weight must be specified").isNumeric({min: 130, max: 180}).escape(),
  body("color", "Color must be specified").escape(),
  body("price", "Price must be specified").isFloat({min: 0}).escape(),
  body('published').toBoolean(),
    

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const discInstance = new Discinstance({
      disc: req.body.disc,
      plastic: req.body.plastic,
      weight: req.body.weight,
      color: req.body.color,
      price: parseFloat(req.body.price),
      photo: req.file ? req.file.location : null, // Store the S3 URL
      photoKey: req.file.key,
      published: req.body.published,
      _id: req.params.id,
    });

    if (req.file) {
      updatedData.photo = req.file.location; // Update photo URL if a new photo is uploaded
    }

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allDiscs = await Disc.find({}, "name").exec();

      res.render("discinstance_form", {
        title: "Create an copy of a disc",
        disc_list: allDiscs,
        selected_disc: discInstance.disc._id,
        errors: errors.array(),
        discinstance: discInstance,
      });
      return;
    } else {
      // Data from form is valid
      const updatedDiscinstance = await Discinstance.findByIdAndUpdate(req.params.id, discInstance, {});
      res.redirect(updatedDiscinstance.url);
    }
  }),
]