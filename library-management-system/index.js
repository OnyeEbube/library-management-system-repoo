const bookRoute = require("./src/routes/books.route.js");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");
const authRoutes = require("./src/routes/auth.routes.js");
const requestRoute = require("./src/routes/requests.routes.js");
const { connect } = require("mongoose");
require("dotenv").config();
const url = process.env.URL;
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/requests", requestRoute);
app.use("/api/books", bookRoute);
app.use("/api/auth", authRoutes);

app.get("/", async (req, res) => {
	res.send("Hello from Node API Updated");
});

connect(url)
	.then(() => {
		console.log("Connected to database!");
		app.listen(port, () => {
			console.log("Server is running on port 3000");
		});
	})
	.catch(() => {
		console.log("Connection failed!");
	});
