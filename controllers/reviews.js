const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; // Set the author of the review to the current user
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","Successfully created a new review!");
     // Redirect to the listing's show page

    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Successfully deleted the review!");
    res.redirect(`/listings/${id}`);
};

module.exports.editReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const { comment, rating } = req.body.review;

  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  review.comment = comment;
  review.rating = rating;
  await review.save();

  req.flash("success", "Successfully edited the review!");
  res.redirect(`/listings/${id}`);
};
