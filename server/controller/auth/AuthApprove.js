const Client = require("../../Shema/Auth/ClientModel");
const Doctor = require("../../Shema/Auth/DocterModel");

exports.VerifyAndLoginAllowedforClient = async (req, res) => {
  try {
    const { email } = req.body;
    const _user = await Client.findOne({ email });
    if (!_user) {
      return res.status(422).send({ error: "Email Not Exits" });
    } else {
      console.log("called");
      Client.findOneAndUpdate(
        { email: email },
        {
          isSignupRequestComplete: true,
          isLoginAllowed: true,
          isCompanyVerified: true,
        },
        (err, docs) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated User : ", docs);
            res.json({ msg: "Client Updated" });
          }
        }
      );
    }
  } catch (err) {
    res.status(422).send(err.message);
  }
};

exports.VerifyAndLoginAllowedforDoctor = async (req, res) => {
  try {
    const { email } = req.body;
    const _user = await Doctor.findOne({ email });
    if (!_user) {
      return res.status(422).send({ error: "Email Not Exits" });
    } else {
      Doctor.findOneAndUpdate(
        { email: email },
        {
          isSignupRequestComplete: true,
          isLoginAllowed: true,
          isClinicVerified: true,
        },
        (err, docs) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated User : ", docs);
            res.json({ msg: "Doctor Updated" });
          }
        }
      );
    }
  } catch (err) {
    res.status(422).send(err.message);
  }
};
