import pool from "../util/db"; // Import your database connection pool

/**
 * Add Fleet
 * @param {*} req
 * @param {*} res
 */
export const addFleet = async (req, res) => {
  const {
    vehicle_number,
    rc_number,
    has_insurance,
    insurance_expiry_date,
    has_puc,
    puc_expiry_date,
    purchase_date,
    owner_name,
    is_self_fleet,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO fleet (vehicle_number, rc_number, has_insurance, insurance_expiry_date, has_puc, puc_expiry_date, purchase_date, owner_name, is_self_fleet) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        vehicle_number,
        rc_number,
        has_insurance,
        insurance_expiry_date,
        has_puc,
        puc_expiry_date,
        purchase_date,
        owner_name,
        is_self_fleet,
      ]
    );
    const newFleetId = result.insertId;
    const newFleet = {
      id: newFleetId,
      vehicle_number,
      rc_number,
      has_insurance,
      insurance_expiry_date,
      has_puc,
      puc_expiry_date,
      purchase_date,
      owner_name,
      is_self_fleet,
    };
    res.status(201).json(newFleet);
  } catch (error) {
    console.error("Error adding fleet:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Delete Fleet
 * @param {*} req
 * @param {*} res
 */
export const deleteFleet = async (req, res) => {
  const fleetId = req.params.id;
  try {
    await pool.query("DELETE FROM fleet WHERE id = ?", [fleetId]);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting fleet:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Update Fleet
 * @param {*} req
 * @param {*} res
 */
export const updateFleet = async (req, res) => {
  const fleetId = req.params.id;
  const {
    vehicle_number,
    rc_number,
    has_insurance,
    insurance_expiry_date,
    has_puc,
    puc_expiry_date,
    purchase_date,
    owner_name,
    is_self_fleet,
  } = req.body;
  try {
    await pool.query(
      "UPDATE fleet SET vehicle_number = ?, rc_number = ?, has_insurance = ?, insurance_expiry_date = ?, has_puc = ?, puc_expiry_date = ?, purchase_date = ?, owner_name = ?, is_self_fleet = ? WHERE id = ?",
      [
        vehicle_number,
        rc_number,
        has_insurance,
        insurance_expiry_date,
        has_puc,
        puc_expiry_date,
        purchase_date,
        owner_name,
        is_self_fleet,
        fleetId,
      ]
    );
    const updatedFleet = {
      id: fleetId,
      vehicle_number,
      rc_number,
      has_insurance,
      insurance_expiry_date,
      has_puc,
      puc_expiry_date,
      purchase_date,
      owner_name,
      is_self_fleet,
    };
    res.json(updatedFleet);
  } catch (error) {
    console.error("Error updating fleet:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Get Fleet
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getFleet = async (req, res) => {
  const fleetId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM fleet WHERE id = ?", [
      fleetId,
    ]);
    const fleet = result[0];
    if (!fleet) {
      return res.status(404).json({ message: "Fleet not found." });
    }
    res.json(fleet);
  } catch (error) {
    console.error("Error getting fleet:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Get All Fleets
 * @param {*} req
 * @param {*} res
 */
export const getAllFleets = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fleet");
    const fleets = result;
    res.json(fleets);
  } catch (error) {
    console.error("Error getting fleets:", error);
    res.status(500).json({ message: "Server error." });
  }
};
