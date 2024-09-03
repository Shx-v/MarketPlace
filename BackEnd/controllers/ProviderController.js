import Provider from "../models/Provider.js";

const createProvider = async (req, res) => {
  try {
    const provider = new Provider(req.body);
    await provider.save();
    res.status(201).json({
      EncryptedResponse: {
        success: true,
        status_code: 201,
        message: "Provider created successfully",
        data: provider,
      },
    });
  } catch (error) {
    res.status(400).json({
      EncryptedResponse: {
        success: false,
        status_code: 400,
        message: error.message,
      },
    });
  }
};

const getAllProvider = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "All providers retrieved successfully",
        data: providers,
      },
    });
  } catch (error) {
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: error.message,
      },
    });
  }
};

const getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Provider not found",
        },
      });
    }
    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Provider retrieved successfully",
        data: provider,
      },
    });
  } catch (error) {
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: error.message,
      },
    });
  }
};

const updateProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!provider) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Provider not found",
        },
      });
    }
    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Provider updated successfully",
        data: provider,
      },
    });
  } catch (error) {
    res.status(400).json({
      EncryptedResponse: {
        success: false,
        status_code: 400,
        message: error.message,
      },
    });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    if (!provider) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Provider not found",
        },
      });
    }
    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Provider deleted successfully",
      },
    });
  } catch (error) {
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: error.message,
      },
    });
  }
};

export {
  createProvider,
  getAllProvider,
  getProviderById,
  updateProvider,
  deleteProvider,
};
