const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const initData = require("./data.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

async function getOrCreateDemoUser() {
  let demo = await User.findOne({ username: "demo" });
  if (!demo) {
    // passport-local-mongoose provides .register()
    demo = await User.register(new User({ username: "demo", email: "demo@demo.com" }), "demopassword");
  }
  return demo;
}

async function initDB() {
  await Listing.deleteMany({}); // delete old listings [web:78]

  const demoUser = await getOrCreateDemoUser();

  // Add demo as owner to every listing
  const listingsWithOwner = initData.data.map((l) => ({
    ...l,
    owner: demoUser._id,
  }));

  await Listing.insertMany(listingsWithOwner); // insert new listings [web:78]
  console.log("DB seeded. Demo is owner of all listings.");
  process.exit();
}

main()
  .then(initDB)
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
