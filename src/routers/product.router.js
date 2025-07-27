import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.Controller.js";

const router = Router();

// 👉 Validación completa para POST
const validateProduct = [
  body("title").trim().notEmpty().withMessage("El título es obligatorio"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser numérico y mayor que 0"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser entero positivo"),
  body("code").trim().notEmpty().withMessage("El código es obligatorio"),
  body("category").trim().notEmpty().withMessage("La categoría es obligatoria"),
];

// 👉 Validación opcional para PUT
const optionalValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El título no puede estar vacío"),
  body("price").optional().isFloat({ gt: 0 }).withMessage("Precio inválido"),
  body("stock").optional().isInt({ min: 0 }).withMessage("Stock inválido"),
  body("code")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El código no puede estar vacío"),
  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La categoría no puede estar vacía"),
];

// ✅ Manejo común de errores de validación
const handleValidationError = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  return null;
};

// 📦 Obtener todos los productos
router.get("/", getAllProducts);

// 🆕 Crear nuevo producto
router.post("/", validateProduct, async (req, res) => {
  if (handleValidationError(req, res)) return;
  await createProduct(req, res);
});

// ✏️ Actualizar producto por ID
router.put("/:pid", optionalValidation, async (req, res) => {
  if (handleValidationError(req, res)) return;
  await updateProduct(req, res);
});

// ❌ Eliminar producto por ID
router.delete("/:pid", deleteProduct);

export default router;
