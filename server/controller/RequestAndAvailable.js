const AvailableDoctor = require("../Shema/AvailableAndRequest/AvailableDoctor");
const RequestUser = require("../Shema/AvailableAndRequest/RequestUser");

exports.AvailableDoctor = async (req, res) => {
  try {
    const { DoctorId } = req.body;
    const Doctor = new AvailableDoctor({
      DoctorId: DoctorId,
      IsAvailable: true,
      isTaskPaymentCompleted: false,
      IsTaskCompleted: false,
    });
    await Doctor.save();
    res.json({ msg: "Status Updated" });
  } catch (error) {
    res.status(422).send(error);
  }
};

exports.RequetsUsers = async (req, res) => {
  try {
    const { UserId, isTaskPaymentCompleted } = req.body;
    const User = new RequestUser({
      UserId: UserId,
      IsRaiseRequest: true,
      isTaskPaymentCompleted: isTaskPaymentCompleted,
      IsTaskCompleted: false,
    });
    await User.save();
    res.json({ msg: "Status Updated" });
  } catch (error) {
    res.status(422).send(error);
  }
};
