const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const {index , renderNewFrom, showListing, addNewListing, updateListing,deleteListing, renderEditForm} = require("../controller/listings.js");

router.route("/")
// Index Route (Show all listings)
.get(
  wrapAsync(index),
)
.post(  // Create Route (Submit the new listing)
  isLoggedIn,
  validateListing,
  wrapAsync(addNewListing),
);


router.route("/:id")
.get(// Show Route (Show one individual listing)
  // isLoggedIn,
  wrapAsync(showListing),
)
.put(  // Update Route (Submit the edits to a listing)
  validateListing,
  isOwner,
  isLoggedIn,
  wrapAsync(updateListing),
)
.delete( // Delete Route (Delete a listing)
  isOwner,
  isLoggedIn,
  wrapAsync(deleteListing),
);




// New Route (Show form to create new listing)
router.get("/new", isLoggedIn, renderNewFrom);


// Edit Route (Show form to edit a listing)
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(renderEditForm),
);

module.exports = router;