import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  services: [
    {
      service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  orderDate: { type: Date, default: Date.now() },
  orderStatus: {
    type: String,
    enum: ["Pending", "Complete", "Cancelled"],
    default: "Pending",
  },
  paymentMethod: { type: String, required: true },
  totalAmount: { type: Number, required: true },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
