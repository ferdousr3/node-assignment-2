const Tour = require("../models/tour");

exports.getToursService = async (filters, queries) => {
  const tours = await Tour.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalTours = await Tour.countDocuments(filters);
  const page = Math.ceil(totalTours / queries.limit);
  return { totalTours, page, tours };
};

//* save data
exports.createTourService = async (data) => {
  const tour = await Tour.create(data);
  return tour;
};

//* update data
exports.updateTourByIdService = async (tourId, data) => {
  const updatedTour = await Tour.updateOne(
    { _id: tourId },
    { $set: data },
    {
      runValidators: true,
    }
  );

  // const tour = await Tour.findById(tourId);
  // const updatedTour = await tour.set(data).save();
  return updatedTour;
};
