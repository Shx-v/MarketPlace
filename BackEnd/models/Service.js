import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Project Management",
      "CRM",
      "HR",
      "Marketing Automation",
      "Analytics and Business Intelligence",
    ],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  features: {
    type: [String],
    default: [],
  },
  image: { type: String, default: "https://via.placeholder.com/140" },
  reviews: [reviewSchema],
  averageRating: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

serviceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
