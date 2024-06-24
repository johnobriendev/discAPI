const Disctype = require("../models/disctype");
const Disc = require("../models/disc");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all disctypes.
exports.disctype_list = asyncHandler(async (req, res, next) => {
  const allDisctypes = await Disctype.find().exec();

  res.render("disctype_list", {
    title: "Discs by Category",
    disctype_list: allDisctypes,
  });
});

// Display detail page for a specific disctype.
exports.disctype_detail = asyncHandler(async (req, res, next) => {
  console.log('Requested ID:', req.params.id);
  
  const [disctype, discsInType] = await Promise.all([
    Disctype.findById(req.params.id).exec(),
    Disc.find({ disctype: req.params.id }).populate("manufacturer").exec(),
  ]);
  if (disctype === null) {
    // No results.
    const err = new Error("Disctype not found");
    err.status = 404;
    return next(err);
  }

  res.render("disctype_detail", {
    title: "Disc Detail",
    disctype: disctype,
    disctype_discs: discsInType,
  });

});
//create get
exports.disctype_create_get = asyncHandler(async(req, res, next) =>{
  res.render("disctype_form", {title: "Create Disc Type"})
});
// create post
exports.disctype_create_post = [
  // Validate and sanitize the name field.
  body("name", "Disc Type name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a disctype object with escaped and trimmed data.
    const disctype = new Disctype({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("disctype_form", {
        title: "Create Disc Type",
        disctype: disctype,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Disctype with same name already exists.
      const disctypeExists = await Disctype.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (disctypeExists) {
        // Disctype exists, redirect to its detail page.
        res.redirect(disctypeExists.url);
      } else {
        await disctype.save();
        // New disctype saved. Redirect to disctype detail page.
        res.redirect(disctype.url);
      }
    }
  }),
];
//delete get
exports.disctype_delete_get = asyncHandler(async(req, res, next) =>{
  
    const [disctype, allDiscsByDisctype] = await Promise.all([
      Disctype.findById(req.params.id).exec(),
      Disc.find({ disctype: req.params.id }).exec(),
    ]);
  
    if (disctype === null) {
      // No results.
      res.redirect("/catalog/disctypes");
    }
  
    res.render("disctype_delete", {
      title: "Delete disctype",
      disctype: disctype,
      disctype_discs: allDiscsByDisctype,
    });
  
});
//delete post
exports.disctype_delete_post = asyncHandler(async(req, res, next) =>{
  const [disctype, allDiscsByDisctype] = await Promise.all([
    Disctype.findById(req.params.id).exec(),
    Disc.find({ disctype: req.params.id }).exec(),
  ]);

  if (allDiscsByDisctype.length > 0) {
    // disctype has discs. Render in same way as for GET route.
    res.render("disctype_delete", {
      title: "Delete Disctype",
      disctype: disctype,
      disctype_discs: allDiscsByDisctype,
    });
    return;
  } else {
    // disctype has no discs. Delete object and redirect to the list of disctypes.
    await Disctype.findByIdAndDelete(req.body.disctypeid);
    res.redirect("/catalog/disctypes");
  }
});
//update get
exports.disctype_update_get = asyncHandler(async(req, res, next) =>{
  res.send("not implemented/not needed");
});
//update post
exports.disctype_update_post = asyncHandler(async(req, res, next) =>{
  res.send("not implemented/not needed");
});