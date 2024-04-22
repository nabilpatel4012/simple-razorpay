const crypto = require("crypto");
const { AccessCreds } = require("../../config/config");

const verifyPayment = (razorpay_order_id, razorpay_payment_id) => {
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const generatedSignature = crypto
    .createHmac("sha256", AccessCreds.keySecret)
    .update(body)
    .digest("hex");

  return generatedSignature;
};

module.exports = { verifyPayment };
