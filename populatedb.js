#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Disc = require("./models/disc");
const Manufacturer = require("./models/manufacturer");
const Disctype = require("./models/disctype");
const Discinstance = require("./models/discinstance");

const disctypes = [];
const manufacturers = [];
const discs = [];
const discinstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createDisctypes();
  await createManufacturers();
  await createDiscs();
  await createDiscinstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}


async function disctypeCreate(index, name) {
  const disctype = new Disctype({ name: name });
  await disctype.save();
  disctypes[index] = disctype;
  console.log(`Added disctype: ${name}`);
}

async function manufacturerCreate(index, name) {
  const manufacturerdetail = { name: name };
  

  const manufacturer = new Manufacturer(manufacturerdetail);

  await manufacturer.save();
  manufacturers[index] = manufacturer;
  console.log(`Added manufacturer: ${name}`);
}

async function discCreate(index, name, manufacturer, disctype, speed, glide, turn, fade) {
  const discdetail = {
    name: name,
    manufacturer: manufacturer,
    disctype: disctype,
    speed: speed,
    glide: glide,
    turn: turn,
    fade: fade,
  };

  const disc = new Disc(discdetail);
  await disc.save();
  discs[index] = disc
  console.log(`Added disc: ${name}`);
}

async function discinstanceCreate(index, disc, plastic, weight, color) {
  const discinstancedetail = {
    disc: disc,
    plastic: plastic,
    weight: weight,
    color: color,
  };
 

  const discinstance = new Discinstance(discinstancedetail);
  await discinstance.save();
  discinstances[index] = discinstance;
  //console.log(`Added discinstance: ${instance}`);
}

async function createDisctypes() {
  console.log("Adding disctypes");
  await Promise.all([
    disctypeCreate(0, "Distance Driver"),
    disctypeCreate(1, "Fairway Driver"),
    disctypeCreate(2, "Midrange"),
    disctypeCreate(3, "Putter"),
  ]);
}

async function createManufacturers() {
  console.log("Adding manufacturers");
  await Promise.all([
    manufacturerCreate(0, "Innova"),
    manufacturerCreate(1, "Millennium" ),
    manufacturerCreate(2, "Discraft"),
    manufacturerCreate(3, "Discmania"),
    manufacturerCreate(4, "Axiom"),
  ]);
}

async function createDiscs() {
  console.log("Adding Discs ");
  await Promise.all([
    discCreate(0, "Destroyer", manufacturers[0], disctypes[0], 12, 5, -1, 3),
    discCreate(1, "Wraith", manufacturers[0], disctypes[0], 11, 5, -1, 3),
    discCreate(2, "Beast", manufacturers[0], disctypes[0], 10, 5, -2, 2),
    discCreate(3, "Sidewinder", manufacturers[0], disctypes[0], 9, 5, -3, 1),
    discCreate(4, "Tern", manufacturers[0], disctypes[0], 12, 5, -3, 2),
    discCreate(5, "Teebird", manufacturers[0], disctypes[1], 7, 5, 0, 2),
    discCreate(6, "Eagle", manufacturers[0], disctypes[1], 7, 5, -1, 3),
    discCreate(7, "Leopard", manufacturers[0], disctypes[1], 6, 5, -2, 1),
    discCreate(8, "Roc", manufacturers[0], disctypes[2], 4, 4, 0, 3),
    discCreate(9, "Shark", manufacturers[0], disctypes[2], 4, 4, 0, 2),
    discCreate(10, "Aviar", manufacturers[0], disctypes[3], 2, 3, 0, 1),
    discCreate(11, "KC Pro Aviar", manufacturers[0], disctypes[3], 2, 3, 0, 2),
    
  ]);
}

async function createDiscinstances() {
  console.log("Adding discinstances");
  await Promise.all([
    discinstanceCreate(0, discs[0], "Star", 175, "Red"),
    discinstanceCreate(1, discs[1], "GStar", 172, "Yellow"),
    discinstanceCreate(2, discs[2], "Pro", 175, "Purple"),
    discinstanceCreate(3,
      discs[3],
      "Halo Star",
      169,
      "Pink"
    ),
    discinstanceCreate(4,
      discs[3],
      "GStar",
      165,
      "Light Blue"
    ),
    discinstanceCreate(5,
      discs[3],
      "Star",
      175,
      "Blue"
    ),
    discinstanceCreate(6,
      discs[4],
      "Champion",
      165,
      "Orange"
    ),
    discinstanceCreate(7,
      discs[4],
      "Halo Star",
      170,
      "Clear"
    ),
    discinstanceCreate(8,
      discs[5],
      "Champion",
      175,
      "Pink"
    ),
    discinstanceCreate(9, discs[6], "GStar", 175, "Blue"),
    discinstanceCreate(10, discs[7], "Star", 175, "Green"),
    discinstanceCreate(0, discs[8], "DX", 175, "Red"),
    discinstanceCreate(0, discs[9], "DX", 175, "Red"),
    discinstanceCreate(0, discs[10], "Pro", 175, "Red"),
    discinstanceCreate(0, discs[10], "Pro", 175, "Red"),
  ]);
}