const sendSMS = require("../../utils/twilio");
const Priority = require("./priority.model");

const getAll = async (req, res) => {
  console.log("Get all Priority Bookings ");
  try {
    const doc = await Priority.find().exec();
    if (!doc) {
      return res.status(200).json({ error: "Something went wrong" });
    }
    console.log('created document')
    return res
      .status(201)
      .json({ data: doc, message: "All Priotiyu Bookings" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// POST
const createOne = async (req, res) => {
  console.log("Create One Priority hell", req.body);

  try {
    const doc = await Priority.create(req.body);
    if (!doc) {
      return res.status(200).json({ error: "Something went wrong" });
    }
    // const data = doc.toJSON();

    // sendSMS();
    // console.log("sms in CONTROLLER", data.arrivalDate);
    return res.status(201).json({ data: doc, message: "Priority Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const priorityControllers = {
  getAll,
  createOne,
};
module.exports = priorityControllers;
