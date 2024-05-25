const createTravel = (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      currency,
      image,
      duration,
      durationUnit,
      country,
      city,
      startDate,
      transportation
    } = req.body;
    const newTravel = new Travel();
  } catch (error) {
    console.error(error);
  }
};
