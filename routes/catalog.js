const express = require("express");
const router = express.Router();

//controllers

const disc_controller = require("../controllers/discController");
const manufacturer_controller = require("../controllers/manufacturerController");
const disctype_controller = require("../controllers/disctypeController");
const discinstance_controller = require("../controllers/discinstanceController");

//disc routes

//get catalog home page
router.get("/", disc_controller.index);

//get create 
router.get("/disc/create", disc_controller.disc_create_get);

//post create 
router.post("/disc/create", disc_controller.disc_create_post);

//get delete 
router.get("/disc/:id/delete", disc_controller.disc_delete_get);

//post delete 
router.post("/disc/:id/delete", disc_controller.disc_delete_post);

//get update
router.get("/disc/:id/update", disc_controller.disc_update_get);

//post update
router.post("/disc/:id/update", disc_controller.disc_update_post);

//get one
router.get("/disc/:id", disc_controller.disc_detail)

//get all
router.get("/discs/", disc_controller.disc_list);



//manufacturer routes

//get create 
router.get("/manufacturer/create", manufacturer_controller.manufacturer_create_get);

//post create 
router.post("/manufacturer/create", manufacturer_controller.manufacturer_create_post);

//get delete 
router.get("/manufacturer/:id/delete", manufacturer_controller.manufacturer_delete_get);

//post delete 
router.post("/manufacturer/:id/delete", manufacturer_controller.manufacturer_delete_post);

//get update
router.get("/manufacturer/:id/update", manufacturer_controller.manufacturer_update_get);

//post update
router.post("/manufacturer/:id/update", manufacturer_controller.manufacturer_update_post);

//get one
router.get("/manufacturer/:id", manufacturer_controller.manufacturer_detail)

//get all
router.get("/manufacturers/", manufacturer_controller.manufacturer_list);



//disctype routes

//get create 
router.get("/disctype/create", disctype_controller.disctype_create_get);
//post create 
router.post("/disctype/create", disctype_controller.disctype_create_post);
//get delete 
router.get("/disctype/:id/delete", disctype_controller.disctype_delete_get);
//post delete 
router.post("/disctype/:id/delete", disctype_controller.disctype_delete_post);
//get update
router.get("/disctype/:id/update", disctype_controller.disctype_update_get);
//post update
router.post("/disctype/:id/update", disctype_controller.disctype_update_post);
//get one
router.get('/disctype/:id', disctype_controller.disctype_detail);
//get all
router.get("/disctypes/", disctype_controller.disctype_list);

//disc instance routes

//get create 
router.get("/discinstance/create", discinstance_controller.discinstance_create_get);
//post create 
router.post("/discinstance/create", discinstance_controller.discinstance_create_post);
//get delete 
router.get("/discinstance/:id/delete", discinstance_controller.discinstance_delete_get);
//post delete 
router.post("/discinstance/:id/delete", discinstance_controller.discinstance_delete_post);
//get update
router.get("/discinstance/:id/update", discinstance_controller.discinstance_update_get);
//post update
router.post("/discinstance/:id/update", discinstance_controller.discinstance_update_post);
//get one
router.get("/discinstance/:id", discinstance_controller.discinstance_detail)
//get all
router.get("/discinstances/", discinstance_controller.discinstance_list);

module.exports = router;