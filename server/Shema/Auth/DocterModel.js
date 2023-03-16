const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    PhoneNumber: { type: Number, required: true },
    ClinicName: { type: String, required: true },
    isSignupRequestComplete: { type: Boolean, required: true },
    isLoginAllowed: { type: Boolean, required: true },
    isClinicVerified: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

DoctorSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    } catch (err) {
      return next(err);
    }
  }
  return next();
});

const Doctor = mongoose.model("docter", DoctorSchema);

module.exports = Doctor;
