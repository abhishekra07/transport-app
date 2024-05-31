import pool from "../util/db.js";

/**
 *  Add new employee to the system
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const addNewEmployee = async (req, res) => {
  const {
    employee_code,
    full_name,
    email,
    phone_number,
    department,
    designation,
    hire_date,
    salary,
    created_by = "System",
    updated_by = "System",
  } = req.body;

  if (
    !employee_code ||
    !full_name ||
    !email ||
    !phone_number ||
    !department ||
    !designation ||
    !hire_date ||
    !salary
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if an employee with the same employee code already exists
    const [existingEmployees] = await pool.query(
      "SELECT * FROM employees WHERE employee_code = ?",
      [employee_code]
    );

    if (existingEmployees.length > 0) {
      return res.status(400).json({ message: "Employee code already exists." });
    }

    // If employee code is unique, proceed with inserting the employee
    const result = await pool.query(
      "INSERT INTO employees (employee_code, full_name, email, phone_number, department, designation, hire_date, salary, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        employee_code,
        full_name,
        email,
        phone_number,
        department,
        designation,
        hire_date,
        salary,
        created_by,
        updated_by,
      ]
    );

    // Check if the employee was successfully inserted
    if (result[0].affectedRows === 1) {
      return res
        .status(201)
        .json({ message: "Employee created successfully." });
    } else {
      return res.status(500).json({ message: "Failed to create employee." });
    }
  } catch (error) {
    console.error("Error adding employee:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

/**
 * Update an existing employee
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateEmployee = async (req, res) => {
  const employeeId = req.params.id;

  const {
    employee_code,
    full_name,
    email,
    phone_number,
    department,
    designation,
    hire_date,
    salary,
    updated_by = "System",
  } = req.body;

  if (
    !employee_code ||
    !full_name ||
    !email ||
    !phone_number ||
    !department ||
    !designation ||
    !hire_date ||
    !salary
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const result = await pool.query(
      `UPDATE employees 
         SET employee_code=?, full_name=?, email=?, phone_number=?, department=?, designation=?, hire_date=?, salary=?, updated_by=?
         WHERE id=?`,
      [
        employee_code,
        full_name,
        email,
        phone_number,
        department,
        designation,
        hire_date,
        salary,
        updated_by,
        employeeId,
      ]
    );

    if (result.affectedRows === 1) {
      return res
        .status(200)
        .json({ message: "Employee updated successfully." });
    } else {
      return res.status(404).json({ message: "Employee not found." });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

/**
 * Get details of a single employee
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const [rows] = await pool.query(`SELECT * FROM employees WHERE id=?`, [
      employeeId,
    ]);

    if (rows.length === 1) {
      return res.status(200).json(rows[0]);
    } else {
      return res.status(404).json({ message: "Employee not found." });
    }
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

/**
 * Get list of all employees
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM employees`);

    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
