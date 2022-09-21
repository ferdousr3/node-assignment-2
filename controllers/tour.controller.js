const {
  createTourService,
  updateTourByIdService,
  getToursService,
} = require("../services/tour.services");
const Tour = require("../models/tour");

//* get all tours
exports.getTours = async (req, res, next) => {
  try {
    
    let filters = { ...req.query };

    //sort , page , limit 
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt ,lt ,gte ,lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // shorter name
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      // if page limit then default value 1 limit 10
      const { page = 1, limit = 10 } = req.query; 
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }
  
    const tours = await getToursService(filters, queries);
    res.status(200).json({
      status: "success",
      data: tours,
    });
   
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the tour",
      error: error.message,
    });
  }
};


//* get top 3 trending tours
exports.getTrendingTours = async (req, res, next) => {
  try {
    
    const tours = await Tour.find({}).sort({viewed:-1}).limit(3)
    res.status(200).json({
      status: "success",
      data: tours,
    });
   
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the tour",
      error: error.message,
    });
  }
};
//* get cheapest 3  tours
exports.getCheapestTours = async (req, res, next) => {
  try {
    
    const tours = await Tour.find({}).sort({price:1}).limit(3)
    res.status(200).json({
      status: "success",
      data: tours,
    });
   
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the tour",
      error: error.message,
    });
  }
};

//* get single tour
exports.getSingleTour = async (req, res, next) => {
  try {
    const id = req.params.id;
    //!filter tour
    let tours = await Tour.findOne({ _id: id });
    console.log(tours);
    // update viewed count every get request
    tours.viewed = tours.viewed + 1;
    // save and sent new updated tour
    await tours.save();
    tours = await Tour.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the tour",
      error: error.message,
    });
  }
};

//* add new tour
exports.createTour = async (req, res, next) => {
  try {
    const newTour = await createTourService(req.body);
    res.status(200).json({
      status: "success",
      message: "tour inserted successfully!",
      data: newTour,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "tour in not inserted",
      error: error.message,
    });
  }
};
//* update a tour
exports.updateTourById = async (req, res, next) => {
  try {
    const tourId = req.params.id;
    const updatedTour = await updateTourByIdService(tourId, req.body);
    res.status(200).json({
      status: "success",
      message: "tour updated successfully!",
      data: updatedTour,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the tour",
      error: error.message,
    });
  }
};
