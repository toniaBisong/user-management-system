require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to MySQL");
    }
});

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});

app.post("/signup", (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, phone, password], (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.status(409).json({ error: "Email already exists" });
            } else {
                res.status(500).json({ error: err.message });
            }
        } else {
            res.status(201).json({ message: "User created successfully" });
        }
    });
});
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "User deleted successfully" });
        }
    });
});
app.post("/login", (req, res) => {
    console.log("Signup route hit");
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.length === 0) {
            res.status(404).json({ error: "Invalid email or password" });
        } else {
            res.status(200).json({ message: "Login successful", user: result[0] });
        }
    });
});
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    const sql = "UPDATE users SET name = ?, email = ?, phone = ?, password = ? WHERE id = ?";

    db.query(sql, [name, email, phone, password, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "User updated successfully" });
        }
    });
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});