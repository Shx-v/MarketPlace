import Service from "../models/Service.js";

const createService = async (req, res) => {
  try {
    const { name, provider, description, category, price, features, image } =
      req.body;

    if (!name || !description || !category || price == null) {
      return res.status(400).json({
        EncryptedResponse: {
          success: false,
          status_code: 400,
          message: "All required fields must be provided.",
        },
      });
    }

    const newService = new Service({
      name,
      provider,
      description,
      category,
      price,
      features,
      image,
    });

    const savedService = await newService.save();

    res.status(201).json({
      EncryptedResponse: {
        success: true,
        status_code: 201,
        message: "Service created!",
        data: {
          service: savedService,
        },
      },
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "An error occured while creating the service !",
        data: {
          service: savedService,
        },
      },
    });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("provider", "name");
    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "All services",
        data: {
          services,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "An error occurred while fetching services.",
      },
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id).populate({
      path: "reviews.user",
      select: "firstName lastName",
    }).populate("provider", "name");

    if (!service) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Service not found !",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Service Data",
        data: {
          service,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "An error occurred while fetching the service.",
      },
    });
  }
};

const getServicesByProvider = async (req, res) => {
  const { id } = req.params;

  try {
    const services = await Service.find({ provider: id });

    // if (services.length === 0) {
    //   return res.status(404).json({
    //     EncryptedResponse: {
    //       success: false,
    //       status_code: 404,
    //       message: `No services found for provider with id: ${id}`,
    //     },
    //   });
    // }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: `Services for provider with id: ${id}`,
        data: {
          services,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "An error occurred while fetching services.",
      },
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, provider, description, category, price, features } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        provider,
        description,
        category,
        price,
        features,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Service not found !",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Updated successfully !",
        data: {
          service: updatedService,
        },
      },
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "An error occurred while updating the service.",
      },
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Service not found !",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Service deleted successfully.",
      },
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "An error occurred while deleting the service.",
      },
    });
  }
};

const createReview = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const { user, rating, comment } = req.body;
    const review = {
      user: user._id,
      rating,
      comment,
    };

    service.reviews.push(review);
    service.averageRating =
      service.reviews.reduce((acc, review) => acc + review.rating, 0) /
      service.reviews.length;

    await service.save();
    res.status(201).json({ message: "Review added", service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createService,
  getAllServices,
  getServiceById,
  getServicesByProvider,
  updateService,
  deleteService,
  createReview,
};
