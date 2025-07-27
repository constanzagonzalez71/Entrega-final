
export const getAllProducts = async (req, res) => {
  try {
    // 🧩 Query params con valores por defecto
    const { limit = 10, page = 1, sort, query } = req.query;

    // 🎯 Filtro opcional por categoría, título o lo que definas
    const filter = query ? { category: query } : {};

    // ⬆️ Ordenamiento por precio ascendente o descendente
    const sortOption =
      sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

    // 🛠️ Total de productos y páginas
    const totalDocs = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limit);
    const skip = (page - 1) * limit;

    const products = await ProductModel.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    // 🔗 Links para navegación
    const baseUrl = req.baseUrl;
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    res.status(200).json({
      status: "success",
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: parseInt(page),
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: prevPage ? `${baseUrl}?page=${prevPage}&limit=${limit}` : null,
      nextLink: nextPage ? `${baseUrl}?page=${nextPage}&limit=${limit}` : null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: "Error al obtener los productos",
    });
  }
};