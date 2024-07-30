const Request = require("../models/request.model.js");

const RequestService = {};

RequestService.findOne = async (filter) => {
	return await Request.findOne(filter);
};

RequestService.findAll = async () => {
	return await Request.find();
};

RequestService.findById = async (id) => {
	return await Request.findById(id);
};

RequestService.createRequest = async (data) => {
	return await Request.create(data);
};

RequestService.updateRequest = async (id, data) => {
	return await Request.findOneAndUpdate({ _id: id }, data, { new: true });
};

RequestService.deleteRequest = async (id) => {
	return await Request.findOneAndDelete({ _id: id });
};

module.exports = { RequestService };
