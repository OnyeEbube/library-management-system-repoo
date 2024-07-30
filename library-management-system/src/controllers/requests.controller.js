const { RequestService } = require("../services/requests.service");
const { BookService } = require("../services/books.service");
const RequestController = {};

RequestController.getRequests = async (req, res) => {
	try {
		const requests = await RequestService.findAll({});
		if (!requests) {
			res.status(400).json({ error: "No requests have been added" });
		}
		res.status(200).json(requests);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

RequestController.getRequest = async (req, res) => {
	try {
		const { id } = req.params;
		const requests = await RequestService.findById(id);
		if (!requests) {
			res.status(400).json({ error: "Request does not exist" });
		}
		res.status(200).json(requests);
	} catch (error) {
		res.status(500).json(error);
	}
};

RequestController.createRequest = async (req, res) => {
	try {
		const { bookId } = req.body;
		const existingBook = await BookService.findOne({ _id: bookId });
		if (!existingBook) {
			res.status(400).json({ error: "Book does not exist" });
		}
		const requests = await RequestService.createRequest(req.body);
		res.status(200).json(requests);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

RequestController.updateRequest = async (req, res) => {
	try {
		const { id } = req.params;
		const requests = await RequestService.findById(id);
		if (!requests) {
			return res.status(404).json({ message: "Request not found" });
		}
		const updatedRequest = await RequestService.updateRequest(id, req.body);
		res.status(200).json(updatedRequest);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

RequestController.deleteRequest = async (req, res) => {
	try {
		const { id } = req.params;

		const requests = await RequestService.findById(id);
		if (!requests) {
			return res.status(404).json({ message: "Request not found" });
		}
		const deletedRequest = await RequestService.deleteRequest(id);
		res
			.status(200)
			.json({ deletedRequest, message: "Request deleted Successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	RequestController,
};
