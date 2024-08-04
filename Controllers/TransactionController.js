const Transaction = require("../Models/Transaction");
const Package = require("../Models/Package");
async function createTransaction(req, res) {
  const package = await Package.findById(req.params.id);
  console.log(package.price);
  const transactionAdd = new Transaction({
    packageId: package._id,
    userId: req.user.userId,
    price: package.price,
  });

  try {
    const transactionCreated = await transactionAdd.save();
    res.status(200).json({
      statusCode: 200,
      message: "Transaction created successfully",
      transaction: transactionCreated,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
      error: err,
    });
  }
}

module.exports = createTransaction;
