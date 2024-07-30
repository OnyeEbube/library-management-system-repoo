const express = require("express");
const { RequestController } = require("../controllers/requests.controller");
const { adminAuth, userAuth } = require("../middleware/jwt.middleware");
const router = express.Router();

//get all requests
router.get("/", adminAuth, RequestController.getRequests);
//get a request
router.get("/:id", adminAuth, RequestController.getRequest);
//create a request
router.post("/", userAuth, RequestController.createRequest);
//update a request
router.put("/:id", adminAuth, RequestController.updateRequest);
//delete a request
router.delete("/:id", adminAuth, RequestController.deleteRequest);

module.exports = router;
