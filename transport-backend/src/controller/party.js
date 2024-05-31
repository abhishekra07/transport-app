import pool from "../util/db";

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const createParty = async (req, res) => {
  const { party_name, location_id, is_godown } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO party (party_name, location_id, is_godown) VALUES (?, ?, ?)",
      [party_name, location_id, is_godown]
    );

    const newPartyId = result.insertId;
    const newParty = {
      id: newPartyId,
      party_name,
      location_id,
      is_godown,
    };

    res.status(201).json(newParty);
  } catch (error) {
    console.error("Error creating party:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Update Party
 * @param {*} req
 * @param {*} res
 */
export const updateParty = async (req, res) => {
  const partyId = req.params.id;
  const { party_name, location_id, is_godown } = req.body;

  try {
    await pool.query(
      "UPDATE party SET party_name = ?, location_id = ?, is_godown = ? WHERE id = ?",
      [party_name, location_id, is_godown, partyId]
    );

    const updatedParty = {
      id: partyId,
      party_name,
      location_id,
      is_godown,
    };

    res.json(updatedParty);
  } catch (error) {
    console.error("Error updating party:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Get All Parties
 * @param {*} req
 * @param {*} res
 */
export const getAllParties = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM party");
    const parties = result;
    res.json(parties);
  } catch (error) {
    console.error("Error getting parties:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Delete Party
 * @param {*} req
 * @param {*} res
 */
export const deleteParty = async (req, res) => {
  const partyId = req.params.id;

  try {
    await pool.query("DELETE FROM party WHERE id = ?", [partyId]);
    res.json({ message: "Party deleted successfully." });
  } catch (error) {
    console.error("Error deleting party:", error);
    res.status(500).json({ message: "Server error." });
  }
};
