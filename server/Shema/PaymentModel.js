const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  price: {
    type: Number,
    required: true,
  },
},{
    timestamps:true
});

const Payment = mongoose.model("payment", PaymentSchema);

module.exports = Payment;


// model not designed fully
