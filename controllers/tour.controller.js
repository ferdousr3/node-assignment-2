exports.getTours = async (req, res, next) => {
  try {
    console.log("hello");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};
