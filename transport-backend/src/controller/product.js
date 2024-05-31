import pool from "../util/db";

/**
 * Add product
 * @param {*} req
 * @param {*} res
 */
export const addProduct = async (req, res) => {
  const { product_name, product_img } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO product (product_name, product_img) VALUES (?, ?)",
      [product_name, product_img]
    );
    const newProductId = result.insertId;
    const newProduct = { id: newProductId, product_name, product_img };
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Delete Product
 * @param {*} req
 * @param {*} res
 */
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    await pool.query("DELETE FROM product WHERE id = ?", [productId]);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Update Product
 * @param {*} req
 * @param {*} res
 */
export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { product_name, product_img } = req.body;
  try {
    await pool.query(
      "UPDATE product SET product_name = ?, product_img = ? WHERE id = ?",
      [product_name, product_img, productId]
    );
    const updatedProduct = { id: productId, product_name, product_img };
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Get Product
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM product WHERE id = ?", [
      productId,
    ]);
    const product = result[0];
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Get All Products
 * @param {*} req
 * @param {*} res
 */
export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM product");
    const products = result;
    res.json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Server error." });
  }
};
