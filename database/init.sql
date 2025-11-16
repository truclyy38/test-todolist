-- Create TodoDB database (if not created via Azure CLI)
CREATE DATABASE IF NOT EXISTS TodoDB;
USE TodoDB;

-- Create Todos table
CREATE TABLE IF NOT EXISTS Todos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    Status VARCHAR(50) NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (Status),
    INDEX idx_created (CreatedAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO Todos (Title, Description, Status) VALUES
('First Todo', 'This is a sample todo item', 'pending'),
('Second Todo', 'Another example', 'completed'),
('Third Todo', 'Todo without status', NULL);

-- Verify
SELECT * FROM Todos;
