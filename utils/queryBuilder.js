module.exports = (queryParams) => {
  const {
    search,
    category,
    inStock,
    page = 1,
    limit = 10,
    sort = 'createdAt'
  } = queryParams;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  if (inStock !== undefined) {
    filter.inStock = inStock === 'true'; // convert string to boolean
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  return {
    filter,
    pagination: { skip, limit: parseInt(limit) },
    sortBy: sort
  };
};