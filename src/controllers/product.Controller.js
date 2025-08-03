import Product from "../models/product.model.js";

// Obtener todos los productos con filtros, ordenamiento y paginación
export const getAllProducts = async (req, res) => {
  try {
    const rawLimit = parseInt(req.query.limit);
    const rawPage = parseInt(req.query.page);
    const limit = isNaN(rawLimit) ? 10 : rawLimit;
    const page = isNaN(rawPage) ? 1 : rawPage;
    const { sort, query } = req.query;

    //  Filtro por categoría, estado o búsqueda por título
    let filter = {};
    if (query) {
      if (["visible", "oculto", "agotado"].includes(query)) {
        filter.status = query;
      } else {
        filter.$or = [
          { category: query },
          { title: { $regex: query, $options: "i" } },
        ];
      }
    }

    const sortOption =
      sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

    const totalDocs = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limit);
    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const baseUrl = req.baseUrl || "/api/products";
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;
    const prevLink = prevPage
      ? `${baseUrl}?page=${prevPage}&limit=${limit}`
      : null;
    const nextLink = nextPage
      ? `${baseUrl}?page=${nextPage}&limit=${limit}`
      : null;

    res.status(200).json({
      status: "success",
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage: !!prevPage,
      hasNextPage: !!nextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: "Error al obtener los productos",
    });
  }
};

//  Crear nuevo producto
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ status: "success", data: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: "Error al crear el producto" });
  }
};

//  Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updated = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res
        .status(404)
        .json({ status: "error", error: "Producto no encontrado" });
    }
    res.json({ status: "success", data: updated });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: "Error al actualizar el producto" });
  }
};

//  Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deleted = await Product.findByIdAndDelete(pid);
    if (!deleted) {
      return res
        .status(404)
        .json({ status: "error", error: "Producto no encontrado" });
    }
    res.json({
      status: "success",
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: "Error al eliminar el producto" });
  }
};
