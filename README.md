# AMS

Create this database to store the information.

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE soil (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ph FLOAT NOT NULL,
    soiltype VARCHAR(50),
    moisture FLOAT,
    farm VARCHAR(100),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    mobileNumber VARCHAR(15),
    location VARCHAR(100),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    mobileNumber VARCHAR(15),
    location VARCHAR(100),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE irrigation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    farmName VARCHAR(100),
    cropName VARCHAR(100),
    irrigationDate DATE,
    irrigationQuantity FLOAT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE farms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    farmName VARCHAR(100),
    farmLocation VARCHAR(100),
    farmArea FLOAT,
    cropPlanted VARCHAR(100),
    datePlanted DATE,
    expectedYield FLOAT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL
);
