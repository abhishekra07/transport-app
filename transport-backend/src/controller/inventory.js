import pool from "../util/db";

/**
 * Create Inventory Movement Record
 * @param {*} req
 * @param {*} res
 */
export const createInventoryMovement = async (req, res) => {
  const {
    challan_number,
    company_challan_number,
    toli_number,
    product_id,
    truck_number_id,
    location_id,
    source_id,
    destination_id,
    quantity,
    freight,
    advance,
    remark,
    created_by = "System",
    updated_by = "System",
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO inventory_movement_history (challan_number, company_challan_number, toli_number, product_id, truck_number_id, location_id, source_id, destination_id, quantity, freight, advance, remark, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        challan_number,
        company_challan_number,
        toli_number,
        product_id,
        truck_number_id,
        location_id,
        source_id,
        destination_id,
        quantity,
        freight,
        advance,
        remark,
        created_by,
        updated_by,
      ]
    );

    const newInventoryMovementId = result.insertId;
    const newInventoryMovement = {
      id: newInventoryMovementId,
      challan_number,
      company_challan_number,
      toli_number,
      product_id,
      truck_number_id,
      location_id,
      source_id,
      destination_id,
      quantity,
      freight,
      advance,
      remark,
      created_by,
      updated_by,
    };

    res.status(201).json(newInventoryMovement);
  } catch (error) {
    console.error("Error creating inventory movement:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Update Inventory Movement Record
 * @param {*} req
 * @param {*} res
 */
export const updateInventoryMovement = async (req, res) => {
  const inventoryMovementId = req.params.id;
  const {
    challan_number,
    company_challan_number,
    toli_number,
    product_id,
    truck_number_id,
    location_id,
    source_id,
    destination_id,
    quantity,
    freight,
    advance,
    remark,
    updated_by = "System",
  } = req.body;

  try {
    await pool.query(
      "UPDATE inventory_movement_history SET challan_number = ?, company_challan_number = ?, toli_number = ?, product_id = ?, truck_number_id = ?, location_id = ?, source_id = ?, destination_id = ?, quantity = ?, freight = ?, advance = ?, remark = ?, updated_by = ? WHERE id = ?",
      [
        challan_number,
        company_challan_number,
        toli_number,
        product_id,
        truck_number_id,
        location_id,
        source_id,
        destination_id,
        quantity,
        freight,
        advance,
        remark,
        updated_by,
        inventoryMovementId,
      ]
    );

    const updatedInventoryMovement = {
      id: inventoryMovementId,
      challan_number,
      company_challan_number,
      toli_number,
      product_id,
      truck_number_id,
      location_id,
      source_id,
      destination_id,
      quantity,
      freight,
      advance,
      remark,
      updated_by,
    };

    res.json(updatedInventoryMovement);
  } catch (error) {
    console.error("Error updating inventory movement:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Get All Inventory Movements
 * @param {*} req
 * @param {*} res
 */
export const getAllInventoryMovements = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory_movement_history");
    const inventoryMovements = result;
    res.json(inventoryMovements);
  } catch (error) {
    console.error("Error getting inventory movements:", error);
    res.status(500).json({ message: "Server error." });
  }
};
