const Booking = require("../models/booking");
const {sendEmail} = require("../utils/sendEmail")

const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Filters
    const filter = {};
    if (req.query.status && req.query.status !== 'all') {
      filter.status = req.query.status;
    }
    if (req.query.repairOption && req.query.repairOption !== 'all') {
      filter.repairOption = req.query.repairOption;
    }
    if (req.query.search) {
      filter.$or = [
        { firstName: { $regex: req.query.search, $options: 'i' } },
        { lastName: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { bookingNumber: { $regex: req.query.search, $options: 'i' } },
        { deviceName: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    if (req.query.startDate && req.query.endDate) {
      filter.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const total = await Booking.countDocuments(filter);
    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateStatus = async (req,res) => {
  try {

    const {id} = req.params
    const {status} = req.body

    if(!id || !status){
      return res.status(400).json({
        message:"Id and status must be required!"
      })
    }

    const repair = await Booking.findById(id)

    repair.status=status

    await repair.save()

    return res.status(200).json({
      message:"Booking status updated!"
    })

  } catch (error) {
    return res.status(500).json({
      message:"Internal server error",
      error:error.message
    })
  }
}

const bookingEmail =  async (req, res) => {
  try {
    const { subject, body } = req.body;
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await sendEmail({
      to: booking.email,
      subject,
      html: body.replace(/\n/g, "<br/>")
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email"
    });
  }
}


module.exports = {
  createBooking,
  getBookings,
  updateStatus,
  bookingEmail
};
