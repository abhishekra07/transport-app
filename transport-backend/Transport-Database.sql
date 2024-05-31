-- Check if table exists, if not, create the 'product' table
CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_img VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    sku VARCHAR(50),
    availability_status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by VARCHAR(255)
);

-- Check if table exists, if not, create the 'stock' table
CREATE TABLE IF NOT EXISTS stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Check if table exists, if not, create the 'fleet' table
CREATE TABLE IF NOT EXISTS fleet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(20) NOT NULL,
    rc_number VARCHAR(50) NOT NULL,
    has_insurance BOOLEAN DEFAULT FALSE,
    insurance_expiry_date DATE,
    has_puc BOOLEAN DEFAULT FALSE,
    puc_expiry_date DATE,
    purchase_date DATE,
    owner_name VARCHAR(100),
    is_self_fleet BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- Check if table exists, if not, create the 'delivery_location' table
CREATE TABLE IF NOT EXISTS delivery_location (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_name VARCHAR(255)
);

-- Check if table exists, if not, create the 'party' table
CREATE TABLE IF NOT EXISTS party (
    id INT AUTO_INCREMENT PRIMARY KEY,
    party_name VARCHAR(255) NOT NULL,
    location_id INT,
    is_godown BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (location_id) REFERENCES delivery_location(id)
);

-- Check if table exists, if not, create the 'inventory_movement_history' table
CREATE TABLE IF NOT EXISTS inventory_movement_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    challan_number VARCHAR(50),
    company_challan_number VARCHAR(50),
    toli_number VARCHAR(50),
    product_id INT,
    truck_number_id INT,
    location_id INT,
    source_id INT,
    destination_id INT,
    quantity INT,
    freight DECIMAL(10,2),
    advance DECIMAL(10,2),
    remark TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (truck_number_id) REFERENCES fleet(id),
    FOREIGN KEY (location_id) REFERENCES delivery_location(id),
    FOREIGN KEY (source_id) REFERENCES party(id),
    FOREIGN KEY (destination_id) REFERENCES party(id)
);

-- Check if table exists, if not, create the 'employees' table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_code VARCHAR(50) UNIQUE,
    full_name VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    department VARCHAR(100),
    designation VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by VARCHAR(255)
);

-- Check if table exists, if not, create the 'user_roles' table
CREATE TABLE IF NOT EXISTS user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default user roles if not already present
INSERT INTO user_roles (role_name, description) 
VALUES 
('ADMIN', 'User with all control over the system'),
('MANAGER', 'Can manage all employees of the organization'),
('USER', 'General user in the system with basic privileges');

-- Check if table exists, if not, create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100),
    full_name VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES user_roles(id)
);

