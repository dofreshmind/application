const mongoose = require("mongoose");
const { Schema } = mongoose;

const RequestUsersShema = new Schema(
  {
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    IsRaiseRequest: {
      type: Boolean,
      required: true,
    },
    IsTaskCompleted: {
      type: Boolean,
      required: true,
    },
    isAllocatedDocterId: {
      type: Schema.Types.ObjectId,
      ref: "doctor",
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

const RequestUsers = mongoose.model("requestuser", RequestUsersShema);

module.exports = RequestUsers;
