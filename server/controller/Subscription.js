const Subscription = require("../Shema/SubscriptionModel");

exports.Subscribe = async (req, res) => {
  try {
    const { userid, name, price, duration, unit, updatedAt } = req.body;

    const Client = new Subscription({
      userid,
      name,
      price,
      duration,
      unit,
      updatedAt,
    });
    await Client.save();
    res.json({ msg: "subscription completed" });
  } catch (error) {
    res.status(422).send(error);
  }
};

exports.SubscribeUser = async (req, res) => {
  try {
    const { userid } = req.body;
    let _a = userid != null || userid != undefined ? { userid: userid } : {};
    let unwantedField = { __v: 0, _id: 0, userid: { password: 0 } };
    await Subscription.find(_a, unwantedField)
      .select("-password -__v")
      .populate("userid", "-password -__v")
      .exec((err, c) => {
        if (err) return console.log(err);
        res.status(201).json({ data: c });
      });
  } catch (error) {
    res.status(422).send(error);
  }
};
