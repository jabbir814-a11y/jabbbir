const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const app = express();

app.use(express.json());
app.use(cors());

const host = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "jabbir"
});

host.connect()
    .then(() => {
        console.log("PostgreSQL connected");
    })
    .catch((error) => {
        console.error(error);
    });

app.post("/users", async (req, res) => {
    try {
        const { brand, amount } = req.body;

        const result = await host.query(
            "INSERT INTO jabbir (brand, amount) VALUES ($1, $2) RETURNING *",
            [brand, amount]
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error" });
    }
});

app.get("/users", async (req, res) => {
    try {
        const result = await host.query(
            "SELECT * FROM jabbir"
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});