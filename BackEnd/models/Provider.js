import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

providerSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Provider = mongoose.model("Provider", providerSchema);

export default Provider;
