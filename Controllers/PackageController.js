const Package = require("../Models/Package");

const PackageController = {
  async getAllPackages(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    console.log(req.user.userId);
    try {
      const totalPackages = await Package.countDocuments();
      const packages = await Package.find({}).limit(limit).skip(startIndex);

      res.json({
        statusCode: 200,
        message: "Packages fetched successfully",
        totalPackages: totalPackages,
        currentPage: page,
        limit: limit,
        packages: packages,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async getPackageById(req, res) {
    try {
      const package = await Package.findById(req.params.id);
      if (!package)
        return res.status(404).json({ message: "Package not found" });
      res.json({
        statusCode: 200,
        message: "Package fetched successfully",
        package: package,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async createPackage(req, res) {
    const teacherId = req.user.userId;
    const package = new Package({
      name: req.body.name,
      price: req.body.price,
      NumberOfStudents: 0,
      NumberOfLessons: 0,
      teacherId: teacherId,
    });
    try {
      const pacakgeAdd = await package.save();
      res.status(200).json({
        message: "Successfully Added!!",
        statusCode: 201,
        package: package,
      });
    } catch (err) {
      res
        .status(500)
        .json({ statusCode: 500, message: err.message, error: err });
    }
  },
  async deletePackage(req, res) {
    try {
      await Package.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Package deleted successfully",
        statusCode: 200,
      });
    } catch (err) {
      res
        .status(500)
        .json({ statusCode: 500, message: err.message, error: err });
    }
  },
  async updatePackage(req, res) {
    const packageExisting = await Package.findById(req.params.id);
    if (!packageExisting) {
      res.status(404).json({
        statusCode: 404,
        message: "Package not found",
      });
    } else {
      try {
        const updatedPackage = await Package.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({
          statusCode: 200,
          message: "Package updated successfully",
          package: updatedPackage,
        });
      } catch (err) {
        res.status(500).json({
          statusCode: 500,
          message: err.message,
          error: err,
        });
      }
    }
  },
  async GetAllPackagesByTeacherId(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
      const totalPackages = await Package.countDocuments({
        TeacherId: req.params.id,
      });
      const packages = await Package.find({ TeacherId: req.params.id })
        .limit(limit)
        .skip(startIndex);

      res.status(200).json({
        statusCode: 200,
        message: "Packages fetched successfully",
        totalPackages: totalPackages,
        currentPage: page,
        limit: limit,
        packages: packages,
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: err.message,
        error: err,
      });
    }
  },
};

module.exports = PackageController;
