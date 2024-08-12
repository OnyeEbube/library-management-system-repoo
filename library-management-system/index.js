const bookRoute = require("./src/routes/books.route.js");
const express = require("express");
const app = express();
const authRoutes = require("./src/routes/auth.routes.js");
const requestRoute = require("./src/routes/requests.routes.js");
const { userModel } = require("./src/models/user.model.js");
const { requestModel } = require("./src/models/request.model.js");
const { bookModel } = require("./src/models/book.model.js");
const { connect } = require("mongoose");
require("dotenv").config();
const url = process.env.URL;
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/requests", requestRoute);
app.use("/api/books", bookRoute);
app.use("/api/auth", authRoutes);

app.get("/", async (req, res) => {
	//res.send("Hello from Node API Updated");
	try {
		const limitValue = parseInt(req.query.limit) || 5;
		const skipValue = parseInt(req.query.skip) || 0;
		const users = await userModel.find().limit(limitValue).skip(skipValue);
		const requests = await requestModel
			.find()
			.limit(limitValue)
			.skip(skipValue);
		const books = await bookModel.find().limit(limitValue).skip(skipValue);
		res.status(200).json(users) ||
			res.status(200).json(requests) ||
			res.status(200).json(books);
	} catch (error) {
		console.log(error);
	}
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
