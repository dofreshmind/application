const mongoose = require("mongoose");
const { Schema } = mongoose;

const AvailableDoctorsSchema = new Schema(
  {
    DoctorId: {
      type: Schema.Types.ObjectId,
      ref: "doctor",
    },
    IsAvailable: {
      type: Boolean,
      required: true,
    },
    IsTaskCompleted: {
      type: Boolean,
      required: true,
    },
    isAllocatedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isTaskPaymentCompleted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AvailableDoctors = mongoose.model(
  "availabledoctor",
  AvailableDoctorsSchema
);

module.exports = AvailableDoctors;