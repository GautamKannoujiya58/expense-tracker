const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const expenseRoutes =
    require("./routes/expenseRoutes");

const authRoutes = require(
    "./routes/authRoutes"
);

app.use(cors());

const dashboardRoutes =
    require("./routes/dashboardRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Expense Tracker API Running");
});

const PORT = process.env.PORT || 5000;

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/expenses",
    expenseRoutes
);

app.use(
    "/api/dashboard",
    dashboardRoutes
);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

