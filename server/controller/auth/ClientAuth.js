const Client = require("../../Shema/Auth/ClientModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.Register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      PhoneNumber,
      companyName,
      isSignupRequestComplete,
      isLoginAllowed,
      isCompanyVerified,
    } = req.body;
    const _user = await Client.findOne({ email });
    if (_user) {
      return res.status(422).send({ error: "Email Already Exits" });
    } else {

        console.log("called");
      const user = new Client({
        name,
        email,
        password,
        PhoneNumber,
        companyName,
        isSignupRequestComplete,
        isLoginAllowed,
        isCompanyVerified,
      });
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWTSECRETKEY);
      res.send({ token });
    }
  } catch (err) {
    res.status(422).send(err.message);
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Client.findOne({ email });
    if (!user) {
      return res.status(422).send({ error: "Invalid email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(422).send({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWTSECRETKEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWTSECRETKEY
    );
    res.send({ token, refreshToken });
  } catch (err) {
    res.status(422).send({ error: "Invalid email or password" });
  }
};
