const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
    },

    bookingDate: {
      type: String,
      required: true,
    },

    bookingTime: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    confirmEmail: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    deviceName: {
      type: String,
      required: true,
    },

    repairType: {
      type: String,
      required: true,
    },

    repairOption: {
      type: String,
    //   enum: ["clinic", "home", "mail"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    status:{
      type:String,
      enum:['pending','completed','rejected','confirmed'],
      default:'pending'
    },
    date: {
      type: Date,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
    },

    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addresses",
    },

  },
  { timestamps: true }
);

 const Booking= mongoose.model("Booking", bookingSchema);

 module.exports = Booking
