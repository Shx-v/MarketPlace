import Order from "../models/Order.js";

const createOrder = async (req, res) => {
  try {
    const { user, services, paymentMethod, totalAmount } = req.body;

    const newOrder = new Order({
      user,
      services,
      paymentMethod,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      EncryptedResponse: {
        success: true,
        status_code: 201,
        message: "Order created successfully",
        data: savedOrder,
      },
    });
  } catch (error) {
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Failed to create order",
        error: error.message,
      },
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("services.service");
    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Orders retrieved successfully",
        data: orders,
      },
    });
  } catch (error) {
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Failed to retrieve orders",
        error: error.message,
      },
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("user")
      .populate("services.service");

    if (!order) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Order not found",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Order retrieved successfully",
        data: order,
      },
    });
  } catch (error) {
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Failed to retrieve order",
        error: error.message,
      },
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Order not found",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Order updated successfully",
        data: updatedOrder,
      },
    });
  } catch (error) {
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Failed to update order",
        error: error.message,
      },
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Order not found",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Order deleted successfully",
      },
    });
  } catch (error) {
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Failed to delete order",
        error: error.message,
      },
    });
  }
};

export { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };
