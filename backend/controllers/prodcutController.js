import { sql } from "../config/db.js";

// CRUD Operation
export const getProducts = async (req, res) => {
  try {
    const products = await sql`
      SELECT * FROM products
      ORDER BY created_at DESC
    `;

    console.log("Fetched Product Data", products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in getProduct", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide All Required Fields" });
  }

  try {
    const newProduct = await sql`
      INSERT INTO products (name, price, image)
      VALUES (${name}, ${price}, ${image})
      RETURNING *`;
    console.log("New Product Added:", newProduct);
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log("Error in createProduct", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
    SELECT * FROM products WHERE id = ${id}`;
    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log("Error in GetProduct Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const updatedProduct = await sql`
      UPDATE products
      SET name = ${name}, price = ${price}, image = ${image}
      WHERE id = ${id}
      RETURNING *`;

    if (updateProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }
    res.status(200).json({ success: true, data: updatedProduct[0] });
  } catch (error) {
    console.log("Error in UpdateProduct Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING *`;

    if (deletedProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.log("Error in DeleteProduct Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
