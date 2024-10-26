require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8080; // You can choose any port you prefer
const JWT_SECRET = process.env.JWT_SECRET || "22686"; // Use environment variable in production

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Middleware to verify JWT token and extract user ID
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Assuming "Bearer <token>"

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }

    req.user = decoded; // Attach decoded token data to the request object
    next();
  });
};

// Profile route for adding profile data
app.post("/profile", authenticateToken, (req, res) => {
  // console.log(req.body);
  // console.log(req.user.id);
  
  
  const { name, email, mobileNumber, location } = req.body;
  const user_id = req.user.id;

  // Validate the input
  if (!name || !email || !mobileNumber || !location) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Insert the profile data into the database
  const query =
    "INSERT INTO profiles (name, email, mobileNumber, location , user_id) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, email, mobileNumber, location, user_id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }

      res.status(201).json({ message: "Profile submitted successfully!" });
    }
  );
});

// GET route to fetch all profiles
app.get("/profiles", authenticateToken, (req, res) => {
  const user_id = req.user.id;
  const query = "SELECT * FROM profiles WHERE user_id =?";

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
    res.status(200).json(results);
  });
});

// Update profile route
app.put("/profile/:id", (req, res) => {
  const profileId = req.params.id;
  const { name, email, mobileNumber, location } = req.body;

  const query =
    "UPDATE profiles SET name = ?, email = ?, mobileNumber = ?, location = ? WHERE id = ?";
  db.query(
    query,
    [name, email, mobileNumber, location, profileId],
    (err, result) => {
      if (err) {
        console.error("Error updating profile:", err);
        return res.status(500).json({ error: "Database error." });
      }
      res.status(200).json({ message: "Profile updated successfully!" });
    }
  );
});

// Delete profile route
app.delete("/profile/:id", (req, res) => {
  const profileId = req.params.id;

  const query = "DELETE FROM profiles WHERE id = ?";
  db.query(query, [profileId], (err, result) => {
    if (err) {
      console.error("Error deleting profile:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json({ message: "Profile deleted successfully!" });
  });
});

// Farm Data Submission Route
app.post("/farmdata", authenticateToken, (req, res) => {
  const {
    farmname,
    farmlocation,
    farmarea,
    cropPlanted,
    datePlanted,
    expectedYield,
  } = req.body;
  const user_id = req.user.id;

  // Simple validation
  if (
    !farmname ||
    !farmlocation ||
    !farmarea ||
    !cropPlanted ||
    !datePlanted ||
    !expectedYield
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Insert farm data into the database
  const query =
    "INSERT INTO farms (farmname, farmlocation, farmarea, cropPlanted, datePlanted, expectedYield , user_id) VALUES (?, ?, ?, ?, ?, ? , ?)";
  db.query(
    query,
    [
      farmname,
      farmlocation,
      farmarea,
      cropPlanted,
      datePlanted,
      expectedYield,
      user_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting farm data:", err);
        return res.status(500).json({ error: "Database error." });
      }
      res.status(201).json({ message: "Farm data submitted successfully!" });
    }
  );
});

// GET route to fetch all farm data
app.get("/farms", authenticateToken, (req, res) => {
  const user_id = req.user.id;
  const query = "SELECT * FROM farms WHERE user_id =?";

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    res.status(200).json(results);
  });
});

// GET route to fetch all farm names for dropdown
app.get("/farms/names", (req, res) => {
  const query = "SELECT farmname FROM farms";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
    // Extract only the farm names from the results
    const farmNames = results.map((farm) => farm.farmname);
    res.status(200).json(farmNames);
  });
});

// Update farm route
app.put("/farm/:id", (req, res) => {
  const farmId = req.params.id;
  const {
    farmname,
    farmlocation,
    farmarea,
    cropPlanted,
    datePlanted,
    expectedYield,
  } = req.body;

  const query =
    "UPDATE farms SET farmname = ?, farmlocation = ?, farmarea = ?, cropPlanted = ?, datePlanted = ?, expectedYield = ? WHERE id = ?";
  db.query(
    query,
    [
      farmname,
      farmlocation,
      farmarea,
      cropPlanted,
      datePlanted,
      expectedYield,
      farmId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating farm:", err);
        return res.status(500).json({ error: "Database error." });
      }
      res.status(200).json({ message: "Farm updated successfully!" });
    }
  );
});

