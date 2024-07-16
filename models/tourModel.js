const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    slug: { type: String },
    duration: { type: Number, required: [true, 'A tour must have a duration'] },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    ratingAvg: { type: Number, default: 4.5 },
    ratingQuantity: { type: Number, default: 4.5 },
    price: { type: Number, required: [true, 'A tour must have a price'] },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a image cover'],
    },
    images: [String], // Arrays of strings
    createdAt: { type: Date, default: Date.now(), select: false },
    startDates: [Date],
    secretTour: { type: Boolean, default: false },
  },
  { toJson: { virtuals: true } },
  { toObject: { virtuals: true } }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Document middleware
// Before saving the model
// Runs before the .save() and .create() command
tourSchema.pre('save', function (next) {
  // The this here has access to the current document that is being saved
  // console.log(this);

  this.slug = slugify(this.name, { lower: true });
  next();
});

// Can have multiple middlewares
tourSchema.pre('save', function (next) {
  console.log('Will save document');
  next();
});

// RUns after the .save() and .create()
// This is executed after all the pre middle ware functions are completed
tourSchema.post('save', function (doc, next) {
  // Saved document
  console.log(doc);
  next();
});

// Query middleware
// This is called before the find query is executed
// tourSchema.pre('find', function (next) {

// To execute this middleware for all the query that starts with find ( find, findById etc )
tourSchema.pre('/^find/', function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post('/^find/', function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  console.log(docs);
  next();
});

// AGGREGATE Middleware
tourSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline());
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
