const express = require("express");
const bookingRouter = express.Router();

const {
  createBooking,
  getBookings,
  updateStatus,
  bookingEmail,
} = require("../controllers/booking");

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getBookings);
bookingRouter.put("/:id", updateStatus);
bookingRouter.post("/:id/send-email",bookingEmail)

module.exports = bookingRouter;
