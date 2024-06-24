const Disc = require("../models/disc");
const Manufacturer = require("../models/manufacturer");
const Disctype = require("../models/disctype");
const Discinstance = require("../models/discinstance")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.index = asyncHandler(async (req, res, next) => {
  const [
    numDiscs,
    numDiscinstances,
    numManufacturers,
    numDisctypes,
  ] = await Promise.all([
    Disc.countDocuments({}).exec(),
    Discinstance.countDocuments({}).exec(),
    Manufacturer.countDocuments({}).exec(),
    Disctype.countDocuments({}).exec(),
  
  ]);
  res.render("index", {
    title: "Disc Inventory",
    disc_count: numDiscs,
    disc_instance_count: numDiscinstances,
    manufacturer_count: numManufacturers,
    disctype_count: numDisctypes,
  })
})

// Display list of all discs.
exports.disc_list = asyncHandler(async (req, res, next) => {
  const allDiscs = await Disc.find().populate("manufacturer").exec();

  res.render("disc_list", {title: "Disc List", disc_list: allDiscs});
});

// Display detail page for a specific disc.
exports.disc_detail = asyncHandler(async (req, res, next) => {
  const [disc, discinstances] = await Promise.all([
    Disc.findById(req.params.id).populate("manufacturer").populate("disctype").exec(),
    Discinstance.find({disc: req.params.id}).populate("disc").exec(),
  ]);

  if(disc === null){
    //No results.
    const err = new Error("Disc not found");
    err.status = 404;
    return next(err);
  }

  res.render("disc_detail", {
    title: disc.name,
    disc: disc,
    disc_instances: discinstances,
  })
});

//create get
exports.disc_create_get = asyncHandler(async(req, res, next) =>{
  const [allManufacturers, allDisctypes] = await Promise.all([
    Manufacturer.find().exec(),
    Disctype.find().exec()
  ]);

  res.render("disc_form", {
    title: "Create a Disc",
    manufacturers: allManufacturers,
    disctypes: allDisctypes,
  })
});

// create post
exports.disc_create_post = [
  
  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("manufacturer", "Manufacturer must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("speed")
    .isNumeric({min: 1, max: 14})
    .escape(),
  body("glide")
    .isNumeric({min: 1, max: 6})
    .escape(),
  body("turn")
    .isNumeric({min: -5, max: 1})
    .escape(),
  body("fade")
    .isNumeric({min: 0, max: 5})
    .escape(),
  body("disctype").escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const disc = new Disc({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      speed: req.body.speed,
      glide: req.body.glide,
      turn: req.body.turn,
      fade: req.body.fade,
      disctype: req.body.disctype,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      const [allManufacturers, allDisctypes] = await Promise.all([
        Manufacturer.find().exec(),
        Disctype.find().exec(),
      ]);

      // Mark our selected genres as checked.
      for (const disctype of allDisctypes) {
        if (disctype._id.toString() === disc.disctype) {
          disctype.checked = "true";
        }
      }
      res.render("disc_form", {
        title: "Create Disc",
        manufacturers: allManufacturers,
        disctypes: allDisctypes,
        disc: disc,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save book.
      await disc.save();
      res.redirect(disc.url);
    }
  }),
];



//delete get
exports.disc_delete_get = asyncHandler(async(req, res, next) =>{
  const [disc , allInstancesOfDisc] = await Promise.all([
    Disc.findById(req.params.id).exec(),
    Discinstance.find({disc: req.params.id}).populate("disc").exec(),
  ])

  if (disc === null) {
    // No results.
    res.redirect("/catalog/discs");
  }

  res.render("disc_delete", {
    title: "Delete Disc",
    disc: disc,
    disc_instances: allInstancesOfDisc,
  });
});

//delete post
exports.disc_delete_post = asyncHandler(async(req, res, next) =>{
  const [disc , allInstancesOfDisc] = await Promise.all([
    Disc.findById(req.params.id).exec(),
    Discinstance.find({disc: req.params.id}).populate("disc").exec(),
  ])

  if (allInstancesOfDisc.length > 0) {
    // manufacturer has discs. Render in same way as for GET route.
    res.render("disc_delete", {
      title: "Delete Disc",
      disc: disc,
      disc_instances: allInstancesOfDisc,
    });
    return;
  } else {
    // manufacturer has no discs. Delete object and redirect to the list of manufacturers.
    await Disc.findByIdAndDelete(req.body.discid);
    res.redirect("/catalog/discs");
  }
});

//update get
exports.disc_update_get = asyncHandler(async(req, res, next) =>{
  const [disc, allManufacturers, allDisctypes] = await Promise.all([
    Disc.findById(req.params.id).populate("manufacturer").populate("disctype").exec(),
    Manufacturer.find().exec(),
    Disctype.find().exec(),
  ]);

  if (disc === null) {
    const err = new Error("Disc not found");
    err.status = 404;
    return next(err);
  }

  // allDisctypes.forEach((disctype) => {
  //   if (disc.disctype.includes(disctype._id)) {
  //     disctype.checked = "true";
  //   }  
  // });

  res.render("disc_form", {
    title: "Update Disc",
    manufacturers: allManufacturers,
    disctypes: allDisctypes,
    disc: disc,
  });
});

//update post
exports.disc_update_post = [

  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("manufacturer", "Manufacturer must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("speed")
    .isNumeric({min: 1, max: 14})
    .escape(),
  body("glide")
    .isNumeric({min: 1, max: 6})
    .escape(),
  body("turn")
    .isNumeric({min: -5, max: 1})
    .escape(),
  body("fade")
    .isNumeric({min: 0, max: 5})
    .escape(),
  body("disctype").escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const disc = new Disc({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      speed: req.body.speed,
      glide: req.body.glide,
      turn: req.body.turn,
      fade: req.body.fade,
      disctype: req.body.disctype,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      const [allManufacturers, allDisctypes] = await Promise.all([
        Manufacturer.find().exec(),
        Disctype.find().exec(),
      ]);

      // Mark our selected genres as checked.
      for (const disctype of allDisctypes) {
        if (disctype._id.toString() === disc.disctype) {
          disctype.checked = "true";
        }
      }
      res.render("disc_form", {
        title: "Update Disc",
        manufacturers: allManufacturers,
        disctypes: allDisctypes,
        disc: disc,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save book.
      const updatedDisc = await Disc.findByIdAndUpdate(req.params.id, disc, {});
      res.redirect(updatedDisc.url);
    }
  }),
];