// Delete farm route
app.delete("/farm/:id", (req, res) => {
  const farmId = req.params.id;

  const query = "DELETE FROM farms WHERE id = ?";
  db.query(query, [farmId], (err, result) => {
    if (err) {
      console.error("Error deleting farm:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json({ message: "Farm deleted successfully!" });
  });
});

// Irrigation Data Submission Route
app.post("/irrigation", authenticateToken, (req, res) => {
  const { farmName, cropName, irrigationDate, irrigationQuantity } = req.body;
  const user_id = req.user.id;

  // Simple validation
  if (!farmName || !cropName || !irrigationDate || !irrigationQuantity) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Insert irrigation data into the database
  const query =
    "INSERT INTO irrigation (farmName, cropName, irrigationDate, irrigationQuantity, user_id) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [farmName, cropName, irrigationDate, irrigationQuantity, user_id],
    (err, result) => {
      if (err) {
        console.error("Error inserting irrigation data:", err);
        return res.status(500).json({ error: "Database error." });
      }
      res
        .status(201)
        .json({ message: "Irrigation data submitted successfully!" });
    }
  );
});

// GET route to fetch all irrigation data
app.get("/irrigations", authenticateToken, (req, res) => {
  const user_id = req.user.id;
  const query = "SELECT * FROM irrigation WHERE user_id =?";
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
    res.status(200).json(results);
  });
});

app.delete("/irrigation/:id", (req, res) => {
  const irrigationId = req.params.id;

  const query = "DELETE FROM irrigation WHERE id = ?";
  db.query(query, [irrigationId], (err, result) => {
    if (err) {
      console.error("Error deleting irrigation:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json({ message: "Irrigation deleted successfully!" });
  });
});

app.put("/irrigation/:id", (req, res) => {
  const irrigationId = req.params.id;
  const { farmName, cropName, irrigationDate, irrigationQuantity } = req.body;

  // Parse date or leave as is if already a valid date string
  const formattedDate = new Date(irrigationDate).toISOString().split("T")[0]; // Formats to YYYY-MM-DD

  const query =
    "UPDATE irrigation SET farmName = ?, cropName = ?, irrigationDate = ?, irrigationQuantity = ? WHERE id = ?";

  db.query(
    query,
    [farmName, cropName, formattedDate, irrigationQuantity, irrigationId],
    (err, result) => {
      if (err) {
        console.error("Error updating irrigation:", err);
        return res.status(500).json({ error: "Database error occurred" });
      }
      res.status(200).json({ message: "Irrigation updated successfully!" });
    }
  );
});

// Soil Data Submission Route
app.post("/soildata", authenticateToken, (req, res) => {
  const { ph, soilType, moisture, farmName } = req.body;
  const user_id = req.user.id;

  // Simple validation
  if (!ph || !soilType || !moisture || !farmName) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Insert soil data into the database
  const query =
    "INSERT INTO soil (ph, soiltype, moisture, farm, user_id) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [ph, soilType, moisture, farmName, user_id],
    (err, result) => {
      if (err) {
        console.error("Error inserting soil data:", err);
        return res
          .status(500)
          .json({ error: "Database error.", details: err.message });
      }
      res.status(201).json({
        message: "Soil data submitted successfully!",
        success: "true",
      });
    }
  );
});

// GET route to fetch all soil data
app.get("/soils", authenticateToken, (req, res) => {
  const user_id = req.user.id;

  const query = "SELECT * FROM soil WHERE user_id =?";

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
    res.status(200).json(results);
  });
});

// Delete soil route
app.delete("/soils/:id", (req, res) => {
  const soilId = req.params.id;

  const query = "DELETE FROM soil WHERE id = ?";
  db.query(query, [soilId], (err, result) => {
    if (err) {
      console.error("Error deleting soil:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json({ message: "Soil deleted successfully!" });
  });
});

app.put("/soils/:id", (req, res) => {
  const soilId = req.params.id;
  const { soiltype, ph, moisture, Farm } = req.body;

  const query =
    "UPDATE soil SET soiltype = ?, ph = ?, moisture = ?, Farm = ? WHERE id = ?";

  db.query(query, [soiltype, ph, moisture, Farm, soilId], (err, result) => {
    if (err) {
      console.error("Error updating soil:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }
    res.status(200).json({ message: "Soil updated successfully!" });
  });
});

// Contact form submission route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Simple validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Insert contact data into the database
  const query = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting contact data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(201).json({ message: "Contact form submitted successfully!" });
  });
});

// Register route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into the database
  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Email already exists." });
      } else {
        console.error(err);
        return res.status(500).json({ error: "Database error." });
      }
    }

    res.status(201).json({ message: "User registered successfully!" });
  });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Check if user exists in the database
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error." });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const user = results[0];

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    try {
      // console.log("JWT Secret:", JWT_SECRET); // Check if JWT_SECRET is being correctly loaded

      // Generate a JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      // console.log("Generated Token:", token); // Log the token to verify if it's being generated

      res.json({ message: "Login successful!", token });
    } catch (jwtError) {
      console.error("Error generating token:", jwtError);
      return res.status(500).json({ error: "Error generating token" });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
