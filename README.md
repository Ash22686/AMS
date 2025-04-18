# Agriculture Management System


## Overview
Farm Fusion is an agriculture management system designed to help farmers manage essential aspects of farm operations, including farm registration, crop management, soil monitoring, irrigation logging, weather tracking, and crop prediction. The platform offers easy-to-use tools for storing and accessing important farm data, improving productivity, and supporting informed decision-making.

## Features

1. **User Registration and Profiles**
   - Create and manage user profiles with information such as username, email, and location.
   - Profile settings allow for easy updating of user information.

2. **Farm Management**
   - Register multiple farms by providing details like name, location, area, crop planted, and planting date.
   - View, edit, or delete farm entries and track crop performance over time.

3. **Soil Information**
   - Log soil data (type, pH, moisture) and save soil test results.
   - Receive crop recommendations based on soil characteristics to enhance yield.

4. **Irrigation Management**
   - Record irrigation activities, including crop, date, and quantity of water used.
   - Track irrigation history for each farm to monitor water usage trends.

5. **Weather Updates**
   - Get real-time weather updates through a weather API to assist in planning irrigation and crop activities.
   - The system suggests irrigation schedules based on weather forecasts.

6. **Crop Prediction**
   - Analyze soil data, weather, and historical trends to recommend optimal crops.
   - Predict suitable crops and yields based on current farm conditions.

7. **Support and Contact**
   - Contact support directly from the app for inquiries or assistance with any issues.
   - Frequently Asked Questions (FAQs) section for common queries.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   ```
   ```bash
   cd ./frontend
   npm install
   npm run dev
   ```
   ```bash
   cd ./backend
   npm install
   npm start
   ```
   ```bash
   cd ./backend
   python app.py
   ```

## Create this database to store the information.

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
