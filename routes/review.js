const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { validateReview, isLoggedIn } = require("../middleware.js");
const { addReview, deleteReview } = require("../controller/reviews.js");




router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(addReview),
);

// Delete Review Route
router.delete(
  "/:reviewId",
  wrapAsync(deleteReview),
);

module.exports = router;
